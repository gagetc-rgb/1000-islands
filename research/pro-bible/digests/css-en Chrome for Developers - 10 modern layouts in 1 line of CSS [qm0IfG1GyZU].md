# 10 modern layouts in 1 line of CSS
- Source: Chrome for Developers (YouTube, en; presenter "Una", a developer advocate on the Chrome team focusing on CSS) · 2020-07-16 · 21 min · https://youtu.be/qm0IfG1GyZU
- Speaker(s) and why they matter: a Google Chrome CSS developer advocate showing ten compact Grid/Flexbox techniques with live demos (site: 1linelayouts.glitch.me). First-party for browser features, practical and clear. Closes with a plug for her CSS podcast (20:42).
- Relevance to course: 3 (lesson 6 CSS/responsive: layouts that adapt without media queries, for reading AI-written CSS) · Freshness matters? medium: she says `clamp()` and `aspect-ratio` have limited support in July 2020 and `aspect-ratio` is "not in any stable browsers" (18:40); both have since shipped widely (I have not verified current support here, check caniuse)
- Codes: CSS, UI, PERF
- Notes: no sponsor segment. All claims are demonstrations; support statements are dated.

## Core thesis
A handful of one-line CSS declarations (Grid and Flexbox) give robust, responsive layouts without media queries: centring, wrap-and-stretch rows, sidebars, header/footer stacks, the holy-grail layout, 12-column grids, auto-fit card grids, `justify-content: space-between`, `clamp()` sizes and aspect ratios.

## Claims and advice
- [CSS] `fr` and `auto` units; `minmax()`, `min()`, `max()`, `clamp()`; `auto-fit`/`auto-fill` are the building blocks for responsive layouts "without media queries". (0:00-2:02) — type: evidence
- [CSS] Centring: `display: grid; place-items: center`. (2:02-3:03) — type: practice
- [CSS] "Deconstructed pancake": `flex: 0 1 150px` (do not grow) or `flex: 1 1 150px` (stretch) lets a row of items stack on narrow screens and spread on wide ones. (3:03-4:05) — type: practice
- [CSS] "Sidebar says": `grid-template-columns: minmax(150px, 25%) 1fr` sets a sidebar with a minimum width. (4:05-6:09) — type: practice
- [CSS] "Pancake stack": `grid-template-rows: auto 1fr auto` gives a header and footer that take the space they need while the middle fills the rest. (6:09-7:10) — type: practice
- [CSS] "Holy grail": `grid-template: auto 1fr auto / auto 1fr auto` (rows / columns) with placed items for header, left and right sidebar, main, footer. (7:10-9:15) — type: practice
- [CSS] 12-column grid with `repeat(12, 1fr)` and items placed by line numbers or spans. (9:15-11:20) — type: practice
- [CSS] "RAM" (repeat, auto, minmax): `repeat(auto-fit | auto-fill, minmax(150px, 1fr))` gives responsive card grids; `auto-fit` stretches to fill, `auto-fill` keeps the base size and leaves empty tracks. (11:20-13:26) — type: practice (correct description of auto-fit vs auto-fill; matches Powell with the difference that he recommends `auto-fit` 99% of the time)
- [CSS] Equal-height cards: `display: flex; flex-direction: column; justify-content: space-between` keeps first and last elements flush top and bottom. (13:26-15:30) — type: practice
- [CSS][TYPE] `width: clamp(23ch, 50%, 46ch)` keeps a card between 23 and 46 characters wide, improving legibility; `font-size: clamp(1.5rem, 10vw, 3rem)` for fluid type; "make sure that you have fallbacks and do your browser testing". (15:30-18:40) — type: practice (clamp for type agrees with `answers/14-typography.md` JP19; the character-width target matches WCAG 1.4.8's 80-character guideline as an AAA)
- [CSS][UX] `aspect-ratio: 16 / 9` keeps images, video and iframes in proportion, important for CMS-supplied media; at recording time it was experimental. (18:40-20:42) — type: practice at the time

## Techniques and steps
1. Pick the layout pattern (centre, stack, sidebar, grid).
2. Set the grid tracks with `fr`, `auto`, `minmax()`.
3. Let the browser wrap items (`auto-fit`, `flex-wrap`) instead of writing breakpoints.

## Tools and resources
- 1linelayouts.glitch.me, her CSS podcast.

## Quotes
- "place-items: center will solve all of your centered dilemmas" (2:02, near-verbatim)
- "make sure that you have fallbacks and do your browser testing" (17:36)

## Disagreements and contrarian points
- Powell recommends `auto-fit` almost always; Chrome shows when `auto-fill` is better. Not a conflict.
- The `aspect-ratio` browser-support statement is out of date; do not copy.

## For the course
Lesson 6: shows, in one place, the modern patterns an AI will output (grid/minmax/clamp/aspect-ratio), so an owner can recognise them. Do not quote the browser-support statements.

## Other
Not covering container queries, `:has()` or subgrid (all later features).
