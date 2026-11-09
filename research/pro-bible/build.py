"""VTT -> clean timestamped transcripts (any language). Reuses parse_vtt/fmt from ../design-kb/build.py."""
import sys, re, pathlib, importlib.util
ROOT = pathlib.Path(__file__).parent
spec = importlib.util.spec_from_file_location("kb", ROOT.parent / "design-kb" / "build.py")
kb = importlib.util.module_from_spec(spec); spec.loader.exec_module(kb)
meta = {}
for row in (ROOT / "meta.tsv").read_text(encoding="utf-8").splitlines():
    vid, date, ch, dur, lang, title = row.split("\t", 5)
    meta[vid] = dict(date=f"{date[:4]}-{date[4:6]}-{date[6:]}", ch=ch, dur=dur, lang=lang, title=title)
topics = [r.split("\t") for r in (ROOT / "topics.tsv").read_text().splitlines()]
(ROOT / "transcripts").mkdir(exist_ok=True)
for topic, vid in topics:
    if vid not in meta: continue
    base = meta[vid]["lang"].split("-")[0]
    if base in ("NA", "", "None"): base = "en"
    cands = sorted(ROOT.glob(f"raw/{vid}.{base}*-orig.vtt")) + sorted(ROOT.glob(f"raw/{vid}.en*.vtt"))
    cands = cands or sorted(ROOT.glob(f"raw/{vid}.*.vtt"))
    size = lambda f: len(" ".join(l for _, l in kb.parse_vtt(f.read_text(encoding="utf-8"))).split())
    files = sorted(cands, key=size, reverse=True)[:1]
    if files and size(files[0]) < 0.5 * max(size(c) for c in cands): files = []
    base = base if files and files[0].name.split(".")[1].startswith(base) else files[0].name.split(".")[1][:2] if files else base
    if not files: print("MISSING", vid); continue
    paras, cur, nxt = [], [], 0
    for start, ln in kb.parse_vtt(files[0].read_text(encoding="utf-8")):
        if start >= nxt:
            if cur: paras.append(" ".join(cur))
            cur = [f"[{kb.fmt(start)}]"]; nxt = start + 60
        cur.append(ln)
    if cur: paras.append(" ".join(cur))
    m = meta[vid]
    safe = re.sub(r'[\/:*?"<>|]', "", m["title"])[:80]
    lg = base
    chs = re.sub(r"[^A-Za-z0-9 ._-]","",m["ch"]).strip() or "RU-channel"
    tis = re.sub(r"[^A-Za-z0-9 ._-]","",safe).strip()[:60] or "video"
    name = f'{topic}-{lg} {chs} - {tis} [{vid}].md'
    head = f'# {m["title"]}\n\nChannel: {m["ch"]} | Language: {base} (source: {files[0].name.split(".",1)[1]}) | Topic: {topic} | Date: {m["date"]} | https://youtu.be/{vid}\n\n'
    (ROOT / "transcripts" / name).write_text(head + "\n\n".join(paras), encoding="utf-8")
print(len(list((ROOT/"transcripts").glob("*.md"))), "transcripts")
