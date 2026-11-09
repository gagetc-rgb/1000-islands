# Webflow Workshop #38: Best practices for responsive typography with Jason Pamental
- Source: Webflow (YouTube, en) · 2016-04-26 · 58 min · https://youtu.be/HEaNIWSW1g8
- Speaker(s) and why they matter: Jason Pamental, web typographer and author of "Responsive Typography" (he plugs the book at 29:57 and 57:31); hosted by Webflow (vendor webinar, includes site reviews). **Same author as the Codementor (2014) and JSConf (2019) talks**, so these three count as one author.
- Relevance to course: 4 (lesson 9, typography units and loading) · Freshness matters? medium (tool UI old; units advice durable)
- Codes: TYPE, CSS, PERF, A11Y
- Notes: audio and stream glitches in the first 8 minutes; the latter half (44:11-55:28) reviews viewers' sites.

## Core thesis
Set sizes in relative units (em/rem) from a base of 100% so type scales with the device and with user settings; compress the heading scale on small screens; avoid invisible text during web font loading by tuning the fallback.

## Claims and advice
- [TYPE][CSS] Use em (or rem) for type sizes and breakpoints; pixels are "reference pixels" on high-resolution screens; set the root font size to 100% (usually 16 px on desktop, a device-tested readable size on phones) and build the scale from it; divide pixel values by 16 to convert. (13:37-18:42) — type: practice
- [TYPE] Do not set font-size on containers; only on the text element, to avoid compounding em. (13:37) — type: practice
- [A11Y][CSS] If breakpoints are in em, zooming text triggers the same breakpoints, so low-vision users get the intended layout. (21:44) — type: practice
- [TYPE][UI] The scale should compress on small screens (heading three times body on desktop, about twice on phones); body copy stays at the base size so it stays readable. (18:42-20:44) — type: practice
- [TYPE][CSS] Viewport units suit known headings, not body text; set minimums so headings never shrink to body size. (26:53-28:57) — type: opinion/practice
- [TYPE] Pick typefaces connected to the brand and project (a French company, French type designers; a period, fonts of that period); test legibility and file size; avoid Helvetica and Arial as "no voice". (30:58-33:01) — type: opinion
- [PERF][TYPE] A rural-clinics site chose the font vendor with the smallest files, self-hosted, used fewer weights, aimed at sub-2 s load. (33:01-34:01) — type: evidence (case)
- [PERF][TYPE] Browsers that hide text until the font loads hold content hostage; show a fallback immediately and tune the fallback's size, letter spacing, line height so the reflow is small (using the Web Font Loader's `wf-inactive` class). (39:04-43:10) — type: practice (2016 technique; CSS `font-display` now does the first half)
- [TYPE] Ragged-right, left-aligned text reads faster than centered or justified; centered blocks of text are hard to read, so use max-width plus text-align left. (47:16-52:23) — type: practice/opinion
- [A11Y] Keep text contrast at least 4.5:1 ("the accessibility standard"). (52:23-53:25) — type: practice
- [UX] Leave a hint of the next content visible below a full-height hero. (50:20-51:21) — type: opinion

## Techniques and steps
1. `html { font-size: 100% }`; everything in rem/em.
2. Convert design pixels by dividing by 16.
3. Adjust heading scale per breakpoint.

## Tools and resources
- Web Font Loader, Sass for pixel-to-em math, his book (29:57)

## Quotes
- "if you always go with whatever the device says is 100% ... it's always going to be a nice readable line" (17:41, paraphrase)

## Disagreements and contrarian points
- Says use em for type sizes but rem for breakpoints is "more relative"; later guides prefer rem for text. Leatherman and Pamental's 2019 talk handle sizing through `calc`/`clamp` locks.

## For the course
Lesson 9: rem/em units and a scale that compresses on phones are echoed by SD, SR and FCC from the accessibility set; the loading section is now covered by `font-display`.

## Other
Webflow-specific hints (custom CSS for html font-size) skipped.
