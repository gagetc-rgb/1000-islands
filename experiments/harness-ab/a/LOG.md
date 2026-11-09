# Branch A log (Anthropic-style evaluator loop)

Evaluator: fresh general-purpose sub-agent each round, role file `.claude/agents/design-evaluator.md`, rubric `../rubric.md`. Generator: the main session. Budget: 3 rounds.

## Round 1 (15 Oct)
Evaluator on v0 copy: DQ 5 · OR 4 · CR 5 · FN 6 · weighted 4.8 · FAIL. Verdict: pivot (stock travel skeleton, generic tropical-boutique skin).
Change: full pivot to an "admiralty chart" world: chart-magenta dashed route line down the page with a waypoint per section; italic serif for water/place names, mono for coordinates; destinations as alternating editorial spreads with fact tables; steps as one typographic "legs" sequence; story + quote + rating merged into one proof block; trade rates link in hero; darker primary colour (magenta, white text >= 7:1); 44px+ tap targets; phone menu closes on tap, travel agents grouped apart; every link goes to an anchor or a labelled stub; text-wrap balance. Generator self-check found and fixed a route-line/waypoint misalignment.

## Round 2 (15 Oct)
Evaluator: DQ 7 · OR 6 · CR 6 · FN 6 · weighted 6.3 · FAIL (OR, CR, FN). Verdict: refine; route is decoration over a default skeleton, plus pixel and tap-target faults.
Change: route now drawn per section (lighter magenta #e05a9a on dark bands), starts below the header; logo moved onto the content column; waypoints anchored to their headings; "how it works" rebuilt as a vertical itinerary of four legs with mono leg data and a waypoint per leg on the route; schematic chart (real coordinates, positions only, no coastlines) added to "Where we go"; hero CTA and trade link moved under the lead, header CTA made an outline button; phone hero coordinates one region per line; .text-link and legal links min-height 44px; phone photos bleed edge to edge under the route; one term "travel agent" everywhere.

## Round 3 (15 Oct)
Evaluator: DQ 7 · OR 6 · CR 7 · FN 8 · weighted 6.8 · FAIL (OR; weighted). Verdict: refine; chart world is real but laid over a stock skeleton.
Change (last batch, budget reached): schematic chart now full content width (real coordinates; desktop and separate phone SVG with readable labels); Raja Ampat promoted to a full-bleed flagship spread with facts in a paper panel, North Sulawesi kept smaller (4:3); hero coordinates moved out of the heading stack to a bottom-right chart annotation; leg labels rewritten as short data, one line, grid 200/340/1fr, on phone shown after the text; "Start with an idea" now two columns with a mono data block (reply time, who answers, WhatsApp placeholder, form fields); compact sticky bar on scroll-up below the hero (Travel agents + Plan your trip); nbsp fixes for bad breaks; proof photo stretches to the copy column; slot labels pinned and truncated on phone.
Not done on purpose: the evaluator asked for a drawn route Bali → Manado → Sorong on the chart. Not drawn, because it would state an itinerary we do not know (no invented facts).
Score trend: 4.8 → 6.3 → 6.8 (plateau, as in Anthropic's post). Final state not re-scored inside the branch; it is scored at judging by a fresh evaluator, same as B.
