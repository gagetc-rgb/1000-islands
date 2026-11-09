# ВСЁ Что нужно знать о БЕЗОПАСНОСТИ Фронтенд разработчику (XSS, CSRF)
- Source: Vladilen Minin (YouTube, Russian original; the file's English caption is machine-translated, source `en.vtt`) · 2025-03-14 · 17 min · https://youtu.be/ZFzn2AQPwRA
- Speaker(s) and why they matter: Vladilen Minin (channel name Владилен Минин), Russian-language front-end teacher who sells courses; career pitch at the end (16:25). Mid-level overview.
- Relevance to course: 4 (lesson 7: concrete defences for a front-end) · Freshness matters? timeless
- Codes: SEC
- Notes: the English caption is garbled in places ("Cross SCP", "dangerously Set inner HTML", "Recto" for React); I note meaning only. Quotes below are caption text, not exact speech.

## Core thesis
As more logic moves to the front end, developers must understand XSS, CSRF, clickjacking, injection through URL parameters, token storage and supply-chain risk, and apply a short list of defences.

## Claims and advice
- [SEC] Front-end code is visible, so obfuscation is not security; tokens in localStorage or sessionStorage are easy to read; libraries enlarge the attack surface. (0:00-2:02) — type: opinion/evidence
- [SEC] XSS: places where HTML is inserted (`innerHTML`) let attackers run script that can read `localStorage`, `sessionStorage` and cookies and send them away. (2:02-4:05) — type: evidence
- [SEC] Defences against XSS: escape and validate input; frameworks (Vue, Angular, React) escape by default, but React's `dangerouslySetInnerHTML` is a risk; add a Content-Security-Policy header or meta tag; sanitise with DOMPurify. (4:05-6:07) — type: practice
- [SEC] CSRF: the browser adds session cookies automatically, so a forged form on another site is accepted; defences: server-issued anti-CSRF tokens in a hidden input or an `X-CSRF-Token` header for `fetch`; also check the Origin/Referer headers. (6:07-10:15) — type: practice
- [SEC] Clickjacking: a transparent iframe over a button; defend with headers that forbid framing. (10:15-11:17) — type: practice
- [SEC] Injection through URL/query parameters: escape incoming data, never insert raw into the DOM; SQL injection on the back end. (11:17) — type: practice
- [SEC] Tokens: store in HttpOnly cookies, do not print tokens anywhere, use refresh tokens, check the Authorization header on the server for every request. (12:19) — type: practice (note: this stands against the "store in localStorage" practice of many SPAs; the two sides are in dispute, see answers/05-security.md)
- [SEC] Third-party scripts and CDNs: use the `integrity` attribute (Subresource Integrity) and HTTPS. (13:19) — type: practice
- [SEC] Validate input, use proven libraries, keep dependencies updated, use linters, study OWASP Top 10. (13:19-15:23) — type: practice
- [SEC] Resources: Google Web Fundamentals, MDN, expert blogs. (15:23) — type: opinion
- [SEC] Career argument: knowing this makes you a more valuable hire. (16:25) — type: opinion (commercial)

## Techniques and steps
1. Set a CSP header; escape output; sanitise with DOMPurify.
2. Add CSRF tokens and check Origin/Referer.
3. Forbid framing with headers.
4. Keep tokens in HttpOnly cookies.
5. Use SRI on external scripts; patch dependencies.

## Tools and resources
- DOMPurify, CSP header/meta, SRI `integrity`, OWASP Top 10, MDN, Google Web Fundamentals (5:06-15:23)

## Quotes
- None reliable (machine-translated caption).

## Disagreements and contrarian points
- HttpOnly cookies for tokens vs localStorage in SPAs; Valentin Despa and Academind take sides differently (see answers/06).

## For the course
Lesson 7: shortest practical list for non-coders to demand from the AI: CSP, SRI on third-party scripts, HttpOnly/Secure/SameSite cookies, escape output, CSRF tokens, frame protection, keep dependencies updated.

## Other
"Man in the middle for the front end" is described as a script-swap through a CDN; the fix is SRI, not HTTPS alone.
