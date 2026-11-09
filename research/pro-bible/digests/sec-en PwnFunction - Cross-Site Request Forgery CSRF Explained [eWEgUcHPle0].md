# Cross-Site Request Forgery (CSRF) Explained
- Source: PwnFunction (YouTube, en) · 2019-04-05 · 14 min · https://youtu.be/eWEgUcHPle0
- Speaker(s) and why they matter: PwnFunction, security educator (see the XSS digest). No sponsor.
- Relevance to course: 3 (lesson 7) · Freshness matters? partly: browsers now default cookies to SameSite=Lax, which he does not mention (video is from 2019)
- Codes: SEC
- Notes: advanced middle section (JSON CSRF through forms, Flash, 307 redirects) is niche and partly obsolete (Flash is gone).

## Core thesis
Browsers send cookies automatically with every request to a site, so another site can trigger a state-changing request in your logged-in session. The standard fix is a random anti-CSRF token per request that the attacker's page cannot know.

## Claims and advice
- [SEC] Cookies are sent automatically with each request to the domain, whichever site started the request. (0:00-1:00) — type: evidence
- [SEC] Same-origin policy blocks reading cross-domain responses but not sending requests; CSRF does not break it. (1:00-2:02, 4:04-5:07) — type: evidence
- [SEC] Example: visiting a malicious page that auto-submits a form to a "delete my account" endpoint deletes the account in your session. (2:02-5:07) — type: evidence
- [SEC] Defence: random anti-CSRF tokens generated on the server and validated on every state-changing request. (4:04) — type: practice
- [SEC] JSON APIs can be hit with crafted forms (valid JSON via `name=value` tricks) or `fetch`; a required `Content-Type: application/json` helps only because setting it cross-origin needs CORS permission. (5:07-10:13) — type: evidence
- [SEC] CORS is a controlled relaxation of same-origin policy; a server allows origins and headers explicitly. (10:13) — type: evidence
- [SEC] CSRF can be chained with other bugs (he found remote code execution once); protection can fail when tokens leak or are predictable. (12:16-13:16) — type: evidence (anecdote)

## Techniques and steps
1. Add per-session anti-CSRF tokens to every state-changing request (forms and API calls).
2. Do not rely on content-type alone.

## Tools and resources
- none required

## Quotes
- "whenever you make a request to this web application the cookies in the browser are sent automatically" (0:00, near-verbatim)

## Disagreements and contrarian points
- Does not mention SameSite cookies (the RU-channel video and Valentin Despa's cookies video cover cookie flags).

## For the course
Lesson 7: the one rule: any form that changes something (login, booking submit, delete) needs a CSRF defence. Modern frameworks do it for you; for a static site with a form handled by a third-party service, the service's own protection applies, but the list of third parties must be known.

## Other
None.
