# How to Track Form Submissions in Google Analytics 4 With Google Tag Manager
- Source: The SEO Pub (YouTube, en) · 2023-06-29 · 10 min · https://youtu.be/sUg2v8afvY4
- Speaker(s) and why they matter: Mike of The SEO Pub, an SEO practitioner who runs a newsletter (plugged at 0:00) and takes client work (shows an "inquire about hiring me" form). Practical, narrow walkthrough.
- Relevance to course: 4 (lesson 5, forms and measurement) · Freshness matters? tool-dependent (older GA4 UI, "mark as conversion")
- Codes: ANALYTICS, FORM
- Notes: self-promo at 0:00. Terminology predates "key events".

## Core thesis
To track a specific form submission, turn off GA4's automatic form-interaction event, enable form variables in GTM, create a form-submission trigger limited to that form's ID, send a GA4 event, test with Tag Assistant, then mark the event as a conversion.

## Claims and advice
- [ANALYTICS][FORM] Turn OFF "form interactions" in GA4 enhanced measurement: it can conflict with the Facebook pixel and, he says, counts error submissions as completed submissions. (0:00-2:04) — type: opinion/practice (the error-counting claim is not confirmed by Google's page, see answers/11)
- [ANALYTICS] In GTM, enable the built-in Form variables before creating a form trigger. (2:04) — type: practice
- [ANALYTICS][FORM] Distinguish forms by their form ID (newsletter vs hire-me form), because "all forms" would mix purposes. (3:05-4:07) — type: practice
- [ANALYTICS] Use snake_case event names; add an extra parameter such as the page URL to see where people submit. (4:07-5:07) — type: practice
- [ANALYTICS] Test in Tag Assistant: the tag fires only on the matching form; publish; check real-time. (5:07-8:22) — type: practice
- [ANALYTICS] New events take 24 to 48 hours to show in the events list, after which you mark them as conversions. (9:25) — type: practice (Loves Data says 12 to 24 hours)

## Techniques and steps
1. GA4: disable form interactions in enhanced measurement.
2. GTM: enable form variables; create trigger "form submission" filtered by form ID.
3. GA4 event tag with snake_case name and a page_url parameter.
4. Preview, publish, mark the event.

## Tools and resources
- Google Tag Manager, Tag Assistant, GA4 (0:00-9:25)

## Quotes
- None needed.

## Disagreements and contrarian points
- Loves Data (2025) and Peinado show a thank-you-page or click-based method; he uses form-submission triggers. Both are standard; the form trigger can misfire when submissions are AJAX or error pages.
- Recommends enhanced measurement on in general but form interactions off.

## For the course
Lesson 5/6: for a booking form, track the final success state, not the click on submit; this video's advice to separate forms by ID is useful (contact vs booking vs newsletter).

## Other
None.
