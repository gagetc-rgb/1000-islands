// Screenshots of v1–v5: desktop + phone, first screen and full page; card shots for index.html.
// Needs: python -m http.server 5210 --directory design-directions
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const ids = (process.argv[2] || "1,2,3,4,5").split(",");
const out = path.join(__dirname, "shots");
const cards = path.join(__dirname, "..", "shots");
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(cards, { recursive: true });
const views = [
  { name: "desktop", width: 1440, height: 900, mobile: false },
  { name: "phone", width: 390, height: 844, mobile: true },
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  for (const id of ids) {
    for (const v of views) {
      await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1, isMobile: v.mobile, hasTouch: v.mobile });
      await page.goto(`http://localhost:5210/v${id}.html?n=${Date.now()}`, { waitUntil: "networkidle2" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForFunction(() => !document.documentElement.classList.contains("is-loading"), { timeout: 12000 }).catch(() => console.log("loader still up", id, v.name));
      await page.evaluate(async () => {
        document.documentElement.style.scrollBehavior = "auto";
        for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise(r => setTimeout(r, 80)); }
        scrollTo(0, 0); await new Promise(r => setTimeout(r, 1200));
      });
      const base = `${out}/v${id}_${v.name}`;
      await page.screenshot({ path: `${base}_fold.jpg`, type: "jpeg", quality: 80 });
      if (v.name === "desktop") await page.screenshot({ path: `${cards}/v${id}.webp`, type: "webp", quality: 70 });
      await page.screenshot({ path: `${base}_full.jpg`, type: "jpeg", quality: 70, fullPage: true });
      const errs = await page.evaluate(() => [...document.images].filter(i => i.complete && !i.naturalWidth).map(i => i.src));
      if (errs.length) console.log("broken images", id, v.name, errs);
    }
    console.log("shot v" + id);
  }
  await browser.close();
})();
