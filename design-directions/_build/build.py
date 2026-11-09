# Builds v1.html–v5.html from template.html. Run media.py first, then: python -I _build/build.py
import sys
from pathlib import Path
from PIL import Image
sys.path.insert(0, str(Path(__file__).resolve().parent))   # -I drops the script dir from sys.path
from icons import icon, STROKE, FILL
from config import ROOT, ASSETS, PHOTO_WIDTHS

TPL = (ROOT / "_build" / "template.html").read_text(encoding="utf-8")
GF = "https://fonts.googleapis.com/css2?{}&display=swap"

ALT = {
    "2O4A3189": "Limestone islets and lagoons seen from a ridge in Raja Ampat",
    "2O4A3267": "A sailing yacht anchored among green karst islets",
    "DJI_0074": "Aerial view of a forested island with a white sand spit",
    "_RBE2063": "Turquoise water at the foot of a limestone cliff",
    "0O0A9157": "Volcanic steam vents on a hillside above the sea",
    "0O0A9741": "A smoking volcano above the rainforest",
    "2O4A6722": "A Papuan man with painted face in the rainforest",
    "2O4A1226": "A white beach with three islets at the mouth of a bay",
    "_RBE2062": "A limestone cliff dropping into clear water",
    "2O4A2068": "Hikers on a rocky ridge above the islands",
    "IMG_9812": "A still lagoon ringed by green islets",
    "IMG_9819": "A jagged rock islet standing alone at sea",
    "2O4A4824": "A stilt village over a shallow reef",
    "_RBE2059": "Palm-shaded bungalows on a white beach",
    "IMG_5353": "A white beach framed by overhanging leaves",
    "2O4A4797": "A wooden jetty with a hut over clear water",
    "2O4A1547": "A pink-white sandbar running into shallow water",
    "DJI_0442": "A swimmer seen from above in pale turquoise water",
    "IMG_5357": "A small islet on a turquoise flat",
    "2O4A4792": "A low island with a village on the horizon",
    "0O0A0227": "A jetty over a reef with a hut at the end",
    "2O4A3377": "A jetty running into a pink and orange sunset",
    "_RBE2052": "A white beach between green headlands",
}

def pic(pid, sizes):
    """Responsive WebP <img>: srcset of the widths media.py produced, intrinsic size against layout shift."""
    files = [(w, ASSETS / "img" / f"{pid}-{w}.webp") for w in PHOTO_WIDTHS]
    files = [(w, f) for w, f in files if f.exists()]
    assert files, pid
    w, h = Image.open(files[-1][1]).size
    srcset = ", ".join(f"assets/img/{f.name} {fw}w" for fw, f in files)
    mid = next((f for fw, f in files if fw >= 800), files[-1][1])
    return (f'<img src="assets/img/{mid.name}" srcset="{srcset}" sizes="{sizes}" width="{w}" height="{h}" '
            f'alt="{ALT[pid]}" loading="lazy" decoding="async">')

def video(name):
    """Video stays empty until base.js picks the desktop or phone file; the poster is a CSS background."""
    v = f"assets/video/{name}"
    av1 = " data-av1" if (ASSETS / "video" / f"{name}.av1.mp4").exists() else ""   # AV1 twin from hero_final.py
    return (f'<video muted loop playsinline preload="none" aria-hidden="true"{av1} data-src="{v}.mp4" data-src-sm="{v}-m.mp4" '
            f'style="--poster:url({v}.webp);--poster-sm:url({v}-m.webp)"></video>')

def preload(name):
    v = f"assets/video/{name}"
    return (f'<link rel="preload" as="image" href="{v}-m.webp" media="(max-width: 760px)">\n'
            f'<link rel="preload" as="image" href="{v}.webp" media="(min-width: 761px)">')

def logo(name, sub):
    return f'<span class="logo-name">{name}</span><span class="logo-sub">{sub}</span>'

# Video control in the hero: only v3 Quiet carries one (user, 1 Nov: Aman-style there, none elsewhere)
HERO_CONTROL = '  <div class="vctl"><button class="pause" type="button" aria-label="Pause video" aria-pressed="false"><svg class="i-pause" viewBox="0 0 16 16" aria-hidden="true"><rect x="3.5" y="2.5" width="2.5" height="11"/><rect x="10" y="2.5" width="2.5" height="11"/></svg><svg class="i-play" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 2.5v11l9.5-5.5z"/></svg></button><span class="vctl-line" aria-hidden="true"><i></i></span></div>\n'

# Header destinations: two links, or (v1, 2 Nov trial of a calmer header) one "Destinations" dropdown
NAV_LINKS = '      <a href="#where">Raja Ampat</a>\n      <a href="#where">North Sulawesi</a>\n'
NAV_DROP = ('      <div class="nav-drop"><button type="button" class="nav-drop-btn" aria-expanded="false" aria-controls="dd-where">Destinations'
            '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></button>'
            '<div class="nav-drop-panel" id="dd-where"><a href="#where">Raja Ampat</a><a href="#where">North Sulawesi</a></div></div>\n')

# Travel agents block. v1-v4: the Stage 1 band. v5: the framed card from trade-options/round-3.html, variant 3 (user, 2 Nov:
# "ideal for design 5, the chart already uses these frames"); the frame draws itself and the blocks drop in from above.
TRADE_BAND = ('<section class="trade" id="trade" aria-labelledby="trade-title">\n'
              '  <div class="wrap trade-in">\n'
              '    <h2 id="trade-title">For travel agents</h2>\n'
              '    <p class="trade-text">Your client remains your client. We run the Indonesia side, at trade rates.</p>\n'
              '    <a class="btn btn-primary" href="#trade">Get trade rates</a>\n'
              '  </div>\n'
              '</section>\n')

def trade_card(late=False):
    pts = [('handshake', 'Your client stays yours', 'We work behind the scenes when you need it.'),
           ('layers', 'All of it, or one part', 'Complete ground handling, or single parts.'),
           ('tag', 'Under your brand', 'Itineraries to offer as your own product.')]
    frame = '<span class="tfr{0}" aria-hidden="true"><i class="t"></i><i class="r"></i><i class="b"></i><i class="l"></i></span>'
    lis = ''.join(f'        <li class="m"><div style="--d:{560 + 200 * i}ms">{icon(n)}<h3>{h}</h3><p>{t}</p></div></li>\n'
                  for i, (n, h, t) in enumerate(pts))
    return ('<section class="trade trade-card" id="trade" aria-labelledby="trade-title" data-reveal'
            + ('="late"' if late else '') + '>\n'
            '  <div class="wrap">\n'
            '    <div class="tcard">\n'
            f'      {frame.format("")}{frame.format(" tfr-i")}\n'
            '      <div class="tcard-head">\n'
            '        <h2 id="trade-title" class="m"><span style="--d:200ms">For travel agents</span></h2>\n'
            '        <p class="trade-lead m"><span style="--d:380ms">Your partner in remote Indonesia.</span></p>\n'
            '        <div class="trade-cta m"><div style="--d:1250ms"><a class="btn btn-primary" href="#trade">Get trade rates</a>'
            '<span class="trade-note">For registered travel companies</span></div></div>\n'
            '      </div>\n'
            f'      <ul class="tpoints">\n{lis}      </ul>\n'
            '    </div>\n'
            '  </div>\n'
            '</section>\n')

# Travel agents blocks picked by the user from trade-options/round-3.html (2 Nov, evening):
# design 1 = variant 8 (smoked glass over the lagoon film), 2 = variant 5 (the film inside the letters),
# 3 = variant 4 (WebGL ripple on photo 8, water only), 4 = variant 7 (slanted shutters, photos 8 / 23 / 28), 5 = variant 3.
T_HEAD = "For travel agents"
T_LEAD = "Your partner in remote Indonesia."
T_SHORT = [("Your client stays yours", "We work behind the scenes when you need it."),
           ("All of it, or one part", "Complete ground handling, or single parts."),
           ("Under your brand", "Itineraries to offer as your own product.")]
T_LONG = [("Your client stays yours", "We can work entirely behind the scenes and speak through your company."),
          ("All of it, or one part", "Complete ground handling, or single parts of a journey."),
          ("Under your brand", "Complete itineraries to offer as your own Indonesian product.")]
T_CTA = '<a class="btn btn-primary" href="#trade">Get trade rates</a><span class="t-note">For registered travel companies</span>'

def _open(kind, wrap=True):
    return (f'<section class="trade trade-x trade-{kind}" id="trade" aria-labelledby="trade-title" data-reveal>\n'
            + ('  <div class="wrap">\n' if wrap else ''))

def _list(pairs, cls):
    return f'      <ul class="{cls}">' + "".join(f"<li><h3>{h}</h3><p>{t}</p></li>" for h, t in pairs) + "</ul>\n"

def trade_glass():
    # 2 Nov, user: the film runs edge to edge and square like the other films; the glass keeps the content edge
    return (_open("glass", False) +
            '    <div class="tg-stage">\n      ' + video("bluelagoon") + '\n'
            '      <div class="wrap t-over"><div class="tg-glass">\n'
            f'        <h2 id="trade-title">{T_HEAD}</h2>\n        <p class="t-lead">{T_LEAD}</p>\n  ' + _list(T_SHORT, "t-list") +
            f'        <div class="t-cta">{T_CTA}</div>\n      </div></div>\n    </div>\n</section>\n')

def trade_says():
    # 2 Nov, user: the glass over a film made design 1 too video-heavy; it takes the calm round-3 variant 2 instead
    says = [("Your client <em>stays yours</em>", T_LONG[0][1]), ("All of it, <em>or one part</em>", T_LONG[1][1]),
            ("Under <em>your brand</em>", T_LONG[2][1])]
    lis = "".join(f'<li style="--d:{260 + 260 * i}ms"><h3>{h}</h3><p>{t}</p></li>' for i, (h, t) in enumerate(says))
    return (_open("says") +
            f'    <div class="ts-head"><h2 id="trade-title" class="rv-up">{T_HEAD}</h2><p class="t-lead rv-up" style="--d:120ms">{T_LEAD}</p></div>\n'
            f'    <ul class="ts-says">{lis}</ul>\n'
            f'    <div class="t-cta rv-up" style="--d:1400ms">{T_CTA}</div>\n  </div>\n</section>\n')

def trade_letters():
    return (_open("letters") +
            '    <div class="tl">\n'
            '      <div class="tl-media">' + video("bluelagoon") +
            f'<div class="tl-plate"><h2 id="trade-title"><span class="ln"><span style="--d:0ms">For travel</span></span><span class="ln"><span style="--d:160ms">agents</span></span></h2></div></div>\n'
            f'      <div class="tl-side rv-up" style="--d:600ms"><p class="t-lead">{T_LEAD}</p><div class="t-cta">{T_CTA}</div></div>\n'
            '    </div>\n' + _list(T_LONG, "tl-cols rv-up").replace('class="tl-cols rv-up"', 'class="tl-cols rv-up" style="--d:850ms"') +
            '  </div>\n</section>\n')

def trade_water():
    return (_open("water", False) +
            '    <div class="tw-stage">\n'
            '      <div class="tw-base" role="img" aria-label="A sailing yacht in a turquoise lagoon among green karst islands"></div>\n'
            '      <div class="tw-water" aria-hidden="true"></div>\n'
            '      <div class="wrap t-over"><div class="tw-card">\n'
            f'        <h2 id="trade-title">{T_HEAD}</h2>\n        <p class="t-lead">{T_LEAD}</p>\n  ' + _list(T_SHORT, "t-list") +
            f'        <div class="t-cta">{T_CTA}</div>\n      </div></div>\n    </div>\n</section>\n')

def trade_shutters():
    photos = [("water8-2400", "A sailing yacht in a turquoise lagoon among green karst islands"),
              ("_RBE2063-1800", "Limestone cliffs over clear emerald water"),
              ("lagoon28-2400", "A blue lagoon among karst islands in Raja Ampat")]
    panes = "".join(
        f'<li class="tsh-pane{" is-on" if i == 0 else ""}" tabindex="0" style="--d:{250 + 150 * i}ms"><div class="tsh-in">'
        f'<img src="assets/img/{src}.webp" alt="{alt}" loading="lazy"><div class="tsh-copy"><h3>{h}</h3><p>{t}</p></div></div></li>'
        for i, ((src, alt), (h, t)) in enumerate(zip(photos, T_LONG)))
    return (_open("shutters") +
            f'    <div class="tsh-head"><div><h2 id="trade-title" class="rv-up">{T_HEAD}</h2><p class="t-lead rv-up" style="--d:120ms">{T_LEAD}</p></div>'
            f'<div class="t-cta rv-up" style="--d:240ms">{T_CTA}</div></div>\n  </div>\n'
            f'  <ul class="tsh-panes">{panes}</ul>\n</section>\n')

RIPPLE_JS = ('<script src="https://code.jquery.com/jquery-3.7.1.min.js" defer></script>\n'
             '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.ripples/0.5.3/jquery.ripples.min.js" defer></script>\n')
TRADE_BY_DESIGN = {1: lambda: trade_card(late=True),   # 2 Nov, latest: the user wants the design-5 framed card in 1 too
                   2: trade_letters, 3: trade_water, 4: trade_shutters}

V = [
    dict(num=1, title="1 · Expedition", css="v1.css", body="v1",
         fonts=GF.format("family=Red+Hat+Display:wght@500;700&family=Red+Hat+Text:wght@400;500"),
         logo=logo("1000 Islands Travel", "Remote Indonesia"),
         hero="hero-r1", yacht="phinisi-sunset", story="atoll",
         ra="2O4A3189", ns="0O0A9157", g=["2O4A6722", "2O4A1226", "_RBE2063", "DJI_0074"], cta="2O4A3377",
         gallery="accordion"),
    dict(num=2, title="2 · Field kit", css="v2.css", body="v2",
         fonts=GF.format("family=Saira+Condensed:wght@600;700;800&family=Saira:wght@400;500"),
         logo=logo("1000 Islands Travel", "Remote Indonesia"),
         hero="hero-r2", yacht="phinisi-sunset", story="atoll",
         ra="2O4A3267", ns="0O0A9741", g=["DJI_0442", "IMG_9812", "IMG_5353", "2O4A4824"], cta="2O4A3377",
         gallery="accordion"),   # 1 Nov: photos 1 and 3 replaced, sunset jetty in the final CTA, accordion gallery
    dict(num=3, title="3 · Quiet", css="v3.css", body="v3",
         fonts=GF.format("family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;1,8..60,300&family=Hanken+Grotesk:wght@400;500"),
         logo=logo("1000 Islands Travel", "Remote Indonesia"),
         hero="hero-r3", yacht="phinisi-sunset", story="lagoon", story_img="IMG_9812",   # 2 Nov review: r3 opens on the atoll island, so the story takes the lagoon;
         # later 2 Nov, user: too many films in 3, the story gets his sunny photo 18 (IMG_9812) instead
         ra="_RBE2063", ns="0O0A9741", g=["_RBE2059", "IMG_5353", "2O4A4797", "2O4A1547"], cta="2O4A3377",
         hero_control=True),
    dict(num=4, title="4 · Reef", css="v4.css", body="v4",
         fonts=GF.format("family=Bricolage+Grotesque:opsz,wdth,wght@12..96,75..100,400..800"),
         logo=logo("1000 Islands Travel", "Remote Indonesia"),
         hero="hero-r4", yacht="phinisi-sunset", story="atoll",
         ra="2O4A3189", ns="0O0A9157", g=["2O4A1547", "DJI_0442", "IMG_5357", "_RBE2059"], cta="_RBE2052"),   # 2 Nov: 2O4A4792 read soft (77 KB at 1800 px)
    dict(num=5, title="5 · Chart", css="v5.css", body="v5",
         fonts=GF.format("family=Archivo:wdth,wght@62..125,400..800&family=Martian+Mono:wght@400"),
         logo=logo("1000 Islands Travel", "Remote Indonesia"),
         hero="hero-r5", yacht="phinisi-sunset", story="atoll",
         ra="DJI_0074", ns="0O0A9741", g=["IMG_9819", "2O4A3267", "_RBE2062", "0O0A0227"], cta="2O4A4797"),
]

if __name__ == "__main__":
    for v in V:
        sub = {k: str(v[k]) for k in ("num", "title", "css", "body", "fonts", "logo", "hero")}
        sub["hero_deco"] = v.get("hero_deco", "")
        sub["hero_control"] = HERO_CONTROL if v.get("hero_control") else ""
        sub["nav_where"] = NAV_DROP if v["num"] == 1 else NAV_LINKS
        # Icons only in v4 Reef (2 Nov, user: try them in one direction): step icons, contact and WhatsApp marks
        icons_on = v["num"] == 4
        for name in list(STROKE) + list(FILL): sub[f"ic_{name}"] = icon(name) if icons_on else ""
        steps = ["message-circle", "route", "compass", "sailboat"]
        for i, name in enumerate(steps, 1): sub[f"step_{i}"] = icon(name) if icons_on else f"{i:02d}"
        sub["step_cls"] = " step-ic" if icons_on else ""
        sub["body_attr"] = " data-rails" if v["num"] in (4, 5) else ""   # phone carousels with dots (2 Nov)
        sub["gallery_attr"] = ' data-accordion="all"' if v.get("gallery") == "accordion" else ""
        sub["hero_video"], sub["yacht_video"], sub["story_video"] = video(v["hero"]), video(v["yacht"]), (
            pic(v["story_img"], "100vw") if v.get("story_img") else video(v["story"]))
        sub["ra_pic"] = pic(v["ra"], "(max-width: 860px) 100vw, 50vw")
        sub["ns_pic"] = pic(v["ns"], "(max-width: 860px) 100vw, 50vw")
        for i, pid in enumerate(v["g"], 1):
            sub[f"g{i}_pic"] = pic(pid, "(max-width: 860px) 50vw, 30vw")
        sub["cta_pic"] = pic(v["cta"], "100vw")
        sub["trade"] = trade_card() if v["num"] == 5 else TRADE_BY_DESIGN[v["num"]]()
        sub["extra_js"] = RIPPLE_JS if v["num"] == 3 else ""
        html = TPL.replace('<link rel="stylesheet" href="base.css">', preload(v["hero"]) + '\n<link rel="stylesheet" href="base.css">', 1)
        for k, val in sub.items():
            html = html.replace("{{" + k + "}}", val)
        assert "{{" not in html, v["num"]
        (ROOT / f"v{v['num']}.html").write_text(html, encoding="utf-8")
        print("built", f"v{v['num']}.html")
