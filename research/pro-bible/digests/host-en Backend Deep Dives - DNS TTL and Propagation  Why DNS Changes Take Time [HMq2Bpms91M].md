# DNS TTL and Propagation — Why DNS Changes Take Time
- Source: Backend Deep Dives (YouTube, en) · 2026-06-13 · 16 min · https://youtu.be/HMq2Bpms91M
- Speaker(s) and why they matter: Backend Deep Dives, an educational channel (speaker not named; the delivery reads like scripted narration). Detailed and mostly standard; a few vendor-specific numbers should be checked.
- Relevance to course: 4 (domains, DNS and hosting hand-off) · Freshness matters? DNS concepts are timeless; provider TTL defaults change
- Codes: HOST
- Notes: no sponsor. Ends with a quiz question. Some Cloudflare statements look internally inconsistent (minimum TTL of 1 second vs about 60 seconds, 9:09).

## Core thesis
"DNS propagation" is really cache expiry: resolvers keep serving the old record until the TTL runs out. Plan changes by lowering the TTL early, waiting out the old TTL, then changing the record and raising the TTL again.

## Claims and advice
- [HOST] The authoritative server changes at once; thousands of resolvers keep cached copies until the TTL expires; nothing is pushed. (0:03-1:03, 7:07-8:08) — type: evidence (standard DNS behaviour)
- [HOST] TTL 300 = about 5 minutes, 3,600 = 1 hour, 86,400 = 24 hours; TTL is a maximum, not a guarantee. (1:03-2:04) — type: evidence
- [HOST] Trade-off: low TTL means faster changes and more queries; high TTL means fewer queries. (2:04) — type: evidence
- [HOST] New records have no stale cache, so TTL does not delay them. (2:04) — type: evidence (but see negative caching)
- [HOST] Migration recipe: 24-48 h before, lower TTL to 60 s; wait at least the old TTL (an hour if 3,600, a day if 86,400); then change the IP; check with `dig @8.8.8.8`, `dig @1.1.1.1` and whatsmydns.net; after a few hours decommission the old server; raise TTL back to 3,600 or more. (4:07-6:07, 12:10-15:12) — type: practice
- [HOST] Changing name servers at the registrar (NS delegation) is the genuinely slow case: 24 to 48 hours. (8:08-9:09) — type: evidence
- [HOST] Negative caching: if someone queried a name before you created it, resolvers cache "does not exist" for the SOA negative TTL (typically 300 to 3,600 s). (10:09-11:09) — type: evidence
- [HOST] Cloudflare proxy (orange cloud) makes DNS TTL irrelevant to visitors; CDN cache purge is separate from DNS TTL. (9:09-10:09) — type: evidence (provider-specific, verify)
- [HOST] Practical TTLs: 300 s for new or frequently changed records; 3,600 to 86,400 for stable production. (12:10) — type: opinion

## Techniques and steps
As in the migration recipe above; test with `dig @resolver name` and flush local cache.

## Tools and resources
- dig, whatsmydns.net, dnschecker.org, dnsspy.io (6:07-7:07)

## Quotes
- "DNS propagation delay is really just TTL expiry delay." (8:08)

## Disagreements and contrarian points
- Kirilenko Pro mentions a provider default TTL of 60 minutes and a choice of 5 minutes, consistent with this advice.

## For the course
Host/DNS lesson: the single most useful operational rule: before moving a client's site, lower the TTL a day ahead; "wait 48 hours" is mostly a name-server change effect. Verify the TTL and Cloudflare facts with provider docs before reciting.

## Other
None.
