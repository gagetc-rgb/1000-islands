// Assessment B: inject the impeccable live-server detect.js into wireframe pages and collect its console output.
// Usage: node overlay.cjs <livePort> [page,page] [WxH,WxH]
const path = require("path");
const fs = require("fs");
const os = require("os");
const puppeteer = require(path.resolve(__dirname, "../../../tools/penpot-sync/node_modules/puppeteer-core"));
const port = process.argv[2] || "8400";
const pages = (process.argv[3] || "home,raja-ampat,yachts,stories,plan").split(",");
const VP = (process.argv[4] || "1440x790,390x664").split(",").map(s => s.split("x").map(Number));
(async () => {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "b-overlay-"));
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir });
  const out = [];
  try {
    for (const [w, h] of VP) {
      for (const k of pages) {
        const page = await browser.newPage();  // fresh tab per page
        await page.setViewport({ width: w, height: h, isMobile: w < 900, hasTouch: w < 900 });
        const msgs = [];
        let injected = false;
        page.on("console", async (m) => {
          if (!injected) return;
          let text = m.text();
          // findings are logged as ('%c<rule>%c <detail>', style, style, element): describe the element
          const args = m.args();
          let el = "";
          if (args.length >= 4) {
            try {
              el = await args[3].evaluate(e => {
                if (!(e instanceof Element)) return "";
                const cls = e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/).join(".") : "";
                const id = e.id ? "#" + e.id : "";
                const sec = e.closest("section[id]");
                return `${e.tagName.toLowerCase()}${id}${cls}${sec && sec !== e ? " in section#" + sec.id : ""} "${(e.textContent || "").trim().replace(/\s+/g, " ").slice(0, 50)}"`;
              });
            } catch (_) {}
          }
          msgs.push({ type: m.type(), text: text.replace(/%c/g, ""), el });
        });
        page.on("pageerror", e => msgs.push({ type: "pageerror", text: String(e.message || e) }));
        const url = `http://localhost:5173/${k}.html`;
        await page.goto(url, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        // preflight: mutable injection (title + appended script tag)
        const pre = await page.evaluate(() => {
          document.title = "[Human] " + document.title;
          const s = document.createElement("script"); s.textContent = "window.__bPreflight = 1"; document.body.appendChild(s);
          return { title: document.title, preflight: window.__bPreflight === 1 };
        });
        await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, 0); });
        injected = true;
        let injectErr = null;
        try { await page.addScriptTag({ url: `http://localhost:${port}/detect.js` }); } catch (e) { injectErr = String(e.message || e); }
        await new Promise(r => setTimeout(r, 3000));
        const api = await page.evaluate(() => ({
          scan: typeof window.impeccableScan, coreError: window.__impeccableCoreError || null,
          overlays: document.querySelectorAll("[class*=impeccable], [id*=impeccable], [data-impeccable]").length,
        }));
        out.push({ page: k, viewport: `${w}x${h}`, preflight: pre, injectErr, api, console: msgs });
        await page.close();
      }
    }
  } finally {
    await browser.close();
    try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (_) {}
  }
  fs.writeFileSync(path.join(__dirname, "overlay-results.json"), JSON.stringify(out, null, 2));
  for (const r of out) {
    console.log(`\n== ${r.page} @ ${r.viewport} | preflight=${r.preflight.preflight} inject=${r.injectErr ? "FAIL " + r.injectErr : "ok"} impeccableScan=${r.api.scan} overlayNodes=${r.api.overlays} coreError=${r.api.coreError}`);
    for (const m of r.console) console.log(`  [${m.type}] ${m.text}${m.el ? "  <- " + m.el : ""}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
