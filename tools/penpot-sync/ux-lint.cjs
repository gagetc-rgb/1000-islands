// UI lint over every wireframe page at several screens: clipped text, sideways overflow, small tap targets,
// uneven cards in a row, squashed photo boxes, buttons/labels colliding with neighbours.
// Usage: node ux-lint.cjs [page,page] [WxH,WxH]   (wireframes served on :5173)
const puppeteer = require("puppeteer-core");
const fs = require("fs");
const all = fs.readdirSync("C:/Users/Kirill/Desktop/1000 islands/wireframes").filter(f => f.endsWith(".html")).map(f => f.replace(".html", ""));
const pages = process.argv[2] ? process.argv[2].split(",") : all;
const VP = (process.argv[3] || "1366x657,1920x950,1024x690,768x950,390x664,360x640").split(",").map(s => s.split("x").map(Number));
(async () => {
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir: __dirname + "/.chrome-profile" });
  const page = await browser.newPage();
  let total = 0;
  for (const [w, h] of VP) {
    await page.setViewport({ width: w, height: h, isMobile: w <= 768, hasTouch: w <= 768 });
    for (const k of pages) {
      if (w <= 768 && k.startsWith("admin")) continue;
      await page.goto(`http://localhost:5173/${k}.html?n=${Date.now()}`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      const out = await page.evaluate(() => {
        const res = [], W = innerWidth, phone = W <= 768;
        const vis = el => el.checkVisibility() && el.getBoundingClientRect().width > 0;
        const name = el => (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/)[0] : el.tagName.toLowerCase()) + ' "' + (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 28) + '"';
        // 1 page wider than the screen
        if (document.documentElement.scrollWidth > W + 1) res.push(`page scrolls sideways: ${document.documentElement.scrollWidth} > ${W}`);
        // 2 elements sticking out of the screen on the right / left (outside sideways-scrolling rows)
        for (const el of document.querySelectorAll("main *, header *, footer *")) {
          if (!vis(el) || el.closest(".scroll, .subnav, .grid.scroll, .moments.scroll, .menu-panel, details:not([open]), .label")) continue;
          const r = el.getBoundingClientRect();
          if (r.right > W + 1 || r.left < -1) { res.push(`sticks out of the screen: ${name(el)} (${Math.round(r.left)}..${Math.round(r.right)})`); break; }
        }
        // 3 clipped text: text box wider/taller than its own box while overflow hides it
        for (const el of document.querySelectorAll("main *, header *")) {
          if (!vis(el) || el.closest(".scroll, .subnav")) continue;
          const cs = getComputedStyle(el);
          if (!/hidden|clip/.test(cs.overflowX + cs.overflowY)) continue;
          if (el.classList.contains("ph") || el.classList.contains("card") || el.classList.contains("media")) {
            // cards / photo boxes clip on purpose; check only their direct text
            for (const t of el.querySelectorAll(":scope > .body, :scope > span, :scope > .wrap")) {
              const r = t.getBoundingClientRect(), b = el.getBoundingClientRect();
              if (r.bottom > b.bottom + 1 || r.right > b.right + 1) res.push(`text cut by its box: ${name(t)} in ${name(el)}`);
            }
            continue;
          }
          if (el.scrollWidth > el.clientWidth + 1 || el.scrollHeight > el.clientHeight + 1) res.push(`text cut: ${name(el)} (${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight})`);
        }
        // 4 buttons / inputs: content wider than the control
        for (const el of document.querySelectorAll(".btn, .input, .chip, .tag, .stage")) {
          if (!vis(el)) continue;
          if (el.scrollWidth > el.clientWidth + 1) res.push(`label wider than its control: ${name(el)} (${el.scrollWidth} > ${el.clientWidth})`);
        }
        // 5 tap targets on phones
        if (phone) for (const el of document.querySelectorAll("a, button, summary, .input, .chip")) {
          if (!vis(el) || el.closest(".label, .site-footer .bottom, p, li:not(.site-footer li)")) continue;
          const r = el.getBoundingClientRect();
          if (r.height < 40 || r.width < 40) res.push(`small tap target ${Math.round(r.width)}x${Math.round(r.height)}: ${name(el)}`);
        }
        // 6 cards in one row: buttons/meta at different heights
        for (const g of document.querySelectorAll(".grid:not(.scroll), .grid.scroll")) {
          if (!vis(g)) continue;
          const cards = [...g.children].filter(c => c.classList.contains("card") && vis(c));
          const rows = {};
          cards.forEach(c => { const t = Math.round(c.getBoundingClientRect().top); (rows[t] = rows[t] || []).push(c); });
          for (const row of Object.values(rows)) {
            if (row.length < 2) continue;
            const hs = row.map(c => Math.round(c.getBoundingClientRect().height));
            if (Math.max(...hs) - Math.min(...hs) > 2) res.push(`cards in a row differ in height ${hs.join("/")}: ${name(row[0])}`);
            const btn = row.map(c => c.querySelector(".btn, .link, .meta")).filter(Boolean).map(b => Math.round(b.getBoundingClientRect().bottom));
            if (btn.length === row.length && Math.max(...btn) - Math.min(...btn) > 2) res.push(`buttons in a card row not aligned ${btn.join("/")}: ${name(row[0])}`);
          }
        }
        // 7 squashed or stretched photo boxes
        for (const p of document.querySelectorAll(".ph")) {
          if (!vis(p) || p.closest(".who, .person, .badges") || p.classList.contains("media")) continue;
          const r = p.getBoundingClientRect(); const ratio = r.width / r.height;
          if (r.height < 60 && r.width > 200) res.push(`photo box very flat ${Math.round(r.width)}x${Math.round(r.height)}: ${name(p)}`);
          else if (ratio > 4.2 && !p.classList.contains("r-21x9")) res.push(`photo box very wide ${ratio.toFixed(1)}:1 (${Math.round(r.width)}x${Math.round(r.height)}): ${name(p)}`);
          else if (ratio < 0.45) res.push(`photo box very tall 1:${(1 / ratio).toFixed(1)}: ${name(p)}`);
        }
        // 8 long lines of text
        for (const el of document.querySelectorAll("main p, main li, main .lines")) {
          if (!vis(el)) continue;
          const fs = parseFloat(getComputedStyle(el).fontSize); const r = el.getBoundingClientRect();
          if (r.width / fs > 46 && el.tagName !== "DIV" && (el.textContent || "").length > 120) res.push(`line too long ~${Math.round(r.width / fs * 1.9)} chars: ${name(el)}`);
        }
        return [...new Set(res)];
      });
      if (out.length) { total += out.length; console.log(`\n${w}x${h} ${k}`); out.forEach(x => console.log("   " + x)); }
    }
  }
  console.log(`\nTOTAL ${total}`);
  await browser.close();
})();
