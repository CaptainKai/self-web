"""
测试开发服务器 API 接口:
1. POST /api/save-data 物理写入本地 js/data.js
2. 验证写入后的 js/data.js 数据完整性
Windows UTF-8 终端安全。
"""
import sys
import os
import json
import time
import urllib.request
import urllib.parse
import threading
import http.server
import socketserver
import subprocess

if sys.platform == "win32" and hasattr(sys.stdout, "buffer"):
    try:
        if getattr(sys.stdout, "encoding", "").lower() != "utf-8":
            import io
            sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding="utf-8", errors="replace")
    except Exception:
        pass

PROJECT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(PROJECT_DIR, "scripts"))

from serve import Handler, DATA_JS_PATH

def test_api_save_data():
    print("=" * 60)
    print("🧪 开始测试 serve.py 本地后台落盘 API: POST /api/save-data")
    print("=" * 60)

    # 备份当前 data.js
    with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
        original_data_content = f.read()

    test_port = 8899
    httpd = socketserver.TCPServer(("127.0.0.1", test_port), Handler)
    server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    server_thread.start()
    print(f"[TEST] 测试服务器已在 127.0.0.1:{test_port} 启动")

    try:
        # 读取当前数据结构
        idx = original_data_content.find("window.RESUME_DATA = ")
        assert idx != -1, "data.js 必须包含 window.RESUME_DATA"
        resume_raw = original_data_content[idx + len("window.RESUME_DATA = "):].strip().rstrip(";")
        test_data = json.loads(resume_raw)

        # 模拟修改姓名做测试
        original_name = test_data["zh"]["hero"]["title"]
        test_marker = " [API验证标记]"
        test_data["zh"]["hero"]["title"] = original_name + test_marker

        # 发起 POST 请求
        url = f"http://127.0.0.1:{test_port}/api/save-data"
        req = urllib.request.Request(
            url,
            data=json.dumps(test_data, ensure_ascii=False).encode("utf-8"),
            headers={"Content-Type": "application/json; charset=utf-8"},
            method="POST"
        )

        with urllib.request.urlopen(req, timeout=5) as response:
            assert response.status == 200, f"HTTP Status 应为 200，实际为 {response.status}"
            resp_body = json.loads(response.read().decode("utf-8"))
            print(f"[TEST] 服务器响应: {resp_body}")
            assert resp_body.get("success") is True, "响应应返回 success: True"

        # 验证本地磁盘上 js/data.js 是否被真正物理写入
        with open(DATA_JS_PATH, "r", encoding="utf-8") as f:
            written_content = f.read()

        assert test_marker in written_content, "物理磁盘上的 js/data.js 必须包含修改后的测试标记！"
        print("  ✅ 成功验证：修改已真正物理写入磁盘上的 js/data.js 文件！")

        # 验证写入后的 js/data.js 语法无异常（Node 测试）
        check_code = f"global.window = {{}}; require('{DATA_JS_PATH.replace(chr(92), '/')}');"
        ret = subprocess.run(["node", "-e", check_code], capture_output=True, text=True)
        assert ret.returncode == 0, f"写入后的 data.js 在 Node 中应当无任何语法报错: {ret.stderr}"
        print("  ✅ 成功验证：新写入的 js/data.js 语法 100% 正确！")

    finally:
        # 恢复原始文件内容
        with open(DATA_JS_PATH, "w", encoding="utf-8") as f:
            f.write(original_data_content)
        print("[TEST] 原始 js/data.js 已完全恢复，保证测试零污染。")
        httpd.shutdown()
        httpd.server_close()
        print("[TEST] 测试服务器已安全关闭。")

    print("=" * 60)
    print("🎉 /api/save-data 物理写盘接口全自动化测试 100% 通过！")
    print("=" * 60)

if __name__ == "__main__":
    test_api_save_data()
