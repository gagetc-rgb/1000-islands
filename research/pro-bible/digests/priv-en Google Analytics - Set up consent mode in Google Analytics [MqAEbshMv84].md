# Set up consent mode in Google Analytics
- Source: Google Analytics (official YouTube channel, en) · 2023-05-08 · 9 min · https://youtu.be/MqAEbshMv84
- Speaker(s) and why they matter: Matt Landers, a Google developer advocate. **Vendor video**: it explains Google's own mechanism and promotes Google tags; primary for how Google's products behave, not neutral on whether you need a banner.
- Relevance to course: 3 (lesson 7 and 5: how consent choices change what analytics sees) · Freshness matters? tool-dependent; predates "Consent Mode v2" (2024) parameters
- Codes: PRIV, ANALYTICS
- Notes: no sponsor. Demo is code written by hand; uses a banner with three choices.

## Core thesis
Consent Mode lets Google tags adjust their behaviour according to the user's consent choice. Set a default (denied) before the tag loads, then update it when the user chooses; verify in Tag Assistant.

## Claims and advice
- [PRIV][ANALYTICS] Consent mode asks users for permission to store information; Google tags then "automatically adjust their behavior". (0:00) — type: evidence (vendor description)
- [PRIV] Laws vary by jurisdiction and change over time; you must keep up with the rules for your business. (1:01) — type: practice (generic caveat, no legal detail)
- [PRIV][ANALYTICS] With analytics denied, nothing appears in real-time reports; "anonymous pings" are still sent and are used for behavioural modelling to fill gaps (2:03). — type: evidence (vendor claim, not verified)
- [PRIV] Set the default consent state before the Tag Manager script loads: call `gtag('consent','default', ...)` with storage types ad_storage, analytics_storage, personalization_storage, functionality_storage, security_storage; then `consent update` after the user chooses; save the choice (local storage) and replay on later pages. (3:04-5:06) — type: practice
- [PRIV] In Tag Manager, "consent overview" shows which tags are consent-aware; Google tags already respect consent mode; others can be marked as needing extra consent types. (5:06-7:09) — type: practice
- [PRIV] Validate with Tag Assistant: the consent tab shows granted/denied per type. (7:09) — type: practice
- [PRIV] A third-party consent management platform can do this for you. (8:09) — type: practice

## Techniques and steps
1. Default deny before the tag loads.
2. Update on user choice and persist it.
3. Validate in Tag Assistant.

## Tools and resources
- gtag consent API, Google Tag Manager consent overview, Tag Assistant (3:04-7:09)

## Quotes
- "many countries and regions have passed laws that require you to get consent" (1:01, close paraphrase)

## Disagreements and contrarian points
- Google's "behavioural modelling" fills gaps with modelled data; privacy-minded authors (Craylor) prefer cookieless tools; neither side is verified here.

## For the course
Lesson 7/5: shows the engineering side of consent: default denied, update on choice, test. For a client site the practical rule is that a banner without this wiring does nothing (see Webalab).

## Other
Does not cover the 2024 additions (ad_user_data, ad_personalization); the video predates them. Verify on Google's page before quoting parameter names.
