# 1000 Islands Travel — Site structure v2 (lean)

**Date:** 2 October 2026. **Supersedes** `STRUCTURE_v1.md` (~30 pages, too many for the IDR 35m budget).
**Principle:** fewer pages, each one full. Small places become sections of their region page instead of separate thin pages. They can be split out later as paid post-launch work, once there are photos, trips and search data.

Legend: ★ = full sales landing · ○ = lighter page

---

## 1. The whole site

**Two regions only: Raja Ampat and North Sulawesi.** Everything else is a destination inside one of them.
**Four landings:** Raja Ampat · North Sulawesi · Private Yachts · For Travel Advisors.

```text
1  HOME
│
├─ 2  RAJA AMPAT ★ (region landing)
│      destinations inside: Central Raja Ampat · Misool · Triton Bay
│
├─ 3  NORTH SULAWESI ★ (region landing)
│      destinations inside: Bunaken · Lembeh · Sangihe & Siau · Halmahera · Widi
│
├─ 4  PRIVATE YACHTS ★
│
├─ 5  JOURNEYS (list of journeys + "Group tours — coming soon" block)
│   ├─ 6  Journey 1
│   ├─ 7  Journey 2
│   ├─ 8  Journey 3
│   └─ 9  Journey 4
│
├─ 10 STORIES (3 guest stories on one page)
│
├─ 11 ABOUT (about us + how we travel + FAQ on one page)
│
├─ 12 FOR TRAVEL ADVISORS ★
│
└─ 13 PLAN YOUR JOURNEY (form)

Technical, no design work: thank-you (traveller) · thank-you (advisor) · privacy · 404
```

**13 real pages + 4 technical.**

**Menu:** Destinations ▾ (Raja Ampat · North Sulawesi) · Journeys · Private Yachts · Stories · About · For Travel Advisors · **[Plan Your Journey]**
**Phone:** bottom bar with Plan Your Journey + WhatsApp.

---

## 2. What was cut and where it went

| In v1 | In v2 |
|---|---|
| Destinations overview page | removed: the home page map + the menu do this job |
| 8 destination pages (Central RA, Misool, Triton Bay, Bunaken, Lembeh, Sangihe, Halmahera, Widi) | sections with anchors inside Raja Ampat and North Sulawesi |
| Group tours stub page | a "coming soon" block on the Journeys page |
| Stories overview + 3 story pages | one Stories page |
| About, How we travel, FAQ (3 pages) | one About page; short FAQ blocks also on each landing |

---

## 3. Page by page

**1. Home.** Hero "Remote Indonesia. Off the map." → map: Raja Ampat and North Sulawesi with their destinations → 4 featured journeys → "remote, made easy" in 4 steps → private yachts block with the luxury story → reviews → for travel advisors teaser → start with an idea (form / WhatsApp).

**2. Raja Ampat ★.** Hero → why go → **three destinations as sections**: Central Raja Ampat, Misool, Triton Bay (photo, what is special, what you do) → how a trip works (via Sorong) → "from" prices by number of days → journeys here → yachts block → best time → what to expect → reviews → FAQ → call to action + "agent rates" link.

**3. North Sulawesi ★.** Same landing layout: hero → why go → **five destinations as sections**: Bunaken, Lembeh, Sangihe & Siau, Halmahera, Widi → how a trip works (via Manado) → "from" prices by days → journeys → best time → what to expect → reviews → FAQ → call to action + "agent rates" link.

**4. Private Yachts ★.** Why a yacht → where we sail → packages by days with "from" price → our boats or boat levels → luxury story → included → whole boat or cabin → FAQ → call to action.
*If yachts run only in Raja Ampat, this page could merge into Raja Ampat (→ 12 pages); keep for now, it is one of the four agreed landings.*

**5. Journeys.** Card grid of the 4 journeys (photo, destination, days, diving tag, "from" price) + a block "Group tours — coming soon, leave your email".

**6–9. Journey pages.** Facts (days, destination, season, diving tag, "from" price) → highlights → route → day by day → where you stay / which boat → what can change → included → FAQ → form with this journey filled in.

**10. Stories.** 3 guest stories, one under another (photos, route, review, what we arranged). Luxury trip first.

**11. About.** Our story → team and people on the ground → how we travel (from enquiry to the flight home, honest about comfort) → FAQ.

**12. For Travel Advisors ★.** Hero (Become a partner · Request a trade quote) → "Indonesia is easy. Until it isn't." → what we handle → how we work with you (one price, the client stays yours, white-label, reply within 24 h, 7 days a week) → where we operate → proof → how a booking works → FAQ → form.

**13. Plan Your Journey.** Short form + WhatsApp + "we reply within 24 hours, 7 days a week".

Everywhere: diving tag on journeys (*Dive-focused / Dive optional / No diving needed*), "agent rates" link on landings and journeys.

---

## 4. Templates in Figma: 4 instead of 7

| Template | Pages |
|---|---|
| **A. Home** | 1 |
| **B. Landing** | Raja Ampat, North Sulawesi, Private Yachts, For Travel Advisors |
| **C. Journey** | 4 journeys |
| **D. Content / form** | Journeys list, Stories, About, Plan Your Journey, technical pages |

---

## 5. Further levers, if still too much

1. **3 journeys instead of 4** → 12 pages.
2. Nothing else worth cutting: the four landings are agreed, and Stories, About, the form and the journeys list are the minimum a travel site needs.
