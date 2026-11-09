# Form Design Best Practices: Webinar w/ Vitaly Friedman
- Source: Elementor (webinar, YouTube, en) · 2020-09-30 · 78 min · https://youtu.be/qktwIWZNFY4
- Speaker(s) and why they matter: Vitaly Friedman, co-founder and creative lead of Smashing Magazine, UX/front-end consultant, author of a form-design pattern book. Hosted by Elementor (a page-builder vendor; the host promotes webinars). Pattern collector rather than a researcher; he plugs his book, workshops and a 75-item checklist (55:47, 1:17:10).
- Relevance to course: 5 (lesson 5, the richest single source on forms) · Freshness matters? mostly timeless; a few statements are outdated (2020)
- Codes: FORM, UX, A11Y
- Notes: the first 13 minutes are an interview about Smashing; the talk starts about 13:06; Q&A from 1:00:54. Several statistics are given without sources.

## Core thesis
Design forms by profiling every field and keeping people on the keyboard: single column, top-aligned labels, few fields per page, autofill, forgiving input, validation that rewards early and punishes late, helpful errors, and no disabled submit buttons.

## Claims and advice
- [FORM] Common pain points: tiny scroll panes, tiny click targets, content shifts, page reloads after async validation, giant country dropdowns, generic errors, cleared input after error, disabled buttons, no back button, birthday pickers starting at the current year, CAPTCHAs. (19:10-23:15) — type: opinion/evidence (interviews)
- [FORM] People think of their name or address as one string; do not split into first/middle/last and street/number/unit. (28:22-30:23) — type: opinion (consistent with Baymard)
- [FORM] "every user needs around 400 milliseconds to switch between keyboard and mouse"; select drop-downs force that switch; tabbing through an 8-field address is about three times faster; autofill reduces completion time "by at least 30 percent". (30:23-32:26) — type: evidence (figures cited from a slide, source not named)
- [FORM] Do not repeat email and password: "almost 70 percent" of non-technical users copy-paste the first entry; ask for confirmation at a moment users care (before purchase or on the confirmation page). (33:27-35:29) — type: evidence (unsourced)
- [FORM] Guest checkout by default; after purchase offer "set a password and get 15% off"; never force password recovery when an email is recognised, because it is too expensive. (35:29-36:30, 1:11:03-1:13:04) — type: opinion
- [FORM] Profile each field with the team (required? prefill? allowed characters, min/max length, validation, masking, hint) and keep a shared doc; ask for country first because it can change about 18 things (currency, formats, legal opt-in defaults, VAT). (37:31-45:38) — type: practice
- [FORM] Layout: single column with top-aligned labels is "easy peasy"; avoid multi-column; one thing per page; no more than six or seven fields per page. (45:38-49:41) — type: opinion/practice
- [FORM] Validation: validation on focus is "guilty until proven innocent"; immediate validation is too early or late; the established approach is late validation on blur; threshold validation ("reward early, punish late") by Mikhail Kondrewich (name from caption) shows errors immediately only when an error is obvious. (49:41-51:41) — type: opinion (cited design pattern)
- [FORM] On submit show an error summary and an inline message per field, linking to the error; do not disable the submit button (a disabled button gives 100% abandonment if scripts fail); if you must, add a "contact support" link. (51:41-54:46) — type: practice
- [FORM] Bot defence list: Akismet, a human question, honeypot field with a plausible label, keyboard-accessible slider, time trap of about three seconds. (1:08:00-1:10:03) — type: practice
- [FORM] Ask for email early so abandoned forms can be followed up. (1:11:03) — type: opinion
- [FORM] Placeholders must not just disappear; closing (floating) labels are possible with accessibility care. (56:48) — type: opinion
- [FORM] Chatbots vs forms: conversational interfaces fit support, forms fit sign-up; autofill and payment APIs will reduce typing. (1:13:04-1:16:08) — type: opinion

## Techniques and steps
1. Profile each field.
2. Single column, top labels, at most 6-7 fields per view.
3. Validate on blur with the threshold exception for obvious errors.
4. Summary plus inline errors; never disable submit.

## Tools and resources
- Smashing form checklist, Akismet, form-pattern book (55:47, 1:08:00)

## Quotes
- "the established one is late validation because it's the least harmful one" (50:41, near-verbatim)

## Disagreements and contrarian points
- Declines to answer required vs optional marking; Grundy and Sabot favour marking optional.
- Opposes disabled submit buttons; Silktide/GOV.UK pattern relies on validation after submit.

## For the course
Lesson 5: the best single list of mechanics; use the "profile every field" workshop as an exercise; flag the unsourced numbers (70%, 400 ms, 30%).

## Other
Q&A on creative templates (age gates, fun dropdowns) at 1:02:57-1:06:00.
