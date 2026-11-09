# The 80% of UI Design - Typography
- Source: Sajid (YouTube, en) · 2024-11-24 · 13 min · https://youtu.be/9-oefwZ6Z74
- Speaker(s) and why they matter: Sajid, the channel host (his background is not stated in the caption), explains hierarchy through size, weight, colour and spacing with live demonstrations. Short, example-driven, aimed at developers who design. Sponsored segment for Brilliant (3:03-4:04), whose "six times more effective" claim is the sponsor's, not the author's. Also plugs a colour generator on his own site (12:15).
- Relevance to course: 4 (lessons 2 and 9: how hierarchy is built from a few sizes, relative units, line height) · Freshness matters? low
- Codes: UI, TYPE, CSS, A11Y
- Notes: single-author opinion/practice; no external sources cited. The "convert to light mode by subtracting lightness from 100" shortcut is a simplification (not verified; shades that work in dark mode may not work inverted).

## Core thesis
Most UI is text, buttons and icons, so hierarchy comes from combining size, weight and colour (lightness) with spacing; a base size of 14 or 16 px plus two steps up or down and a few weights is enough for almost any interface.

## Claims and advice
- [UI][TYPE] Remove the font styles to see the problem: no hierarchy, no sense of where you are, selected tab invisible. Make the title bigger and heavier; line height creates the gap below text. (0:00-1:00) — type: practice
- [UI] To separate a title from its group you can use size, colour, spacing (proximity) and weight; a circle demo shows that moving a group is clearer than changing size or colour alone. (1:00-2:00) — type: practice
- [UI] On a dark theme, de-emphasise secondary text by lowering lightness rather than adding hues: about 60% lightness kept text readable but quiet in the demo; highest contrast goes to the most important elements. (2:00-3:03) — type: practice (the 60% number is demo-specific; check contrast with WCAG)
- [CSS][UI] HSL (hue 0-360, saturation, lightness) is easier for adjusting emphasis than hex/RGB. (4:04-5:06) — type: practice
- [UI][TYPE] Pair size with weight and colour: a list item with a bold larger title, a smaller, darker username and a lighter button reads clearly; check at the original (not zoomed) size and adjust weight so small text stays legible. (6:07-8:08) — type: practice
- [TYPE][UI] A UI needs few sizes: "these are all the font sizes you need to design 99% of apps and UIs"; pick a base of 14 or 16 px, regular weight, full lightness, and go up or down by two pixels when needed; assign them as global variables (weight, size, line height, family). (7:08-9:10) — type: opinion/practice (a taste claim; no evidence)
- [A11Y][CSS] Convert pixel sizes to rem "to follow accessibility guidelines so users should be able to adjust the font size" (matches WCAG 1.4.4 resize and the `answers/14-typography.md` rule 4); line height acts as the bottom margin automatically. (9:10-10:13) — type: practice
- [UI][A11Y] Code for document hierarchy but style for visual hierarchy: not every `h1` looks the same; "don't just design for visual hierarchy, design for functionality too" (dynamic content such as longer names). (10:13-11:15) — type: practice
- [CSS] Light mode: use HSL and subtract each lightness from 100, swapping through CSS variables. (11:15-12:15) — type: practice/simplification

## Techniques and steps
1. Pick base size (14 or 16 px), weights, and 2-3 steps.
2. Emphasise the title with size and weight; de-emphasise secondary text with lightness.
3. Use rem for sizes; use line height for spacing below text.
4. Check at actual size; test with others.

## Tools and resources
- HSL colour function, CSS variables, Brilliant (sponsor), his colour generator.

## Quotes
- "these are all the font sizes you need to design 99% of apps and UIs" (7:08, near-verbatim)
- "code for document hierarchy but style for visual hierarchy" (10:13)

## Disagreements and contrarian points
- "A few sizes are enough" agrees with Schoger's limited-greys approach and conflicts with the typical modular type scales; Pamental (`answers/14`) suggests scaling headings per screen size. Different design contexts (app UI vs marketing site).

## For the course
Lessons 2 and 9: emphasise-by-lightness, limited sizes, rem, and the "document vs visual hierarchy" point (for headings). Do not use the 60% lightness or the "subtract from 100" shortcut as rules.

## Other
None.
