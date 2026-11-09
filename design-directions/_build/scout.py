# Independent scouting of the owner's originals (no use of the Gemini timecodes).
# Per half second: luma mean and spread (light, contrast), colourfulness (Hasler–Süsstrunk), sharpness (Laplacian
# variance), and the motion flags of motion.py (SHAKE / TILT / PAN / START). Prints the best 6 s windows per clip
# by a combined score and writes a contact sheet per clip (one frame per second, timestamped) to cuts/scout/.
# Run: python -I _build/scout.py [FILE ...]   (default: every video in client-input-2026-10-29/)
import subprocess, sys, math
from pathlib import Path
import numpy as np, cv2
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC, ROOT
from motion import track, fps

OUT = ROOT / "cuts" / "scout"
OUT.mkdir(parents=True, exist_ok=True)
W, H = 320, 180
HLG = {"DJI_0832.MP4"}
TONEMAP = ("zscale=tin=arib-std-b67:min=bt2020nc:pin=bt2020:t=linear:npl=100,format=gbrpf32le,"
           "zscale=p=bt709,tonemap=tonemap=hable:desat=0,zscale=t=bt709:m=bt709:r=tv,")

def frames(path):
    pre = TONEMAP if path.name in HLG else ""
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(path), "-vf", f"{pre}fps=2,scale={W}:{H},format=rgb24",
                          "-f", "rawvideo", "-"], stdout=subprocess.PIPE)
    while len(b := p.stdout.read(W * H * 3)) == W * H * 3:
        yield np.frombuffer(b, np.uint8).reshape(H, W, 3)

def look(f):
    r, g, b = (f[..., i].astype(float) for i in range(3))
    y = .2126 * r + .7152 * g + .0722 * b
    rg, yb = r - g, .5 * (r + g) - b
    colour = math.hypot(rg.std(), yb.std()) + .3 * math.hypot(rg.mean(), yb.mean())
    sharp = cv2.Laplacian(cv2.cvtColor(f, cv2.COLOR_RGB2GRAY), cv2.CV_64F).var()
    return y.mean(), y.std(), colour, sharp

def motion_flags(path, n_half):
    rate, a = fps(path), track(path)
    jerk = np.r_[0, np.hypot(*np.diff(a[:, :2], axis=0).T)]
    n = max(1, round(rate / 2)); out, prev = [], None
    for i in range(n_half):
        seg = slice(i * n, (i + 1) * n)
        if seg.start >= len(a): out.append(1.0); continue
        dx, dy, rot = a[seg, 0].mean(), a[seg, 1].mean(), a[seg, 2].mean() * rate
        bad = (np.percentile(jerk[seg], 90) > .6) + (abs(dy) > .5) + (abs(dx) > 1.2 or abs(rot) > 4)
        if prev is not None and (math.hypot(dx - prev[0], dy - prev[1]) > .45 or abs(rot - prev[2]) > 2): bad += 1
        prev = (dx, dy, rot); out.append(min(bad, 1))
    return np.array(out, float)

def scout(path):
    fr = list(frames(path))
    m = np.array([look(f) for f in fr])                     # rows: half seconds
    flags = motion_flags(path, len(fr))
    luma, spread, colour, sharp = m.T
    # light: penalise dark (< 95) and blown (> 185) frames; contrast and colour normalised to typical sunny daylight
    light = 1 - np.clip(np.maximum(95 - luma, luma - 185) / 60, 0, 1)
    score = .35 * np.clip(colour / 60, 0, 1.3) + .25 * np.clip(spread / 55, 0, 1.2) + .2 * light \
          + .2 * np.clip(np.log1p(sharp) / np.log1p(400), 0, 1)
    win = 12                                                # 6 s
    best = []
    for s in range(0, max(1, len(fr) - win + 1)):
        w = slice(s, s + win)
        best.append((score[w].mean() - .5 * flags[w].mean(), s / 2, flags[w].mean(), score[w].mean()))
    best.sort(reverse=True)
    picks = []
    for b in best:                                          # top 3 non-overlapping windows
        if all(abs(b[1] - p[1]) >= 6 for p in picks): picks.append(b)
        if len(picks) == 3: break
    print(f"\n{path.name}  {len(fr) / 2:.1f} s   mean luma {luma.mean():.0f}  colour {colour.mean():.0f}  "
          f"steady {100 * (1 - flags.mean()):.0f}%")
    for tot, t, fl, sc in picks:
        print(f"  {t:5.1f}–{t + 6:5.1f}  score {sc:.2f}  flagged {100 * fl:.0f}%  total {tot:.2f}")
    # contact sheet: 1 frame per second, 8 per row, red border on flagged moments
    tiles = []
    for i in range(0, len(fr), 2):
        t = cv2.cvtColor(np.ascontiguousarray(fr[i]), cv2.COLOR_RGB2BGR).copy()
        if flags[i]: cv2.rectangle(t, (0, 0), (W - 1, H - 1), (0, 0, 255), 4)
        cv2.putText(t, f"{i // 2}s  {score[i]:.2f}", (6, 20), cv2.FONT_HERSHEY_SIMPLEX, .55, (0, 0, 0), 3)
        cv2.putText(t, f"{i // 2}s  {score[i]:.2f}", (6, 20), cv2.FONT_HERSHEY_SIMPLEX, .55, (255, 255, 255), 1)
        tiles.append(t)
    while len(tiles) % 8: tiles.append(np.zeros_like(tiles[0]))
    sheet = np.vstack([np.hstack(tiles[r:r + 8]) for r in range(0, len(tiles), 8)])
    cv2.imwrite(str(OUT / f"{path.stem}.jpg"), sheet, [cv2.IMWRITE_JPEG_QUALITY, 80])

if __name__ == "__main__":
    files = sys.argv[1:] or sorted(p.name for p in SRC.iterdir() if p.suffix.upper() in (".MP4", ".MOV"))
    for f in files: scout(Path(f) if Path(f).is_absolute() else SRC / f)
