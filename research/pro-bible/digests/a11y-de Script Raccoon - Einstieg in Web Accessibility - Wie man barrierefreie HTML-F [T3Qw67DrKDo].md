# Einstieg in Web Accessibility - Wie man barrierefreie HTML-Formulare baut
- Source: Script Raccoon (YouTube, de) · 2023-07-01 · 42 min · https://youtu.be/T3Qw67DrKDo
- Speaker(s) and why they matter: Script Raccoon, German-language front-end teacher; no commercial pitch seen. Live-fixes an inaccessible login form with Lighthouse, Firefox accessibility checks, axe and the NVDA screen reader.
- Relevance to course: 5 (lessons 4 and 5, accessibility and forms) · Freshness matters? timeless; tool UIs change
- Codes: A11Y, FORM, CSS, UX
- Notes: caption quality is rough German with English tool names garbled ("axe DevTools" as "Ex deftools", "Lighthouse" as "Light aus"). The example is a login form, but all fixes apply to contact and booking forms.

## Core thesis
Automated checkers find only part of the problems; the real work is manual (keyboard, screen reader). Most form problems come from replacing native elements (button, form, label, h1) with styled divs and spans, or from removing default focus styles. Using native HTML gives most of the accessibility for free.

## Claims and advice
- [A11Y] Lighthouse found two alt problems and low contrast but missed many issues; "deswegen sollte man sich niemals hier nur auf ein Tool verlassen". Firefox's accessibility checker and axe found more. (2:01, 6:02) — type: practice
- [A11Y][IMG] Every image needs an alt attribute; decorative images use empty alt or `aria-hidden`. (2:01, 13:12) — type: practice
- [A11Y][UI] Low-contrast grey info text may look elegant but is unusable in sunlight on a phone; fix contrast first. (2:01, 13:12) — type: practice
- [A11Y][FORM] A placeholder is not a label; every input needs a `label` whose `for` matches the input `id`. (3:01-4:01, 15:13) — type: practice
- [A11Y] Inputs must show a visible focus indicator; designers often remove the outline; do not. "Without any CSS, plain HTML is usually accessible; we break it." (3:01, 16:14-17:16) — type: opinion/practice
- [A11Y][FORM] A `span` styled as a button looks like a button but cannot be focused or activated with the keyboard; use `<button>` inside a real `<form>` so Enter submits. (4:01, 18:19-20:21) — type: practice
- [A11Y][SEO] A div styled as a heading is not a heading; use h1, so screen-reader users can jump by heading. (5:02-6:02, 20:21) — type: practice
- [A11Y][FORM] Error messages should be per field, not one message for the whole form; link them with `aria-describedby` and announce changes with `aria-live`. (7:03, 24:30-28:34) — type: practice
- [A11Y][FORM] Button text "click here" is useless; say what happens. (9:06) — type: practice
- [FORM] Use `type="password"` for passwords and `type="email"` for email so the browser validates and the screen reader announces the type. (9:06, 14:13) — type: practice
- [A11Y] Landmarks: `main`, `header`, `section` with an `aria-label` give structure to screen-reader users. (22:27-23:27) — type: practice
- [A11Y][FORM] Required fields: show an asterisk but hide it from screen readers (`aria-hidden`) and add a visually hidden "required" text so the reading is clear; hiding method used: absolute positioning off-screen, 1px, overflow hidden. (28:34-31:40) — type: practice (own technique)
- [A11Y] Live-region re-announce: error messages repeated only if the text changes; he clears the text and re-sets it after 50 ms and invites a better idea. (34:45-36:47) — type: practice (acknowledged workaround)
- [CSS][A11Y] Use rem instead of px so the layout respects the user's browser text size; he shows the page failing at a large setting until sizes are converted. (36:47-40:55) — type: practice
- [A11Y] No site is 100% accessible; follow WCAG for the basics. (40:55-41:56) — type: opinion

## Techniques and steps
1. Run Lighthouse (accessibility only), Firefox "Check for issues", and axe DevTools.
2. Test by keyboard (Tab, Enter).
3. Test with a screen reader (NVDA on Windows, VoiceOver on Mac).
4. Fix: alt, contrast, labels, native button/form/h1, per-field errors, live regions, landmarks.
5. Re-test, then switch px to rem and test with a larger browser font setting.

## Tools and resources
- Lighthouse (DevTools), Firefox accessibility panel, axe DevTools (7:03, verify name)
- NVDA (Windows), VoiceOver (Mac): screen readers (8:05)

## Quotes
- "deswegen sollte man sich niemals hier nur auf ein Tool verlassen" (2:01)

## Disagreements and contrarian points
- Uses a visually-hidden class by absolute positioning off-screen; Soueidan warns that this can break touch exploration on mobile screen readers (see answers/02).
- His live-region fix relies on a timeout; he admits it is a hack.

## For the course
Lesson 4 and lesson 5: the form walkthrough is a ready-made "broken form" for a lesson game: placeholder-as-label, span button, missing form, single global error, text typed as password, px units. The point "tools find only part" supports the manual-test habit.

## Other
Some details are specific to NVDA and Firefox behaviours; do not turn them into universal rules.
