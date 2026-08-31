import os
import sys
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

MAP = os.path.dirname(os.path.abspath(__file__))
POORT = int(sys.argv[1]) if len(sys.argv) > 1 else 5173


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=MAP, **kwargs)

    def send_error(self, code, message=None, explain=None):
        if code == 404:
            pagina = os.path.join(MAP, "404.html")
            if os.path.exists(pagina):
                with open(pagina, "rb") as bestand:
                    inhoud = bestand.read()
                self.send_response(404)
                self.send_header("Content-Type", "text/html; charset=utf-8")
                self.send_header("Content-Length", str(len(inhoud)))
                self.end_headers()
                if self.command != "HEAD":
                    self.wfile.write(inhoud)
                return
        super().send_error(code, message, explain)

    def log_message(self, formaat, *args):
        sys.stderr.write("%s %s\n" % (self.address_string(), formaat % args))


if __name__ == "__main__":
    server = ThreadingHTTPServer(("", POORT), Handler)
    print("HANDIG_ draait op http://localhost:%d" % POORT)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nGestopt.")
        server.server_close()
