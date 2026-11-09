# UX/UI Design : toutes les bases pour bien démarrer (guide complet) (digested in English)
- Source: Gianni Polito (YouTube, fr) · 2021-08-05 · 44 min · https://youtu.be/RqCJRrseD1k
- Speaker(s) and why they matter: Gianni Polito, a French designer with 10+ years in large IT groups and web agencies who teaches design at several higher-education schools (3:03). A broad beginner guide covering UX vs UI, design thinking, visual rules, forms and tables, Gestalt/UX laws and accessibility. French public-sector context (RGAA, the French accessibility reference) appears at 37:49.
- Relevance to course: 4 (lesson 2 UX/UI basics; lesson 5 forms; lesson 4 accessibility) · Freshness matters? low-medium (2021)
- Codes: UX, UI, A11Y, FORM, TYPE
- Notes: **method note: digest built from the first ~380 characters of each minute of the 8,000-word caption plus targeted reading; detailed wording of long explanations was not read in full.** No sponsor segment was seen; the speaker points to OpenClassrooms courses (17:17) and discusses his training offer in the intro.

## Core thesis
Good UX/UI work needs a base of user understanding (design thinking, empathy, user journeys), a few visual rules (contrast, alignment, hierarchy, restrained effects), form and table conventions, the Gestalt and UX laws, and accessibility from the start.

## Claims and advice
- [UX][UI] UX is the overall experience and UI the interface; the same content and task (the ketchup bottle example) can feel very different with different ergonomics. (5:05-7:06) — type: opinion/practice
- [UX] Design thinking is a framework for innovation using creativity and user feedback; user empathy maps, journey maps and personas keep users' needs in the project. (7:06-17:17) — type: practice
- [UX] The "usability pyramid" of four levels: functional, reliable, usable, pleasurable to use; the overlap of desirable, feasible and viable defines a product worth building. (10:08-12:11) — type: opinion (frameworks)
- [UX][A11Y] Examples of design harm: a mug that is dangerous for children's eyes; a bank transfer error caused by a design flaw (Citibank). (10:08) — type: evidence cited (anecdotes)
- [UI] Colour: choose by context; red in a text field reads as an error, so avoid using it for other meanings; respect contrast. (18:19) — type: practice
- [UI] Use regular, uniform margins to create structure; use fewer visual effects and shadows because they complicate reading ("interfaces plus propres avec moins d'effets visuels"). (19:21-20:23) — type: practice
- [TYPE][UI] Aim for about 16 px text and avoid very small type; use few font sizes; keep text alignment consistent. (21:26) — type: practice (16 px is a convention; see `answers/14-typography.md`)
- [FORM][UX] Group related fields in a form and label each group; use checkboxes for multiple choices and not for single-choice questions (radio buttons). (22:28, 24:32) — type: practice (consistent with GOV.UK; see `answers/08-forms-conversion.md`)
- [UI] Tables: align text left and numbers right to compare; tags or visual cues help associate meaning with rows. (23:30) — type: practice
- [UI][UX] Hierarchy: put the most important information (the city name, the price per night) first and visually strongest in a search result card. (25:33) — type: practice
- [UX] Error messages: be clear about what happened and how to fix it; do not use humour; avoid pop-ups with lots of text and several questions. (26:34) — type: practice
- [UI][UX] Gestalt and UX laws: proximity (28:36), similarity (29:37), continuity (30:39), isolation/von Restorff (31:40), Fitts (31:40), Miller's "magic number" seven applied to menu length with an example from a French retail site (32:41-33:42), Hick (34:45). — type: evidence cited (secondary)
- [A11Y] Accessibility is crucial and often ignored by design graduates; improving it benefits all users (video subtitles help the hard of hearing and anyone in a noisy place); France's RGAA is a checklist used on public and large sites. (35:46-37:49) — type: opinion/practice
- [A11Y] "The number-one accessibility problem is colour contrast"; he demonstrates fixing a product card for contrast and visible icons. (38:50-40:52) — type: practice (consistent with the WebAIM Million finding in `answers/07-accessibility.md`)
- [A11Y] Tools: Google Lighthouse, and IBM's Equal Access Accessibility Checker in Firefox, each giving a 0-100 score. (41:55) — type: practice (tool-specific; a score is not compliance)

## Techniques and steps
1. Understand users (interviews, empathy map, journey).
2. Apply layout rules (margins, hierarchy, restraint).
3. Group form fields; use the right controls.
4. Check contrast; run an automated check.

## Tools and resources
- Lighthouse, IBM Equal Access checker, OpenClassrooms, RGAA.

## Quotes
- "le problème numéro un d'accessibilité c'est les contrastes de couleurs" (38:50, near-verbatim)
- "viser une taille de 16 pixels pas plus petit" (21:26, near-verbatim)

## Disagreements and contrarian points
- The Miller "magic number seven" is applied to menu length; the same law in Todaro's video is given as groups of five to nine. This is a contested use of the original memory finding (not verified here).
- Automated scores (Lighthouse/IBM) are presented as help; the accessibility answers note that automated tools find only part of the issues.

## For the course
Lessons 2, 4 and 5: a French-language voice agreeing with the English sources on proximity, contrast-first accessibility, grouping form fields and checkbox vs radio use. Only ◈ when combined with others; the French RGAA reference is context for a French audience, not for an Indonesian or international site.

## Other
No claim relies on a single statistic.
