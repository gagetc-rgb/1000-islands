---
name: 1000 Islands owner guide (guide/index.html only)
description: Hand-drawn tech zine that teaches the Penpot review flow. Page-local system; NOT the 1000 Islands website design system.
colors:
  paper: "#FBFBF6"
  paper-dot: "#DEDED4"
  ink: "#141414"
  ink-2: "#45453F"
  ink-3: "#6B6B63"
  highlighter-yellow: "#FFE14D"
  highlighter-pink: "#FF7AB6"
  pink-ink: "#B0236A"
  pink-soft: "#FFD3E6"
  lagoon-teal: "#22C9B3"
  teal-ink: "#0B7468"
  teal-soft: "#C9F3EC"
  card-white: "#FFFFFF"
  fill-done: "#F2FBF9"
  fill-muted: "#F4F4EE"
typography:
  display:
    fontFamily: "Pangolin, 'Comic Sans MS', cursive"
    fontSize: "clamp(2.6rem, 6.2vw, 4.9rem)"
    fontWeight: 400
    lineHeight: 1.02
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Pangolin, 'Comic Sans MS', cursive"
    fontSize: "clamp(2rem, 4.6vw, 3.4rem)"
    fontWeight: 400
    lineHeight: 1.02
  title:
    fontFamily: "Pangolin, 'Comic Sans MS', cursive"
    fontSize: "clamp(1.3rem, 2vw, 1.6rem)"
    fontWeight: 400
    lineHeight: 1.1
  body:
    fontFamily: "'Golos Text', system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  lead:
    fontFamily: "'Golos Text', system-ui, sans-serif"
    fontSize: "clamp(1.12rem, 1.6vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Pangolin, 'Comic Sans MS', cursive"
    fontSize: "1.3rem"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "0.02em"
  note:
    fontFamily: "Caveat, 'Segoe Print', cursive"
    fontSize: "1.45rem"
    fontWeight: 700
    lineHeight: 1.3
rounded:
  wobble-card: "14px 10px 16px 9px / 10px 16px 9px 14px"
  wobble-button: "12px 9px 14px 8px / 9px 14px 8px 12px"
  sm: "6px"
  md: "10px"
  screen: "22px"
spacing:
  gutter: "clamp(16px, 4vw, 40px)"
  rope-lane: "92px"
  rope-lane-mobile: "46px"
  column: "41rem"
  section: "clamp(56px, 9vw, 112px)"
  card-gap: "22px"
components:
  button-primary:
    backgroundColor: "{colors.highlighter-yellow}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.wobble-button}"
    padding: "12px 26px"
    height: "56px"
  button-small:
    backgroundColor: "{colors.highlighter-yellow}"
    textColor: "{colors.ink}"
    rounded: "{rounded.wobble-button}"
    padding: "8px 16px"
    height: "44px"
  tab:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.wobble-button}"
    padding: "8px 16px"
    height: "44px"
  tab-selected:
    backgroundColor: "{colors.highlighter-yellow}"
    textColor: "{colors.ink}"
  card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.wobble-card}"
    padding: "22px"
  card-primary:
    backgroundColor: "{colors.teal-soft}"
    rounded: "{rounded.wobble-card}"
  step-done:
    backgroundColor: "{colors.fill-done}"
  margin-note:
    textColor: "{colors.pink-ink}"
    typography: "{typography.note}"
---

# Design System: 1000 Islands owner guide

> **Scope: this file describes `guide/index.html` only.** The hand-drawn zine world below is a one-off internal page (the owner's guide to the Penpot prototype). It is **not** the 1000 Islands Travel website's design system and must not be copied into site pages, the project-root `DESIGN.md`, or `.impeccable/design.json`. The site's visual identity is decided at Stage 2.

## Overview

**Creative North Star: "The Napkin Zine"**

A friend sketching the review flow on a napkin, photocopied into a tech zine: off-white paper with a faint dot grid, black marker ink, three highlighters (yellow, pink, lagoon teal). Every outline wobbles through one shared SVG turbulence filter, so nothing reads as a ruled box. Marker caps shout the headings, a calm sans carries the reading column, and handwritten margin notes talk back at the reader. A line-drawn elephant sits top-right; its trunk-line hangs down the right edge and is the page's scrollbar.

Density is relaxed: one reading column (41rem) with a sticky table of contents on wide screens, generous section breaks, cards laid out on a 6-column grid like comic panels. Play is functional: the phone demo teaches the six comment moves, the done-stamp tracks progress, the elephant celebrates completion.

**Key Characteristics:**
- Paper + ink + three highlighters; colour comes from highlighter marks, not panels.
- Wobbly hand-drawn outlines everywhere (one `#rough` displacement filter).
- Three voices: Pangolin caps (structure), Golos Text (reading), Caveat (asides).
- Depth is printed, not lit: drawn offset outlines and a halftone-dot offset layer.
- A working toy (elephant + rope scrollbar) instead of decoration.

## Colors

Photocopy paper and marker ink, lit by three highlighters.

### Primary
- **Highlighter Yellow** (`highlighter-yellow`): primary button fill, selected tab, text selection, the swipe under the H1 key word. The "do this" colour.

### Secondary
- **Highlighter Pink** (`highlighter-pink`): link hover, demo tap ripple, doodle arrows, step numbers. **Pink Ink** (`pink-ink`) is its text-safe shade for margin notes, the done-stamp, "copied" state and the elephant's speech. **Pink Soft** (`pink-soft`) fills stickers and the elephant's ear.

### Tertiary
- **Lagoon Teal** (`lagoon-teal`): link underlines, focus ring, comment pin, step number discs, squiggle rule, teal highlighter. **Teal Ink** (`teal-ink`) is its text-safe shade for notes, counters and the copy button. **Teal Soft** (`teal-soft`) fills the primary link card and copy-button hover.

### Neutral
- **Photocopy Paper** (`paper`) with a 22px **Paper Dot** grid (`paper-dot`): page ground.
- **Marker Ink** (`ink`): all outlines, headings, body text.
- **Ink 2 / Ink 3** (`ink-2`, `ink-3`): lead and card copy; counters and quiet labels. Both stay at or above 4.5:1 on every fill they sit on.
- **Card White**, **Done Mint** (`fill-done`), **Muted Paper** (`fill-muted`): card fills for default, completed step, and the "don't" column.

### Named Rules
**The Ink-Shade Rule.** Bright highlighter hues (yellow, pink, teal) are fills and strokes only; text in those families uses the ink shades (`pink-ink`, `teal-ink`).

## Typography

**Display Font:** Pangolin (with Comic Sans MS, cursive)
**Body Font:** Golos Text (with system-ui)
**Label/Mono Font:** Caveat for handwritten notes (with Segoe Print)

**Character:** Marker caps for every structural word, a clean Cyrillic-first sans for anything read at length, and a quick handwritten hand for asides. All three are self-hosted woff2, split Cyrillic/Latin.

### Hierarchy
- **Display** (Pangolin 400, uppercase): H1 only, with one highlighter swipe on its key word.
- **Headline** (Pangolin 400, uppercase): section H2s.
- **Title** (Pangolin 400, uppercase): card and step headings, FAQ summaries (1.15rem).
- **Body** (Golos Text 400): reading text; column capped at 41rem, lead at 36rem in `ink-2`.
- **Label** (Pangolin 400, uppercase, 0.02em): buttons, text links, tabs, TOC, stamps.
- **Note** (Caveat 700, 1.25 to 1.6rem): margin notes, captions, counters, the running head. Big Caveat numerals (3.6rem, pink) number the account steps.

### Named Rules
**The Three Voices Rule.** Pangolin structures, Golos explains, Caveat comments. Never set reading paragraphs in Pangolin or Caveat.

## Layout

Single column inside a gutter (`spacing.gutter`), with the right edge reserved as the rope lane (92px, 46px under 760px). At 1100px+ a 200px sticky TOC joins on the left, the active entry marked with a teal highlighter. The hero splits 1.35fr / 0.85fr at 900px+ (copy left, phone right). Card groups (links, steps) use a 6-column grid at 760px+ with uneven spans (4+2, 2+2+2, 3+3) to read as comic panels. Sections open with `spacing.section`; the top bar is sticky with a paper fade and leaves room for the elephant.

## Elevation & Depth

No light-based shadows on the page surface. Depth is printed: a second drawn outline offset behind buttons, and a halftone-dot offset layer behind the one or two most important cards per section. The only soft shadow lives inside the phone demo, imitating Penpot's comment bubble.

### Shadow Vocabulary
- **Drawn offset outline** (button `::after`: unfilled 2px ink outline, `translate(5px, 6px)`, rough filter): presses toward it on `:active`, pulls away on `:hover`.
- **Deep halftone layer** (`.deep::after`: ink outline filled with a 6px dot screen, `translate(8px, 9px)`, opacity .85): marks the lead card of a group only.
- **Demo bubble** (`0 10px 24px -8px rgba(20,20,20,.35)`): inside the phone mock only.

### Named Rules
**The One Deep Card Rule.** At most one deep halftone card per group (main link card, first step, the "do" column). Everything else stays flat-outlined.

## Shapes

Asymmetric elliptical radii (`wobble-card`, `wobble-button`) pushed through a fractal-noise displacement filter (baseFrequency .035, scale 2.6) so outlines look hand-inked. Strokes are 2px (cards) and 2.5px (buttons) ink. Image thumbnails and inner UI use calm 8 to 10px radii with a 1.5px ink border; the phone frame is a hand-drawn SVG path with a 22px screen. Dividers are 2px dashed. Doodles (arrows, ticks, squiggles) are inline SVG with round caps.

## Components

### Buttons
- **Shape:** wobble outline (`wobble-button`), 2.5px ink, rough filter.
- **Primary:** yellow fill, Pangolin caps 1.3rem, 56px min height; small variant 44px.
- **Hover / Active:** lifts (-1px, -2px) while the offset outline drops to (7px, 8px); active presses (3px, 4px). 0.25s `ease-out`.
- **Text link:** Pangolin caps with a hand-drawn teal underline SVG that turns pink on hover.
- **Copy button:** Caveat teal-ink text, teal-soft hover, flips to pink-ink "скопировано".

### Cards / Containers
- **Corner Style:** `wobble-card` via the rough outline pseudo-element.
- **Background:** `--fill` (white default; teal-soft for the main link; pale yellow for the prototype card; muted paper for "don't").
- **Shadow Strategy:** flat, or the deep halftone layer per the One Deep Card Rule.
- **Internal Padding:** 20 to 24px.

### Tabs
Rough-outlined Pangolin caps; selected tab fills yellow. Arrow-key navigation; platform preselected from the user agent.

### Navigation
Sticky top bar: brand in Pangolin caps + Caveat subtitle; Caveat running head shows the current section. Desktop TOC with Caveat counters and a teal swipe on the current entry.

### Highlighter swipe
Inline SVG blob (yellow / pink / teal at 70% opacity, with streak lines) behind a key word; draws in left to right (background-size 0 to 100%, 0.9s) when scrolled into view. One per heading.

### Margin note
Caveat 700 in pink-ink (or teal-ink) with a hand-drawn arrow SVG pointing at the target. Asides only, never instructions the reader needs.

### Phone demo
Doodled phone frame around a real prototype screenshot with a mock Penpot toolbar. A drawn finger loops the comment flow (icon, tap, type, Post, pin) with a pink tap ripple and a Caveat caption per step; runs only while visible, static under reduced motion. A pink-soft rough sticker sits on its corner.

### Step card with done-stamp
Comic-panel card with a teal numbered disc. The "done" toggle draws its tick (stroke-dashoffset, 0.4s); the card fills `fill-done` and a rotated pink-ink "готово" stamp slams from scale 1.6 to 1. State persists in localStorage; completing all six makes the elephant flap and speak.

### Elephant + rope scrollbar
Fixed line-drawn elephant (132px, 78px mobile) top-right, drawn in by a once-per-session loader. Its hanging line is a wavy SVG path to the viewport bottom carrying a pink knob (`role="scrollbar"`, keyboard operable) that tracks scroll progress and drags to scroll. The line is a damped pendulum (K 16, C 1.25): scroll acceleration, taps and Enter kick it; it settles to rest. Native scrollbar hidden. Clicking the elephant flaps its ear.

## Do's and Don'ts

### Do:
- **Do** run every outline through the shared rough filter with a wobble radius.
- **Do** keep text in ink, ink-2, ink-3 or the ink shades of pink/teal; check 4.5:1 on each fill.
- **Do** use one highlighter swipe per heading, on the word that carries the meaning.
- **Do** give every animation a reduced-motion state (swipes shown full, demo static, loader and finger removed, pendulum off).
- **Do** use `ease-out` (`cubic-bezier(.16,1,.3,1)`) for all transitions.

### Don't:
- **Don't** use this system on the 1000 Islands website or promote it to the project-root DESIGN.md.
- **Don't** add eyebrow or kicker labels above headings; put the information in the heading, lead, or a margin note beside the content.
- **Don't** use soft drop shadows on page surfaces; depth is offset outline or halftone.
- **Don't** set reading text in Pangolin or Caveat.
