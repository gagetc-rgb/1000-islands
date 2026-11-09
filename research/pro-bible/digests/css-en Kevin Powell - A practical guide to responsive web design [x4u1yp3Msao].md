# A practical guide to responsive web design
- Source: Kevin Powell (YouTube, en) · 2024-01-16 · 23 min · https://youtu.be/x4u1yp3Msao
- Speaker(s) and why they matter: Kevin Powell, a widely followed CSS educator; this video teaches the "work with the browser" mindset (intrinsic design, a term he credits to Jen Simmons). Plugs his free "Conquering Responsive Layouts" email course and thanks Patreon supporters (22:17).
- Relevance to course: 4 (lesson 6 CSS/responsive: why layouts overflow and the safe defaults; checking AI output) · Freshness matters? low (2024)
- Codes: CSS, UI, UX
- Notes: single-author practice; no sponsor; the course plug is his own free product.

## Core thesis
Most responsive problems come from CSS we wrote; keep the browser's defaults, hint rather than dictate (min/max, wrap, auto-fit), and use media queries only to add complexity at larger sizes.

## Claims and advice
- [CSS][IMG] An un-styled page is already responsive; images overflowing is the usual first problem, so add `img { display: block; max-width: 100% }` (large SVGs and `<picture>` may need extra selectors). (1:01-2:02) — type: practice (matches the responsive-images pages; see `answers/15-imagery.md`)
- [CSS] "Whenever you run into issues with responsiveness, it means you wrote some CSS that caused it." (2:02) — type: opinion
- [CSS] Do not set fixed `height` on layout blocks; use `min-height` so content can grow; likewise prefer `max-width` on wrappers (e.g. 960 px) with `margin-inline: auto` over a width per breakpoint. (3:03-8:05) — type: practice
- [CSS] Fixed widths are fine for small elements such as an avatar. (8:05) — type: practice
- [CSS] Do not declare what you do not need: `width: 100vw` on the body causes horizontal scroll because `vw` ignores a visible scrollbar; block elements already fill the width, and `auto` is better than `100%` for most things. (8:05-10:08) — type: practice (a known cause of horizontal scroll; I have not checked the scrollbar behaviour against a spec)
- [CSS][TYPE] Use viewport units sparingly; he uses them in `clamp()` for padding, or `min-height: 80vh` for a hero so the next content peeks in. (11:08-12:08) — type: opinion
- [CSS] Flex rows: `display: flex; gap` plus `flex-wrap: wrap` avoids overflow without media queries; use grid for grid jobs. (13:09-15:09) — type: practice
- [CSS][UX] Intrinsic design: `grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))` makes the number of columns follow the available space, so no breakpoints; "auto-fit is the one you want 99% of the time". (15:09-18:13) — type: practice
- [CSS] Media queries are still needed for specific switches (a sidebar layout at 760 px): add complexity at larger sizes (`min-width`) rather than removing it with `max-width`; choose breakpoints where the layout starts to look squished, not by device. (18:13-22:17) — type: opinion/practice (min-width mobile-first matches Una's and MDN's approach; mobile navigation is the exception he names)
- [CSS] Intrinsic components respond to the space they live in, not the viewport. (20:15) — type: practice

## Techniques and steps
1. Reset images; avoid fixed heights; use `max-width` wrappers.
2. Use `flex-wrap` and `auto-fit` grids first.
3. Add `min-width` media queries only where a layout must switch.

## Tools and resources
- Browser responsive mode (Chrome DevTools), his free 21-day course.

## Quotes
- "work with the browser, not against it" (10:08, near-verbatim)
- "widths you tend to do max widths, heights you tend to do min heights" (7:05, near-verbatim)

## Disagreements and contrarian points
- Chrome's one-line layouts video and Powell agree on the grid recipe; Powell stresses `auto-fit`, Una shows both.
- None found against other sources in this set; see the Comeau and course-style CSS digests for how beginners' courses teach layout.

## For the course
Lesson 6: a ready checklist for reviewing AI-written CSS: fixed heights? `100vw`? media-query forests where `auto-fit`/`flex-wrap` would do? Use it as ◈ with Chrome's video and MDN.

## Other
None.
