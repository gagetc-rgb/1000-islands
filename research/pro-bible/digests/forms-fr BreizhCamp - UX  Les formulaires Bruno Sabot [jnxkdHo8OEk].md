# UX : Les formulaires (Bruno Sabot)
- Source: BreizhCamp (conference, YouTube, fr) · 2019-05-01 · 16 min · https://youtu.be/jnxkdHo8OEk
- Speaker(s) and why they matter: Bruno Sabot, a French developer/UX speaker giving a 15-minute lunchtime talk (name from the title; no bio in the caption). Developer-oriented, humorous, practical; no vendor.
- Relevance to course: 4 (lesson 5; French-language confirmation) · Freshness matters? mostly timeless
- Codes: FORM, UX
- Notes: caption is decent; brand examples (Apple, Nest, Pôle emploi, Leclerc) shown as bad forms.

## Core thesis
Forms fail on passwords, captchas, premature validation, length, buttons and labels; small, cheap fixes remove most friction. Break your own rules if your users need it.

## Claims and advice
- [FORM] Passwords: do not ask twice; offer a show/hide ("eye") button; show a strength meter; do not block special characters. (0:00-2:03) — type: practice
- [FORM] Captchas: avoid unreadable ones; use a lighter system (reCAPTCHA image selection) or a spam filter such as Akismet for comments. (2:03-3:04) — type: opinion
- [FORM] Validation: do not show errors on a field before the user has touched it (Apple example); validate on blur, or after a delay for availability checks; remove the error when the field regains focus; show a green check when valid; accept several formats (phone numbers with different groupings). (3:04-5:07) — type: practice
- [FORM] Long forms: split into steps (feels lighter), use one date field instead of three, show a progress indicator, ask only for needed fields; more than half the room had abandoned a form for asking too much. (5:07-8:10) — type: practice
- [FORM] Buttons: label with the action ("log in", "send the comment"), not "Submit"/"Validate"; no Reset or Cancel buttons; disable the button and show loading after click to prevent duplicate submissions. (8:10-10:16) — type: practice
- [FORM] Labels: use a real visible label, not a placeholder; no all caps; place above the field; use the informal "tu"-style voice if the brand allows. (10:16-12:18) — type: practice
- [FORM] Use HTML input types (e.g. `number`) so mobile shows the right keypad; fields about 48 px high for touch; use radio buttons rather than a select for three options; auto-format card numbers in groups of four. (12:18-13:19) — type: practice
- [FORM] Mark optional fields instead of asterisks for required; put the error message below the field with a useful explanation; placeholders only as examples that disappear. (13:19-15:23) — type: opinion/practice

## Techniques and steps
Checklist as above, one bullet per section of the talk.

## Tools and resources
- Strength-meter libraries, reCAPTCHA, Akismet (2:03-3:04)

## Quotes
- "mettez un label pas un placeholder" (10:16, caption: "mettez bien la belle ... pas un plex holder"; near-verbatim)

## Disagreements and contrarian points
- Says not to ask for the password twice while Friedman says repeat-email and repeat-password are the worst offenders; they agree.

## For the course
Lesson 5: an independent French voice whose list nearly equals Grundy's and Friedman's; weak independence because all draw on common UX literature.

## Other
Closing advice: if the rules do not fit your users, break them (15:23).
