// Screenshots of each branch at desktop and phone: first screen + full page.
// Usage: node experiments/harness-ab/shoot.cjs [v0,a,b] [round-tag]
// Needs the server: python -m http.server 5200 --directory experiments/harness-ab
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const branches = (process.argv[2] || "v0,a,b").split(",");
const tag = process.argv[3] ? "_" + process.argv[3] : "";
const out = path.join(__dirname, "shots");
fs.mkdirSync(out, { recursive: true });
const views = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "phone", width: 390, height: 844, mobile: true },
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  const page = await browser.newPage();
  for (const b of branches) {
    for (const v of views) {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1, isMobile: v.mobile, hasTouch: v.mobile });
      await page.goto(`http://localhost:5200/${b}/index.html?n=${Date.now()}`, { waitUntil: "networkidle0" });
      await page.evaluate(() => document.fonts.ready);
      // Reveal anything that animates in on scroll, then return to top.
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
        scrollTo(0, 0); await new Promise(r => setTimeout(r, 400));
      });
      const base = `${out}/${b}${tag}_${v.name}`;
      await page.screenshot({ path: `${base}_fold.png` });
      await page.screenshot({ path: `${base}_full.png`, fullPage: true });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth);
      console.log(`${b} ${v.name}: ok${overflow > 0 ? `  WARNING horizontal overflow ${overflow}px` : ""}`);
    }
  }
  await browser.close();
})();
