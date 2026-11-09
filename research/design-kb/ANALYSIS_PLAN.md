# Design KB: analysis plan

Goal: turn 97 sources (83 video transcripts, 14 Codrops studio articles; about 540k words) into a compact study reader, without losing anything important. Two uses: the owner's self-education as a web designer working with AI, and direct input for 1000 Islands Stage 2 (visual direction, moodboard).

## Method: extract, check, synthesize

1. **Extract (Sonnet, parallel).** Every source is read in full and turned into one digest with a fixed template (below). About 16 batches of 5-7 sources, grouped by theme. Output: `digests/<file name>.md`, 400-900 words each, about 60k words in total, small enough to work with in one context.
2. **Check (Opus).** Spot-check about 10% of digests against the transcripts (all Awwwards jury, Bierut, Nielsen, Krug, plus a random sample). Check that every codebook topic has sources. Read every "Other" section and add a topic if something recurring does not fit. Redo weak digests.
3. **Synthesize (Opus), one chapter per topic.** For each codebook topic: consensus, how top studios actually do it, disagreements (who vs who), step-by-step techniques and checklists, tools, best quotes, links with timestamps, and "what we take for 1000 Islands". Chapters together = the reader.
4. **Study and apply.** One chapter at a time, in the order below, each ending with one exercise on 1000 Islands. NotebookLM for follow-up questions with citations and an Audio Overview per chapter for listening.

Pilot first: 3 sources (one luminary talk, one AI workflow video, one moodboard video) to tune the template before the full run.

## Learning order (modules)

| # | Module | Codes | Why first / exercise |
|---|---|---|---|
| 1 | Process and working with a client: discovery, direction, structure, design, presentation, sign-offs | P, CL | Needed now for Stage 2. Exercise: write the 1000 Islands Stage 2 sequence. |
| 2 | Moodboards and art direction | MB | Next concrete deliverable. Exercise: 1000 Islands moodboard, 2-3 directions. |
| 3 | References and taste: where to look, how to borrow without copying, building a library | REF | Feeds module 2. Exercise: a reference library for travel/hospitality. |
| 4 | Visual craft: typography, color, imagery and photography, layout, motion, emotion and memorability, mobile | VIS-*, EMO, MOB | The substance of "good design". |
| 5 | What makes a site excellent: award jury criteria vs conversion vs usability | Q | Resolves the tension between "beautiful" and "works". |
| 6 | AI-era workflow: tools, DESIGN.md, prompting, AI imagery, design-to-code, avoiding AI slop, where human taste stays essential | AI, AIS | How we actually build. |
| 7 | Quality and testing: DIY usability testing, heuristics | TEST | Before launch. |
| 8 | Design systems (light) | DS | Later, if the site grows. |
| 9 | Studio business and culture (pricing, selling, teams) | BIZ | Optional. |

## Codebook (topic codes for tagging)

- **P**: process, stages, order of work (moodboard vs wireframes), deliverables, sign-offs
- **CL**: clients: briefs, presenting work, feedback, saying no, managing taste conflicts
- **MB**: moodboards, style tiles, art direction, number of directions, annotation
- **REF**: references, inspiration sources, taste-building, copying vs stealing well
- **VIS-T** typography · **VIS-C** color · **VIS-I** imagery and photography · **VIS-L** layout and grid · **VIS-M** motion and interaction
- **EMO**: emotion, storytelling, memorability, brand feeling
- **MOB**: mobile-specific design
- **Q**: quality criteria: awards, conversion, usability, performance, accessibility
- **AI**: AI tools and workflows (Claude, Codex, Figma, Framer, DESIGN.md, prompting, AI images/video)
- **AIS**: AI slop, sameness, where human judgment and taste matter
- **TEST**: usability testing and research
- **DS**: design systems, tokens
- **BIZ**: studio business, pricing, culture, team
- **TOOLS**: any named site, app or service (always also listed in the tools section)

## Digest template (one per source)

```
# <title>
- Source: <channel or site> · <date> · <length> · <URL>
- Speaker(s) and why they matter: <one line, include any commercial interest, e.g. sells a tool or course>
- Relevance to us: <1-5> · Freshness matters? <tool-dependent / timeless>
- Notes: <sponsor segments with timestamps to skip, garbled caption names to verify, anything that limits trust>

## Core thesis
2-3 sentences.

## Claims and advice
- [CODE] <claim, specific, with names and numbers kept> (<m:ss>) — type: practice | opinion | evidence
(as many as the source really has; dense sources 15-30, thin ones 3-5)

## Techniques and steps
Numbered how-to steps the speaker actually describes.

## Tools and resources
- <name>: what it is used for (<m:ss>)

## Quotes
Up to 3 short verbatim quotes with timestamps, only if they carry an idea.

## Disagreements and contrarian points
Where the speaker goes against common advice or against another known view.

## For 1000 Islands
Concrete takeaways for a photo-led travel site for an upper-middle audience, built as AI-assisted HTML. "None" is fine.

## Other
Anything notable that fits no code. Nothing gets dropped silently.
```

## Extraction rules

- Read the whole source, not the start. Keep specifics: names, numbers, sites, tools, sequences.
- Do not invent or smooth over. If the speaker is vague, say "vague". If the video is fluff or an ad, say so and keep the digest short.
- Timestamps come from the `[m:ss]` markers in the transcript; articles have none.
- Mark tool-dependent claims (model names, product features) so they can expire.
- Captions are auto-generated and garble product and person names (pilot: "Cloud Code" for Claude Code, "Lucid" for Lucide). Fix obvious ones, and flag uncertain names with "(verify)" instead of guessing.
- Skip sponsor reads; note them under Notes. Do not count ads as claims.
- Quote only short verbatim phrases; paraphrase the rest and label it as paraphrase.
- Long talks (60+ min, 10k+ words) get 20-30 claims; short videos 8-15. Digest length 500-900 words.
- Pilot (8 Oct): 3 digests in `digests/` (Louis Moss moodboards, DesignCode AI slop, Bierut on clients) confirmed the template.
- English throughout (data for LLMs). The final reader is English too unless the owner asks for Russian.

## Status (8 Oct 2026)

- Step 1 (extract) DONE: 97 digests in `digests/` (83 videos + 14 Codrops articles, about 103k words), one per source, same file name as the source. Written by Sonnet agents in 18 batches, 3 pilot digests by Opus.
- Step 2 (check) PARTLY DONE: all digests have the required sections; all timestamps lie inside the video length; spot check of one dense digest (Awwwards jury, ~10 claims) and of spoken numbers in three digests found no errors. Still to do: read the "Other" sections, read the ~10 digests rated 5 against transcripts, redo any weak one.
- Relevance given by the digests: 1 = 6, 2 = 27, 3 = 33, 4 = 23, 5 = 8. Chapters should be built from relevance 3-5 first (64 sources); 1-2 only for gaps.
- Flagged sources (off-topic or promotional, low weight): Geoco "What History Tells Us About AI Slop" and "AI Agent That Designs Like Me", Figma "Source Material" x3, Flux "What's really going on", Nielsen "UX 2050", DesignCode Aura demos (vendor bias), Malewicz course (mostly Figma clicks).
- Known tension to put in chapter 1: Bierut and Powerhouse (Build in Amsterdam) argue for presenting ONE concept; our Stage 2 plan is a 4-6 variant hero shotgun. Also Awwwards-style sites: Self-Made Web Designer recommends them, Jesse Showalter rejects them.
- Step 3 (chapters) NEXT: module 1 "Process and working with a client", then module 2 "Moodboards and art direction". Wait for the 5-hour limit to reset before starting.
