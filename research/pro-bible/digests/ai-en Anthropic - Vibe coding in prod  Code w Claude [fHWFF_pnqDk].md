# Vibe coding in prod | Code w/ Claude
- Source: Anthropic (YouTube, en), Code with Claude conference · 2025-07-31 · 31 min incl. Q&A · https://youtu.be/fHWFF_pnqDk
- Speaker(s) and why they matter: "Eric", an Anthropic researcher on coding agents and co-author of Anthropic's "Building effective agents" (surname not in the caption). **Vendor talk**: Anthropic sells the coding tools and models discussed; the thesis ("you will need to vibe code") serves its product.
- Relevance to course: 5 (lesson 8) · Freshness matters? the principles last; the "task length doubling" claim is dated
- Codes: AIW, SEC
- Notes: no sponsor. The "doubling every seven months, now about an hour" figure is a vendor-cited trend, not verified here.

## Core thesis
Do not read every line, but do not abandon control either: act as the AI's product manager, give it rich context, concentrate generated code in "leaf nodes" that nothing depends on, and verify through tests and observable inputs and outputs rather than by reading the code.

## Claims and advice
- [AIW] Vibe coding in Karpathy's sense means forgetting the code exists; heavy AI use with a tight feedback loop is not that. (1:08) — type: opinion (definition)
- [AIW] Early vibe-coded apps had problems: maxed-out API keys, bypassed subscriptions, random DB changes; positives were low-stakes games and toys. (2:08) — type: evidence (anecdotal)
- [AIW] AI task length doubles about every seven months (about an hour at the time); this is why it matters. (3:08) — type: evidence (vendor trend, not verified)
- [AIW] Compiler analogy: you can trust a system you do not read if you can verify an abstraction layer; "forget the code exists but not that the product exists". (4:09-5:10) — type: opinion
- [AIW] Managers already verify work they cannot read: CTOs write acceptance tests, PMs use the product, CEOs spot-check data. (5:10-7:12) — type: opinion
- [AIW] Tech debt cannot currently be validated without reading the code. (7:12) — type: opinion
- [AIW] Focus generated code on leaf nodes (features nothing else depends on); keep the trunk and core architecture human-understood; "tech debt in leaf nodes is okay". (8:14-9:14) — type: opinion
- [AIW] Be Claude's product manager: give a new-hire's briefing (tour of the code base, requirements, constraints); he spends 15 to 20 minutes assembling a plan in a separate conversation, then executes it. (9:14-11:14) — type: practice
- [AIW][SEC] Fully non-technical people should not vibe-code a business from scratch; they cannot ask the right questions; security needs someone who knows what is dangerous. (11:14, 20:25) — type: opinion
- [AIW] Case: a 22,000-line change to a production RL code base written mostly by Claude, merged after days of human requirements work, leaf-node focus, heavy human review of the extensible parts, long stress tests, and a design with human-verifiable inputs and outputs; it was a fully offline system. (12:15-13:17, 20:25) — type: evidence (vendor case)
- [AIW] Test-driven development: ask for a few end-to-end tests (happy path and two error cases); read the tests first; if you agree with the tests and they pass you feel good about the code. (23:31-24:32) — type: practice
- [AIW] Compact or start fresh at a natural break, after writing the plan into a document. (28:35) — type: practice
- [AIW] To start in an unfamiliar area, first ask the model where things live and which classes matter before writing the feature. (29:35-30:38) — type: practice
- [AIW] Q&A idea: products should offer provably safe sandboxes (auth and payments built in, you fill in the UI). (21:27-22:28) — type: opinion

## Techniques and steps
1. Write requirements and a plan with the model, in a separate conversation.
2. Restrict generated code to leaf nodes; review core parts by hand.
3. Define end-to-end checks and stress tests whose results you can read.
4. Read the tests before the code.

## Tools and resources
- Claude Code, Cursor (Q&A mentions), Claude artifacts as a safe front-end-only example (22:28)

## Quotes
- "we will forget that the code exists but not that the product exists" (4:09)

## Disagreements and contrarian points
- Pushes beyond YC and Forrest Knight, who tell you to read the code; he says "it's okay today if you don't vibe code, but in a year or two" insisting on reading every line becomes a disadvantage (15:19). Directly opposed by DevForge.
- Agrees with all the others on tests, plans and small steps.

## For the course
Lesson 8: the best framework for a non-coder: you cannot read the code, so verify observable outputs: acceptance checks, tests that the model writes, DevTools, Lighthouse, a clickable walk-through. Use "leaf nodes vs core" to say which parts of a client site need extra review (forms, auth, payments, third-party scripts, secrets).

## Other
Mentions that early vibe-coded apps leaked API keys: ties to lesson 7 (secrets in client code).
