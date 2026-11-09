# Generates assets/contour.svg: a seamless topographic tile (periodic noise -> iso-lines).
import numpy as np
from skimage import measure
from pathlib import Path
N, S = 400, 720              # grid cells, tile size px
rng = np.random.default_rng(7)
x = np.linspace(0, 2*np.pi, N, endpoint=False)
X, Y = np.meshgrid(x, x)
Z = np.zeros_like(X)
for _ in range(14):          # integer frequencies keep the tile seamless
    fx, fy = rng.integers(-4, 5, 2)
    if fx == 0 and fy == 0: continue
    a = 1 / np.hypot(fx, fy) ** 1.3
    Z += a * np.cos(fx*X + fy*Y + rng.uniform(0, 2*np.pi))
Zp = np.pad(Z, 1, mode="wrap")
paths = []
for lv in np.linspace(Z.min(), Z.max(), 22)[1:-1]:
    for c in measure.find_contours(Zp, lv):
        c = (c - 1) * S / N
        if len(c) < 12: continue
        d = "M" + " L".join(f"{p[1]:.1f} {p[0]:.1f}" for p in c[::3])
        paths.append(f'<path d="{d}"/>')
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{S}" height="{S}" viewBox="0 0 {S} {S}" '
       f'fill="none" stroke="#23262a" stroke-width="1" stroke-opacity=".13">' + "".join(paths) + "</svg>")
out = Path(__file__).resolve().parent.parent / "assets" / "contour.svg"
out.write_text(svg, encoding="utf-8")
print(len(paths), "paths,", round(len(svg)/1024), "KB")
