# ¡Aprende CSS gratis! Curso de CSS desde cero para principiantes (digested in English)
- Source: midulive (YouTube, es; a live-streamed lesson) · 2023-10-20 · 1 h 43 min · https://youtu.be/hrxjBqZWsb0
- Speaker(s) and why they matter: the host of the midulive channel (known as midudev; the identity is from general knowledge, not stated in the caption), a popular Spanish-language programming educator; the stream is lesson 1 of a free CSS course for beginners. Informal live teaching; a follow-up lesson on the box model, Flexbox and grid is announced at the end (1:41:57), so these topics are not covered here.
- Relevance to course: 3 (lesson 6: CSS vocabulary; how the cascade and specificity decide which rule wins; units; box-sizing) · Freshness matters? low
- Codes: CSS, UI, TYPE
- Notes: **method note: digest built from every third minute-block (about 210 characters each) plus targeted reading of five blocks of the 19,800-word caption; the detailed examples were not read in full.** No sponsor segment seen in the sampled text; the channel is funded by streaming.

## Core thesis
CSS is a style language where the cascade, inheritance and specificity determine what the page looks like: learn the selectors, the units (and why a CSS pixel is not a device pixel), the default browser styles, and `box-sizing: border-box`, before moving on to layout.

## Claims and advice
- [CSS] CSS means cascading style sheets; browsers apply default styles, so inspecting an element in DevTools shows which rules apply and which were overridden (struck through). (3:06-12:14, 30:33) — type: practice
- [CSS] Selectors: element, class, id, descendant versus child (`>`), pseudo-classes (`:hover`, `:active`, `:first-child`), combined selectors. (15:14-58:02) — type: practice
- [CSS][UI] Colours: named, hexadecimal (shorthand with three digits), `hsl`; `currentColor` is old but very useful (borders follow the text colour). (18:18-27:29) — type: practice
- [CSS][TYPE] Fonts: system fonts need no download; `font-size` is inherited from the parent unless set; `initial` resets it. (33:37-39:43) — type: practice
- [CSS] The cascade: later rules win, but specificity wins first (id over class over element); `!important` overrides even that and abusing it causes problems (near-verbatim from 1:16:21); a browser ignores a value it does not support and uses the other declaration, so an older value can be written before a newer one as a fallback (1:07:14). (1:04:09-1:16:21) — type: practice
- [CSS] Pixels are not absolute: CSS pixels depend on device pixel ratio (a 4K screen is about 4000 physical pixels but behaves like 1920 x 1080 CSS pixels). (1:19:24) — type: evidence/practice (correct: CSS px is a reference unit)
- [CSS] Relative units: `%` and `vh`/`vw` (percent of viewport height or width) are shown at 1:22:28; the body has a default margin you did not set. Whether `rem`/`em` are covered in this lesson was not confirmed in the sampled text. (1:22:28-1:25:31) — type: practice (relative units underlie `answers/14-typography.md` rule 4)
- [CSS] CSS resets and "normalize": a total reset (margin, padding, border to 0) was popular but "is no longer such a good practice" because it removes useful defaults; `normalize` made rendering consistent without resetting everything. (1:25:31) — type: opinion/practice
- [CSS] `display: block` versus `inline` defaults: width and height apply only to block (and inline-block) elements. (1:28:35-1:31:42) — type: practice
- [CSS] Box model: content, padding, border; with `box-sizing: border-box` the declared width includes padding and border: "super important for the box model" ("lo que nosotros le ponemos aquí sea exactamente lo que va a medir nuestra caja"). (1:34:46-1:41:57) — type: practice

## Techniques and steps
1. Use DevTools to see which rules apply.
2. Prefer classes; avoid `!important` and ids for styling.
3. Use relative units.
4. Set `box-sizing: border-box`.

## Tools and resources
- MDN (CSS reference, 9:12), DevTools, and a specificity check he shows in DevTools (the tool's name is garbled in the caption).

## Quotes
- "lo que nosotros le ponemos aquí sea exactamente lo que va a medir nuestra caja" (1:40:55, about `box-sizing: border-box`; near-verbatim)
- "a día de hoy ya no es tan buena práctica" (1:25:31, said of the total CSS reset)

## Disagreements and contrarian points
- None found against other CSS sources in this set; the `!important` and reset remarks were not checked against them.

## For the course
Lesson 6: only the vocabulary (cascade, specificity, relative units, `box-sizing`) and the "pixels are not absolute" point. Rules about layout come from the Chrome/Powell/Comeau group.

## Other
The teaching style is slow and example-based; useful for non-coders' vocabulary, not for decisions.
