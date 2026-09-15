"""
Local development server for testing the self-website.
Runs a lightweight HTTP server serving static files from the project root.
Windows GBK terminal safe.
"""
import http.server
import socketserver
import os
import sys

# Ensure UTF-8 output on Windows terminal
if sys.platform == "win32":
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")

DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def log_message(self, format, *args):
        print(f"[HTTP {self.log_date_time_string()}] {args[0]} -> {args[1]}")

def run_server():
    port = DEFAULT_PORT
    max_attempts = 10
    httpd = None

    for attempt in range(max_attempts):
        try:
            httpd = socketserver.TCPServer(("", port), Handler)
            break
        except OSError:
            print(f"[WARN] Port {port} is occupied, trying {port + 1}...")
            port += 1

    if not httpd:
        print("[ERROR] Failed to bind to any port. Exiting.")
        sys.exit(1)

    print("=" * 60)
    print(f"[INFO] Self-Website Local Server is running!")
    print(f"[DIR]  Root directory: {DIRECTORY}")
    print(f"[URL]  Access URL:     http://localhost:{port}/")
    print(f"[TIP]  Press Ctrl+C to stop the server.")
    print("=" * 60)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Server stopped by user.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()

