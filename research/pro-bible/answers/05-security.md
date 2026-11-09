# Cross-check 5: web security basics (NotebookLM, 11 Oct 2026)

Sources: PwnFunction (XSS, CSRF), Vladilen Minin (ru; English auto-translation), Cyber Citadel (OWASP Top 10 2021), RINKU (es), Codigo Fonte TV (pt), Valentin Despa (cookies/sessions/tokens). Attribution by the notebook's model (unverified). One slice of the answer (single-author items, e.g. Subresource Integrity) was not read; it was blocked by the browser tool's output filter.

## Agreed by 3+ authors
1. Validate and sanitize all user input; escape output (XSS, injection).
2. Anti-CSRF tokens on forms and requests that change state.
3. Auth cookies with HttpOnly, Secure and SameSite flags.
4. Parameterized queries / ORMs, never string-built SQL.
5. Access control on the server, deny by default, checked on every request (six of six).
6. Keep dependencies updated and audit them for known vulnerabilities.
7. Multi-factor authentication and rate-limiting on login.
8. Content-Security-Policy header to restrict script sources (PwnFunction, Minin, Codigo Fonte TV).
9. Server-side logging of auth failures and suspicious requests (Cyber Citadel, RINKU, Codigo Fonte TV).

## Disagreements
- Where to store auth tokens: HttpOnly cookies (Minin; the notebook also credited Despa, but 'HttpOnly' and 'localStorage' do not appear in his transcript, so that attribution is WRONG/unverified) vs localStorage with Authorization headers for cross-party OAuth/JWT flows (PwnFunction, Despa). Practical reading: HttpOnly cookie for a site's own login.
- Client-side sanitizing (Minin recommends DOMPurify) vs "client controls are untrusted, sanitize on the server" (Despa, Codigo Fonte TV). Both are used in practice; the server check is the one that counts.

## Our reading (for a no-code director)
- Most of this applies only if the site has accounts, a database or a form backend. A static brochure site with a contact form handled by a hosted service mostly needs: no secrets in the repo or client, server-side validation and spam protection on forms, HTTPS, updated dependencies, a CSP when third-party scripts are added.
- Rule to give the AI: "no API keys or passwords in client code; every form handler validates on the server; list every third-party script and why."

## Verification log (11 Oct)
- Checked against transcripts: nothing yet for the security answer except the Despa misattribution above. Treat per-author names in this file as approximate; the rules themselves match standard OWASP guidance.
