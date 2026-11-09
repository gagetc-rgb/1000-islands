// Screenshots + audit of the v5 site (5 Nov 2026): first screen and full page, desktop 1440x810 and phone 390x660,
// plus checks: console errors, horizontal overflow, text under 16px, broken images, heading skips.
// Needs the "directions" server on 5210. Run: node design-directions/_build/site-shoot.cjs [page,page] [outdir]
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const ALL = ["index", "home-card", "raja-ampat", "north-sulawesi", "yachts", "stories", "about", "advisors", "plan",
  "thank-you", "thank-you-advisor", "404", "unavailable", "privacy", "terms"];
const pages = process.argv[2] ? process.argv[2].split(",") : ALL;
const out = process.argv[3] || path.join(__dirname, "..", "site", "_shots");
fs.mkdirSync(out, { recursive: true });
const views = [
  { name: "d", width: 1440, height: 810, mobile: false },
  { name: "p", width: 390, height: 660, mobile: true },
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, args: ["--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  const errs = [];
  page.on("console", m => { if (m.type() === "error") errs.push(m.text()); });
  page.on("pageerror", e => errs.push(String(e)));
  for (const id of pages) for (const v of views) {
    errs.length = 0;
    await page.setViewport({ width: v.width, height: v.height, deviceScaleFactor: 1, isMobile: v.mobile, hasTouch: v.mobile });
    await page.goto(`http://localhost:5210/site/${id}.html?nocookies&n=${Date.now()}`, { waitUntil: "networkidle2" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForFunction(() => !document.documentElement.classList.contains("is-loading"), { timeout: 12000 }).catch(() => {});
    await page.evaluate(async () => {
      document.documentElement.style.scrollBehavior = "auto";
      for (let y = 0; y < document.body.scrollHeight; y += 400) { scrollTo(0, y); await new Promise(r => setTimeout(r, 90)); }
      scrollTo(0, 0); await new Promise(r => setTimeout(r, 1000));
    });
    const base = `${out}/${id}_${v.name}`;
    await page.screenshot({ path: `${base}_fold.jpg`, type: "jpeg", quality: 78 });
    await page.screenshot({ path: `${base}_full.jpg`, type: "jpeg", quality: 70, fullPage: true });
    const audit = await page.evaluate(() => {
      let wide = 0; document.querySelectorAll("main *, header *, footer *").forEach(el => { if (el.closest(".menu-panel,.hero-media,.tl-media video")) return; const b = el.getBoundingClientRect(); if (b.width && b.right > innerWidth + 1) wide = Math.max(wide, Math.round(b.right - innerWidth)); });
      const r = { overflowX: Math.max(document.documentElement.scrollWidth - innerWidth, wide), small: [], img: [], skips: [] };
      const vis = el => { const s = getComputedStyle(el); return s.display !== "none" && s.visibility !== "hidden" && el.getClientRects().length; };
      document.querySelectorAll("body *").forEach(el => {
        if (!vis(el) || el.closest(".loader,.sr-only,.ck,.ck-dialog,svg")) return;
        const own = [...el.childNodes].some(n => n.nodeType === 3 && n.textContent.trim());
        if (own && parseFloat(getComputedStyle(el).fontSize) < 16) r.small.push(el.tagName + "." + el.className + ": " + el.textContent.trim().slice(0, 30));
      });
      document.querySelectorAll("img").forEach(i => { if (i.complete && !i.naturalWidth) r.img.push(i.getAttribute("src")); });
      let last = 0;
      document.querySelectorAll("h1,h2,h3,h4").forEach(h => { if (h.closest("dialog,.ck,footer")) return; const n = +h.tagName[1]; if (last && n > last + 1) r.skips.push(h.tagName + " " + h.textContent.slice(0, 30)); last = n; });
      return r;
    });
    const issues = [];
    if (audit.overflowX > 0) issues.push(`overflowX ${audit.overflowX}`);
    if (audit.small.length) issues.push(`small ${audit.small.slice(0, 4).join(" | ")}`);
    if (audit.img.length) issues.push(`broken img ${audit.img.join(",")}`);
    if (audit.skips.length) issues.push(`skips ${audit.skips.join(",")}`);
    if (errs.length) issues.push(`console ${errs.slice(0, 3).join(" | ")}`);
    console.log(`${id} ${v.name}: ${issues.length ? issues.join(" ; ") : "ok"}`);
  }
  await browser.close();
})();
