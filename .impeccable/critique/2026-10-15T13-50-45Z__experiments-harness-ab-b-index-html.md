---
target: experiments/harness-ab/b/index.html
total_score: 23
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
target_identity: "file:C:\\Users\\Kirill\\Desktop\\1000 islands\\experiments\\harness-ab\\b\\index.html"
target_fingerprint: "sha256:86b2da80a6a70e0c8c2f5f98374ab87bb51617c31b5f5315b8945d62361e26d4"
target_path: "C:\\Users\\Kirill\\Desktop\\1000 islands\\experiments\\harness-ab\\b\\index.html"
timestamp: 2026-10-15T13-50-45Z
slug: experiments-harness-ab-b-index-html
---
Method: dual-agent (A: design review, B: detector + browser)

## Design Health: 23/32 (72%, Good). n/a: 7, 10
|1 Visibility|3|no active section, Menu label never becomes Close|
|2 Match|3|"Your gateway", "phinisi", "Comfort level" unexplained|
|3 Control|3|no outside-tap close on menu|
|4 Consistency|3|destination blocks are whole-card links with no visible affordance vs yacht text link|
|5 Error prevention|3|-|
|6 Recognition|3|Comfort level tier never introduced|
|8 Aesthetic|3|disciplined; story + close thin|
|9 Recovery|2|hidden phone bar still focusable|

## Specificity
Partly authored: route line + step line are product-specific; hero and close are category canon (ink, heavy wide grotesque, yellow button, centred close). Faithful to b/DESIGN.md.
Detector: exit 0, 0 anti-patterns. 7 advisories: 6 font sizes off DESIGN.md ramp (16/18/20/21/14/76px) = real drift; Menu border rgb(0,0,0) = FP (currentColor). Overlay at 390: 7 text-occlusion FPs (closed <details> links). Contrast min 6.72:1. Tap: FAQ 30px, Email 38px wide; advisor link 42px tall.

## Priority issues
1. [P1] Header breaks 961-1010px (logo + nav wrap to 2 lines). -> adapt
2. [P1] Advisor credibility layer thin: no licence/association slot, named contact, commission-vs-net, client-protection mechanics. Labelled placeholder slots inside trade section. -> clarify
3. [P2] Destination blocks are giant links; SR name starts with coords + "Photo slot"; no visible go affordance. Stretched h3 link + "Explore ->". -> harden
4. [P2] Close does not land: no "what happens next", flat white centred. -> bolder/clarify
5. [P3] Phone bar hidden only by translateY (focusable), aria-label on div, wraps at 320. -> harden

## Personas
Jordan: "Your gateway" ambiguous. Riley: header 961-1010, focusable hidden bar. Casey: good; 96px dead footer padding. Advisor: nothing to verify after the hero door.

## Minor
Type sizes off ramp; story coords duplicate Raja Ampat; favicon 404; both nav destinations -> #where.
