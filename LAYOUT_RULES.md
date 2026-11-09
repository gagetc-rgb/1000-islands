# Layout rules: what fits on one screen

**Adopted:** 6 October 2026, after the owner-link review found blocks split across screens on ordinary laptops. **Revised 7 October 2026 (v5)** after the full-site review (`review/2026-10-07_redesign/`): the home hero no longer shows the next heading, image slots keep fixed shapes, design notes are hidden by default.
**Why:** the wireframes had been checked only at 1440x900. The most common laptop screens are smaller in height, and the layout was sized by width only, so blocks were cut by the screen edge at random. The 6 Oct fix sized photos by screen height, which made their shapes float (heroes became 2.5–3:1 letterboxes, product photos 2.3–2.8:1 strips); v5 fixes the shapes instead.
**Checked by:** `tools/penpot-sync/fit-check.cjs` (all rules, 10 screen sizes; runs in clean mode), `tools/penpot-sync/snap.cjs` + `tile.py` (every page screen by screen).

## How it works

Responsive layout is a set of rules per screen class, not one picture that gets scaled. The layout recomposes, but what has to be visible together stays together. CSS does this with:
- width breakpoints (phone ≤768, small tablet ≤999, tablet ≤1024, desktop),
- height breakpoints for headings (≤820 and ≤720 px of visible height),
- spacing in `clamp(min, % of screen height, max)`,
- screen-height units (`svh`) for heroes and one-screen compositions,
- fixed `aspect-ratio` for image slots (R5).

## Reference screens (visible area = screen minus browser bars)

| Class | Sizes checked |
|---|---|
| Laptop | 1440x640 (1440x810 = 2880x1620 at 200%, measured 8 Oct), 1280x620 (1920x1080 at 150%), 1366x657 (1366x768), 1536x730 (1920x1080 at 125%), 1440x790 (MacBook Air 13) |
| Desktop | 1920x950, 2560x1300 |
| Tablet | 1024x690 (landscape), 768x950 (portrait) |
| Phone | 390x660, 390x664 (iPhone 13/14 in Safari), 360x640 (small Android) |
| Short | 844x340 (phone turned sideways) |

**Penpot boards (8 Oct 2026):** the first screen of every board is the visible browser window, not the whole screen: desktop boards 1440x640, phone boards 390x660 (were 1440x900 and 390x844, so heroes ran past the bottom of a real browser window). A static board cannot stretch like `100svh`; on taller windows the next block just starts to show below the hero.

## Rules

**R1. The first screen ends on a clean edge, never in the middle of a block.**
- Home: the hero **is** the first screen (100svh minus the header) on every screen class and ends exactly on the screen edge; nothing of the next block shows. A "Where we go ↓" cue on the hero line says the page continues. (Decided 7 Oct: the peeking "Where we go" heading read as a crop; 12 of 15 category sites do the same on desktop.)
- Pages with tabs (Raja Ampat, North Sulawesi, Yachts, Travel agents): header + photo + key-facts band + tabs row fill the screen exactly. The tabs row is the cue that the page continues. Phones: one hero button, three key facts.
- Pages without a photo hero: the page title and the first real content share the first screen (Guest stories: title + featured story with its button; About: title + the 2x2 team; Plan your trip: title + the start of the form). On phones only the title and intro are required for About.
- A heading cut by the bottom of the first screen is always a defect.

**R2. A block opened from a tab or a button fits one screen together with its heading** (from 1366x768 up).
- Trips and boats: heading and days slider share a row; all three levels with price and button are visible. Photos 3:2, 2:1 on short laptops (≤720px tall).
- Photo groups: one large + two small, the whole group visible under its heading (large photo 2:1, 3:2 on screens taller than 820px).
- Home "Where we go": heading column with the small locator map + the two destination panels (portrait, 3:4–4:5) fit one screen. Yacht charters follow as a separate, quieter band.
- Phones: the days slider and **all three** levels with their prices are visible together (levels are stacked tappable rows, not a carousel). Home on phones: the heading and the first destination's name.
- A tab click lands the heading 24px under the tabs row (desktop) or 16px under the tabs row (phones, where the tabs row takes the header's place).

**R3. No single photo is taller than the visible screen.** A portrait in a split gets a little wider instead (it stays in its 4:5–1:1 range).

**R4. Short screens (height under 560px): nothing is forced to screen height.** Heroes take the height of their content, the tabs row stops sticking, the header slides away on scroll. On a phone turned sideways a block cannot fit one screen; it stays readable instead. Forms go single-column.

**R5. Every image slot keeps its shape.** Five shapes site-wide: 16:9 full-bleed (heroes, story band; phones get their own 9:16 or 4:5 cut), 3:2 landscape content (levels, boats, gallery, story cards), 4:5 portrait content (destination panels, Why a yacht, How we travel, route stops, team), 16:9 video inset, 1.91:1 link previews. Height-driven sizing only for full-bleed media and one-screen compositions, and only inside the shape's range. The creative spec per slot is in `review/2026-10-07_redesign/CREATIVE_SPEC_ru.md`.

**R6. Design notes are hidden by default.** Block numbers for comments, photo specs and section lines appear with `?notes=1`, the N key or the footer link "Design notes". Owner links for commenting open with `?notes=1`. Penpot extraction runs in notes mode; fit-check and screenshots run in clean mode.

## What is normal, not a defect

- While scrolling, the next block always starts at the bottom edge and is cut by it. That is how every long page works (the home hero is the only place where we design the edge).
- Long text blocks (FAQ, legal pages, a full guest story) and forms are taller than one screen. Forms start on the first screen; the send button may need a scroll.
- Big screens (1920 and up) show more white space around the same blocks; content width is capped at 1200px on purpose (readable line length).

## When adding or changing a page

1. Use the existing tokens (`--sec`, `--sec-l`, `--sec-s`, `--gap-head`, `--display`, `--h1`, `--h2`, `--h3`, `--lead`) instead of fixed paddings or font sizes.
2. Photos inside content: use one of the R5 shapes (`.r-16x9`, `.r-3x2`, `.r-4x5`) and rely on the R3 cap; never size a content photo by screen height.
3. Run `node tools/penpot-sync/fit-check.cjs` (wireframes served on :5173). It must print "all rules pass".
4. Then the usual gates: `impeccable detect wireframes/` exits 0, `overlap-check.cjs` finds nothing.
5. UI pass: `ux-lint.cjs` and `snap.cjs <baseUrl> <outDir> <WxH> <scale> <cols> <pages>` + `tile.py` (every page screen by screen, one sheet per page) for the visual look.
