# Cross-check 3: responsive layout and modern CSS (NotebookLM, 11 Oct 2026)

Sources: Kevin Powell, Chrome for Developers (10 modern layouts), Josh Comeau (9elements talk), midulive (es), Vladilen Minin (ru, English auto-translation). Attribution by the notebook's model (unverified). Caveat: two of five are beginner courses, so some "agreement" is beginner basics.

## Agreed by 3+ authors
1. Flexbox for one-dimensional alignment (all five).
2. CSS Grid for two-dimensional layouts and card grids (all five).
3. Relative units (rem, em, %) instead of fixed pixels for type and sizing (all five).
4. Style with classes, not inline styles or bare tag selectors (Powell, Comeau, midulive, Minin).
5. No hard-coded pixel widths on containers; avoids clipping and sideways overflow on small screens (Powell, Chrome, Comeau, +1).
6. Auto-wrapping card grid with `repeat(auto-fit, minmax(...))` (Powell, Chrome, midulive).
7. Prefer intrinsic, self-adjusting layout (flex wrap, grid minmax) over piles of media queries (Powell, Chrome, Comeau).
8. Styles in external CSS files, not inline (Powell, midulive, Minin).

## Single-author (not rules)
- `clamp(min, preferred, max)` for fluid sizes (Chrome). Flex items create stacking contexts (Comeau). `min-width: 0` to let flex children shrink (Comeau). `currentColor` for borders (midulive). Generic font-family fallbacks (listed once).

## Disagreement
- `width: auto` (Powell) vs `width: 100%` (Comeau flags the padding/box-sizing trap). Practical reading: default block width is fine; if you set 100%, set box-sizing: border-box.

## Our reading
- Items 5 and 7 are the practical core for AI-built pages: they are the usual cause of "page scrolls sideways on phone". Add to the checklist: no fixed pixel widths on containers; check at 320 px.
