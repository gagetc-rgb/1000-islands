# CONVERSIONES de Google Analytics 4: Cómo configurar los eventos de conversión dentro de GA4 y en GTM
- Source: Victor Peinado Digital (YouTube, es) · 2022-08-09 · 17 min · https://youtu.be/1SA4l16GY-M
- Speaker(s) and why they matter: Victor Peinado, Spanish-language analytics trainer. The structure, examples and numbers (thank-you page event, "up to 30", "12 to 24 hours") are almost identical to the Loves Data walkthrough; treat the two as one lineage, not independent confirmation.
- Relevance to course: 3 (lesson 5; Spanish confirmation) · Freshness matters? uses the pre-2024 term "conversions"
- Codes: ANALYTICS, FORM
- Notes: no sponsor seen. Interface of 2022.

## Core thesis
Mark existing events as conversions in GA4; for specific pages (thank-you) create an event from a page view; for custom actions (a form submit button click) send an event from Google Tag Manager.

## Claims and advice
- [ANALYTICS] Purchase events sent to GA4 are marked as conversions automatically. (1:03-2:04) — type: evidence
- [ANALYTICS] You cannot mark `page_view` as a conversion; create a new event whose condition is page view with page location containing "gracias-newsletter". (2:04-5:08) — type: practice
- [ANALYTICS] Add `value` and `currency` parameters to give each conversion a monetary value (5 USD in the example). (5:08) — type: practice
- [ANALYTICS] Real-time shows events at once; standard reports take 12 to 24 hours; you can pre-configure the conversion by name. (6:12-7:14) — type: practice
- [ANALYTICS] Up to 30 unique events can be conversions; use a custom parameter instead of many event names if you approach the limit. (7:14) — type: evidence (not verified)
- [ANALYTICS][FORM] For a form-submit button click: enable the Click ID variable in GTM, create a GA4 event tag named "envio_formulario_click", a trigger "some clicks" where Click ID equals the button ID, add parameters value, currency, page_location, test in preview, publish. (9:14-14:24) — type: practice
- [ANALYTICS] Event value and conversion value are different concepts (separate video recommended). (15:24) — type: opinion

## Techniques and steps
As above; test with Tag Assistant before publishing.

## Tools and resources
- GA4, GTM, Tag Assistant (10:15-14:24)

## Quotes
- None needed.

## Disagreements and contrarian points
- Tracks the click on the submit button (fires even if validation fails); SEO Pub and Loves Data prefer the form-submit trigger or the thank-you page. Worth noting: a click on submit is not the same as a successful submission.

## For the course
Lesson 5: same message as Loves Data in a second language; add the warning that click-on-submit counts failed attempts, so success page or success event is better.

## Other
None.
