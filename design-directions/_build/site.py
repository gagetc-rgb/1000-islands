# The whole site in design 5 "Chart" (5 Nov 2026): the owner picked direction 5, without the phone swipe rails.
# Structure = the owner-approved Stage 1 mockup (wireframes/*.html), page by page, block by block.
# Copy = the owner's own text (1000-islands-website-ux-content-structure.md, part 1) where it exists; facts the owner has
# not given yet (prices, boats, team, reviews, terms) stay visible placeholders.
# Output: design-directions/site/*.html (shares ../assets, ../base.css, ../v5.css with the five directions).
# Run: python -I _build/site.py
import re, sys, json, html as H
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parent))
from build import pic as _pic, video as _video, logo, icon, ALT, T_HEAD, T_LEAD, T_LONG, T_SHORT
from config import ROOT, ASSETS

OUT = ROOT / "site"
OUT.mkdir(exist_ok=True)
FONTS = "https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..800&family=Martian+Mono:wght@400&display=swap"
LOGO = logo("1000 Islands Travel", "Remote Indonesia")
WA = "#"   # WhatsApp / email / Instagram: real addresses come from the owner

def pic(pid, sizes="100vw"): return _pic(pid, sizes)
def video(name): return _video(name)

def still(src, alt, w=1920, h=1080):
    """A single-size image (video posters, the 2400 px lagoon stills)."""
    return f'<img src="assets/{src}" width="{w}" height="{h}" alt="{alt}" loading="lazy" decoding="async">'

ALT.update({"whaleshark": "A whale shark at the surface in Triton Bay",
            "phinisi": "A traditional phinisi under way at sunset"})

# ---------- small shared pieces ----------
CHECK = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 12.5 9.5 17.5 19.5 6.5"/></svg>'
CROSS = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>'
ARROW = '<svg class="ic arr" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h15M13 6l6 6-6 6"/></svg>'
WA_IC = icon("whatsapp")

def go(href, text, cls="go"):
    return f'<a class="{cls}" href="{href}"><span>{text}</span>{ARROW}</a>'

def ph(caption, ratio="3/2", cls=""):
    """Placeholder for a photo the owner has not sent yet: a hatched frame that says what goes here."""
    return f'<div class="ph {cls}" style="aspect-ratio:{ratio}" role="img" aria-label="{caption}"><span>{caption}</span></div>'

def person(name="Name, the person who answers you", role="Role · replies within 24 hours, 7 days a week", cls="cta-person"):
    return (f'<figure class="{cls}"><span class="cta-person-ph" aria-hidden="true"></span>'
            f'<figcaption><b>{name}</b><span>{role}</span></figcaption></figure>')

NAV = [("raja-ampat.html", "Raja Ampat"), ("north-sulawesi.html", "North Sulawesi"), ("yachts.html", "Yacht charters"),
       ("stories.html", "Guest stories"), ("about.html", "About us")]

def header(cur):
    links = "".join(f'      <a href="{h}"{" aria-current=\"page\"" if h == cur else ""}>{t}</a>\n' for h, t in NAV)
    trade_cur = ' aria-current="page"' if cur == "advisors.html" else ""
    return f'''<header class="hdr">
  <div class="hdr-in">
    <a class="logo" href="index.html" aria-label="1000 Islands Travel, home"><span class="logo-name">1000 Islands Travel</span></a>
    <nav class="nav" aria-label="Main">
{links}      <a class="btn btn-trade" href="advisors.html"{trade_cur}>Travel agents</a>
      <a class="btn btn-primary" href="plan.html">Plan your trip</a>
    </nav>
    <details class="menu">
      <summary aria-label="Menu"><svg class="i-burger" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h18M3 12h18M3 17h18"/></svg><svg class="i-close" viewBox="0 0 24 24" aria-hidden="true"><path d="M5.5 5.5l13 13M18.5 5.5l-13 13"/></svg></summary>
      <nav class="menu-panel" aria-label="Main, mobile">
{links.replace("      <a", "        <a")}        <a class="btn btn-trade" href="advisors.html">Travel agents</a>
        <a class="btn btn-primary" href="plan.html">Plan your trip</a>
        <a class="btn btn-ghost btn-ic" href="{WA}">{WA_IC}<span>WhatsApp</span></a>
      </nav>
    </details>
  </div>
</header>
'''

FOOTER = f'''<footer class="ftr">
  <div class="wrap">
    <div class="ftr-cols">
      <div class="ftr-brand"><a class="logo" href="index.html" aria-label="1000 Islands Travel, home">{LOGO}</a><p>Private journeys and expeditions across Indonesia.</p></div>
      <div><h2>Where we go</h2><ul><li><a href="raja-ampat.html">Raja Ampat</a></li><li><a href="north-sulawesi.html">North Sulawesi</a></li><li><a href="yachts.html">Yacht charters</a></li></ul></div>
      <div><h2>Travel</h2><ul><li><a href="stories.html">Guest stories</a></li><li><a href="plan.html">Plan your trip</a></li></ul></div>
      <div><h2>Company</h2><ul><li><a href="about.html">About us</a></li><li><a href="about.html#how">How we travel</a></li><li><a href="about.html#faq">FAQ</a></li><li><a href="advisors.html">Travel agents</a></li></ul></div>
      <div><h2>Contact</h2><ul class="ftr-contact"><li><a href="{WA}">WhatsApp</a></li><li><a href="{WA}">Email</a></li><li><a href="{WA}">Instagram</a></li></ul></div>
    </div>
    <div class="ftr-bottom"><span>© 1000 Islands Travel · 1000islands.travel</span><span><a href="privacy.html">Privacy &amp; cookies</a> · <a href="terms.html">Booking terms</a> · <a href="#cookies" data-cookie-settings>Cookie settings</a></span><span>PT company name · registered address, Indonesia · licence no. …</span></div>
  </div>
</footer>
'''

COOKIES = '''<div class="ck" id="cookies" hidden>
  <div class="ck-card" role="region" aria-labelledby="ck-title">
    <h2 id="ck-title">We use cookies</h2>
    <p>Some keep the site working; others, only with your yes, tell us which pages help. <a class="text-link" href="privacy.html#s4">Privacy &amp; cookies</a></p>
    <div class="btns"><button class="btn btn-primary" type="button" data-ck="all">Accept all</button><button class="btn btn-ghost" type="button" data-ck="none">Reject all</button><button class="btn-text" type="button" data-cookie-settings aria-label="Cookie settings">Settings</button></div>
  </div>
</div>
<dialog class="ck-dialog" aria-labelledby="ckd-title">
  <form method="dialog">
    <h2 id="ckd-title">Cookie settings</h2>
    <ul class="ck-rows">
      <li><div><h3>Necessary</h3><p>Keep the site and the forms working. Always on.</p></div><input type="checkbox" checked disabled aria-label="Necessary cookies, always on"></li>
      <li><div><h3><label for="ck-an">Analytics</label></h3><p>Count visits and pages, without your name.</p></div><input id="ck-an" type="checkbox" role="switch"></li>
      <li><div><h3><label for="ck-mk">Marketing</label></h3><p>Measure our ads on other sites.</p></div><input id="ck-mk" type="checkbox" role="switch"></li>
    </ul>
    <div class="btns"><button class="btn btn-primary" value="save" data-ck="save">Save choices</button><button class="btn btn-ghost" value="all" data-ck="all">Accept all</button></div>
  </form>
</dialog>
'''

def mbar(href="plan.html"):
    return (f'<div class="mbar" aria-hidden="true"><a class="btn btn-primary" href="{href}" tabindex="-1">Plan your trip</a>'
            f'<a class="btn btn-ghost btn-ic" href="{WA}" tabindex="-1">{WA_IC}<span>WhatsApp</span></a></div>\n')

def page(slug, title, main, cur=None, hero=None, body_cls="", desc="", bar=True):
    """hero: video name of the first-screen film (adds the loading screen and preloads its poster)."""
    load = ('<script>if (!/[?&]noloader/.test(location.search)) document.documentElement.classList.add("is-loading")</script>\n'
            if hero else "")
    pre = (f'<link rel="preload" as="image" href="assets/video/{hero}-m.webp" media="(max-width: 760px)">\n'
           f'<link rel="preload" as="image" href="assets/video/{hero}.webp" media="(min-width: 761px)">\n') if hero else ""
    loader = (f'<div class="loader" role="status" aria-live="polite" style="--li:url(assets/video/{hero}.webp);--li-sm:url(assets/video/{hero}-m.webp)">'
              f'<span class="logo loader-logo">{LOGO}</span><span class="loader-bar" aria-hidden="true"><i></i></span><span class="sr-only">Loading</span></div>\n') if hero else ""
    doc = f'''<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<meta name="description" content="{desc or 'Private journeys to Raja Ampat and North Sulawesi, led by our own team on the ground.'}">
<link rel="icon" href="data:,">
<title>{title}</title>
{load}<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="{FONTS}">
{pre}<link rel="stylesheet" href="../base.css">
<link rel="stylesheet" href="../v5.css">
<link rel="stylesheet" href="site.css">
</head>
<body class="v5 {body_cls}">
{loader}<a class="skip" href="#main">Skip to content</a>
{header(cur)}
<main id="main">
{main}
</main>
{FOOTER}{mbar() if bar else ""}{COOKIES}<script src="site.js" defer></script>
</body>
</html>
'''
    # media paths: the pages live one folder down from assets/
    doc = re.sub(r'(?<=["(\s,])assets/', '../assets/', doc)
    assert "{{" not in doc and "}}" not in doc, slug
    (OUT / slug).write_text(doc, encoding="utf-8")
    print("built", slug)

# ---------- page blocks ----------
def cta(title, text="Tell us where and when, and we handle the rest.", img=None, plan="plan.html"):
    media = f'<div class="cta-media">{img}</div>' if img else ""
    return f'''<section class="cta" id="plan" aria-labelledby="cta-title">
  {media}
  <div class="wrap cta-in">
    <h2 id="cta-title">{title}</h2>
    <p class="cta-text">{text}</p>
    <div class="btns">
      <a class="btn btn-hero" href="{plan}">Plan your trip</a>
      <a class="btn btn-ghost btn-ic" href="{WA}">{WA_IC}<span>WhatsApp us</span></a>
    </div>
    {person()}
    <p class="agent-line">Travel agent? <a class="text-link" href="advisors.html">Get trade rates</a></p>
  </div>
</section>'''

def landing_hero(title, lead, film=None, img=None, btns="", facts=(), sub=(), extra=""):
    media = video(film) if film else img
    cells = "".join(f'<div{" class=\"hide-phone\"" if hp else ""}><dt>{k}</dt><dd>{v}</dd></div>' for k, v, hp in facts)
    tabs = "".join(f'<a href="{h}"{" class=\"tab-cta\"" if c else ""}>{t}</a>' for h, t, c in sub)
    return f'''<div class="first-l">
<section class="hero hero-landing" id="top" aria-labelledby="hero-title">
  <div class="hero-media">{media}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="hero-copy">
    <h1 id="hero-title">{title}</h1>
    <p class="hero-lead">{lead}</p>
    <div class="hero-actions">{btns}</div>{extra}
  </div>
</section>
<div class="facts-band"><div class="wrap"><dl class="facts n{len(facts)}">{cells}</dl></div></div>
</div>
<nav class="subnav" aria-label="On this page"><div class="wrap">{tabs}</div></nav>'''

def faq(items, open_first=True, ids=None):
    out = []
    for i, (q, a) in enumerate(items):
        idattr = f' id="{ids[i]}"' if ids and ids[i] else ""
        out.append(f'<details{idattr}{" open" if (i == 0 and open_first) else ""}><summary><span>{q}</span><i aria-hidden="true"></i></summary><div class="faq-a"><p>{a}</p></div></details>')
    return '<div class="faq">' + "".join(out) + "</div>"

def review(who="Guest name", where="Country · Raja Ampat · Month, year", text="A guest review goes here: two or three lines in their own words."):
    return f'<figure class="rev"><blockquote>{text}</blockquote><figcaption><b>{who}</b><span>{where}</span></figcaption></figure>'

def chart(places, lon0, lon1, lat0, lat1, label):
    """Positions chart in the v5 'nautical chart' language: 1° graticule, the equator in the mark colour, places by their
    coordinates (approximate), dashed tracks from our base. No coastlines on purpose: it is a chart of where, not a map.
    Labels are HTML on top of the SVG so they stay 16 px at every width."""
    W = 1000; Hh = round(W * (lat1 - lat0) / (lon1 - lon0))
    x = lambda lon: (lon - lon0) / (lon1 - lon0) * W
    y = lambda lat: (lat1 - lat) / (lat1 - lat0) * Hh
    lines = []
    for lo in range(int(lon0) + 1, int(lon1) + 1):
        lines.append(f'<line x1="{x(lo):.0f}" y1="0" x2="{x(lo):.0f}" y2="{Hh}"/>')
    la = int(lat0) - 1
    while la <= lat1:
        if lat0 < la < lat1:
            cls = ' class="eq"' if la == 0 else ""
            lines.append(f'<line{cls} x1="0" y1="{y(la):.0f}" x2="{W}" y2="{y(la):.0f}"/>')
        la += 1
    bases = {p["name"]: p for p in places if p.get("base")}
    first = next(iter(bases.values()))
    def trk(p):
        b = bases.get(p.get("from"), first)
        return f'<path class="trk" d="M{x(b["lon"]):.0f} {y(b["lat"]):.0f} L{x(p["lon"]):.0f} {y(p["lat"]):.0f}"/>'
    tracks = "".join(trk(p) for p in places if not p.get("base") and p.get("track", True))
    dots = "".join(f'<circle class="{"base" if p.get("base") else "pt"}" cx="{x(p["lon"]):.0f}" cy="{y(p["lat"]):.0f}" r="{11 if p.get("base") else 8}"/>' for p in places)
    labels = "".join(f'<span class="cl {p.get("at", "r")}{" is-base" if p.get("base") else ""}" style="left:{x(p["lon"]) / W * 100:.2f}%;top:{y(p["lat"]) / Hh * 100:.2f}%">{p["name"]}</span>' for p in places)
    ticks = []
    for lo in range(int(lon0) + 1, int(lon1) + 1, 2):
        if .09 < x(lo) / W < .93: ticks.append(f'<span class="tk x" style="left:{x(lo) / W * 100:.2f}%">{lo}°E</span>')
    la = int(lat0)
    while la <= lat1:
        if lat0 < la < lat1 and la % 2 == 0 and y(la) / Hh < .88:
            ticks.append(f'<span class="tk y" style="top:{y(la) / Hh * 100:.2f}%">{abs(la)}°{"N" if la > 0 else "S" if la < 0 else ""}</span>')
        la += 1
    return (f'<figure class="chart" style="aspect-ratio:{W}/{Hh}" role="img" aria-label="{label}">'
            f'<svg viewBox="0 0 {W} {Hh}" preserveAspectRatio="none" aria-hidden="true"><g class="grat">{"".join(lines)}</g>{tracks}{dots}</svg>'
            f'<div class="chart-l" aria-hidden="true">{labels}{"".join(ticks)}</div></figure>')

RA_PLACES = [dict(name="Sorong", lat=-0.88, lon=131.25, base=True, at="r"),
             dict(name="Wayag", lat=-0.17, lon=130.03, at="r"),
             dict(name="Central", lat=-0.55, lon=130.45, at="b"),
             dict(name="Misool", lat=-1.92, lon=130.15, at="r"),
             dict(name="Triton Bay", lat=-3.82, lon=134.05, at="l")]
NS_PLACES = [dict(name="Manado", lat=1.49, lon=124.84, base=True, at="r"),
             dict(name="Bunaken", lat=1.62, lon=124.76, at="l", track=False),
             dict(name="Siau", lat=2.73, lon=125.40, at="r"),
             dict(name="Sangihe", lat=3.58, lon=125.52, at="r"),
             dict(name="Halmahera", lat=0.95, lon=127.85, at="b"),
             dict(name="Widi", lat=-0.55, lon=128.40, at="l")]
SEA_PLACES = [dict(name="Manado", lat=1.49, lon=124.84, base=True, at="r"),
              dict(name="Siau", lat=2.73, lon=125.40, at="r"),
              dict(name="Sangihe", lat=3.58, lon=125.52, at="r"),
              dict(name="Sorong", lat=-0.88, lon=131.25, base=True, at="r"),
              dict(name="Wayag", lat=-0.17, lon=130.03, at="t", **{"from": "Sorong"}),
              dict(name="Misool", lat=-1.92, lon=130.15, at="l", **{"from": "Sorong"}),
              dict(name="Triton Bay", lat=-3.82, lon=134.05, at="l", **{"from": "Sorong"})]

def trips(region, levels, unit="pp", key="trips", title=None, lead=""):
    """Levels with a days slider (as the mockup): price per level recalculates from data-rates; demo rates only."""
    cards = []
    for i, (lvl, sub, media, rates) in enumerate(levels):
        btn = "btn-primary" if i == 1 else "btn-ghost"
        u = "pp" if unit == "pp" else '<span class="unit">whole boat</span>'
        cards.append(f'''<article class="trip" data-level="{lvl}" data-rates='{json.dumps(rates)}'>
        <div class="trip-media">{media}</div>
        <div class="trip-body"><h3>{lvl}</h3><p class="trip-sub">{sub}</p>
          <div class="buy"><p class="trip-price">from <b>$X,XXX</b> {u}</p><a class="btn {btn}" href="plan.html">Plan this trip</a></div></div>
      </article>''')
    head = f'<div><h2 id="{key}">{title}</h2>{f"<p class=\"sec-lead\">{lead}</p>" if lead else ""}</div>'
    return f'''<div class="trip-head">{head}<div class="days"><label for="days">How many days?</label><div class="days-row"><input id="days" type="range" min="3" max="21" value="7" step="1"><output for="days"><b>7</b> days</output></div></div></div>
    <div class="trips" data-region="{region}">
      {"".join(cards)}
    </div>'''

TRUST = ('<ul class="trust">' + "".join(f"<li>{CHECK}<span>{t}</span></li>" for t in
         ["Deposit X% to confirm", "Our team on the ground 24/7", "Medical evacuation plan", "Dive safety standards"]) +
         '<li><span>Google rating X.X</span></li><li><a class="text-link" href="#faq">Details in FAQ</a></li></ul>')

FAQ_COMMON = {
    "best": ("When is the best time to travel?", "Indonesia covers an enormous area, so seasons vary between regions. We recommend a destination by the month you travel, not by one season for the whole country."),
    "diver": ("Do I need to be a diver?", "No. Many journeys combine snorkelling, islands, wildlife and time on land. Diving is optional unless a trip says otherwise."),
    "sick": ("What if someone gets sick or hurt?", "Before every journey we plan the route around the nearest medical help and an evacuation plan. Our team on the ground is reachable 24/7."),
}

def region_page(slug, name, h1_lead, why_lead, film, gallery, places, areas, levels, faq_get, cta_img, chart_label, where, plan_q):
    sub = [("#why", "Why go", 0), ("#trips", "Trips and prices", 0), ("#reviews", "Reviews", 0), ("#faq", "FAQ", 0)]
    facts = [("Where", where, 1), ("Best months", "Month–month", 0), ("Trip length", "3+ days", 1), ("Diving", "Optional", 0), ("From", "$X,XXX pp", 0)]
    btns = (f'<a class="btn btn-hero" href="#trips">See trips and prices</a>'
            f'<a class="link-hero hide-phone" href="plan.html?region={plan_q}">Plan a {name} trip</a>')
    area_li = "".join(f'<li><div class="area-media">{m}</div><div><h3>{t}</h3><p>{d}</p>{"<span class=\"addon\">Add-on</span>" if add else ""}</div></li>'
                      for t, d, m, add in areas)
    main = f'''{landing_hero(name, h1_lead, film=film, btns=btns, facts=facts, sub=sub)}

<section class="sec" aria-labelledby="why">
  <div class="wrap">
    <div class="sec-head"><h2 id="why">Why go to {name}</h2><p class="sec-lead">{why_lead}</p></div>
    <div class="frames3">{"".join(f'<figure class="fr">{g}</figure>' for g in gallery)}</div>
    <div class="areas">
      {chart(places, *chart_label[1], chart_label[0])}
      <ul class="area-list">{area_li}</ul>
    </div>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="trips">
  <div class="wrap">
    {trips(name, levels, title=f"Private trips in {name}")}
    <p class="basis">Prices per person, two travellers sharing; the slider shows how the price moves with days. The final price comes with your proposal.</p>
    <div class="after-trips"><p>Prefer your own boat? {go("yachts.html", "Yacht charters")}</p><p>What a trip looks like: {go("stories.html#story-1", "a real 9-day trip")}</p></div>
    {TRUST}
  </div>
</section>

<section class="sec" aria-label="Reviews and FAQ">
  <div class="wrap split2">
    <div id="reviews"><h2>Reviews</h2><p class="rating">Google rating X.X · <a class="text-link" href="#">Read on Google</a></p>
      <div class="rev-stack">{review(where=f"Country · {name} · Month, year")}{review(where=f"Country · {name} · Month, year")}</div>
    </div>
    <div id="faq"><h2>FAQ</h2>{faq([FAQ_COMMON["best"], faq_get, FAQ_COMMON["diver"], FAQ_COMMON["sick"]], ids=[None, "faq-getting-there", None, None])}
      <p class="more-q">{go("about.html#faq", "More questions")}</p></div>
  </div>
</section>

{cta(f"Plan your {name} trip", img=cta_img, plan=f"plan.html?region={plan_q}")}'''
    page(slug, f"{name} · Private trips · 1000 Islands Travel", main, cur=slug, hero=film,
         desc=f"Private trips in {name}, planned and run by our own team on the ground.")

# ---------- home ----------
def trade_letters_v5():
    cols = "".join(f'<li><h3>{h}</h3><p>{t}</p></li>' for h, t in T_LONG)
    return f'''<section class="trade trade-x trade-letters" id="trade" aria-labelledby="trade-title" data-reveal>
  <div class="wrap">
    <div class="tl">
      <div class="tl-media">{video("bluelagoon")}<div class="tl-plate"><h2 id="trade-title"><span class="ln"><span style="--d:0ms">For travel</span></span><span class="ln"><span style="--d:160ms">agents</span></span></h2></div></div>
      <div class="tl-side rv-up" style="--d:600ms"><p class="t-lead">{T_LEAD}</p><div class="t-cta"><a class="btn btn-primary" href="advisors.html">Get trade rates</a><span class="t-note">For registered travel companies</span></div></div>
    </div>
    <ul class="tl-cols rv-up" style="--d:850ms">{cols}</ul>
  </div>
</section>'''

def trade_card_v5():
    pts = [('handshake', *T_SHORT[0]), ('layers', *T_SHORT[1]), ('tag', *T_SHORT[2])]
    frame = '<span class="tfr{0}" aria-hidden="true"><i class="t"></i><i class="r"></i><i class="b"></i><i class="l"></i></span>'
    lis = ''.join(f'<li class="m"><div style="--d:{560 + 200 * i}ms">{icon(n)}<h3>{h}</h3><p>{t}</p></div></li>' for i, (n, h, t) in enumerate(pts))
    return f'''<section class="trade trade-card" id="trade" aria-labelledby="trade-title" data-reveal>
  <div class="wrap">
    <div class="tcard">
      {frame.format("")}{frame.format(" tfr-i")}
      <div class="tcard-head">
        <h2 id="trade-title" class="m"><span style="--d:200ms">{T_HEAD}</span></h2>
        <p class="trade-lead m"><span style="--d:380ms">{T_LEAD}</span></p>
        <div class="trade-cta m"><div style="--d:1250ms"><a class="btn btn-primary" href="advisors.html">Get trade rates</a><span class="trade-note">For registered travel companies</span></div></div>
      </div>
      <ul class="tpoints">{lis}</ul>
    </div>
  </div>
</section>'''

def home(slug, trade):
    main = f'''<section class="hero" id="top" aria-labelledby="hero-title">
  <div class="hero-media">{video("hero-r5")}</div>
  <div class="hero-shade" aria-hidden="true"></div>
  <div class="hero-copy">
    <h1 id="hero-title">Remote Indonesia.<br>Off the map.</h1>
    <p class="hero-lead">Private journeys to Raja Ampat and North Sulawesi,<br> led by our own team on the ground.</p>
    <div class="hero-actions"><a class="btn btn-hero" href="plan.html">Plan your trip</a><a class="link-hero" href="#where">Where we go</a></div>
  </div>
</section>

<section class="where" id="where" aria-labelledby="where-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="where-title">Where we go</h2><p class="sec-lead">Two regions we know island by island.</p></div>
    <div class="dest-grid">
      <a class="dest" href="raja-ampat.html"><figure class="dest-media">{pic("2O4A3189", "(max-width: 860px) 100vw, 50vw")}</figure>
        <div class="dest-body"><h3>Raja Ampat</h3><p class="dest-tag">The heart of the Coral Triangle</p><p class="dest-meta"><span class="price">from $X,XXX pp</span></p></div></a>
      <a class="dest" href="north-sulawesi.html"><figure class="dest-media">{pic("0O0A9741", "(max-width: 860px) 100vw, 50vw")}</figure>
        <div class="dest-body"><h3>North Sulawesi</h3><p class="dest-tag">Living between volcanoes and the sea</p><p class="dest-meta"><span class="price">from $X,XXX pp</span></p></div></a>
    </div>
  </div>
</section>

<section class="yacht" id="yachts" aria-labelledby="yacht-title">
  <div class="yacht-media">{video("phinisi-sunset")}</div>
  <div class="wrap yacht-copy">
    <h2 id="yacht-title">Yacht charters</h2>
    <p class="price yacht-price">from $X,XXX per day, whole boat</p>
    <a class="btn btn-on-media" href="yachts.html">Plan a charter</a>
  </div>
</section>

<section class="easy" id="easy" aria-labelledby="easy-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="easy-title">Remote, made easy</h2><p class="sec-lead">Eight years on the ground. One team takes your trip from the first message to the last boat transfer.</p></div>
    <ol class="steps">
      <li><span class="num" aria-hidden="true">01</span><h3>Tell us</h3><p>Where, when, and how you like to travel.</p></li>
      <li><span class="num" aria-hidden="true">02</span><h3>We design it</h3><p>We design the route around you.</p></li>
      <li><span class="num" aria-hidden="true">03</span><h3>We handle everything</h3><p>Flights, boats, permits and local guides.</p></li>
      <li><span class="num" aria-hidden="true">04</span><h3>You travel</h3><p>We stay one message away the whole trip.</p></li>
    </ol>
  </div>
</section>

<section class="story" id="story" aria-labelledby="story-title">
  <div class="story-media">{pic("IMG_9812", "100vw")}</div>
  <div class="wrap story-copy">
    <h2 id="story-title">Nine days in Raja Ampat</h2>
    <p class="story-meta">Guest story · Comfort · 9 days · Month, year</p>
    <p class="story-quote">A short line from the guests goes here, in their own words.</p>
    <div class="btns with-link"><a class="btn btn-on-media" href="stories.html#story-1">Read the story</a><a class="link-hero" href="stories.html">All guest stories</a></div>
  </div>
</section>

<section class="reviews" aria-labelledby="reviews-title">
  <div class="wrap">
    <div class="sec-head"><h2 id="reviews-title">What guests say</h2><p class="sec-lead">Google rating X.X · XX reviews · <a class="text-link" href="#">Read on Google</a></p></div>
    <div class="rev-grid">{review()}{review(where="Country · North Sulawesi · Month, year")}{review()}</div>
  </div>
</section>

{trade}

{cta("Start with an idea", img=pic("2O4A4797", "(max-width: 860px) 100vw, 50vw"))}'''
    page(slug, "1000 Islands Travel · Private journeys in remote Indonesia", main, hero="hero-r5", body_cls="home")

# ---------- pages ----------
def yachts():
    sub = [("#why", "Why a yacht", 0), ("#boats", "Boats and prices", 0), ("#where", "Where we sail", 0), ("#faq", "FAQ", 0)]
    facts = [("Where", "Raja Ampat · North Sulawesi", 1), ("Boats", "X boats", 0), ("Trip length", "3+ days", 0), ("From", "$X,XXX / day", 0)]
    btns = '<a class="btn btn-hero" href="#boats">See boats and prices</a><a class="link-hero hide-phone" href="plan.html?region=Yacht+charter">Plan a yacht trip</a>'
    boats = [(f"Boat {i}", "X cabins, en-suite · air-con · chef · dive guide",
              ph(f"Boat {i} under sail · photos from the owner") + '<span class="count">1 / 12</span>', r)
             for i, r in [(1, {"base": 4500, "steps": [[8, 4200], [12, 3900]]}), (2, {"base": 6500, "steps": [[8, 6000], [12, 5600]]}),
                          (3, {"base": 12000, "steps": [[8, 11000], [12, 10000]]})]]
    inc = "".join(f"<li>{CHECK}<span>{t}</span></li>" for t in ["The whole boat and its crew", "All meals on board", "Dive guide and tanks", "Item from the owner"])
    exc = "".join(f"<li>{CROSS}<span>{t}</span></li>" for t in ["Flights to the port", "Marine park fees", "Item from the owner"])
    main = f'''{landing_hero("Yacht charters", "For many parts of eastern Indonesia, a yacht is not only the most comfortable way to travel. It is the best way to reach them.", film="phinisi-sunset", btns=btns, facts=facts, sub=sub)}

<section class="sec" aria-labelledby="why">
  <div class="wrap split-media">
    <div class="split-text"><h2 id="why">Why a yacht</h2>
      <p class="big">A private yacht lets the route follow the islands rather than the roads.</p>
      <p>Wake up beside an uninhabited island. Dive before breakfast. Move to another anchorage over lunch. Spend the afternoon in a lagoon you can only reach by boat.</p>
      <p>We work with selected yachts and traditional Indonesian phinisi. We choose the vessel for your group and route, rather than forcing the journey around one boat.</p></div>
    <figure class="fr r45">{pic("2O4A3267", "(max-width: 860px) 100vw, 40vw")}</figure>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="boats">
  <div class="wrap">
    {trips("Yacht charter", boats, unit="boat", key="boats", title="Boats and prices", lead="Whole-boat prices; the slider shows the total for your days.")}
    <p class="basis">Price for the whole boat, all guests on board. The final price comes with your proposal.</p>
    <div class="inset">
      <div class="inset-media">{ph("Video · helicopter alongside the boat · from the owner", "16/9")}</div>
      <div><h3>Helicopter transfers on request</h3><p class="meta">Guest story · whole boat · 10 days · Misool to Wayag</p><p>{go("stories.html#story-2", "Read the story")}</p></div>
    </div>
    <div class="incl"><div><h3>Included</h3><ul class="ticks">{inc}</ul></div><div><h3>Not included</h3><ul class="ticks no">{exc}</ul></div></div>
  </div>
</section>

<section class="sec" aria-labelledby="where">
  <div class="wrap split-media media-left">
    {chart(SEA_PLACES, 123.8, 134.8, -4.6, 4.3, "Where we sail: North Sulawesi in the north-west, Raja Ampat and Triton Bay in the east")}
    <div class="split-text"><h2 id="where">Where we sail</h2>
      <p>Two seas we know well: the reefs and islands of Raja Ampat with Misool and Triton Bay, and the volcanic islands of North Sulawesi up to Sangihe.</p>
      <nav class="go-list" aria-label="Regions">{go("raja-ampat.html", "Raja Ampat")}{go("north-sulawesi.html", "North Sulawesi")}</nav></div>
  </div>
</section>

<section class="sec sec-flush" aria-labelledby="faq">
  <div class="wrap narrow">
    <div class="sec-head one"><h2 id="faq">Yacht FAQ</h2></div>
    {faq([("Whole boat or a single cabin?", "We charter whole boats, so the route and the days are yours. The owner's answer on shared cabins goes here."),
          ("How many guests can a boat take?", "It depends on the boat: from a couple to larger groups. Each boat above lists its cabins."),
          ("What is a day on board like?", "Wake up at anchor, swim or dive before breakfast, move to the next island over lunch, and spend the afternoon in a lagoon."),
          ("Can we start and end anywhere?", "Routes start and end in the ports the boats work from, such as Sorong. The owner's details go here."),
          ("Can you add helicopter transfers?", "Yes, on request. Ask us when you plan the trip.")])}
  </div>
</section>

{cta("Plan your yacht trip", img=still("img/lagoon28-2400.webp", "A blue lagoon among karst islands in Raja Ampat", 2400, 1350), plan="plan.html?region=Yacht+charter")}'''
    page("yachts.html", "Yacht charters · 1000 Islands Travel", main, cur="yachts.html", hero="phinisi-sunset",
         desc="Private yacht charters in Raja Ampat and North Sulawesi: whole boats, crew, chef and dive guide.")

def stories():
    stops = [("Day 1 · arrival", "Landing in Sorong, a boat to the islands and the first swim before dinner.", pic("2O4A4797", "(max-width: 860px) 100vw, 33vw")),
             ("Day X · an anchorage", "A still lagoon, nobody else in sight. The guests' own words go here.", pic("IMG_9812", "(max-width: 860px) 100vw, 33vw")),
             ("Day X · the last evening", "The last sunset from the jetty. The guests' own words go here.", pic("2O4A3377", "(max-width: 860px) 100vw, 33vw"))]
    route = "".join(f'<li><figure class="fr">{m}</figure><p class="meta">{d}</p><p>{t}</p></li>' for d, t, m in stops)
    def card(i, title, meta, img, line, guest, plan):
        return f'''<article class="story-card" id="story-{i}">
        <figure class="fr">{img}</figure>
        <div class="sc-body"><h3>{title}</h3><p class="meta">{meta}</p><p>A short summary of the trip goes here, two lines in plain words.</p>
          <details class="more"><summary>Read the story</summary>
            <div class="more-body"><p class="routeline">{line}</p><p>The story of the trip goes here: the route, the days, what went to plan and what did not.</p>
              <blockquote>A line from the guests, in their own words.</blockquote><p class="meta">{guest}</p><p>{go(plan, "Plan a similar trip")}</p></div>
          </details></div>
      </article>'''
    main = f'''<div class="first">
<section class="page-head" aria-labelledby="page-title">
  <div class="wrap sec-head"><h1 id="page-title">Guest stories</h1><p class="sec-lead">Real trips, told by the people who took them: the route, the days and the price.</p></div>
</section>
<section class="story story-feature" id="story-1" aria-labelledby="story-title">
  <div class="story-media">{video("bluelagoon")}</div>
  <div class="wrap story-copy">
    <h2 id="story-title">Nine days in Raja Ampat</h2>
    <p class="story-meta">Comfort · 9 days · from $X,XXX pp · Month, year</p>
    <div class="btns"><a class="btn btn-on-media" href="plan.html?region=Raja+Ampat&amp;level=Comfort&amp;days=9">Plan a trip like this</a></div>
  </div>
</section>
</div>

<section class="sec" aria-labelledby="route">
  <div class="wrap">
    <div class="sec-head one"><h2 id="route">The route</h2></div>
    <ol class="route">{route}</ol>
    <blockquote class="pullquote"><p>A longer line from the guests goes here: what the trip felt like, in their own words.</p><footer class="meta">Guest name · Country · Comfort · Month, year</footer></blockquote>
    <div class="btns center"><a class="btn btn-primary" href="plan.html?region=Raja+Ampat&amp;level=Comfort&amp;days=9">Plan a trip like this</a>{go("#", "View all photos")}</div>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="more">
  <div class="wrap">
    <div class="sec-head one"><h2 id="more">More stories</h2></div>
    <div class="stories-grid">
      {card(2, "Ten days by yacht, Misool to Wayag", "Yacht charter · whole boat · 10 days · Month, year", pic("2O4A3267", "(max-width: 860px) 100vw, 50vw"), "Sorong → Misool → Wayag", "Guest name · Country", "plan.html?region=Yacht+charter&amp;days=10")}
      {card(3, "Volcano islands of the north", "North Sulawesi · Essential · X days · from $X,XXX pp", pic("0O0A9741", "(max-width: 860px) 100vw, 50vw"), "Manado → Bunaken → Siau", "Guest name · Country", "plan.html?region=North+Sulawesi&amp;level=Essential")}
    </div>
  </div>
</section>

{cta("Plan your trip", img=pic("2O4A3377", "(max-width: 860px) 100vw, 50vw"))}'''
    page("stories.html", "Guest stories · 1000 Islands Travel", main, cur="stories.html",
         desc="Real trips to Raja Ampat and North Sulawesi, told by our guests.")

def about():
    team = "".join(f'<li>{ph("Portrait · from the owner", "4/5", "ph-portrait")}<p><b>Name</b><span>Role</span></p></li>' for _ in range(4))
    main = f'''<section class="page-head about-head" aria-labelledby="page-title">
  <div class="wrap">
    <div class="about-intro"><h1 id="page-title">About us</h1>
      <div class="prose"><p class="big">1000 Islands Travel was born from a fascination with places that are still difficult to reach.</p>
        <p>For many years we have travelled through the eastern part of the archipelago by boat, small aircraft, ferry, motorcycle and sometimes on foot, looking for places where nature is still stronger than people.</p>
        <p>We know how to reach them, where to stay, which boats to use and, perhaps more importantly, what can realistically be done there. Today we use this experience to create private journeys through some of the most remote parts of Indonesia.</p></div></div>
    <ul class="team">{team}</ul>
  </div>
</section>

<section class="sec" id="how" aria-labelledby="how-title">
  <div class="wrap split-media">
    <div class="split-text"><h2 id="how-title">How we travel</h2>
      <p class="big">We keep groups small. Most of our journeys are private.</p>
      <p>The logistics depend on the destination: private yachts, speedboats, local boats, domestic flights, small aircraft, ferries and road transfers. Places to stay range from selected hotels and private yachts to simple island resorts and remote eco-lodges.</p>
      <p>We do not pretend that every remote place is luxurious. We pick the best realistic option in each location and tell you clearly what to expect before the journey begins.</p></div>
    <figure class="fr r45">{pic("2O4A2068", "(max-width: 860px) 100vw, 40vw")}</figure>
  </div>
</section>

<section class="sec sec-tint" id="faq" aria-labelledby="faq-title">
  <div class="wrap narrow">
    <div class="sec-head one"><h2 id="faq-title">FAQ</h2></div>
    {faq([("Are your trips private?", "Most journeys can be organised entirely privately for couples, families or groups of friends."),
          ("Can the itinerary be changed?", "Yes. The routes on this site are starting points. Length, places to stay and activities can all be adapted."),
          ("What level of accommodation should I expect?", "It depends on the destination. Some regions have excellent resorts and luxury yachts; others have only simple local places to stay. We explain this clearly before you book."),
          ("How do deposit and payment work?", "The owner's answer goes here: the deposit, when the rest is due and how you pay.")])}
  </div>
</section>

{cta("Plan your trip", img=pic("_RBE2063", "(max-width: 860px) 100vw, 50vw"))}'''
    page("about.html", "About us · 1000 Islands Travel", main, cur="about.html", body_cls="no-hero",
         desc="Who we are and how we travel: private journeys through remote eastern Indonesia.")

def advisors():
    sub = [("#proof", "Track record", 0), ("#terms", "How we work", 0), ("#sell", "What you can sell", 0), ("#faq", "FAQ", 0), ("#partner-form", "Get trade rates", 1)]
    facts = [("Operating", "8 years", 0), ("Regions", "Raja Ampat · North Sulawesi", 0), ("Trips", "Private, 3+ days", 0), ("Boats", "X yachts", 1)]
    btns = '<a class="btn btn-hero" href="#partner-form">Get trade rates</a><a class="link-hero hide-phone" href="#partner-form" data-want="request">Send a client request</a>'
    hp = '<div class="hero-person">' + person("Name, your contact", "Role · direct email · WhatsApp", "cta-person") + '</div>'
    terms = [("Commission or net rate", "Your choice, per booking. The owner's terms go here."),
             ("One public price, everywhere", "Our public prices are the same on every channel, so your rate stays safe."),
             ("Your client stays your client", "We can work entirely behind the scenes and speak through your company."),
             ("White-label on request", "Complete itineraries to offer as your own Indonesian product."),
             ("Reply within 24 hours, 7 days a week", "A named contact answers, not a ticket queue."),
             ("Payment terms", "Deposit and balance dates: the owner's terms go here.")]
    handle = ["Private itinerary design", "Hotels and remote places to stay", "Private yachts and liveaboards", "Domestic flights and transfers",
              "Private boats and speedboats", "Diving and snorkelling", "Local guides", "Expedition logistics", "Permits and local coordination",
              "Airport and port help", "24/7 local support during the trip"]
    panels = [("raja-ampat.html", "Raja Ampat", "Central · Misool · + Triton Bay", "from $X,XXX pp", pic("2O4A3189", "(max-width: 860px) 100vw, 33vw")),
              ("north-sulawesi.html", "North Sulawesi", "Bunaken · Sangihe &amp; Siau · + Halmahera &amp; Widi", "from $X,XXX pp", pic("0O0A9741", "(max-width: 860px) 100vw, 33vw")),
              ("yachts.html", "Yacht charters", "Phinisi · whole boat", "from $X,XXX per day", still("video/phinisi-sunset.webp", ALT["phinisi"]))]
    pan = "".join(f'<a class="panel" href="{h}"><figure>{m}</figure><div class="panel-copy"><h3>{t}</h3><p>{p}</p><p class="price">{pr}</p></div></a>' for h, t, p, pr, m in panels)
    main = f'''{landing_hero("Travel agents", "Your partner in remote Indonesia. Complete ground handling, or single parts of a journey.", img=pic("2O4A3267", "100vw"), btns=btns, facts=facts, sub=sub, extra=hp)}

<section class="sec" aria-labelledby="proof">
  <div class="wrap">
    <div class="sec-head one"><h2 id="proof">Track record</h2></div>
    <div class="split2">
      <article class="case"><figure class="fr">{pic("_RBE2062", "(max-width: 860px) 100vw, 50vw")}</figure><h3>Case study: ten days by yacht, Misool to Wayag</h3><p>Whole boat, helicopter transfers, a route built around the guests. The details from the owner go here.</p><p>{go("stories.html#story-2", "Read the story")}</p></article>
      <div class="rev-stack">{review("Agent name", "Agency · Country", "A line from a travel agent who has worked with us goes here.")}{review("Agent name", "Agency · Country", "A line from a travel agent who has worked with us goes here.")}
        <ul class="badges">{"".join(f"<li>{ph(b + ' · from the owner', '3/2')}</li>" for b in ["Licence", "Registration", "Insurance", "Membership"])}</ul></div>
    </div>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="terms">
  <div class="wrap">
    <div class="sec-head"><h2 id="terms">Indonesia is easy. Until it isn't.</h2><p class="sec-lead">Booking a hotel in Bali is simple. A yacht in Raja Ampat, a boat in Triton Bay or a flight to a remote island is something else. We handle the logistics in Indonesia while you keep the relationship with your client.</p></div>
    <ul class="terms">{"".join(f"<li><h3>{h}</h3><p>{t}</p></li>" for h, t in terms)}</ul>
    <div class="handles"><h3>What we handle</h3><ul>{"".join(f"<li>{x}</li>" for x in handle)}</ul></div>
    <h3 class="bk-h">How a booking works</h3><ol class="booking"><li><b>Request</b></li><li><b>Proposal</b></li><li><b>Confirmation</b></li><li><b>Trip</b></li></ol>
  </div>
</section>

<section class="sec" aria-labelledby="sell">
  <div class="wrap">
    <div class="sec-head one"><h2 id="sell">What you can sell</h2></div>
    <div class="panels">{pan}</div>
  </div>
</section>

<section class="sec sec-tint" aria-labelledby="faq">
  <div class="wrap narrow">
    <div class="sec-head one"><h2 id="faq">Agent FAQ</h2></div>
    {faq([("Do you work on commission or net rates?", "Both. You choose per booking; the owner's terms go here."),
          ("Can you work under our brand?", "Yes. We can work entirely behind the scenes and speak through your company, and design complete itineraries to offer as your own."),
          ("How fast do we get a proposal?", "We reply within 24 hours, 7 days a week."),
          ("Who looks after our clients on the ground?", "Our own team, with local boat crews, guides and drivers, and 24/7 support during the trip.")])}
  </div>
</section>

<section class="sec" aria-labelledby="form-title">
  <div class="wrap split-form">
    <div class="form-side"><h2 id="form-title">Get trade rates</h2>
      <p>B2B rates and agency conditions for registered travel companies. Rates are sent by email: no registration, no login.</p>
      {person("Name, your contact", "Role · direct email · WhatsApp", "cta-person")}</div>
    {agent_form()}
  </div>
</section>'''
    page("advisors.html", "Travel agents · 1000 Islands Travel", main, cur="advisors.html", body_cls="advisors",
         desc="Ground handling in remote Indonesia for travel agents: Raja Ampat, North Sulawesi and private yachts.")

def field(name, label, kind="text", ph_="", opt=False, full=False, auto="", extra=""):
    o = " <em>(optional)</em>" if opt else ""
    req = "" if opt else " required"
    a = f' autocomplete="{auto}"' if auto else ""
    cls = "field full" if full else "field"
    if kind == "textarea":
        inp = f'<textarea id="f-{name}" name="{name}" rows="4" placeholder="{ph_}"{req}></textarea>'
    elif kind == "select":
        inp = f'<select id="f-{name}" name="{name}"{req}>{extra}</select>'
    else:
        inp = f'<input id="f-{name}" name="{name}" type="{kind}" placeholder="{ph_}"{a}{req}>'
    return f'<div class="{cls}"><label for="f-{name}">{label}{o}</label>{inp}<p class="msg" id="m-{name}" hidden></p></div>'

def chips(name, label, opts, checked=0):
    c = "".join(f'<label class="chip"><input type="radio" name="{name}" value="{v}"{" checked" if i == checked else ""}><span>{v}</span></label>' for i, v in enumerate(opts))
    return f'<fieldset class="field full chips" data-group="{name}"><legend>{label}</legend><div>{c}</div></fieldset>'

FAILED = (f'<div class="alert alert-failed" role="alert" hidden><span class="mark" aria-hidden="true">!</span><div><b>Your idea didn\'t send</b>'
          f'<p>Nothing is lost: try again, or send it straight to us.</p><div class="btns"><button class="btn btn-primary" type="submit">Try again</button>'
          f'<a class="btn btn-ghost btn-ic" href="{WA}">{WA_IC}<span>Send on WhatsApp</span></a><a class="text-link" href="{WA}">Email us</a></div></div></div>')
ERRORS = '<div class="alert alert-errors" role="alert" tabindex="-1" hidden><span class="mark" aria-hidden="true">!</span><div><b class="alert-n">Please check the fields</b><p>Your idea is still here, nothing is lost.</p></div></div>'
CONSENT = '<p class="consent">By sending, you agree to our <a class="text-link" href="privacy.html">Privacy policy</a>.</p>'

def agent_form():
    countries = "".join(f"<option>{c}</option>" for c in ["Country", "Australia", "France", "Germany", "Italy", "Netherlands", "Singapore", "Switzerland", "United Kingdom", "United States", "Other"])
    return f'''<form class="form-box" id="partner-form" action="thank-you-advisor.html" novalidate data-form>
      {ERRORS}{FAILED}
      <div class="form">
        {chips("want", "I want to", ["Get trade rates", "Send a client request"])}
        {field("name", "Name", ph_="Your name", auto="name")}
        {field("agency", "Agency", ph_="Agency name", auto="organization")}
        {field("email", "Email", "email", "you@agency.com", auto="email")}
        {field("country", "Country", "select", extra=countries.replace("<option>Country</option>", '<option value="">Choose a country</option>'))}
        {field("message", "Message", "textarea", "Client, dates, travellers", opt=True, full=True)}
        <div class="field full"><button class="btn btn-primary" type="submit">Send</button><p class="note">We reply within 24 hours, 7 days a week.</p>{CONSENT}</div>
      </div>
    </form>'''

def plan():
    trav = "".join(f"<option{' selected' if n == '2' else ''}>{n}</option>" for n in ["1", "2", "3", "4", "5", "6", "7", "8+"])
    main = f'''<section class="page-head plan-page" aria-labelledby="page-title">
  <div class="wrap">
    <div class="sec-head"><h1 id="page-title">Plan your trip</h1><p class="sec-lead">You do not need the exact route. Tell us where you want to go, how much time you have and how you like to travel.</p></div>
    <div class="split-form plan-split">
      <div class="form-side">
        <h2 class="h3">What happens next</h2>
        <ol class="next">
          <li><span class="n">1</span><div><b>We design it · within 24 hours</b><p>A route and a price, built around your days.</p></div></li>
          <li><span class="n">2</span><div><b>We handle everything</b><p>Flights, boats, permits and local guides.</p></div></li>
          <li><span class="n">3</span><div><b>You travel</b><p>We stay one message away the whole trip.</p></div></li>
        </ol>
        {person()}
        <div class="btns"><a class="btn btn-ghost btn-ic" href="{WA}">{WA_IC}<span>WhatsApp us</span></a></div>
        <p class="agent-line">Travel agent? <a class="text-link" href="advisors.html#partner-form">Get trade rates</a></p>
      </div>
      <form class="form-box" id="plan-form" action="thank-you.html" novalidate data-form>
        <p class="assure"><span class="cta-person-ph" aria-hidden="true"></span><span><b>Name</b> replies within 24 hours, 7 days a week. Free, no obligation. <a class="text-link" href="{WA}">Prefer WhatsApp?</a></span></p>
        {ERRORS}{FAILED}
        <div class="form">
          {field("name", "Name", ph_="Your name", auto="name")}
          {field("email", "Email", "email", "you@example.com", auto="email")}
          {field("whatsapp", "WhatsApp", "tel", "+61 …", opt=True, auto="tel")}
          {field("travellers", "Travellers", "select", extra=trav)}
          {field("dates", "Dates", ph_="Approximate dates", full=True)}
          {chips("region", "Where", ["Raja Ampat", "North Sulawesi", "Yacht charter", "Not sure yet"])}
          {field("message", "Message", "textarea", "Tell us your idea", opt=True, full=True)}
          <div class="field full"><button class="btn btn-primary" type="submit">Send request</button><p class="note">We reply within 24 hours, 7 days a week.</p>{CONSENT}</div>
        </div>
      </form>
    </div>
  </div>
</section>'''
    page("plan.html", "Plan your trip · 1000 Islands Travel", main, cur=None, body_cls="no-hero", bar=False,
         desc="Tell us where and when; we reply within 24 hours with a route and a price.")

def thanks(slug, line, lead, back, img, agent=False):
    main = f'''<section class="page-head thanks" aria-labelledby="page-title">
  <div class="wrap split-media">
    <div class="split-text">
      <h1 id="page-title">Thank you</h1>
      <p class="meta trip-line" data-trip>{line}</p>
      <p class="big">{lead}</p>
      {person("Name will reply within 24 hours, 7 days a week", "Role · direct email · WhatsApp")}
      <h2 class="h3">Want an answer sooner?</h2>
      <div class="btns"><a class="btn btn-primary btn-ic" href="{WA}">{WA_IC}<span>Message us on WhatsApp</span></a>{back}</div>
      <p>{go("index.html", "Back to home")}</p>
    </div>
    <figure class="fr r45">{img}</figure>
  </div>
</section>'''
    page(slug, "Thank you · 1000 Islands Travel", main, body_cls="no-hero", bar=False)

def system(slug, code, h1, lead, btns, links=""):
    main = f'''<section class="page-head system" aria-labelledby="page-title">
  <div class="wrap">
    <div class="sys-mark" aria-hidden="true"><span class="cross"></span><span class="coord-txt">{code}</span></div>
    <h1 id="page-title">{h1}</h1>
    <p class="big">{lead}</p>
    <div class="btns">{btns}</div>
    {links}
  </div>
</section>'''
    page(slug, f"{h1} · 1000 Islands Travel", main, body_cls="no-hero sys", bar=False)

def legal(slug, h1, sub, sections, note):
    toc = "".join(f'<a href="#s{i}">{t}</a>' for i, (t, _) in enumerate(sections, 1))
    body = "".join(f'<section id="s{i}"><h2>{t}</h2>{"".join(f"<p>{p}</p>" for p in ps)}</section>' for i, (t, ps) in enumerate(sections, 1))
    main = f'''<section class="page-head" aria-labelledby="page-title">
  <div class="wrap">
    <div class="sec-head one"><h1 id="page-title">{h1}</h1></div>
    <p class="meta doc-sub">{sub}</p>
    <div class="doc"><nav class="toc" aria-label="On this page">{toc}</nav><div class="doc-body">{body}<p class="note">{note}</p></div></div>
  </div>
</section>'''
    page(slug, f"{h1} · 1000 Islands Travel", main, body_cls="no-hero", bar=False)

if __name__ == "__main__":
    home("index.html", trade_letters_v5())
    home("home-card.html", trade_card_v5())
    region_page("raja-ampat.html", "Raja Ampat",
                "Hundreds of limestone islands, hidden lagoons and some of the richest reefs on Earth.",
                "Explore by private yacht, or combine island lodges with a private speedboat. Diving and snorkelling fit in wherever you want them.",
                "hero-saga",
                [video("reef-fan"), pic("IMG_9819", "(max-width: 860px) 100vw, 33vw"), pic("2O4A6722", "(max-width: 860px) 100vw, 33vw")],
                RA_PLACES,
                [("Central Raja Ampat", "Karst lagoons, viewpoints and reefs within an easy boat ride of the lodges.", pic("2O4A3189", "200px"), False),
                 ("Misool", "The wild south: limestone labyrinths, turquoise lagoons, caves and almost uninhabited islands.", pic("_RBE2062", "200px"), False),
                 ("Triton Bay", "Whale sharks, limestone walls and ancient rock paintings near Kaimana.", still("video/whaleshark.webp", ALT["whaleshark"]), True)],
                [("Essential", "Guesthouse + private boat · guesthouse name", pic("_RBE2059", "(max-width: 860px) 100vw, 33vw"), {"base": 300, "steps": [[8, 270], [12, 240]]}),
                 ("Comfort", "Island lodge + private speedboat · lodge name", pic("2O4A4797", "(max-width: 860px) 100vw, 33vw"), {"base": 500, "steps": [[8, 450], [12, 400]]}),
                 ("Premium", "Eco resort + private boat · resort name", pic("IMG_5353", "(max-width: 860px) 100vw, 33vw"), {"base": 1000, "steps": [[8, 900], [12, 800]]})],
                ("How do I get to Raja Ampat?", "Fly to Sorong on a domestic flight, usually through Jakarta or Makassar. From Sorong it is a boat ride to the islands, and we arrange every transfer."),
                pic("IMG_9812", "(max-width: 860px) 100vw, 50vw"),
                ("Raja Ampat chart: Sorong, the central islands, Wayag, Misool and Triton Bay", (129.5, 134.6, -4.3, 0.4)),
                "Southwest Papua, Indonesia", "Raja+Ampat")
    region_page("north-sulawesi.html", "North Sulawesi",
                "Living between volcanoes and the sea: reef walls off Bunaken and a chain of volcanic islands to the north.",
                "Active volcanoes, black sand beaches and reefs over volcanic slopes, with communities that have lived beside these mountains for generations.",
                "hero-ns",
                [video("reef-turtle"), pic("0O0A9157", "(max-width: 860px) 100vw, 33vw"), pic("2O4A4824", "(max-width: 860px) 100vw, 33vw")],
                NS_PLACES,
                [("Bunaken", "Reef walls a short boat ride from Manado.", pic("0O0A0227", "200px"), False),
                 ("Sangihe &amp; Siau", "A chain of volcanic islands between North Sulawesi and the Philippines.", pic("DJI_0074", "200px"), False),
                 ("Halmahera &amp; Widi", "Expedition territory: volcanoes, forest and an archipelago almost without tourism.", pic("IMG_5357", "200px"), True)],
                [("Essential", "Dive resort + private boat · resort name", pic("2O4A1226", "(max-width: 860px) 100vw, 33vw"), {"base": 260, "steps": [[8, 230], [12, 210]]}),
                 ("Comfort", "Boutique resort + private boat · resort name", pic("_RBE2052", "(max-width: 860px) 100vw, 33vw"), {"base": 420, "steps": [[8, 380], [12, 340]]}),
                 ("Premium", "Premium resort + private boat · resort name", pic("2O4A1547", "(max-width: 860px) 100vw, 33vw"), {"base": 900, "steps": [[8, 810], [12, 720]]})],
                ("How do I get to North Sulawesi?", "Fly to Manado on a domestic flight, usually through Jakarta or Makassar. From Manado we arrange the boats and transfers to every island."),
                pic("DJI_0074", "(max-width: 860px) 100vw, 50vw"),
                ("North Sulawesi chart: Manado and Bunaken, Siau and Sangihe to the north, Halmahera and Widi to the east", (124.2, 129.0, -1.0, 4.0)),
                "North Sulawesi, Indonesia", "North+Sulawesi")
    yachts(); stories(); about(); advisors(); plan()
    thanks("thank-you.html", "Raja Ampat · Comfort · 9 days · 2 travellers", "Your idea is with us. We will come back with a route and a price.",
           go("stories.html", "While you wait: guest stories", "btn btn-ghost"), pic("IMG_9812", "(max-width: 860px) 100vw, 40vw"))
    thanks("thank-you-advisor.html", "Trade rates request", "Your request is with us. Rates and agency conditions come by email.",
           go("advisors.html", "Back to Travel agents", "btn btn-ghost"), pic("2O4A4797", "(max-width: 860px) 100vw, 40vw"), agent=True)
    system("404.html", "Error 404 · ?°??′ S", "This page is off the map", "The link may be old, or the page has moved. Everything else is where you left it.",
           '<a class="btn btn-primary" href="index.html">Back to home</a><a class="btn btn-ghost" href="plan.html">Plan your trip</a>',
           '<nav class="go-list" aria-label="Popular pages">' + "".join(go(h, t) for h, t in NAV[:3] + [("plan.html", "Plan your trip"), ("advisors.html", "Travel agents")]) + "</nav>")
    system("unavailable.html", "Back shortly", "We're updating the site", "You can still reach us right now. We reply within 24 hours, 7 days a week.",
           f'<a class="btn btn-primary btn-ic" href="{WA}">{WA_IC}<span>WhatsApp us</span></a><a class="btn btn-ghost" href="{WA}">Email us</a>')
    legal("privacy.html", "Privacy &amp; cookies", "Last updated: date",
          [("Who we are", ["1000 Islands Travel is operated by PT company name, registered in Indonesia. This page explains what we do with the information you give us."]),
           ("What we collect", ["What you send in our forms or messages: your name, email, WhatsApp number, travel dates, the number of travellers and your idea for the trip."]),
           ("Why we use it", ["To answer you, design and book your trip, and stay in touch while you travel. We do not sell your information."]),
           ("Cookies and analytics", ["Necessary cookies keep the site working. Analytics and marketing cookies run only if you say yes, and you can change your choice at any time under Cookie settings."]),
           ("Who we share it with", ["Only the partners your trip needs, such as boats, lodges and domestic airlines, and only what they need."]),
           ("How long we keep it", ["As long as we need it for your trip and our records; the owner's exact periods go here."]),
           ("Your rights", ["You can ask to see, correct or delete your information, and withdraw a yes to cookies, at any time."]),
           ("Contact us", ["Email or WhatsApp: the owner's contacts go here."])],
          "Template text, not legal advice. Company name, address and contact go here; check it for your markets before launch.")
    legal("terms.html", "Booking terms", "For travellers booking direct. Travel agents receive separate trade terms.",
          [("How a booking works", ["You send an idea, we send a proposal with a route and a price, you confirm with a deposit, and we book everything."]),
           ("Prices and currency", ["Prices are quoted per person or per boat, in the currency stated in your proposal."]),
           ("Deposit and payment", ["A deposit of X% confirms the trip; the balance is due X days before arrival. The owner's terms go here."]),
           ("Changes you make", ["Ask us early and we will do what the boats and lodges allow; any cost is confirmed before we change anything."]),
           ("Cancellations", ["The owner's cancellation scale goes here."]),
           ("Weather, safety and changes on the ground", ["Weather and sea conditions sometimes decide the route. Safety comes first, and we adapt the plan on the spot."]),
           ("Travel and dive insurance", ["Travel insurance that covers medical evacuation is required; divers also need dive cover."]),
           ("Our responsibility", ["The owner's wording goes here."]),
           ("Complaints", ["Tell us on the spot so we can fix it there; after the trip, write to us and we reply within X days."]),
           ("Contact us", ["Email or WhatsApp: the owner's contacts go here."])],
          "These terms come from the owner (deposit %, payment dates, cancellation scale, currency). Legal review recommended before launch.")
