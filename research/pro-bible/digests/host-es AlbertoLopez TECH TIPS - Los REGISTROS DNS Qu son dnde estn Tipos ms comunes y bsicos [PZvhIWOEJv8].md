# Los REGISTROS DNS ¿Qué son, dónde están? Tipos más comunes y básicos
- Source: AlbertoLopez TECH TIPS (YouTube, es) · 2022-07-10 · 9 min · https://youtu.be/PZvhIWOEJv8
- Speaker(s) and why they matter: Alberto López, a Spanish-language IT/cybersecurity educator; part three of a series on DNS. No sponsor; subscribe plea.
- Relevance to course: 3 (Spanish-language confirmation of record types) · Freshness matters? stable
- Codes: HOST
- Notes: auto-captions are mostly clean Spanish.

## Core thesis
DNS records are instructions stored in zone files on DNS servers; the five common ones are A/AAAA, CNAME, MX, TXT and NS, plus SPF as a TXT-based anti-spoofing record.

## Claims and advice
- [HOST] A record maps a domain to an IPv4 address; AAAA to IPv6; a domain can have several A records. (3:01-4:03) — type: evidence
- [HOST] CNAME ("canonical name") makes an alias pointing to another domain; it lets you change IPs without breaking users' bookmarks. (4:03-5:04) — type: evidence
- [HOST] MX gives the location of the mail server; the provider tells you the value. (5:04-6:06) — type: evidence
- [HOST] TXT stores text for notes and verification; it does not change how the domain behaves. (6:06-7:09) — type: evidence
- [HOST] NS names the authoritative server for a domain. (7:09) — type: evidence
- [HOST] SPF is a TXT-based record that lists which servers may send email for the domain, helping prevent spoofing and spam. (7:09-8:10) — type: evidence
- [HOST] Record types are specified in RFC documents; there were about 90 types and the set changes. (2:01, 8:10) — type: evidence (not verified)

## Techniques and steps
None given.

## Tools and resources
- RFC documents (8:10)

## Quotes
- None needed.

## Disagreements and contrarian points
- None.

## For the course
Host/DNS lesson: another independent description of A, CNAME, MX, TXT, NS and SPF in Spanish; agreement with Kirilenko.

## Other
Mentions earlier videos in the series about the DNS hierarchy and resolution.
