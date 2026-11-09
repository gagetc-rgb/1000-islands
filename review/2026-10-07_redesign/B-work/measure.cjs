// Assessment B step 4: measured facts per main page at 1440x790 and 390x664 (wireframes on :5173).
// Output: measure-results.json + a printed summary.
const path = require("path"), fs = require("fs"), os = require("os");
const puppeteer = require(path.resolve(__dirname, "../../../tools/penpot-sync/node_modules/puppeteer-core"));
const pages = (process.argv[2] || "home,raja-ampat,north-sulawesi,yachts,stories,about,advisors,plan").split(",");
const VP = [[1440, 790], [390, 664]];
(async () => {
  const userDataDir = fs.mkdtempSync(path.join(os.tmpdir(), "b-measure-"));
  const browser = await puppeteer.launch({ executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe", headless: true, userDataDir });
  const results = [];
  try {
    for (const [w, h] of VP) for (const k of pages) {
      const page = await browser.newPage();
      await page.setViewport({ width: w, height: h, isMobile: w < 900, hasTouch: w < 900 });
      await page.goto(`http://localhost:5173/${k}.html`, { waitUntil: "load" });
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => { document.documentElement.style.scrollBehavior = "auto"; scrollTo(0, 0); });
      await new Promise(r => setTimeout(r, 1200));  // let wf.js settle (header, phone bar)
      const r = await page.evaluate(() => {
        const vh = innerHeight, vw = innerWidth;
        const vis = e => e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && e.getBoundingClientRect().width > 0 && e.getBoundingClientRect().height > 0;
        const txt = e => (e.textContent || "").trim().replace(/\s+/g, " ");
        const isAnno = e => !!e.closest(".label");
        const cs = e => getComputedStyle(e);
        const docH = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        // sections: top-level <section> (not nested), and annotation labels "NN · Name" (the owner-facing block list)
        const secs = [...document.querySelectorAll("section")].filter(s => !s.parentElement.closest("section") && vis(s));
        const labels = [...document.querySelectorAll(".label")].filter(vis).map(txt);
        // bordered boxes: visible border on all 4 sides; buttons, form controls, pills and annotations counted apart
        const all = [...document.querySelectorAll("body *")].filter(vis);
        const has4 = s => ["Top", "Right", "Bottom", "Left"].every(side => parseFloat(s["border" + side + "Width"]) >= 1 && s["border" + side + "Style"] !== "none" && !/rgba\(\d+, \d+, \d+, 0\)|transparent/.test(s["border" + side + "Color"]));
        const isCtl = e => e.matches("a.btn, button, input, select, textarea, summary, .input, .chip, .btn, label.chip") || !!e.closest("button, .btn");
        const isPill = (e, s) => { const b = e.getBoundingClientRect(); const rad = parseFloat(s.borderTopLeftRadius) || 0; return b.height <= 40 && b.width > b.height && rad >= b.height / 2 - 1; };
        let boxes = [], pillsStatic = [], pillsCtl = [], cards = 0, inputs = 0;
        for (const e of all) {
          if (isAnno(e) || e.closest(".lines, .ph-tag")) continue;  // .lines i = grey placeholder text bars, not pills
          const s = cs(e);
          const pill = isPill(e, s) && (has4(s) || !/rgba\(0, 0, 0, 0\)|transparent/.test(s.backgroundColor));
          if (pill) { const c = (e.className && typeof e.className === "string" && e.className.trim().split(/\s+/)[0]) || e.tagName.toLowerCase(); (isCtl(e) || e.matches("a") ? pillsCtl : pillsStatic).push(c + ":" + txt(e).slice(0, 24)); continue; }
          if (has4(s)) {
            if (e.matches("input, select, textarea, .input")) { inputs++; continue; }
            if (isCtl(e)) continue;
            boxes.push(e);
          }
        }
        cards = [...document.querySelectorAll(".card")].filter(vis).length;
        const boxClasses = {};
        for (const b of boxes) { const c = (b.className && typeof b.className === "string" && b.className.trim().split(/\s+/)[0]) || b.tagName.toLowerCase(); boxClasses[c] = (boxClasses[c] || 0) + 1; }
        // font sizes: computed size of every visible non-empty text node's parent
        const sizes = {}, sizesNoAnno = {};
        const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let n; (n = tw.nextNode());) {
          if (!n.textContent.trim()) continue;
          const p = n.parentElement; if (!p || !vis(p) || p.closest("script,style")) continue;
          const fs = Math.round(parseFloat(cs(p).fontSize) * 10) / 10;
          sizes[fs] = (sizes[fs] || 0) + 1;
          if (!isAnno(p) && !p.closest(".ph-tag")) sizesNoAnno[fs] = (sizesNoAnno[fs] || 0) + 1;
        }
        const sortN = o => Object.keys(o).map(Number).sort((a, b) => b - a);
        // buttons in first viewport (scrollY = 0)
        const inFirst = e => { const b = e.getBoundingClientRect(); return b.bottom > 0 && b.top < vh && b.right > 0 && b.left < vw; };
        const btns = [...document.querySelectorAll("a.btn, button, summary.burger, .chip, input[type=submit], input[type=range]")].filter(e => vis(e) && inFirst(e) && !isAnno(e));
        // fully on-screen vs cut by the bottom edge
        const kind = e => e.matches(".chip, input[type=range]") ? "control" : e.matches("button.pause, summary.burger") || (e.tagName === "BUTTON" && !e.matches(".btn")) ? "utility" : "cta";
        const btnList = btns.map(e => { const b = e.getBoundingClientRect(); return `${kind(e)}:${txt(e).slice(0, 22) || e.getAttribute("aria-label") || e.tagName.toLowerCase()}${b.bottom > vh ? " (cut)" : ""}`; });
        const ctaCount = btns.filter(e => kind(e) === "cta").length;
        // hero
        const hero = document.querySelector(".hero");
        const heroB = hero && vis(hero) ? hero.getBoundingClientRect() : null;
        const media = hero && hero.querySelector(".ph, .media");
        const mediaB = media && vis(media) ? media.getBoundingClientRect() : null;
        const header = document.querySelector(".site-header");
        const headerB = header ? header.getBoundingClientRect() : null;
        // bottom edge of the first viewport
        const sectionOf = e => { const s = e.closest("main > section, body > section, section, footer"); if (!s) return "?"; const l = s.querySelector(":scope > .label, .label"); return l ? txt(l) : (s.tagName.toLowerCase() + (s.id ? "#" + s.id : "")); };
        const atEdge = new Set(); const edgeSecs = new Set();
        for (const x of [0.1, 0.3, 0.5, 0.7, 0.9].map(f => Math.round(vw * f))) {
          for (const y of [vh - 3]) {
            const stack = document.elementsFromPoint(x, y).filter(e => e !== document.documentElement && e !== document.body);
            const top = stack[0];
            if (top) { edgeSecs.add(top.closest(".mbar") ? "phone bar (.mbar)" : sectionOf(top)); }
          }
        }
        // text elements crossing or within 48px above the bottom edge
        const leafText = [...document.querySelectorAll("h1,h2,h3,h4,p,a,button,label,li,span,b,figcaption,summary,blockquote")].filter(e => vis(e) && !isAnno(e) && txt(e) && [...e.children].every(c => !txt(c) || c.tagName === "BR" || c.tagName === "B" || c.tagName === "I"));
        for (const e of leafText) {
          const b = e.getBoundingClientRect();
          if (b.top < vh && b.bottom > vh - 48 && b.left < vw && b.right > 0) atEdge.add(`${e.tagName.toLowerCase()}${e.className && typeof e.className === "string" ? "." + e.className.trim().split(/\s+/)[0] : ""} "${txt(e).slice(0, 34)}" [${Math.round(b.top)}–${Math.round(b.bottom)}${b.bottom > vh ? ", cut" : ""}]`);
        }
        // next section after the hero / first section: how much of it peeks into the first screen
        const first = secs[0];
        const next = secs.find(s => s.getBoundingClientRect().top >= (first ? first.getBoundingClientRect().bottom - 1 : 0) && s !== first);
        const nextTop = next ? Math.round(next.getBoundingClientRect().top) : null;
        const nextH2 = next ? next.querySelector("h2, h1") : null;
        const mbar = document.querySelector(".mbar");
        const mbarState = mbar ? (() => { const b = mbar.getBoundingClientRect(); return { display: cs(mbar).display, cls: mbar.className, top: Math.round(b.top), visiblePx: Math.max(0, Math.round(Math.min(b.bottom, vh) - Math.max(b.top, 0))) }; })() : null;
        const subnav = document.querySelector(".subnav");
        return {
          vw, vh, docH, screens: +(docH / vh).toFixed(1),
          sectionsTopLevel: secs.length, annotationLabels: labels.length, labels,
          borderedBoxes: boxes.length, boxClasses, cardClass: cards, borderedInputs: inputs,
          pillsStatic: pillsStatic.length, pillsStaticTexts: [...new Set(pillsStatic)].slice(0, 12), pillsInteractive: pillsCtl.length, pillsInteractiveTexts: [...new Set(pillsCtl)].slice(0, 12),
          fontSizesAll: sortN(sizes), fontSizesNoAnno: sortN(sizesNoAnno),
          buttonsFirstViewport: btns.length, ctaFirstViewport: ctaCount, buttonsFirstViewportList: btnList, contentBoxes: boxes.filter(b => !b.matches(".ph")).length, phBoxes: boxes.filter(b => b.matches(".ph")).length,
          heroPct: heroB ? Math.round(heroB.height / vh * 100) : null, heroPx: heroB ? Math.round(heroB.height) : null, heroTop: heroB ? Math.round(heroB.top) : null, heroBottom: heroB ? Math.round(heroB.bottom) : null,
          heroMediaPx: mediaB ? Math.round(mediaB.height) : null, headerPx: headerB ? Math.round(headerB.height) : null,
          bottomEdgeSections: [...edgeSecs], bottomEdgeText: [...atEdge].slice(0, 8),
          nextSection: next ? { label: (next.querySelector(".label") ? txt(next.querySelector(".label")) : next.className || next.id), top: nextTop, peekPx: Math.max(0, vh - nextTop), h2: nextH2 ? { text: txt(nextH2).slice(0, 40), top: Math.round(nextH2.getBoundingClientRect().top), bottom: Math.round(nextH2.getBoundingClientRect().bottom) } : null } : null,
          subnav: subnav && vis(subnav) ? { top: Math.round(subnav.getBoundingClientRect().top), bottom: Math.round(subnav.getBoundingClientRect().bottom) } : null,
          mbar: mbarState,
        };
      });
      results.push({ page: k, viewport: `${w}x${h}`, ...r });
      await page.close();
    }
  } finally { await browser.close(); try { fs.rmSync(userDataDir, { recursive: true, force: true }); } catch (_) {} }
  fs.writeFileSync(path.join(__dirname, "measure-results.json"), JSON.stringify(results, null, 2));
  for (const r of results) {
    console.log(`\n== ${r.page} @ ${r.viewport}: ${r.screens} screens (${r.docH}px) | sections ${r.sectionsTopLevel} (labels ${r.annotationLabels}) | boxes ${r.borderedBoxes} ${JSON.stringify(r.boxClasses)} | .card ${r.cardClass} | inputs ${r.borderedInputs}`);
    console.log(`   pills static ${r.pillsStatic} ${JSON.stringify(r.pillsStaticTexts)} | pills interactive ${r.pillsInteractive} ${JSON.stringify(r.pillsInteractiveTexts)}`);
    console.log(`   font sizes all ${r.fontSizesAll.length} [${r.fontSizesAll}] | excl. annotations ${r.fontSizesNoAnno.length} [${r.fontSizesNoAnno}]`);
    console.log(`   buttons 1st screen ${r.buttonsFirstViewport} (cta ${r.ctaFirstViewport}): ${r.buttonsFirstViewportList.join(" | ")}`);
    console.log(`   content boxes ${r.contentBoxes} + image placeholders ${r.phBoxes}`);
    console.log(`   hero ${r.heroPct}% (${r.heroPx}px, top ${r.heroTop} bottom ${r.heroBottom}, media ${r.heroMediaPx}px) header ${r.headerPx}px subnav ${JSON.stringify(r.subnav)}`);
    console.log(`   bottom edge sections: ${r.bottomEdgeSections.join(" / ")} | next: ${JSON.stringify(r.nextSection)}`);
    console.log(`   bottom text: ${r.bottomEdgeText.join(" ; ")}`);
    console.log(`   mbar: ${JSON.stringify(r.mbar)}`);
  }
})().catch(e => { console.error(e); process.exit(1); });
