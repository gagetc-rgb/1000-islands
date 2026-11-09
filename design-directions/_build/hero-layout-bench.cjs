// Measures the hero COMPOSITION on reference travel sites (1 Nov 2026): where the copy block sits, its offsets, widths,
// gaps and where the buttons go, plus a screenshot per site. Complements hero-bench.cjs (type sizes only).
// Headline = largest visible text in the first viewport; lead = nearest smaller text below it; CTA = first link/button
// below or beside the headline inside the hero. Run: node design-directions/_build/hero-layout-bench.cjs OUTDIR [WxH] [urls...]
const path = require("path");
const fs = require("fs");
const puppeteer = require(path.join(__dirname, "../../tools/penpot-sync/node_modules/puppeteer-core"));
const [out = ".", size = "1440x900", ...urls] = process.argv.slice(2);
const [W, H] = size.split("x").map(Number);
const SITES = urls.length ? urls : [
  "https://www.explora.com/", "https://www.aman.com/", "https://www.sixsenses.com/en", "https://www.belmond.com/",
  "https://www.blacktomato.com/", "https://www.andbeyond.com/", "https://www.scottdunn.com/", "https://www.originaltravel.co.uk/",
  "https://www.abercrombiekent.com/", "https://www.audleytravel.com/", "https://www.rosewoodhotels.com/en/default",
  "https://www.oneandonlyresorts.com/", "https://www.bndcarhire.com/", "https://www.pelorusxp.com/", "https://www.natureair.com/",
];
fs.mkdirSync(out, { recursive: true });
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true });
  for (const url of SITES) {
    const page = await browser.newPage();
    await page.setViewport({ width: W, height: H });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36");
    const name = new URL(url).hostname.replace(/^www\./, "").split(".")[0] + (url.includes("localhost") ? url.match(/v\d/)[0] : "");
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 35000 });
      await new Promise(r => setTimeout(r, 3000));
      const r = await page.evaluate(() => {
        const H = innerHeight, W = innerWidth, items = [], seen = new Set();
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const t = walker.currentNode; if (t.textContent.trim().length < 3) continue;
          const el = t.parentElement; if (seen.has(el)) continue; seen.add(el);
          const cs = getComputedStyle(el), rc = el.getBoundingClientRect();
          if (cs.visibility === "hidden" || +cs.opacity === 0 || rc.width < 30 || rc.bottom < 0 || rc.top > H) continue;
          if (el.closest("header, nav, [role=dialog], [class*=cookie], [id*=cookie], [class*=consent], [id*=onetrust]")) continue;
          items.push({ el, fs: parseFloat(cs.fontSize), rc, cs, text: el.innerText.trim().replace(/\s+/g, " ").slice(0, 70) });
        }
        if (!items.length) return null;
        const h = [...items].sort((a, b) => b.fs - a.fs)[0];
        const lead = items.filter(i => i !== h && i.fs < h.fs * .7 && i.fs >= 13 && i.rc.top >= h.rc.bottom - 5 && i.rc.top < h.rc.bottom + 200
                                       && !i.el.closest("a,button")).sort((a, b) => a.rc.top - b.rc.top)[0];
        const ctas = [...document.querySelectorAll("a,button")].filter(b => {
          if (b.closest("header, nav, [role=dialog], [class*=cookie], [id*=onetrust]")) return false;
          const rc = b.getBoundingClientRect(), cs = getComputedStyle(b);
          return rc.width > 40 && rc.height > 20 && rc.top < H && rc.bottom > 0 && cs.visibility !== "hidden" && +cs.opacity > 0 &&
                 b.innerText.trim().length > 2 && rc.top > h.rc.top - 40 && rc.top < (lead ? lead.rc.bottom : h.rc.bottom) + 200;
        }).map(b => ({ b, rc: b.getBoundingClientRect() })).sort((a, b) => a.rc.top - b.rc.top || a.rc.left - b.rc.left);
        const c = ctas[0];
        const box = [h, lead, c].filter(Boolean).map(i => i.rc);
        const L = Math.min(...box.map(b => b.left)), R = Math.max(...box.map(b => b.right)),
              T = Math.min(...box.map(b => b.top)), B = Math.max(...box.map(b => b.bottom));
        const px = v => Math.round(v);
        return {
          h1: { fs: h.fs, fw: h.cs.fontWeight, ff: h.cs.fontFamily.split(",")[0].replace(/"/g, ""), lh: +(parseFloat(h.cs.lineHeight) / h.fs || 1.2).toFixed(2),
                lines: Math.round(h.rc.height / (parseFloat(h.cs.lineHeight) || h.fs * 1.2)), align: h.cs.textAlign, w: px(h.rc.width), text: h.text },
          lead: lead && { fs: lead.fs, w_ch: Math.round(lead.rc.width / (lead.fs * .5)), lines: Math.round(lead.rc.height / (parseFloat(lead.cs.lineHeight) || lead.fs * 1.4)),
                          gap_from_h1: px(lead.rc.top - h.rc.bottom), text: lead.text },
          cta: c && { text: c.b.innerText.trim().slice(0, 30), h: px(c.rc.height), below_h1: c.rc.top >= h.rc.bottom - 5,
                      gap_from_above: px(c.rc.top - (lead ? lead.rc.bottom : h.rc.bottom)), n: ctas.length,
                      right_of_copy: c.rc.left > (lead ? lead.rc.right : h.rc.right) },
          block: { left: px(L), left_pct: Math.round(L / W * 100), right_pct: Math.round(R / W * 100), width_pct: Math.round((R - L) / W * 100),
                   top_pct: Math.round(T / H * 100), bottom_gap: px(H - B), centre_y_pct: Math.round((T + B) / 2 / H * 100),
                   area_pct: Math.round((R - L) * (B - T) / (W * H) * 100) },
        };
      });
      await page.screenshot({ path: path.join(out, `${name}.jpg`), type: "jpeg", quality: 70 });
      console.log(JSON.stringify({ site: name, ...r }));
    } catch (e) { console.log(JSON.stringify({ site: name, error: e.message.slice(0, 80) })); }
    await page.close();
  }
  await browser.close();
})();
