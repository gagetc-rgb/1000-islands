# Cuts the hero montages (config.MONTAGES) from the owner's originals into design-directions/assets/video/.
# Per montage: desktop 1920x1080 (crf 21, capped 6 Mbit/s) and phone 1080x1920 9:16 (crf 23, capped 3.5 Mbit/s),
# each shot cropped around its own centre, plus WebP posters taken from the encoded first frame.
# Hard cuts, or dissolves when the montage sets xfade (seconds). Shots are trimmed to exact frame counts.
# Shot effects: "dn" mild denoise, "stab" two-pass vidstab (handheld underwater): ~2 s smoothing, optimal zoom + 2%.
# Run: python -I _build/montage.py [hero-v1 ...]
import subprocess, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))   # -I drops the script dir from sys.path
from config import SRC, ASSETS, MONTAGES

VID = ASSETS / "video"
VID.mkdir(parents=True, exist_ok=True)

def ff(*args):
    # cwd = VID so vidstab can take relative .trf paths (its filter args choke on "C:"); other paths are absolute
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True, cwd=VID)
X264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]

def src_fps(f):
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                        "-of", "csv=p=0", str(SRC / f)], capture_output=True, text=True, check=True).stdout.split()[0]
    a, b = map(float, r.split("/")); return a / b

def encode(name, phone):
    m = MONTAGES[name]
    F, xf, shots = m["fps"], m["xfade"], m["shots"]
    args, chains, durs, trfs = [], [], [], []
    for i, (f, start, end, k, cx, fx) in enumerate(shots):
        frames = round((end - start) * src_fps(f) / k)
        durs.append(frames / F)
        cut = ["-ss", start, "-t", end - start + 1, "-i", SRC / f]
        args += cut
        pre = ""
        if "stab" in fx:   # pass 1 on the exact same input cut, so frame indexes line up with pass 2
            trf = f"{name}{'-m' if phone else ''}-{i}.trf"
            ff(*cut, "-vf", f"vidstabdetect=shakiness=10:accuracy=15:result={trf}", "-f", "null", "-")
            pre, trfs = f"vidstabtransform=input={trf}:smoothing=60:zoom=2,", trfs + [trf]
        geo = (f"crop=ih*9/16:ih:(iw-ih*9/16)*{cx}:0,scale=1080:1920:flags=lanczos" if phone else
               "scale=1920:1080:force_original_aspect_ratio=increase:flags=lanczos,crop=1920:1080")
        chains.append(f"[{i}:v]{pre}select='not(mod(n\\,{k}))',trim=end_frame={frames},setpts=N/({F}*TB),"
                      f"{'hqdn3d=1.5:1.5:3:3,' if 'dn' in fx else ''}{geo},setsar=1,format=yuv420p,fps={F},settb=AVTB[s{i}]")
    if xf:
        last, offset = "s0", 0.0
        for i in range(1, len(shots)):
            offset += durs[i - 1] - xf
            out = f"x{i}"
            chains.append(f"[{last}][s{i}]xfade=transition=fade:duration={xf}:offset={offset:.3f}[{out}]")
            last = out
    else:
        chains.append("".join(f"[s{i}]" for i in range(len(shots))) + f"concat=n={len(shots)}:v=1:a=0[x]")
        last = "x"
    out = VID / f"{name}{'-m' if phone else ''}.mp4"
    rate = ["-crf", 23, "-maxrate", "3.5M", "-bufsize", "7M"] if phone else ["-crf", 21, "-maxrate", "6M", "-bufsize", "12M"]
    ff(*args, "-filter_complex", ";".join(chains), "-map", f"[{last}]", "-r", F, *X264, *rate, out)
    ff("-i", out, "-frames:v", 1, "-c:v", "libwebp", "-quality", 74 if phone else 78, out.with_suffix(".webp"))
    for trf in trfs: (VID / trf).unlink()
    total = sum(durs) - xf * (len(shots) - 1)
    return f"{out.name}  {total:.1f} s  {out.stat().st_size / 2**20:.1f} MiB"

if __name__ == "__main__":
    names = sys.argv[1:] or list(MONTAGES)
    with ThreadPoolExecutor(4) as ex:
        for r in ex.map(lambda job: encode(*job), [(n, p) for n in names for p in (False, True)]): print(r)
