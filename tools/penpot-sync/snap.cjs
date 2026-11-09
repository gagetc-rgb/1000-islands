// Screen-by-screen captures of any served wireframe folder, tiled per page.
// Usage: node snap.cjs <baseUrl> <outDir> <WxH> <scale> <cols> [page,page]
//   e.g. node snap.cjs http://localhost:5173 ../../review/2026-10-07_redesign/shots-v4 1440x790 0.6 3 home,raja-ampat
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const [base, outArg, size = "1440x790", scaleArg = "0.6", colsArg = "3", pagesArg] = process.argv.slice(2);
const [w, h] = size.split("x").map(Number);
const scale = +scaleArg, cols = +colsArg;
const out = path.resolve(outArg);
const pages = (pagesArg || "home,raja-ampat,north-sulawesi,yachts,stories,about,advisors,plan,thank-you").split(",");
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: require("os").tmpdir() + "/snap-profile-" + process.pid });
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: scale, isMobile: w <= 768, hasTouch: w <= 768 });
  for (const k of pages) {
    await page.goto(`${base}/${k}.html?n=${Date.now()}`, { waitUntil: "load" });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; return document.fonts.ready; });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round(h * 0.9);
    let i = 0;
    for (let y = 0; y < total && i < 40; y += step, i++) {
      await page.evaluate(y => scrollTo(0, y), y);
      await new Promise(r => setTimeout(r, 300));
      fs.writeFileSync(`${out}/${w}x${h}_${k}_${String(i).padStart(2, "0")}.png`, await page.screenshot({ type: "png" }));
      if (y + h >= total) { i++; break; }
    }
    console.log(k, i, "screens");
  }
  await browser.close();
})();
