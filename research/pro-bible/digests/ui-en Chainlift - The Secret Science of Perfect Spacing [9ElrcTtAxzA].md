# The Secret Science of Perfect Spacing
- Source: Chainlift (YouTube, en) · 2024-03-01 · 10 min · https://youtu.be/9ElrcTtAxzA
- Speaker(s) and why they matter: the founder of Chainlift, a small design agency that publishes "Lift Kit", a free spacing framework (Webflow cloneable). Clear explanation of relationship-driven spacing, but the video ends with a pitch for the agency, for Lift Kit and for the speaker's own Patreon course (7:11-8:12).
- Relevance to course: 3 (lesson 2: how big gaps should be and why; spacing scale vocabulary) · Freshness matters? no (principles); tool is specific
- Codes: UI, CSS
- Notes: vendor bias: recommends their own framework over alternatives, and calls other paid courses "unnecessarily complicated" while promoting his own. Claim about "optical" padding is plausible but demonstrated rather than cited.

## Core thesis
Space between elements should express how strongly they are related; pick spacing from a fixed scale and assign it by pairs of related elements, larger text element sets the margin.

## Claims and advice
- [UI] Three laws of spacing: every element is related to every other; some relationships are stronger; the stronger the relationship, the closer the elements. (2:07) — type: opinion (clear rule of thumb, no research cited)
- [UI] Relationship strength depends on content, not just type: heading and weather icon can be more related than heading and subheading when the icon tells the weather and the subheading names the city; fix by moving the icon beside the heading. (3:07) — type: practice
- [UI] Optical correction: equal padding in pixels can look unequal because a text box's height includes extra space above the glyphs; offset by the difference so the card looks symmetrical. (1:05-2:07) — type: practice (a visual demonstration)
- [UI][CSS] Do not eyeball spacing; use preset values from a scale (extra small, small, medium, large; exponential) and "eyeball but with parameters". (3:07-4:09, 6:10-7:11) — type: practice
- [UI] Method: colour the type levels, group elements into related pairs, assign the smaller spacing to the stronger relation, always apply the margin from the larger text element, and make the gap before a new section bigger than within a section (A > B > C). (4:09-6:10) — type: practice
- [UI][CSS] A spacing scale prevents bad decisions; three ways to adopt it: use Lift Kit, learn the maths and build your own, or hire the agency. (7:11-8:12) — type: opinion/promotion

## Techniques and steps
1. List text elements; pair the related ones.
2. Pick one scale value per relationship (closer for stronger).
3. Make section breaks larger than within-section gaps.
4. Check optical symmetry in cards.

## Tools and resources
- Lift Kit (Webflow clone), Figma community mock-ups.

## Quotes
- "the stronger the relationship is the closer the elements should be together" (2:07, near-verbatim)
- "we will eyeball but with parameters" (6:10)

## Disagreements and contrarian points
- Schoger and Showalter give the same grouping advice without a numeric scale; Chainlift is the only one in the set to propose a named scale. The claim that framework-based courses are unnecessarily complicated is the author's preference.

## For the course
Lesson 2: "closer = more related" and "assign spacing from a short scale, not by eye" are the portable parts; the optical-padding point is a nice detail for reviewers. Do not give the product recommendation.

## Other
None.
