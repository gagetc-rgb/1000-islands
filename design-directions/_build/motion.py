# Measures camera motion in an original clip, to find stretches that look hand-flown rather than robotic.
# Global motion between frames = similarity transform from tracked feature points (LK + RANSAC), at 480 px width.
# Per half second: dx/dy (px/frame, signed: dy is gimbal tilt), rot (deg/s), zoom (%/s, forward flight), jerk (shake),
# and flags:
#   SHAKE  jerk p90 > 0.6 (handheld jitter, snaps)
#   TILT   |dy| > 0.5 (camera pitching up or down)
#   PAN    |dx| > 1.2 or |rot| > 4 (yaw/pan or roll sweep)
#   START  motion vector or rotation changes sharply vs the previous half second (a move that starts or stops abruptly)
# Then lists clean windows (>= 3 s with no flag). Arrays are cached next to this script in _build/.motion/.
# Run: python -I _build/motion.py FILE [FILE...]   (names relative to client-input-2026-10-29/, or absolute paths)
import subprocess, sys, math
from pathlib import Path
import numpy as np, cv2
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import SRC

W, H = 480, 270
CACHE = Path(__file__).resolve().parent / ".motion"

def frames(path):
    p = subprocess.Popen(["ffmpeg", "-v", "error", "-i", str(path), "-vf", f"scale={W}:{H},format=gray", "-f", "rawvideo", "-"],
                         stdout=subprocess.PIPE)
    while True:
        b = p.stdout.read(W * H)
        if len(b) < W * H: break
        yield np.frombuffer(b, np.uint8).reshape(H, W)

def fps(path):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                        "-of", "csv=p=0", str(path)], capture_output=True, text=True).stdout.split()[0]
    a, b = map(float, r.split("/")); return a / b

def track(path):
    """Per frame: dx, dy, rotation (deg), log scale."""
    CACHE.mkdir(exist_ok=True)
    c = CACHE / f"{path.name}.npy"
    if c.exists() and c.stat().st_mtime > path.stat().st_mtime: return np.load(c)
    prev, out = None, []
    for f in frames(path):
        if prev is not None:
            m = (0.0, 0.0, 0.0, 0.0)
            pts = cv2.goodFeaturesToTrack(prev, 300, 0.01, 8)
            if pts is not None and len(pts) > 10:
                nxt, st, _ = cv2.calcOpticalFlowPyrLK(prev, f, pts, None)
                ok = st.ravel() == 1
                if ok.sum() > 10:
                    T, _ = cv2.estimateAffinePartial2D(pts[ok], nxt[ok], method=cv2.RANSAC)
                    if T is not None:
                        m = (T[0, 2], T[1, 2], math.degrees(math.atan2(T[1, 0], T[0, 0])), math.log(math.hypot(T[0, 0], T[1, 0])))
            out.append(m)
        prev = f
    a = np.array(out); np.save(c, a); return a

def analyse(path):
    rate = fps(path)
    a = track(path)
    jerk = np.r_[0, np.hypot(*np.diff(a[:, :2], axis=0).T)]
    n = max(1, round(rate / 2))
    rows = []
    for i in range(0, len(a) // n):
        seg = slice(i * n, (i + 1) * n)
        dx, dy = a[seg, 0].mean(), a[seg, 1].mean()
        rot = a[seg, 2].mean() * rate
        zoom = a[seg, 3].mean() * rate * 100
        jk = np.percentile(jerk[seg], 90)
        rows.append([i / 2, dx, dy, rot, zoom, jk])
    print(f"\n{path.name}  {rate:.2f} fps  {len(a) / rate:.1f} s")
    print("     t     dx     dy    rot   zoom  jerk  flags")
    clean, prev = [], None
    for t, dx, dy, rot, zoom, jk in rows:
        f = []
        if jk > .6: f.append("SHAKE")
        if abs(dy) > .5: f.append("TILT")
        if abs(dx) > 1.2 or abs(rot) > 4: f.append("PAN")
        if prev is not None and (math.hypot(dx - prev[0], dy - prev[1]) > .45 or abs(rot - prev[2]) > 2): f.append("START")
        prev = (dx, dy, rot)
        clean.append(not f)
        print(f"  {t:5.1f}  {dx:+5.2f}  {dy:+5.2f}  {rot:+5.1f}  {zoom:+5.1f}  {jk:4.2f}  {' '.join(f)}")
    wins, s = [], None
    for k, ok in enumerate(clean + [False]):
        if ok and s is None: s = k
        if not ok and s is not None:
            if (k - s) / 2 >= 3: wins.append((rows[s][0], rows[k - 1][0] + .5))
            s = None
    print("  clean windows:", ", ".join(f"{x:.1f}–{y:.1f}" for x, y in wins) or "none")

if __name__ == "__main__":
    for f in sys.argv[1:]:
        analyse(Path(f) if Path(f).is_absolute() else SRC / f)
