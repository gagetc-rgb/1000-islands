# Cross-check 6: web basics and professional AI-assisted coding (NotebookLM, 11 Oct 2026)

Sources A (web basics): Academind, Hussein Nasser, Fabio Akita (pt), Senior Software Vlogger (ru), OneTwoCoding (ko), Valentin Despa. Sources B (AI coding): Anthropic (2 talks), DevForge, ForrestKnight, Y Combinator. Attribution by the notebook's model (unverified; see verification log in 05-security.md for one confirmed misattribution).

## A. How the web works (agreed by 3+; low practical value for a no-code director)
- Stateless HTTP request/response between browser and server; frontend (presentation) and backend (logic) are separate; databases persist data; sessions or tokens give identity; reverse proxies terminate SSL; caches (CDN, Redis) cut load; load balancers spread traffic.
- Disagreement: HttpOnly cookie sessions for single-origin web apps vs token auth headers for multi-platform APIs.
- Takeaway: know the vocabulary (what is a CDN, DNS, cache, session, API) so you can read an AI's architecture proposal. Nothing here needs action on a static site.

## B. Professional AI-assisted coding (agreed by 3+; this is the useful part)
1. Never trust AI output blindly: run tests and linting before committing (Anthropic, DevForge, ForrestKnight, Y Combinator).
2. Give precise context and constraints: explicit requirements, project rules, reference files (same four).
3. Use version control, read the diffs, commit often so every step is reversible (Anthropic, ForrestKnight, Y Combinator).
4. The human keeps architectural control; AI does the execution (same four).
5. Work in small incremental tasks, not "build the whole app" (same four).
6. Review and simplify AI code regularly to avoid unmaintainable accumulation (same four).

## Single-author
- Persistent project guideline files for the AI (Anthropic, CLAUDE.md-style; we already do this). "3 AM production outage" warning (DevForge). Use AI for regex, docs and test boilerplate (ForrestKnight). Disposable prototype scratchpads (Y Combinator; matches our Stage 1 clickable prototype).

## Disagreement
- DevForge: vibe coding is a trap that weakens developers. Anthropic and Y Combinator: acceptable and fast when backed by tests and evaluation guardrails. Resolution for us: prototypes may be loose; anything that goes to a client needs the verification gate (checklist section 9).
