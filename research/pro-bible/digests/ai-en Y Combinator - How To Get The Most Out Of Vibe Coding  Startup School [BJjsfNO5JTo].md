# How To Get The Most Out Of Vibe Coding | Startup School
- Source: Y Combinator (YouTube, en) · 2025-04-25 · 17 min · https://youtu.be/BJjsfNO5JTo
- Speaker(s) and why they matter: "Tom", a YC partner (surname not in the caption), a former professional developer who vibe-coded side projects for a month. Opens with short tips from unnamed YC founders (0:01-4:05). YC invests in the tools and companies named (it says "Aqua, a YC company", 14:15), so there is a mild commercial interest.
- Relevance to course: 4 (lesson 8) · Freshness matters? model comparisons expire; the workflow advice is durable
- Codes: AIW, HOST
- Notes: "this advice might change in the next 2 or 3 months" (6:08). Model comparisons (Gemini for indexing, Sonnet 3.7 for implementation, GPT-4.1 not yet impressive) are a snapshot from April 2025.

## Core thesis
The best vibe-coding techniques are what a professional engineer would do: a written plan, step-by-step implementation, version control, tests, instruction files, and a willingness to reset instead of piling fixes on fixes.

## Claims and advice
- [AIW] Founders' tips: if the AI loops, paste the code into the model's own website; handcraft test cases yourself and let the LLM generate code until tests pass; spend "unreasonable" time in a plain LLM chat to define scope and architecture first; if you keep pasting error messages, step back and ask why it is failing. (1:03-4:05) — type: opinion (anecdotal)
- [AIW] If you have never coded, start with Replit or Lovable; they struggle when you need precise back-end changes ("I'd change a button over here and the backend logic would bizarrely change"). (4:05) — type: opinion
- [AIW] First write a comprehensive plan with the LLM, save it as a markdown file, delete what you do not want, mark "won't do" items, keep an "ideas for later" section; implement section by section, test, commit, and have the AI mark the section done. (5:06) — type: practice
- [AIW] Use Git religiously, start each feature from a clean state, and `git reset --hard` if the AI "goes off on a vision quest"; the tools' built-in revert is not trusted yet. (6:08) — type: practice
- [AIW] Repeated prompting piles up bad code; after finding the real fix, reset and apply only that fix to a clean code base. (6:08-7:09, 9:10-10:10) — type: practice
- [AIW] Write high-level end-to-end tests (simulate clicking through the app), not just unit tests, because LLMs change unrelated logic; tests catch regressions. (7:09-8:09) — type: practice
- [AIW][HOST] LLMs are useful beyond code: it had Claude configure DNS and set up Heroku hosting, generate and resize a favicon in the needed sizes. (8:09) — type: opinion (personal use)
- [AIW] Bug fixing: paste the error message first; ask for 3-4 possible causes before any code; reset after each failed attempt; add logging; switch models if stuck. (8:09-10:10) — type: practice
- [AIW] Write instruction files (Cursor rules, Windsurf rules, CLAUDE.md); some founders write hundreds of lines. (10:10) — type: practice
- [AIW] Download API docs into the project folder and tell the model to read them first; he finds MCP overkill. (11:12) — type: opinion
- [AIW] For hard features build a small standalone reference implementation in a clean project, then reimplement it in the main project; keep files small and modular. (12:13-13:13) — type: practice
- [AIW] Choose a mature framework with strong conventions (Rails); models do worse on sparse-data languages. (13:13) — type: opinion (anecdotal)
- [AIW] Use screenshots for UI bugs and design inspiration; voice input; refactor often once tests exist; keep experimenting, trying every new model. (14:15-16:17) — type: practice

## Techniques and steps
1. Write a plan.md with the LLM; trim; mark out-of-scope.
2. Implement one section at a time; run tests; commit.
3. On a failed fix: reset, learn the real cause, re-apply cleanly.
4. Add end-to-end tests before the next feature.

## Tools and resources
- Replit, Lovable (starter), Cursor, Windsurf, Claude Code (coding tools) (4:05); Aqua (voice, YC company) (14:15)

## Quotes
- "The best techniques are the same techniques that a professional software engineer might use." (0:01, close paraphrase)

## Disagreements and contrarian points
- "That's not vibe coding, is it? You're now just software engineering." He calls the objection beside the point (0:01).
- Opposes DevForge's "trap" thesis; agrees with Anthropic on tests and small steps.

## For the course
Lesson 8: "commit every step, reset hard instead of stacking fixes", "write the plan in a file and tick sections off", and "end-to-end tests catch unrelated changes" are the most reusable rules for a non-coder who directs the model. The DNS-by-AI remark touches lesson host/hand-off; note that AI-configured DNS should be checked by the owner.

## Other
None.
