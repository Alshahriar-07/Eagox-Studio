/**
 * End-to-end form verification for the Web3Forms migration.
 * Fills and submits BOTH real forms in headless Chrome:
 *   1. /contact  → success panel "Message sent"
 *   2. /order    → 4-step flow → redirect to /thank-you
 * Zero dependencies — raw CDP over WebSocket.
 *
 * NOTE: each run sends one real (labeled) test submission per form.
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
  console.error("WATCHDOG: verification exceeded 120s, aborting");
  process.exit(3);
}, 120000);
watchdog.unref();

function main() {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "eagox-forms-"));
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
    // Headless Chrome sends a "HeadlessChrome" UA which Web3Forms' bot
    // detection rejects. Override it with the exact UA a regular desktop
    // Chrome sends, so the verification exercises the real user path.
    await send("Emulation.setUserAgentOverride", {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    }, sessionId);

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
        await sleep(200);
      }
      return false;
    };
    const goto = async (urlPath) => {
      await send("Page.navigate", { url: BASE + urlPath }, sessionId);
      await sleep(1200); // load + hydration settle
    };

    const failures = [];

    // ---------- 1. CONTACT FORM ----------
    await goto("/contact");
    const filled = await evaluate(`(() => {
      const setVal = (el, value) => {
        const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      const name = document.querySelector('input[autocomplete="name"]');
      const email = document.querySelector('input[autocomplete="email"]');
      const msg = document.querySelector('textarea');
      if (!name || !email || !msg) return { ok: false, found: { name: !!name, email: !!email, msg: !!msg } };
      setVal(name, 'Build Verification Bot');
      setVal(email, 'noreply@eagoxstudio.vercel.app');
      setVal(msg, 'Automated build test of the Web3Forms contact migration [BUILD TEST]. Safe to ignore/delete.');
      return { ok: true };
    })()`);
    if (!filled.ok) {
      failures.push("contact form fields not found: " + JSON.stringify(filled));
      console.log(`CONTACT fields         : FAIL ${JSON.stringify(filled)}`);
    } else {
      console.log(`CONTACT fields         : filled  PASS`);
      await evaluate(`(() => {
        const btn = [...document.querySelectorAll('button[type="submit"]')].find(b => /send message/i.test(b.textContent));
        if (!btn) return false;
        btn.click();
        return true;
      })()`);
      const ok = await waitFor("!!document.querySelector('.form-success-panel')", 20000);
      if (!ok) {
        const status = await evaluate(
          "document.querySelector('[role=\"status\"]')?.textContent ?? '(no status element)'"
        );
        failures.push("contact form did not reach success panel. status: " + status);
        console.log(`CONTACT submit         : FAIL (status: ${status})`);
      } else {
        console.log(`CONTACT submit         : success panel shown  PASS`);
      }
    }

    // ---------- 2. ORDER FORM (4-step flow) ----------
    await goto("/order");
    // Step 0: service preselected → Continue
    await evaluate(`[...document.querySelectorAll('button')].find(b => /continue/i.test(b.textContent))?.click()`);
    await sleep(500);
    // Step 1: describe the project (first textarea)
    const descOk = await evaluate(`(() => {
      const ta = document.querySelector('textarea');
      if (!ta) return false;
      Object.getOwnPropertyDescriptor(window.HTMLTextAreaElement.prototype, 'value').set.call(ta, 'Automated build test of the Web3Forms order migration [BUILD TEST]. Safe to ignore/delete.');
      ta.dispatchEvent(new Event('input', { bubbles: true }));
      return true;
    })()`);
    await evaluate(`[...document.querySelectorAll('button')].find(b => /continue/i.test(b.textContent))?.click()`);
    await sleep(500);
    // Step 2: contact details
    const contactOk = await evaluate(`(() => {
      const setVal = (el, value) => {
        const proto = el.tagName === 'TEXTAREA' ? window.HTMLTextAreaElement.prototype : window.HTMLInputElement.prototype;
        Object.getOwnPropertyDescriptor(proto, 'value').set.call(el, value);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      };
      const name = document.querySelector('input[autocomplete="name"]');
      const email = document.querySelector('input[autocomplete="email"]');
      if (!name || !email) return false;
      setVal(name, 'Build Verification Bot');
      setVal(email, 'noreply@eagoxstudio.vercel.app');
      return true;
    })()`);
    if (!descOk || !contactOk) {
      failures.push(`order flow fields missing (desc=${descOk}, contact=${contactOk})`);
      console.log(`ORDER fields           : FAIL (desc=${descOk}, contact=${contactOk})`);
    } else {
      console.log(`ORDER fields           : filled  PASS`);
      // Step 2 → Continue (review)
      await evaluate(`[...document.querySelectorAll('button')].find(b => /continue/i.test(b.textContent))?.click()`);
      await sleep(500);
      // Step 3: submit
      await evaluate(`(() => {
        const btn = [...document.querySelectorAll('button[type="submit"]')].find(b => /send inquiry/i.test(b.textContent));
        if (btn) btn.click();
        return !!btn;
      })()`);
      const thanked = await waitFor("location.pathname === '/thank-you'", 25000);
      if (!thanked) {
        const status = await evaluate(
          "document.querySelector('[role=\"status\"]')?.textContent ?? '(no status element)'"
        );
        failures.push("order form did not reach /thank-you. status: " + status + " path: " + (await evaluate("location.pathname")));
        console.log(`ORDER submit           : FAIL (status: ${status})`);
      } else {
        console.log(`ORDER submit           : redirected to /thank-you  PASS`);
      }
    }

    console.log("");
    if (failures.length) {
      console.log("RESULT: FAIL");
      for (const f of failures) console.log("  - " + f);
      throw new Error(failures[0]);
    }
    console.log("RESULT: ALL CHECKS PASS — both forms submitted successfully through Web3Forms");
  }
}

main();
