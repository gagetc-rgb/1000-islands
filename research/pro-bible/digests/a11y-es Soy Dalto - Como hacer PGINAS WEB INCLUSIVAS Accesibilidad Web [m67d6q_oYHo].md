# Como hacer PÁGINAS WEB INCLUSIVAS (Accesibilidad Web)
- Source: Soy Dalto (YouTube, es) · 2023-09-10 · 14 min · https://youtu.be/m67d6q_oYHo
- Speaker(s) and why they matter: Soy Dalto, Spanish-speaking web-dev teacher (sells courses). He relays a checklist sent by Paula, a blind viewer; the checklist text is partly read aloud, partly paraphrased. Not a specialist, but the content follows common WCAG basics.
- Relevance to course: 4 (lesson 4, accessibility) · Freshness matters? timeless
- Codes: A11Y, UX, CSS, FORM
- Notes: no sponsor. Opening 0:00-3:00 is story and a request to watch to the end. The caption turns "ARIA" into "área" and "Lighthouse" is not used. The "41% more errors" figure is quoted without naming its source (it sounds like the WebAIM Million survey, source not named in the video).

## Core thesis
Accessibility is much cheaper to build in from the start than to patch later. A short list of basics (keyboard, labels, alt, contrast, heading order, zoomable text) covers most of the value; the speaker says you do not need every feature on every site, but the basics always.

## Claims and advice
- [A11Y] The site must work with the keyboard alone; this is "the most important point". Tab moves to the next element, Enter activates it, assistive tech reads the focused element. (3:04) — type: practice
- [A11Y] Dynamic content that changes after load is invisible to screen-reader users unless the page announces it; ARIA live regions are the tool. (4:04-5:05) — type: practice
- [A11Y] First rule of ARIA: use a native HTML element if one exists. Saying quoted: "no usar ARIA es mejor que utilizar mal ARIA" (spoken as "área" in the caption). (5:05) — type: practice
- [A11Y] A survey of over a million home pages found pages with ARIA had 41% more detected errors than pages without. Source not named in the video. (6:08) — type: evidence (unverified here)
- [A11Y][FORM] Use proper elements: button for buttons, a for links, input for fields; every form field needs a label tied to it. (6:08-7:09) — type: practice
- [A11Y][IMG] Every image needs alt text; without it a screen reader reads the file name. The speaker also says "alt with title", which is loose; alt is what matters. (7:09) — type: practice
- [A11Y][UI] Contrast: text must stand out from the background; colour-blind users often see only lightness differences. Quick test: set saturation to zero with the CSS `filter` and see if the text still separates. (8:10-9:10) — type: practice
- [A11Y] Avoid colour combinations that tire the eyes; use online contrast checkers. (9:10) — type: opinion
- [A11Y] Test with real users with disabilities before calling a site accessible, like you test a login before launch. (9:10-10:12) — type: practice
- [A11Y][SEO] Heading levels in order; one h1; do not jump from h2 to h4. (10:12) — type: practice
- [A11Y] Tables only for tabular data, never for layout. (10:12-11:12) — type: practice
- [A11Y][CSS] Text must be resizable: avoid pixel font sizes and use relative units so the layout survives bigger text. (11:12) — type: practice
- [A11Y][UX] Do not autoplay audio/video; if media plays, make the stop control easy to find. (11:12-12:12) — type: practice
- [A11Y] Apply judgment about audience; a game site cannot meet every need, a blog or education site should do the basics (labels, contrast, labelled links, captions). (12:12-13:12) — type: opinion

## Techniques and steps
1. Make every interactive element reachable and usable with Tab and Enter.
2. Use native elements first; add ARIA only for dynamic widgets or live regions.
3. Label inputs and images.
4. Check contrast, including a greyscale test.
5. Check heading order; avoid layout tables; use rem/em text sizes.
6. Test with real assistive-technology users.

## Tools and resources
- CSS `filter: saturate(0)` / online contrast checkers: grayscale and contrast test (9:10)

## Quotes
- "no usar área es mejor que utilizar mal área" (5:05) — caption spelling of ARIA.

## Disagreements and contrarian points
- Warns about ARIA (pages with ARIA show more errors); Sara Soueidan, in another video, uses ARIA-aware CSS to repair semantics. Practical reading: native first.
- Offers a loose "alt with title" statement; title is not a substitute for alt.

## For the course
Lesson 4 (accessibility): the keyboard-first, native-HTML-first, label/alt/contrast/heading basics line up with Web Dev Simplified, freeCodeCamp and Script Raccoon. The "41% more errors" statistic needs the WebAIM Million page before it is used. Use the greyscale-filter test as a "check in a minute" for the course.

## Other
Language/inclusion aside near 1:01 ("1% of people") is a rough figure, not sourced; do not reuse it.
