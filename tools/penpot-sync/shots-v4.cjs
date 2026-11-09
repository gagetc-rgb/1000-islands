// Screenshots of the v4 changes (5 Oct 2026) into review/shots-v4/.
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const out = "C:/Users/Kirill/Desktop/1000 islands/review/shots-v4";
fs.mkdirSync(out, { recursive: true });
const shots = [
  // [file name, page, width, height, selector to scroll to (or null), action]
  ["01-home-desktop", "home", 1440, 900, null],
  ["02-home-where-we-go", "home", 1440, 900, "#where"],
  ["03-raja-ampat-trips", "raja-ampat", 1440, 900, "#trips"],
  ["03b-north-sulawesi-areas", "north-sulawesi", 1440, 900, "#why"],
  ["05b-stories", "stories", 1440, 900, null],
  ["04-raja-ampat-trips-14-days", "raja-ampat", 1440, 900, "#trips", "days14"],
  ["05-yachts-boats", "yachts", 1440, 900, "#boats"],
  ["05c-yachts-helicopter-option", "yachts", 1440, 900, ".card.proof"],
  ["06-plan-prefilled", "plan.html?region=Raja+Ampat&level=Comfort&days=10", 1440, 900, null],
  ["07-admin-prices", "admin-simple", 1440, 1000, null, "prices"],
  ["08-admin-prices-yachts", "admin-simple", 1440, 1000, null, "prices-yachts"],
  ["09-raja-ampat-phone", "raja-ampat", 390, 844, "#trips"],
  ["10-home-phone", "home", 390, 844, null],
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  for (const [name, p, w, h, sel, action] of shots) {
    await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
    const url = `http://localhost:5173/${p.includes(".html") ? p : p + ".html"}`;
    await page.goto(url, { waitUntil: "networkidle0" });
    await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; return document.fonts.ready; });
    if (action === "days14") await page.evaluate(() => { const r = document.querySelector(".days-picker input"); r.value = 14; r.dispatchEvent(new Event("input")); });
    if (action && action.startsWith("prices")) await page.evaluate(() => document.getElementById("t-prices").click());
    if (action === "prices-yachts") await page.evaluate(() => document.querySelectorAll("#pr-region .chip")[2].click());
    if (sel) await page.evaluate((s, hdr) => { const e = document.querySelector(s); window.scrollTo(0, e.getBoundingClientRect().top + window.scrollY - hdr); }, sel, w < 600 ? 0 : 72);
    await new Promise(r => setTimeout(r, 300));
    await page.screenshot({ path: `${out}/${name}.png` });
    console.log(name);
  }
  await browser.close();
})();
