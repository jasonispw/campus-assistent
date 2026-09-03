"""Serve the static site locally with GitHub Pages-style 404 handling."""

from argparse import ArgumentParser
from functools import partial
from http import HTTPStatus
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


SITE_ROOT = Path(__file__).resolve().parent


class SiteRequestHandler(SimpleHTTPRequestHandler):
    """Return the branded 404 page while preserving the 404 status code."""

    def send_error(self, code, message=None, explain=None):
        if code != HTTPStatus.NOT_FOUND:
            return super().send_error(code, message, explain)

        not_found_page = SITE_ROOT / "404.html"
        try:
            content = not_found_page.read_bytes()
        except OSError:
            return super().send_error(code, message, explain)

        self.send_response(HTTPStatus.NOT_FOUND)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(content)))
        self.send_header("Cache-Control", "no-cache")
        self.end_headers()

        if self.command != "HEAD":
            self.wfile.write(content)


def parse_port():
    parser = ArgumentParser(description=__doc__)
    parser.add_argument("port", nargs="?", type=int, default=5173)
    return parser.parse_args().port


def main():
    port = parse_port()
    handler = partial(SiteRequestHandler, directory=str(SITE_ROOT))

    with ThreadingHTTPServer(("127.0.0.1", port), handler) as server:
        print(f"Serving {SITE_ROOT} at http://localhost:{port}")
        server.serve_forever()


if __name__ == "__main__":
    main()
