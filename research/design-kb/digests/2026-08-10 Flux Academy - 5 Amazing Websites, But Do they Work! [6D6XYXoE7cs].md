# 5 Amazing Websites, But Do they Work?!
- Source: Flux Academy (YouTube) · 2026-08-10 · 25 min · https://www.youtube.com/watch?v=6D6XYXoE7cs
- Speaker(s) and why they matter: Flux Academy host (name not given in transcript), a web design education company that sells courses; reviews award-style sites on "form" and "function". Commercial interest: course business, but no sell in this video.
- Relevance to us: 4 · Freshness matters? Timeless method; scores and tech stacks are a snapshot of Aug 2026
- Notes: Studio names are garbled or loose in captions: "Merci Michel" (Merci Michel, Paris, verify), "Thomas Carr" (verify), "Bard/Bar Digital" (verify), "Lazarev"/"Lazarav" (agency in San Francisco), "Neumo/Numo" (verify), "Nothing" (creative studio, Paris). Price figures quoted per site ($30-50k, $5k, $50-100k) come from the speaker with no source (unverified). Lighthouse numbers are one-off checks on the reviewer's machine.

## Core thesis
A beautiful, award-style site can still fail on speed, mobile and usability, so rank sites on both form (craft, originality, non-gimmicky) and function (performance, mobile, UX) against the site's actual goal and audience. The winner is not the prettiest but the one that fits its audience.

## Claims and advice
- [Q] Scoring method: Form out of 10 = craft (well-made?), originality, and whether the effect is gimmicky or has a reason; Function out of 10 = Google Lighthouse/PageSpeed performance, mobile layout, UX. (0:00-3:02) — practice
- [Q] Lacoste Polo Atelier (3D educational email-capture site by Merci Michel): form 8.5, function 7, total 15.5; Lighthouse performance about 60 desktop and 51 mobile; praised for 3D with a real reason (showing machines), sound design and typography; on mobile tiny text and a "continue" button at the top that is hard to reach with a thumb. (0:00-5:06) — evidence
- [Q] "Nothing" (Paris creative studio portfolio; Webflow, GSAP, Three.js, Lenis): form 7, function 6, total 13; desktop 80 and mobile 66, Core Web Vitals failed; some effects "gimmicky", cut-out images lower quality than the rest; on mobile the interaction is lost, the menu hides only three links behind a small hard-to-see button. (5:06-10:11) — evidence
- [Q] Daily Rituals (agency side project, Framer): form 7.5, function 6, total 13.5; Core Web Vitals passed, performance 75; quirky flat-people illustration style feels a couple of years old; typography too squished; on mobile the layout was clearly designed for desktop, an awards badge takes too much screen, and the clickable contact element is not recognisable as clickable. (10:11-15:17) — evidence
- [Q][VIS-M] Elva (video-memories app by the Lazarev agency; GSAP and Three.js): form 9 (glassy bubbles metaphor, not gimmicky), function 5, total 14; Core Web Vitals failing, performance 23; for a consumer audience that is "really bad"; on mobile the text on bubbles is hard to read, scroll is hijacked, and desktop features go missing. (15:17-19:20) — evidence
- [Q] Neumo storytelling side project (Vue/Next.js on Vercel, Three.js, shaders): form 9.5, function 8.5, total 18 (winner); desktop fails Core Web Vitals with performance 28, but the audience is people who want to be wowed by an award-style experience and the mobile adaptation was one of the best seen. (19:20-23:23) — evidence
- [Q] Lesson: "Beautiful on its own is not enough. Does the website achieve its goal for its target audience?" Slow loading matters much more for impatient consumers (app download) than for design buyers. (23:23-24:24) — opinion
- [BIZ] Agencies and freelancers build side projects to win awards and attract leads (Daily Rituals, Neumo storytelling), a lead strategy that is working for them. (10:11, 19:20) — opinion
- [Q][MOB] Recurring mobile checks: readable text size, thumb reach of primary buttons, effect loss on mobile, menu visibility, tap targets that look clickable, scroll-jacking. (4:05-19:20) — practice
- [VIS-M] Judge motion by whether it serves the story, not by wow; gimmicky effects with no reason cost points. (3:02, 8:08, 17:20) — opinion
- [VIS-T] Typography: "really great" praised on 2 sites; squished and hard to read on Daily Rituals. (2:02, 6:06, 12:13) — opinion

## Techniques and steps
1. Look up the tech stack of the site you review (the speaker identifies Vue, Three.js, GSAP, Lenis, Webflow, Framer by inspection).
2. Rate form: craft, originality, gimmick or reason.
3. Run Google PageSpeed Insights (desktop and mobile); note Core Web Vitals pass/fail and the performance number.
4. Open the site on a phone and test one-handed use, text readability and what disappeared.
5. Judge against the site's goal and audience, then add the scores.

## Tools and resources
- Google Lighthouse / PageSpeed Insights: performance and Core Web Vitals (3:02)
- Three.js, GSAP, Lenis, Webflow, Framer, Vue.js, Next.js: stacks spotted on the reviewed sites (1:00, 8:08, 11:11, 17:20, 20:21)
- Reviewed sites: Lacoste Polo Atelier, Nothing (Paris), Daily Rituals, Elva, Neumo's digital storytelling site (verify names)

## Quotes
- "Beautiful on its own is not enough." (23:23)

## Disagreements and contrarian points
Counter to award-jury thinking that rewards wow alone: function and audience fit are weighed equally. At the same time, accepts that a site made for the awards crowd can fail Core Web Vitals and still be the "best" for that goal.

## For 1000 Islands
Our audience is upper-middle travellers on phones, so the "impatient consumer" case applies: keep Lighthouse mobile performance high, avoid scroll-hijacking and heavy 3D, make the booking CTA reachable by thumb, keep the menu visible and tap targets obvious. Use the same form/function scoring as a quick self-review before showing the owner.

## Other
Reviewer says Lando Norris's viral site has a similar interaction to one on "Nothing" (7:06); no further detail.
