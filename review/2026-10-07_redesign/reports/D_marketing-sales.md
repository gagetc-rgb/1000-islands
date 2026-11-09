# D — Marketing and sales review of prototype v4 (7 Oct 2026)

Reviewer role: conversion and travel-marketing strategist. Material: `shots-v4/`, live `localhost:5173`, `wireframes/*.html`, strategy, offer, PLAN, walkthrough notes, `research/competitor_structure.md`.
Markers: ◆ confirmed (source, project file or my own measurement) · ◈ likely · ◇ my opinion.
Screen positions below were measured with headless Chrome. "Screen 2.9" means the block starts 2.9 viewport heights down the page (1440x790 desktop, 390x664 phone).

---

## Verdict in 5 lines

1. The selling skeleton is right and should stay: desire → choice with honest "from" prices → proof → one ask, and every path reaches a pre-filled enquiry in 1–3 clicks (◆ measured; ◆ prefill works: "Your trip: Raja Ampat · Comfort · 9 days").
2. The B2C weak spot is the fear the strategy names first, "far and complicated". Home answers it with four bare step names, and the region pages only answer it in the FAQ. The headline price also has no basis (how many travellers, what is included), so a number that looks exact can come back as a different quote (◇).
3. On a phone, the core selling block (3 levels) is a swipe carousel that shows only "Basic". Comfort, the level the business mainly sells, is behind a swipe (◆ screenshot `390x664_raja-ampat_04`).
4. B2B is right-sized on home and in the nav. The advisors page itself is too long: 7.8 desktop and 14.2 phone screens (◆). Credentials start at screen 2.9 / 4.9, after a 6-icon grid the house rules ban. No page shows a legal entity, an address or a licence number outside one badge row (◆ grep).
5. Four P1s, all fixed inside existing pages. No new pages are needed, and the block order of home and the region pages does not need to change.

---

## B2C walk-through: Australian couple or family, upper-middle, came from Instagram

What they need, in order (◇, based on the strategy's desire → anxiety → solution → proof story): (1) is it really that beautiful, (2) is it for people like us and roughly what does it cost, (3) how hard is it to get there and who handles it, (4) can we trust these people, (5) what exactly do we get for the money, (6) who will answer us. Then they enquire.

**Phone, home (7.0 screens) ◆ measured**
- Screen 0: video hero, "Remote Indonesia. Off the map.", "Private trips to Raja Ampat and North Sulawesi", two buttons. Need (1) met; (3) and (4) untouched.
- Screen 0.9: "Where we go", one card visible ("from $X,XXX pp", pager 1/3). Need (2) met early, while Jacada and Steppes show no prices (◆ `competitor_structure.md`).
- Screen 2.2: "Remote, made easy" as four step names. The only answer to need (3) on home, and a generic one: nothing says what is hard or that it is handled.
- Screen 2.7–3.5: guest story video, then reviews with "★ 4.9 on Google · 48 reviews". Need (4) met well.
- Screen 5.0: CTA with the person who answers and "replies within 24 hours, 7 days a week". Need (6) met.

**Phone, Raja Ampat (8.9 screens) ◆ measured**
- Screen 0: hero plus a facts band ending in "From $X,XXX pp" and the tabs. Strong first screen.
- Screens 1.1–3.6: why go (bento), map, area cards.
- Screen 3.6: trips. Only Basic is visible. The price changes with the days slider. "Not included: flights to Sorong" is good, but nothing says what *is* included or how many travellers the price assumes.
- Screen 4.7: trust list (deposit, team 24/7, medical evacuation plan, dive safety). This is the right reassurance in the right place, next to the ask.
- Screen 5.2: reviews. Screen 6.0: FAQ, including "How do I get to Raja Ampat?", which is need (3) at the very end. Screen 6.75: CTA.

**Clicks to an enquiry ◆:** region page → "See trips and prices" → "Plan this trip" → Send = 3. Home → card → trips → plan → send = 4. Nav → Send = 2. WhatsApp = 1 tap. Clicks are not the problem. What the buyer has seen before the ask is: need (3) gets a slogan before the first price, and need (5) is half-answered.

**Too luxury, too boring?** Helicopter and yacht stay on the yacht page and in one story (◆), which is right. The scare risk is the yacht card on home, priced per day for the whole boat next to two per-person prices (◇, H-2). Home is short (4.5 desktop screens) and image-led, so not boring.

---

## B2B walk-through: boutique advisor who received a cold email

What they check, roughly in this order (◈ from DMC-vetting guidance such as [dmcquote.com](https://dmcquote.com/blog/post/how-to-choose-right-dmc-partner-travel-agency), an industry blog, not primary research; ◆ consistent with the strategy §11):
(a) a real, registered company on the ground (licence, registration, insurance, address); (b) terms: commission or net, client protection, payment terms; (c) that they really run this product (photos, depth, prices); (d) other agents vouch for them; (e) a named person who answers fast; (f) an easy, no-login start.

Credibility judgements are fast and design-led (◆ [Stanford Web Credibility Guidelines](https://credibility.stanford.edu/guidelines/): "Show that there's a real organization behind your site… The easiest way to do this is by listing a physical address"; ◆ [NN/g, Trustworthiness in Web Design](https://www.nngroup.com/articles/trustworthy-design/): design quality, up-front disclosure, comprehensive content, connection to the rest of the web).

**Desktop, advisors page (7.8 screens) ◆ measured**
- Screen 0: "Travel agents", "Get trade rates", "Send a client request", a named contact, and facts (X years · regions · private 3+ days · X yachts). A good 5-second screen: (e) and (f) covered, (a) partly.
- Screen 1.1: 6 equal tiles of terms (commission or net, one public price, client stays yours, white-label, 24 h, payment terms). (b) is covered openly. ◆ Nobody in our competitor sample states commission, white-label and client protection (`competitor_structure.md` point 5). This is our edge.
- Screen 2.0: "Indonesia is easy. Until it isn't." plus 6 icon tiles "Service 1–6". Filler before the proof, and the icon grid the house rules ban.
- Screen 2.9: "Track record" (licence, registration, insurance, membership badges, 2 agent quotes, yacht case study). Covers (a) and (d), but third; on a phone at screen 4.9 of 14.2.
- Screen 3.9: what you can sell. 4.8: booking steps. 5.3: FAQ. 6.2: form (phone: 11.4).

**If the advisor lands on home instead** (the name collides in search, ◆ PLAN H6): "Travel agents" is always in the nav, top right, and a band sits at screen 3.2. ◇ This is right-sized. Most home traffic will be B2C, while outreach links go straight to the advisors page, so a louder B2B block on home would cost the B2C story more than it gains.

**The real B2B conversion is often a reply to the outreach email, not the form** (◇). So the face and name in the advisors hero should be the person who signed the email, and the outreach link should go to the advisors page with a UTM tag (offer item 8 tracks sources ◆).

**Case study link goes nowhere deep** ◆: "Case study: ten days by yacht… Read the story →" lands on a card with three grey lines (`stories.html#story-2`). An advisor who clicks "case study" expects a route, days and the logistics handled.

---

## Page-by-page issues and fixes

### P1: fix before the owner sees it

| # | Page · block | Problem → why it matters | Fix |
|---|---|---|---|
| P1-1 | Advisors, whole page | 7.8 / 14.2 screens. Proof comes third, after a banned 6-icon grid, and the form is at screen 11.4 on a phone ◆. An advisor checks fast; the proof must be on screen 2. | New order: hero (add a licence/registration number to the facts) → **Track record** → How we work (the 6 terms as a compact two-column list, no tiles) → What you can sell → booking steps (merge into "How we work" as one line, or keep as is) → FAQ → form. **Delete "What we handle" (6 icon tiles)**; if the "Until it isn't" line stays, it becomes the lead of Track record. Target: ≤5 desktop screens, ≤9 phone screens. |
| P1-2 | Footer (all pages) + About | No legal entity name, Indonesian registered address, licence number or "since" year anywhere except one badge row on advisors ◆. About has story + team + FAQ and no numbers ◆. Stanford guideline above; this is the strategy's "main commercial job of the website" (§11 ◆). | Footer: one line, "PT … · address · licence no. … · since 20XX". About: a facts row under the H1 (years · private trips run · guests · ★ Google rating with link). These are placeholders now; the owner supplies the real facts (gap list D6). |
| P1-3 | Region + yacht trip cards: price | "from $3,500 pp" has no basis: how many travelling together, which season, what is included. For private boats the per-person price depends on group size (◈). A family of 4 later gets a different number, and the trust breaks at the moment of the ask. Extra costs revealed late are the top abandonment reason in e-commerce: ◆ [Baymard](https://baymard.com/lists/cart-abandonment-rate), 40% "extra costs too high" (a checkout context, used here as an analogy). For Australian advisors: ◆ [AFTA ATAS Advertising Guidelines (2020)](https://atia.travel/Portals/0/atas-advertising-guidelines.pdf) say mandatory payments to third parties "must be included in the headline price". | One shared line under the cards: "Per person, 2 travelling together · includes [Sorong airport pick-up, boat transfers, guide, meals, park fee] · not included: flights to Sorong". It replaces the per-card "Not included" line. ◈ Raja Ampat has a visitor marine-park fee: confirm with the owner whether it is included. |
| P1-4 | Region pages, phone: 3 levels | A horizontal carousel shows Basic only; Comfort and Premium are behind a swipe ◆. The tier comparison is the core selling block, and the phone is the Instagram buyer's device (◈). ◆ [NN/g, mobile carousels](https://www.nngroup.com/articles/mobile-carousels/): important items must not depend on the carousel. | On the phone, stack the three levels as compact rows (small photo, name, one line, price, button) so all three prices fit on about one screen. Keep the desktop 3-up. Order stays Basic → Comfort → Premium so Comfort is the middle option (◆ compromise effect, [Simonson 1989, J. Consumer Research 16(2)](https://www.gsb.stanford.edu/faculty-research/publications/choice-based-reasons-case-attraction-compromise-effects)). Mark it "most guests choose this" only if the owner's data says so. |

### P2: should fix now

**Home**
- **H-1 · Hero carries desire only.** The positioning is desire → *made easy* → proof (◆ PLAN H2). The hero subline slot should carry the "made easy" half (e.g. private trips to Raja Ampat and North Sulawesi, every flight, boat and guide arranged; copy later). Add a thin **facts/proof band** at the hero's bottom edge, like the region pages: regions · private, 3+ days · from $X pp · ★ 4.9 Google · reply in 24 h. This also settles the R1 doubt from a sales angle: ◆ [NN/g, Illusion of Completeness](https://www.nngroup.com/articles/illusion-of-completeness/) wants a visible cue that the page continues. A proof band gives that cue and adds proof to screen one, without a half-cut "Where we go" heading (◇).
- **H-2 · "Where we go" puts a format next to places.** Yacht charters is a third "destination" with a per-day, whole-boat price next to two per-person prices ◆. This is a category error and the main luxury-scare risk on home (◇; the strategy says to show luxury "once, quietly"). Fix: two large region cards (bigger creatives), then one quiet line under them, "Prefer your own boat? Yacht charters from $X per day →", the same pattern the region pages already use ◆. Yachts keep their nav item and landing (the offer promises them ◆).
- **H-3 · "Remote, made easy" is the weakest block but carries the brand promise.** Make it concrete: name the hard parts we handle (domestic connections to Sorong/Manado, airport pick-up, boat transfers, guides and dive safety, medical evacuation plan, a team on the ground 24/7) as a short list beside one photo, with the 4 steps as one line underneath. No icon grid. ◇ The owner earlier rejected a "Getting there from Australia" block (◆ walkthrough #1); this is one sentence, not a block.
- **H-4 · Agents band heading is a label** ("For travel agents" + one grey line + "Trade rates"). Use the strategy's line as the heading, "Your client stays your client. We handle Indonesia on the ground." (◆ strategy §2), and keep it a one-line band.

**Region pages**
- **R-1 · Proof sits after the ask.** Reviews start at screen 3.7 desktop / 5.2 phone, after the prices ◆. ◆ [NN/g, social proof](https://www.nngroup.com/articles/social-proof-ux/) places proof near decision points. Fix: one line in the trips block next to the trust list, "★ 4.9 on Google · 48 reviews ↗", and keep the reviews block where it is.
- **R-2 · Days slider → day chips (5 · 7 · 10 · 14).** Keep the owner's idea (length changes price ◆ call note) but change the control. ◆ [NN/g, sliders](https://www.nngroup.com/articles/gui-slider-controls/): picking a precise value with a slider is hard, especially on touch. ◆ A phinisi competitor sells "packages by length: 5 / 7 / 9 / 11 days" (`competitor_structure.md`). Chips also give the owner fewer price points to defend. "Other length? Tell us in the form" covers the rest.
- **R-3 · "Basic" is the wrong word for this buyer.** It names what is missing, and it is the first and default-visible card on a phone (◇). Go back to "Classic" (decided 5 Oct ◆ walkthrough notes) or pick another neutral word.

**Yachts**
- **Y-1 · Mixed price units.** Facts and home say "per day", cards say a total "whole boat" for N days ◆. Show both on the card ("$31,500 whole boat · 7 days · $4,500 per day") and use one unit in the facts and on home.

**Guest stories**
- **S-1 · "Plan a trip like this" sends an empty form** ◆ (no region/level/days, though the story knows them: Comfort · 9 days · Raja Ampat). Pass the same parameters as the trip cards.
- **S-2 · Story 2 is a link target from yachts and from the advisors "Case study", but it is a thin card** ◆. Give it the story-1 template (route, 3 stops, quote) or rename the links "Guest story". Both stay inside the existing page.
- **S-3 · No review volume on the page called "Guest stories".** Add the Google rating line and a simple list of the CMS reviews (reviews are already owner-editable, offer item 6 ◆). A filter by region (walkthrough idea #6) is P3.

**Plan your trip (form)**
- **F-1 · On a phone the reassurance comes after the button.** Send is at screen 1.73; "What happens next" and the person are at 2.06–2.33 ◆. Put a compact strip above the form: face + "Name replies within 24 hours, 7 days a week · free, no obligation". Keep the full block below.
- **F-2 · No level for visitors who come from the nav or home** (only card clicks pre-fill it ◆). Add optional chips "Classic · Comfort · Premium · Not sure". This gives a budget signal without a budget field, and the owner can quote right the first time. It goes into the lead's comments; it is not a new lead field.
- Fields otherwise good: 4 required (name, email, travellers, dates) plus chips ◆, in line with ◆ [NN/g form guidance](https://www.nngroup.com/articles/web-form-design/) (short, optional fields marked).

**Advisors (beyond P1-1)**
- **B-1 · "Download trade kit (PDF)"** is content to produce; it is not in the offer (◇ "not in offer"). If no PDF exists at launch, remove the button: a dead promise costs more trust with an advisor than a missing one.

**Site-wide: WhatsApp**
- **W-1 · WhatsApp leads bypass the leads list.** The offer promises leads "should not just land in email and get lost" (◆ item 7). The admin Enquiries tab has no way to add a WhatsApp chat ◆. Fix: every WhatsApp button uses a `wa.me` link with prefilled text carrying the page and trip ("Hi, I'm looking at Raja Ampat · Comfort · 7 days", ◈ standard click-to-chat behaviour, e.g. [Bird docs](https://bird.com/explained/whatsapp/what-is-a-whatsapp-click-to-chat-link)), plus "+ Add enquiry" in the admin.
- Channel weight is right as is: the form is primary and WhatsApp secondary everywhere, and WhatsApp is the primary next step on the thank-you page ◆. ◈ WhatsApp reaches roughly half of Australian internet users and trails Messenger (secondary sources quoting Meltwater/DataReportal 2025; I could not open the primary figure). That supports secondary weight for Australian B2C and email first for advisors.

### P3: later

- CTA wording is mostly consistent ◆. Unify the remaining variants ("Trade rates" / "Get trade rates"; "WhatsApp" / "WhatsApp us" / "Message us on WhatsApp"; "Plan this trip" / "Plan a trip like this" / "Plan a similar trip →") to four: **Plan your trip**, **Plan this trip**, **Get trade rates**, **WhatsApp us**.
- The phone bar repeats the CTA block's two buttons while that block is on screen ◆ (`390x664_home_05`). Add `.cta` to the bar's quiet list in `wf.js`.
- Forms: "Phone or WhatsApp (optional)"; travellers as adults + children; advisors form gets an optional "Agency website". Desktop WhatsApp: show the number too (◇).
- Home reviews: two region reviews plus one other, rather than a yacht review (◇). Footer: add any TripAdvisor or other review profile (NN/g "connection to the rest of the web").
- "3+ days" for Raja Ampat may read as naive to an advisor (◇). This is already owner question #3.

---

## Price presentation: is "from $X" + days + 3 levels right for this buyer?

Yes, all three. "From" prices let a comparing buyer self-qualify, and the tailor-made competitors hide theirs (◆ `competitor_structure.md` point 6). Three levels put Comfort in the middle, where the compromise effect works for it (◆ Simonson); Premium mainly anchors (◇). A total per person suits trips (◆ ATAS headline price). What is missing: the basis and inclusions (P1-3) and phone visibility (P1-4). The slider is a control problem, not a concept problem (R-2).

---

## Scope check

Every fix above lives on an existing page. ◆ No new pages are proposed. Not in offer: the trade-kit PDF (B-1). The admin "+ Add enquiry" (W-1) is part of the promised leads system (item 7). Group tours, luxury camping and Komodo appear nowhere in the prototype (◆ grep) and nowhere in this report's fixes.

---

## What to keep as it is

- **Block order on home and the region pages.** It already follows the strategy's story; change the content of blocks, not the order.
- **The region first screen:** hero + facts band with "From $X pp" + sticky tabs with "Trips and prices", one tap from price on every screen.
- **Pre-filled enquiry from the trip card** ("Your trip: … change") and the short form with 4 required fields.
- **The trust list next to the price** (deposit, team 24/7, medical evacuation, dive safety) and "Not included: flights to …".
- **The advisors page content itself:** open terms (commission or net, one public price, client protection, white-label), a named contact in the hero, no login. Reorder it, don't rewrite it.
- **Luxury shown once:** helicopter only on the yacht page and in one story; the home story is a Comfort trip.

## Sources

- Baymard Institute, cart abandonment reasons: https://baymard.com/lists/cart-abandonment-rate
- AFTA, ATAS Advertising Guidelines, effective 3 Feb 2020: https://atia.travel/Portals/0/atas-advertising-guidelines.pdf
- Stanford Web Credibility Guidelines (Fogg): https://credibility.stanford.edu/guidelines/
- NN/g, Trustworthiness in Web Design: https://www.nngroup.com/articles/trustworthy-design/
- NN/g, Social Proof in UX: https://www.nngroup.com/articles/social-proof-ux/
- NN/g, Carousels on Mobile Devices: https://www.nngroup.com/articles/mobile-carousels/
- NN/g, Slider controls: https://www.nngroup.com/articles/gui-slider-controls/
- NN/g, Illusion of Completeness: https://www.nngroup.com/articles/illusion-of-completeness/
- NN/g, Web form design: https://www.nngroup.com/articles/web-form-design/
- Simonson (1989), Choice Based on Reasons, J. Consumer Research 16(2): https://www.gsb.stanford.edu/faculty-research/publications/choice-based-reasons-case-attraction-compromise-effects
- DMC vetting (industry blog, ◈): https://dmcquote.com/blog/post/how-to-choose-right-dmc-partner-travel-agency
- WhatsApp click-to-chat format (vendor docs, ◈): https://bird.com/explained/whatsapp/what-is-a-whatsapp-click-to-chat-link
- Project: `1000-islands-travel-strategy.md`, `Offer_Sent_to_Owner.md`, `PLAN.md`, `review/2026-10-05_internal-walkthrough-notes.md`, `research/competitor_structure.md`
