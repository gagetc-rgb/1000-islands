# GA4 #3 : Comment créer un événement sur Google Analytics 4 avec Google Tag Manager
- Source: Thomas Mouflard (YouTube, fr) · 2020-12-11 · 14 min · https://youtu.be/2I8nCIDU2dw
- Speaker(s) and why they matter: Thomas Mouflard, French Google Ads trainer ("Marquez School" is the channel name in the caption); sells consulting and promotes his methodology at the end (13:12). Early GA4 (December 2020) walkthrough.
- Relevance to course: 3 (lesson 5; event naming discipline) · Freshness matters? UI of 2020, concepts durable
- Codes: ANALYTICS
- Notes: caption garbles the brand name ("remarquer school"); GA4 was in beta then.

## Core thesis
GA4 lets you name events freely, so you need a naming scheme: use a few generic event names and put variants in parameters (click object, text, URL) rather than inventing many one-off events.

## Claims and advice
- [ANALYTICS] In GTM use preview mode to see which variable (click text) can serve as the trigger for a phone-number click. (1:04-2:05) — type: practice
- [ANALYTICS] Prefer Google's standard recommended events when your interaction exists there; click on a phone number does not, so use a custom event. (3:06-5:08) — type: practice
- [ANALYTICS] In Universal Analytics events had three fixed fields (category, action, label); in GA4 there is "no frame", so plan naming in advance or reports become messy. (5:08-6:08) — type: opinion
- [ANALYTICS] Keep event names generic (e.g. "click") and describe details with parameters (click_object, click_text, click_url); once you define a parameter, reuse it consistently. (6:08-8:11) — type: practice
- [ANALYTICS] Use GA4 DebugView to verify events; allow 24 hours for events to appear in standard reports. (9:11-12:12) — type: practice

## Techniques and steps
1. Preview in GTM, find the variable to trigger on.
2. Create a GA4 event tag with a generic name and parameters.
3. Verify with DebugView.

## Tools and resources
- Google Tag Manager preview, GA4 DebugView (1:04-12:12)

## Quotes
- None needed.

## Disagreements and contrarian points
- Opposite approach to Sokolovskiy, who invents a specific event name per action ("click_on_phone_number"); Mouflard recommends generic names plus parameters. Both are used in practice.

## For the course
Lesson 5: give the model a naming rule: snake_case, verb_object, few generic events plus parameters; keep a tracking plan sheet.

## Other
Ends with a promotion of his consultancy.
