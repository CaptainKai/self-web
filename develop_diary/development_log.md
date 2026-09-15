# 个人求职网站 (Self-Website) 开发日志 (Development Diary)

本文档遵循团队开发规范，以类似 Git Commit 的结构化方式记录系统开发全周期的需求演进、架构设计、代码变更与验证结果。

---

## [Commit 001] - 2026-09-15: 项目立项、目录结构规划与多语言设计初始化

### 1. 修改目的与背景
- 启动个人在线求职网站系统建设，目标部署于 GitHub Pages；
- 整合个人履历基础信息（北京科技大学本硕博学历、腾讯多模态实习经历、PRL/ACM MM 顶会论文及国家发明专利）与 5 个重量级工业/系统级项目（地缘事件知识图谱、AllProxy网关、Provider Manager网关、FVTracker量化系统、fund_info_fetch数据中台）；
- 响应用户最新决策：
  1. 支持中英文双版本一键切换（i18n），持久化存储语言选择；
  2. 保持简历与项目展厅的紧凑与严肃性，不单独设置 Q&A 问答模块；
  3. 脚本与正式代码分类存放，构建测试与预览工具链。

### 2. 核心架构与模块规划
```text
D:\code\self-website/
├── index.html                   # 网站主单页容器
├── develop_diary/               # 开发日志专区
│   └── development_log.md       # 本开发日志
├── css/
│   ├── style.css                # 极客科技风主题、毛玻璃卡片、微动画与响应式
│   └── print.css                # 专业 A4 PDF 简历打印样式
├── js/
│   ├── data.js                  # 核心数据源（中英文双语字典，包含项目全量技术指标）
│   ├── i18n.js                  # 多语言渲染引擎与切换状态机
│   ├── theme.js                 # 深浅色主题切换与持久化
│   ├── projects-modal.js        # 项目详情弹窗与架构演进展台
│   └── main.js                  # 入口主逻辑与交互绑定（含调试日志）
├── scripts/                     # 工具脚本专用目录 (规则 6)
│   ├── serve.py                 # 本地预览测试服务器
│   └── verify_site.py           # 网站静态资源与数据完整性校验脚本
└── README.md                    # 部署与使用文档
```

### 3. 下一步计划
- 编写 `scripts/` 工具链；
- 编写结构化中英文双语数据集 `js/data.js`；
- 构建现代化 CSS 样式与主页结构；
- 联调多语言切换与项目弹窗交互。

---

## [Commit 002] - 2026-09-15: 全站核心功能落地、中英双语国际化与深度项目展厅构建

### 1. 本次提交目的
- 全面完成个人求职网站在 `D:\code\self-website` 的搭建，面向 GitHub Pages 部署；
- 实现全站中英双语（i18n）动态无感切换及持久化；
- 完成深浅双主题切换（Dark / Light Glassmorphism）；
- 构建包含 5 大工业级系统项目的深度展厅与架构复盘模态弹窗；
- 实现标准 A4 打印与 PDF 简历导出优化（`@media print`）；
- 按照规则 5，在数据流与渲染关键点注入生命周期日志；
- 按照规则 6，构建 `scripts/` 工具套件并确保 Windows GBK 终端跨编码兼容。

### 2. 关键模块与代码实现概要

#### ① 结构化中英文双语数据驱动 (`js/data.js`)
- 整合用户简历 `resume_plain_text.txt` 与 5 份项目 `cv.md`；
- 规范化中英文全文字典，包括：
  - `profile`: 姓名（李凯/Kai Li）、求职意向、联系方式、个人简介；
  - `education`: 北京科技大学本硕博学历轨迹；
  - `experience`: 腾讯多模态一组大模型数据流水线与 Recall 提升约 50% 落地细节；
  - `research`: PRL 2023、ACM MM 2022 顶会顶刊论文与 3 项国家发明专利；
  - `projects`: 5 个硬核项目的核心指标（缩减 84%、94%兼容率、99.9%自愈、回撤降 25%~35%、300x拼配提速）与深度攻坚。

#### ② 国际化与主题状态机 (`js/i18n.js`, `js/theme.js`)
- 核心代码：
```javascript
// i18n 语言切换与全局事件广播
function setLang(lang) {
  currentLang = lang;
  localStorage.setItem(LANG_KEY, lang);
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  console.log(`[i18n] Language updated to: ${currentLang}`);
  window.dispatchEvent(new CustomEvent("languageChanged", { detail: { lang: currentLang } }));
}
```

#### ③ 深度架构剖析弹窗 (`js/projects-modal.js`)
- 点击任一项目卡片即可调起 Glassmorphism 居中弹窗，完整呈现其：
  - 面临痛点与架构瓶颈（如 1.4 万节点超级垃圾桶成因、200 OK 伪健康漏洞等）；
  - 核心技术方案与攻坚（如 Summary-First 微社区、统一 Validator 审计、HRP 模型等）；
  - 流水线与机制（三阶段 NER、WASM 解密 PoW、双轨容灾差分还原等）；
  - 量化成效与未来规划。

#### ④ 打印与 PDF 导出排版 (`css/print.css`)
- 针对 `@media print` 进行了深度定制：
  - 隐藏导航栏、按钮、主题切换、弹窗等屏幕元素；
  - 强制纯白底色、高对比度黑字、重置 margins 为标准 A4 规格；
  - 配置 `page-break-inside: avoid; break-inside: avoid;` 防止标题与正文截断。

### 3. 验证结果
- 执行 `python scripts\verify_site.py`，全套 10 个核心文件完整性检验 100% 通过；
- 执行 `node --check js\*.js`，语法校验全部为 0 错误；
- 本地服务器脚本 `scripts\serve.py` 已就绪，支持 `http://localhost:8080/` 快速预览。

---

## [Commit 003] - 2026-09-15: 项目视觉强化、真实系统截图画廊与全景架构图解集成

### 1. 本次提交目的
- 响应用户建议，为各个核心项目添加**视觉图像展示**与**深度系统架构说明**；
- 提取并引入 `FVTracker` 真实运行截图（实时估值监控看板、多模型量化回测曲线对比）；
- 为全部 5 个系统级项目设计矢量/交互式**系统架构与数据流拓扑图解 (System Architecture & Pipeline Diagrams)**；
- 在项目卡片与深度弹窗中新增“架构分层与数据流向”、“截图画廊 (Gallery & Lightbox)”双板块；
- 保持全站中英双语 (i18n) 完整对齐与深浅主题自适应。

### 2. 关键模块与代码实现概要
- **截图资产归档**：
  - `assets/images/fvtracker_dashboard.png` (基金估值与持仓分时图监控看板)
  - `assets/images/fvtracker_quant_backtest.png` (MPT / Black-Litterman / Kelly 策略回测对比)
- **数据集升级 (`js/data.js`)**：
  - 增加 `architecture` 结构化对象（架构分层、数据流向、核心组件说明）；
  - 增加 `gallery` 字段维护项目高精截图列表与中英双语图注。
- **架构流图与画廊组件 (`js/projects-modal.js`, `css/style.css`)**：
  - 现代矢量流程图组件，直观展示微社区拓扑、网关协议逆向、200 OK 语义审计、双轨容灾回退；
  - 弹出层全屏图片放大查看器 (Lightbox)。

---

## [Commit 004] - 2026-09-15: 修复 data.js 语法错误，恢复数据驱动层正常加载

### 1. 问题定位
- 用户在浏览器控制台观察到：`[MainApp] Unable to load resume data.`；
- 经过 Node 原生语法沙箱编译分析，定位根因在于 `js/data.js` 中 `zh.modal` 与 `en.modal` 在合并新增字段时，第 395 行与第 787 行存在重复声明 `techTitle` 且缺少逗号分隔，导致浏览器抛出 `SyntaxError: Unexpected identifier 'techTitle'`，阻止了全局变量 `window.RESUME_DATA` 的初始化。

### 2. 修复方案
- 移除多余的重复键声明，对齐属性语法结构；
- 使用 Node.js 严格模式脚本执行 `require('./js/data.js')`，验证 `window.RESUME_DATA` 在 `zh` 和 `en` 分支下各 5 个项目的完整可用性；
- 编写 Mock DOM 测试套件验证 `window.getCurrentData()` 正常返回 `李凯 (Kai Li)`；
- 执行 `python scripts\verify_site.py`，全量资源校验通过。



