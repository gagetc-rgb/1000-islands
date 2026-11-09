# GA4 Key Events – How to Track Conversions in Google Analytics 4 (2025 Update)
- Source: Loves Data (YouTube, en) · 2025-08-12 · 13 min · https://youtu.be/A546lw0g_4s
- Speaker(s) and why they matter: Loves Data, an Australian Google Analytics training company (the presenter is not named in the caption); sells courses (mentioned at 8:28). Practitioner walk-through, current naming ("Key Events").
- Relevance to course: 5 (lesson 5 analytics/conversion events; also lesson 6) · Freshness matters? tool-dependent (menu names)
- Codes: ANALYTICS, FORM
- Notes: no sponsor segment. Menu path as of Aug 2025: Admin > Data display > Events.

## Core thesis
In GA4 a "conversion" is tracked as a Key Event: take an event you already collect, or create one (inside GA4 for page-view cases, or via Google Tag Manager for custom actions) and mark it as a key event. A form submission is best tracked as a `generate_lead` event on the thank-you page or on the submit action.

## Claims and advice
- [ANALYTICS] Conversions are measured as Key Events; you need Editor or Administrator permission to mark them. (0:00-2:09) — type: practice
- [ANALYTICS] In Admin > Data display > Events, "Recent events" shows a star; a solid star means the event is already a key event. (1:04) — type: practice
- [ANALYTICS] Do not mark `page_view` as a key event: every page would count. For a thank-you page create a new event whose condition is page view and URL contains "thank-you". (2:09-5:19) — type: practice
- [ANALYTICS][FORM] Use Google's recommended event name `generate_lead` for a successful form submission; you can give the key event a value (example 50 USD) and choose "once per event" or "once per session". (3:14-4:15) — type: practice
- [ANALYTICS] A new key event appears in real-time reports at once but takes 12 to 24 hours in standard reports. (6:22) — type: practice (not re-verified here)
- [ANALYTICS] "You can enable up to 30 unique events as key events" per property. (6:22) — type: evidence (not verified; the Google pages fetched do not state the number)
- [ANALYTICS] Key events show up in Reports > Acquisition > Traffic acquisition with "Session key event rate". (6:22-7:25) — type: evidence
- [ANALYTICS] For custom actions, send the event with a GA4 Event tag in Google Tag Manager, with a trigger that fires when the action is done (form submit, button click, page view); then pre-configure the same event name as a key event (Create event with the exact name). (7:25-12:39) — type: practice
- [ANALYTICS] Choose one method per conversion: either create the event in GA4, or send it from GTM. (12:39) — type: practice

## Techniques and steps
1. Decide the action (form submit, newsletter sign-up, purchase).
2. Create or send an event named `generate_lead` (snake_case).
3. Mark it as a key event; wait up to a day for standard reports.

## Tools and resources
- Google Analytics 4, Google Tag Manager, Tag preview (7:25-10:32)

## Quotes
- "we track conversions using 'Key Events' in Google Analytics" (0:00)

## Disagreements and contrarian points
- SEO Pub says tracking via the form-submission trigger in GTM (not the thank-you page); both are valid ways.

## For the course
Lesson 5/6: the minimum viable measurement for a travel site is one or two key events: `generate_lead` for the booking/contact form and optionally a click-to-WhatsApp event. Use the exact event name rule (case-sensitive, snake_case).

## Other
Mentions variables, courses; not needed.
