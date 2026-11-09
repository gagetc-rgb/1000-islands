# Refactoring UI: Bad About
- Source: Steve Schoger (YouTube, en) · 2018-04-10 · 14 min · https://youtu.be/S6-q5BheEYU
- Speaker(s) and why they matter: Steve Schoger, UI designer and co-author of the book/course "Refactoring UI"; in this episode he redesigns a submitted side-project page live in Sketch. A widely used practitioner voice for "tactical" UI polish. Ends with a sign-up call for the Refactoring UI mailing list (14:17); the series markets his book. 2018, so tool and font examples (Sketch, Proxima Nova, Freight Sans) are dated.
- Relevance to course: 4 (lessons 2 and 9: spacing, hierarchy, grey scale, one primary button, type pairing) · Freshness matters? low for principles, high for tools
- Codes: UI, UX, TYPE, A11Y
- Notes: single worked example, so every rule is shown on one page and not tested. The reasoning is explained step by step, which makes it a good source of rationale.

## Core thesis
Clean UI mostly comes from giving elements room, grouping related information, de-emphasising secondary actions and icons, using a few consistent greys, and aligning to a grid; no new features are needed.

## Claims and advice
- [UI] Give content "room to breathe": widen the reading width of titles, increase line height, add vertical padding; the result was a shorter page because titles wrap less. (0:00-1:00, 5:04) — type: practice
- [UI] Group related metadata (user name and date, with a dot between) and put the actions with them; make solid-filled icons lighter than the adjacent text and smaller so they balance. (1:00-2:00) — type: practice (opinion on balance)
- [UI][UX] De-emphasise a secondary control (a "show more" button) as an inline text link; stack up/down vote arrows; make key values larger and higher contrast to be scannable. (2:00-3:02) — type: practice
- [UI][TYPE] Small labels in uppercase need extra letter-spacing because uppercase words have less varied shapes and are harder to scan. (3:02-4:04) — type: practice
- [UI] Left-align related blocks to anchor them; align labels to the first line's baseline. (3:02-4:04) — type: practice
- [UI] Light text and surfaces: flip the page to grey with white panels so the main content stands out; replace borders with layered box shadows; use grey backgrounds on inputs to avoid borders. (6:08, 10:12) — type: practice
- [UI][A11Y] Orange with white text fails contrast; darkening it makes it brown, so use a lighter orange with dark, warm-tinted text instead. (7:08-8:10) — type: practice (correct in principle; check the actual ratio against WCAG 4.5:1)
- [UI][UX] Only one primary action per page; make the sign-in button a secondary (outlined) one so the "new post" button is the clear action. (8:10-10:12) — type: practice
- [UI] Align to a 12-column grid, which divides into 4, 3 and 2, e.g. a left navigation of one quarter and content of three quarters; split panel content into thirds. (9:10) — type: practice
- [UI] Add a hint of colour to mark the active navigation item; show counts in the navigation. (9:10-10:12) — type: practice
- [UI][CSS] Limit greys to about three (dark for primary text, lighter for secondary, third for icons); use true (neutral) greys rather than blue-saturated ones when the brand colour is warm. (11:12-12:15) — type: practice (opinion on warm/cool match)
- [TYPE][UI] Pair two typefaces by looking at fonts-in-use galleries, e.g. a sans body with a different heading face; a quality typeface lifts the whole design. (12:15-13:16) — type: opinion

## Techniques and steps
1. Remove clutter; widen content; enlarge line height.
2. Group related items; lighten icons.
3. One primary action, others as secondary or links.
4. Reduce greys to three; fix contrast.
5. Align to a grid.

## Tools and resources
- Sketch, Fonts In Use (typeface pairing gallery), Refactoring UI newsletter.

## Quotes
- "I like to have just one primary action on a page having multiple can get a bit confusing" (8:10, near-verbatim)
- "we could probably get away with using as little as three greys" (11:12, near-verbatim)

## Disagreements and contrarian points
- Chainlift and Schoger agree on grouping and spacing hierarchy; Showalter frames the same ideas as proximity and contrast. No conflicts.

## For the course
Lessons 2 and 9: rationale for spacing, one primary action, a short grey scale, and "check contrast when brand colour is light/warm". Typeface pairing advice is thin (use a gallery). Tools named are obsolete.

## Other
Mentions his earlier episode on shadows; not relied on.
