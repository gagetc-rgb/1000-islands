// Page weight: bytes transferred on first screen (no scroll, 4 s) and after scrolling the whole page.
// Usage: node design-directions/_build/weight.cjs [ids]   (server on 5210)
const path = require("path");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const ids = (process.argv[2] || "1,2,3,4,5").split(",");
const sleep = ms => new Promise(r => setTimeout(r, ms));
const mb = b => (b / 1048576).toFixed(2);
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
  for (const view of [{ n: "desktop", w: 1440, h: 900, m: false }, { n: "phone", w: 390, h: 844, m: true }]) {
    for (const id of ids) {
      const page = await browser.newPage();
      const cdp = await page.target().createCDPSession();
      await cdp.send("Network.enable");
      await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
      let total = 0; const byType = {};
      cdp.on("Network.loadingFinished", e => { total += e.encodedDataLength; });
      cdp.on("Network.responseReceived", e => { byType[e.requestId] = e.type; });
      const perType = {};
      cdp.on("Network.loadingFinished", e => { const t = byType[e.requestId] || "Other"; perType[t] = (perType[t] || 0) + e.encodedDataLength; });
      await page.setViewport({ width: view.w, height: view.h, isMobile: view.m, hasTouch: view.m });
      await page.goto(`http://localhost:5210/v${id}.html`, { waitUntil: "load" });
      await sleep(4000);
      const first = total;
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 250)); }
      });
      await sleep(3000);
      const types = Object.entries(perType).map(([k, v]) => `${k} ${mb(v)}`).join(", ");
      console.log(`${view.n} v${id}: first screen ${mb(first)} MB, whole page ${mb(total)} MB  [${types}]`);
      await page.close();
    }
  }
  await browser.close();
})();
