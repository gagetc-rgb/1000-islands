---
name: 1000 Islands Travel
description: Remote Indonesia. A modern expedition operator, played straight.
colors:
  ocean-ink: "#0d2229"
  ink-muted: "#44575d"
  on-ink: "#ffffff"
  on-ink-muted: "#b9c9cd"
  slot-caption: "#dce8ea"
  paper: "#ffffff"
  sea-grey-band: "#edf2f2"
  sea-grey-rule: "#c9d5d6"
  rule-on-ink: "rgba(255,255,255,.18)"
  vest-yellow: "#f5c518"
  vest-yellow-press: "#e2b20c"
  slot-deep: "#12303a"
  slot-sea: "#1d3a44"
  slot-karst: "#2c463f"
  slot-volcano: "#3a3c3f"
  slot-hull: "#2f3a4a"
typography:
  display:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(46px, 7.2vw, 96px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  headline:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.4vw, 58px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  title-place:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(30px, 3vw, 40px)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  title:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "24px"
    fontWeight: 750
    lineHeight: 1.15
    letterSpacing: "-0.02em"
    fontVariation: "\"wdth\" 112"
  quote:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "clamp(28px, 2.6vw, 36px)"
    fontWeight: 650
    lineHeight: 1.4
    letterSpacing: "-0.01em"
    fontVariation: "\"wdth\" 104"
  lead:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.6
  body:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 700
    lineHeight: 1.6
    fontFeature: "\"tnum\""
  caption:
    fontFamily: "Archivo, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    letterSpacing: "0.02em"
    fontFeature: "\"tnum\""
rounded:
  none: "0px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.vest-yellow}"
    textColor: "{colors.ocean-ink}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-primary-hover:
    backgroundColor: "{colors.vest-yellow-press}"
    textColor: "{colors.ocean-ink}"
  button-line:
    backgroundColor: "transparent"
    textColor: "currentColor"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "48px"
  button-line-hover:
    backgroundColor: "{colors.ocean-ink}"
    textColor: "{colors.on-ink}"
  button-line-on-ink-hover:
    backgroundColor: "{colors.on-ink}"
    textColor: "{colors.ocean-ink}"
  site-header:
    backgroundColor: "{colors.ocean-ink}"
    textColor: "{colors.on-ink}"
    height: "76px"
  nav-cta:
    backgroundColor: "{colors.vest-yellow}"
    textColor: "{colors.ocean-ink}"
    rounded: "{rounded.none}"
    padding: "0 16px"
    height: "44px"
  phone-action-bar:
    backgroundColor: "{colors.ocean-ink}"
    padding: "8px 16px"
  photo-slot:
    backgroundColor: "{colors.slot-sea}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.none}"
    padding: "16px"
  band-section:
    backgroundColor: "{colors.sea-grey-band}"
    textColor: "{colors.ocean-ink}"
    padding: "128px 0"
  ink-section:
    backgroundColor: "{colors.ocean-ink}"
    textColor: "{colors.on-ink}"
    padding: "128px 0"
---

# Design System: 1000 Islands Travel

## Overview

**Creative North Star: "The Passage Plan"**

A modern expedition operator, played straight. The page reads like a skipper's passage plan: deep ocean ink bands carry the arrival (hero), the guest story and the footer; content sits on cool white with a pale sea-grey band between; every journey is drawn as one measured line with square stops. Nothing is decorated. Structure comes from heavy, slightly wide type, hairline sea-grey rules and long ink lines, never from boxes.

Density is calm and generous: sections breathe on a 128px vertical rhythm, two-column asymmetric grids (roughly 1.2 to 1.6 against 1) put a large photo slot beside short copy. Kayak and life-vest yellow appears only where the visitor can act, focus or select, always with ink text on it, so on any screen the yellow is the answer to "what do I press".

The world explicitly rejects the boutique-template look: no serif display, no sand and coral, no rounded cards, no numbered-circle steps, no three equal review boxes.

**Key Characteristics:**
- Ocean ink fields for hero, story and footer; cool white and a pale sea-grey band for content.
- Vest yellow reserved for actions, focus and selection, always with ink text.
- One grotesque family (Archivo) on its width axis: heavy and slightly wide for display, plain for body.
- Square corners everywhere; hairline rules instead of card boxes.
- Journeys and process drawn as measured lines with square stops (route line, step line).
- Photo slots are flat place tones with a caption naming the shot; coordinates in tabular figures.

## Colors

A cold, maritime palette: deep ocean ink and sea-greys, with one hot safety-yellow accent.

### Primary
- **Kayak Vest Yellow** (vest-yellow): the only accent. Primary buttons ("Plan your trip", "Become a partner"), the skip link, text selection, and the focus outline on ink surfaces. Text on it is always ocean ink.
- **Pressed Vest Yellow** (vest-yellow-press): hover and press state of yellow buttons only.

### Neutral
- **Deep Ocean Ink** (ocean-ink): body text on light surfaces, the sticky header, story band, footer, phone action bar, route and step lines, focus outline on light surfaces.
- **Ink Muted** (ink-muted): secondary text on paper and on the sea-grey band (leads, place lists, step copy, figcaptions, route leg times). Holds at least 4.5:1 on both.
- **On-Ink White** (on-ink): primary text on ink and on photo slots.
- **On-Ink Muted** (on-ink-muted): secondary text on ink (header descriptor, story meta and body, footer links).
- **Slot Caption Mist** (slot-caption): photo-slot captions and the hero advisor line, over dark slot tones.
- **Paper** (paper): the default content surface; also the hollow fill of route and step stops.
- **Sea-Grey Band** (sea-grey-band): alternating content band (yacht charters, travel agents).
- **Sea-Grey Rule** (sea-grey-rule): hairline dividers on light surfaces (secondary reviews, mobile menu rows).
- **Rule on Ink** (rule-on-ink): hairlines on ink (header edge after the hero, advisor line, nav divider, footer legal row).

### Tertiary: place tones (photo slots only)
- **Deep Slot** (slot-deep): hero slot and hero background.
- **Sea** (slot-sea): default slot.
- **Karst** (slot-karst): limestone-island shots and the guest-story slot.
- **Volcano** (slot-volcano): volcanic shots.
- **Hull** (slot-hull): boat and phinisi shots.

### Named Rules
**The Life Vest Rule.** Yellow means "act here". It is used only for actions, focus and selection, and always carries ocean-ink text. Never yellow headlines, borders, icons, tints or backgrounds of content.

**The Two Waters Rule.** A surface is either ink (hero, story, footer, header, phone bar) or light (paper, sea-grey band). No third surface colour and no gradients between them; the one gradient in the system is the legibility scrim over the hero photo slot.

## Typography

**Display Font:** Archivo, width axis 112 to 115 (with system-ui, sans-serif)
**Body Font:** Archivo, width 100 (with system-ui, sans-serif)

**Character:** One grotesque doing two jobs: set heavy and slightly stretched it reads like hull lettering on an expedition boat; set plain at body size it disappears into clear, practical copy.

### Hierarchy
- **Display** (800, clamp 46 to 96px, 1.04, wdth 112): the hero headline only, bottom-left over the hero slot.
- **Headline** (800, clamp 34 to 58px, 1.04, wdth 112): section titles. The closing enquiry section uses the Display size instead, as the page's second loud moment.
- **Title, place** (800, clamp 30 to 40px): destination names under their photo slots.
- **Title** (750, 24px, 1.15): step names and other minor headings.
- **Quote** (650, clamp 28 to 36px, 1.4, wdth 104): the leading guest review and the advisor promise in the trade section. Secondary reviews drop to 600 at 24px, 1.35.
- **Lead** (400, 19px, 1.6, max 36em): section intros, in ink-muted (on-ink-muted on ink). The hero sub-line uses the lead size (17px on phones) in full on-ink.
- **Body** (400, 17px, 1.6, every width): running copy.
- **Label** (600 to 700, 15px): navigation, route stop names, rating, figcaptions, prices use the lead size (19px, 700).
- **Caption** (400, 13px, tabular figures): photo-slot captions and coordinates.

### Named Rules
**The One Family Rule.** Archivo only. Emphasis comes from weight and width (wdth 100 to 115), never from a second family or italics.

**The Tabular Figures Rule.** Anything that is a measurement (hours, coordinates, ratings, review counts) uses tabular figures.

## Layout

Single container (max 1240px, 24px side padding; 16px under 520px). Sections stack on a 128px vertical rhythm (64px under 960px). Spacing uses a 4px-based scale (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).

Grids are two-column and asymmetric: photo and copy at about 1.6:1 (yachts), 1.25:1 (story), 1.2:1 (trade), 1.5:1 (reviews); destinations sit as an equal pair. Everything collapses to one column at 960px. The hero fills 100svh with copy anchored bottom-left. The header is fixed, solid ink and 76px tall; anchor jumps are offset by the header height.

Breakpoints: 1240px (nav tightens), 1100px (nav becomes a Menu disclosure, so the header never wraps), 960px (single column, step line turns vertical, phone action bar appears), 520px (tighter gutter, hero actions stretch full width).

## Elevation & Depth

Flat. Depth is conveyed by tone (ink bands against light bands) and by the hero scrim, not by lifted surfaces. Two shadows exist and both are functional: a 1px hairline under the header once the hero has scrolled past (drawn as a box-shadow so it adds no height), and one soft drop under the phone Menu panel, the only element that floats over content.

### Shadow Vocabulary
- **Header hairline** (`box-shadow: 0 1px 0 rgba(255,255,255,.18)`): appears after the hero leaves the viewport or the menu opens.
- **Floating menu** (`box-shadow: 0 16px 40px rgba(13,34,41,.25)`): the phone Menu panel only.

### Named Rules
**The Flat Water Rule.** Content never floats. A shadow is allowed only on an element that genuinely overlays the page (the open menu); everything else separates by tone or a hairline.

## Shapes

Square corners throughout (0px): buttons, menu toggle, photo slots, route stops, step stops. Lines are the form language: 2px ink lines for journeys and the reviews top edge, 1px hairlines for secondary dividers, 2px currentColor borders for outline buttons. Stops on a line are 12px squares with a 2px ink border: hollow (paper fill) for the start and middle, solid ink for the destination.

## Components

### Buttons
Blunt, full-weight, square.
- **Shape:** square (0px), minimum 48px tall (44px in the desktop nav), 24px side padding (12px in the phone bar), 15px Archivo 700, letter-spacing .01em.
- **Primary:** vest yellow with ocean-ink text. Hover deepens to pressed yellow.
- **Line:** transparent with a 2px currentColor border. On light surfaces hover fills ink with white text; on ink and over the hero it fills white with ink text.
- **Focus:** 3px outline, 3px offset; ink on light surfaces, vest yellow on ink.
- **Text link:** 700, underlined (offset 4px, 1.5px thick), trailing 20px arrow icon, min 44px tall.
- Transitions: background, colour and border at .2s; none under reduced motion.

### Navigation
- **Desktop:** fixed solid ink header, 76px. Wordmark "1000 Islands Travel" (19px, 800, wdth 115, never wraps) over the descriptor "Remote Indonesia" (13px, on-ink-muted). Links 15px 600, no underline until hover. "Travel agents" is set apart by a 1px rule-on-ink divider; "Plan your trip" is the yellow nav button.
- **Under 1100px:** links collapse into a native disclosure "Menu" (square, 2px on-ink border) whose label reads "Close" while open. The open panel is paper with ink text, rows divided by sea-grey hairlines, min 44px rows, and closes on Escape, link tap or a tap outside.

### Phone Action Bar
Ink bar fixed to the bottom on phones with two equal buttons (yellow "Plan your trip", white line "WhatsApp"). It slides in (.3s, cubic-bezier(.2,.8,.2,1)) only after the hero has scrolled out and hides again over the closing enquiry section and the footer. Respects the safe-area inset.

### Route Line (signature)
How you get there, drawn as one line: gateway stop, flight leg, gateway-city stop, boat leg, destination stop. Flight legs are a solid 2px ink line, boat legs a 2px dashed ink line; each leg carries a plane or boat icon and the hours (tabular, ink-muted) above it, with stop names (700, ink) below. Hours stay placeholders ("X h") until confirmed.

### Step Line (signature)
"Made easy" as four stops on one measured 2px ink line, horizontal on desktop, vertical on phones. Same 12px square stops as the route line, final stop solid. Each stop: a 24px title and a body-size ink-muted line. No numbers, no circles.

### Photo Slots
Labelled placeholders until real photos arrive. A flat place tone (sea, karst, volcano, hull, deep) with a caption bottom-left (13px, camera icon, "Photo slot · what the shot is"); destination and story slots add coordinates top-left in tabular figures. Aspect ratios: 5:4 destinations, 16:10 yacht, 4:3 story; the hero slot is full-bleed with its caption top-right below the header and an ink scrim (top and bottom) for headline legibility.

### Reviews
One voice leads: a large quote spans two rows on the left, two smaller quotes stack on the right separated by a sea-grey hairline. The group opens with a 2px ink rule; no boxes, no stars per quote. The aggregate rating (star icon, tabular "X.X", "XX reviews" in ink-muted) sits opposite the heading.

### Footer
Ink band, on-ink-muted 15px text. Wordmark column plus four link columns (two columns on phones), column heads as 15px 700 white headings, links underline on hover. A rule-on-ink hairline separates the legal row (13px). A rule-on-ink hairline also separates the footer from the ink closing section above it.

## Do's and Don'ts

### Do:
- **Do** keep vest yellow for actions, focus and selection only, always with ocean-ink text.
- **Do** keep every corner square (0px), including photo slots and stops.
- **Do** separate content with tone bands and hairlines, never boxes.
- **Do** draw sequences (journeys, process) as one measured ink line with 12px square stops, last stop solid.
- **Do** caption every photo slot with the place and the shot until the real photo lands; give it its place tone.
- **Do** keep placeholders (X years, $X,XXX, X h, X.X, XX reviews) visible until the owner confirms the figures.
- **Do** set measurements in tabular figures.
- **Do** keep secondary text at ink-muted on light surfaces and on-ink-muted on ink, at 4.5:1 or better.

### Don't:
- **Don't** use a serif display face, sand and coral, rounded cards, numbered-circle steps or three equal review boxes.
- **Don't** put yellow on headings, borders, icons, tints or large surfaces.
- **Don't** put a card box (border, fill or shadow) around content blocks.
- **Don't** add shadows to anything that does not genuinely overlay the page.
- **Don't** add a second type family or italics; vary weight and width instead.
- **Don't** add eyebrow or kicker labels above headings; put that information in the heading or the lead.

## Revision, round 2 (15 Oct 2026)

- The closing enquiry section is now an ink field. The heading sits at Display size on the left, and the lead and actions are bottom-aligned on the right. The words are unchanged.
- The travel-agents section is presentation only, with the same words. A 2px ink rule opens the grid, the advisor promise is set in the Quote role, and the three facts are rows divided by sea-grey hairlines.
- Destinations are `article`s whose heading is the stretched link, with a visible "See <place>" text link. The guest-story slot no longer repeats the Raja Ampat coordinates.
- The phone action bar is a `nav`, `inert` and hidden from assistive tech while it is off screen.
