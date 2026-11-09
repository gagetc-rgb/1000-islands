# Accessible Form Hints and Errors (Russ Weakley)
- Source: A11y Bytes (YouTube, en), talk from an accessibility conference (the caption says "Ally camp October 2018") · 2019-07-23 · 23 min · https://youtu.be/9aSEd7R4GjY
- Speaker(s) and why they matter: Russ Weakley, an Australian web-standards and accessibility practitioner and trainer. Expert source; tests methods against real screen-reader/browser combinations.
- Relevance to course: 5 (lessons 4 and 5, error messages and hints in forms) · Freshness matters? medium (support tables date from 2018-19)
- Codes: A11Y, FORM
- Notes: no sponsor; caption garbles names and has jokes; "ARIA 1.1 in December 2007" is a caption error for 2017.

## Core thesis
Inline error messages and hints are invisible to screen-reader users in forms mode unless they are programmatically associated with the field. The most robust way is to put them inside the `<label>` (with `for`/`id`), then `aria-describedby`; avoid `aria-errormessage` plus assertive live regions for now, and never use placeholders for hints.

## Claims and advice
- [A11Y][FORM] An inline error should be associated with its field, tell the user how to fix the problem, and appear when the user leaves the field or submits. (0:01-2:04) — type: practice
- [A11Y] In screen-reader "forms mode" only things that receive form focus or are programmatically associated are announced; a plain paragraph after the field is not announced. (2:04-3:08) — type: evidence
- [A11Y][FORM] Method 1: wrap the label text, the control and the error or hint all inside the `<label>` (still keep matching `for` and `id`); everything inside is announced with the label. It passed in all nine tested browser and screen-reader combinations (VoiceOver with Chrome, Safari and Opera; NVDA and JAWS with Chrome, Firefox, Edge). (4:08-5:10) — type: evidence (author's testing)
- [A11Y][FORM] Method 2: `aria-describedby` pointing at the error or hint element; also well supported, with an Edge/JAWS caveat. (5:10-6:13) — type: evidence
- [A11Y] Method 3: `aria-errormessage` needs `aria-invalid` and (per the spec) a live region; support was poor, and with `aria-live="assertive"` or `role="alert"` the message can talk over the next field. He prefers `aria-live="off"` so the change is noticed without shouting. (6:13-13:21) — type: opinion/evidence
- [A11Y][UX] Do not move keyboard focus back to the invalid field; "beyond evil". (12:20) — type: opinion
- [FORM][A11Y] Placeholders as hints fail: they vanish when you type, soft grey text, screen-reader and Edge/JAWS issues; "use them sparingly". (14:22-16:23) — type: practice
- [A11Y][UX] Long help text can live in a button/pop-up reachable by keyboard; do not assume every user wants all the info (a blind banking tester wanted none, another wanted a lot). Test with real users, including blind users. (17:24-22:28) — type: practice/opinion

## Techniques and steps
1. Put hint or error text in the label or reference it by `aria-describedby`.
2. Keep `for`/`id` on the label.
3. Do not use placeholder as a hint.
4. Test with screen-reader users.

## Tools and resources
- VoiceOver, NVDA, JAWS (5:10)

## Quotes
- "make sure error messages and hints programmatically associated" (21:27, close paraphrase)

## Disagreements and contrarian points
- Against the W3C-recommended `aria-errormessage` plus assertive live region approach because it interrupts. Script Raccoon and Silktide use `aria-describedby` and live regions; Silktide's GOV.UK example uses `role="alert"` for the summary only.

## For the course
Lessons 4/5: the "put the error inside or aria-describedby" rule and "never placeholder as hint" with a tested support table; use as the evidence for what to demand from the AI.

## Other
Says some CMSs cannot wrap the error inside the label; use `aria-describedby` then.
