# Cross-check 12: domains, DNS and hosting hand-off to a client (digest-based, quotes from transcripts, RFCs and provider docs fetched 11 Oct 2026)

Lesson feed: not an explicit lesson in the 9-lesson plan; feeds the hand-over checklist (lesson 8 acceptance and the owner's launch) and lesson 7 where email security records matter.

Sources (8 videos; en x5, ru machine-translated, es, fr). Short names: **BDD** = host-en Backend Deep Dives, TTL and propagation [HMq2Bpms91M] (2026); **BM** = host-en Bryce Matheson [1yi3d8s10ck] (2020, sells hosting); **WA** = host-en DesignWithArash, Wix Studio handover [uBvfJJToH6Y] (2026); **KP** = host-en Kirilenko Pro (Russian, machine-translated) DNS records [v5Q3oFxQdJU] (2025); **RB** = host-en Rino de Boer [sfcGejsltO8] (2020, affiliate-like); **SG** = host-en Stewart Gauld, Workspace SPF/DKIM/DMARC [fsZaEce18FE] (2022); **AL** = host-es Alberto López, DNS records [PZvhIWOEJv8] (2022); **CC** = host-fr Cookie connecté, DNS in 5 minutes [qzWdzAvfBoo] (2018). Files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md "Domains, DNS..."), ◈ several authors, ◇ one author or disputed.
Independence: BM and RB are on opposite sides of the hosting-resale question; both have a commercial interest (BM sells hosting, RB uses affiliate-like links). The DNS-record explanations (KP, AL, CC, BDD) are independent teachers of the same standard material.

## A. Rules agreed by at least three authors

1. ◈ **What the common records do.** (KP, AL, BDD; CC covers the underlying idea)
   - KP [1:01]: "In most cases, when launching a website, you will only use the A record type." (A = IPv4; AAAA = IPv6)
   - AL [3:01]: "el registro es de a tres en inglés que en español significa dirección" (caption garbled; A = address, holds the IP of the domain)
   - AL [6:06]: "este registro a diferencia de los anteriores no vincula un dominio a una dirección ip aquí en este registro indicamos la ubicación de un servidor de correo electrónico" (MX)
   - KP [3:02]: MX "the lower the number, the higher the priority"
   - CC [1:01]: "le dns ou domaine name system qui est en fait l'action de traduire les noms de domaine en adresse ip" (DNS translates names into IP addresses)
   - TXT: KP [4:02] ownership verification and SPF/DKIM/DMARC; AL [6:06] "viene de texto".
   - Primary ◆ RFC 1034: "If a CNAME RR is present at a node, no other data should be present", which is why KP [14:17] says a subdomain with a CNAME cannot carry MX/TXT and a CNAME "cannot be used on a second-level domain" (apex).

2. ◈ **TTL is cache lifetime; DNS changes appear as caches expire.** (BDD, KP, SG, with different numbers)
   - BDD [7:07-8:08]: "DNS propagation delay is really just TTL expiry delay."
   - KP [30:39]: "as soon as it goes to zero, this server will publicly re-query" (caption wording; the TTL counts down in each answer)
   - SG [5:08]: "it can take up to 48 hours for the dns changes to fully propagate"
   - Primary ◆ Cloudflare: "A TTL of Auto is set to 300 seconds (five minutes)." for proxied records; unproxied TTL 60 s (non-Enterprise) to 1 day. RFC 2308 documents negative caching (a name looked up before you created it can stay "not found" for a while).
   - Disagreement on numbers: BDD says most changes appear within minutes to the TTL, with name-server changes slow (24-48 h, [8:08]); SG says 48 hours as a general outer bound. ◇ the 24-48 h figure is **not verified** on a primary page.

3. ◈ **The client should own the domain (and ideally the hosting).** (BM, RB, WA)
   - BM [7:06-8:07]: "i think that clients should handle their own domains" (his reason: if a client leaves, "they have the keys to the kingdom")
   - RB [6:07-7:08]: "Always let them sign up for their own hosting. Let them pay for their own hosting." (near-verbatim; reasons: exit without your help, bankrupt clients, access to their email)
   - WA [3:04-4:06]: on full transfer "the website, the plan, and the connected domain move to their account" (Wix-specific; he suggests staying co-owner at first)
   - BM disagrees on hosting (see C).

4. ◆◈ **Email authentication needs SPF, DKIM and DMARC records.** (KP, SG; SPF alone also AL)
   - SG [0:00]: "we need to set up three authentication methods spf record dkim record and d mark for your domain this will ultimately enhance the deliverability of your emails"
   - KP [9:09-11:12]: SPF and DKIM do not say what to do on failure; DMARC adds the policy and reports
   - AL [8:10]: SPF "estoy dando instrucciones ... para que solo ciertos servidores de correo específicos tengan autorización para enviar correos en nombre de un dominio"
   - Primary ◆ RFC 7208 (SPF): domains "can explicitly authorize the hosts that are allowed to use their domain names"; RFC 7489 (DMARC): "ranging from no action, through altered delivery, up to message rejection."; Google: "Set up SPF or DKIM email authentication for your sending domains." and bulk senders (over 5,000 a day to Gmail from 1 Feb 2024) have extra requirements.

5. ◈ **Verify after every DNS change from outside your own cache.** (BDD, KP, SG)
   - BDD [5:07]: "Check propagation with dig at 8.8.8.8 ... and whatsmydns.net."
   - KP [20:23-23:26]: `nslookup -type=A name` and `dig +short name`, optionally against a public resolver
   - SG [6:11]: Google Admin Toolbox "check mx" to verify mail records.

## B. Single-author items

- BDD [4:07-5:07]: migration recipe: lower TTL to 60 s a day or more before, wait out the old TTL, change, verify, raise TTL back. ◇ practice; consistent with RFC caching logic but numbers (24-48 h) are the author's. The related claim "Cloudflare minimum TTL is 1 second on paid plans" ([9:09]) is ◆ **wrong** per Cloudflare's docs (30 s Enterprise, 60 s others).
- KP [15:18]: CAA record to limit certificate issuers. ◇ (standard but not verified here).
- WA [2:02-4:06]: structured handover: final domain, resource kit, tutorials, collaborator vs transfer, delivery email. ◇ one author, Wix-only.
- RB [10:11-16:18]: compare renewal not first-year prices; use SiteGround or Hostinger. ◇ brand advice, affiliate-like, dated 2020; do not reuse.
- BM [3:03-5:05]: reselling hosting at $15-75 a month. ◇ business model.
- ◆ Cloudflare Pages: a custom apex domain needs the site added as a Cloudflare zone with name servers pointed to Cloudflare; Cloudflare then "will proceed by creating a CNAME record for you." (relevant for the owner's pages.dev workflow; no video covers it.)

## C. Disagreements

- **Who hosts?** BM: the developer hosts, charges monthly, keeps the domain with the client. RB: the client signs up for hosting and pays; the developer gets access. WA: the platform account moves to the client, developer stays co-owner. Reading: ownership of the domain and billing relationships should sit with the client; managed hosting is a separate service, not a default.
- **Propagation numbers.** BDD (minutes to hours, name servers slow) vs SG (48 hours). Not resolvable from primary pages fetched.
- **Provider facts.** BDD's Cloudflare claim conflicts with Cloudflare's docs (◆ above).

## D. Notes for the lesson / hand-over checklist

- Before launch: confirm who owns the registrar account; use 2FA; turn on auto-renew; keep the DNS provider account in the client's name or give the developer a delegate role.
- Records to set: A/AAAA or CNAME for the site; MX and SPF/DKIM/DMARC TXT if the client has business email; TXT for Search Console verification; optional CAA.
- Plan the change: lower the TTL a day ahead; verify with dig/nslookup from a public resolver; keep the old host until stable.
- Not covered: ICANN transfer lock, domain privacy, registrar comparisons; not verified.
