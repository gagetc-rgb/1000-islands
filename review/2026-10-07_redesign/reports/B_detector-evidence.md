# Assessment B: detector and browser evidence (v4 grey prototype, 7 Oct 2026)

Method: isolated sub-agent, deterministic evidence only (no design opinion). Target: `wireframes/` (24 HTML files + `wf.css`, `wf.js`), live on `http://localhost:5173/`.
Raw outputs, scripts and JSON are in `review/2026-10-07_redesign/B-work/`. The wireframe files were md5-hashed before and after every step and did not change.

Marks: ◆ measured or confirmed here · ◈ likely · ◇ disputed / opinion.

---

## 1. CLI scan: `impeccable detect --json wireframes/`

| Run | Exit | Primary findings | Advisory |
|---|---|---|---|
| With project config (as the house rule requires) | **0** (clean) | **0** | 3 |
| `--no-config` (to show what the ignore hides) | 2 | 26 × `overused-font` | 3 |

◆ **Advisory findings (3, all in `wireframes/home.html`, line 0 = page-level, no line number):**

| Rule | Snippet |
|---|---|
| `numbered-section-labels` | tiny numbered label "03 · Remote, made easy" beside h2 "Remote, made easy" (3 on page) |
| `numbered-section-labels` | tiny numbered label "05 · For travel agents" beside h2 "For travel agents" |
| `numbered-section-labels` | tiny numbered label "06 · Start with an idea" beside h2 "Start with an idea" |

The source is the owner-annotation `<span class="label">NN · Name</span>` (`home.html:70, 94, 99`; style comment at `wf.css:52`, "annotation, not part of the design"). ◆ The same labels exist on every main page (counts in the table in section 4: 1 to 9 per page). The detector's heuristic matched only on home.

◆ **Suppressed by the project ignore** (`.impeccable/config.json`, `overused-font=inter`, Stage 1 only): 26 × `overused-font`, i.e. all 24 HTML files plus `wf.css:3` (Google Fonts Inter import) and `wf.css:42` (`font-family: 'Inter'`). This is the known placeholder face. CLAUDE.md says to remove the ignore once the brand typeface is chosen.

No other rule fired: no contrast, layout, typography-scale, em-dash or eyebrow findings in the static scan.

---

## 2. Browser overlay (live-server `detect.js` injected into the rendered pages)

**Flow and status**
- ◆ `impeccable live-server --background` started: port 8400, pid 10712. `/detect.js` served 200 (2.2 MB). Starting it did not modify any wireframe file (md5 diff empty).
- ◆ Headless Chrome via `tools/penpot-sync/node_modules/puppeteer-core`, with its own temp `userDataDir` and a fresh tab per page (`B-work/overlay.cjs`).
- ◆ Mutation preflight passed on all 10 runs: `document.title` was set to "[Human] …" and an appended `<script>` executed. `detect.js` was injected with `addScriptTag`, then the script waited 3 s and read the console. `window.impeccableScan` was present and `__impeccableCoreError` was null on every page. Overlay nodes rendered in the page (1 to 19 per page).
- ◆ Stopped with `impeccable live-server stop --keep-inject`. `--keep-inject` was used so the stop step would not run `live-inject --remove` against HTML. `/health` on :8400 no longer answers, and pid 10712 is gone.
- ◆ **No user-visible overlay exists.** Injection ran only in headless Chrome, not in a [Human] tab in the owner's browser.
- ◆ The browser overlay does **not** read `.impeccable/config.json`, so the waived `overused-font` resurfaces on every page.

**Console results.** The "found" count is the number of flagged elements; one element can carry several rules.

| Page | 1440×790 | 390×664 |
|---|---|---|
| home | 1 element: `overused-font` (Inter 96 % of text) + 3 × `numbered-section-labels` (same as CLI) | 10 elements: `overused-font`, 3 × `numbered-section-labels`, 1 × `edge-flush-cards`, 8 × `text-occlusion` |
| raja-ampat | 1: `overused-font` (97 %) | 8: `overused-font`, 1 × `body-text-viewport-edge`, 6 × `text-occlusion` |
| yachts | 1: `overused-font` (97 %) | 7: `overused-font`, 6 × `text-occlusion` |
| stories | 1: `overused-font` (99 %) | 5: `overused-font`, 4 × `text-occlusion` |
| plan | 1: `overused-font` (100 %) | 7: `overused-font`, 6 × `text-occlusion` |

Phone detail, verbatim and trimmed:
- `edge-flush-cards`: "2 cards flush against the left edge of div.grid.g3.scroll at rest (0px gap, e.g. a.card)" (home, Where we go row).
- `body-text-viewport-edge`: "<p> with 45-char body bleeds to viewport edge (right -234px)" on `p.small` "Island lodge + private speedboat · lodge name" (raja-ampat, Comfort trip card).
- `text-occlusion` (30 in total), all on the menu links: "Raja Ampat", "North Sulawesi", "Yacht charters", "Guest stories", "About", "Travel agents", "Plan your trip" (`a.btn.primary`), "WhatsApp" (`a.btn.ghost`). The detector reports each one "50–100 % covered by" the hero media (`div.ph.media`), `button.pause`, `h1`, `p.lead`, hero buttons, or on plan by `div.input` / `div.form-box` / `label`.

Other console output: ◆ one `404` on home, which is `http://localhost:5173/favicon.ico`. The wireframes have no favicon. It is not a detector finding.

---

## 3. The project's own checkers (`tools/penpot-sync/`, run one at a time)

**`node fit-check.cjs`** (8 pages × 10 viewports: 1366x657, 1536x730, 1440x790, 1920x950, 2560x1300, 1024x690, 768x950, 390x664, 360x640, 844x340), 2 min 41 s
```
all rules pass
exit=0
```

**`node ux-lint.cjs`** (all 24 pages × 6 viewports), exit 0
```
TOTAL 126
```
Breakdown (counted from `B-work/ux-lint.txt`):

| Count | Finding | Where |
|---|---|---|
| 48 | small tap target 38x44: a "Email" | footer, every page, at 768/390/360 |
| 48 | small tap target 29x44: a "FAQ" | footer, every page, at 768/390/360 |
| 12 | small tap target 29x52: a "FAQ" | in-page tabs row: raja-ampat, north-sulawesi, yachts, advisors |
| 9 | small tap target 46x16: a "Privacy" | email-advisor / email-owner / email-traveller templates |
| 3 | small tap target 39x52: a "Proof" | advisors tabs row |
| 6 | line too long ~100–111 chars: .note "Owner: …" | privacy, terms (owner instruction notes) |

The ux-lint threshold is 40×40 px (`ux-lint.cjs:55`).

**`node overlap-check.cjs`** (all pages at 1440 and 390), 46 s
```
TOTAL 0
exit=0
```

---

## 4. Measured facts per main page

Script: `B-work/measure.cjs`. Raw data: `B-work/measure-results.json` and `measure-output.txt`. Pages were loaded at scrollY 0, with fonts ready plus a 1.2 s settle.

Definitions:
- **Blocks**: owner-annotation labels ("NN · Name"), followed by the count of top-level `<section>` elements.
- **Boxes**: visible elements with a border on all 4 sides, excluding buttons, inputs, pills and annotations. Shown as content boxes + grey image placeholders (`.ph`).
- **Pills**: pill-shaped non-interactive labels. All of them turned out to be `.tag`. Grey placeholder text bars (`.lines i`) are excluded.
- **Font sizes**: distinct computed sizes of visible text, excluding the annotation labels and photo notes.
- **Buttons**: `.btn`/`button`/burger/chips visible at scrollY 0. "CTA" means a real call-to-action; the burger, the video pause button and form chips are listed apart.
- **Hero %**: the `.hero` section height ÷ viewport height. On region pages the section includes the key-facts band, so the media-only figure is given second.

### Desktop 1440×790 (header 73 px)

| Page | Height | Blocks | Boxes | Pills | Font sizes | Buttons in 1st screen | Hero % | Bottom edge of 1st screen |
|---|---|---|---|---|---|---|---|---|
| home | 4.5 screens (3571 px) | 6 / 7 | 6 (3 card, 3 review) + 5 ph | 8 | 10: 64,40,22,18,17,16,15,14,13,11 | 3 CTA (header "Plan your trip", "See destinations", "Plan your trip") + pause | 74 % (586 px) | "Where we go" section starts at 659 (131 px peek); its H2 is fully visible at 738–783 |
| raja-ampat | 5.7 (4498) | 6 / 5 | 9 (6 card, 2 review, 1 days-picker) + 9 ph | 1 ("Add-on") | 12: 64,40,24,22,18,17,16,15,14,13,12,11 | 3 CTA (header, "See trips and prices", "Plan a Raja Ampat trip") + pause | 84 % (665) / media 74 % (585) | sticky tabs row (Why go · Trips and prices · Reviews · FAQ) at 738–791, 1 px past the fold; next section starts at 791, 0 px peek |
| north-sulawesi | 5.5 (4371) | 6 / 5 | 9 + 9 ph | 1 | 12 (same set) | 3 CTA + pause | 84 % / media 70 % (556) | same tabs row pattern, 738–791 |
| yachts | 6.8 (5406) | 7 / 6 | 7 (6 card, 1 days-picker) + 3 ph | 12 (cabins / Air-con / Chef / Dive guide × 3 boats) | 13: adds 48 (statement H2) | 3 CTA + pause | 84 % / media 74 % | tabs row (Why a yacht · Boats and prices · Where we sail · FAQ), 738–791 |
| stories | 4.9 (3855) | 5 / 5 | 2 card + 5 ph | 2 | 9: 52,40,22,18,16,15,14,13,11 | 2 CTA (header, "Plan a trip like this") + pause | no `.hero`: 192 px title band (73–265), then story 1 media | story 1 occupies 265 to the fold; its H2 is at 602–647; the pause button sits at 719–767 on the bottom edge |
| about | 4.0 (3131) | 4 / 4 | 0 + 6 ph | 0 | 8: 52,40,18,16,15,14,13,11 | 1 CTA (header only) | no hero | block 01 ends at 778; "How we travel" section peeks 12 px with no text |
| advisors | 7.8 (6128) | 9 / 8 | **25** (12 tile, 6 icon, 4 card, 2 review, 1 form-box) + 8 ph, plus 5 inputs | 0 | 11: 64,40,22,18,17,16,15,14,13,12,11 | 2 CTA (header "Plan your trip", "Get trade rates" in the tabs row); no button in the hero | 84 % / media 74 % | tabs row with **7 items** (How we work · What we handle · Proof · What you can sell · Booking · FAQ · Get trade rates), 738–791 |
| plan | 2.2 (1723) | 1 / 1 | 1 form-box + 1 ph, plus 6 inputs | 0 | 9: 52,22,18,16,15,14,13,12,11 | 2 CTA (header "Plan your trip", which links to this same page, and "WhatsApp us") + 4 trip-type chips | no hero | trip-type chips "Yacht charter / Not sure yet" at 741–785 |

### Phone 390×664 (header 65 px)

| Page | Height | Blocks | Boxes | Pills | Font sizes | Buttons in 1st screen | Hero % | Bottom edge of 1st screen |
|---|---|---|---|---|---|---|---|---|
| home | 7.0 screens (4655 px) | 6 / 7 | 6 + 5 ph | 8 | 12: 40,30,20,19,18,17,16,15,14,13.3,13,11 | 2 CTA ("See destinations", "Plan your trip") + burger + pause | 76 % (502) | "Where we go" section starts at 567 (97 px peek); H2 fully visible at 623–657; phone bar hidden |
| raja-ampat | 8.9 (5894) | 6 / 5 | 9 + 7 ph | 1 | 13: 40,30,24,20,19,18,17,16,15,14,13.3,13,11 | 2 CTA + burger + pause | 82 % (547) / media 57 % (378) | tabs row at 612–665 (1 px past the fold), 4 tabs visible |
| north-sulawesi | 8.9 (5906) | 6 / 5 | 9 + 7 ph | 1 | 13 (same) | 2 CTA + burger + pause | 82 % / media 53 % (351) | tabs row at 612–665 |
| yachts | 9.0 (5948) | 7 / 6 | 7 + 3 ph | 12 | 13 | 2 CTA + burger + pause | 82 % / media 57 % | tabs row; 3 of 4 tab labels on screen (FAQ is off to the right) |
| stories | 7.2 (4808) | 5 / 5 | 2 + 5 ph | 2 | 11: 36,30,20,19,18,17,16,15,14,13,11 | 1 CTA ("Plan a trip like this") + burger + pause | no hero | story 1 starts at 254; H2 at 511–545; CTA at 577–625 |
| about | 5.2 (3484) | 4 / 4 | 0 + 6 ph | 0 | 10: 36,30,20,18,17,16,15,14,13,11 | **0 CTA** (burger only; the phone bar is not shown at the top) | no hero | team photo placeholder at the bottom edge; block 01 runs to 804 |
| advisors | **14.2** (9411) | 9 / 8 | 25 + 8 ph, plus 5 inputs | 0 | 11 | 1 CTA ("Get trade rates") + burger | 82 % / media 57 % | tabs row; 4 of 7 tab labels visible |
| plan | 4.0 (2664) | 1 / 1 | 1 + 1 ph, plus 6 inputs | 0 | 11: 36,20,19,18,17,16,15,14,13,12,11 | 0 CTA (burger only; no phone bar on form pages) | no hero | form label "Travellers" at 594–618 |

### Facts behind some cells (◆, from computed styles)
- The 1 px font-size steps 13/14/15/16/17/18/19 all occur on one page. Phone region and yacht pages use 13 distinct sizes. Desktop uses 8 to 13.
- 13.3 px is the browser default size on the phone carousel arrow buttons "‹ ›". They have no font-size set.
- 11 px is the logo tagline "Remote Indonesia" (header and footer) and, on phones, the key-facts labels (Where / Best months / Trip length). On desktop those labels are 12 px.
- Footer column headings are `h2` at 13 px, uppercase, letter-spaced (`wf.css:354`), 4 per page.
- Phone bar `.mbar` at scrollY 0: it has `display:grid` but sits at top 664, so 0 px are visible on every page that has it. Plan has no bar.
- The R1 rule ("next heading fully visible") is met on home: the H2 bottom is at 783 of 790 on desktop and 657 of 664 on phone. On region, yacht and advisor pages the tabs row ends 1 px below the fold, which is inside fit-check's ±2 px tolerance.

---

## 5. Likely false positives (with reasons)

| Finding | Verdict | Reason (evidence) |
|---|---|---|
| `text-occlusion` × 30 (phone, all 5 pages) | **False positive** ◆ | All 30 are links inside the closed burger menu `<details class="menu"> .menu-panel`. At 390 px their rects sit at x 342–495, mostly off-screen, and `checkVisibility()` returns false, so they are not rendered (`B-work/verify-fp-output.txt`). The detector measured content that is not visible. Opening the menu was not tested by the detector. |
| `overused-font` (browser, every page; CLI with `--no-config`) | **Known and accepted for Stage 1** ◆ | Inter is a declared placeholder. It is waived in `.impeccable/config.json` until the brand typeface stage. The browser overlay ignores project config, so it reappears there. |
| `numbered-section-labels` × 3 (home) | **False positive as a design finding** ◈, but valid as a presentation risk ◇ | These are owner-annotation labels (`.label`, "annotation, not part of the design"). They are not site design. They are still on every block of every page, though, so they show up in every screenshot the owner sees, and the BRIEF's house rules ban "section numbers as decoration". They must not reach the visual stage. The detector caught only home; the pattern is site-wide. |
| `body-text-viewport-edge` (raja-ampat phone, Comfort card text) | **False positive** ◈ | The card sits at x = 341 inside a horizontal scroller (`overflow-x: auto`). It is off-screen by design as part of a swipe row, so it does not bleed the page. |
| `edge-flush-cards` (home phone, Where we go row) | **Mostly a false positive** ◈ | The scroller sits inside the 16 px gutter (x 16, width 358) and the first card starts at x 16. The cards are flush with the scroller, not with the screen. A related measured fact: the row is clipped at x 374, so the next card's "peek" is cut at the gutter instead of running to the screen edge. |
| ux-lint small tap targets: footer "FAQ" 29×44, "Email" 38×44, tabs "FAQ" 29×52, "Proof" 39×52 | **Lint-strict, not an accessibility failure** ◈ | The lint uses 40×40 px. Every one of these is ≥ 44 px tall and ≥ 29 px wide, which exceeds the WCAG 2.2 SC 2.5.8 (AA) minimum of 24×24 CSS px ◆ (w3.org/WAI/WCAG22/Understanding/target-size-minimum). Widening the hit area is cheap, but it is not a P1. |
| ux-lint "Privacy" 46×16 in the email templates | **Real but low** ◈ | It is 16 px tall, below the 24 px minimum. It sits in email templates (rendered in mail clients, not the site), so it is P3. |
| ux-lint "line too long" on privacy/terms `.note` | **False positive** ◆ | These are owner instruction notes ("Owner: …"), not reading text. |
| `404 favicon.ico` | **Real, trivial** ◆ | The wireframes have no favicon. It belongs at the build stage, not this one. |

**Net deterministic signal:** with the accepted Inter waiver applied and the false positives removed, the detectors report no primary anti-pattern. The project's own fit and overlap checks are fully green. The measurements above are the substantive evidence: page lengths, box, pill and font-size counts, the number of CTAs per first screen, and what sits on each fold. They are for the synthesis to weigh. This assessment gives no design verdict.

---

## Files
- CLI: `B-work/detect.json` (config applied), `B-work/detect-noconfig.json`
- Overlay: `B-work/overlay.cjs`, `overlay-output.txt`, `overlay-results.json`; false-positive verification: `verify-fp.cjs`, `verify-fp-output.txt`
- Checkers: `B-work/fit-check.txt`, `ux-lint.txt`, `overlap-check.txt`
- Measurements: `B-work/measure.cjs`, `measure-output.txt`, `measure-results.json`
- Integrity: `B-work/wireframes-md5-before.txt` (identical after all steps)
