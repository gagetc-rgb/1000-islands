# Настройка Конверсий в Google Analytics 4 | События и Конверсии в GA4 через GTM и без него
- Source: Anton Sokolovskiy Marketing (YouTube; Russian original, the file's English caption is machine-translated, `en.vtt`) · 2024-01-21 (the title says 2026) · 17 min · https://youtu.be/wom6_FzH630
- Speaker(s) and why they matter: Anton Sokolovskiy, Russian-language Google Ads/SEO trainer; sells a Google Ads course and runs a Telegram group (plugged at 2:03 and 16:20). Mentions a related course on Tag Manager.
- Relevance to course: 3 (lesson 5; Russian-language confirmation) · Freshness matters? uses the pre-rename word "conversions"; GA4 UI of January 2024
- Codes: ANALYTICS
- Notes: caption is a machine translation; wording is clumsy. I summarise meaning only and do not quote lines. Self-promotion segments at 2:03, 16:20.

## Core thesis
In GA4 everything is an event; to turn a business action into a conversion, send a named event (via GTM or created in GA4) and mark it. His example tracks a click on a phone number and a visit to the thank-you page.

## Claims and advice
- [ANALYTICS] GA4 differs from Universal Analytics: everything is an event; any event can be marked as a conversion with one switch. (0:00-1:01) — type: evidence
- [ANALYTICS] In GTM, create a GA4 event tag with the data stream ID and an event name; the event name must match exactly in GA4 if you create the event there too. (4:04-6:07) — type: practice
- [ANALYTICS] Event names: Latin letters only, no spaces, use underscores. (6:07) — type: practice
- [ANALYTICS] Set tag firing "once per page" rather than "once per event" so repeated clicks do not inflate conversions; for a thank-you page it does not matter. (8:11-9:11) — type: practice
- [ANALYTICS] Verify in GTM preview and GA4 real-time before publishing; add the exact event names in Admin > Conversions so they are flagged. (11:13-15:18) — type: practice
- [ANALYTICS][SEO] Even SEO-only sites should set up Tag Manager and remarketing audiences; remarketing amplifies SEO traffic. (2:03-3:03) — type: opinion (commercial)

## Techniques and steps
1. Create triggers (click on phone, thank-you page).
2. Create GA4 event tags; test in preview.
3. Create or mark the events as conversions by exact name.

## Tools and resources
- Google Tag Manager, GA4 (all)

## Quotes
- None (machine-translated caption).

## Disagreements and contrarian points
- Names events specifically (like "click_on_phone_number") vs Mouflard's generic-plus-parameters approach.

## For the course
Lesson 5: a click-to-call or click-to-WhatsApp event is a typical small-business conversion; "once per page" prevents double counting. Use the pattern, not the wording.

## Other
He used an anti-detect browser with proxies to test unique users (15:18); irrelevant.
