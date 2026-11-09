# 1000 Islands Travel — Site structure v1 (text, for review)

**Date:** 2 October 2026. **Status:** proposal to show the owner; easier to correct after he sees it than to ask in advance.
This is the structure only: no design, no final copy. Next step: wireframes in Figma.

Legend: ★ = full sales landing page · ○ = lighter page · (stub) = placeholder, opened later

**Two levels of geography:**
- **Region** = a big area with its own gateway: **Raja Ampat** and **North Sulawesi**. Two regions at launch.
- **Destination** = a concrete place inside a region: Misool, Triton Bay, Bunaken, Lembeh…
- **Journey** = a product (route + days) that goes through one or more destinations.

---

## 1. The site in one view

```text
HOME
│
├─ DESTINATIONS (overview: map with the two regions)
│
│   REGION: RAJA AMPAT ★ (landing, the whole area, broad)
│   ├─ Central Raja Ampat ○
│   ├─ Misool ○
│   └─ Triton Bay ★ (own landing)
│
│   REGION: NORTH SULAWESI ○
│   ├─ Bunaken ○
│   ├─ Lembeh ○
│   ├─ Sangihe & Siau ○
│   ├─ Halmahera ○   ◇ placed here: reached via Manado → Ternate; confirm
│   └─ Widi Islands ○ ◇ same
│
├─ JOURNEYS (overview)
│    ├─ Individual journeys (main product): 4 sample journeys at launch
│    └─ Group tours (stub): "coming soon", leave your email
│
├─ PRIVATE YACHTS ★
├─ STORIES (overview) ── 3 guest stories
├─ ABOUT ── About us · How we travel · FAQ
├─ FOR TRAVEL ADVISORS ★ (the B2B page, its own form)
└─ [ PLAN YOUR JOURNEY ] (button in the menu) ── enquiry form ── thank-you

Footer pages: Privacy · 404
```

**About 30 pages: 2 region pages, 8 destination pages, landings Raja Ampat · Triton Bay · Private Yachts + the B2B page.**

**Open naming point (◇):** Triton Bay is not geographically Raja Ampat (it is near Kaimana, further south in Papua). If the owner wants to be precise, the region can be called **"Raja Ampat & West Papua"**; the page and menu stay the same.

---

## 2. Menu

**Header:** logo "1000 Islands Travel · Remote Indonesia" · Destinations ▾ (two columns: Raja Ampat · North Sulawesi, destinations under each) · Journeys ▾ · Private Yachts · Stories · About ▾ · For Travel Advisors · **[Plan Your Journey]**
**Phone:** logo + menu icon; a bar at the bottom with **Plan Your Journey** and **WhatsApp**.
**Footer:** destinations · journeys · yachts · stories · about / how we travel / FAQ · for travel advisors · WhatsApp · email · Instagram · Privacy.
**Why this order:** it follows the visitor's questions: where can I go → what can I buy → how will I travel → why trust you → I am a professional → how do I start.

---

## 3. Page by page

### 3.1 Home
1. **Hero:** "Remote Indonesia. Off the map." + one line "made easy". Buttons: Explore journeys · Plan your journey.
2. **Where we go:** map with the two regions (Raja Ampat, North Sulawesi) and their destinations; Triton Bay highlighted.
3. **Featured journeys:** 4 cards (days, diving tag, "from" price).
4. **Remote, made easy:** the problem in two lines + 4 steps: tell us → we design it → we handle everything → you travel.
5. **Private yachts:** a feature block with the luxury story.
6. **Proof:** guest story + 2–3 reviews with photos (real ones only).
7. **For travel advisors:** short teaser "Your client remains your client".
8. **People on the ground:** who is behind the company.
9. **Start with an idea:** short form or WhatsApp.

### 3.2 Destinations (overview)
Map of eastern Indonesia with the two regions highlighted. Two blocks: **Raja Ampat** and **North Sulawesi**, each with a short line and its destination cards (photo, one line, "Explore").

### 3.3 Region page: Raja Ampat ★ (landing)
The big sales page for the whole area. Built to take ad traffic and Google searches for "Raja Ampat".
Hero → why go (3–4 points) → **map of the region with its destinations** (Central Raja Ampat, Misool, Triton Bay as cards) → how a Raja Ampat trip works (gateway Sorong, boats, typical length) → **"from" prices by number of days** (table) → sample journeys → private yachts block → where you stay and sail → best time to go → what to expect (honest about comfort) → stories and reviews → FAQ → call to action + small link "Travel advisor? Get agent rates".

### 3.4 Region page: North Sulawesi ○
Lighter version of the same: hero → why go → map with destinations (Bunaken, Lembeh, Sangihe & Siau, Halmahera, Widi) → how a trip works (gateway Manado) → "from" prices by days → sample journey → best time → FAQ → call to action. Can be upgraded to a landing later.

### 3.5 Destination page ○ (Central Raja Ampat, Misool, Bunaken, Lembeh, Sangihe & Siau, Halmahera, Widi)
Short page about one place: hero → what makes it special (from the owner's text) → what you do there (diving, islands, villages) → what it feels like (honest: expedition or comfort) → journeys that go there → "from" price → link back to its region → call to action. If a place has few photos, the page stays short; never long and empty.

### 3.6 Destination landing: Triton Bay ★
A destination that gets the full sales treatment: whale sharks, limestone coast, rock paintings, one of the least visited marine areas (owner's text). Hero → why go → what you see and do → **"from" prices by days** → sample journeys → combine with Raja Ampat (link) → best time → getting there (via Kaimana) → what to expect → reviews → FAQ → call to action.

### 3.7 Journeys (overview)
Two tabs: **Individual journeys** · **Group tours**. A simple card grid (no filters at launch). Card: photo, name, destination, days, diving tag, "from" price.
- **Diving tag on every card:** *Dive-focused* / *Dive optional* / *No diving needed*. Diving runs through the whole site; this is how non-divers find their trips.

### 3.8 Individual journey (page type, 4 at launch)
Hero + one line → facts bar (days, destination, style, season, diving tag, "from" price) → highlights → route map → day by day → where you stay or which boat → what can be changed → included / not included → related story → FAQ → call to action with this journey filled into the form.
**The 4 journeys:** to be taken from the owner's real trips.

### 3.9 Group tours (stub)
A short page: what group tours will be, "coming soon", an email field "tell me when dates open". The template (name, destination, photos, description, dates, seats) is already built, so a tour is added later without redesign.

### 3.10 Private Yachts ★ (landing)
Hero → why travel by yacht ("we choose the boat around the journey") → where we sail → **packages by number of days** with "from" price → our boats (if the owner allows names; otherwise levels) → the luxury story → what is included → whole boat or a cabin → FAQ → call to action.
**To confirm:** if yachts exist only in Raja Ampat, this page folds into Raja Ampat.

### 3.11 Stories
Overview + 3 stories. Story: title ("Anna & Mark, 9 days in Raja Ampat"), photos, route, review, what we arranged. The first is the luxury trip.

### 3.12 About · How We Travel · FAQ
- **About:** story, team, people on the ground.
- **How we travel:** from enquiry to the flight home; how we choose boats and stays; honest about comfort; safety; weather.
- **FAQ:** private or group, can the route change, do I need to dive, comfort level, best time.

### 3.13 For Travel Advisors ★
Hero "Your local partner for remote Indonesia" (buttons: Become a partner · Request a trade quote) → "Indonesia is easy. Until it isn't." → what we handle → **how we work with you** (one retail price, the client stays the advisor's, white-label on request, reply within 24 hours, 7 days a week) → where we operate (journeys as the catalogue) → proof (company documents, stories) → how a booking works → FAQ for advisors → form.
Rates and materials are sent by hand after registration; no login.

### 3.14 Plan Your Journey
Short form: name, email or WhatsApp, dates, number of travellers, where, what you want, message. Plus WhatsApp button and "we reply within 24 hours, 7 days a week". Hidden fields remember the source. **Two thank-you pages** (for travellers and for advisors) so enquiries are counted separately.

### 3.15 Privacy · 404
Basic privacy page with cookie consent; a friendly 404.

---

## 4. The seven page types we draw in Figma

| Type | Used by |
|---|---|
| **A. Home** | Home |
| **B. Landing ★** | Raja Ampat (region), Triton Bay, Private Yachts |
| **C. Region ○** | North Sulawesi (same layout as B, fewer blocks) |
| **D. Destination ○** | Central Raja Ampat, Misool, Bunaken, Lembeh, Sangihe & Siau, Halmahera, Widi |
| **E. Journey** | all journeys + the Group tours stub |
| **F. Story** | stories |
| **G. Text and forms** | About, How we travel, FAQ, Plan Your Journey, For Travel Advisors, Privacy, thank-yous, 404, overview pages |

**Shared pieces:** header, footer, mobile bar, destination card, journey card, story card, price table "from by days", review block, map, FAQ, call-to-action band, forms.

---

## 5. How a visitor moves

- **Traveller from an ad or Google:** Raja Ampat / Triton Bay / Yachts → a journey → form or WhatsApp.
- **Travel advisor:** For Travel Advisors → destinations and journeys as the catalogue → partner form.
- **Referral:** Home → anywhere.
Every page ends in a call to action; every destination and journey carries the small "agent rates" link.

---

## 6. What is NOT on the site at launch

Banda & Spice Islands · luxury camping (future idea) · separate diving, wildlife or volcano pages · a tour configurator · a partner login · other languages · blog. All can be added later.

---

## 7. To confirm with the owner (can be fixed after he sees this)

1. Photos and real trips per destination: decides which pages stay full and which short.
2. The 4 sample journeys.
3. Yachts: only Raja Ampat, or elsewhere too.
4. Halmahera and Widi: under North Sulawesi (◇ by access via Ternate) or somewhere else?
5. Who approves; is there an old website.
