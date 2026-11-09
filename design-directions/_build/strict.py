# Strict move check for hero shots: finds what a viewer reads as a "bad" camera move, using motion.py's tracked
# per-frame motion. Per half second it reports speed (dx, dy, zoom) and marks:
#   STOP  speed falls below 35% of the previous second's (a drone that brakes or hovers)
#   BACK  forward flight (zoom > +3 %/s) turns into backward flight (zoom < -3 %/s) or the reverse
#   YAW   rotation above 2.5 deg/s (camera turning or rolling)
#   JOLT  shake: 90th percentile of frame-to-frame motion change above 1.0 px
#   REV   flying backwards (zoom < -3 %/s)
#   SNAP  motion vector changes by more than 1.2 px/frame between half seconds (a hard start or turn)
# Then prints the windows of at least 3 s with no mark. Works on originals and on the prepared shot files.
# Run: python -I _build/strict.py FILE[@start-end] ...  (relative to client-input-2026-10-29/ or absolute)
import sys, math
from pathlib import Path
import numpy as np
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC
from motion import track, fps

def rows(path):
    rate, a = fps(path), track(path)
    jerk = np.r_[0, np.hypot(*np.diff(a[:, :2], axis=0).T)]
    n = max(1, round(rate / 2)); out = []
    for i in range(len(a) // n):
        s = slice(i * n, (i + 1) * n)
        out.append(dict(t=i / 2, dx=a[s, 0].mean(), dy=a[s, 1].mean(), rot=a[s, 2].mean() * rate,
                        zoom=a[s, 3].mean() * rate * 100, jerk=np.percentile(jerk[s], 90)))
    return out

def check(path, lo=0.0, hi=1e9):
    rs = [r for r in rows(path) if lo <= r["t"] < hi]
    print(f"\n{path.name}  {lo:g}-{min(hi, rs[-1]['t'] + .5) if rs else hi:g} s")
    marks = []
    for i, r in enumerate(rs):
        sp = math.hypot(r["dx"], r["dy"]) + abs(r["zoom"]) / 20
        m = []
        prev = rs[max(0, i - 2):i]
        if prev:
            psp = np.mean([math.hypot(p["dx"], p["dy"]) + abs(p["zoom"]) / 20 for p in prev])
            if psp > .6 and sp < .35 * psp: m.append("STOP")
            pz = prev[-1]["zoom"]
            if (pz > 3 and r["zoom"] < -3) or (pz < -3 and r["zoom"] > 3): m.append("BACK")
            if math.hypot(r["dx"] - prev[-1]["dx"], r["dy"] - prev[-1]["dy"]) > 1.2: m.append("SNAP")
        if r["zoom"] < -3: m.append("REV")   # flying backwards: the user dislikes it outright
        if abs(r["rot"]) > 2.5: m.append("YAW")
        if r["jerk"] > 1.0: m.append("JOLT")
        marks.append(not m)
        print(f"  {r['t']:5.1f}  dx {r['dx']:+5.2f}  dy {r['dy']:+5.2f}  zoom {r['zoom']:+6.1f}  rot {r['rot']:+5.1f}  "
              f"jerk {r['jerk']:4.2f}  {' '.join(m)}")
    wins, s = [], None
    for k, ok in enumerate(marks + [False]):
        if ok and s is None: s = k
        if not ok and s is not None:
            if (k - s) / 2 >= 3: wins.append(f"{rs[s]['t']:g}-{rs[k - 1]['t'] + .5:g}")
            s = None
    print("  smooth windows:", ", ".join(wins) or "none")

if __name__ == "__main__":
    for arg in sys.argv[1:]:
        f, _, rng = arg.partition("@")
        p = Path(f) if Path(f).is_absolute() else SRC / f
        lo, hi = map(float, rng.split("-")) if rng else (0, 1e9)
        check(p, lo, hi)
