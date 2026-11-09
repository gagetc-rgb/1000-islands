# How to make accessible forms - with lots of examples!
- Source: Silktide (webinar, YouTube, en) · 2021-10-11 · 54 min · https://youtu.be/ffxwEyBcdf0
- Speaker(s) and why they matter: Oliver Emberton, managing director of Silktide, which sells an automated accessibility testing platform (pitch at 49:52-51:58, he admits the bias). Clear, practical, WCAG-oriented. Note: YouTube also offers machine-translated "-orig" tracks for this video; the English caption is the real one.
- Relevance to course: 5 (lessons 4 and 5) · Freshness matters? some WCAG 2.2 statements are drafts at the time (2021)
- Codes: A11Y, FORM
- Notes: the talk calls WCAG 2.2 a draft; later final. Time claims at the end (a promised transcript).

## Core thesis
Accessible forms come from three things: appearance (contrast of boundaries and focus, no colour-only states), semantics (native types and validation, autocomplete, labels, descriptions, fieldsets), and flow (one question per page, validation with a page title, a summary and live regions).

## Claims and advice
- [A11Y][UI] Form field boundaries need enough contrast against their surroundings (WCAG 2.1 non-text contrast); soft shadows and pale backgrounds often fail; stars need contrast with both filled and unfilled neighbours. (0:01-4:03) — type: practice
- [A11Y][FORM] Placeholders are not labels; every field needs a label; labels above are best practice, left labels are worse on narrow screens; floating labels are viewed sceptically; a hidden label is allowed for one-field search forms. (5:03-10:07) — type: practice
- [A11Y] Visible focus on every control (radio, checkbox, button too); a draft WCAG 2.2 criterion on focus appearance is mentioned. (10:07-12:10) — type: practice
- [A11Y][FORM] Valid and invalid states must not rely on colour alone: add an icon and text. (12:10-14:11) — type: practice
- [FORM][A11Y] Use native types and built-in validation: `required` (not `aria-required`), min/max, `pattern` with a `title` explaining the rule; native date input was not ready in desktop Safari in 2021 so GOV.UK uses three fields; still validate on the server. (14:11-21:18) — type: practice (date support is dated)
- [FORM][A11Y] `autocomplete` attributes are a WCAG 2.1 requirement for user-data fields; `inputmode` gives the right keypad, which also saves effort for switch users. (23:21-27:26) — type: practice
- [A11Y] Labels: `label for` + `id`; `aria-label` when there is no visible label (search); `aria-labelledby` is rarely needed. (27:26-31:30) — type: practice
- [A11Y] Help text or errors outside the label are not read in forms mode (JAWS and some others); attach them with `aria-describedby`. (31:30-36:35) — type: evidence/practice
- [A11Y][FORM] Group radios and related fields with `fieldset` and `legend` so the question is read with each option. (36:35-38:39) — type: practice
- [FORM] One question per page (GOV.UK) improves accessibility and saves progress; downside: CMS support and harder back-navigation. (38:39-40:42) — type: opinion/practice
- [A11Y] A live "characters left" counter should be an `aria-live="polite"` region. (41:42-43:44) — type: practice
- [A11Y][FORM] GOV.UK error pattern after submit: title prefixed "Error:", an error summary at the top with links to each field (`role="alert"`, `tabindex`, auto-focus), `aria-describedby` on the field (on the fieldset for radio groups). (43:44-46:48) — type: practice
- [FORM] Passwordless login or magic link; a show-password button helps people with tremors. (46:48-48:51) — type: practice/opinion
- [A11Y] Test: keyboard only, a screen reader on any OS, real disabled users (and pay them), plus automated tools; use both manual and automated checks. (48:51-50:53) — type: practice

## Techniques and steps
As in the three-part structure.

## Tools and resources
- Browser built-in screen readers; GOV.UK design system; Silktide platform (49:52)

## Quotes
- "the basically the only approach that works I think is to use both" (50:53, manual and automated testing)

## Disagreements and contrarian points
- Pushes native HTML validation, whereas the GOV.UK Design System tells teams not to use HTML5 validation because error styling cannot be made consistent (see answers/08).
- Uses `role="alert"` (assertive) for the error summary; Weakley warns against assertive alerts on every field.

## For the course
Lesson 4/5: a complete walkthrough that can be turned into a "make the form accessible" exercise; note the native validation vs GOV.UK disagreement.

## Other
None.
