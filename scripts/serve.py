"""
Local development server for testing the self-website.
Runs a lightweight HTTP server serving static files from the project root.
Windows GBK terminal safe.
Features:
1. Static file serving with no-cache headers.
2. REST API: POST /api/save-data to physically update js/data.js from web editor.
3. REST API: POST /api/publish-github to automatically commit and push changes to GitHub.
Windows UTF-8 terminal safe.
"""
import http.server
import socketserver
import os
import sys
import json
import subprocess

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
DATA_JS_PATH = os.path.join(DIRECTORY, "js", "data.js")

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # 禁用浏览器本地缓存，防止旧版本脚本或数据劫持
        self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_POST(self):
        # 1. 物理写回 js/data.js 接口
        if self.path == "/api/save-data":
            try:
                length = int(self.headers.get("Content-Length", 0))
                body = self.rfile.read(length).decode("utf-8")
                payload = json.loads(body)

                # 读取现有 data.js 中的 CANONICAL 数据以保持事实源完整
                canonical_data = None
                if os.path.exists(DATA_JS_PATH):
                    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
                        old_content = f.read()
                    idx_canonical = old_content.find("window.CANONICAL_RESUME_DATA = ")
                    if idx_canonical != -1:
                        end_canonical = old_content.find("window.RESUME_DATA = ")
                        raw_canonical = old_content[idx_canonical + len("window.CANONICAL_RESUME_DATA = "):end_canonical].strip().rstrip(";")
                        try:
                            canonical_data = json.loads(raw_canonical)
                        except Exception:
                            pass

                # 生成标准格式的新 data.js 源码
                canonical_str = json.dumps(canonical_data, ensure_ascii=False, indent=2) if canonical_data else "{}"
                resume_str = json.dumps(payload, ensure_ascii=False, indent=2)

                new_file_content = (
                    "/**\n"
                    " * Central Data Source for Self-Website (Resume & Portfolio)\n"
                    " * Physically updated by Web Resume Editor via /api/save-data\n"
                    " */\n\n"
                    f"window.CANONICAL_RESUME_DATA = {canonical_str};\n\n"
                    f"window.RESUME_DATA = {resume_str};\n"
                )

                with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
                    f.write(new_file_content)

                print(f"[API] ✅ 成功将最新简历数据物理写回本地文件: {DATA_JS_PATH}")

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                resp = {
                    "success": True,
                    "message": "已成功将修改真正写入本地源文件 js/data.js！"
                }
                self.wfile.write(json.dumps(resp, ensure_ascii=False).encode("utf-8"))
                return
            except Exception as e:
                print(f"[API ERROR] 保存数据失败: {e}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                resp = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(resp, ensure_ascii=False).encode("utf-8"))
                return

        # 2. 一键提交并推送到 GitHub 接口
        elif self.path == "/api/publish-github":
            try:
                print("[API] 🚀 开始执行 Git 提交与远端推送流程...")
                # git add js/data.js
                subprocess.run(["git", "add", "js/data.js"], cwd=DIRECTORY, check=True)
                # git commit
                commit_msg = "chore(resume): update resume content via local web editor"
                commit_res = subprocess.run(
                    ["git", "commit", "-m", commit_msg],
                    cwd=DIRECTORY,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace"
                )
                print(f"[API GIT COMMIT] {commit_res.stdout.strip() or commit_res.stderr.strip()}")

                # git push
                push_res = subprocess.run(
                    ["git", "push", "origin", "main"],
                    cwd=DIRECTORY,
                    capture_output=True,
                    text=True,
                    encoding="utf-8",
                    errors="replace"
                )
                push_out = (push_res.stdout + "\n" + push_res.stderr).strip()
                print(f"[API GIT PUSH] {push_out}")

                self.send_response(200)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                resp = {
                    "success": push_res.returncode == 0,
                    "message": "已成功推送到 GitHub 远端仓库！GitHub Pages 即将自动完成构建部署，全网即将生效。",
                    "log": push_out
                }
                self.wfile.write(json.dumps(resp, ensure_ascii=False).encode("utf-8"))
                return
            except Exception as e:
                print(f"[API ERROR] Git 提推送失败: {e}")
                self.send_response(500)
                self.send_header("Content-Type", "application/json; charset=utf-8")
                self.end_headers()
                resp = {"success": False, "error": str(e)}
                self.wfile.write(json.dumps(resp, ensure_ascii=False).encode("utf-8"))
                return

        else:
            self.send_response(404)
            self.end_headers()

    def log_message(self, format, *args):
        print(f"[HTTP {self.log_date_time_string()}] {args[0]} -> {args[1]}")

def run_server():
    # 启动前自动同步来自 resume_canonical_data.json 的最新数据
    try:
        from sync_canonical_data import sync_canonical_data
        sync_canonical_data()
    except Exception as e:
        print(f"[WARN] 数据同步跳过或失败: {e}")
    # 仅在 js/data.js 不存在或显式传入 --sync 参数时从底层 json 同步，避免覆盖网页编辑器物理保存的最新内容
    if not os.path.exists(DATA_JS_PATH) or "--sync" in sys.argv:
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
    print(f"[INFO] 个人网站与在线简历服务已就绪！")
    print(f"[DIR]  项目根目录: {DIRECTORY}")
    print(f"[URL]  访问地址:   http://localhost:{port}/")
    print(f"[SYNC] 支持功能: ① 本地实时预览 ② 在线编辑自由填空 ③ 真正物理写盘 (js/data.js) ④ 一键推送 GitHub 全网生效")
    print(f"[TIP]  按 Ctrl+C 停止服务。")
    print("=" * 60)

    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[INFO] Server stopped by user.")
        httpd.server_close()

if __name__ == "__main__":
    run_server()

