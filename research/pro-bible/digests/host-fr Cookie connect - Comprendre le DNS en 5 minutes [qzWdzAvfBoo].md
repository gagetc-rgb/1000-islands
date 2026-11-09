# Comprendre le DNS en 5 minutes
- Source: Cookie connecté (YouTube, fr) · 2018-09-18 · 5 min · https://youtu.be/qzWdzAvfBoo
- Speaker(s) and why they matter: Cookie connecté, a French-language tech explainer channel; introductory and accurate on the basics. No sponsor; subscribe plea.
- Relevance to course: 2 (DNS basics in French; low density) · Freshness matters? stable (2018)
- Codes: HOST
- Notes: opens with a riddle (0:00-1:01).

## Core thesis
Browsers need the server's IP address; DNS translates names into IP addresses by walking a hierarchy (root, top-level domain, the domain's own name servers), usually through a recursive resolver provided by the ISP or a public one.

## Claims and advice
- [HOST] A browser needs an IP address; DNS maps human-readable domain names to IP addresses. (0:00-2:02) — type: evidence
- [HOST] The DNS is a hierarchy: root, then top-level domains (.fr, .com, .org), then the domain and its subdomains; delegation can point a subdomain to other servers. (2:02-3:02) — type: evidence
- [HOST] Resolution: the browser asks a recursive resolver (by default the ISP's; public alternatives are Google Public DNS, OpenDNS, Cloudflare), which queries the root, then the TLD server, then the domain's server and returns the IP. (3:02-4:04) — type: evidence

## Techniques and steps
None.

## Tools and resources
- Public resolvers: Google Public DNS, OpenDNS, Cloudflare (3:02)

## Quotes
- None needed.

## Disagreements and contrarian points
- None.

## For the course
Host/DNS lesson: one clear paragraph of "what DNS is" in French, consistent with the Spanish and Russian videos.

## Other
None.
