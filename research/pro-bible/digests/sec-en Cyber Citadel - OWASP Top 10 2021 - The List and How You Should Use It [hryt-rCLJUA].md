# OWASP Top 10 2021 - The List and How You Should Use It
- Source: Cyber Citadel (YouTube, en) · 2021-11-23 · 9 min · https://youtu.be/hryt-rCLJUA
- Speaker(s) and why they matter: Cyber Citadel, a security consultancy channel (the sign-off "The risk is real, defend with Cyber Citadel" is a sales tag; no explicit pitch). Narrated overview, not a practitioner demo.
- Relevance to course: 3 (lesson 7: vocabulary of the OWASP list) · Freshness matters? the 2021 list may have been superseded; check the current OWASP edition before quoting
- Codes: SEC
- Notes: no sponsor segment. One slip: it says Injection was "previously known as cross-site scripting" (3:03); in the 2021 list XSS was merged into Injection, it was not renamed.

## Core thesis
The OWASP Top 10 is an awareness document built from community data and a survey, a baseline of the most critical web-application risks; use it as a minimum, not as a complete standard.

## Claims and advice
- [SEC] OWASP started in 2003, is volunteer-run and not tied to a technology company; the Top 10 is built from contributed data (8 risks) plus a community survey (2 risks). (0:00-2:02) — type: evidence (description of method)
- [SEC] 2021 order: 1 Broken Access Control (up from 5); 2 Cryptographic Failures; 3 Injection; 4 Insecure Design (new); 5 Security Misconfiguration (found in "ninety percent of applications tested"); 6 Vulnerable and Outdated Components; 7 Identification and Authentication Failures; 8 Software and Data Integrity Failures (new); 9 Security Logging and Monitoring Failures; 10 Server-Side Request Forgery (new). (2:02-7:07) — type: evidence
- [SEC] Broken access control lets attackers act as privileged users. (2:02) — type: evidence
- [SEC] Misconfiguration comes from default credentials, rushed work, misunderstood systems. (4:04) — type: evidence
- [SEC] Outdated components: about 18,000 new vulnerabilities a year, so patching is continuous; "an adversary only needs to find one vulnerable component". (5:04) — type: evidence (figure not verified)
- [SEC] MFA is part of fixing identification failures. (5:04-6:06) — type: practice
- [SEC] Integrity failures include relying on untrusted plugins, e.g. WordPress plugins; one compromised plugin can expose the app. (6:06) — type: practice
- [SEC] The list is a baseline "pseudo standard", the bare minimum; many items cannot easily be tested in-house; contributors publish without experience of a real attack. (7:07-8:08) — type: opinion/caveat

## Techniques and steps
Use the list as an awareness and review checklist; it does not replace testing.

## Tools and resources
- OWASP Top 10 project (0:00)

## Quotes
- "a baseline, a pseudo standard" (7:07-8:08, near-verbatim)

## Disagreements and contrarian points
- Warns that the list has limits (voluntary data, hard to test items), not usual for a vendor channel.

## For the course
Lesson 7: gives vocabulary only. For a brochure or small-business site the relevant items are access control (if there is any admin), outdated components/plugins, misconfiguration and default credentials, and third-party scripts (integrity). Check the current OWASP edition before printing numbers.

## Other
The "18,000 vulnerabilities a year" and "90% of apps had misconfiguration" figures come from the narrator, not verified here.
