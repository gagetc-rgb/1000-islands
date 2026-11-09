# TOP 10 Ameaças de Segurança em Aplicações Web - DICAS DE PREVENÇÃO!
- Source: Código Fonte TV (YouTube, pt-BR) · 2022-08-19 · 20 min · https://youtu.be/OzBy8nYLY-I
- Speaker(s) and why they matter: Código Fonte TV, Brazilian developer-education channel. **Sponsored by Philips (job openings), segment 1:02-2:03**. Covers the OWASP Top 10 with prevention tips, counting down from 10 to 1.
- Relevance to course: 4 (lesson 7: most complete prevention tips among the OWASP videos) · Freshness matters? 2021 list
- Codes: SEC, PRIV (LGPD mention)
- Notes: sponsor segment 1:02-2:03 (skip). Captions garble many terms in Portuguese (e.g. "Open web application Security browser", "Log for céu" for Log4j). Quote with care.

## Core thesis
Knowing the ten most critical risks helps you build secure applications; each risk has a short list of preventive habits (deny by default, validate inputs, keep components updated, log and monitor, encrypt in transit).

## Claims and advice
- [SEC] 10 SSRF: validate user-supplied URLs, use a positive allow-list of destinations and schemes, disable HTTP redirects, do not return raw responses; denylists and regex "may not be enough". (2:03-4:06) — type: practice
- [SEC] 9 Logging and monitoring: log failed logins, access-control failures and server-side input failures with enough context; protect logs; set alerts; have an incident-response plan. (4:06-6:08) — type: practice
- [SEC] 8 Software and data integrity: the Log4j case is cited as a compromised component; use signatures to verify sources, trusted repositories, review of code and config changes. (6:08-7:09) — type: practice
- [SEC] 7 Authentication: multi-factor authentication, no default credentials in production, weak-password checks, identical error messages for all login failures, session IDs random, not in the URL, invalidated after logout and timeout, alert admins on attack patterns. (7:09-9:10) — type: practice
- [SEC] 6 Outdated components: keep an inventory of versions, subscribe to security bulletins, use dependency scanners, remove unused dependencies, only official sources. (9:10-11:12) — type: practice
- [SEC] 5 Misconfiguration: same configuration across dev/test/prod but different credentials, minimal installs, segmented architecture, automated checks. (11:12-12:12) — type: practice
- [SEC] 4 Insecure design: an example of coupon stacking that zeroes the order; fix with threat modelling and tests for critical flows. (12:12-14:15) — type: evidence/practice
- [SEC] 3 Injection (SQL, XSS): test all parameters, headers, URLs, cookies; use safe APIs or ORMs. (14:15-15:17) — type: practice
- [SEC][PRIV] 2 Cryptographic failures: encrypt data in transit with TLS and HSTS, store passwords with strong hash functions (Argon2, scrypt, bcrypt, PBKDF2), do not keep sensitive data you do not need, consider laws like LGPD. (15:17-17:19) — type: practice
- [SEC] 1 Broken access control: deny by default, enforce on the server, disable directory listing and remove `.git` and backup files from the web root, validate session IDs after logout. (17:19-18:21) — type: practice

## Techniques and steps
Per risk, as listed above; the "deny by default" rule is the unifying habit.

## Tools and resources
- OWASP Top 10 report (2:03); dependency checkers and the OWASP vulnerability database (10:10); source of the "ten risks" is OWASP

## Quotes
- None reliable (garbled).

## Disagreements and contrarian points
- Agrees with Cyber Citadel and RINKU on order and content; adds more concrete prevention steps than either.

## For the course
Lesson 7: use as the source for a 10-line "ask the AI / ask the developer" checklist: deny by default, server-side checks, MFA for logins, no default creds, updates and inventory, minimal config, logs and alerts, TLS everywhere, strong password hashing, no `.git` or backups on the web root.

## Other
Mentions the LGPD (Brazil) as a data-protection law; relevant to lesson 7's privacy part only as an example of a regional law.
