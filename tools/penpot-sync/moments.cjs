// Before/after pairs: the same moment (page + anchor) captured in two served versions, glued side by side.
// Usage: node moments.cjs <beforeBase> <afterBase> <outDir>
//   e.g. node moments.cjs http://localhost:5174/archive/wireframes-v4-before-redesign-7oct http://localhost:5173 ../../review/2026-10-07_redesign/compare/img
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const path = require("path");
const sharp = (() => { try { return require("sharp"); } catch (e) { return null; } })();
const [before, after, outArg] = process.argv.slice(2);
const out = path.resolve(outArg);
fs.mkdirSync(out, { recursive: true });
// [id, page, selector or "" for the top, viewport]
const M = [
  ["home-top-d", "home", "", "1440x790"], ["home-where-d", "home", "#where", "1440x790"], ["home-mid-d", "home", ".cta", "1440x790"],
  ["home-top-p", "home", "", "390x664"], ["home-where-p", "home", "#where", "390x664"],
  ["ra-top-d", "raja-ampat", "", "1440x790"], ["ra-why-d", "raja-ampat", "#why", "1440x790"], ["ra-trips-d", "raja-ampat", "#trips", "1440x790"],
  ["ra-top-p", "raja-ampat", "", "390x664"], ["ra-trips-p", "raja-ampat", "#trips", "390x664"],
  ["ya-boats-d", "yachts", "#boats", "1440x790"],
  ["adv-top-d", "advisors", "", "1440x790"], ["adv-proof-d", "advisors", "#proof", "1440x790"], ["adv-terms-d", "advisors", "#terms", "1440x790"],
  ["about-top-d", "about", "", "1440x790"], ["stories-top-d", "stories", "", "1440x790"], ["plan-top-p", "plan", "", "390x664"],
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: require("os").tmpdir() + "/moments-" + process.pid });
  const page = await browser.newPage();
  for (const [id, pg, sel, size] of M) {
    const [w, h] = size.split("x").map(Number);
    await page.setViewport({ width: w, height: h, deviceScaleFactor: w < 600 ? 1 : 0.6, isMobile: w < 600, hasTouch: w < 600 });
    for (const [tag, base] of [["a", before], ["b", after]]) {
      await page.goto(`${base}/${pg}.html?notes=0&n=${Date.now()}`, { waitUntil: "load" });
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; return document.fonts.ready; });
      if (sel) {
        await page.evaluate(s => { const el = document.querySelector(s); if (el) el.scrollIntoView(); }, sel);
        await new Promise(r => setTimeout(r, 500));
        await page.evaluate(() => window.scrollBy(0, 1));   // phones: lets the header slide away like a real scroll
        await new Promise(r => setTimeout(r, 400));
      }
      await new Promise(r => setTimeout(r, 300));
      fs.writeFileSync(`${out}/${id}_${tag}.png`, await page.screenshot({ type: "png" }));
    }
    console.log(id);
  }
  await browser.close();
})();
