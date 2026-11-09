# Local server for design-directions/ (1 Nov 2026): static files like `python -m http.server`, plus one write endpoint
# so the hero editor's "Сохранить вариант" lands on disk, not only in one browser's localStorage (a variant saved in
# another session's browser pane was invisible to Claude). POST /editor/variants {name, fade, seq} -> editor/variants.json,
# replacing a variant of the same name. Run: python -I design-directions/_build/serve.py [port]
import sys, json, os
from functools import partial
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
VARIANTS = ROOT / "editor" / "variants.json"

class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.split("?")[0].endswith(".json"): self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def do_POST(self):
        if self.path.split("?")[0] != "/editor/variants":
            return self.send_error(404)
        try:
            v = json.loads(self.rfile.read(int(self.headers.get("Content-Length", 0))))
            assert isinstance(v.get("name"), str) and v["name"].strip() and isinstance(v.get("seq"), list)
        except Exception:
            return self.send_error(400, "expected {name, fade, seq}")
        items = json.loads(VARIANTS.read_text(encoding="utf-8")) if VARIANTS.exists() else []
        items = [x for x in items if x.get("name") != v["name"]] + [{"name": v["name"].strip(), "fade": v.get("fade", 0), "seq": v["seq"]}]
        tmp = VARIANTS.with_suffix(".tmp")
        tmp.write_text(json.dumps(items, ensure_ascii=False, indent=1), encoding="utf-8")
        os.replace(tmp, VARIANTS)
        body = json.dumps({"ok": True, "count": len(items)}).encode()
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 5210
    ThreadingHTTPServer(("", port), partial(Handler, directory=str(ROOT))).serve_forever()
