# How To Set Up Google Workspace SPF, DKIM & DMARC | Improve Email Deliverability
- Source: Stewart Gauld (YouTube, en) · 2022-08-02 · 8 min · https://youtu.be/fsZaEce18FE
- Speaker(s) and why they matter: Stewart Gauld, a New Zealand small-business web/IT educator; subscribe plea at the start and end. Narrow product how-to (Google Workspace, Cloudflare DNS).
- Relevance to course: 3 (email records at hand-off) · Freshness matters? tool-dependent; record values change
- Codes: HOST
- Notes: the exact record contents are "in the description", not on screen, so the transcript does not give them.

## Core thesis
For business email on Google Workspace to be delivered rather than land in spam, add three TXT records at the DNS host: SPF, DKIM (generated in Google Admin) and DMARC, then check them with Google's Admin Toolbox.

## Claims and advice
- [HOST] Authentication needs SPF, DKIM and DMARC records; they improve deliverability and reduce spam-foldering. (0:00) — type: practice
- [HOST] SPF: a TXT record with name "@" and the value from Google's documentation. (2:03) — type: practice
- [HOST] DKIM: in Google Admin, Apps > Gmail > Authenticate email, generate a 2048-bit key (recommended), copy the host name and value into a TXT record, then click "Start authentication"; DNS can take "up to 48 hours". (3:06-5:08) — type: practice
- [HOST] DMARC: TXT record named `_dmarc` with a policy; add your own email for reports. (5:08-6:11) — type: practice
- [HOST] Check with Google Admin Toolbox "Check MX". (6:11-7:11) — type: practice

## Techniques and steps
1. Add SPF TXT at "@".
2. Generate DKIM in Google Admin, add TXT, authenticate.
3. Add `_dmarc` TXT with report address.
4. Run the toolbox check.

## Tools and resources
- Google Workspace Admin, Google Admin Toolbox (Check MX), Cloudflare DNS (1:00-7:11)

## Quotes
- None needed.

## Disagreements and contrarian points
- "Up to 48 hours" propagation vs the TTL video's view that most changes appear within the TTL; the 48 hours is a worst-case outer bound.

## For the course
Host/DNS lesson: the three email records are part of "domain handover": if the client uses Google Workspace or similar, set SPF, DKIM, DMARC. Primary verification of the RFCs and provider requirements is in PRIMARY_SOURCES.md (to be added).

## Other
None.
