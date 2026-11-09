# Cross-check 13: accepting LLM work / working with AI on code (digest-based, quotes from transcripts)

Lesson feed: lesson 8 (acceptance gate before showing the client). Replaces part B of `06-web-basics-and-ai-coding.md`, where attributions were unverified.

Sources (5 videos, all English; four independent voices): **DF** = ai-en DevForge [ya6520zh4pQ]; **FK** = ai-en ForrestKnight [5fhcklZe-qE] (sponsored by Warp, 12:17); **YC** = ai-en Y Combinator [BJjsfNO5JTo] (YC invests in tools it names); **CC** = ai-en Anthropic "Claude Code best practices" [gv0WHhKelSE]; **VP** = ai-en Anthropic "Vibe coding in prod" [fHWFF_pnqDk]. CC and VP are the same vendor (Anthropic), so together they count as **one** voice for independence, and both promote Anthropic's product. All transcripts are in `transcripts/`, digests in `digests/`.

Tags: ◆ verified against a primary page, ◈ several authors, ◇ one author or disputed. There is no standard or regulator for these practices, so none of the rules below can be ◆; the only ◆ items are two tool-behaviour statements at the end. Agreement here is agreement among practitioners, not proof of effectiveness.

## A. Rules agreed by at least three independent voices (DF, FK, YC, Anthropic)

1. ◈ **Verify, do not trust: run tests, read what changed, be able to explain it.**
   - FK [6:10]: "review it like you're pair programming with a junior developer. Don't just blindly trust it like many juniors do to their seniors."
   - YC [7:09]: write tests because "LLMs have a bad habit of making unnecessary changes to unrelated logic" (the tests catch it).
   - DF [4:02]: "always review critically ... and ensure you can explain every line."
   - CC/VP [24:32 in VP]: "the only part of the code or at least the first part of the code that I'll read is the tests ... if I agree with the tests and the tests pass then I feel pretty good about the code."
   - Caveat: DF and FK say read the code; VP says you can verify through tests and outputs instead (see C).

2. ◈ **Write a plan first, in a file or in plain language, review it, then implement.**
   - FK [5:06]: "Don't write any code yet." (plan first, then "implement exactly this plan" with restrictions)
   - YC [5:06]: "I would work with the LLM to write a comprehensive plan. Put that in a markdown file inside your project folder and keep referring back to it."
   - CC [15:21]: "can you search around, figure out what's causing it, and just like tell me a plan how we're going to fix it?"
   - VP [10:14]: "I often spend 15 or 20 minutes collecting guidance into a single prompt and then let Claude cook after that."

3. ◈ **Work in small steps and commit often, so every step is reversible; reset rather than stack fixes.**
   - YC [6:08]: "Use Git religiously." and [9:10]: "After each failed attempt at fixing the bug, I would get reset and start again again so you're not accumulating layers and layers of crust."
   - CC [15:21-16:21]: "commit regularly so that if it's kind of going off the rails, you can always fall back and try again."
   - FK [11:15]: "Stop. Revert the task work completely or to a previous checkpoint".

4. ◈ **Give precise context and constraints (rules file plus a specific prompt).**
   - FK [1:00]: "The number one rule is be specific." and [0:00]: "Then set up your rules."
   - YC [10:10]: "Next tip is to write instructions for the LLM." (Cursor rules, Windsurf rules, CLAUDE.md)
   - CC [10:12]: "the main way we share state across kind of sessions ... is this cloud.mmd file" (caption spelling of CLAUDE.md).
   - VP [9:14]: "I think when you're vibe coding you are basically acting as a product manager for Claude."

5. ◈ **Use tests as the check; prefer a few high-level, end-to-end tests over many low-level unit tests.**
   - YC [7:09]: "I prefer to keep these tests super high level ... simulate someone clicking through the the site or the app".
   - VP [23:31]: "I want the test to be like general and end to end."
   - CC [15:21-16:21]: "having test-driven development, having Claude make small changes, run the tests, make sure they pass".
   - FK [2:01]: a good prompt is "concrete, testable".

6. ◈ **The human owns the architecture and the risky parts; AI is for boilerplate, exploration and contained features.**
   - DF [4:02]: "they never use it for the core logic they need to understand. They never use it for critical paths. And they definitely never use it for security-related code."
   - VP [8:14]: "My answer to this is to focus on leaf nodes in our codebase." (parts nothing else depends on)
   - FK [4:04]: "You understand architecture, you understand patterns and logic, and you know the codebase, so use that knowledge."

7. ◈ **Use the model to explore and explain unfamiliar code (so you learn what it built).**
   - FK [10:15]: "you can use AI to explore unfamiliar code bases".
   - CC [6:09]: "Claude code can kind of help supercharge that onboarding process."
   - YC [11:12]: "you can use the LLM as a teacher".
   - VP [29:35-30:38]: before writing a feature he asks the model "where in this codebase" things happen and which classes to look at.

## B. Single-voice items (◇)

- DF: rebuild one AI feature by hand to test understanding ([5:04]); skills atrophy in six months ([3:01]); stories of production outages are unnamed anecdotes.
- FK: pick the model on purpose and do not switch mid-conversation for cost reasons ([3:03-4:04]); three agents write/review/test the same task ([8:14]); global vs project rules files (rules files are consensus; the global/project split is his).
- YC: download API docs into the project instead of using MCP ([11:12]); choose mature frameworks (Rails) because the model has more training data ([13:13]); an unnamed YC founder hand-writes tests and lets the model write code until green ([2:04]); voice input via Aqua, a YC company ([14:15]).
- VP: compiler analogy and "forget the code exists but not that the product exists" ([4:09]); tech debt cannot be validated without reading code ([7:12]); fully non-technical people should not vibe-code a business ([11:14]).
- CC: `/clear` and `/compact` for context ([14:18]); prefer a well-known CLI over an MCP server ([13:16]); product-specific commands and models (expire).

## C. Real disagreements

- **Must you read the code?** DF and FK: yes, review critically and be able to explain every line. VP: no; verify an abstraction (tests, stress tests, observable inputs and outputs) and read only the core. The YC founder says "I don't need to micromanage my code bases" once tests are green ([2:04]). For a non-coder who directs the AI the practical reading is VP's, but only if the checks are real and the core parts (forms, auth, payments, scripts, secrets) get human or specialist review.
- **Is vibe coding acceptable?** DF: "a trap". YC and VP: yes with guardrails (plans, tests, version control, leaf-node focus). FK: only as "not vibe coding" (human reads). Use: prototypes may be loose; client-bound work goes through the gate.
- **Who should do it?** YC [4:05] suggests Replit or Lovable for people who have never coded; VP [11:14] says fully non-technical people building a business from scratch is dangerous because they cannot ask the right questions. Both agree prototypes are fine.
- **Who writes the tests?** An unnamed YC founder hand-writes tests; YC's partner and VP let the model write them (but VP reads them first). Reading: the human must understand the test cases, not necessarily type them.
- **Multi-agent.** FK runs at most two or three; CC mentions people running four; VP and DF do not discuss. Not needed in the lesson.

## D. Vendor and sponsorship check

- FK is a Warp sponsored video; cost and model advice is tool-specific.
- CC and VP are Anthropic's own talks about its product; the "task length doubling every seven months" claim in VP ([3:08]) is a vendor-cited trend and **not verified here** (no primary source fetched).
- YC names tools in which YC has stakes (Aqua).
- DF has a click-through promo at the end and uses unnamed anecdotes.

## E. Primary-source checks relevant to the lesson (fetched 11 Oct 2026)

- ◆ Automated audits are not the whole story: Chrome's Lighthouse accessibility scoring page says "Manual audits and low-impact / best-practices audits aren't included in the table because they don't affect your score." https://developer.chrome.com/docs/lighthouse/accessibility/scoring
- ◆ Lab tools differ from real-user data: web.dev "Why lab and field data can be different": "Tools that report lab data—data collected in a controlled environment with predefined device and network settings." and "Tools that report field data—data collected from the real users visiting your site." https://web.dev/articles/lab-and-field-data-differences
- Not verified: Kernighan's debugging quote used by DF; the claim that AI-generated apps leaked keys at scale (VP, anecdotal).

## F. Notes for the lesson

- The acceptance gate for a non-coder: (1) did the model write a plan and did I approve it? (2) are there checks I can run: Lighthouse, DevTools, keyboard walk-through, a forms test, a clickable path? (3) what changed since last commit? (4) are secrets and third-party scripts listed and justified? (5) can the model explain each decision on request?
- Ready phrases for the model (all authors agree): "Plan first, do not write code yet", "list files you will change", "if the plan is ambiguous give two options", "run the checks and show the output", "do not touch unrelated files", "commit after each step".
