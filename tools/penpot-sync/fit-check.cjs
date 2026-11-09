// Screen-fit check for the rules in LAYOUT_RULES.md (v5, 7 Oct 2026). Needs the wireframes served on :5173.
// R1 first screen ends on a clean edge (home: the hero IS the first screen, nothing below shows) · R2 a block opened
// from a tab/button fits one screen · R3 no photo taller than the screen. Runs in clean mode (design notes off).
// Usage: node fit-check.cjs [page,page] [WxH,WxH]
const puppeteer = require("puppeteer-core");
const pages = (process.argv[2] || "home,raja-ampat,north-sulawesi,yachts,stories,about,advisors,plan").split(",");
const VP = (process.argv[3] || "1440x640,1280x620,1366x657,1536x730,1440x790,1920x950,2560x1300,1024x690,768x950,390x660,390x664,360x640,844x340").split(",").map(s => s.split("x").map(Number));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage(); await page.setCacheEnabled(false);  // the profile cache served stale wf.css after edits
  let fails = 0;
  for (const [w, h] of VP) {
    await page.setViewport({ width: w, height: h, isMobile: w < 900 && h < 1000 && w !== 768, hasTouch: w < 900 });
    const short = h < 560;
    for (const k of pages) {
      await page.goto(`http://localhost:5173/${k}.html?n=${Date.now()}`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const r = await page.evaluate(async (short) => {
        document.documentElement.style.scrollBehavior = "auto";
        const out = [];
        const vh = innerHeight, B = el => el.getBoundingClientRect();
        // R1 first screen
        const hero = document.querySelector(".hero"), tabs = document.querySelector(".subnav");
        if (!short) {
          if (hero && hero.classList.contains("landing") && tabs) {
            const tb = B(tabs).bottom;
            if (Math.abs(tb - vh) > 2) out.push(`R1 tabs row bottom ${Math.round(tb)} ≠ screen ${vh}`);
          } else if (hero) {
            const hb = B(hero).bottom;
            if (Math.abs(hb - vh) > 2) out.push(`R1 home hero ends ${Math.round(hb)}, screen ${vh} (must end on the screen edge)`);
          } else {
            const phone = innerWidth <= 768;
            // phones: title + intro must show; the 2x2 team cannot share a phone screen with the intro
            const key = document.querySelector(phone ? ".first-screen .feature .btn, #plan-form, main .lines.lead" : ".first-screen .feature .btn, .team > div:last-child p, #plan-form");
            if (key) { const b = B(key); const lim = key.id === "plan-form" ? b.top + 160 : b.bottom; if (lim > vh) out.push(`R1 first content ends ${Math.round(lim)} > screen ${vh}`); }
          }
        }
        // R2 blocks opened from tabs / hero buttons
        const targets = [...new Set([...document.querySelectorAll('.subnav a[href^="#"], .hero a[href^="#"]')].map(a => a.getAttribute("href")))];
        for (const t of targets) {
          const el = document.querySelector(t); if (!el) continue;
          scrollTo(0, 0); await new Promise(r => setTimeout(r, 300));  // every jump starts from the top, like a real tab tap
          el.scrollIntoView(); await new Promise(r => setTimeout(r, 450));  // phones: the header slides away (.25s)
          const sec = el.closest("section"); const head = el.querySelector("h2") || el;
          const top = B(head).top;
          // phones: the slider and the first card's price (what it changes) must be visible together
          // phones: the slider and every level's price (stacked rows); home: the first destination's name
          let unitEl = innerWidth <= 768 && sec.querySelector(".trip") ? [...sec.querySelectorAll(".trip .trip-price")]
            : innerWidth <= 768 && sec.matches(".where") ? [sec.querySelector(".panel h3")]
            : [...sec.querySelectorAll(".trip .btn, .gallery, .where .panel")];
          let bottom = unitEl.length ? Math.max(...unitEl.map(e => B(e).bottom)) : null;
          const tabsB = tabs && getComputedStyle(tabs).position === "sticky" ? B(tabs).bottom : (document.querySelector(".site-header").getBoundingClientRect().bottom);
          if (top < tabsB - 1) out.push(`R2 ${t}: heading hidden under the bar (${Math.round(top)} < ${Math.round(tabsB)})`);
          // the phone contact bar covers the bottom of the screen once it shows
          const bar = document.querySelector(".mbar"); const barH = bar && getComputedStyle(bar).display !== "none" && bar.classList.contains("is-on") ? B(bar).height : 0;
          if (!short && bottom !== null && bottom > vh - barH + 1) {
            out.push(`R2 ${t}: block ends ${Math.round(bottom)} > screen ${vh}`);
          }
        }
        scrollTo(0, 0);
        // R3 photos
        const hdr = 72 + 53;
        if (!short) for (const p of document.querySelectorAll(".wrap .ph:not(.panel > .ph)")) { const b = B(p); if (b.height > vh - 64 && p.checkVisibility()) out.push(`R3 photo "${p.textContent.trim().slice(0, 24)}" ${Math.round(b.height)}px > screen`); }
        return out;
      }, short);
      const tag = `${w}x${h}`.padEnd(10) + k.padEnd(15);
      if (r.length) { fails += r.length; r.forEach(x => console.log(tag + x)); }
    }
  }
  console.log(fails ? `\n${fails} issue(s)` : "\nall rules pass");
  await browser.close();
})();
