# From Wireframe To Polished Web Design (UI Process)
- Source: Flux Academy (YouTube) · 2025-11-19 · 58 min · https://www.youtube.com/watch?v=UNjkPUhRg0s
- Speaker(s) and why they matter: Flux Academy instructor (unnamed in captions), a design educator giving a follow-along Figma tutorial; Flux sells courses and refers to its other videos and courses. Teaching tone, sound fundamentals, simple pricing-card example (a gym membership page, fictional "Family Athletic" company).
- Relevance to us: 3 · Freshness matters? process/principles timeless; Figma keyboard steps and AI "rename layers" are tool-dependent
- Notes: no sponsor segments; occasional course plugs. Long and mechanical (about 70% is click-by-click Figma instruction), so claims are few relative to length. Captions garble: "Intel" = Inter, "instrument sands" = Instrument Sans, "brown blue" = "brand blue", "human saturation" = hue/saturation, one color name ("Moment said bramble") is unintelligible. Example is a pricing section of an app/gym, not a travel page; no photography used. Our project rule: Stage 1 wireframes are grey and structural, so only the principles carry over to Stage 2.

## Core thesis
Turn a wireframe into a polished design in a fixed order: typography, then layout and spacing, then color, then a small design system, then graphical polish (icons, gradients, subtle shadows), then light and dark variants. Most of the improvement comes from better type, hierarchy, spacing and restrained color before any imagery or illustration.

## Claims and advice
- [P] Recommended process: 1) typography (fonts, type setting, hierarchy), 2) layout and spacing, 3) color, 4) establish a design system, 5) add graphical polish, 6) try light and dark mode. Recapped at 57:09. (5:08, 57:09) — practice
- [VIS-T] The default font (Inter) is fine but "audition" fonts by comparing two side by side; tighten letter spacing (about -3 on a big headline, -2 on smaller headers). (5:08-6:09, 9:14) — practice
- [VIS-T] Pick a headline font with character: used Instrument Sans (Google Font, free) in semi-condensed semibold for headlines and regular width for body; condensed all-caps with 20% extra tracking for the company wordmark because sports brands use condensed type. Result "legible and professional" but with "uniqueness" and personality. (6:09-7:09) — practice
- [VIS-T] Sizes in an 8-pixel system: body 18, column headers 48, main heading 96 (headline double the column header, header double the body); design at 100% zoom so sizes are judged realistically. (8:14-9:14) — practice
- [VIS-T] Typesetting details matter: make price formats consistent (space before "/month" the same in both). (10:15) — practice
- [VIS-L] Use a column grid (here 2 columns, 128 margin, 32 gutter, all divisible by 8) and match auto layout padding to the margin; group related items into units (title+heading gap 8); fill-container widths so cards align to the grid. (10:15-14:21) — practice
- [VIS-L][P] Layout is never finished after the first pass: return to spacing after type and color changes (card gap raised to 56, padding 40, list gap 8-12). Use the "split the difference" trick (try too much, too little, settle between). (35:41-36:43, 41:49) — practice
- [VIS-L] Fill dead space: let buttons span the card width; move the price to the top right of the card (horizontal auto layout, space-between), align on bottom baseline. (19:24-20:24) — practice
- [Q][VIS-L] A button should look like a button: pill radius (999), padding, semibold 24 px label, left-aligned like the rest, plus a circled arrow icon pushed to the right edge with matching padding. (21:25-22:25, 36:43-39:46) — practice
- [VIS-C] Accent color for the action: buttons are where you "really want to accent" so users know what to click. Brand color chosen by meaning: for a family sports product wanted safe, trustworthy, calming, heritage; blue fits (sports teams wear blue). (22:25-23:25) — opinion
- [VIS-C] Work in HSL, not RGB, when picking colors: adjust hue, saturation and lightness; his brand blue is H222 S67 L45. Check it still has enough contrast on white. (23:25-24:27) — practice
- [VIS-C] Tint neutrals with the brand hue: off-white background at hue 222, saturation 5, lightness 94 (not pure white or grey); cards at 99; off-black text 222/5/20 instead of pure black. Toggling saturation to 0 shows the difference. "These kind of details matter." (25:28-29:30) — practice
- [VIS-C] Lighter elements on top gives depth (light source logic): cards lighter than the page background; remove heavy black strokes once cards are separated by color because strokes pull focus in the hierarchy. (27:30-28:30) — practice
- [VIS-C] Complementary accent: take the brand blue, rotate hue by 180 degrees to get a gold (final about H42 S95 L41) for the premium individual plan, "this is gold, this is premium"; adjust until text on it is legible. (31:33-32:37) — practice
- [DS] Save colors and effects as styles or variables (brand blue, gold, gray text, card shadow) and keep a design-system page with names, heading styles, font width/weight/size/letter spacing. Keep styles and variables consistent. (24:27-36:43) — practice
- [VIS-M][VIS-L] Subtle depth: gradient from the top right corner (accent at very light 95 lightness fading to 0%), drop shadow (x 0, y 6, blur 16, black at about 5-10%) plus a 100% white inner shadow at the same offset to hint at light on top edge; "over the top intense drop shadows always look really amateur-ish". (44:54-51:02) — practice
- [VIS-I] Icons from a plugin (Feather icons) make lists more scannable: circled check icons as bullets in the accent color so they do not pull focus from the text; asterisks for conditions. (36:43-43:53) — practice
- [Q] Bright result with no photography or illustration: "we didn't need any of that" to make the information clear and give personality while professional and legible. (51:02-52:04, 57:09) — opinion
- [VIS-C][Q] Dark mode is not inversion: off-black (about 5% lightness, slightly blue) background; text off-white (99); cards lighter than background (about 10%); drop shadow black 100% and inner white shadow at 5%; reduce gradient opacity to about 15%. (51:02-56:08) — practice
- [Q][VIS-C] Avoid color-coded text in dark mode if contrast is poor ("coloring up type is not usually a good idea"): make headings off-white; low contrast is acceptable only for non-read elements such as ticks or strokes. (55:07-56:08) — practice
- [AI][TOOLS] Figma AI "rename layers" action tidies "Frame 1, Frame 2" names; a "split text" plugin separates pasted copy into text layers. (17:23-18:23, 0:00) — practice, tool-dependent

## Techniques and steps
1. Paste copy, split into layers, arrange as wireframe (two columns, titles, lines, 1440 frame).
2. Type: audition fonts, set headline, body, sizes in an 8 px system, letter spacing.
3. Layout: add column grid (margins 128, gutter 32), use auto layout with fill/hug, group units, balance dead space, return after each later step.
4. Color: choose brand hue by meaning, tint neutrals with same hue, off-black text, lighter cards, complementary accent for variant, check contrast.
5. Save styles/variables and a design-system page.
6. Polish: pill buttons with icon, bullet icons, soft gradient, subtle layered shadows.
7. Duplicate for dark mode and re-tune (no inversion), re-check contrast.

## Tools and resources
- Figma: auto layout, layout grids, styles, variables, effects (throughout); Figma AI rename layers (18:23)
- Split Text plugin (0:00)
- Instrument Sans (Google Fonts): headline and body (6:09)
- Feather Icons plugin: arrows and check icons (36:43)
- Flux Academy videos on typography, color, a 30-minute Figma crash course (referenced, not named)

## Quotes
- "Over the top intense drop shadows always look really amateur-ish." (49:00)
- "This is what design is all about and designers care about this stuff." (26:29, about tinting neutrals; close paraphrase)

## Disagreements and contrarian points
Against reaching for imagery or illustration to fix a flat design: fix type, spacing and hierarchy first. Against pure black/white and heavy strokes. Against color-coded text on dark backgrounds. No explicit clash with other known voices.

## For 1000 Islands
Directly useful as a Stage 2 checklist for the page chrome: choose type with character (not Inter) and tighten headline tracking; define a spacing system (8-px steps) and a column grid; tint neutrals toward a brand hue so photos sit on a warm off-white rather than pure white; off-black text, never #000; one accent color for CTAs chosen by meaning (e.g. sea blue/teal for trust and calm, warm sand/gold for premium tours); pill CTAs with arrow icon; subtle shadows only; check contrast especially for text over photos. Dark mode is not needed in our scope. Not relevant: pricing cards, gym content, gradients on cards unless used sparingly.

## Other
Gives a concrete numeric style reference (HSL values, 8-pt scale, shadow numbers) usable as defaults when prompting an AI to build the design tokens.
