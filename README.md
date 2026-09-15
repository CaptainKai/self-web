# 李凯 (Kai Li) - 个人求职网站与技术作品集 (Self-Website)

面向大模型算法工程、LLM Agent 架构、后端高可用治理及量化金融工程的现代化个人主页与在线求职简历系统。

---

## 🌟 核心特性

- **现代科技美学**：采用 Glassmorphism 暗黑极客与清爽明亮双主题自适应设计，微发光霓虹渐变与流畅响应式布局。
- **中英双语全覆盖 (i18n)**：全站一键中英文平滑切换（中文 / English），语言状态本地持久化存储。
- **深度工业与系统级项目展厅**：
  1. **全球地缘事件时空知识图谱系统 (Event Timeline Engine)**：Summary-First 拓扑微社区双层图与三阶段大模型抽取引擎。
  2. **AllProxy: 多平台 AI Web 认证转标准 API 代理网关**：9+ 平台免 Token 协议逆向、WASM PoW 算力解算与会话链中继网关。
  3. **Provider Manager: 高可用 LLM API 智能路由网关与自愈系统**：200 OK 伪健康漏洞审计、自适应双向核心匹配与 Abort 级联取消。
  4. **FVTracker: 基金估值追踪与多资产量化投资决策平台**：HRP/MVO/ERC 资产配置、防前瞻偏差回测与 OCR 智能识盘系统。
  5. **fund_info_fetch: 基金数据中台与星河拓扑可视化系统**：43 主题 BK 码 100ms 拼配、Double-Track HA 双轨容灾与风格特征工程。
- **架构深度弹窗 (Deep-Dive Modal)**：点击任意项目卡片即可弹出该项目的痛点剖析、架构演进、关键流水线与量化指标对比。
- **一键导出 / 打印 PDF 简历**：专配 `@media print` 样式，点击“打印/导出 PDF”或快捷键 `Ctrl + P` 即可导出排版优雅规整的标准 A4 纸质简历。
- **零依赖与 GitHub Pages 极速托管**：纯静态现代前端架构，无需任何复杂的构建流水线，推送到 GitHub 即可秒级发布。

---

## 📂 目录结构

```text
D:\code\self-website/
├── index.html                   # 主页单一入口容器
├── develop_diary/               # 开发日志专区 (规范跟踪代码与演进)
│   └── development_log.md       # 开发日志记录
├── css/
│   ├── style.css                # 核心样式（Glassmorphism、深浅色主题、响应式）
│   └── print.css                # 专用 A4 纸质/PDF 简历打印样式
├── js/
│   ├── data.js                  # 结构化中英文双语数据源（简历与五大项目全景数据）
│   ├── i18n.js                  # 国际化语言切换引擎
│   ├── theme.js                 # 深浅色主题切换引擎
│   ├── projects-modal.js        # 项目详情弹窗状态机
│   └── main.js                  # 页面核心渲染与交互逻辑（含日志输出）
├── scripts/                     # 辅助工具脚本专区
│   ├── serve.py                 # 本地预览 HTTP 服务
│   └── verify_site.py           # 网站静态资源完整性校验脚本
└── README.md                    # 本文档
```

---

## 🚀 本地开发与预览

在本地运行测试服务器极其轻便：

```powershell
# 切换至项目根目录
cd D:\code\self-website

# 运行自动化完整性校验
python scripts/verify_site.py

# 启动本地测试服务器
python scripts/serve.py
```

终端将输出访问地址（例如 `http://localhost:8080/`），在浏览器中打开即可实时体验。

---

## 🌐 部署至 GitHub Pages 步骤

由于本网站是纯静态现代化架构，部署到 GitHub Pages 非常直观，共有两种标准方式：

### 方式 A：直接部署（最简推荐）
1. 在 GitHub 上新建一个仓库，例如 `self-website`（或 `username.github.io`）；
2. 在本地项目根目录初始化并推送：
   ```powershell
   cd D:\code\self-website
   git init
   git add .
   git commit -m "feat: Initial commit for portfolio website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
3. 进入 GitHub 仓库页面：
   - 点击 **Settings** -> **Pages**；
   - 在 **Build and deployment** 下的 **Source** 选择 `Deploy from a branch`；
   - **Branch** 选择 `main` 分支，目录选择 `/ (root)`；
   - 点击 **Save**。
4. 等待 1~2 分钟，即可通过 `https://<your-username>.github.io/<your-repo-name>/` 访问您的专属个人网站！

---

## 📄 打印与导出 PDF 简历

- 在网站导航栏点击 **“完整简历 (PDF)”** 或 Hero 区的 **“打印 / 导出 PDF 简历”**；
- 也可以在任何页面直接按下快捷键 **`Ctrl + P`**；
- 在浏览器打印面板中：
  - **目标打印机**：选择 `另存为 PDF` (Save as PDF)；
  - **布局**：纵向 (Portrait)；
  - **纸张大小**：A4；
  - **页眉与页脚**：建议取消勾选（以获得最纯净的专业版面）；
  - **背景图形**：已由 `print.css` 智能优化为高对比度黑白专业简历排版。

