# ¿Qué es el OWASP TOP 10? (Explicado en 8 minutos) | Diccionario de hacking ético
- Source: RINKU (YouTube, es) · 2024-01-18 · 9 min · https://youtu.be/vf9Waxh3I04
- Speaker(s) and why they matter: RINKU, a Spanish-language ethical-hacking educator; offers a free OWASP guide as a lead magnet at the end (7:07-8:08). Aimed at beginners, technical and non-technical.
- Relevance to course: 3 (lesson 7, vocabulary and plain-language examples) · Freshness matters? 2021 list
- Codes: SEC
- Notes: no ads. Some explanations blur categories: item 7 mixes in encryption of passwords and cards, which belongs to cryptographic failures (6:06). Treat details with care.

## Core thesis
The OWASP Top 10 lists the ten most critical web vulnerabilities, drawn from data from hundreds of organisations; the video gives one plain-language example for each.

## Claims and advice
- [SEC] 1 Broken access control: user 123 can see user 321's orders. (1:02) — type: evidence (example)
- [SEC] 2 Cryptographic failures: unprotected sensitive data; remedies listed: server hardening, patches, strong password policies, access management, encryption, audits and monitoring. (1:02-2:03) — type: practice
- [SEC] 3 Injection (SQL, XSS, remote command execution): server-side injection reads databases; browser-side injection lets attackers act as the user, steal cookies/sessions, change the page, redirect. (2:03-3:03) — type: evidence
- [SEC] 4 Insecure design: a business-logic flaw such as booking 50 trips when only two seats exist, or stacking discounts until a 15 product costs 1. (3:03-4:03) — type: evidence (example)
- [SEC] 5 Security misconfiguration: default credentials such as admin/password; unnecessary features on. (4:03-5:05) — type: evidence
- [SEC] 6 Components with known vulnerabilities (old WordPress); find versions and check known CVEs, use scanners. (5:05) — type: practice
- [SEC] 7 Identification and authentication failures: weak or reused passwords, automated attacks, session ID in the URL, no multi-factor authentication. (6:06) — type: practice
- [SEC] 8 Software and data integrity failures (insecure deserialisation, untrusted third-party code from public GitHub projects). (6:06-7:07) — type: evidence
- [SEC] 9 Logging and monitoring failures: not an attack but the inability to detect one. (7:07) — type: evidence
- [SEC] 10 SSRF: an external attacker makes an internal app request resources behind a firewall or VPN. (7:07) — type: evidence

## Techniques and steps
Use as an awareness list; the video itself prescribes no workflow beyond item-level remedies.

## Tools and resources
- Free OWASP guide offered in the description (7:07, not checked)

## Quotes
- None needed.

## Disagreements and contrarian points
- None; consistent with Cyber Citadel and Código Fonte TV on ordering.

## For the course
Lesson 7: the booking-logic example (insecure design) maps onto a travel site's booking form: validate quantities, prices and codes on the server. Use as an illustration for "the form is only half the system".

## Other
Same OWASP 2021 list as the other two OWASP videos; the three agree on ranking and category names.
