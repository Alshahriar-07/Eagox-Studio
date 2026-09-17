/**
 * Rendered-width verification for the Eagox preview requirements.
 * Talks raw CDP over WebSocket (Node >=22 built-ins only, zero deps).
 *
 * Checks:
 *  1. /        → zero <iframe> elements (before AND after hydration)
 *  2. /projects → every .project-preview and its iframe measures 160 x 90
 *                 at a 1440px desktop viewport (hard max 180).
 */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
  "/c/Program Files/Google/Chrome/Application/chrome.exe",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium-browser",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
].filter(Boolean);

const chrome = CHROME_CANDIDATES.find((p) => fs.existsSync(p));
if (!chrome) {
  console.error("Chrome not found");
  process.exit(2);
}

const BASE = "http://localhost:3000";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchHtml(urlPath) {
  const res = await fetch(BASE + urlPath);
  return res.text();
}

// Hard watchdog: never hang the outer process.
const watchdog = setTimeout(() => {
  console.error("WATCHDOG: verification exceeded 60s, aborting");
  process.exit(3);
}, 60000);
watchdog.unref();

function main() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "eagox-verify-"));
  const chromeProc = spawn(
    chrome,
    [
      "--headless=new",
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "--window-size=1440,900",
      `--user-data-dir=${userDataDir}`,
      "--remote-debugging-port=0",
      "about:blank",
    ],
    { stdio: ["ignore", "pipe", "pipe"] }
  );

  let stderrBuf = "";
  chromeProc.stderr.on("data", (d) => {
    stderrBuf += d.toString();
  });

  const cleanup = () => {
    try {
      chromeProc.kill();
    } catch {}
    try {
      fs.rmSync(userDataDir, { recursive: true, force: true });
    } catch {}
  };

  const deadline = Date.now() + 20000;
  const wsUrlPoll = setInterval(async () => {
    if (Date.now() > deadline) {
      clearInterval(wsUrlPoll);
      console.error("Timed out waiting for Chrome DevTools endpoint:\n" + stderrBuf.slice(-2000));
      cleanup();
      process.exit(2);
    }
    const m = stderrBuf.match(/ws:\/\/[^\s]+/);
    if (!m) return;
    clearInterval(wsUrlPoll);
    try {
      await run(m[0]);
      cleanup();
      process.exit(0);
    } catch (err) {
      console.error("VERIFY FAILED:", err && err.message);
      cleanup();
      process.exit(1);
    }
  }, 150);

  async function run(browserWsUrl) {
    const ws = new WebSocket(browserWsUrl);
    ws.addEventListener("error", () => {
      console.error("WebSocket error to browser endpoint");
      process.exit(2);
    });
    await new Promise((res) => ws.addEventListener("open", res, { once: true }));

    let msgId = 0;
    const pending = new Map();
    const events = [];
    ws.addEventListener("message", (ev) => {
      const data = JSON.parse(ev.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error)));
        else resolve(data.result);
      } else if (data.method) {
        events.push(data);
      }
    });
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        const payload = sessionId
          ? { sessionId, method, params, id }
          : { method, params, id };
        ws.send(JSON.stringify(payload));
      });

    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    }, sessionId);

    const evaluate = async (expression) => {
      const { result, exceptionDetails } = await send(
        "Runtime.evaluate",
        { expression, returnByValue: true, awaitPromise: true },
        sessionId
      );
      if (exceptionDetails) {
        throw new Error("page eval failed: " + JSON.stringify(exceptionDetails).slice(0, 300));
      }
      return result.value;
    };

    const waitForLoad = (timeoutMs = 30000) =>
      new Promise((resolve, reject) => {
        const start = Date.now();
        const poll = setInterval(() => {
          const idx = events.findIndex((e) => e.method === "Page.loadEventFired");
          if (idx !== -1) {
            events.splice(0, idx + 1); // consume up to and including the event
            clearInterval(poll);
            resolve();
          } else if (Date.now() - start > timeoutMs) {
            clearInterval(poll);
            reject(new Error("load event timeout"));
          }
        }, 50);
      });

    const goto = async (urlPath) => {
      const loaded = waitForLoad(); // subscribe BEFORE navigating
      await send("Page.navigate", { url: BASE + urlPath }, sessionId);
      await loaded;
      await sleep(500); // let hydration settle
    };

    const failures = [];

    // ---------- CHECK 1: Home page ----------
    await goto("/");
    const homeIframesSSR = (await fetchHtml("/")).match(/<iframe/gi);
    if (homeIframesSSR && homeIframesSSR.length > 0) {
      failures.push(`Home SSR HTML contains ${homeIframesSSR.length} <iframe> tag(s)`);
    }
    const homeIframesLive = await evaluate(
      "document.querySelectorAll('iframe').length"
    );
    if (homeIframesLive !== 0) {
      failures.push(`Home live DOM contains ${homeIframesLive} iframe(s) after hydration`);
    }
    console.log(
      `HOME  (/)         : SSR iframes=${homeIframesSSR ? homeIframesSSR.length : 0}, live DOM iframes=${homeIframesLive}  ${
        (homeIframesSSR && homeIframesSSR.length) || homeIframesLive ? "FAIL" : "PASS"
      }`
    );

    // ---------- CHECK 2: Projects page ----------
    await goto("/projects");
    const previewReport = await evaluate(`(() => {
      const frames = [...document.querySelectorAll('.project-preview iframe')];
      const details = frames.map((f) => {
        const fr = f.getBoundingClientRect();
        const host = f.closest('.project-preview');
        const hr = host ? host.getBoundingClientRect() : null;
        return {
          iframe: { w: Math.round(fr.width * 10) / 10, h: Math.round(fr.height * 10) / 10 },
          host: hr ? { w: Math.round(hr.width * 10) / 10, h: Math.round(hr.height * 10) / 10 } : null,
        };
      });
      return {
        viewport: { w: innerWidth, h: innerHeight },
        count: frames.length,
        details,
      };
    })()`);

    if (previewReport.count === 0) {
      failures.push("Projects page has zero .project-preview iframes — expected at least one");
      console.log("PROJECTS (/projects): NO IFRAMES FOUND  FAIL");
    } else {
      for (const [i, d] of previewReport.details.entries()) {
        const wOk = d.iframe.w >= 139.5 && d.iframe.w <= 180.5; // target 160, hard max 180
        const ratioOk = Math.abs(d.iframe.w / d.iframe.h - 16 / 9) < 0.02;
        const pass = wOk && ratioOk;
        if (!pass) failures.push(`projects iframe #${i + 1}: ${d.iframe.w}x${d.iframe.h} (want ~160x90, max 180w, 16:9)`);
        console.log(
          `PROJECTS iframe #${i + 1} : ${d.iframe.w}x${d.iframe.h}  (host ${d.host ? d.host.w + "x" + d.host.h : "?"})  16:9=${ratioOk ? "yes" : "NO"}  ${pass ? "PASS" : "FAIL"}`
        );
      }
      console.log(
        `PROJECTS viewport  : ${previewReport.viewport.w}x${previewReport.viewport.h}, iframes checked: ${previewReport.count}`
      );
    }

    console.log("");
    if (failures.length) {
      console.log("RESULT: FAIL");
      for (const f of failures) console.log("  - " + f);
      throw new Error(failures[0]);
    }
    console.log("RESULT: ALL CHECKS PASS");
  }
}

main();
