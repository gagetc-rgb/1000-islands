// Check browser-overlay findings: are the "occluded" links actually visible? which resource 404s on home?
const path = require("path"), fs = require("fs"), os = require("os");
const puppeteer = require(path.resolve(__dirname, "../../../tools/penpot-sync/node_modules/puppeteer-core"));
(async () => {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "b-verify-"));
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir });
  try {
    for (const [w, h] of [[1440, 790], [390, 664]]) {
      for (const k of ["home", "raja-ampat", "plan"]) {
        const page = await browser.newPage();
        const bad = [];
        page.on("response", r => { if (r.status() >= 400) bad.push(`${r.status()} ${r.url()}`); });
        await page.setViewport({ width: w, height: h, isMobile: w < 900, hasTouch: w < 900 });
        await page.goto(`http://localhost:5173/${k}.html`, { waitUntil: "load" });
        await page.evaluate(() => document.fonts.ready);
        const r = await page.evaluate(() => {
          const desc = e => { const cs = getComputedStyle(e); const b = e.getBoundingClientRect(); return `${e.tagName.toLowerCase()}.${String(e.className).trim().replace(/\s+/g, ".")} "${e.textContent.trim().slice(0, 20)}" rect=${Math.round(b.x)},${Math.round(b.y)},${Math.round(b.width)}x${Math.round(b.height)} vis=${cs.visibility} disp=${cs.display} op=${cs.opacity} checkVisibility=${e.checkVisibility({ opacityProperty: true, visibilityProperty: true })}`; };
          const navLinks = [...document.querySelectorAll("header a, nav a")].filter(a => /Raja Ampat|North Sulawesi|About|Travel agents|Plan your trip|WhatsApp|Guest stories|Yacht/.test(a.textContent));
          const anc = navLinks.map(a => { let p = a, chain = []; while (p && p !== document.body) { const cs = getComputedStyle(p); if (cs.visibility === "hidden" || cs.display === "none" || cs.opacity === "0" || cs.transform !== "none") chain.push(`${p.tagName.toLowerCase()}.${String(p.className).trim().replace(/\s+/g, ".")}[vis=${cs.visibility},op=${cs.opacity},tf=${cs.transform}]`); p = p.parentElement; } return desc(a) + (chain.length ? "  hiddenBy: " + chain.join(" > ") : ""); });
          const mbar = document.querySelector(".mbar");
          const scroller = document.querySelector(".grid.g3.scroll");
          const sc = scroller ? (() => { const b = scroller.getBoundingClientRect(); const c = scroller.firstElementChild.getBoundingClientRect(); const cs = getComputedStyle(scroller); return `scroller x=${Math.round(b.x)} w=${Math.round(b.width)} padL=${cs.paddingLeft} scrollPadL=${cs.scrollPaddingLeft} firstCard x=${Math.round(c.x)} overflowX=${cs.overflowX}`; })() : "no scroller";
          const tripScroll = [...document.querySelectorAll(".trip")].map(t => Math.round(t.getBoundingClientRect().x)).join(",");
          const tripParent = document.querySelector(".trip") ? getComputedStyle(document.querySelector(".trip").parentElement).overflowX : "";
          return { anc, mbar: mbar ? desc(mbar) + " classes=" + mbar.className : "none", sc, tripScroll, tripParent };
        });
        console.log(`\n== ${k} @ ${w}x${h}`);
        console.log("  HTTP>=400:", bad.length ? bad.join(" | ") : "none");
        r.anc.forEach(x => console.log("  " + x));
        console.log("  mbar:", r.mbar);
        console.log("  " + r.sc);
        console.log("  trip card x:", r.tripScroll, "parent overflowX:", r.tripParent);
        await page.close();
      }
    }
  } finally { await browser.close(); try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (_) {} }
})().catch(e => { console.error(e); process.exit(1); });
