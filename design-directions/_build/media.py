# Encodes web assets from the owner's originals into design-directions/assets/.
# Quality first: the page shows a loading screen while the hero clip loads (~3 s), so hero clips are sharp.
# Per 8 s loop: hero desktop 1920 wide, capped 6 Mbit/s (≈5–6 MB); hero phone 1080x1920 (9:16), capped 3.5 Mbit/s (≈3 MB);
# section clips (lazy-loaded) desktop capped 4 Mbit/s, phone 1280 wide capped 2 Mbit/s. Posters and photos are WebP.
# Run: python -I _build/media.py [names...]
import subprocess, sys
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0, str(Path(__file__).resolve().parent))   # -I drops the script dir from sys.path
from PIL import Image
from config import SRC, ASSETS, CLIPS, CLIP_SECONDS, NOISY, STABILIZE, PHOTO_SRC, PHOTO_WIDTHS

VID, IMG = ASSETS / "video", ASSETS / "img"
VID.mkdir(parents=True, exist_ok=True); IMG.mkdir(parents=True, exist_ok=True)

def ff(*args):
    # cwd = VID so filters can take relative paths (vidstab's file args choke on "C:"); all other paths are absolute
    subprocess.run(["ffmpeg", "-v", "error", "-y", *map(str, args)], check=True, cwd=VID)

X264 = ["-an", "-c:v", "libx264", "-preset", "slow", "-profile:v", "high", "-pix_fmt", "yuv420p", "-movflags", "+faststart"]

def out_fps(s):
    """25 for 24/25/50 fps sources, 30 for 30/60: every output frame is a real source frame, no uneven drops."""
    r = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate",
                        "-of", "csv=p=0", str(s)], capture_output=True, text=True, check=True).stdout.split()[0]
    a, b = map(float, r.split("/"))
    return 25 if round(a / b) in (24, 25, 50) else 30

def clip(name):
    src, start, cx, hero = CLIPS[name]
    s = SRC / src
    F = out_fps(s)
    dn = "hqdn3d=1.5:1.5:3:3," if name in NOISY else ""
    cut = ["-ss", start, "-t", CLIP_SECONDS, "-i", s]
    stab = name in STABILIZE
    if stab:   # pass 1 writes the camera path; pass 2 smooths it (1 s window) with a 4% zoom to hide the moving edges
        ff(*cut, "-vf", f"vidstabdetect=shakiness=6:result={name}.trf", "-f", "null", "-")
        dn = f"vidstabtransform=input={name}.trf:smoothing=30:zoom=4," + dn
    # desktop
    rate = ["-crf", 21, "-maxrate", "6M", "-bufsize", "12M"] if hero else ["-crf", 23, "-maxrate", "4M", "-bufsize", "8M"]
    ff(*cut, "-vf", f"{dn}scale=1920:-2:flags=lanczos,fps={F}", *X264, *rate, VID / f"{name}.mp4")
    poster = lambda src, vf, out, q: ff(*(["-i", src] if stab else ["-ss", start, "-i", s, "-vf", vf]), "-frames:v", 1, "-c:v", "libwebp", "-quality", q, out)
    poster(VID / f"{name}.mp4", "scale=1920:-2:flags=lanczos", VID / f"{name}.webp", 78)
    # phone
    if hero:
        crop = f"crop=ih*9/16:ih:(iw-ih*9/16)*{cx}:0,scale=1080:1920:flags=lanczos"
        ff(*cut, "-vf", f"{dn}{crop},fps={F}", *X264, "-crf", 23, "-maxrate", "3.5M", "-bufsize", "7M", VID / f"{name}-m.mp4")
        poster(VID / f"{name}-m.mp4", crop, VID / f"{name}-m.webp", 74)
    else:
        ff(*cut, "-vf", f"{dn}scale=1280:-2:flags=lanczos,fps={F}", *X264, "-crf", 24, "-maxrate", "2M", "-bufsize", "4M", VID / f"{name}-m.mp4")
        poster(VID / f"{name}-m.mp4", "scale=1280:-2:flags=lanczos", VID / f"{name}-m.webp", 74)
    if stab: (VID / f"{name}.trf").unlink()
    return name

def photo(pid):
    im = Image.open(SRC / PHOTO_SRC[pid]).convert("RGB")
    for w in PHOTO_WIDTHS:
        if w > im.width: continue
        h = round(im.height * w / im.width)
        im.resize((w, h), Image.LANCZOS).save(IMG / f"{pid}-{w}.webp", "WEBP", quality=72, method=6)
    return pid

if __name__ == "__main__":
    only = set(sys.argv[1:])
    with ThreadPoolExecutor(4) as ex:
        for n in ex.map(clip, [c for c in CLIPS if not only or c in only]): print("clip", n)
    with ThreadPoolExecutor(4) as ex:
        for p in ex.map(photo, [p for p in PHOTO_SRC if not only or p in only]): print("photo", p)
