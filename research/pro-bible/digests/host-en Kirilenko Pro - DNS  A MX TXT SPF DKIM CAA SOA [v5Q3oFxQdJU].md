# Настройка DNS записей: A, MX, TXT, SPF, DKIM, CAA, SOA
- Source: Kirilenko Pro (YouTube; Russian original, the file's English caption is machine-translated, `en.vtt`) · 2025-06-19 · 34 min · https://youtu.be/v5Q3oFxQdJU
- Speaker(s) and why they matter: Kirilenko, a Russian-language IT educator; beginner-friendly walkthrough with a live registrar panel. No sponsor; asks for likes.
- Relevance to course: 4 (lesson on domains/DNS; email records) · Freshness matters? stable
- Codes: HOST
- Notes: caption garbles many words ("Came" for CNAME, "DEKM" for DKIM, "DMARK" for DMARC); the meaning is clear.

## Core thesis
Each DNS record type does one job: A/AAAA point a name to a server, MX says where mail goes, TXT proves ownership and carries SPF/DKIM/DMARC, CNAME aliases, CAA limits certificate issuers, NS and SOA define the zone. Create them in the registrar panel and verify with nslookup or dig.

## Claims and advice
- [HOST] A (IPv4) and AAAA (IPv6) records link a domain to the server's IP; normally only A is needed. (0:00-2:01) — type: evidence
- [HOST] MX tells senders which server receives mail for the domain; lower priority number means higher priority; set a priority even for one record. (2:01-4:02, 25:30) — type: evidence
- [HOST] TXT records verify ownership (Google Search Console, Workspace, Yandex) and carry SPF, DKIM, DMARC. (4:02-5:04) — type: evidence
- [HOST] SPF lists which servers may send mail for the domain; DKIM adds a signature checked against a public key in DNS (record name = selector + domain); neither tells the receiver what to do on failure; DMARC adds a policy (none, quarantine, reject) and reports; the DMARC record is at `_dmarc.yourdomain`. (6:06-12:13) — type: evidence
- [HOST] PTR (reverse DNS) is set by the IP provider and affects mail trust. (5:04-6:06) — type: evidence
- [HOST] CNAME: lets subdomains inherit one place's settings; but a name with a CNAME cannot carry other records and a CNAME cannot be used on the root domain. (13:15-14:17) — type: evidence
- [HOST] CAA restricts which certificate authority may issue certificates for the domain (example: Let's Encrypt). (15:18) — type: evidence
- [HOST] NS says who serves the zone; SOA holds the serial number, refresh, retry and expiry values. (16:18-19:21) — type: evidence
- [HOST] Provider TTL default shown: automatic (60 minutes); you can choose 5 minutes. (19:21) — type: evidence (one provider)
- [HOST] Verify with `nslookup -type=A name [resolver]` or `dig +short name`; results reflect your resolver's cache until the TTL expires. (20:23-30:39) — type: practice

## Techniques and steps
1. In the registrar's DNS panel add record (type, host, value, TTL).
2. Wait seconds to minutes.
3. Check with nslookup or dig against your resolver and 8.8.8.8.

## Tools and resources
- nslookup, dig, registrar DNS panel (20:23-33:47)

## Quotes
- None reliable (machine-translated caption).

## Disagreements and contrarian points
- None.

## For the course
Host/DNS lesson: a plain list of which record types a small business site actually needs: A (or CNAME for a platform subdomain), MX/TXT for email (SPF, DKIM, DMARC), TXT for site verification, CAA optional. Compare with Stewart Gauld (Workspace email) and the TTL video.

## Other
Mentions SRV records for Teams, Jabber, LDAP, Minecraft servers (12:13); irrelevant here.
