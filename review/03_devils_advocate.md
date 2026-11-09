# 03 · Devil's advocate: wireframes v1 + reviews 01 and 02

**Date:** 2 Oct 2026 · **Read:** BRIEF, 01, 02, STRUCTURE_v3, PLAN, SITEMAP, Offer, strategy, owner copy (PART 1), competitor scan, 4 wireframes and screenshots, plus my own Playwright run (file://).
Markers: ◆ confirmed · ◈ likely · ◇ opinion / disputed. Decisions: **MUST** before the owner · **SHOULD** this stage · **LATER** (design / build / after owner answers) · **REJECT**.

---

## 1. Verdict

**Not ready yet.** It needs about one working day on 14 MUST items (12 small, 2 medium). The skeleton follows STRUCTURE_v3 almost block for block (◆), and the structure needs no re-planning. What fails is the package the owner will open.
1. **The B2B half is missing.** The #1 audience (◆ strategy §2, §11) gets dead links and no page, although Advisors and Yachts were promised for week 1 (◆ PLAN l.13, l.208).
2. **"Made easy" and the proof are stated, not shown.** There is no "8 years" anywhere (◆ grep), no named person and nothing on "what if it goes wrong", and the reviews are placeholder star cards.
3. **It is not presentable.** The owner cannot open localhost, the burger does nothing on his phone, and the header overflows from 769 to 1,071 px (◆ measured). On top of that: bare "$", a wrong province, ★★★★★ placeholders, and no legend saying what to approve.

## 2. Scores (today)

- **Selling 5/10.** The B2C path is short and honest (prices by days, "what happens next", WhatsApp). But proof sits ~3,000 px down, the helicopter trip is a footnote, and the B2B path ends in "#".
- **Style as a skeleton 5/10.** Modular and clean, so it can carry a premium design. The rhythm is flat and has no full-bleed moment. That is mostly design work; S5 reserves the one moment needed now.
- **Currency 2026 6/10.** Mobile bar + WhatsApp, chips, transparent "from" prices, honest "what to expect" and FAQs that suit AI search are all current. Star cards and no named human are dated (◆ competitor scan).
- **Correctness 6/10.** It follows v3 faithfully. The slips are cheap to fix: "West Papua", bare "$", a 5th journey, "Day 8" vs "8–10 days", "24/7" next to "limited signal", 52 dead links (◆), and the overflow.
- **Originality + attractiveness 4/10.** Only the owner's lines, the honest Triton Bay label and the diving tags are original. The rest is a grey template. M1 and S5 are the cheapest lifts.

---

## 3. Decision list

### MUST before the owner sees it

| # | Change | Page / block | Src | Eff. | Why |
|---|---|---|---|---|---|
| M1 | Rewrite `index.html` as the owner's cover page.<br>(a) **"Approve now:** the page list, the blocks and their order, the paths to an enquiry. **Not now:** colours, fonts, photos, final wording."<br>(b) **Legend:** grey box = photo/video · [brackets] = a fact we need from you · US$X,XXX = your price · yellow = a question for you · block labels = refer to them in your one comment list.<br>(c) **Click path:** Home → Raja Ampat → journey → Plan; Home → advisors.<br>(d) **The 13 pages**, with block lists for Journeys, Stories and About.<br>(e) **Leads:** "Every form lands in one simple list: name, contact, traveller/advisor, destination, dates, travellers, source, status (New → Contacted → Proposal → Negotiation → Won/Lost), comments. Not a full CRM."<br>(f) "Group tours are added later with the journey template, once the first one has dates." | index | DA+UX | S | Protects scope (◆ PLAN scope risks 1 and 5) and stops the owner from reviewing the grey look. |
| M2 | Build `advisors.html` from the Landing kit, in v3 #12 order.<br>**Hero:** "Your local partner in remote Indonesia" + Become a partner · Request a trade quote.<br>**Problem:** "Indonesia is easy. Until it isn't." (owner).<br>**What we handle:** the owner's list.<br>**How we work with you:** "One public price, everywhere. We never sell direct below it." · "Your client remains your client, even if they contact us directly." · "Commission or net rates for registered partners [owner: which?]" · "White-label on request: we stay behind the scenes." · "Reply within 24 hours, 7 days a week."<br>**Then:** where we operate → proof [only what is real] → booking in 5 steps → FAQ → form with the toggle "Register as a partner / Send a client request". | new | UX+DA | M | B2B is priority #1, and this page shares few blocks with a region landing (◆ SITEMAP T8). |
| M3 | Build `yachts.html` from Landing blocks in v3 #4 order. Price block: "Packages by length: 5 / 7 / 9 / 11 days" + "[unit: per boat per night, or per person for N guests?]". "Where we sail" gets "[Raja Ampat only?]". | new | UX+DA | M | A landing the owner named (◆ PLAN §9), and the home of the flagship story. |
| M4 | Wire the click path: Home journey cards → `journey.html`; "Explore / All journeys" → `landing.html#journeys`; yacht CTAs → yachts.html; advisor links → advisors.html. The burger opens a drawer with the 8 items + WhatsApp. Pages without a wireframe → `index.html#pages`. | all | UX | S | 52 "#" links (◆). The owner will tap the burger first. |
| M5 | Move the burger breakpoint to ≤1,099 px. | wf.css | UX | S | ◆ The header overflows from 769 to 1,071 px, which includes iPad landscape. |
| M6 | Home hero, under the H1:<br>Subhead on its own line: **"Made easy by people who have run these routes for eight years."** [owner confirms]<br>Lead: **"Private journeys to Raja Ampat and North Sulawesi. We arrange the domestic flights, boats, permits and guides."**<br>Small line under the buttons: "We reply within 24 hours, 7 days a week." | Home 01 | UX+Copy | S | Promise and proof in the first screen. "Domestic": the owner covers travel from arrival in Indonesia (◆ PART 1 l.242). |
| M7 | Every price becomes "from US$X,XXX pp". Under each table: "Prices in US dollars, per person, two sharing [owner: USD or AUD?]". The yacht column gets "[unit]". | Home 03, Landing 06–07, Journey 02 | Copy+UX | S | ◆ The AU Style Manual says to prefix the currency when it could be unclear. |
| M8 | Remove all ★★★★★. Review card: [quote] · name · country · journey · month/year · [source]. Home H2: "In our guests' words". | Home 06, Landing 10 | UX+Copy | S | They imply ratings that may not exist, which is a consumer-law risk (§5). |
| M9 | "Destination · West Papua" → **"Destination · Eastern Indonesia"**. | Landing 01 | Copy | S | ◆ Raja Ampat has been in Southwest Papua since Dec 2022. This also keeps "Papua" out of the first line (§5). |
| M10 | One label, **"Travel advisor? See trade terms"** → advisors.html. Keep it only in the Landing 12 CTA band, under the Journey form ("Booking for a client? See trade terms") and on Plan. Remove it from the Landing hero, Landing 06 and the Journey facts bar. | Landing, Journey, Plan | Copy+UX | S | Beside consumer prices it implies a cheaper price (◆ PLAN H4). Today it has 4 labels. |
| M11 | Home 07 list: replace "One price for everyone — we never undercut you" with **"One public price, everywhere. We never sell direct below it."** and add **"Your client remains your client, even if they contact us directly."** | Home 07 | DA | S | The copywriter's "never below your quote" fails under the net-rate option, where the advisor may mark up (◆ PLAN H4). |
| M12 | Replace the "Raja Ampat & Triton Bay" card with **"Your own route: start from an idea. We design the route around you."** → plan.html. | Landing 07 | DA | S | v3 has 4 journeys (◆), and this card invents a 5th. |
| M13 | Hide the `.anchor` slugs, give card tags `align-self:flex-start`, and top-align the Home 02 map. | wf.css | UX | S | ◆ On the screenshots these read as bugs. |
| M14 | Add an inline yellow "[confirm]" to unconfirmed facts: Home 04 "24/7"; Landing 05 "We book it", "Ferry or private speedboat", "buffer days"; Landing 09 "permit — we arrange it (included?)"; birds of paradise; Triton Bay "whale sharks (seasonal) [months]". "Simple homestays" → "simple island lodges [confirm]". | Home, Landing | Copy | S | So the owner doesn't approve claims by silence. |

### SHOULD this stage

| # | Change | Page / block | Src | Eff. | Why |
|---|---|---|---|---|---|
| S1 | Merge Landing 06 and 08 into **"Two ways to travel Raja Ampat"**, as two cards, each with its own price rows (7 / 10 / 14 days).<br>**Island lodge + private speedboat:** "Sleep on land, spend your days on the water with your own boat and guide [confirm]."<br>**Private yacht:** "Here a yacht isn't simply the most comfortable option. It's the best way to reach the outer islands." (owner) + "More about private yachts →".<br>Under both: the current price text + button **"Ask for a price for your dates"** → plan.html. Subnav "Prices" → "Ways to travel". | Landing 06+08 | DA+UX | M | The table names two styles it never explains. Gains a CTA at the highest-intent point and one fewer block, and avoids cannibalising the Yachts page. |
| S2 | Landing 05 lead: **"Getting here takes some effort. None of it has to be yours."**<br>Under the steps: **"You book your flight to Indonesia. We handle everything from arrival until you fly home."**<br>Step 4: "Back via Sorong, with a spare day before your international flight in case the sea has other plans [confirm]." | Landing 05 | Copy+DA | S | Shows "made easy" through the owner's "one journey, one organisation" (◆ PART 1 l.240). Drops the Widi hardship line. |
| S3 | Landing 09 lead (owner): **"We do not pretend that every remote destination is luxurious. We choose the best realistic option and tell you what to expect before you book."** Items become condition + what we do (copywriter's four, with [confirm]). | Landing 09 | Copy+UX | S | Restores the owner's honesty lines (◆ PART 1 l.216, l.298). |
| S4 | **FAQ.** New accommodation answer: "It ranges from excellent resorts and luxury yachts to simple island lodges. We tell you what each night looks like before you book."<br>Add, each with [owner]: "What does the 'from' price include?" · "How do I get there from Australia?" · "Is Raja Ampat safe to visit?" (+ Smartraveller link) · "How do I pay, and what if I cancel?" · "What if the weather changes the plan?" | Landing 11 | UX+Copy+DA | S | The real objections to a remote, high-ticket trip. |
| S5 | Home 05 becomes the flagship story: a full-width photo slot "[helicopter + yacht]", a story card "[route · days · month year]" with a pull-quote slot and "Read the story →", then **"Explore private yachts"**. | Home 05 | UX | S | The strongest differentiator becomes the page's one premium moment. |
| S6 | Landing 10: one large story quote (photo, route, name, country) + 2 short ones. Journey: one "[review from this route — only if real]" card above the form. | Landing 10, Journey 08 | UX+Copy | S | Proof where the decision is made, and fewer reviews needed. |
| S7 | One form for Plan and Journey: Name* · **Email*** · **WhatsApp (optional, country code)** · Dates · **How many days?** 7 · 10 · 14 · Flexible · Travellers · **Where are you thinking of going?** Raja Ampat · Triton Bay · North Sulawesi · Not sure yet · **How would you like to travel?** Island lodge · Private yacht · Not sure yet · **What would you like to experience? (optional)** Diving · Snorkelling · Wildlife · Volcanoes · Villages and culture · Slow days, quiet beaches · Message (optional).<br>Button: **"Send my idea"** (Plan) / "Send enquiry" (Journey).<br>Consent: "We use your details only to plan your trip. Privacy policy."<br>Note: "Chips are pre-filled from the page the visitor came from." | Plan, Journey 08 | UX+Copy | S | ◆ Baymard: mark both required and optional fields. ◆ The owner's form has "Number of days". "Add Triton Bay" needs a target. |
| S8 | Plan, step 3: "Then: a private route and a clear price." | Plan | Copy | S | Concrete. "No payment until you're happy" only if Q9 says yes. |
| S9 | Home 04 lead: **"Remote Indonesia rewards local knowledge. We know which boats run, which flights connect and what can realistically be done."** Step 3: "Domestic flights, boats, lodges, permits, guides and transfers." Step 4: "With our team on call throughout the journey [confirm how]." | Home 04 | Copy | S | Drops the overpromising "you just travel" and uses the owner's own "realistically". |
| S10 | Home 07 H2: **"Travel advisors: let us handle Indonesia."** (◆ strategy §7). Body: "Indonesia is easy. Until it isn't. We handle the ground in Raja Ampat and North Sulawesi, and your client remains your client." List: M11 + "White-label on request" + "Reply within 24 hours, 7 days a week". | Home 07 | Copy+DA | S | Puts the strongest line where advisors look. |
| S11 | Landing copy.<br>**Hero lead:** "Limestone islands, lagoons you reach only by boat, and some of the richest reefs on Earth. Explore them privately, by yacht or from an island lodge with your own speedboat."<br>**02:** drop the eyebrow; H2 "What you come here for"; item 1 "The richest reefs we know".<br>**Misool:** add What's special / What you do; "…more demanding than central Raja Ampat, which is exactly why it still feels like the edge of the map."<br>**Central:** "snorkelling and diving, island hopping, viewpoints and village visits".<br>**03:** add a locator-map slot "Sorong · Waigeo · Misool · Triton Bay". | Landing 01–04 | Copy+UX | S | Fixes the double "Why", "north" vs "Central", and Australians not knowing where these places are. |
| S12 | "Snorkelling" (×3). Sentence case in nav, buttons and footer ("Plan your journey", "Private yachts", "For travel advisors"). Footer "Regions" → "Destinations", with Private yachts moved under "Travel". | all | Copy | S | ◆ Both casings are on screen together on mobile. |
| S13 | Journey: mobile bar primary → `#enquire` ("Enquire"). Facts "8 days (10 with extension)". Block 06 becomes "Make it yours" + the owner's line "A journey can be changed according to the number of days you have, the places you want to see and the way you prefer to travel." FAQ: "Is this trip good for non-divers?" | Journey | UX+Copy | S | Keeps the context and fixes the 8 vs 10 days mismatch. |
| S14 | "Who answers you" slot next to the Plan form and in the CTA bands: [photo] [name] "[I answer every enquiry myself — owner confirms]". | Plan, CTA bands | UX | S | A named person is the cheapest "made easy" proof for a one-owner firm. |
| S15 | Home 02 lead (owner): **"For us, Indonesia has never been Bali, beach clubs and familiar tourist routes. From the limestone labyrinths of Misool to the volcanoes of Siau."** | Home 02 | Copy | S | Best hook for Australians (◆ 23.44 % of Bali's 2025 arrivals). |
| S16 | Sync the docs. STRUCTURE_v3 l.43 → "Templates: 4 (HTML); the Landing kit builds all four landings; Advisors adds a terms block and a B2B form". Apply M10 to the "agent rates everywhere" rule and update the PLAN week-1 row. | docs | DA | S | Resolves the 4 vs 5 conflict (§5.4). |

### LATER

| # | Change | Src | Why later |
|---|---|---|---|
| L1 | Image-first mobile hero, hide-on-scroll header, sticky chrome budget | UX | Design/build. The grey card is a wireframe convention. |
| L2 | More rhythm devices (interludes, pull-quotes) | UX | Moodboard stage. S5 reserves the main one. |
| L3 | Context-aware mobile bar, `?where=`/`?journey=` prefill, WhatsApp message with a page code | UX | Build spec (D7). |
| L4 | Day-by-day accordion, list instead of carousel, 44 px chips, grey contrast (◆ 3.45:1) | UX | Design. |
| L5 | Named lodge and boat cards on landings | UX | Depends on Q11. Naming suppliers invites direct price comparison (◇). Journey 05 and S1 already have the slot. |
| L6 | Interactive map; map with gateways from Bali / Jakarta | UX | Scope and design. |
| L7 | Desktop sticky Enquire bar; "comfort" in the facts bar | UX | Nice to have. |
| L8 | SEO wording of H1s and titles, "liveaboard", "itineraries" | Copy | After keyword data (◆ PLAN B4b). |
| L9 | Payment and bank-fee disclosure, privacy wording per market | Copy | Needs Q9. Legal review is separate (◆ Offer §12). |
| L10 | En vs em dashes | Copy | Copy pass in design. |
| L11 | Budget-band field; inline form on Home 08 | DA/UX | Only if the owner wants qualification. |

### REJECT

| # | Proposal | Src | Reason |
|---|---|---|---|
| R1 | "Practicalities" tabs after the reviews | UX | Moves the fear-remover below proof and price, against the H2 order. S2 sharpens it in place. |
| R2 | Advisors link in a utility bar | UX | Contradicts "do not bury B2B" (◆ strategy §13). M5 fixes the overflow. |
| R3 | Proof line "private trips only" | UX | False: "Most of our journeys are private" (◆ PART 1 l.210), and group tours are planned. |
| R4 | "Same time zone as you" | UX | Papua is UTC+9 and Sydney +10/+11 (◆). |
| R5 | "Three-quarters of the world's corals" as a claim | Copy | ◇ From a 2002 survey and also quoted for the whole Coral Triangle. It needs substantiation. |
| R6 | "Why it's worth the flight to Sorong" | Copy | A hardship cue at the desire stage. |
| R7 | "Two regions, known island by island" | Copy | Not stronger. "Hundreds" is a safe understatement. |
| R8 | Remove "The heart of the Coral Triangle" | Copy | The owner's own headline (◆ PART 1 l.72). Keep it once, on the Home card. |
| R9 | "Never below your quote" | Copy | Wrong under the net-rate model. Replaced by M11. |
| R10 | H1 "Raja Ampat private journeys" | Copy | Clunky. The eyebrow and title tag carry the keywords. |
| R11 | "Register as a partner" | Copy | v3/T8 chose "Become a partner". Not worth an owner-facing change. |
| R12 | "24/7" as a P1 unconfirmed claim | Copy | The owner's own B2B claim (◆ PART 1 l.272). Becomes Q8 + [confirm]. |
| R13 | Asking the owner about review profiles and photos | UX | The user handles reviews, and we don't ask about photos again (◆ PLAN §8–9). |

---

## 4. Where the reviewers were wrong or overreached

- **UX filed design and build work as structure.** Hero coverage, sticky chrome, page heights (inflated by 1:1 grey tiles), carousels, contrast and grid monotony belong to the moodboard and the build.
- **UX benchmarked against 17-person international operators.** A one-owner DMC with rate parity has reasons not to name its suppliers or repeat "Start planning ×5" (◇). Kept: one named human and one CTA after the price.
- **UX factual errors:** R3 and R4 are false, the overflow range was understated (◆), and its Q4 contradicts PLAN.
- **Copy blamed us for the owner's words** ("24/7", "the north": ◆ l.272, l.88), and it added risk while cutting clichés (R5, R9). Five of its top ten are P1, but most are find-and-replace. Government sentence case is a choice, not a rule (◇).
- **Neither review sized the content its fixes demand** from an owner who replies slowly.

## 5. What both missed

1. **Delivery.** The owner can't open `localhost:5173`. Send a temporary noindex link (◆ PLAN §6a) and expect him to open it on a phone.
2. **The leads-system expectation gap** was due at this presentation (◆ PLAN scope risk 1). M1(e) covers it.
3. **Inventory drift.** A 5th journey (M12). Halmahera & Widi shown although they are open (◆ PLAN §9). Lembeh kept against the owner's wish. All three go to Q4, not to silent approval.
4. **PLAN (5 templates) vs STRUCTURE_v3 (4).** v3 is right about what gets *designed and built*: 4 templates + a block kit. PLAN is right about what the owner must *see*: all 4 landings + Plan. Build Advisors and Yachts now as pages assembled from the kit (M2, M3); Journeys, Stories and About go on the cover as block lists.
5. **Yachts: page or section is still open** (◆ PLAN §9.4). By our own cheat-sheet logic, a Raja-Ampat-only yacht page competes with the RA landing in search. Build it because the owner named it, keep RA's yacht content short (S1), and let Q2 decide.
6. **Australian consumer law.** ◆ The ACCC says an overseas business selling directly to Australian consumers must follow the ACL. For the copy this means:
   - "from" prices must be real;
   - ◈ mandatory charges such as park permits likely belong in the advertised price;
   - "eight years", "24/7", "least visited" and the reviews must be substantiable;
   - the stars must not survive into the build.
   This is not legal advice (the legal review is separate). The working rule: no claim the owner cannot back.
7. **Safety objection.** "Papua" in a headline can worry Australians. ◈ Smartraveller's "reconsider" level covers Highland and Central Papua, not Raja Ampat. Hence M9 and the S4 FAQ.
8. **Brand collision, the urgent part.** `1000islands.travel` is printed in every footer but is not yet bought (◈). The logo is due in week 2, and any change to the name or descriptor is cheap only before design. Buy the domain on the company account now, and check that the registered name matches (Q12).
9. **"Made easy" is said, not sold.** There is no "you / we" split, no named contact and no "what if it goes wrong". Only Plan's "What happens next" demonstrates it. Fixes: M6, S2, S4, S14.
10. **The price grid is critical-path homework.** It needs roughly 2 regions × 3 lengths × 2 styles, plus yacht packages and 4 journeys: 20+ numbers. Confirm the grid in Q1 and keep the table data-driven, so it can collapse to one "from" price per style.
11. **North Sulawesi has no owner copy** (◆ PLAN H1), so that landing is written from scratch (Q4).
12. **Group tours:** the owner asked for them (◆ PLAN §9), and v3 dropped them silently. M1(f) covers it.

## 6. Questions only the owner can answer (most blocking first)

1. **Prices:** USD or AUD? Which lengths (7/10/14?) and styles (lodge + speedboat, private yacht, a third?) per region, and your minimum price for each? Do they include park permits and taxes?
2. **Yachts:** priced per boat per night, or per person for how many guests? Raja Ampat only, or North Sulawesi too? Whole boat only, or cabins too? Which boats can we name?
3. **Advisors:** commission or net rate (you said the agent collects payment, which suggests net)? Payment terms and currency? What proof can we show: licence status, insurance, memberships?
4. **Journeys:** the 4 real trips (name, days, diving tag). Is Raja Ampat + Triton Bay one of them? Halmahera & Widi at launch? OK to keep Lembeh? Raw notes for North Sulawesi.
5. **Claims and footer:** can we say "running trips in eastern Indonesia for eight years"? Registered company name and address?
6. **Face:** may your name and photo appear as "who answers you"? Who answers WhatsApp?
7. **Flagship trip:** the guests' written permission, an Instagram link, and which photos.
8. **"24/7 support":** how does it work on islands with no signal?
9. **Payment:** deposit, how guests pay, cancellation terms. Is "no payment until you're happy with the plan" true?
10. **Getting there:** the usual route from Australia to Sorong and Manado, and total travel time. Do you book the domestic flights? A spare day for weather?
11. **Stays:** do you use homestays? Which lodges can we name?
12. **Process and brand:** who else approves? Is "1000 Islands Travel" the registered name or a trademark? Who buys 1000islands.travel, and when?

## 7. Fact-check log

| Claim | By | Verdict | Source |
|---|---|---|---|
| Raja Ampat in Southwest Papua since Dec 2022 | Copy | ◆ Act 29/2022, in force 8 Dec 2022 | [Wikipedia: Southwest Papua](https://en.wikipedia.org/wiki/Southwest_Papua), [Raja Ampat Regency](https://en.wikipedia.org/wiki/Raja_Ampat_Regency) |
| Australia = 23.44 % of Bali's 2025 foreign arrivals | Copy | ◆ (direct fetch 403; via search index + Antara) | [BPS Bali](https://bali.bps.go.id/en/news/2026/02/02/347/bali-s-foreign-arrivals-jan-dec-2025-rise--with-australia-remaining-the-largest-contributor-overall-.html), [Antara](https://en.antaranews.com/news/402594/balis-foreign-tourist-arrivals-rise-nearly-10-pct-in-2025-bps-says) |
| AU Style Manual: prefix A$/US$ (or ISO code) when currency is unclear | Copy | ◆ via search excerpt | [Style Manual: Currency](https://www.stylemanual.gov.au/grammar-punctuation-and-conventions/numbers-and-measurements/currency) |
| ACCC on international transaction fees | Copy | ◆ exists (25 Jun 2020); low relevance now → L9 | [ACCC release](https://www.accc.gov.au/media-release/consumers-urged-to-look-out-for-unexpected-international-transaction-fees) |
| ACL applies to overseas sellers to Australians | DA | ◆ | [ACCC: Buying online](https://www.accc.gov.au/consumers/buying-products-and-services/buying-online) |
| Advertised price must include mandatory fees | DA | ◈ (summaries; not legal advice) | [ACCC: pricing](https://www.accc.gov.au/media-release/new-pricing-requirements-clarified) |
| Baymard: mark required and optional fields | UX | ◆ (e-commerce base ◈ transfers) | [Baymard](https://baymard.com/blog/required-optional-form-fields) |
| Menu overflow 769–1,015 px | UX | ◆ corrected to 769–1,071 px (scrollWidth 1,072); fits at 1,100 | my Playwright run |
| Mobile heights 7,036 / 9,977 / 6,602 px; Plan form at 934 px | UX | ◆ approx. (mine: 7,135 / 10,163 / 6,602; 958 px) | same |
| #8a8a8a ≈ 3.5:1 | UX | ◆ 3.45:1; irrelevant now | WCAG 1.4.3 |
| Raja Ampat UTC+9, Sydney +10/+11 | UX | ◆; "same time zone" false | — |
| Raja Ampat ≈ 75 % of coral species | Copy | ◇ 2002 TNC survey; also quoted for the whole Coral Triangle | search, 2 Oct |
| Smartraveller "reconsider": Highland and Central Papua only | DA | ◈ (fetch timed out; search snippets) | [Smartraveller](https://www.smartraveller.gov.au/destinations/asia/indonesia) |
| Kaimana still West Papua; birds-of-paradise on Waigeo; AU sentence case and en dashes; NN/g sticky/carousel | Copy/UX | ◈ not re-checked; no decision depends on them | — |
| Owner's copy has "24/7 local support", "Number of days", "Travel with confidence", "northern Raja Ampat" | UX/Copy | ◆ | PART 1 l.272, 360, 298, 88 |
| 5 key templates promised for week 1 | UX | ◆ | PLAN l.13, l.208 |
| 1000islands.travel unregistered | PLAN | ◈ RDAP, 1 Oct | PLAN H6 |
