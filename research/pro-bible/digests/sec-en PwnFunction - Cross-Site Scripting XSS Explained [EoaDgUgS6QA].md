# Cross-Site Scripting (XSS) Explained
- Source: PwnFunction (YouTube, en) · 2020-03-22 · 11 min · https://youtu.be/EoaDgUgS6QA
- Speaker(s) and why they matter: PwnFunction, a security educator who builds XSS challenge sites; respected for clear animated explanations. No sponsor; plugs his own challenge site (9:15-10:17).
- Relevance to course: 3 (lesson 7) · Freshness matters? timeless
- Codes: SEC
- Notes: no ads. He admits he does not like the term "XSS" as a name.

## Core thesis
XSS is JavaScript injection into someone else's page: when user input is echoed into a page and the browser cannot tell code from data, the attacker's script runs with the victim's session and can read the DOM, cookies and tokens despite the same-origin policy.

## Claims and advice
- [SEC] Same-origin policy compares protocol, host and port; if all three match, cross-origin read/write is allowed. (1:05) — type: evidence
- [SEC] If you control JavaScript on another site you can deface the page, steal CSRF tokens, read cookies and send them out. (2:05) — type: evidence
- [SEC] Reflected XSS: input is echoed back in the response and run (example: a greeting that prints the name). (3:07-5:09) — type: evidence
- [SEC] Stored XSS: input is saved (comment section) and runs for everyone who views it; more powerful. A Twitch chat client bug is shown. (5:09-7:12) — type: evidence
- [SEC] DOM XSS: client-side; input lands in a dangerous sink such as `innerHTML`. mXSS: the browser mutates the input before inserting it. (7:12) — type: evidence
- [SEC] Blocking `<script>` tags is not enough: event handlers on most tags also run code; stripping angle brackets breaks legitimate uses (email, rich text, markdown). (8:14) — type: practice
- [SEC] Use a sanitiser such as DOMPurify that outputs only clean HTML. (9:15) — type: practice

## Techniques and steps
1. Do not insert user input into HTML as HTML.
2. If rich text is needed, sanitise with a library.

## Tools and resources
- DOMPurify (9:15); his XSS challenge site (10:17)

## Quotes
- "excess boils down to just being JavaScript injection" (10:17, caption spelling; XSS)

## Disagreements and contrarian points
- Does not mention Content-Security-Policy or output encoding by name; the RU-channel video does.

## For the course
Lesson 7: one clear picture of why "never put user input into innerHTML" and why a contact form that echoes input needs escaping. Lesson-level takeaway: tell the AI "escape output; use textContent, not innerHTML; sanitise with DOMPurify if HTML is needed".

## Other
The Bobby Tables joke at 0:00 refers to SQL injection; no content.
