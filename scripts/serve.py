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
if sys.platform == "win32" and hasattr(sys.stdout, "buffer"):
    try:
        if getattr(sys.stdout, "encoding", "").lower() != "utf-8":
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    except Exception:
        pass

DEFAULT_PORT = 8080
DIRECTORY = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # 禁用浏览器本地缓存，防止旧版本脚本或数据劫持
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def log_message(self, format, *args):
        print(f"[HTTP {self.log_date_time_string()}] {args[0]} -> {args[1]}")

def run_server():
    # 启动前自动同步来自 resume_canonical_data.json 的最新数据
    try:
        from sync_canonical_data import sync_canonical_data
        sync_canonical_data()
    except Exception as e:
        print(f"[WARN] 数据同步跳过或失败: {e}")

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
    print(f"[INFO] 个人网站与在线简历预览服务已就绪！")
    print(f"[DIR]  根目录: {DIRECTORY}")
    print(f"[DATA] 基础数据源: D:\\code\\resume-design-release-v6.0.0\\tools\\resume_canonical_data.json")
    print(f"[URL]  访问地址:     http://localhost:{port}/")
    print(f"[TIP]  网页支持：① 在线点击文字自由填空修改 ② 上传导入自定义 JSON ③ 导出备份")
    print(f"[TIP]  按 Ctrl+C 停止服务。")
    print("=" * 60)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Server stopped by user.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()

