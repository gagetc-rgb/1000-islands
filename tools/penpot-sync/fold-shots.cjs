// First-screen screenshots: each page at load, and after clicking each in-page tab, at a given viewport.
// Usage: node fold-shots.cjs <width>x<height> [page,page] [outdir]
const puppeteer = require("puppeteer-core");
const [w, h] = (process.argv[2] || "1366x657").split("x").map(Number);
const pages = (process.argv[3] || "home,raja-ampat,north-sulawesi,yachts,stories,about,advisors,plan").split(",");
const out = process.argv[4] || __dirname + "/../../review/fit";
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1, isMobile: w <= 768, hasTouch: w <= 768 });
  for (const k of pages) {
    await page.goto(`http://localhost:5173/${k}.html?n=${Date.now()}`, { waitUntil: "load" });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: `${out}/${w}x${h}_${k}_0top.png` });
    const tabs = await page.$$eval(".subnav a", as => as.map(a => a.getAttribute("href")));
    for (const t of tabs) {
      await page.evaluate(async t => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, 0); await new Promise(r => setTimeout(r, 300)); document.querySelector(t).scrollIntoView(); }, t);
      await new Promise(r => setTimeout(r, 500));
      await page.screenshot({ path: `${out}/${w}x${h}_${k}_tab-${t.slice(1)}.png` });
    }
  }
  await browser.close();
})();
