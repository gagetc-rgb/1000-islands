# Cross-check 16: security addendum (digest-based, quotes from transcripts, OWASP/MDN checked 11 Oct 2026)

Lesson feed: lesson 7 (security part). Supplements `05-security.md` (NotebookLM attributions, one misattribution found there). Security was not one of the nine gap topics, but lesson 7 needs quoted evidence, and the OWASP edition turned out to be out of date, so this file records both.

Sources (6 videos): **CC** = sec-en Cyber Citadel, OWASP 2021 [hryt-rCLJUA]; **PF-X** = sec-en PwnFunction XSS [EoaDgUgS6QA]; **PF-C** = sec-en PwnFunction CSRF [eWEgUcHPle0]; **VM** = sec-en "RU-channel" (Vladilen Minin; English caption is machine-translated from Russian) [ZFzn2AQPwRA]; **RK** = sec-es RINKU [vf9Waxh3I04]; **CF** = sec-pt Código Fonte TV [OzBy8nYLY-I] (Philips-sponsored 1:02-2:03).

Tags: ◆ primary page verified (PRIMARY_SOURCES.md), ◈ several authors, ◇ one author.

**Important correction (◆):** the three OWASP videos (CC, RK, CF) all describe the **2021** list. The OWASP project page now says "The most current released version is the OWASP Top 10 2025." The 2025 list is A01 Broken Access Control, A02 Security Misconfiguration, A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design, A07 Authentication Failures, A08 Software or Data Integrity Failures, A09 Security Logging and Alerting Failures, A10 Mishandling of Exceptional Conditions. Any lesson text that prints a ranking must use the 2025 list; the videos remain useful for explanations of each class.

## A. Rules agreed by at least three authors

1. ◈ **Access control is the top class of web problems; deny by default and check on the server.** (CC, RK, CF; the OWASP page confirms 2025 A01)
   - CC [2:02]: "broken access control up from number five has taken the top spot in 2021"
   - RK [1:02]: "tú como usuario que está logueado solo puedes ver tus pedidos y tus datos Pero qué ocurre si puedes ver los datos y pedidos del usuario 321"
   - CF [17:19-18:21]: "usar a tática de negar por padrão só deixando liberado o recurso que é público"
2. ◈ **Keep third-party components and plugins updated and from trusted sources.** (CC, RK, CF, VM)
   - CC [5:04]: "an adversary only needs to find one vulnerable component to compromise a system"
   - RK [5:05]: "tener una versión antigua de wordpress para la que se ha detectado una vulnerabilidad crítica"
   - CF [10:10]: "assinar boletim de segurança relacionados aos componentes que você utiliza"
   - VM [13:19]: "use ready-made proven solutions, and not just some random libraries that can carry malicious code" (caption wording; the idea is trusted libraries only, plus SRI)
   - Primary ◆ MDN SRI: "ensuring that the files your web application fetches have exactly the contents that you expect them to have."
3. ◈ **Multi-factor authentication and no default credentials.** (CC, RK, CF)
   - CC [5:04-6:06]: "procedures like mfa are integral in authenticating key information like usernames and passwords"
   - RK [5:05]: "viene con credenciales predeterminadas como admin y password y estas son cosas que los atacantes encontrarán y explotarán"
   - CF [8:09]: "sempre que possível implemente autenticação multi-fator" and "nunca eu dizer nunca ou o ambiente de produção as credencias padrões"
4. ◈ **Misconfiguration is common; keep installs minimal and configs consistent.** (CC, RK, CF)
   - CC [4:04]: "a failure to implement all the security controls for a server or web application or implementing security controls but with errors"
   - RK [4:03-5:05]: "dejar activas funcionalidades innecesarias dejar credenciales predeterminadas"
   - CF [11:12-12:12]: "não tenha todo o ambiente limpo nada de deixaram instalar componente" (garbled; minimal install, identical configuration across environments, different credentials)
5. ◈ **Log and monitor failures so attacks are noticed.** (CC, RK, CF)
   - CC [6:06]: "security logging and monitoring failures can seriously impact visibility and forensics"
   - RK [7:07]: "la capacidad de una empresa para detectar si han recibido un ciberataque"
   - CF [4:06-5:07]: "mantenha logins logins com falha e transações importantes registrados"
6. ◈ **Business-logic abuse (insecure design) is a real class: quantities, discounts, coupons must be enforced on the server.** (RK, CF, CC names it)
   - RK [3:03]: "Qué pasaría si reservará 50 paquetes de ese viaje" (a booking example)
   - CF [12:12-13:15]: a coupon system that allows stacking until the total reaches zero
   - CC [3:03]: "a firm call for developers to include more security patterns and principles by design"
7. ◈ **Never put user input into the page as HTML; escape, or sanitise with a library.** (PF-X, VM, CF, RK)
   - PF-X [8:14-9:15]: events handlers also run code, so blocking `<script>` fails; "Dom purifier is an awesome Library which sanitizes JavaScript and spits out only the clean HTML"
   - VM [4:05]: "first of all, is, of course, escaping and validating the input" (caption)
   - CF [14:15-15:17]: test all parameters, headers, URLs and cookies, and use safe APIs or ORMs
   - RK [2:03-3:03]: browser-side injection lets attackers "robar sus cookies o sesiones Modificar el contenido o el aspecto de la página"

## B. Two-author and single-author items

- ◇ Anti-CSRF tokens: PF-C [4:04] "randomized tokens which were also called as anti CSR tokens"; VM [9:14] server-generated token in a hidden input or `X-CSRF-Token` header plus Origin/Referer checks. Only two authors; common practice, but see disagreement below on SameSite.
- ◇ HttpOnly cookies for tokens (VM [12:19]); ◆ MDN: "A cookie with the HttpOnly attribute can't be accessed by JavaScript".
- ◇ CSP header (VM [5:06-6:07]); ◆ MDN CSP page: "to control which resources, in particular JavaScript resources, a document is allowed to load" and it can help against clickjacking.
- ◇ SRI `integrity` attribute for CDN scripts (VM [13:19]); ◆ MDN SRI page.
- ◇ Clickjacking and frame-forbidding headers (VM [10:15-11:17]).
- ◇ HTTPS/TLS everywhere, HSTS, strong password hashing with Argon2/scrypt/bcrypt/PBKDF2 (CF [15:17-17:19]); the other videos do not list algorithms. Not verified against a primary page here.
- ◇ SSRF controls (CF [2:03-4:06]) — SSRF is not a separate line on the 2025 OWASP list.

## C. Disagreements and caveats

- **Where to keep tokens.** VM says HttpOnly cookies (not localStorage); the web-basics videos (Despa, Academind, in `answers/06`) split between cookies and token headers. No resolution needed for a static brochure site; for logins prefer HttpOnly + Secure + SameSite cookies, which MDN documents.
- **CSRF age.** PF-C is from 2019; it does not mention `SameSite` cookies, which narrows CSRF in modern browsers. Not verified here which default browsers apply (do not state a default in the lesson without checking MDN `SameSite`).
- **Sponsor/vendor.** CF carries a Philips job ad (1:02-2:03); CC ends with a consultancy sign-off; VM ends with a career pitch; RK offers a free guide as a lead magnet. None changes the technical content.
- **Caption quality.** VM is a machine translation; CF and RK have Spanish/Portuguese caption garbling. Quotes above are caption text; wording is approximate where marked.

## D. What the lesson should say (derived)

- Your site needs security thinking as soon as it has a **form, login, admin area or database**. A static brochure site with a third-party form has a short list: list every third-party script and why it is there; use SRI where a script is loaded from a CDN; keep plugins updated; no secrets in client code; HTTPS everywhere.
- Demand from the AI: escape output, no `innerHTML` with user text, CSP, anti-CSRF tokens for state-changing actions, HttpOnly/Secure cookies, server-side checks of price/quantity/coupon, deny by default.
- Use the 2025 OWASP names, not the 2021 ranking printed in the videos.
