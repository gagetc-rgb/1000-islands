# Cross-check 11: analytics setup basics and conversion events (digest-based, quotes from transcripts, Google help pages checked 11 Oct 2026)

Lesson feed: lesson 5 (forms and path to enquiry, measuring it), lesson 6 (search: Search Console), lesson 7 (privacy-friendly alternatives, with answers/10).

Sources (8 videos; languages: en x5, es, fr, ru-machine-translated). Short names: **LD** = ana-en Loves Data [A546lw0g_4s] (2025); **AM** = ana-en Analytics Mania [w31Tn1x5rJk] (2024); **SP** = ana-en The SEO Pub [sUg2v8afvY4] (2023); **CR** = ana-en Craylor [CrdHhfrwGpg] (2024, sponsored by WP Engine); **HP** = ana-en Henry Purchase, Search Console [dSCci6Yh5Ss] (2024); **VP** = ana-es Victor Peinado [1SA4l16GY-M] (2022); **TM** = ana-fr Thomas Mouflard [2I8nCIDU2dw] (2020); **AS** = ana-en Anton Sokolovskiy [wom6_FzH630] (Russian video with a machine-translated English caption, 2024). All files in `transcripts/`, digests in `digests/`.

Tags: ◆ primary page verified (PRIMARY_SOURCES.md), ◈ several authors, ◇ one author or disputed.
Independence note: **VP and LD walk through the same example in the same order** (thank-you page event from page_view, a 5/50 USD value, "12 to 24 hours", "up to 30 events"); count them as one lineage. Three of the eight sell Google Ads or Analytics training (LD, TM, AS) and one (CR) is sponsored; none sells analytics software except through links.

## A. Rules agreed by at least three authors

1. ◆◈ **A conversion is an event you send (or already collect) and then flag.** GA4 now calls the flag "key event" (renamed from "conversion" in 2024).
   - LD [0:00]: "we track conversions using 'Key Events' in Google Analytics"
   - AM [0:00]: "from now on such conversions will be called key events the flow will remain pretty much the same you send an event to Google analytics 4 then you go to the admin section events and then Mark some events as key events"
   - SP [9:25]: "once you see it showing up here though you just hit this Mark as conversion" (2023 wording)
   - VP [2:04]: "simplemente puedes hacer clic en este botón para habilitar el evento como una conversión" (2022 wording)
   - AS [1:01]: "you just use the slider here to measure what to count as a conversion event" (machine-translated)
   - Primary ◆ Google Analytics Help, About key events (https://support.google.com/analytics/answer/9267568): "A key event is an event that measures an action that's particularly important to the success of your business." and "To measure a key event, create or identify an event that measures the action and then mark the event as a key event."
   - Terminology note (AM [1:01]): "conversion" now means only events also imported into Google Ads; older videos (SP, VP, TM, AS) use the old word.

2. ◈ **Never flag the generic `page_view` as the conversion; define a specific event (thank-you page, form success).**
   - LD [2:09]: "we can't just mark the 'page view' event as a 'Key Event' because this would mean every page people view on our website would be counted as a conversion"
   - VP [2:04]: "si habilitamos el evento de vista de página como una conversión cada vez que alguien vea una página en nuestro sitio web se contará como una conversión"
   - SP [3:05]: separate forms by form ID because "they serve different purposes so I want the data on them separate"
   - AS [9:11]: a thank-you page tag with its own event name and trigger (machine-translated)
   - Weaker agreement: LD and VP share one lineage.

3. ◆◈ **Name events consistently: snake_case or Latin letters with underscores; prefer Google's recommended names where one exists.** (4 authors)
   - SP [4:07]: "best practice in analytics is to use snake case so use the underscore"
   - LD [3:14]: "'generate, underscore, lead'. This is one of Google's recommended event names and it's perfect for tracking when people have successfully submitted a form on our website"
   - AS [6:07]: "You can't use Cyrillic here. Only Latin characters and You also can't use spaces That's why I use underscores" (machine-translated)
   - TM [6:08]: "la nomenclature que vous avez donnée à vosnon d'événements il faut vraiment la pensée en amont" (verbatim garbled caption; meaning: plan the naming in advance)
   - Primary ◆ Google event naming page (https://support.google.com/analytics/answer/13316687): "Use only letters, numbers, and underscores." and "Don't use spaces."; Google's recommended events page lists "generate_lead submits a form or a request for information" (https://support.google.com/analytics/answer/9267735).

4. ◈ **Test before you trust: GTM preview / Tag Assistant, real-time report, DebugView.** (5 authors)
   - SP [5:07-8:22]: tests in Tag Assistant until the tag fires only for the intended form
   - AS [11:13-13:14]: preview mode in GTM and then the real-time report
   - TM [10:11-11:12]: uses GA4 DebugView to see the interaction arrive
   - LD [6:22]: "you will be able to see the event in the real time reports straight away"
   - VP [13:22-14:24]: preview in Tag Assistant ("vemos que nuestra nueva etiqueta de clic en el formulario ha sido activada")

5. ◈ **Reports lag: allow a day or two for new events in standard reports.** (4 authors; the range differs)
   - LD [6:22]: "it can take 12 to 24 hours for key events to appear in the standard reports"
   - VP [6:12]: "suele tardar entre 12 y 24 horas en mostrar este evento"
   - SP [9:25]: "it can be like 24 to 48 hours until you see a new event showing up"
   - TM [12:12]: "un délai de 24 heures pour voir apparaître les événements" (caption)
   - Not verified against a Google page (the pages fetched give no number); tell the lesson "up to a day or two".

6. ◈ **Use Google Tag Manager as the usual way to send custom events from a site** (LD, SP, VP, TM, AS all do), with a trigger that fires after the action completes. Note this adds a third-party script (see answers/10 and 16-security-addendum).

## B. Single-author items (◇ unless noted)

- SP: turn OFF enhanced-measurement "form interactions" because it clashes with the Facebook pixel and counts error submissions ([0:00-2:04]). ◆ Google's enhanced-measurement page does list `form_start` and `form_submit` (https://support.google.com/analytics/answer/9216061), so the automatic event exists; the claims about the Facebook pixel and error counting are ◇ not verified.
- LD: "up to 30 unique events as key events" ([6:22]); VP repeats it, but neither Google page fetched (About key events, Configuration limits) states 30 (the limits page does say a key event name over 40 characters will not be reported as a key event). **Not verified.**
- LD: choose "once per event" or "once per session" counting ([4:15]); AS: choose "once per page" in GTM so repeated clicks do not inflate ([9:11]). ◇ practice.
- TM: use a few generic event names with parameters (click_object, click_text, click_url) rather than many names ([6:08-8:11]); AS invents one name per action. ◇ disputed style.
- VP: add `value` and `currency` parameters to give a conversion a money value ([5:08]); LD gives a value in the create-event screen ([4:15]). ◇ optional.
- CR: GA4 no longer stores IP addresses ([1:03]). ◆ Google: "In Google Analytics 4, IP masking is not necessary since IP addresses are not logged or stored." (https://support.google.com/analytics/answer/2763052). But the same video says GA4's dashboard is "so bad" ([1:03]): ◇ opinion.
- CR: alternatives and their prices (2024): Umami free up to 10,000 events and 3 sites, Plausible $9 a month for 10,000 page views, Matomo $26 a month for 50,000 views, Fathom from $15 a month ([3:06-10:13]). ◇ vendor prices, will have changed; **not verified**.
- CR: Umami "you don't need to show any cookie consent banners" ([3:06]) ◇ legal claim, see answers/10 (needs regulator guidance, not a creator's word).
- CR: tracker blockers in Brave, Opera, Firefox hide visits from many analytics scripts ([9:12-10:13]) ◇.
- HP (Search Console): submit the sitemap first ([1:02-2:03]); use URL Inspection and "Request indexing" ([2:03-3:03]); compare periods; check Page indexing, Experience and Links ([5:05-18:19]). ◆ Google Search Console Help lists "Request indexing for a URL: Request that a URL be crawled by Google." (https://support.google.com/webmasters/answer/9012289). Rest ◇ one author.
- Retention ◆: Google Analytics Help, Data retention (https://support.google.com/analytics/answer/7667196): "you can set the retention period of user-level data to: 2 months 14 months This retention period also applies to key events data." (the default in the console is not stated here).

## C. Disagreements

- **Which signal marks "form submitted"?** LD: URL contains "thank-you" or a `generate_lead` event; SP: GTM form-submission trigger limited to one form ID; VP: click on the submit button (fires even if validation fails). Reading for the lesson: success page or success event is more honest than a click.
- **Naming style**: generic event plus parameters (TM) vs specific names (AS); both work if applied consistently.
- **Google Analytics vs privacy-friendly tools** (CR); the other seven use GA4. Consent consequences are a legal question, see answers/10.
- **Terminology**: "conversion" (SP, VP, TM, AS) vs "key event" (LD, AM; current). ◆ Google's own page uses "key event".

## D. Notes for the lesson

- Minimum tracking plan for a small travel site: key events `generate_lead` (booking/contact form success), optionally `click_whatsapp` or `click_phone`, nothing else at first. Ask the AI to document event names and where they fire.
- The lesson should say that adding analytics adds a third-party script and may require consent in some regions, so analytics ties to the privacy lesson.
