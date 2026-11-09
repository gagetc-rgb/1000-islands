// Measures the first-screen headline on reference travel sites at 1440x900 (and our v1–v5 on localhost:5210),
// to anchor hero type sizes in what premium sites actually ship. Largest visible text in the first viewport = headline;
// the nearest smaller text block below it = lead. Run: node design-directions/_build/hero-bench.cjs [urls...]
const path = require("path");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const SITES = process.argv.slice(2).length ? process.argv.slice(2) : [
  "https://www.explora.com/", "https://www.bndcarhire.com/", "https://www.aman.com/", "https://www.sixsenses.com/en",
  "https://www.belmond.com/", "https://www.fourseasons.com/", "https://www.blacktomato.com/", "https://www.andbeyond.com/",
  "https://www.scottdunn.com/", "https://www.originaltravel.co.uk/", "https://www.abercrombiekent.com/", "https://www.audleytravel.com/",
  "https://www.intrepidtravel.com/", "https://www.rosewoodhotels.com/en/default", "https://www.oneandonlyresorts.com/",
  ...[1, 2, 3, 4, 5].map(n => `http://localhost:5210/v${n}.html`),
];
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  for (const url of SITES) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36");
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
      await new Promise(r => setTimeout(r, 2500));
      const r = await page.evaluate(() => {
        const H = innerHeight, W = innerWidth, items = [];
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        const seen = new Set();
        while (walker.nextNode()) {
          const t = walker.currentNode; if (t.textContent.trim().length < 3) continue;
          const el = t.parentElement; if (seen.has(el)) continue; seen.add(el);
          const cs = getComputedStyle(el); const rc = el.getBoundingClientRect();
          if (cs.visibility === "hidden" || +cs.opacity === 0 || rc.width < 40 || rc.bottom < 0 || rc.top > H) continue;
          if (el.closest("header, nav, [role=dialog], [class*=cookie], [id*=cookie], [class*=consent], [id*=onetrust]")) continue;
          const fs = parseFloat(cs.fontSize);
          items.push({ el, fs, rc, cs, text: el.innerText.trim().replace(/\s+/g, " ").slice(0, 60) });
        }
        if (!items.length) return null;
        items.sort((a, b) => b.fs - a.fs);
        const h = items[0];
        const lead = items.filter(i => i.fs < h.fs * .7 && i.fs >= 13 && i.rc.top >= h.rc.top - 5 && i.rc.top < h.rc.bottom + 260)
                          .sort((a, b) => a.rc.top - b.rc.top)[0];
        const lines = Math.round(h.rc.height / (parseFloat(h.cs.lineHeight) || h.fs * 1.2));
        const f = i => i && ({ fs: i.fs, fw: i.cs.fontWeight, ff: i.cs.fontFamily.split(",")[0].replace(/"/g, ""),
          ls_em: +((parseFloat(i.cs.letterSpacing) || 0) / i.fs).toFixed(3), lh: +((parseFloat(i.cs.lineHeight) || i.fs * 1.2) / i.fs).toFixed(2),
          tt: i.cs.textTransform, stretch: i.cs.fontStretch, text: i.text });
        return { head: { ...f(h), vh: +(h.fs / H * 100).toFixed(1), vw: +(h.fs / W * 100).toFixed(1), lines,
                         width_pct: Math.round(h.rc.width / W * 100), align: h.cs.textAlign, center_y_pct: Math.round((h.rc.top + h.rc.height / 2) / H * 100) },
                 lead: f(lead), ratio: lead ? +(h.fs / lead.fs).toFixed(2) : null };
      });
      console.log(JSON.stringify({ url, ...r }));
    } catch (e) { console.log(JSON.stringify({ url, error: e.message.slice(0, 80) })); }
    await page.close();
  }
  await browser.close();
})();
