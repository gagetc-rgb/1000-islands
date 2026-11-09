// Captures each direction's loading screen on a slow emulated link (phone + desktop).
const path = require("path");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  for (const id of [1, 2, 3, 4, 5]) for (const v of [{ n: "desktop", w: 1440, h: 900, m: false }, { n: "phone", w: 390, h: 844, m: true }]) {
    const page = await browser.newPage();
    const cdp = await page.target().createCDPSession();
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: 250000, uploadThroughput: 100000 });
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await page.setViewport({ width: v.w, height: v.h, isMobile: v.m, hasTouch: v.m });
    await page.goto(`http://localhost:5210/v${id}.html`, { waitUntil: "domcontentloaded" });
    await new Promise(r => setTimeout(r, 2200));
    await page.screenshot({ path: path.join(__dirname, "shots", `loader_v${id}_${v.n}.jpg`), type: "jpeg", quality: 75 });
    await page.close();
  }
  await browser.close();
})();
