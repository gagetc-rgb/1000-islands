# Internal walkthrough notes · 5 October 2026

Our own review of the Penpot prototype (desktop done, mobile pending). **Record only, nothing is changed yet.** Each point gets discussed first.
Markers: ◆ confirmed · ◈ likely · ◇ disputed / our proposal.

## Ground rule from this review

- Budget is the offer: 35,000,000 IDR fixed (`Offer_Sent_to_Owner.md`). Do the minimum that the offer promises; anything extra is a paid add-on.
- Check every page and block against the offer before keeping it.
- Exception by our own choice (professionalism, not promised): service screens such as 404, maintenance, link previews. Keep them, but do not present them as part of the promised scope.

## Comments, page by page

| # | Where | Comment | Status |
|---|---|---|---|
| 1 | Region landings, block 08 Practical, "Getting there" (Australia → Bali/Jakarta → Sorong → boat) | Not agreed. Questions why the site explains how to get there from Australia. | discuss |
| 2 | Region landings, block 06 Ways to travel | Purpose unclear, idea feels disputable. Wants an explanation before deciding. Not removed. | discuss |
| 3 | Region landings, block 08 Practical | Feels "not practical". Best months already shown in 02 Key facts and shown again here. Extra info (payment, medical, dive safety) could go into one separate text file for people who want to read, or be sent on request. No separate page per region. | discuss |
| 4 | Private Yachts | No questions. | ok |
| 5 | Journeys list + 4 journey pages (06–09) | Unclear what they are and how a visitor gets there. Remembers the plan as "landing, with its journeys below on the same landing". Long 4–5-screen pages per journey look like more than was promised. Compare with the offer; detailed pages may be "on request" / paid. | discuss |
| 6 | Stories | Fine. Idea: filter reviews by destination (category). | idea, check scope |
| 7 | About | Good. | ok |
| 8 | For Travel Advisors | OK; confirmed advisors have their own contact form. | ok |
| 9 | Plan Your Journey | OK. | ok |
| 10 | Home, hero "Remote Indonesia. Off the map." | Was momentarily unclear where the click led (this is the home page hero). Then fine. | ok |
| 11 | Overall | Structure feels more complex than the original simple scheme. Wants to simplify further. | discuss |

## Direction from the follow-up (same day)

Our idea, to be shown to the owner; the owner's ideas come after.
- **Minimalism:** fewer links, fewer clicks, less reading. Most useful info, strong photos, show experience, push to enquire.
- **No separate journey pages, no Journeys menu item.** A region landing has its trips further down the same page. A "Journeys" link on the landing scrolls down to that section; otherwise the visitor scrolls there.
- **Trips grouped by level, not by route:** e.g. simple / comfort / luxury (nicer names later), each "from $X per person" for a given length.
- **Length selector:** change the number of days, the price changes. Idea to remember: longer trips cost less per day (flights, guides and other fixed costs spread over more days). Exact rule to be agreed with the owner.
- Private Yachts keeps its own landing (yachts are the separate premium format).
- Prepare the minimum now, so the owner's extra wishes become paid additions instead of rework.

## Admin scope (user's position, same day)

- The owner can add / remove **reviews** (certain), and update **photos / video**. Everything else (new destinations, page text, structure) is done by us; argue that it must stay consistent with the code (the offer already makes this case, item 6). Expand the admin only if the owner asks, as an add-on.
- Open question raised by me: **prices** (tier × length table) and the **leads list** (promised, item 7). User agreed to prices.
- Proposal built: `wireframes/admin-simple.html` — one screen, 4 tabs (Enquiries · Reviews · Photos & video · Prices), everything edited in place, chips instead of typing, works on a phone. Not linked from the prototype index yet; the old 4 admin screens stay until approved.

## Best-practice check → changes to the final structure (proposed)

- Mobile: header hides on scroll down, bottom bar stays (NN/g sticky headers: keep chrome minimal).
- Reviews block: add an external rating (Google / TripAdvisor) with a link, if the owner has one (NN/g: external reviews are trusted more than on-site ones).
- Trip tier cards: one "from" price per tier, no itemised breakdown; one line naming the lodge / boat; say what is excluded (e.g. flights to Sorong) to avoid hidden-fee suspicion (Baymard; Frontiers in Psychology 2022).
- Keep: map on landings (Baymard: location), FAQ accordion for practical info (NN/g accordions), "See trips ↓" jump link (NN/g in-page links), short form pre-filled from the trip card.

## Built 5 Oct (wireframes v4, HTML only; Penpot not touched yet)

- Menu 7 items, no Journeys. Journeys list + 4 journey pages and the 4 old admin screens moved to `archive/wireframes-v3-removed-2026-10-05/` (not deleted).
- Home: hero → where we go (+ from prices) → how it works → story + 3 reviews + external rating → advisors → CTA.
- Region landings: hero ("See trips and prices") → key facts → why go + areas map → guest quote → trips (days slider 5–21, 3 levels, non-linear price = sum of daily rates, "Plan this" pre-fills the form) + trust line → reviews + FAQ (former Practical) → CTA.
- Thank-you: WhatsApp + guest stories as the next step. Phone: header hides on scroll down (`wf.js`).
- Admin: `admin-simple.html`, prices tab = daily rate + per-day changes ("and every day after"), bar chart, visitor preview.
- Checks: detector exit 0, overlap check 0, no broken links.
- Open: yacht package prices are not in the admin yet; Penpot re-sync (update `tools/penpot-sync/extract.cjs` page lists) after the user's click-through.

## Pass 2 (same day): no blockers, less text

- Minimum trip length 3 days everywhere (slider 3–21, admin "from 3"); day ranges removed from home and advisor cards. Yachts: package table 7/10/14 replaced by the same days slider (whole-boat price), "3+ days", "from $X per night".
- Landing facts: "Where" instead of "Gateway" (gateway lives in the FAQ answer). Home "Where we go" gets a map of Indonesia.
- Video: hero video on home, both regions and yachts; muted loops in the home/yacht story and now in the landing guest quote.
- Wireframe notes and owner markers removed from pages; block labels shortened.

## Owner's call note (2 Oct, user's transliterated note, full) vs the site

"labeh idet nahui · add diving · group tours + individual · raja: triton bay, misol, central raja · make new luxary camping · individual tours config · 7 days 24h"

| Owner said | On the site (5 Oct) |
|---|---|
| Lembeh out | removed now (was kept by mistake; SITEMAP corrected) |
| Add diving | had been lost with the journey tags; back as a key fact "Diving" on the region pages + FAQ "Do I need to be a diver?" |
| Group tours + individual | individual trips only; group tours not mentioned until the owner has dates (user, 5 Oct) |
| Raja: Triton Bay, Misool, Central | yes, areas on the Raja Ampat page |
| New luxury camping | not on the site, not mentioned (user, 5 Oct); same for Komodo |
| Individual tours config | the days slider ("from" price by length) |
| 7 days, 24 h | "reply within 24 hours, 7 days a week" everywhere |

Also restored from the owner's original copy: his FAQ questions (private trips, itinerary changes, diver or not, accommodation level, best time).

## Full audit (5 Oct, me + one independent agent) → applied

- Yacht + helicopter story was on 4 pages (home, yachts ×2 blocks, stories ×2 blocks, advisors). Now: one card on Guest stories ("Ten days by yacht, Misool to Wayag"), the advisors case study links to it, the yacht FAQ has "Can you add helicopter transfers?". Home and Stories lead with a typical Comfort trip ("Nine days in Raja Ampat").
- Region pages: guest-quote block removed (two testimonials on one page); its video moved into the "Why go" gallery. Top level is a resort, not a yacht (yachts were sold twice in two price units). Trade link once per page. FAQ: region questions only + "More questions" → About.
- About: "How we travel" is the owner's narrative, not a fourth set of steps; general FAQ lives here. Plan "What happens next" uses the home step names.
- Yachts: boats and prices right after "Why a yacht", one price unit (per day, whole boat), Where "Raja Ampat · N. Sulawesi" (owner to confirm).
- Naming: Classic / Comfort / Premium; "Private trips in …"; menu in sentence case: Private yachts · Guest stories · Travel advisors · Plan your trip; "journey" → "trip"; "Trade rates" everywhere; "Plan this" → "Enquire"; "Send my idea" → "Send enquiry"; "Proof" → "Track record"; "Neighbouring area" → "Add-on". Home hero adds "Private trips to Raja Ampat and North Sulawesi".
- Kept despite the agent: "Indonesia is easy. Until it isn't." and "Remote Indonesia. Off the map." (the owner's own lines).
- Bug fixed: extra `</div>` in north-sulawesi.html (from the Lembeh removal). New check: tag-nesting balance on every page.

## Follow-up (user, 5 Oct)

- Yachts page: helicopter shown as an option ("Helicopter transfers on request") with the guests' yacht + helicopter trip as proof, inside "Boats and prices" (no separate block; the FAQ question removed to avoid a repeat).
- "Enquire" felt pretentious → trip cards say "Plan this trip"; forms "Send request".
- Level names: Classic kept for now; user asked about "Basic" (open).
- Yacht FAQ keeps "Can you add helicopter transfers?" (user: fine to show it is a common question).
- Final structure pass: nav/menu/footer identical on all 17 site pages, block numbers in order, every page ends with a CTA, all pages on the cover. Fixed: old names in browser-tab titles and on the cover; emails now carry the picked trip (region · level · days) and the same step names; advisor thank-you got the WhatsApp next step.

## Questions for the owner (moved off the pages)

1. Commission or net rate for advisors; payment terms.
2. Do the yachts also sail in North Sulawesi?
3. Shortest trip and shortest yacht charter you accept (site default: 3 days).
4. Yacht price unit: whole boat per night, per cabin, or both.
5. Deposit % and the days from which the daily rate drops.
6. Is there a Google / TripAdvisor rating to show?

## Prototype vs the offer (for the discussion)

| In the prototype | In the offer? |
|---|---|
| 4 landings: Raja Ampat, North Sulawesi, Private Yachts, For Travel Advisors | ◆ yes: "3–4 landing pages" + "B2B part properly worked out" (item 5). Offer's examples were Raja Ampat, Triton Bay, Private Yachts, one more |
| Home, About, Plan Your Journey form, thank-you | ◈ implied (site structure, forms: items 2, 4, 13) |
| Journeys list + 4 journey pages | ◇ not named as pages. Offer only says we discussed "how to show Journeys" (item 1). It also says new Journeys are added by us, not via CMS (item 6) |
| Stories page | ◈ "reviews" and "galleries" are named (items 4, 6), a separate page is not |
| Privacy & cookies, cookie banner/settings | ◆ yes (item 12) |
| Booking terms page | ◇ not named |
| Leads list + lead card (admin) | ◆ yes (item 7) |
| Content editor, prices & seasons (admin) | ◆ / ◈ yes: photos, gallery, reviews, "part of simple content" (item 6) |
| 3 auto-emails | ◈ testing covers "email" (item 13); leads "should not just land in email" (item 7) |
| 404, maintenance, link previews | ◇ not named: our addition by choice |

Important: the offer does **not** cap the number of pages. It says the exact set of pages is fixed at the structure stage ("Точное количество и набор страниц зафиксируем на этом этапе"). So the structure approval is the moment to lock a minimal set; after that, extras are a change request.
