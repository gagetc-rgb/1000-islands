# Modern Typographic Systems With Variable Fonts - Jason Pamental | CSSconf EU 2019
- Source: JSConf / CSSconf EU (YouTube, en) · 2019-07-08 · 31 min · https://youtu.be/0AsAjHPupKQ
- Speaker(s) and why they matter: Jason Pamental, typographer-developer who advises browser vendors and the W3C font group; same author as the Webflow (2016) and Codementor (2014) videos. Promotes his newsletter and book (30:54); mentions client work for a US state's agency sites (20:31-22:33).
- Relevance to course: 4 (lesson 9; accessibility and multi-script points) · Freshness matters? medium (2019 browser support statements dated)
- Codes: TYPE, CSS, A11Y, PERF
- Notes: no sponsor segments; many Tristan the dog interludes.

## Core thesis
Variable fonts plus CSS custom properties and `calc()` allow a fluid, user-adaptable type system: size, weight, width and line height scale with the screen and can respond to user preferences; type loading and subsetting exist to make that practical.

## Claims and advice
- [TYPE] "Type is the voice of our words"; fixing font loading is the gateway to better typography. (1:11-2:11) — type: opinion
- [TYPE] Beware "two weights only" advice: it was a performance rule, not good typography; modulating weight by size gives clearer type. (4:14-5:15) — type: opinion
- [TYPE][CSS] Variable fonts bundle weights and widths in one file; the type designer chooses which axes (weight, width, slant) are exposed. (6:15-7:17) — type: evidence
- [TYPE][A11Y] Using only viewport units for text size breaks page zoom (an accessibility problem); combine units in `calc()` with minimum and maximum sizes ("CSS locks") so it still zooms. (9:19-10:19) — type: practice
- [TYPE] Narrower width axis on small screens fits more characters per line without shrinking text; scale size, line height, width and weight together. (11:21-12:21) — type: practice
- [PERF][TYPE] A single 84 KB variable file replaced 18 files on a Monotype demo; IBM Plex Sans variable: 16 files (960 KB) replaced by two (233 KB). (13:23, 23:34) — type: evidence (vendor-supplied numbers)
- [A11Y][TYPE] Respect user preferences: dark mode via `prefers-color-scheme`, and increase the "grade" axis and letter spacing slightly in dark mode; offer controls for word spacing and line height. (14:24-19:27) — type: practice
- [A11Y] Crowding (a subset of dyslexia): increasing word spacing and line height raised reading comprehension "by 50%" in Microsoft research as relayed. (18:27-19:27) — type: evidence (secondhand, not verified)
- [TYPE][CSS] Use `@supports` to feed variable fonts to modern browsers and static fonts to IE11. (21:32-22:33) — type: practice
- [TYPE][PERF] W3C "progressive font enrichment" (experimental): send only the glyphs the page needs, cumulatively; matters most for Arabic (about 2.5 MB) and CJK fonts (16-20 MB). (26:38-30:54) — type: evidence (experimental)
- [TYPE] System fonts are fine but may not be the most legible or appropriate; web fonts matter. (29:50-30:54) — type: opinion

## Techniques and steps
1. CSS custom properties for size, weight, width.
2. `calc()` fluid scale with min/max.
3. Media queries for `prefers-color-scheme`; toggle classes for user controls.

## Tools and resources
- Firefox DevTools font panel (shows variable axes), v-fonts.com, Axis-Praxis (23:34-25:38)

## Quotes
- "we're not dictating the experience to the user we're giving them an experience which they can then choose to take or not" (14:24, paraphrase)

## Disagreements and contrarian points
- Leatherman cautions variable fonts can be larger (115 KB example); Pamental highlights files replaced.

## For the course
Lesson 9: fluid type with limits that still zooms; only a small "user adapts text" aside. The 50% figure is secondhand, mark ◇.

## Other
None.
