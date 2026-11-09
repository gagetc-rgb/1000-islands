"""Download article pages (Codrops etc.) listed in articles.tsv (theme<TAB>url) into articles/*.md as clean text."""
import re, sys, pathlib, urllib.request
from bs4 import BeautifulSoup
ROOT = pathlib.Path(__file__).parent
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36"

def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "replace")

def to_md(url, html):
    s = BeautifulSoup(html, "html.parser")
    title = (s.find("h1") or s.title).get_text(" ", strip=True)
    m = re.search(r"/(\d{4})/(\d{2})/(\d{2})/", url)
    date = "-".join(m.groups()) if m else "?"
    body = s.select_one(".ct-post-content, .entry-content, article .content, article") or s.body
    for t in body.select("script, style, nav, footer, aside, form, .ct-share, .ct-related, figure figcaption:empty"):
        t.decompose()
    lines = []
    for el in body.find_all(["h2", "h3", "h4", "p", "li", "blockquote"]):
        txt = el.get_text(" ", strip=True)
        if not txt or len(txt) < 3:
            continue
        lines.append(("## " if el.name == "h2" else "### " if el.name in ("h3", "h4") else "- " if el.name == "li" else "> " if el.name == "blockquote" else "") + txt)
    text = "\n\n".join(dict.fromkeys(lines))
    return date, title, f"# {title}\n\n- Source: {url}\n- Published: {date}\n\n{text}\n"

for row in (ROOT / "articles.tsv").read_text(encoding="utf-8").splitlines():
    theme, url = row.split("\t")
    try:
        date, title, md = to_md(url, get(url))
    except Exception as e:
        print("FAIL", url, e); continue
    host = re.sub(r"^www\.", "", url.split("/")[2])
    site = {"tympanus.net": "Codrops"}.get(host, host.split(".")[0].capitalize())
    name = re.sub(r'[<>:"/\|?*\u2700-\U0001FFFF]', "", f"{date} {site} - {title}").strip()[:120]
    out = ROOT / "articles" / f"{name}.md"
    out.write_text(md, encoding="utf-8")
    print(f"{len(md.split()):>6} words  {out.name}")
