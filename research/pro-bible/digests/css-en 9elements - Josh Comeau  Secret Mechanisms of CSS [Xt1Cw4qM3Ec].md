# Josh Comeau – Secret Mechanisms of CSS
- Source: 9elements (YouTube, en; talk at the CSS Café meetup, speaker Josh Comeau) · 2022-03-28 · 45 min · https://youtu.be/Xt1Cw4qM3Ec
- Speaker(s) and why they matter: Josh Comeau, a front-end developer and educator who sells the paid course "CSS for JavaScript Developers" (promoted with a 10% code at 42:03-44:05). The talk explains why CSS "magic" breaks, by treating CSS as a set of layout algorithms (flow, positioned, flexbox, grid) that each implement properties their own way.
- Relevance to course: 3 (lesson 6: why a snippet that works once fails elsewhere; mental models for height, z-index and flex) · Freshness matters? low-medium (2022: he says the new viewport units are not yet in any browser, 19:34)
- Codes: CSS, UI
- Notes: course promotion at the end (not a sponsor). Explanations are demonstrated live and mostly correct to my reading, but I have not checked each claim against the specs; the talk covers flow, positioned and flexbox layouts only (he says he will focus on "these first three", 4:10) and does not get to grid.

## Core thesis
CSS is "magical": a little code does a lot because each layout mode (flow, position, flexbox, grid) defines how properties behave; when something breaks, the cause is often a rule of the layout mode that you did not know (containing block, stacking context, flex-basis), so learn the mechanisms.

## Claims and advice
- [CSS] Block elements are "greedy": they fill the available width and do not sit side by side; inline elements go with the flow and ignore vertical margin; `inline-block` takes part in layout like a block but is placed like inline; only inline can line-wrap. (4:10-12:23) — type: practice
- [CSS] `width: auto` is not the same as `width: 100%`: auto fills what is left after margins; 100% plus margin overflows. (7:16-8:16) — type: practice
- [CSS] Width is resolved by looking up the tree (parent's available space); height is resolved by looking down (children's heights), so `height: 100%` on a child of an auto-height parent does nothing; to make `height: 100%` work, give `html` and `body` heights, or better use `min-height`. (12:23-17:32) — type: practice (the standard "sticky footer" explanation)
- [CSS][UX] `100vh` on mobile resolves to the tallest viewport (browser toolbars hidden) and can push content below visible UI; new viewport units were "coming" in 2022. (18:33-19:34) — type: evidence at the time, **dated** (the small/large/dynamic viewport units have since shipped; check current support before relying)
- [CSS] Absolute positioning anchors to the nearest positioned ancestor, otherwise the "initial containing block" (the viewport-sized box); fixed positioning anchors to the viewport itself. (20:36-22:37) — type: practice
- [CSS] `z-index` works because the positioned layout (and flex children) implement it, not only because `position` is set; stacking contexts: z-index values are compared inside a context, like version numbers (1.999 never beats 2.0), so a tooltip with `z-index: 9999` can still be behind a header in another context. (23:39-29:48) — type: practice
- [CSS] Flexbox redefines `width` as a "hypothetical size": a flex item can shrink below its declared width; `flex: 1` also sets `flex-basis: 0`, which is why equal columns appear; equal columns need equal padding/border; `flex-basis` behaves like width in a row. (29:48-37:58) — type: practice
- [CSS] `justify-content` aligns the items as a group along the main axis; `align-items` aligns individual items on the cross axis; margin `auto` in a flex container absorbs extra space. (37:58-41:02) — type: practice

## Techniques and steps
1. When a snippet "stops working", ask which layout mode and which containing block or stacking context applies.
2. Use `min-height` instead of `height`.
3. Check z-index conflicts by finding the stacking context.
4. Use `flex: 1` knowing that it sets `flex-basis: 0`.

## Tools and resources
- DevTools element inspector; his course CSS for JavaScript Developers (css4js.dev, promoted); a collapse-margin mini game in the course.

## Quotes
- "css is kind of a magical language" (1:07, "in the same sense as Rails magic")
- "for width you look up the tree, for height you look down the tree" (15:29, near-verbatim)
- "the minor version is never going to surpass a major version" (28:47, about stacking contexts, near-verbatim)

## Disagreements and contrarian points
- Powell teaches the same defaults (use `min-height`, let `auto` work); Comeau explains why. They agree.
- The 100vh problem and "new units are coming" are time-bound; Powell (2024) still uses `vh` with `min-height` for heroes (see his digest).

## For the course
Lesson 6: use as the explanatory layer for debugging AI-written CSS (height chain, z-index conflicts, flex-basis) and for the point that a rule that works in one place can fail in another because of the surrounding layout mode. Not a source for numbers.

## Other
The transcript's final ten minutes are course promotion.
