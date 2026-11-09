---
target: experiments/harness-ab/b/index.html
total_score: 20
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 3
target_identity: "file:C:\\Users\\Kirill\\Desktop\\1000 islands\\experiments\\harness-ab\\b\\index.html"
target_fingerprint: "sha256:67ec039da096e18b4ceadfc6ef15faab57c4c255ffde1b0cf798efb45f2b440f"
target_path: "C:\\Users\\Kirill\\Desktop\\1000 islands\\experiments\\harness-ab\\b\\index.html"
timestamp: 2026-10-15T13-09-28Z
slug: experiments-harness-ab-b-index-html
---
Method: dual-agent (A: design review, B: detector + browser)

## Design Health: 20/32 (63%, Acceptable). n/a: 7, 10 (Persuade landing page)
| # | Heuristic | Score | Key issue |
|1|Visibility of status|2|Header position:absolute; nav + Plan your trip vanish after hero|
|2|Match real world|3|"Comfort", "phinisi", "pp" unexplained|
|3|User control|2|Mobile details menu stays open after tap|
|4|Consistency|3|Two nav items -> same #where; 3 labels for advisor path|
|5|Error prevention|2|Dest cards, Read the story, final CTA href="#"|
|6|Recognition|3|-|
|7|Flexibility|n/a|landing|
|8|Aesthetic|3|clean but monotone|
|9|Error recovery|2|dead links fail silently|
|10|Help|n/a|FAQ in footer|

## Specificity
Category-interchangeable: Cormorant serif + Manrope, sea/sand/coral, pill buttons, numbered step cards, 3 equal review cards. "Off the map" has no visual device (no map/route/travel time). Serif leans luxury vs upper-middle.
Detector: 17 CLI findings. Real: white on coral #d9734e 3.2:1 (x5), hover #c4623f 4.1:1 (x5). FP: white on #fbf9f5 x5 (hero bg is dark gradient, real 6.2:1+), tight-leading 1.28 (rounding). Debatable: cream-palette #fbf9f5, overlay cyan-gradient on photo placeholders. 21/31 tap targets <44px at 390.

## Priority issues
1. [P1] No visual signature for "remote / off the map"; 5 identical teal slabs. Fix: one route/map device + travel times/coords, varied slot proportions. -> bolder
2. [P1] Coral CTAs 3.2:1. Fix: darker coral ~#b0502c or ink text. -> colorize/audit
3. [P1] Advisors (#1 audience) and main CTA disappear: non-sticky header, trade box at 80% scroll, no mobile bar. Fix: sticky compact header, quiet hero advisor line, mobile bottom bar. -> layout
4. [P2] Eyebrow "Guest story · Comfort · 9 days" above h2 (house ban). -> typeset/clarify
5. [P2] Template sections: step cards, 3 equal review cards. -> distill + layout

## Personas
Jordan: where/how far is Raja Ampat? Casey: tap targets 21-26px, 100vh, no persistent CTA. Advisor: nothing above fold for them, faceless "own team", partner benefits unstated.

## Minor
Footer h2 labels, inline styles, no prefers-reduced-motion, no skip link, Cormorant 23px quotes fragile on phone.

## Questions
Could the page sell "remote" without photos? Does it need a serif? Second quieter door for advisors in hero?
