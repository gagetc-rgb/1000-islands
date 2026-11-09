# Claude Code best practices | Code w/ Claude
- Source: Anthropic (YouTube, en), Code with Claude conference · 2025-07-31 · 26 min incl. Q&A · https://youtu.be/gv0WHhKelSE
- Speaker(s) and why they matter: "Cal" of Anthropic's applied-AI team, a core contributor to Claude Code. **Vendor talk**: it promotes Anthropic's own tool and models (this session is also run on Claude). Primary for how the tool works, not neutral on comparisons.
- Relevance to course: 3 (lesson 8, the habits; tool-specific parts are out of scope) · Freshness matters? tool-dependent (commands, models)
- Codes: AIW
- Notes: no sponsor segments. Features such as `/compact`, `/clear`, auto-accept, thinking between tool calls and IDE integrations are product specifics from July 2025.

## Core thesis
Claude Code is a terminal agent (instructions, tools, loop) that searches the code like a new teammate. To get good results: give it a CLAUDE.md, plan before coding, work in small tested steps, commit often, manage context, and stay in control by interrupting.

## Claims and advice
- [AIW] It does no indexing or RAG; it explores with search tools (glob, grep, find) in a loop. (4:09-5:09) — type: evidence (vendor description)
- [AIW] Good uses: onboarding to a new code base, "thought partner" asking for 2-3 options without writing files, building, tests, commit/PR messages, CI use, large migrations. (6:09-10:12) — type: opinion/vendor
- [AIW] Use a CLAUDE.md file at the project root (checked in, shared) and optionally in the home directory: how to run tests, project layout, style guide; it is loaded into context at start. Build it up over time. (10:12-12:15) — type: practice
- [AIW] Permission management: reads allowed, writes and commands ask; allow safe commands (e.g. the test run) permanently; auto-accept mode exists. (11:13-12:15) — type: practice
- [AIW] Prefer a well-known CLI (e.g. GitHub's `gh`) over an MCP server when both exist. (13:16) — type: opinion
- [AIW] Context limit 200,000 tokens; `/clear` starts over, `/compact` summarises; do it at natural stopping points. (13:16-14:18) — type: evidence (vendor)
- [AIW] Plan first: ask it to find the cause and propose a plan before changing code; watch the to-do list and press Escape if it goes wrong. (15:21) — type: practice
- [AIW] "Smart vibe coding": test-driven development, small changes, run tests, check types and lint, commit regularly so you can fall back. (15:21-16:21) — type: practice
- [AIW] Use screenshots to guide and debug; run several instances in parallel if confident; Escape twice rewinds; headless/CI automation. (16:21-18:24) — type: practice
- [AIW] Q&A: model quirks (leaving comments) improved with the newer model; re-check your instruction file when switching models because the model follows instructions better; for multi-agent state, write to a shared markdown file. (22:25-25:27) — type: evidence/opinion

## Techniques and steps
1. Create CLAUDE.md with run/test commands, layout, style.
2. Ask for a plan; approve; then implement in small steps.
3. Run tests, types, lint; commit.
4. `/clear` or `/compact` at a break.

## Tools and resources
- Claude Code, GitHub CLI `gh`, MCP servers, git (6:09-13:16)

## Quotes
- "the simple thing that works" (3:07, their design principle)

## Disagreements and contrarian points
- Tells people to use CLI tools over MCP where possible; YC speaker says MCP for docs is overkill (mild agreement).

## For the course
Lesson 8: the project-rules file (like this project's CLAUDE.md), plan-before-code, small steps plus tests plus commits are shared with YC and Forrest Knight, so they are consensus. Ignore the command names.

## Other
See the companion talk "Vibe coding in prod" in the same session for the verification side.
