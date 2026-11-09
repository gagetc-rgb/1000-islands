"""Turn raw YouTube auto-captions (VTT) into clean, timestamped transcripts
and bundle them by theme for NotebookLM upload.

Inputs:  videos.tsv (theme<TAB>id), meta.tsv (id, date, channel, duration, title), raw/*.vtt
Outputs: transcripts/<id>.md (one per video), bundles/<theme>.md (one per theme)
"""
import re, html, pathlib, collections

ROOT = pathlib.Path(__file__).parent
STAMP_EVERY = 60  # seconds between [mm:ss] markers

THEME_TITLES = {
    "1-moodboard": "Moodboards and art direction with clients",
    "2-taste-references": "Taste, references and where inspiration comes from",
    "3-ai-workflow": "AI-era web design workflow (Claude, Codex, DESIGN.md, avoiding AI slop)",
    "4-studio-client-process": "Studio and client process (from wireframe to design, selling, presenting)",
    "5-luminaries": "Iconic studios and designers: interviews and talks (Awwwards jury, Locomotive, Ueno, Pentagram, Collins, Nielsen)",
}

def parse_vtt(text):
    """Yield (start_seconds, line) from a YouTube auto-caption VTT, rolling duplicates removed."""
    out, last = [], None
    for block in text.split("\n\n"):
        lines = block.strip().splitlines()
        if not lines or "-->" not in lines[0]:
            continue
        h, m, s = lines[0].split(" --> ")[0].split(":")
        start = int(h) * 3600 + int(m) * 60 + float(s)
        for ln in lines[1:]:
            ln = html.unescape(re.sub(r"<[^>]+>", "", ln)).strip()
            if ln and ln != last:
                out.append((start, ln))
                last = ln
    return out

def fmt(sec):
    sec = int(sec)
    return f"{sec // 3600}:{sec % 3600 // 60:02d}:{sec % 60:02d}" if sec >= 3600 else f"{sec // 60}:{sec % 60:02d}"

def transcript(vid):
    files = sorted(ROOT.glob(f"raw/{vid}.en-orig.vtt")) or sorted(ROOT.glob(f"raw/{vid}.en*.vtt"))
    if not files:
        return None
    paras, cur, next_stamp = [], [], 0
    for start, ln in parse_vtt(files[0].read_text(encoding="utf-8")):
        if start >= next_stamp:
            if cur:
                paras.append(" ".join(cur))
            cur = [f"[{fmt(start)}]"]
            next_stamp = start + STAMP_EVERY
        cur.append(ln)
    if cur:
        paras.append(" ".join(cur))
    return "\n\n".join(paras)

def main():
    meta = {}
    for row in (ROOT / "meta.tsv").read_text(encoding="utf-8").splitlines():
        vid, date, channel, dur, title = row.split("\t", 4)
        meta[vid] = dict(date=f"{date[:4]}-{date[4:6]}-{date[6:]}", channel=channel,
                         minutes=round(int(dur) / 60) if dur.isdigit() else "?", title=title)
    themes = collections.OrderedDict()
    for row in (ROOT / "videos.tsv").read_text(encoding="utf-8").splitlines():
        theme, vid = row.split("\t")
        themes.setdefault(theme, []).append(vid)

    (ROOT / "transcripts").mkdir(exist_ok=True)
    (ROOT / "bundles").mkdir(exist_ok=True)
    missing = []
    for theme, vids in themes.items():
        parts = [f"# {THEME_TITLES[theme]}\n\nTranscripts of {len(vids)} YouTube videos, auto-captions, "
                 f"[m:ss] markers every {STAMP_EVERY}s. Each section starts with title, channel, date and URL.\n"]
        for vid in vids:
            m, body = meta.get(vid), transcript(vid)
            if not m or not body:
                missing.append(vid)
                continue
            head = (f"## {m['title']}\n\n- Channel: {m['channel']}\n- Published: {m['date']}\n"
                    f"- Length: {m['minutes']} min\n- URL: https://www.youtube.com/watch?v={vid}\n- Theme: {THEME_TITLES[theme]}\n")
            name = re.sub(r'[<>:"/\\|?*✀-\U0001FFFF]', "", f"{m['date']} {m['channel']} - {m['title']}").strip()[:110]
            (ROOT / "transcripts" / f"{name} [{vid}].md").write_text(head + "\n" + body + "\n", encoding="utf-8")
            parts.append(head + "\n" + body + "\n")
        out = ROOT / "bundles" / f"{theme}.md"
        out.write_text("\n\n---\n\n".join(parts), encoding="utf-8")
        print(f"{out.name}: {len(vids) - sum(v in missing for v in vids)} videos, {len(out.read_text(encoding='utf-8').split()):,} words")
    print("missing:", missing or "none")

if __name__ == "__main__":
    main()
