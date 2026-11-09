# Prompt for the parallel session (Branch B, Impeccable)

Paste everything below the line into a new Claude Code session opened in `C:\Users\Kirill\Desktop\1000 islands`.

---

We are running an A/B experiment; read `experiments/harness-ab/PROTOCOL.md` first and follow its fixed inputs and budget.

You are Branch B. Improve the page `experiments/harness-ab/b/index.html` using Impeccable only:

1. Start the preview server `harness-ab` from `.claude/launch.json` (port 5200); the page is http://localhost:5200/b/index.html.
2. Round 1: run `/impeccable critique experiments/harness-ab/b/index.html`. Let it run its two isolated assessments and the detector, and ask me its questions. Then apply what it recommends (`/impeccable polish` or the specific commands it suggests: `bolder`, `typeset`, `layout`, `colorize`, etc.).
3. Rounds 2 and 3: critique again and apply again. Maximum 3 rounds in total; stop earlier if the critique has nothing material left.

Rules:
- Edit only files inside `experiments/harness-ab/b/`. Never touch `v0/`, `a/`, the wireframes or any other project file. If Impeccable wants to write PRODUCT.md or DESIGN.md, it may read the existing root `PRODUCT.md` but must not change it.
- No photos exist: keep the labelled photo slots; no stock or AI-generated images.
- No invented facts, numbers or reviews; placeholders like `X years` and `$X,XXX` stay.
- Keep the Home content and section order; the visual direction is free.
- After each round append to `experiments/harness-ab/b/LOG.md`: round number, Impeccable's score and top issues, what you changed, minutes spent, and whether you answered questions or skipped them.
- At the end run `node experiments/harness-ab/shoot.cjs b final` and tell me it is done. Do not compare with Branch A; judging happens separately.
