/**
 * Intro verification for the Eagox identity-reveal gate.
 * Raw CDP over WebSocket — Node built-ins only, zero dependencies.
 *
 * Checks (fresh session, 1440x900):
 *  1. Intro plays: .intro-gate appears after hydration; wordmark, STUDIO,
 *     micro text and the solid .intro-wipe sheet are all in the DOM.
 *  2. The wipe sheet is a solid sheet (opaque carbon background).
 *  3. Intro completes (~1.8s): gate fully gone from the DOM.
 *  4. Session replay guard: a second page in the SAME session never shows
 *     the intro (internal navigation must not replay it).
 */
const { spawn } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const CHROME_CANDIDATES = [
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
  process.env.LOCALAPPDATA + "\\Google\\Chrome\\Application\\chrome.exe",
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

const watchdog = setTimeout(() => {
  console.error("WATCHDOG: verification exceeded 90s, aborting");
  process.exit(3);
}, 90000);
watchdog.unref();

function main() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "eagox-intro-"));
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
  chromeProc.stderr.on("data", (d) => (stderrBuf += d.toString()));

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
      console.error("Timed out waiting for Chrome endpoint:\n" + stderrBuf.slice(-2000));
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
    await new Promise((res, rej) => {
      ws.addEventListener("open", res, { once: true });
      ws.addEventListener("error", rej, { once: true });
    });

    let msgId = 0;
    const pending = new Map();
    ws.addEventListener("message", (ev) => {
      const data = JSON.parse(ev.data);
      if (data.id && pending.has(data.id)) {
        const { resolve, reject } = pending.get(data.id);
        pending.delete(data.id);
        if (data.error) reject(new Error(JSON.stringify(data.error)));
        else resolve(data.result);
      }
    });
    const send = (method, params = {}, sessionId) =>
      new Promise((resolve, reject) => {
        const id = ++msgId;
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify(sessionId ? { sessionId, method, params, id } : { method, params, id }));
      });

    const { targetId } = await send("Target.createTarget", { url: "about:blank" });
    const { sessionId } = await send("Target.attachToTarget", { targetId, flatten: true });
    await send("Page.enable", {}, sessionId);
    await send("Runtime.enable", {}, sessionId);
    await send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false }, sessionId);

    const evaluate = async (expression) => {
      const { result, exceptionDetails } = await send(
        "Runtime.evaluate",
        { expression, returnByValue: true, awaitPromise: true },
        sessionId
      );
      if (exceptionDetails) throw new Error("page eval failed: " + JSON.stringify(exceptionDetails).slice(0, 300));
      return result.value;
    };
    const waitFor = async (expr, timeoutMs) => {
      const start = Date.now();
      while (Date.now() - start < timeoutMs) {
        if (await evaluate(expr)) return true;
        await sleep(100);
      }
      return false;
    };

    const failures = [];

    // 1–3. Fresh session: intro plays, parts exist, completes.
    await send("Page.navigate", { url: BASE + "/" }, sessionId);
    const appeared = await waitFor(
      "!!document.querySelector('.intro-gate')",
      8000
    );
    if (!appeared) failures.push("intro gate never appeared (fresh session)");
    console.log(`INTRO appears          : ${appeared ? "PASS" : "FAIL"}`);

    if (appeared) {
      const parts = await evaluate(`({
        wordmark: !!document.querySelector('.intro-wordmark'),
        studio: !!document.querySelector('.intro-studio'),
        tagline: !!document.querySelector('.intro-tagline'),
        wipe: !!document.querySelector('.intro-wipe'),
      })`);
      const partsOk = parts.wordmark && parts.studio && parts.tagline && parts.wipe;
      if (!partsOk) failures.push("intro missing parts: " + JSON.stringify(parts));
      console.log(`INTRO parts            : ${JSON.stringify(parts)} ${partsOk ? "PASS" : "FAIL"}`);

      // Wipe sheet must be solid carbon (no transparency mid-flight).
      const wipeBg = await evaluate(
        "getComputedStyle(document.querySelector('.intro-wipe')).backgroundColor"
      );
      const solid = wipeBg === "rgb(13, 17, 24)";
      if (!solid) failures.push(`wipe not solid carbon: ${wipeBg}`);
      console.log(`INTRO wipe solid       : ${wipeBg} ${solid ? "PASS" : "FAIL"}`);

      const gone = await waitFor("!document.querySelector('.intro-gate')", 4000);
      if (!gone) failures.push("intro gate did not complete within 4s of appearing");
      console.log(`INTRO completes        : ${gone ? "PASS" : "FAIL"}`);
    }

    // 4. Same-session second load must NOT replay the intro.
    await send("Page.navigate", { url: BASE + "/services" }, sessionId);
    await sleep(1500);
    const replay = await evaluate("!!document.querySelector('.intro-gate')");
    if (replay) failures.push("intro replayed on internal navigation (session guard broken)");
    console.log(`NO replay on nav       : ${replay ? "FAIL" : "PASS"}`);

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
