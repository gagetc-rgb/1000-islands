# 1000 Islands Travel — Work Plan, Stage 1 (Structure)

**Started:** 1 October 2026 · **Price:** IDR 35m fixed, accepted · **Scope baseline:** `Offer_Sent_to_Owner.md` (the message actually sent, in Russian) · **Promised timeline:** 4–6 weeks for the whole project · **Status:** Stage 1 (structure) in progress

Markers: ◆ confirmed (source or project file) · ◈ likely · ◇ our assumption / hypothesis

---

## Production plan — whole project (◇, 4–6 weeks from 2 Oct 2026)

| Week | Stage | Claude | User | Owner | Ends with |
|---|---|---|---|---|---|
| **1** (2–8 Oct) | Structure | competitor structure scan · sitemap v1 · low-fi wireframes of 5 key templates (Home, Raja Ampat, Private Yachts, Travel Advisors, Plan Your Journey), desktop + mobile, draft copy · FigJam sitemap | call with the owner (`Call_Questions.md`) · Figma account + connector | answers 9 questions · trip list · reviews | **Approval #1: structure** |
| **2–3** | Design | visual direction (2 moodboard options) → key screens Home + Raja Ampat (desktop + mobile) → remaining templates in the same system | picks the direction, art-directs | photos · logo decision · one combined comment list | **Approval #2: design** → 30% payment |
| **3–5** | Build | Astro project · templates · content entry · photo processing · forms → leads system · GA4 + Search Console events · technical SEO · privacy / cookies · small CMS (photos, galleries, reviews) · temporary address | domain + hosting on the company's accounts | — | working version on a temporary address |
| **5–6** | Test & launch | QA checklist · fixes from one combined list · launch · sitemap to Search Console · indexing check | — | tests on phone and desktop · one comment list | **Approval #3** → 30% · launch → 10% · 1 month of free fixes |

**Critical path:** the owner's answers (week 1) → trips and photos by the end of week 2; otherwise the build stalls.
**Decisions due:** landing set + agent scheme + price display (week 1) · design direction (week 2) · logo (week 2, separate work if needed) · domain and stack (before build, week 3).

---

## 0. Ground rules

- **Scope = `Offer_Sent_to_Owner.md`.** `1000_Islands_Website_Proposal.md` (3 tiers, full CRM, Sanity, 2-round limits) was never sent as the agreed scope; use it only as a source of ideas.
- **Owner truth** = `1000-islands-travel-strategy.md` (interview) + PART 1 of `1000-islands-website-ux-content-structure.md` (owner's own copy) + whatever the owner answers from now on.
- **Hypotheses, open to attack:** UX PART 2–10, the pricing memo, the growth plan.
- Stage 1 = structure, shown to the owner **without final design** (approval point #1). Research and keywords are internal tools that serve it, not deliverables.
- Time (◇): 4–6 weeks total means structure must be approved in **about 1 week**. Research is time-boxed to ~8 h; anything that does not change the structure waits.

---

## 0a. What we actually promised (from the sent offer)

- **3 approval points:** (1) structure without final design, (2) design — key screens first, then the rest, (3) working version on a temporary address. At each point the owner sends one combined list of comments.
- **Pages:** the number is not fixed in advance; it is fixed when the structure is approved. "Don't inflate, don't cap."
- **Landing pages:** 3–4 commercial landings (examples in the offer: Raja Ampat, Triton Bay, Private Yacht Journeys, one more priority) + a properly worked-out B2B section. Exact set to agree.
- **CMS: small.** The owner edits photos, galleries, reviews and part of the simple content. New Journeys / Destinations are added by us when needed, not self-service.
- **Leads:** a simple system. Fields: name, contact, B2B/B2C, destination, dates, travellers, source, status, comments. Stages: New → Contacted → Proposal → Negotiation → Won / Lost. "No big CRM from scratch."
- **Analytics:** GA4, Search Console, events: visits, sources, pages, destination interest, WhatsApp clicks, form submissions.
- **SEO:** technical base only: structure, titles and descriptions, internal links, sitemap, indexing, schema, speed, structure friendly to Google and AI search. No promotion, no promised positions.
- **Content:** we distribute and shorten the owner's texts and prepare the photos (selection, crop, weight). The owner supplies photos, logo, materials and access.
- **Mobile** designed and tested separately; **speed** optimised.
- **Privacy / cookies** + consent setup. Legal review per market is separate.
- **Testing** on a temporary address + final comment list + QA checklist (pages, mobile, browsers, forms, WhatsApp, email, links, photos, analytics, SEO, speed).
- **After launch:** 1 month of free fixes. Domain, hosting and services registered to the company.
- **Payment:** 30% start / 30% design approved / 30% working version / 10% launch.
- **Marketing** (SEO promotion, GEO, Google / Meta ads) deliberately postponed until after launch and real data.

**Not promised (it was only in the unsent proposal file):** competitor research report, keyword spreadsheet as a deliverable, full CRM (client history, trips, follow-ups, import of past clients, message templates, dashboard, training), CMS where the owner creates whole pages, preview workflow, 2-round revision limits, paid change rate, 60-day support.

**Stack note (◇):** with a small CMS, Sanity is probably more than needed. Candidates: Astro + content files in the repo for pages, plus a light editor for photos, galleries and reviews. Decide before design ends.

### Scope risks (devil's advocate, 1 Oct 2026)
1. **Expectation gap on CRM.** The interview describes the CRM as a "central operational asset" (client history, photos, follow-ups, a page per client). The offer promises a simple lead tracker. Say clearly at the structure presentation what the leads system is and is not.
2. **Page count is open, price is fixed.** Structure approval is where scope gets fixed, so keep the sitemap lean. With a small CMS every extra page is our build time now and our maintenance later.
3. **Landing set conflict.** The offer's examples (Triton Bay, Private Yachts) differ from the interview's tiers (North Sulawesi, Banda Sea). Agree on the call; keyword data should argue.
4. **4–6 weeks is tight.** Rough split (◇): structure ~1 wk, design ~1.5–2 wks, build ~2 wks, testing ~0.5–1 wk. The owner's reply speed is the bottleneck (the offer says so).
5. **No paid-change rule in the offer**, only "a new big feature or idea → assess separately". Small changes after approval are effectively free, so the combined comment list is our only protection.

---

## 1. What Stage 1 must deliver

| # | Deliverable | Who sees it | Feeds |
|---|---|---|---|
| D4 | **Structure for approval point #1:** sitemap, navigation, blocks on each key page, B2B and B2C paths to the enquiry — shown as low-fi wireframes with draft copy, no final design | owner | design, build |
| D2 | Positioning & messaging (one-liner, B2B and B2C propositions, proof pillars, tone) — inside the wireframes, not a separate document | owner | copy |
| D6 | Content gap list: facts, photos, reviews the owner must supply, with dates | owner | copy, build |
| D7 | Leads system spec: the fields and stages from the offer + source list and UTM rules + where it lives (◇ simplest tool that the forms can write to) | internal → owner | forms |
| D1 | Research note: competitors, market, what advisors need — **internal**, ~8 h max | internal | D2, D4 |
| D3 | Keyword map — **internal tool** for names, URLs, titles | internal | D4, SEO |

Then: owner's combined comments → fixes → approval → design.

---

## 2. Hypotheses to attack first

These are the places where the materials contradict each other or rest on nothing. Each must be closed before the sitemap is final.

### H1. Which destinations lead the site
- ◆ The interview sets Tier 1 Raja Ampat, Tier 2 North Sulawesi, Tier 3 Banda Sea, and moves Halmahera to "later".
- ◆ The owner's own copy has sections for Raja Ampat, Misool, Triton Bay, Halmahera, Sangihe & Siau, Widi — and **no section for North Sulawesi or Banda Sea**.
- ◆ The proposal promises full landing pages for North Sulawesi and Banda Sea, which have no owner text at all.

◇ Proposed fix — **three hubs with children**, by real geography:
- **Raja Ampat** → Misool (◆ Misool is one of Raja Ampat's four main islands); Triton Bay as a West Papua add-on (◈ Kaimana, West Papua)
- **North Sulawesi** → Bunaken, Lembeh, Sangihe & Siau (◈ both island groups belong to North Sulawesi province)
- **Banda Sea & Spice Islands** → Banda, plus Halmahera and Widi (◈ North Maluku; Ternate and Tidore off Halmahera are the historic clove islands, so "Spice Islands" honestly covers them)

This keeps the three hubs from the interview and gives the owner's expedition places a home without diluting the launch. To check against: what the owner actually operates (A1) and what people actually search (B4).

**Decision 1 Oct 2026: hubs accepted.** Refinements after devil's-advocate pass:
- **Flat URLs** (`/destinations/triton-bay/`), hub membership shown by links and cards, not by nested URLs. Triton Bay is not Raja Ampat; it links from both Raja Ampat and Banda (◆ liveaboard routes combine Raja Ampat, Triton Bay and Banda Sea, e.g. [All Star Liveaboards](https://allstarliveaboards.com/indonesia-diving-itineraries-aurora/)).
- Halmahera and Widi are far from Banda (◈ hundreds of km of sea). Under "Spice Islands" they are fine as a region, but may become their own expedition cluster later.
- ◆ "Spice Islands" is the standard umbrella used by expedition-cruise sellers for Banda + Ternate/Tidore routes ([Apex](https://www.apex-expeditions.com/expeditions/spice-islands-raja-ampat-cruise/), [CNN](https://www.cnn.com/travel/east-indonesia-spice-islands-raja-ampat-luxury-expeditions)).

### H2. "Off the map" vs "made easy"
- ◆ The owner copy sells remoteness and hardship ("expedition territory", "few facilities", "getting here is part of the journey").
- ◆ The interview sells removing fear ("maximum experience with minimum organisational headache").
- ◇ Not a conflict if the order is fixed: **desire** = off the map, **promise** = made easy, **proof** = we have done it many times. The interview's homepage story already follows this order. Fix the tagline hierarchy in D2. The risk is copy that makes the trip sound like hardship travel.

### H3. Price level vs product ← biggest unknown
- ◆ Historical spend: $2,000–2,500 per person; growth by volume, not by ticket size.
- ◆ The owner copy and the proposal lead with private yachts and phinisi.
- ◈ A private phinisi charter in Raja Ampat usually costs far more per person than $2.5k for a week (to verify with real rates).
- ~~So either most real trips are lodges + speedboats or liveaboard cabins, or the figure is old.~~

**Decision 1 Oct 2026: wrong framing, corrected.** $2–2.5k was the *average*, not the ceiling. The owner has run luxury trips (private boats, helicopter). So:
- **Trip-style tiers** on destination and journey pages (◇ e.g. lodge + speedboat / premium / private yacht), each with a "from" price.
- **Private Yachts & Luxury section stays**, phinisi included.
- **Flagship luxury guest story** (real trip, helicopter + boats), with a link to the guests' Instagram. Needs written permission; embed selected photos on our page, so the visitor does not leave the site.
- Pricing target: Australians, at market prices, compared with competitors (B1); try to be below international operators.
- Risks to keep in mind: one luxury case is thin proof (add named vessels and suppliers we work with); a luxury look must not scare the mid-tier buyer, and the mid-tier must not cheapen the luxury section.

### H4. B2B first — what the site can and cannot do
- ◆ The strategy says the site is **proof for an outbound engine** (database → outreach → B2B page → call → deal).
- ◇ So the B2B page is mostly not an SEO page. It converts people who arrive from outreach.
- Open questions that are **business decisions, not copy**: net rates or commission? payment terms? white-label documents? committed response time? licence, registration and insurance we can show? who does the outreach?
- Without these answers the B2B page will be generic, and a generic B2B page is the fastest way to lose an advisor.

**Pricing model, recommended 1 Oct 2026 (to confirm with the owner):**
- **One retail price for everyone (rate parity).** The "from" price on the site = the price the agent's client pays. ◆ The South Australian Tourism Commission's guide for operators: commission is a percentage *off* the retail ("rack") price; "Your retail price should remain the same, no matter the manner in which the customer books… Do not add the cost of commission on top of your retail price"; direct bookings may get value-adds, never a lower price ([SATC, "What is commission"](https://tourism.sa.gov.au/media/jsrpgesj/what-is-commission.pdf)).
  - So "agents add their commission on top of our site price" is the wrong model: their client googles us, sees a lower price, and the agent is burned.
- **Agent earns from the same price**, two options (agent's choice, ◈ common DMC practice):
  - commission X% off retail;
  - or net rate = retail − X%; the agent may add more, but we never sell direct below retail.
- **Benchmarks:** ◆ in Australia, retail travel agents usually get 10–12%; chains via wholesalers or inbound operators total 20–30%+ (SATC). ◈ Tour operators commonly pay advisors 12–18%, luxury/adventure up to ~20% ([Fora](https://www.foratravel.com/join/resources/travel-agent-commission)). ◇ Default to propose: 15%, up to 20% for active partners. The user's B2C commission comes from the same pool.
- **Margin check (◇, owner prices at cost × 2):** a $5,000 trip has $2,500 margin. An agent at 15% gets $750, the owner keeps $1,750; at 20% the owner keeps $1,500.
- **Client protection = "your client remains your client" in practice.** If an agent's client contacts the owner directly, the booking stays with the agent (or the commission is paid). The agent registers the client by name with the first request.
- **No silent WhatsApp discounts** for direct clients. One discount breaks parity for every partner.
- **Show only "from" prices on the site,** never exact quotes. Net rates and commission % stay off the site: a rate sheet is sent after registration.

**B2B section — defined in `SITEMAP.md` → T8.**

### H5. Main market
- ◆ Australia is not validated (the strategy itself says so).
- ◆ The only Raja Ampat visitor figure we have is from 2018.
- Need current source markets for Raja Ampat / North Sulawesi / Maluku before copy is tuned to one country (B3).

**Decision 1 Oct 2026: Australia is the target B2C market** (user's call). B3 changes from "whether" to "how": what Australian travellers search and compare, price expectations, flight routes from Bali to Sorong / Manado / Ambon.

### H6. The brand name collides in search — checked 1 Oct 2026
- ◆ Google (US results) for "1000 islands travel": every result is the St. Lawrence River region on the US–Canada border ([visit1000islands.com](https://visit1000islands.com/experiences/first-time-visitors/), [1000islandstourism.com](https://www.1000islandstourism.com/about/travel-media-and-trade/travel-itineraries/), local boat-tour operators).
- ◆ "1000 islands indonesia" and "thousand islands indonesia tour": every result is Kepulauan Seribu, the day-trip archipelago next to Jakarta ([Wikipedia](https://en.wikipedia.org/wiki/Thousand_Islands_(Indonesia)), [TripAdvisor](https://www.tripadvisor.com/Attraction_Review-g294229-d1744267-Reviews-Thousand_Islands-Jakarta_Java.html), [Lonely Planet](https://www.lonelyplanet.com/destinations/indonesia/thousand-islands), GetYourGuide, Traveloka). So **"1000 Islands Indonesia" would be worse**, not better.
- ◆ **1000islandstravel.com is taken:** registered 2024-12-01 (GoDaddy), expires 2026-12-01. It shows a GoDaddy "Launching Soon" page titled "1000 Islands Travel", © 2025, no location. Owner unknown; it may be our client's.
- ◆ thousandislandstravel.com belongs to an operating Myanmar agency, "Thousand Islands Travels & Tours".
- ◈ Not registered on 1 Oct 2026 (authoritative RDAP 404): 1000islands.travel, 1000islands.id, 1000islandsindonesia.com, 1000islandsjourneys.com, 1000islandsexpeditions.com. Confirm at a registrar before relying on it.
- ◇ Impact: low for ads and outreach (people click a link). Real for word of mouth, repeat guests and advisors checking a supplier: they type or google the name.
- **Fix (◇):**
  1. ~~Ask the owner whether 1000islandstravel.com is theirs.~~ **Confirmed by the user 1 Oct 2026: not theirs.** Another "1000 Islands Travel" holds the .com.
  2. **1000islands.travel** as the main domain (exact brand, the TLD says "travel"). Buy soon, on the company's account (the offer says so). Print the full address everywhere; people who type ".com" from memory land on the other company.
  3. Fixed lockup **"1000 Islands Travel · Remote Indonesia"** in the logo, page titles and social bios. "Remote" separates the brand from both the US/Canada region and Jakarta's day trips; it is also the positioning line.
  4. Google Business Profile under the real registered name, without descriptors (◈ Google's name rules forbid them); schema.org Organization with `sameAs` links to every profile.
  5. Never write "1000 Islands Indonesia".
  6. Fallback only if the .com belongs to someone else *and* the owner is open to it: the brand is new, so this is the cheapest moment to change the descriptor (e.g. "1000 Islands Journeys", ◈ .com free).

### H7. Page count vs proof available
- ◇ 4 full landings + up to 5 short destination pages + 3 experience pages + 4 journeys + 3 stories is a lot of pages for a business that may have few publishable photos and reviews. Thin pages hurt both SEO and trust.
- If proof is thin: fewer, stronger pages; short destinations become sections of the hub pages. Decide after the proof inventory (A3).

### H8. Experience set
- ◆ The owner copy has Volcanoes as a section; the proposal's Experiences drop it and keep Private Yachts, Diving & Snorkeling, Wildlife.
- Follows from H3 and B4.

---

## 3. Work tracks

### Track A — Owner input (long lead time, start today)
- **A1** Kick-off questionnaire + data request → `Owner_Kickoff_Questions.md` (drafted, ready to send)
- **A2** Anonymised trip history (year, destination, format, party size, client country, source, price). Answers H1, H3, H5. (Importing it into a CRM is **not** in the offer.)
- **A3** Proof inventory: photos and videos (rights), reviews (Google, TripAdvisor, WhatsApp), guests who agree to be featured, team photos
- **A4** Access: domain, any existing site (→ redirects), Instagram, Google account
- **A5** One 45-minute call after the written answers, only if H1–H4 are still unclear

### Track B — Research (me + Perplexity Deep Research via Chrome)
- **B4a SERP scan + keyword seeds** (me, first): who ranks for 15–20 core queries ("raja ampat private trip", "lembeh diving trip", "banda islands tour", "indonesia dmc", …). The search results are the real competitor list, so this comes before B1.
- **B1 Competitor scan, 8–10 sites** (me, WebFetch): navigation, page tree, how journeys and prices are shown, B2B pages, forms, proof. Categories: Indonesian DMCs (B2B); Raja Ampat resorts and lodges selling direct; phinisi / liveaboard operators and brokers; international tailor-made operators selling Indonesia; North Sulawesi dive resorts. Output: comparison table + 5–7 gaps we can own.
- **B2 What travel advisors need from a DMC** (Perplexity DR): contracting, net vs commission, response times, insurance and licences, FAM trips, white-label documents, what makes them drop a supplier. Output: B2B page checklist.
- **B3 Source markets** (Perplexity DR): current foreign arrivals to Raja Ampat / North Sulawesi / Maluku by nationality, flight access, Australia vs US / UK / EU. Output: 1-page market note that confirms or kills "Australia first".
- **B4b Keyword volumes**: seed list → volumes for AU / US / UK / DE (+ whatever B3 shows). Tool: see §5.
- **B5 Seasonality per region** — later, during copy (the owner knows; DR confirms).

### Track C — Synthesis (me, after A1 answers + B1–B4)
- **C1** Positioning & messaging (D2) — closes H1–H8
- **C2** Sitemap v1 (D4) + URL scheme + navigation + forms → **owner, comment round 1**
- **C3** Page briefs (D5)
- **C4** Content gap list (D6) → owner
- **C5** Leads system spec (D7). The website forms write into it, so fields and the source list are fixed here, not at build time. Pick the simplest tool that forms can write to and the owner will actually open (◇ Google Sheet, Airtable or Notion; check free-plan limits).

### Track D — Copy (Stage 1b)
Only after C2 is approved. The owner's text stays the master material.

---

## 4. Order of work (◇ estimate; depends on the owner's reply speed)

| When | What |
|---|---|
Target: structure approved by the end of week 1, so the 4–6 weeks hold.

| When | What |
|---|---|
| Day 1 (1 Oct) | Call with the owner (questionnaire) · sitemap v0.1 · SERP scan |
| Days 2–3 | Competitor scan (~6 sites, light) · keyword volumes · landing set decided · C5 leads spec |
| Days 3–5 | Wireframes of key templates with draft copy (Home, Raja Ampat landing, Private Yachts landing, Travel Advisors, Plan Your Journey) → FigJam sitemap + Figma wireframes → **approval point #1** |
| Days 6–7 | Owner's combined comments → fixes → structure approved → design starts |

Perplexity DR runs (B2, B3) only if they change the structure; otherwise they move to the copy stage.

---

## 5. Tools

- **Already installed:**
  - `deep-research-export` — launch and pull Perplexity DR reports
  - `hunt-ladder` — awareness levels → which page talks to whom (a "raja ampat liveaboard" searcher vs a tourist already in Bali vs an advisor reached by cold email)
  - `hormozi-offer` — the B2B partner offer (what exactly an advisor gets)
  - `client-dna` — only if a deeper advisor portrait is needed
- **Skill marketplace:** searched 1 Oct 2026, nothing relevant to add.
- **Keyword data — decision needed:**
  - Google Keyword Planner: free, needs a Google Ads account; ◈ without active ad spend it shows volume ranges, not exact numbers. The owner's Google account will be needed for Ads anyway.
  - DataForSEO MCP: ◈ pay-as-you-go, $50 minimum deposit, volume lookups cost fractions of a cent ([contextbolt](https://contextbolt.com/blog/dataforseo-mcp-pricing/), [DataForSEO](https://dataforseo.com/blog/dataforseo-mcp-server-bridging-the-gap-between-ai-models-and-seo-data)). Exact volumes by country plus SERP data, directly in the session.
- **Firecrawl:** only for competitor sites WebFetch cannot read.

---

## 6. Risks

- Owner replies late → everything shifts (the offer already says the timeline depends on approvals and materials).
- Not enough proof (photos, reviews) → fewer pages (H7), never invented numbers.
- Stage 1 eats the time → research time-boxed at ~8 h; depth is cut first. See also "Scope risks" in §0a.
- B2B terms not defined by the owner → the B2B page cannot be finished; raise it in the first questionnaire.

---

## 6a. Figma workflow

**Decision 2 Oct 2026 (user): HTML is the working surface, not Figma.** Wireframes and later the design live as HTML in `wireframes/` (served locally, checked desktop + mobile). Edits are made there. Figma is used only while it is free (Starter plan; write-to-canvas tools are free during Figma's beta, read tools are capped at 6 calls/month): e.g. a FigJam sitemap or a one-off capture for the owner. **No paid Full seat ($16/month).** If Figma stops being free, drop it; the owner reviews via screenshots or a temporary link to the HTML.

Original draft below, kept for reference (◇, 1 Oct 2026):

**Stage 1 (structure):**
This is **approval point #1** of the offer: "structure without final design".
- **FigJam "Sitemap"**: generated from the Mermaid block in `SITEMAP.md` with the Figma MCP tool `generate_diagram`. The owner comments directly on the board.
- **Figma "Wireframes"**: low-fi, grey, 5 key templates (Home, Raja Ampat landing, Private Yachts landing, Travel Advisors, Plan Your Journey), desktop 1440 + mobile 390, with real section headings and draft copy. Built by me as HTML, then pushed into Figma as editable layers through the MCP. The wireframes replace written page briefs, so no extra hours.

**Stage 2 (design):** design in the same Figma project (design system page + full layouts); the owner comments in Figma.

**What we need:**
1. A Figma account (the user's). MCP limits ([Figma docs](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)): ◆ Starter (free) up to 20 MCP calls a month; ◆ Professional, Full or Dev seat, 200 calls a day. ◆ Full seat $16/month ([figma.com/pricing](https://www.figma.com/pricing/)). ◈ Which plans may *write* to the canvas is not stated in the docs; test it.
   - Plan: build the sitemap on Starter; buy one Full seat for the wireframe and design months.
2. Connect Figma to Claude: the "Figma" connector in the app (◆ tools include `generate_diagram`, `get_design_context`, `get_screenshot`, `get_figjam`), or in the CLI `claude plugin install figma@claude-plugins-official` (◆ [Figma help](https://help.figma.com/hc/en-us/articles/39888612464151-Claude-Code-and-Figma-Set-up-the-MCP-server)). Log in with OAuth.
3. One Figma project "1000 Islands Travel": Sitemap (FigJam), Wireframes, Design (later). The owner is invited as a commenter.
4. Inputs before wireframes: keyword data (naming) and the owner's answers (journeys, trip styles, prices).
5. Decide who designs in Stage 2 (the user, the user + Claude, or a hired designer). It changes how strictly the file uses components and Auto Layout.

---

## 7. Internal — our B2C channel (commercial terms, to agree with the owner separately)

**Idea (user, 1 Oct 2026):** the owner focuses on B2B; we run B2C acquisition ourselves (ads to Australia) and are paid for results, not a retainer.

**Recommended form (◇):** act as the owner's **B2C agent**. We get a commission on closed B2C deals, on the same terms the owner gives his advisors (his figure, to ask), and we pay the ad spend. Not pay-per-lead: per-lead billing means a permanent argument about lead quality, while the owner's closing decides the result.
- Optional hybrid: a small fee per *qualified* lead (dates + party size + budget band + reachable) plus a lower commission.

**Rules to agree in writing (even informally):**
1. Every lead goes straight into the owner's CRM, tagged with its source; we get read access. We do not stand between the owner and his clients.
2. Attribution: first touch via UTM tags + hidden form fields + pre-filled WhatsApp messages with a campaign code. Window 6–12 months. Repeat bookings by "our" clients agreed upfront.
3. Commission paid when the client pays the deposit; returned if the trip is refunded.
4. The owner commits to a reply time (e.g. 24 h). Leads left unanswered still count.
5. **One public price** (rack rate) for direct and agent sales. If the website sells cheaper than the owner's own advisors can, the B2B channel breaks. Our commission comes from the same pool as an advisor's.
6. Our ad landing pages live outside the main navigation, so the main site stays neutral and B2B stays first.

**Budget estimator (idea):** not an exact calculator (remote logistics, charters and seasons vary too much). A range estimator by trip style × days that ends in the enquiry form and records the budget band, which also qualifies the lead. Not in the 35m scope list; decide with the owner. Skill: `quiz-funnel` (calculator format).

---

## 8. Owner answers (relayed by the user, 1 Oct 2026)

- **Agents:** none yet. Outreach will be done by us (user + owner side), first contact from our side.
- **One retail price:** fine. Fallback if it ever fails: separate B2B site.
- **Client protection:** the agent's client is always the agent's; commission is paid even on repeat bookings. The agent collects payment from their client. Alternative for agents who prefer it: pay per lead afterwards.
- **White-label:** yes, on request.
- **Response time:** within 24 h, 7 days a week.
- **Company:** registered legal entity with a business activity permit (KBLI); tourism licence status unclear, but the company is allowed to run tours. Years in operation: to confirm.
- **Prices:** we do NOT invent or analyse prices. We ask the owner for each trip's minimum price. B2B proposals are prepared by the owner.
- **User's correction:** trip counts / price ranges / historical stats are not needed for the site. Collect trips + their prices + best reviews.
- **Photos/videos:** everything they have, they may publish.
- **Reviews:** the user will upload them.
- **Logo / brand colours:** none exist. Logo design is separate work (not in the offer); ask the owner.
- **Enquiries now:** WhatsApp, email, Instagram.
- **Domain:** 1000islandstravel.com is not theirs. ◈ Free on 1 Oct 2026 (RDAP): 1000islands.travel, 1000islandstravel.id, 1000islands.co.id, 1000islandstravel.co, 1000islandsjourneys.com, 1000islandstrips.com, go1000islands.com.
- Still to ask: luxury trip details + guest permission, boats/suppliers, landing set (Triton Bay / North Sulawesi / Banda), materials on Sulawesi & Banda, team, logo, competitors, years in operation, domain choice.

## 9. Owner answers from the structure call (relayed 2 Oct 2026, corrected by the user)

- **Diving:** not a separate page; it is the main activity, present everywhere. Not the only focus: the trips work for people who do not swim. No wildlife ideas yet.
- **Two regions only: Raja Ampat and North Sulawesi.** Raja Ampat destinations: Central Raja Ampat, Misool, Triton Bay. North Sulawesi destinations: Bunaken, Lembeh, Sangihe & Siau, Halmahera, Widi.
- **Four landings: Raja Ampat, North Sulawesi, Private Yachts, For Travel Advisors.** Triton Bay is NOT a landing.
- **Lembeh:** the owner said remove, the user says keep. Lembeh and Sangihe stay.
- **Banda / Spice Islands:** not at launch. Halmahera and Widi parked.
- **Luxury camping:** NOT in scope. Idea for the future (the owner wants to launch it later); the user floated it, I wrongly added it.
- **Group tours:** wanted, none yet → placeholder page, ready for later. **Individual tours** are the main product.
- **Admin cabinet:** the user considered a simple cabinet, then dropped it: not agreed in the offer. Only the small CMS.
- **Configurator:** dropped for now. Prices float; the owner wants to confirm personally. Replaced by "from $X by number of days" per direction.
- **Response time:** 24 h, 7 days a week.

### Still open
1. Does the owner agree to keep Lembeh?
2. Halmahera, Widi: the owner's copy has them; leave out of launch?
3. Photos and real trips per direction (decides which sub-directions get a page).
4. Yachts: only Raja Ampat, or elsewhere too? (page vs section)
5. Who approves.
6. Old website?
- **Content (user, 2 Oct):** the owner has run trips for **8 years** and has plenty of material: above- and underwater photos, video, yachts, helicopter trips. Do not treat photos/proof as a risk or ask about them again.
