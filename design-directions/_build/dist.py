# Copies only what the pages reference into design-directions/_dist/ (ready for static hosting)
# and fails if any referenced file is missing. Run: python -I _build/dist.py
import re, shutil, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "_dist"
pages = ["index.html", "compare.html"] + [f"v{i}.html" for i in range(1, 6)]   # compare.html: tabs + phone view (2 Nov)
keep = set(pages) | {"base.css", "base.js", "_headers"}

for page in pages:
    html = (ROOT / page).read_text(encoding="utf-8")
    refs = re.findall(r'(?:src|href|data-src|data-src-sm)="([^"#:]+)"', html)
    refs += [u.split()[0] for s in re.findall(r'srcset="([^"]+)"', html) for u in s.split(",")]
    refs += re.findall(r"url\(([^)]+)\)", html)
    keep |= {r.strip() for r in refs if not r.startswith(("http", "data:", "mailto:"))}
# AV1 twins (hero_final.py) are picked by base.js from the H.264 name, so no page names them (2 Nov)
keep |= {p[:-4] + ".av1.mp4" for p in list(keep) if p.endswith(".mp4") and (ROOT / (p[:-4] + ".av1.mp4")).is_file()}
for css in [p for p in keep if p.endswith(".css")]:
    keep |= set(re.findall(r"url\(([^)\"']+)\)", (ROOT / css).read_text(encoding="utf-8"))) - {"data:,"}

missing = sorted(p for p in keep if not (ROOT / p).is_file())
if missing:
    sys.exit("missing: " + ", ".join(missing))

# sync instead of rmtree: folders on this Desktop carry a read-only flag that blocks rmdir
for old in [f for f in OUT.rglob("*") if f.is_file()] if OUT.exists() else []:
    if old.relative_to(OUT).as_posix() not in keep:
        old.unlink()
total = 0
for rel in sorted(keep):
    dst = OUT / rel
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ROOT / rel, dst)
    total += dst.stat().st_size
big = max(OUT.rglob("*"), key=lambda p: p.stat().st_size if p.is_file() else 0)
print(f"{len(keep)} files, {total / 1048576:.1f} MB in _dist; largest {big.relative_to(OUT)} {big.stat().st_size / 1048576:.1f} MB")
