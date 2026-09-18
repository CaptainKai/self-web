@echo off
chcp 65001 > nul
title Self-Website 个人简历本地服务器
cd /d "%~dp0"
echo ============================================================
echo [INFO] 正在启动 Self-Website 个人网站与在线简历预览服务...
echo [DATA] 规范数据源: D:\code\resume-design-release-v6.0.0\tools\resume_canonical_data.json
echo [URL]  访问地址:   http://localhost:8080/
echo ============================================================
python scripts/serve.py
pause

