# Harness A/B: Anthropic-style evaluator loop vs Impeccable

Started 15 Oct 2026. Internal experiment, never shown to the owner.

## Question

Same starting page, two ways of improving it. Which process gives the better page for the same effort?

- **Branch A, Anthropic-style loop** (after "Harness design for long-running application development", Anthropic Engineering, 24 Mar 2026): a separate evaluator agent opens the live page in a browser, scores it on four criteria against a written rubric with anchors (`rubric.md`), writes a critique; the generator refines or pivots; repeat. No human in the loop until the end.
- **Branch B, Impeccable**: `/impeccable critique` (two isolated sub-agents + detector + questions to the human) then `/impeccable polish` or the commands the critique suggests. Human answers Impeccable's questions.

## Fixed inputs (same for both)

- Start page: `v0/index.html`, built once in one shot from `PRODUCT.md` and the Home structure in `wireframes/home.html`, with no design skill and no rubric. **v0 is frozen; never edit it.**
- Photos: none exist yet. Every image is a labelled photo slot. Judges are told so; nobody may add stock photos or AI images (that would change the test).
- Copy and facts: no invented numbers, reviews or claims. Unknown facts stay as visible placeholders (`X years`, `$X,XXX`).
- Content and section order of Home stay as in the wireframe (hero, where we go, yachts, made easy, guest story, reviews, travel agents, start with an idea, footer). Visual direction is free.
- Viewports: desktop 1440x900, phone 390x844. Screenshots via `shoot.cjs`.

## Budget (keeps it fair)

- At most **3 improvement rounds** per branch. One round = one evaluation + one batch of edits.
- Each branch edits only its own folder: A edits `a/`, B edits `b/`.
- Log every round in the branch's `LOG.md`: what the evaluator said (scores or summary), what was changed, time spent.

## Judging (after both branches finish)

1. Screenshots of `v0`, `a`, `b` at both viewports (`node shoot.cjs`).
2. Blind pairwise comparison: `compare.html` shows A and B as "Left/Right" in random order. The user picks, then the order is revealed.
3. Secondary signals, reported, not decisive: rubric scores from a fresh evaluator that saw neither process; `impeccable detect` findings count; fit/overlap checks.

## Run

```
python -m http.server 5200 --directory experiments/harness-ab
node experiments/harness-ab/shoot.cjs v0,a,b
```

## Decisions during the run

- 15 Oct: Branch A acts only on its own evaluator's critique. The project's Impeccable hook still prints detector findings on every edit of `a/`; they are deliberately not acted on (acting on them would hand A Branch B's tool). The detector count is reported at judging as a secondary signal.
- 15 Oct: v0 detector findings are silenced for `v0/index.html` only (file-scoped ignores in `.impeccable/config.json`), because v0 is a frozen fixture.

## Results (judged 16 Oct 2026)

Blind copies: `x/` = B, `y/` = A (random draw; key known only to the orchestrating session). Both judges were fresh agents that opened only x/, y/, the rubric/PRODUCT.md and their own screenshots.

| Signal | A (evaluator loop) | B (Impeccable) |
|---|---|---|
| Blind pairwise judge (no rubric) | **winner**, 7.5/10 | 6.5/10 · margin "clear", preference 70% |
| Blind rubric judge (rubric.md, A's own criteria) | **7.5 weighted** (DQ8 OR8 CR6 FN7), fail on CR | 5.8 (DQ6 OR5 CR7 FN6) |
| `impeccable detect` | 9 findings (+1 advisory), several likely contrast false positives | 0 (B was tuned against this detector) |
| Tokens, input-equivalent* | ~1.7M (main 1.31M + evaluators 0.38M) | ~5.9M (main 3.98M + subagents 1.92M), **~3.5x A** |
| Wall clock | ~20 min, no human | ~3 h 10 min incl. human answers |

*input-equivalent = input + 1.25 x cache write + 0.1 x cache read + 5 x output (relative cost index, not a price).

Both judges agree: A has the stronger identity and layout for photography; B has better phone conversion mechanics (sticky bar, fixed header, robust menu) and cleaner phone craft, but reads as a generic bold-sans template and leaves key CTAs as `href="#"`.

Caveats: one run per branch; judges are the same model family as A's evaluator (possible shared taste); the rubric judge scores on A's home criteria; B's direction was steered by human answers ("expedition, no serif", then "category canon"), which pushed it toward a generic look.

### Decision (user, 16 Oct 2026, after clicking both pages, not blind)

**B wins.** Deciding reason: A has no always-visible navigation or main action. Its header scrolls away and the compact bar only appears on scroll-up; after three rounds the loop never made "next step always in view" a requirement. B has a fixed header plus a phone bottom bar, by default.
Lesson: the evaluator loop is only as good as its rubric. `rubric.md` had no hard rule for persistent navigation/CTA, so neither the evaluator nor the judges weighted it enough. Impeccable carries such conventions built in. If the loop is used again, its rubric must include the project's craft floor (persistent nav and CTA, mobile sticky bar rules, no `href="#"`).
