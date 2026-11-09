# Why All AI Generated Designs Look The Same
- Source: Flux Academy · 2026-04-01 · 8 min · https://www.youtube.com/watch?v=DLzzhG1ORm8
- Speaker(s) and why they matter: Julian (Flux Academy presenter), web designer/builder since 2015, now building Ship Studio (a tool that helps designers and non-technical builders use AI like developers). Practitioner with a commercial interest in Ship Studio and in selling design education.
- Relevance to us: 4 · Freshness matters? mostly timeless (the "averaging" explanation and the creative-director stance hold; the named tells such as indigo/Inter may shift as models change)
- Notes: no sponsor segment. The claim about "a recent study" of AI-generated images producing stock-photo-like output is unnamed and unsourced (verify before citing). The Tailwind indigo apology is stated as fact without a link (verify).

## Core thesis
AI designs look the same because LLMs predict the statistical average of their training data, so unconstrained output is the average of the internet. That is fine for internal tools, but a homepage needs to stand out within seconds, which requires feeding the model your design system and visual references, iterating for hours, and acting as the creative director with taste.

## Claims and advice
- [AIS] The tell-tale list: blue/purple gradients on every button, background and section; emojis (rockets, sparkles, fire, check marks) replacing design; a colored bar on the left edge of every card; Inter or a system font "nine times out of 10"; and everything looks "clean" but forgettable. (0:00-2:03) — practice
- [AIS] Why it happens: LLMs "predict what is most likely to come next", which is the average of the training set; one default (Tailwind's old indigo, which Adam Wathan reportedly publicly apologized for) rippled through millions of projects into training data. "AI isn't choosing these patterns, it's averaging them." (2:03-3:04) — opinion/explanation (verify the apology)
- [AIS] A recent study (unnamed) had AI generate thousands of images with no human input and got basically stock photos; left alone, AI creates average. (3:04) — evidence claimed, unsourced
- [Q] Generic is acceptable for internal tools, admin dashboards and MVPs: fast, functional, familiar. It hurts on homepage, branding and first impression: visitors decide "within 3 seconds" if you are unique, and generic design is not ugly, it is "invisible". (3:04-4:07) — opinion (the 3-second figure is asserted)
- [AI][DS] Most important single move: feed the AI your design system (colors, fonts, spacing, border radius, shadows); brand constraints are "the simplest, easiest, and most effective form of creative direction". (4:07) — practice
- [REF][AI] Use screenshots, links and references to sites with the right vibe; "minimal and bold hero" describes millions of sites so AI picks the average; visual references close the gap between your head and the model's reading of your words. (5:08) — practice
- [P][AI] Expect iteration, not magic: as in Figma, the first version will disappoint; try again and again for hours until a direction resonates, then refine spacing, fonts, layouts. For an important homepage, expect many hours or days. (5:08-6:10) — practice
- [AIS][P] Roles: AI is the execution team, you are the creative director who tells it what looks good and bad. (6:10) — opinion
- [AIS] Execution is a commodity (your parents could build a site with Lovable in hours and think it looks great); taste is the differentiator; two kinds of people emerge: those who accept the output, and those who direct with creative vision. (6:10-7:11) — opinion

## Techniques and steps
1. Decide whether the page needs to stand out (homepage, brand) or not (internal tool); do not polish what does not need it.
2. Supply design tokens: colors, fonts, spacing, radius, shadows.
3. Supply visual references: screenshots, links to sites with the right vibe.
4. Generate, reject, regenerate; once a direction feels right, iterate on spacing, fonts and layout.
5. Act as creative director; refuse output that is merely average.

## Tools and resources
- Ship Studio (the speaker's product for designers using AI) (0:00)
- Tailwind CSS (default indigo) (2:03); Inter (1:01); Lovable, Claude Code, Figma named as examples (3:04, 6:10, 7:11)

## Quotes
- "AI isn't choosing these patterns, it's averaging them." (2:03)
- "Maybe anyone can build anything, but not everyone has taste." (7:11)
- "Your job isn't to make AI a good designer." (7:11, finishes: "Your job is to know what good design looks like and refuse to accept anything less.")

## Disagreements and contrarian points
Against the blanket claim that generic AI design is bad: embrace it where it does not matter. Against expecting one-shot magic.

## For 1000 Islands
Confirms our approach: give the model tokens and references and expect iteration. Our house bans already cover the tells (left-bar cards, emojis, Inter after Stage 1, gradients). The "generic is invisible in 3 seconds" argument supports the photo-led, distinctive direction for the hero. Treat the 3-second figure as rhetoric, not data.

## Other
None.
