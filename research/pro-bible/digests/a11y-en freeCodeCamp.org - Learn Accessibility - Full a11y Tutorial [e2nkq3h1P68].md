# Learn Accessibility - Full a11y Tutorial
- Source: freeCodeCamp.org channel (the course comes from Scrimba, per the closing rhyme at 1:32:10; the intro names the teacher as "Frederick" with a garbled surname) · 2024-02-01 · 1 h 32 min · https://youtu.be/e2nkq3h1P68
- Speaker(s) and why they matter: a Scrimba teacher (name unverified); Scrimba sells an interactive coding platform, so there is commercial interest. Beginner course using exercise pauses.
- Relevance to course: 4 (lesson 4, and its exercises are a model for the course's own tasks) · Freshness matters? timeless
- Codes: A11Y, FORM, CSS, UX
- Notes: **the English caption is a machine translation from another language and is badly garbled** (the opening reads "the needs everyone, including everyone users"). I summarised the meaning only; do not quote lines from this transcript as exact speech. The "96.5%" and "300 million colour-blind" figures are not sourced in the video; the 96.5% figure appears to come from the WebAIM Million (verify before use).

## Core thesis
Most accessibility gains come from basics you can apply to any page: contrast, alt text, descriptive links, labelled inputs, semantic landmarks, lists, rem units, correct headings, a few ARIA cases, live regions, and a skip link. Each step is taught with a "stop and try" exercise on a drone-delivery demo site.

## Claims and advice
- [A11Y] Accessibility tree: browser builds it from HTML; semantic elements give the right role/name; a styled div "button" has no info in the tree. Show it in DevTools Accessibility tab. (2:00-4:02) — type: practice
- [A11Y] Check with: a screen reader, contrast checkers, Lighthouse, Firefox's inspector, axe; the teacher also pastes code into an AI chatbot to find contrast, labels, wrong elements. (4:02-5:02) — type: practice/opinion (AI check = unverified)
- [A11Y][UI] WCAG levels A, AA, AAA; AA is considered "available" (the usual target); contrast ratio goes 1:1 to 21:1; normal text at least 4.5, large text at least 3; AAA is 7 (the caption says "at least 7 best"). (6:03-8:03) — type: evidence (these numbers match WCAG 1.4.3 and 1.4.6; check page)
- [A11Y][UI] Some colours cannot reach 7:1 on red/green backgrounds; fix by changing the background or making text bigger. (9:04) — type: evidence
- [A11Y][UI] Never rely on colour alone (online/offline dot): add an icon and text. (10:05-11:08) — type: practice
- [A11Y][CSS] Text on photos: use a semi-transparent colour overlay with `background-blend-mode` (lighten) to restore contrast. (15:13-17:14) — type: practice
- [A11Y][IMG] Alt text: concise, do not start with "image of"; empty `alt=""` for decorative images and icons beside text; no alt can make the reader read the file name; the teacher ends alt with a period for a pause. (17:14-24:21) — type: practice (period is personal habit)
- [A11Y] Links: use `a`, distinguish by more than colour (underline), text must make sense out of context ("click here" and "more" fail); clickable cards: keep a real link inside the card and extend its hit area with a pseudo-element rather than wrapping the whole card in one `a`. (24:21-31:29) — type: practice
- [A11Y][FORM] Placeholder is not a label; each input needs `label for` + `id`; placeholder shows an example, not the label text; ambiguous button text ("Done", a tick) should state the action; group radios with `fieldset` and `legend`. (37:34-48:04) — type: practice
- [A11Y][SEO] Semantic landmarks (nav, main, section, footer) and a real button; they help assistive tech and "also search engines". (49:04-55:16) — type: practice
- [A11Y] Lists: consecutive items should be real lists, which announce the number of items; remove bullets with `list-style: none` in CSS. (55:16-59:32) — type: practice (note Soueidan's Safari caveat)
- [A11Y][CSS] Text size: use rem not px so the browser's default-size setting scales text; divide px by 16. (59:32-1:02:36) — type: practice
- [A11Y][SEO] Headings: sequential, one h1, structure not style. (1:02:36-1:05:38) — type: practice
- [A11Y] ARIA: first rule is not to use ARIA when native HTML exists; typical uses are custom switches/sliders (role, `aria-checked`, `tabindex`). (1:05:38-1:10:42) — type: practice
- [A11Y] `aria-live` polite for most updates, assertive only for urgent; move focus programmatically after form submit, sparingly. (1:10:42-1:16:48) — type: practice
- [A11Y] Skip link: first focusable element, visually hidden until focus, with a transition so it does not flash. (1:16:48-1:24:00) — type: practice
- [A11Y] Final audit exercise lists the usual bugs: low contrast placeholder, missing alt, missing labels, vague button, div for main, h2 before h1, px font sizes. (1:24:00-1:31:09) — type: practice

## Techniques and steps
1. DevTools: open accessibility tree; check contrast via the colour picker (Ctrl/Cmd+Shift+C hover).
2. Fix alt text, links, labels, landmarks, lists, headings, rem.
3. Add `aria-live` and focus management for form results; add a skip link.

## Tools and resources
- Chrome DevTools accessibility tree, Lighthouse, Firefox accessibility inspector, axe (4:02); online contrast checkers (7:03)

## Quotes
- None reliable (machine-translated caption).

## Disagreements and contrarian points
- Wraps nothing in ARIA by default (agrees with others). The "end alt text with a period" habit is a one-author habit.

## For the course
Lesson 4: the exercise structure (stop, try, compare) is a good pattern for the interactive lesson; the complete list of the nine most common bugs gives a ready "find the bugs" game. Do not quote the machine-translated sentences.

## Other
"96.5% of sites fail" at 49:04 is an unsourced statistic; check before reuse.
