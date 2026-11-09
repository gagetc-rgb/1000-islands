from playwright.sync_api import sync_playwright
pages = ["home", "landing", "journey", "plan"]
sizes = {"desktop": (1440, 900), "mobile": (390, 844)}
with sync_playwright() as p:
    b = p.chromium.launch()
    for name, (w, h) in sizes.items():
        ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, is_mobile=(name == "mobile"))
        pg = ctx.new_page()
        for page in pages:
            pg.goto(f"http://localhost:5173/{page}.html", wait_until="networkidle")
            # sticky elements would repeat in full-page shots; unstick for capture
            pg.add_style_tag(content=".site-header,.subnav{position:static!important}.mbar{position:static!important}")
            pg.screenshot(path=f"review/shots/{page}-{name}.png", full_page=True)
            print(page, name, pg.evaluate("document.body.scrollHeight"))
        ctx.close()
    b.close()
