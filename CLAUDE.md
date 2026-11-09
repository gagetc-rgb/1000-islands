# 1000 Islands Travel — project rules

## Design workflow (adopted 2026-10-02)

**Quality gate: Impeccable detector.**
- The design hook (`.claude/settings.local.json`) scans every Edit/Write on UI files and does a deep pass at the end of each turn. Act on its findings.
- Before showing anything to the owner, run `.claude/skills/impeccable/scripts/impeccable detect wireframes/` — it must exit 0.
- Fix real findings. Only a confident false positive gets an ignore, and only the narrowest one, via `impeccable hooks ignore-value <rule> <value> --reason "..."` (never `ignore-file` to push a change through). Disclose every new ignore.
- Active ignore: `overused-font=inter` — Stage 1 wireframes only. Remove it when the brand typeface is chosen.
- A clean scan is not proof of good design; it only removes the mechanical AI tells.

**House bans (from the detector + craft floor):** no eyebrow/kicker labels above headings (put the info into the heading or lead), no skipped heading levels, secondary grey text ≥4.5:1 on every background it sits on, em-dashes rare in visible copy.

**Stages and skills:**
1. Stage 1 — low-fi wireframes (current): grey, structure and copy only. No visual-direction skills.
2. Stage 2 — visual direction: `/impeccable init` (writes PRODUCT.md from the strategy/UX docs) → `/design-taste-frontend` once to set direction → `/prototype` "shotgun": 4–6 HTML variants of the hero, each forced onto a different direction and reference (no near-duplicates) → owner picks → `/impeccable critique` / `polish`.
3. Motion — only when explicitly working on animation: `/animate`, `/review-animations`, `/improve-animations`, `/gsap-scrolltrigger` and other `/gsap-*`. These are manual-only skills (`disable-model-invocation: true`); never pull them in during ordinary page work.

**Deliberately not used:** gstack `/design-shotgun` (needs a paid OpenAI key + Bun, outputs PNG, not HTML), UI/UX Pro Max (industry-template palettes), video motion-graphics packs (only if a promo video is ever needed — then install one pack, not all).

HTML stays the source of truth (see memory: no paid Figma).

## Talking to the owner (fixed 2026-10-08)

- Everything for the owner that is not website copy is in Russian: guide, Penpot covers and notes, messages, questions.
- Address the owner as **«ты»** everywhere, in every document. No «вы» anywhere, so documents never disagree.
- The owner (and anyone he shows things to) is a native Russian speaker living abroad and fluent in English. Russian is out of respect, not need: no translations of English words, no "it's in English, that's fine" disclaimers. Professional English terms (Hero, Start, Fill, Post, page names) stay as they are.
- The website itself stays in English: that is his order.
