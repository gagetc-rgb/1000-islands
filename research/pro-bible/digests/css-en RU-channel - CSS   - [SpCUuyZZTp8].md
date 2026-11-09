# CSS для начинающих: практический курс (CSS for beginners: a practical course) [original in Russian]
- Source: Vladilen Minin (YouTube, ru; **the file's caption is a poor machine translation into English**, `en.vtt`, with garbles such as "taiga" for tag, "Sesah" for CSS) · 2021-09-15 · 1 h 47 min · https://youtu.be/SpCUuyZZTp8
- Speaker(s) and why they matter: Vladilen Minin, a Russian-language programming educator; a long project-based beginner course where one portfolio-style page is built and published on GitHub Pages. His channel sells courses; no ad segment was visible in the sampled text.
- Relevance to course: 1 (lesson 6: how a beginner is taught CSS; box model and position; low reliability because of the caption) · Freshness matters? medium (2021; no flexbox or grid in this lesson, uses floats and fixed pixel widths)
- Codes: CSS, UI, HOST
- Notes: **method note: digest built from a sparse sample of the 105 minute-blocks (every second block, ~230 characters) plus keyword counts; the caption is machine-translated and partly unreadable, so no quotes are used and every claim below is only what could be recovered with reasonable confidence.** Treat as ◇ and do not use it to support any rule.

## Core thesis
Learn CSS by styling one real page step by step: connect CSS, select elements, set fonts and colours, understand the box model, position elements, add a responsive media query, then publish the finished page.

## Claims and advice
- [CSS] Three ways to attach CSS: inline in tags, in a `<style>` block and in a separate file; the external file is the one to use because inline rules become hard to manage. (6:11-14:26) — type: practice
- [CSS][TYPE] Colour formats (names, hex, RGB/RGBA); font weight from 100 to 900 and `font-family` stacks ending with a generic family such as `sans-serif`; load web fonts from Google Fonts and link them in the HTML. (10:19-24:41) — type: practice (matches `answers/14-typography.md` fallbacks)
- [CSS] Selectors: element, class, descendant; specificity makes a class or element rule override a more general one; make reusable classes (cards, buttons). (16:29-39:03, 1:05:36) — type: practice
- [CSS][UI] Box model: content, padding, border, margin; shorthand values (two values give vertical and horizontal); border styles. (45:09-51:20) — type: practice
- [CSS] Content width is limited to a container of about 750 px that shrinks on small screens (`max-width`), described as the "adaptive" option. (43:08) — type: practice (matches Powell's `max-width` wrapper advice)
- [CSS] `display` decides which properties apply (`td` is a table cell, inline vs block); the author notes that building a three-column layout with floats and extra classes is "not the best solution". (1:11:46-1:13:50) — type: practice
- [CSS] Link styling (no underline, visited colour), lists (remove default padding), form fields at 100% width, focus `outline`. (59:28-1:26:11) — type: practice
- [CSS] Positioning: `static` by default, then `relative`, `absolute`, `fixed`; fixed positioning relative to the window for navigation. (1:36:26-1:40:36) — type: practice
- [CSS][HOST] A `@media (max-width: …)` rule written after the base rules adapts the layout; finally the site is published on GitHub Pages. (1:42:36-1:44:41) — type: practice

## Techniques and steps
1. Create HTML skeleton; link a CSS file.
2. Style typography and colour; wrap content in a container.
3. Learn the box model; style forms and links.
4. Add a media query; publish on GitHub Pages.

## Tools and resources
- VS Code, Google Fonts, GitHub Pages.

## Quotes
- None (caption unreliable).

## Disagreements and contrarian points
- Teaches fixed pixel widths and float-based placement, whereas Powell and Chrome (2020-2024) teach `max-width`, `auto-fit` grids and `flex-wrap` (the `max-width` container is the shared point). Not a factual conflict; a dated beginner approach.

## For the course
Lesson 6: only as an example of how beginner CSS courses sequence topics (attach CSS, selectors, box model, position, media query). Not usable as evidence. A native-caption Russian transcript was not available in this run.

## Other
Search for a Russian-language CSS source with native captions was not repeated; see `candidates3.tsv`.
