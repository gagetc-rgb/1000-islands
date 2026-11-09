# Thumbnails of every board for the overview covers, shot from the HTML (the boards mirror it 1:1).
# phone: first screen 390x844 @3x -> 330 px wide; desktop: full page 1440 @1x -> 230 px wide; others: full page.
import json, os
from playwright.sync_api import sync_playwright
from PIL import Image
D = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(D, "thumbs")
pages = json.load(open(os.path.join(D, "pages.json"), encoding="utf-8"))
slug = lambda n: "".join(c if c.isalnum() else "_" for c in n).strip("_")
def shot(pg, b, full, path, width, url):
    pg.goto(url, wait_until="networkidle")
    pg.evaluate("document.fonts.ready")
    if b.get("tab"): pg.evaluate("t => document.getElementById(t).click()", b["tab"])
    if b.get("menuOpen"): pg.evaluate("document.querySelector('details.menu').setAttribute('open','')")
    pg.wait_for_timeout(300)
    tmp = path + ".png"; pg.screenshot(path=tmp, full_page=full)
    im = Image.open(tmp).convert("RGB"); h = round(im.height * width / im.width)
    im.resize((width, h), Image.LANCZOS).save(path, "JPEG", quality=86, optimize=True); os.remove(tmp)
    return im.width, im.height
with sync_playwright() as p:
    br = p.chromium.launch()
    for b in pages:
        url = f"http://localhost:5173/{b.get('file') or b['key']}.html"
        path = os.path.join(OUT, slug(b["name"]) + ".jpg")
        if b["group"] == "mobile":
            ctx = br.new_context(viewport={"width": 390, "height": 844}, device_scale_factor=3, is_mobile=True, has_touch=True)
            pg = ctx.new_page(); shot(pg, b, False, path, 330, url); ctx.close()
        else:
            ctx = br.new_context(viewport={"width": b["w"], "height": 900 if b["w"] > 600 else 844}, device_scale_factor=1)
            pg = ctx.new_page(); shot(pg, b, True, path, 230 if b["w"] >= 760 else 160, url); ctx.close()
        print(b["name"][:44].ljust(45), os.path.getsize(path) // 1024, "KB")
    br.close()
