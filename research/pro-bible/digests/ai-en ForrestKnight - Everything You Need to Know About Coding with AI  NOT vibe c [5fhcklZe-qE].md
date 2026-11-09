# Everything You Need to Know About Coding with AI // NOT vibe coding
- Source: Forrest Knight (YouTube, en) · 2025-10-15 · 13 min · https://youtu.be/5fhcklZe-qE
- Speaker(s) and why they matter: Forrest Knight, software engineer and developer-content creator. **The whole video is sponsored by Warp (Warp Code)**: demos use Warp, and the sponsor read with a 7-day free trial is at 12:17. Principles are said to be tool-independent.
- Relevance to course: 4 (lesson 8) · Freshness matters? tool-dependent in details (models, pricing), timeless in method
- Codes: AIW
- Notes: sponsor segment: the Warp feature demos throughout, and 12:17. Model names (GPT-5, Claude 4.5 Sonnet, Opus 4) will date.

## Core thesis
The difference between coding with AI and vibe coding is that you stay the engineer: specific prompts, plans before code, small testable tasks, critical review of every diff, and the ability to stop and revert.

## Claims and advice
- [AIW] Set the foundation once: let the tool index the codebase; write global rules (coding standards, libraries, testing approach) and project rules in a repo file (stack, versions, DB schema, API patterns, branch naming). (0:00-1:00) — type: practice
- [AIW] Be specific: "make the edit button toggle" is lazy; a good prompt names the data field, the endpoint and the component behaviour. It is concrete, testable and reduces hallucination. (1:00-2:01) — type: practice
- [AIW] Add context: name the files to read or change; screenshots for UI bugs; this also saves tokens. (2:01-3:03) — type: practice
- [AIW] Do not ask the AI to guess; choose the model on purpose; do not switch models mid-conversation because the cache does not carry over; keep conversations short and focused because history is re-sent each time. (3:03-4:04) — type: practice (cost advice is tool-specific)
- [AIW] Treat each AI task as a sprint task: small, iterative, testable. (4:04) — type: practice
- [AIW] Plan first in plain English with a planning model, "don't write any code yet"; review the plan; then "implement exactly this plan" with restrictions (only edit these files, no new dependencies, preserve existing behaviour, say how to test); if the plan is ambiguous, stop and give two options with trade-offs. (4:04-6:10) — type: practice
- [AIW] Review output like a junior developer's pull request: ask why this pattern, what are the error cases, what is the performance impact; edit the code yourself; this is "collaboration, not delegation". (6:10-7:11) — type: practice
- [AIW] Multiple agents can write, review and test the same feature (fresh context helps), but the human must still read the code and tests; he runs two to three at most; use separate git worktrees for parallel sessions. (7:11-9:14) — type: opinion/practice
- [AIW] Use AI to explore unfamiliar code bases and for onboarding. (10:15) — type: practice
- [AIW] Set permission checks so risky actions need approval. (10:15-11:15) — type: practice
- [AIW] Know when to pull the plug: stop and revert to a commit or checkpoint if you lose control. (11:15) — type: practice
- [AIW] Treat the AI like a capable intern: guide it; do not just hand it the task. (12:17) — type: opinion

## Techniques and steps
1. Write rules files (global, project).
2. Ask for a plan, review it, then ask for implementation with explicit limits.
3. Review the diff with questions; edit yourself.
4. Run small tasks; commit; revert if chaos.

## Tools and resources
- Warp Code (sponsor), Claude Code, Cursor (mentioned as alternatives) (0:00)

## Quotes
- "view this as collaboration between you and the AI, not delegation" (7:11, paraphrase of the sentence)

## Disagreements and contrarian points
- Takes the middle path between DevForge ("trap") and Anthropic's "forget the code exists": the human always reads the code and tests.

## For the course
Lesson 8: the plan-then-restricted-implementation template and the "review like a junior's PR" habit map directly to a non-coder's acceptance routine (ask the model why, what the error cases are, what changed). The cost and model-switching advice is tool-specific and should not go in.

## Other
Mentions git natural-language commands, MCP-free docs URL; ignore.
