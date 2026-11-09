# Vibe Coding is a Trap (What Senior Devs See That You Don't)
- Source: DevForge (YouTube, en) · 2026-02-11 · 6 min · https://youtu.be/ya6520zh4pQ
- Speaker(s) and why they matter: DevForge, anonymous commentary channel for developers; career-advice framing, ends with a plug for another of its videos (5:04). Not a primary or expert source.
- Relevance to course: 2 (lesson 8, only as the "opposing view") · Freshness matters? timeless argument
- Codes: AIW, SEC
- Notes: stories (3 a.m. outage, Black Friday search crash, "$12,000 per minute") are presented as true but are unnamed anecdotes; treat as illustrations, not evidence. No sponsor read, but a promo at the end. Music cues are in the caption.

## Core thesis
Shipping AI code you do not understand feels fast but costs more later: you cannot debug what you cannot explain. Seniors use AI for boilerplate and exploration, not for core logic, critical paths or security.

## Claims and advice
- [AIW] "Vibe coding" here means copy code, it runs, tests pass, ship it, with no understanding of how it works. (0:00) — type: opinion (definition)
- [AIW][PERF] Example: AI-generated autocomplete sent a database query on every keystroke with no debounce, caching or rate limit; fine with 10 test users, collapsed with 50,000 shoppers. (1:00) — type: opinion (anecdote, unnamed)
- [AIW] Measure time from idea to stable, maintainable, debuggable production code, not time to first working draft. (2:00) — type: opinion
- [AIW] Brian Kernighan's line "Debugging is twice as hard as writing the code in the first place" is used to argue you cannot debug code beyond your understanding. (2:00-3:01) — type: opinion (quote not verified here)
- [AIW] Seniors use AI for boilerplate they already understand, test setups, config files, exploration ("show me three different approaches"), then judge the options. (4:02) — type: opinion
- [AIW][SEC] Never use AI for core logic you must understand, critical paths, or security-related code. (4:02) — type: opinion
- [AIW] Understand the problem, design the solution yourself, then maybe use AI to speed up the implementation; review critically and be able to explain every line. (4:02) — type: practice
- [AIW] Exercise: rebuild one AI-built feature without AI, from documentation, to force understanding. (5:04) — type: opinion
- [AIW] Claim that skills "atrophy" within six months of AI-first coding. (3:01) — type: opinion (no evidence given)

## Techniques and steps
1. Pick one AI-built feature and rebuild it by hand from documentation.
2. Use AI for exploration (several options), then choose yourself.
3. Keep AI away from security and core logic.

## Tools and resources
- none named

## Quotes
- "You're practicing prompt engineering, not problem-solving." (3:01)

## Disagreements and contrarian points
- Opposes Anthropic ("Vibe coding in prod") and YC, who say vibe coding is acceptable with tests, verification and leaf-node focus. Resolution for the course: a prototype may be loose; client-bound work needs a verification gate.
- The channel's audience is career-minded developers, not people who direct AI to build client sites; part of the argument does not transfer.

## For the course
Lesson 8 (accepting LLM work): use the one transferable idea, "never ship what nobody can explain", and the narrower rule "security-related code and secrets get human review". The Black Friday example is a good concrete picture of "works in a demo, fails at load" but cite it as an illustration only.

## Other
Mentions "$200,000 developer salaries vanishing" in the promo; ignore.
