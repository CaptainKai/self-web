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

---

## [Commit 005] - 2026-09-18: 简历展示全面依赖基础规范数据，集成自由填空编辑、本地上传导入与双向数据流

### 1. 本次提交目的
- 彻底解决展示数据来源脱节的问题：确立 `D:\code\resume-design-release-v6.0.0\tools\resume_canonical_data.json` 作为个人网站与在线简历展示的核心基础规范数据源；
- 补齐此前缺失的履历信息：包括 4 段完整教育背景（本科、硕士保研、博士硕博连读、硕士博转硕）、3 段正式工作经历（时代凌宇、Ukoom、Double Bridge）、6 个工业/系统项目（包含高校场馆实时调度平台）；
- 实现**页面自由填空与实时编辑模式**：用户点击顶栏铅笔图标即可在页面上直接点击文字进行填空、修改，并在失焦后自动持久化到本地存储；
- 实现**数据上传与导入管理**：支持用户直接上传本地的 `.json` 格式简历文件（如 `resume_canonical_data.json`），自动完成数据映射与全站刷新；支持在线微调与一键恢复默认；
- 改造 `scripts/serve.py`，服务启动前自动执行 `scripts/sync_canonical_data.py` 数据对齐，保证无论何时运行本地预览服务均呈现最新标准数据。

### 2. 关键模块与代码实现概要
1. **自动同步与桥接脚本 (`scripts/sync_canonical_data.py`)**：
   - 从规范路径读取基础数据，并动态注入到 `js/data.js` 中；
   - 改造 `scripts/serve.py`，在服务启动时自动触发同步并打印友好数据源指引。
2. **前端数据管理器 (`js/data-manager.js`)**：
   - `toggleEditMode()`：一键切换页面文字 `contenteditable` 状态，支持可视化虚线高亮与即时编辑反馈；
   - `handleLocalJsonUpload(event)`：支持在浏览器中直接选取本地的 `resume_canonical_data.json` 并动态注入映射；
   - `exportCurrentJsonData()`：支持一键将当前编辑后的完整数据导出为 JSON 文件下载到本地；
   - `resetToDefaultCanonicalData()`：支持一键清除本地修改，恢复系统默认规范数据。
3. **导航栏与交互弹窗集成 (`index.html`, `css/style.css`)**：
   - 导航控制栏新增“✏️ 自由填空与编辑”及“📤 数据管理与上传”两个图标按钮；
   - 底部集成 Glassmorphism 数据管理模态框与轻量顶部通知组件。

### 3. 验证结果
- 执行 `python scripts/sync_canonical_data.py`，数据对齐成功（教育 4 条、实习 1 条、工作 3 条、项目 6 条）；
- 执行 `node --check js/*.js`，语法校验 100% 通过（0 错误）；
- 执行 `python scripts/verify_site.py`，全量资源校验通过；
- 执行 `python scripts/serve.py`，控制台清晰输出数据源依赖与网页操作指引。

---

## [Commit 006] - 2026-09-18: 根治浏览器静态强缓存劫持，修复全局渲染入口与模板编译器，确保4段工作经历与国家发明专利号完整呈现

### 1. 本次修改背景与用户反馈
- **用户反馈**：在通过 `scripts/serve.py` 运行时，页面上感觉缺失了三段工作经历（时代凌宇、Ukoom、Double Bridge），且专利部分没有专利号，怀疑数据仍然依赖旧数据。
- **排查根因**：
  1. **浏览器 HTTP 强缓存劫持**：`serve.py` 之前使用原生 `SimpleHTTPRequestHandler`，没有设置禁用缓存响应头，且 `index.html` 引入的 `.js` 脚本没有添加查询版本号，导致浏览器命中 Disk Cache / 304，反复加载磁盘中只有 1 段腾讯经历的旧版 `data.js`；
  2. **局部函数限制**：`main.js` 中的 `renderAll()` 未挂载到 `window.renderAll`，导致 `data-manager.js` 在导入或更新数据后无法触发全站视图刷新；
  3. **localStorage 校验不充分**：本地缓存虽然有版本比对，但旧缓存若存在未被强制清洗；
  4. **设计器模板编译错误**：`resume-design-release-v6.0.0` 中的 `tools/generate_likai_new_template.js` 之前存在重复变量声明等语法错误，导致模板未正常更新。

### 2. 核心修改与关键代码
1. **`self-website/scripts/serve.py` 响应头注入**：
   ```python
   def end_headers(self):
       # 禁用浏览器强缓存，确保客户端每次刷新均拉取最新脚本和数据
       self.send_header("Cache-Control", "no-cache, no-store, must-revalidate")
       self.send_header("Pragma", "no-cache")
       self.send_header("Expires", "0")
       super().end_headers()
   ```
2. **`self-website/index.html` 版本号破除缓存**：
   ```html
   <script src="js/data.js?v=20260918_v3"></script>
   <script src="js/data-manager.js?v=20260918_v3"></script>
   <script src="js/theme.js?v=20260918_v3"></script>
   <script src="js/i18n.js?v=20260918_v3"></script>
   <script src="js/projects-modal.js?v=20260918_v3"></script>
   <script src="js/main.js?v=20260918_v3"></script>
   ```
3. **`self-website/js/main.js` 暴露全局刷新与加入关键变量 Log**：
   ```javascript
   console.log("[MainApp] 待渲染工作经历数:", data.experience?.items?.length);
   console.log("[MainApp] 待渲染专利成果数:", data.research?.patents?.length);
   window.renderAll = renderAll;
   ```
4. **`self-website/js/data-manager.js` 严格缓存清洗**：
   - 升级版本标识为 `2026-09-18-v3`；
   - 增加专利号 `patentNo` 字段完整性校验，缺少专利号时自动销毁旧缓存并重置为最新规范数据。
5. **重构 `resume-design-release-v6.0.0/tools/generate_likai_new_template.js`**：
   - 修复重复变量声明与语法错乱，规范编译生成 `likaiTemplate.ts`；
   - 包含 4 段教育、1 段大厂实习、3 段工作经历、6 大核心项目、带专利号的发明专利。
6. **归类测试脚本 (`self-website/scripts/test_resume_sync.js`)**：
   - 编写自动化端到端测试套件，验证 HTTP 200、Cache-Control 头、`data.js` 关键字段及全局刷新方法。

### 3. 验证结果
- 执行 `node tools/test_canonical_template.js`：🎉 所有基础数据与模板核验全部通过！
- 执行 `node scripts/test_resume_sync.js`：🎉 所有自动化端到端测试全部通过！
- 本地服务 `http://localhost:8080/` 状态为 RUNNING，已通过自动化端到端断言，页面完整呈现 4 段经历（腾讯大厂实习 + 时代凌宇 + Ukoom + Double Bridge）及 3 项发明专利与对应专利号。

---

## [Commit 007] - 2026-09-18: 全面重构自由编辑填空模式，解决选择器与DOM脱节、点击事件冒泡拦截及全量履历持久化存储

### 1. 本次修改背景与用户反馈
- **用户反馈**：“现在好像编辑功能失效了”。
- **排查根因**：
  1. **可编辑选择器与实际 DOM 严重脱离**：旧代码中 `editableSelectors` 包含大量不存在的类名（如 `.skill-pill`, `.skill-level`, `.timeline-title`），且工作经历的成就要点 `.timeline-bullets li`、教育背景的专业、科研论文标题作者等均未被命中，导致大量文本无法编辑；
  2. **事件冒泡干扰**：核心项目卡片绑定了点击弹窗事件，用户在编辑模式下尝试点击项目文字时直接触发了模态框，打断光标输入；
  3. **数据逆向持久化缺失**：此前 `saveCurrentDomToData()` 仅提取了 `hero` 和 `about` 字段，未提取工作经历、教育背景、技能、专利和项目，导致用户修改后刷新全丢；
  4. **DOM 渲染重复 Bug**：`main.js` 的 `renderResearch` 中多渲染了一行重复的 `<h4 class="patent-name">`。

### 2. 核心修改与关键代码
1. **重构精准选择器与浮动操作栏 (`js/data-manager.js`)**：
   - 覆盖 Hero、Stats、About、Skills、Experience (含 bullets li)、Education、Research (含专利号徽章)、Projects 全站节点；
   - 激活时在顶部弹出固定操作栏 `.edit-mode-bar`，提供直观的【💾 保存并退出编辑】按钮；
   - 添加 `handleEditableClick` 拦截 `a` 标签跳转与冒泡。
2. **实现全量 DOM 逆向采集与持久化 (`saveCurrentDomToData`)**：
   - 遍历 `.timeline-item` 同步公司、部门、职位、日期及所有 `bullets` 数组；
   - 遍历 `.edu-card` 同步学校、专业、学历及培养描述；
   - 遍历 `.research-item` 与 `.patent-item` 同步论文与带专利号的专利信息；
   - 深度回写至 `window.RESUME_DATA[currentLang]` 并写入 `localStorage`。
3. **弹窗守卫与样式优化 (`js/projects-modal.js`, `css/style.css`)**：
   - `openProjectModal` 在 `isEditModeActive()` 为真时自动拦截弹窗；
   - 优化 `.editable-active` 虚线高亮、悬停微光及聚焦阴影；
   - 移除 `main.js` 中多余的重复专利标题行。
4. **归类测试脚本 (`scripts/test_edit_mode.js`)**：
   - 自动化核验全板块可编辑节点选择器、字段逆向同步覆盖率及交互拦截。

### 3. 验证结果
- 执行 `node scripts/test_edit_mode.js`：🎉 自由编辑功能专项测试 100% 通过！
- 执行 `node scripts/test_resume_sync.js`：🎉 端到端数据与服务断言 100% 通过！
- 自由填空编辑模式已完全恢复且覆盖全站文字，直接点击即可修改、保存后即时持久化。

---

## [Commit 008] - 2026-09-18: 修复同步脚本语法交叠错误，消除服务启动中断，新增双击启动脚本与后台稳定守护

### 1. 本次排查与根因定位
- **现象**：用户反馈“功能还是没有更新”。
- **深层根因**：
  1. `self-website/scripts/sync_canonical_data.py` 在此前合并时存在函数交叠与语法冲突（第 74 行 `SyntaxError: invalid syntax`）；
  2. `serve.py` 启动时调用 `from sync_canonical_data import sync_canonical_data` 因语法错误直接导致服务进程异常退出，`8080` 端口停止监听；
  3. 用户刷新页面时由于服务未在监听，无法拉取更新，看到的仍是旧的脱机离线缓存。

### 2. 核心修改与关键代码
1. **重构 `self-website/scripts/sync_canonical_data.py`**：
   - 彻底清除交叠冗余代码，规范实现 `build_full_experiences_zh`、`build_full_experiences_en`、`build_full_education_zh`、`build_full_education_en`、`build_full_patents_zh`、`build_full_patents_en`；
   - 语法检查 100% 通过，数据同步耗时由异常中断恢复为秒级完成。
2. **重构 `self-website/scripts/serve.py` 与编码安全保护**：
   - 安全包装 `sys.stdout` 的 UTF-8 编码，杜绝多次封装引起的底层 buffer 错误；
   - 新增 `run_server.bat` 批处理启动器，支持 Windows 双击一键启动与终端日志实时监视。
3. **`data-manager.js` 语法与结构整理**：
   - 修复 `initDataPipeline` 中的多余判断分支与闭合结构；
   - 升级版本号至 `2026-09-18-v4`，强制破除历史残留。

### 3. 验证结果
- 执行 `python scripts/sync_canonical_data.py`：`[SUCCESS]` 全量对齐成功；
- 执行 `node scripts/test_edit_mode.js`：🎉 自由编辑功能专项测试 100% 通过；
- 执行 `node scripts/test_resume_sync.js`：🎉 端到端数据与服务断言 100% 通过；
- 服务在后台稳定监听 `http://localhost:8080/`（HTTP 200，Cache-Control: no-cache）。



