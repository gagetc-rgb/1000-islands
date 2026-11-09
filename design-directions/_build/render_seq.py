# Renders a sequence copied from the editor (design-directions/editor/, "Скопировать для Claude") at full quality:
# trims the near-lossless shots in montages/shots/ (not the editor proxies), joins them with cuts or dissolves,
# encodes with the hero rates of hero_final.py. Output: montages3/<name>.mp4 + .webp poster.
# Input: a file holding the copied text (only its "JSON: {...}" line is read) or the bare JSON.
# Run: python -I _build/render_seq.py seq.txt [name]
import sys, json, re
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from config import ROOT
from hero10 import SH, F, ff
from hero_final import X264, TAGS

def render(seq, fade, out):
    args, chains = [], []
    for i, s in enumerate(seq):
        args += ["-i", SH / f"{s['k']}.mp4"]
        chains.append(f"[{i}:v]trim=start={s['a']}:end={s['b']},setpts=PTS-STARTPTS,fps={F},settb=1/{F}[s{i}]")
    if fade and len(seq) > 1:
        prev, t = "s0", 0.0
        for i in range(1, len(seq)):
            t += seq[i - 1]["b"] - seq[i - 1]["a"] - fade
            chains.append(f"[{prev}][s{i}]xfade=transition=fade:duration={fade}:offset={t:.3f}[x{i}]")
            prev = f"x{i}"
        last = prev
    else:
        chains.append("".join(f"[s{i}]" for i in range(len(seq))) + f"concat=n={len(seq)}:v=1:a=0[x]")
        last = "x"
    ff(*args, "-filter_complex", ";".join(chains), "-map", f"[{last}]", "-r", F, *X264,
       "-crf", 21, "-maxrate", "6M", "-bufsize", "12M", *TAGS, out)
    ff("-i", out, "-frames:v", 1, "-c:v", "libwebp", "-quality", 78, out.with_suffix(".webp"))

if __name__ == "__main__":
    src = Path(sys.argv[1]).read_text(encoding="utf-8")
    m = re.search(r"JSON:\s*(\{.*\})", src)
    data = json.loads(m[1] if m else src)
    out = ROOT / "montages3" / f"{sys.argv[2] if len(sys.argv) > 2 else 'mine'}.mp4"
    render(data["seq"], data.get("fade", 0), out)
    print(f"{out}  {out.stat().st_size / 2**20:.1f} MiB")
