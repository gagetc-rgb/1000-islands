// Screen-by-screen review sheets: each page scrolled one screen at a time (as a visitor sees it), tiled into one image.
// Usage: node review-sheets.cjs <WxH> <scale> <cols> [page,page]   → review/ux-pass/<WxH>_<page>.png
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const sharp = (() => { try { return require("sharp"); } catch (e) { return null; } })();
const [w, h] = (process.argv[2] || "1366x657").split("x").map(Number);
const scale = +(process.argv[3] || 0.5), cols = +(process.argv[4] || 3);
const all = fs.readdirSync("C:/Users/Kirill/Desktop/1000 islands/wireframes").filter(f => f.endsWith(".html")).map(f => f.replace(".html", ""));
const pages = process.argv[5] ? process.argv[5].split(",") : all;
const out = __dirname + "/../../review/ux-pass";
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h, deviceScaleFactor: scale, isMobile: w <= 768, hasTouch: w <= 768 });
  for (const k of pages) {
    if (w <= 768 && k.startsWith("admin")) continue;
    await page.goto(`http://localhost:5173/${k}.html?n=${Date.now()}`, { waitUntil: "load" });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; return document.fonts.ready; });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    const step = Math.round(h * 0.85);
    const shots = [];
    for (let y = 0, i = 0; y < total && i < 40; y += step, i++) {
      await page.evaluate(y => scrollTo(0, y), y);
      await new Promise(r => setTimeout(r, 350));
      shots.push(await page.screenshot({ type: "png" }));
      if (y + h >= total) break;
    }
    fs.mkdirSync(`${out}/tmp`, { recursive: true });
    shots.forEach((b, i) => fs.writeFileSync(`${out}/tmp/${w}x${h}_${k}_${String(i).padStart(2, "0")}.png`, b));
    console.log(k, shots.length);
  }
  await browser.close();
})();
