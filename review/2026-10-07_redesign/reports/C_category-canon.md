# C · Category canon: tailor-made operators and remote-Indonesia specialists vs v4 (7 Oct 2026)

Markers: ◆ confirmed (seen on the site / source / project file) · ◈ likely · ◇ disputed or my opinion. Severity: **P1** fix before the owner sees it · **P2** should fix now · **P3** later.

## Method and limits

- ◆ 18 home pages opened with headless Chrome (puppeteer-core, own temp profile) at **1440x790** and **390x664**, 4 screens each, plus DOM measurements (hero height, first heading below the hero, header links, tel/WhatsApp links, trade links, fixed bottom bars, price strings). Then 6 region/charter pages and the enquiry page behind each site's main CTA (fields counted). Captured 7 Oct 2026 from an Indonesian IP.
- ◆ **15 sites loaded.** 3 returned a Cloudflare "verify you are human" page and were **not** bypassed: Audley, Remote Lands, Dunia Baru. ◆ abercrombiekent.com.au redirected to the global abercrombiekent.com from this IP, so A&K counts as "global, sells to AU" rather than a clean AU sample. ◆ Scott Dunn showed a "switch to Singapore site" modal over the first screen (layout still readable behind it). Cookie/newsletter overlays were hidden in the screenshots only; nothing was accepted.
- Evidence files: `C-shots/sheets/desktop_first_screens.png`, `C-shots/sheets/phone_first_screens.png` (all 15 first screens side by side), `C-shots/sheets/<WxH>_<site>.png` (4 screens per site), `C-shots/sheets/enq_a.png`, `enq_b.png` (enquiry pages), raw numbers in `C-shots/metrics_*.json` and `enquiry_1440x790.json`.
- Sample: 9 tailor-made operators (Black Tomato, Jacada, Scott Dunn, Steppes, Cazenove+Loyd, Original Travel/Voyageurs du Monde, Wild Frontiers, Abercrombie & Kent, Lightfoot), 2 Australian (Insider Journeys, Dive Adventures), 4 Indonesia/Raja Ampat/phinisi (Misool, Aqua Expeditions, Luxury Raja Ampat, Prana by Atzaró). Small, UK-heavy sample; percentages below are counts in this sample, not market statistics.
- `research/competitor_structure.md` (2 Oct): ◆ its Jacada/Steppes Raja Ampat descriptions still hold (sub-nav tabs, named lodges/boats, no prices at Steppes). ◆ Luxury Raja Ampat still shows "FROM USD 4,500/night" and "24-hour quote response". Nothing in it is contradicted.

## 1. Per-site table A: first screen

| Site | Type | Desktop hero (share of 790px viewport) | Phone hero (664px) | Headline pattern | Nav items + primary CTA |
|---|---|---|---|---|---|
| [Black Tomato](https://www.blacktomato.com/) | UK tailor-made, luxury | ◆ 100%, video, "SCROLL" cue, nothing below visible | ◆ 100%, "SCROLL" cue | Category claim "The luxury travel experts" + "Tailor-made trips, award winning service. Est. 2005." | Destinations · Experiences · About · menu; phone; **Enquire now** (pink). Hero: Explore our trips / Plan my trip |
| [Jacada](https://www.jacadatravel.com/) | UK/US tailor-made, luxury | ◆ >100% (hero 800px under a 102px header), video; search + "Use our trip planner" straddle the fold | ◆ hero ~68%, **"Our destinations" heading visible** | "Exceptional Journeys" + one-line promise | Destinations · Luxury safaris · Trip types · Inspiration · Positive impact · About us; phone; **Start planning** |
| [Scott Dunn](https://www.scottdunn.com/) | UK tailor-made, luxury | ◆ 75%, video; 4-column USP strip visible below | ◆ hero ~45%; award badges + sticky bar visible | "The Art of Travel" + "40 years" badge | Destinations · Holiday types · Family holidays · Scott Dunn Private · About us; utility "Speak to an expert 24/7" + phone; search "Tell us about your travel plans"; **Enquire now** |
| [Steppes](https://www.steppestravel.com/) | UK tailor-made | ◆ ~100% (20px sliver), video, search box, no CTA button | ◆ hero ~29%, **next heading visible** | "See the World Better." | Destinations · Holiday types · When to go · About us · Contact us; utility row + phone; **no header CTA** |
| [Cazenove+Loyd](https://cazloyd.com/) | UK tailor-made, luxury | ◆ >100%, video, 5 award badges in hero | ◆ hero ~68%, **"About us" heading visible**, sticky bar | "Award-winning luxury travel experts" | Destinations · Experiences · Group travel · Inspiration · About us; phone, currency, login; **Enquire now** |
| [Original Travel / Voyageurs du Monde](https://www.originaltravel.co.uk/) | UK tailor-made | ◆ 100%, video, pause + scroll chevron | ◆ 100%, chevron | Rebrand line "New name. Still original." | Destinations · Collections · About us; phone; **Enquire now** |
| [Wild Frontiers](https://www.wildfrontierstravel.com/en_GB) | UK tailor-made + small group | ◆ 100%, video, search bar (type/destination/month) + Trustpilot in hero | ◆ 100% (search form fills it) | "Extraordinary Travel Experiences" | Destinations · Holiday types · Late availability · About us; phone; **Contact us** |
| [Abercrombie & Kent](https://www.abercrombiekent.com/) (from .com.au) | global luxury | ◆ ~96% (80vh carousel + header), thin cream sliver, no heading | ◆ ~83%, no heading | Editorial slide "Where to Travel in 2027…" | Destinations · Our journeys · A&K Sanctuary; "Speak to us" phone; floating **Speak to an expert** |
| [Lightfoot](https://www.lightfoottravel.com/) | Singapore-based tailor-made | ◆ >100%, video | ◆ hero ~41%, **"Choose your destination" + tiles visible**, sticky bar | "Travel with purpose" | Destinations · Holiday ideas · Magazine · Offers · About us · Contact us; email, phone; **Enquire now** |
| [Insider Journeys](https://insiderjourneys.com.au/) | **AU**, Asia tailor-made + small group, sells via agents | ◆ >100%, photo + long text | ◆ text hero 100% | Eyebrow pill + 4-line headline | Our destinations · Small group · River cruises · Tailor-made · Beach escapes; phone + **agents@ e-mail in header**; no CTA button |
| [Dive Adventures](https://diveadventures.com.au/) | **AU** dive-travel agent (sells Raja Ampat) | ◆ 88%, photo, **"Browse by" heading peeks** | ◆ ~100% | Brand name + "Search for your perfect dive holiday" | Destinations · Packages · Liveaboards · Group trips · How to book; 3 phone numbers; **Enquire now** |
| [Misool](https://www.misool.info/) | Raja Ampat resort | ◆ 44% banner with NYT quote; text visible | ◆ ~50% | Press quote, no H1 | Home · The resort · Visit · Experiences · Discover · Contact · About; no CTA in header (Make an enquiry below) |
| [Aqua Expeditions](https://www.aquaexpeditions.com/) | luxury small ships incl. Aqua Blu (Indonesia) | ◆ 100%, video, pause, "Scroll to explore" | ◆ 100% | "Voyage of a lifetime" | Our experience · Destinations · Cruise ships · Private charters · Loyalty · Offers; phone, brochure; **Book now** |
| [Luxury Raja Ampat](https://luxuryrajaampat.com/) | local phinisi operator | ◆ 100%, photo; proof strip above header (Tripadvisor, "800+ voyages since 2015", "24-hour quote response") | ◆ 100%, app-style bottom bar | Keyword H1 "Luxury Raja Ampat Yacht Charter, Liveaboard & Phinisi Cruises" | 9 items (Cruises & charters … Blog); **Contact us**; floating WhatsApp |
| [Prana by Atzaró](https://pranabyatzaro.com/) | luxury phinisi (Indonesia) | ◆ >100%, video | ◆ ~64%, title visible | Boat name | Burger only + **Enquire** |

## 2. Per-site table B: content and conversion

| Site | Destinations on home (image shape) | Trips and prices | Enquiry form (fields, steps) | Direct line | Reviews / trust placement | B2B link | Phone patterns |
|---|---|---|---|---|---|---|---|
| Black Tomato | ◆ "Start your journey" tabs (by traveller / popular / month) → 5 portrait tiles ~2:3, text overlay | ◆ trip carousel "From £8,000 per person", nights | ◆ ~13, one page (where, month+year, length, people, **budget pp**, notes, first/last, email + confirm, phone, how heard) + office-hours panel | ◆ phone in header | ◆ quotes + Trustpilot directly after the intro (screen 2) | none found | burger, Enquire in header, no bottom bar |
| Jacada | ◆ desktop: **one big photo + typographic list** of regions; phone: 2-col tiles ~4:3 | ◆ region page "From $26,217 pp" | ◆ multi-step wizard, step 1 = destination only | ◆ phone | ◆ reviews ~screen 4; Trustpilot + press logos in footer | none found | ◆ sticky bottom bar "Where would you like to travel? Start Planning" (from screen 2) |
| Scott Dunn | ◈ not seen (modal) | ◈ not seen | ◆ main CTA reached a contact page, enquiry form not reached | ◆ phone + "24/7" in utility bar | ◆ "Condé Nast top specialists 14 years" in first screen; badges first phone screen | ◆ "Agent Partners" inside a nav dropdown | ◆ sticky bar phone + Enquire now |
| Steppes | ◆ no destination block; idea cards ~3:4 | ◆ "9 days · from £5,995pp" on cards | ◆ ~12 (type group/bespoke, title, names, **phone req.**, email, people, preferences) | ◆ phone | ◆ Trustpilot 4.8 + Condé Nast + B Corp, screen 2 | none | burger + phone icon |
| Cazenove+Loyd | ◆ grid of small 4:3 tiles with label bar | ◆ "10 days from £8,365pp" carousel | ◆ ~12 (where, year, month, **budget**, names, email, **phone req.**, best time to call, how heard req., notes) + "Call a destination expert" panel with Trustpilot + awards | ◆ phone | ◆ award badges **in hero**; "In the press" mid-page | none | ◆ sticky bar phone + Enquire; live chat |
| Original / VdM | ◆ "collections" portrait tiles ~3:4 | none on home | ◆ 12, all required (destination, date, days, travellers, notes, title, names, email, phone, postcode, country) | ◆ phone | ◆ Feefo side tab on every screen | "Our Partners" footer | full hero, no bar |
| Wild Frontiers | ◆ large landscape mosaic ~3:2 | ◆ "from £3,083" | ◆ ~13 (destination, type, details, video-call option, names, contact preference, email, **phone req.**, country, how heard) | ◆ phone | ◆ Trustpilot **in hero** | none | chat bubble |
| A&K | ◆ tabs + 3 landscape cards ~3:2, text overlay; phone carousel with peek | none on home | ◆ contact page, no form | ◆ phone | none early | ◆ "Trade Hub" in footer | ◆ floating "Speak to an expert" |
| Lightfoot | ◆ 12 tiles ~4:3, overlay label | ◆ "From $4,900 pp · 9 nights" list cards | ◆ ~16 (region, country, date, length, guests, currency, **budget pp**, notes, title, names, email, phone, how heard) + panel with phone, Google reviews, licences | ◆ email + phone | ◆ Google review carousel screen 3 | "Partners" footer | ◆ sticky bar Enquire + phone |
| Insider (AU) | ◆ 3 "ways to travel" cards ~4:3 | none on home | ◆ ~14, first question **"Traveler / Travel Agent / Tour Operator…"**, agency name + member code | ◆ phone | none early | ◆ agents@ in header, "Travel Agent" footer | 4-step "first idea to journey" block |
| Dive Adventures (AU) | ◆ icon grid "Browse by", "Destination of the month" | packages (not on home) | ◆ pop-up only | ◆ 3 phones (Sydney, Melbourne, NZ) | none | none | burger, phone + Book now |
| Misool | none | none | ◆ Pipedrive iframe | none | ◆ press quotes (NYT) | none | plain |
| Aqua | ◆ destination carousel | none on home | ◆ 2 steps, first asks **"Independent traveler / Travel professional / Media"** | ◆ phone | none early | ◆ via the form only | chat bubble, Book in header |
| Luxury Raja Ampat | ◆ 3 service cards ~4:3 | ◆ "From USD 4,500/night" | ◆ 10 (names, email, service, dates, guests, **duration**, location, message) + **"WhatsApp concierge"** panel | ◆ **WhatsApp** (no phone) | ◆ proof strip + stats band in screens 1–3 | none | ◆ bottom app bar incl. WhatsApp |
| Prana | ◆ alternating split blocks: big photo + short text | none | not checked | WhatsApp in footer | none | none | burger + Enquire |

## 3. The canon

### What 70%+ do (table stakes)

1. ◆ **Video hero.** 11/15 home heroes are video (BT, Jacada, Scott Dunn, Steppes, Caz+Loyd, Original, Wild Frontiers, A&K, Lightfoot, Aqua, Prana). Pause control at Original and Aqua.
2. ◆ **Desktop home hero fills the first screen.** 12/15 show nothing of the next section's heading (all except Scott Dunn 75%, Dive Adventures 88%, Misool 44%); among the 9 tailor-made operators 8/9.
3. ◆ **Short brand line + a specific sub-line**, 1–2 buttons. Generic claims dominate ("Exceptional Journeys", "The luxury travel experts"); the sub-line carries what and how long ("Tailor-made trips… Est. 2005").
4. ◆ **Header: 4–6 items starting with "Destinations", "About us" near the end, a filled CTA on the right** (11/15). Wording: "Enquire (now)" 7/15; "Start planning", "Contact us", "Book now" the rest.
5. ◆ **A direct human line in the desktop header**: phone number 12/15 (all except Misool, Luxury Raja Ampat, Prana).
6. ◆ **Sticky header on desktop** (12+/15) and **burger on phone** (15/15).
7. ◆ **"From £/$X per person" with a trip length wherever trip cards appear**: 7/7 sites that show trip cards on home or region pages (BT, Steppes, Caz+Loyd, Wild Frontiers, Lightfoot, Jacada region page; Luxury Raja Ampat per night). Note: prices on the home page itself are only 6/15; the rest keep prices one click deeper.
8. ◆ **Region pages: photo hero → sticky in-page sub-nav → named places to stay → example trips → experts → enquire**. 4/4 checked (Jacada, Steppes, BT, Caz+Loyd) have the sub-nav, 4/4 a breadcrumb, 4/4 a named stays block (hotels/boats), 3/4 a CTA button inside the sub-nav bar (Steppes, BT, Caz+Loyd).
9. ◆ **Proof of age or volume in the first two screens**: 6/9 tailor-made ("Est. 2005", "40 years", "33 years", "25 years" in the logo, "60 years", "since 2003") plus Luxury Raja Ampat ("800+ voyages since 2015").
10. ◆ **A third-party rating** (Trustpilot, Feefo, Google, Tripadvisor) on home or enquiry page: 7/9 tailor-made; 6/9 put some trust mark in screen 1 or 2 (badges in the hero at Caz+Loyd and Wild Frontiers).
11. ◆ **A text "who we are" block straight after the hero**: 8/9 tailor-made.
12. ◆ **Enquiry form beside a human panel** (phone or WhatsApp, office hours, rating): 5/9 forms checked (BT, Caz+Loyd, Wild Frontiers, Lightfoot, Luxury Raja Ampat).

### Common but not table stakes (40–69%)

- ◆ Phone: **sticky bottom CTA bar** 5/9 tailor-made (Jacada, Scott Dunn, Caz+Loyd, Lightfoot, A&K floating button). Two-action bars (phone + Enquire) at Scott Dunn, Caz+Loyd, Lightfoot.
- ◆ Phone: **shorter hero so the next heading shows**, 5/9 tailor-made (Jacada, Scott Dunn, Steppes, Caz+Loyd, Lightfoot); the other 4 stay full-screen.
- ◆ Enquiry forms are **long**: about 10–16 visible fields, phone required in 6/9, "how did you hear" 4/9, budget 3/9, trip length 4/9.
- ◆ Text over the photo on destination tiles (BT, A&K, Lightfoot, Caz+Loyd label bar, Jacada phone, Wild Frontiers).

### What the best do differently (◇ my reading of what I saw)

- **BT, Original, Aqua**: full-screen video, one line, a tiny scroll signifier at the bottom edge ("SCROLL", chevron, "Scroll to explore"). Nothing else competes in the first screen. This is the editorial premium look the owner is asking for.
- **Jacada**: with few destinations to show, it uses **one large photo beside a typographic list of names** on desktop. It is the most minimal destination block in the sample and fits a 3-item offer.
- **Steppes, BT, Caz+Loyd**: the CTA lives in the sticky sub-nav of region pages, so it never needs a separate bar.
- **Aqua, Insider**: one form for everyone, with the **first question "traveller or travel professional?"**. Agents self-identify without hunting for a trade page.
- **Luxury Raja Ampat** (the local canon): WhatsApp as the primary channel everywhere plus hard numbers on top. Right instinct, cluttered execution.

### What is outdated (◇)

- Icon grids and "Destination of the month" (Dive Adventures); a short banner with a press quote and a plain text column (Misool).
- Hero slideshows with "next up" arrows (A&K). NN/g's carousel guidance points the same way ([NN/g, mobile carousels](https://www.nngroup.com/articles/mobile-carousels/): important hero items must be reachable another way).
- Stacked overlays: cookie bar + region modal + rebrand pop-up + chat bubble on one first screen (Scott Dunn, Voyageurs du Monde, Wild Frontiers).
- Form padding: "confirm email", "Title", required "How did you hear about us" (BT, Caz+Loyd, Lightfoot, Original).
- Eyebrow pills and "800+ / 45+ / 30+" stat bands (Insider, Luxury Raja Ampat): reads as a template. Our house rules already ban eyebrows.

## 4. The hero question: full-screen, or let the next heading peek?

**Evidence from the category.** ◆ Desktop: 12/15 sites (8/9 tailor-made, 3/4 Indonesia players, all but Misool) fill the first screen and show nothing of the next section. Only 3 let anything below show, and only Dive Adventures shows a bare heading ("Browse by"), the same pattern as v4, on the most dated site in the sample. ◆ Phone: the category splits. 5/9 tailor-made shorten the hero so the next heading and usually the top of its images show (Jacada, Caz+Loyd, Steppes, Scott Dunn, Lightfoot); BT, Original, Wild Frontiers and A&K stay full-screen.

**Evidence from research.** ◆ NN/g (Kim Flaherty, 2016) names large hero images and videos as the first cause of the "illusion of completeness" and advises: "Avoid full-screen hero content… ensure that additional content peeks above the fold" ([NN/g](https://www.nngroup.com/articles/illusion-of-completeness/)). ◆ NN/g 2018 eyetracking: about 57% of viewing time is above the fold, 74% within the first two screenfuls ([NN/g](https://www.nngroup.com/articles/scrolling-and-attention/)). ◆ NN/g also warns that designs that offer little at the top create "false floors", and says pages should not need an arrow to make people scroll ([NN/g, Fold Manifesto, 2015](https://www.nngroup.com/articles/page-fold-manifesto/)). ◆ The A/B evidence is weak in both directions: GoodUI's "full height false bottom" pattern has 4 tests with low statistical power, rated "uncertain", and notes that Airbnb tested and rejected full-height photos ([GoodUI #58](https://goodui.org/patterns/58/)). ◆ I found no Baymard guideline on hero height for this kind of site.

**Verdict (◇, my recommendation):**

- **Desktop (≥1024px): full-screen.** The hero fills the viewport and nothing of "Where we go" shows. Add one quiet scroll signifier on the bottom edge (a thin "Scroll" line or chevron next to the pause button, as BT, Original and Aqua do), and keep "See destinations" as the in-page jump. Reasons: this is what 8/9 premium operators do. A grey strip with a lone heading reads as a crop, not an invitation (that is the owner's complaint, and I agree). The NN/g risk is real but small here: a full-bleed video with a centred line and a "See destinations" button is clearly a hero rather than the whole page, and the signifier answers the "no cue" cause NN/g describes. Check it after launch with scroll-depth data (P3).
- **Phone: do not go full-screen.** End the hero at about 70–75% of the visible height and let the next block show **its heading and the top edge of its first photo**, not the heading alone (the Jacada and Caz+Loyd pattern). On a phone the owner's video stays dominant, the bottom bar is hidden over the hero anyway, and this is the half of the category that follows NN/g.
- **What changes in `LAYOUT_RULES.md` R1 (Home):** replace "the photo ends where the next heading is fully visible" with "Desktop: hero = full visible height, with a scroll signifier. Phone and short screens: hero ≤75svh; the next block's heading and the top of its first image are visible." The tab-row rule for region pages stays (it matches BT and Caz+Loyd).

## 5. v4 page by page against the canon

**Home**
- ◆ Match: video hero with pause; specific sub-line ("Private trips to Raja Ampat and North Sulawesi"); two hero buttons like BT and Luxury Raja Ampat; "from $X pp" on destination cards; guest story + reviews mid-page; a named person at the closing CTA (Caz+Loyd and BT do the same with experts).
- Deviation on purpose, fine: no search or trip-finder in the hero (5/15 have one; pointless with 2 regions + yachts). No manifesto text block after the hero (8/9 have one; the canon version is usually 3 paragraphs nobody needs). "Remote, made easy" steps: rare on B2C homes (1/15, Insider) but it is the positioning promise. "Travel agents" in the main nav: no one in the sample does this (B2B sits in the footer or a dropdown at A&K and Scott Dunn) but the strategy makes B2B priority #1, and the only agent-led operator, Insider, puts agents@ in its header.
- **Accidental deviation, fix:** (a) the hero peek (section 4). (b) **No age/volume proof anywhere in the first two screens.** This is canon at 6/9 + Luxury Raja Ampat and is the "proof" leg of the positioning. ◆ The brief says the owner has run trips for 8 years. (c) **"Where we go" leads with a grey map as its biggest tile.** None of the 15 homes shows a map in the screens I captured; all lead with photos. The map belongs on region pages (already there) or as a small locator. (d) The destination cards are boxed: border, photo strip, chip pills, divider, price. Every premium site uses unboxed image-led tiles with the name on or under the photo. (e) On the phone, the three core products sit in a 1/3 carousel. Canon for a short list is a grid or a stack (Jacada, Caz+Loyd, Lightfoot), and NN/g says important items must not depend on a carousel.
- Missing, table stakes, in scope: the external rating mark high on the page. Ours is in screen 3. Canon has it in the hero or screen 2, and it depends on owner question 6.

**Region pages (Raja Ampat, North Sulawesi)**
- ◆ Match: photo/video hero → key-facts band → sticky tabs (Why go · Trips and prices · Reviews · FAQ) is the canon structure (4/4). The hero sized so the tabs row is visible matches BT and Caz+Loyd. Trips show "from $X pp" by level, plus the days slider: no one in the sample has a slider; it is a differentiator.
- Deviation on purpose, fine: no breadcrumb (canon 4/4, but they have 3–4 levels of hierarchy and we have 1). The CTA is not inside the tabs row, but the desktop header stays visible with "Plan your trip" and the phone has the bottom bar, so it is equivalent.
- Accidental, fix: canon names the actual lodges and boats with photos (4/4). v4 has one grey text line ("guesthouse name / lodge name / resort name") under a generic "Basic photo". Without a new block, the level card's photo should be **the property itself** with its name as the visible card title or caption.

**Yacht charters**
- ◆ Match: the Luxury Raja Ampat charter page runs "why private → experiences → where you'll explore → packages"; v4 runs "Why a yacht → Boats and prices → Where we sail → FAQ", the same logic with prices earlier. A whole-boat "from" price is canon for charters. ◆ Open owner question 4 (per night vs per day): the category quotes **per night**.

**Guest stories / About**
- ◆ About with team faces matches Caz+Loyd, BT and Jacada (expert faces). Stories as a separate page: the sample has no clear canon (reviews usually live on home). No change from this angle.

**Travel agents**
- ◆ None of the B2C operators expose trade terms on the main nav; the 2 Oct scan found process + terms + credentials at B2B DMCs. Keep. Also add, at no cost, the Aqua/Insider pattern: the general Plan form's first chip row could include "I'm a travel advisor", which routes to the trade form (P3, no new page).

**Plan your trip (form)**
- ◆ v4: 7 fields, 2 optional (Name, Email, WhatsApp opt., Travellers, Dates, Where chips, Message opt.) beside "What happens next", a person and WhatsApp. That is about half the canon length (10–16) **on purpose** and better for it: ◆ Baymard finds most checkouts need 8 fields while the average has 11.3 ([Baymard](https://baymard.com/blog/checkout-flow-average-form-fields)). Checkout is not a lead form, so the transfer is ◈. Do not add budget, title, "how did you hear" or a required phone.
- ◈ Canon asks for trip length (4/9). If "Plan this trip" pre-fills region, level and days (5 Oct notes say it does), the general form only needs an optional "How many days".

**Global header and phone patterns**
- ◆ Match: sticky desktop header; burger; bottom bar "Plan your trip / WhatsApp" hidden over the hero (Jacada also starts its bar after the hero; Scott Dunn, Caz+Loyd and Lightfoot use the same two-action bar). WhatsApp instead of a phone number fits the local canon (Luxury Raja Ampat) and the owner's channel.
- Accidental: **the desktop header has no direct line.** 12/15 put a phone number there; ours shows WhatsApp only inside page CTAs and the footer.

## 6. Recommendations

**P1 (before the owner sees it)**
1. **Home hero height.** Desktop: full-screen with a bottom-edge scroll signifier, nothing of the next section visible. Phone and short screens: ≤75svh, with the next block's heading and the top of its first photo showing. Update R1 in `LAYOUT_RULES.md` and `fit-check.cjs` to match. (Section 4.)
2. **Make "Where we go" photo-led.** Three large image tiles (or Jacada's one-big-photo-plus-three-names split) with the name and "from $X pp" on or under the photo. No card borders, no chip pills. The map shrinks to a small locator or moves to region pages only. Challenge R2 "the map sits beside the three destination cards". This is the block that has to relate to the hero, which is the owner's first complaint.
3. **Put a proof line in the first screen**, e.g. in the hero sub-line: "Private trips to Raja Ampat and North Sulawesi, 8 years on the ground". Add trips or guests counts only if the owner gives real numbers. No invented figures.

**P2 (now)**
4. Phone "Where we go": stack the three tiles (or 1 large + 2 half) instead of the 1/3 carousel.
5. External rating up: one quiet line ("4.9 on Google · 48 reviews") under the hero buttons or the "Where we go" heading, and in the Plan form side panel. Only once owner question 6 confirms a real rating; otherwise leave the slot out.
6. Desktop header: add a text link "WhatsApp" before "Plan your trip" (the category's phone-in-header, in our channel).
7. Region level cards: the card photo is the named lodge/resort/boat and its name is readable. That is the canon "places to stay" without a new block.

**P3 (later / next stage)**
8. Visual-direction stage: try a transparent header over the home hero (BT, Caz+Loyd, Original, Aqua do it; Jacada, Scott Dunn and Wild Frontiers don't). That is a style choice, not canon.
9. Plan form: optional "How many days" if not pre-filled; optional "I'm a travel advisor" chip that routes to the trade form.
10. After launch, check home scroll depth. If fewer than about half of visitors reach "Where we go" (◇ threshold), revisit the desktop full-screen decision in favour of NN/g's peek.

**Seen in the canon, deliberately not proposed (not in offer / not needed):** site search or trip finder, blog/magazine, newsletter sign-up, live chat, brochures, accounts/wishlists, offers pages, press/awards blocks (only if real awards exist), separate "places to stay" or team-per-region pages, breadcrumbs.

## 7. Keep as it is

- ◆ Region page skeleton: hero → key facts → sticky tabs, with the tabs row in the first screen (canon 4/4; matches BT and Caz+Loyd).
- ◆ "From $X pp" by level plus the days slider: canon pricing, and a differentiator no one in the sample has.
- ◆ Short Plan form beside a human, a response promise and WhatsApp: shorter than the category on purpose; do not lengthen it to match.
- ◆ Phone bottom bar with two actions, hidden over the hero, forms and footer (the Scott Dunn, Caz+Loyd and Lightfoot pattern).
- ◆ "Travel agents" visible in the main nav and a trade line on every CTA: off-canon for B2C operators, right for this strategy.
- ◆ Video heroes with a pause control (11/15 use video; pause matches Original and Aqua).
