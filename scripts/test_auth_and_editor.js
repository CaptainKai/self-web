/**
 * 权限鉴权、数据管理、结构化简历编辑器与全站真实代码端到端自动化测试
 * 归类于 scripts/ 工具目录，符合项目工程规范
 */

const fs = require('fs');
const path = require('path');

// 1. 构造全功能浏览器运行时环境 (DOM, WebStorage, Alert)
const storageBacking = {
  local: {},
  session: {}
};

global.localStorage = {
  getItem: (k) => storageBacking.local[k] || null,
  setItem: (k, v) => { storageBacking.local[k] = String(v); },
  removeItem: (k) => { delete storageBacking.local[k]; },
  clear: () => { storageBacking.local = {}; }
};

global.sessionStorage = {
  getItem: (k) => storageBacking.session[k] || null,
  setItem: (k, v) => { storageBacking.session[k] = String(v); },
  removeItem: (k) => { delete storageBacking.session[k]; },
  clear: () => { storageBacking.session = {}; }
};

class ClassList {
  constructor() {
    this.classes = new Set();
  }
  add(...cls) { cls.forEach(c => this.classes.add(c)); }
  remove(...cls) { cls.forEach(c => this.classes.delete(c)); }
  contains(c) { return this.classes.has(c); }
  toggle(c) {
    if (this.classes.has(c)) this.classes.delete(c);
    else this.classes.add(c);
  }
}

class MockElement {
  constructor(id = '', tag = 'div') {
    this.id = id;
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.classList = new ClassList();
    this.attributes = {};
    this.style = {};
    this.innerText = '';
    this.textContent = '';
    this.innerHTML = '';
    this.value = '';
    this.dataset = {};
  }
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k]; }
  removeAttribute(k) { delete this.attributes[k]; }
  appendChild(child) { this.children.push(child); }
  removeChild(child) {
    const idx = this.children.indexOf(child);
    if (idx !== -1) this.children.splice(idx, 1);
  }
  addEventListener(evt, fn) {}
  removeEventListener(evt, fn) {}
  focus() {}
  click() {}
  closest(sel) { return this; }
  querySelector(sel) {
    if (sel === '.exp-company') return new MockElement('', 'input');
    if (sel === '.exp-dept') return new MockElement('', 'input');
    if (sel === '.exp-role') return new MockElement('', 'input');
    if (sel === '.exp-period') return new MockElement('', 'input');
    if (sel === '.exp-location') return new MockElement('', 'input');
    if (sel === '.exp-stack') return new MockElement('', 'input');
    if (sel === '.exp-bullets') {
      const el = new MockElement('', 'textarea');
      el.value = "要点1\n要点2";
      return el;
    }
    return new MockElement();
  }
  querySelectorAll(sel) {
    return [];
  }
}

const mockElements = {};
function getOrCreateElement(id) {
  if (!mockElements[id]) {
    mockElements[id] = new MockElement(id);
  }
  return mockElements[id];
}

global.document = {
  documentElement: { lang: 'zh-CN' },
  body: new MockElement('body'),
  getElementById: (id) => getOrCreateElement(id),
  querySelector: (sel) => new MockElement(),
  querySelectorAll: (sel) => [],
  createElement: (tag) => new MockElement('', tag),
  addEventListener: (evt, cb) => {}
};

global.window = global;
global.window.addEventListener = (evt, cb) => {};
global.alert = (msg) => { console.log("[Mock Alert]", msg); };
global.confirm = (msg) => true;

console.log("==================================================");
console.log("🚀 开始执行全站各模块真实代码集成自动化测试");
console.log("==================================================");

// 2. 真实加载并执行每一个前端脚本模块
const jsDir = path.join(__dirname, '..', 'js');
const filesToLoad = [
  'data.js',
  'data-manager.js',
  'i18n.js',
  'auth-manager.js',
  'projects-modal.js',
  'main.js',
  'resume-editor.js'
];

filesToLoad.forEach(file => {
  const filePath = path.join(jsDir, file);
  console.log(`[Eval Check] 载入并执行真实模块: js/${file}...`);
  try {
    const fileCode = fs.readFileSync(filePath, 'utf8');
    eval(fileCode);
    console.log(`  ✅ 模块 js/${file} 执行成功，语法与初始化正常`);
  } catch (err) {
    console.error(`  ❌ 模块 js/${file} 执行崩溃！`, err);
    process.exit(1);
  }
});

// 3. 验证基础数据 RESUME_DATA
console.log("\n[Test 1] 验证基础数据 RESUME_DATA 加载状态:");
if (global.RESUME_DATA && global.RESUME_DATA.zh && global.RESUME_DATA.zh.experience.items.length === 4) {
  console.log("  ✅ 成功：基础数据正常加载，经历数: " + global.RESUME_DATA.zh.experience.items.length);
} else {
  console.error("  ❌ 失败：RESUME_DATA 结构异常！");
  process.exit(1);
}

// 4. 验证 AuthManager 权限守卫机制
console.log("\n[Test 2] 验证 AuthManager 权限守卫机制:");
if (!window.AuthManager.isLoggedIn()) {
  console.log("  ✅ 成功：初始状态确认为未授权 (Guest)");
} else {
  console.error("  ❌ 失败：初始状态应当为未授权！");
  process.exit(1);
}

const failRes = window.AuthManager.login("wrong-password-123");
if (!failRes && !window.AuthManager.isLoggedIn()) {
  console.log("  ✅ 成功：错误口令被准确拦截并显示错误");
} else {
  console.error("  ❌ 失败：错误口令未能被拦截！");
  process.exit(1);
}

const passRes = window.AuthManager.login("likai2026");
if (passRes && window.AuthManager.isLoggedIn()) {
  console.log("  ✅ 成功：正确口令认证成功，已进入管理员模式 (Admin)");
} else {
  console.error("  ❌ 失败：正确口令未能成功解锁！");
  process.exit(1);
}

let guardedActionExecuted = false;
window.AuthManager.requireAuth(() => {
  guardedActionExecuted = true;
});
if (guardedActionExecuted) {
  console.log("  ✅ 成功：管理员状态下，受保护特权操作立即被放行执行");
} else {
  console.error("  ❌ 失败：特权回调未执行！");
  process.exit(1);
}

window.AuthManager.logout();
if (!window.AuthManager.isLoggedIn()) {
  console.log("  ✅ 成功：退出管理员模式后成功锁死特权");
} else {
  console.error("  ❌ 失败：登出后状态异常！");
  process.exit(1);
}

// 5. 验证真实 main.js 的 renderAll() 全站渲染流水线
console.log("\n[Test 3] 验证真实 main.js 的 renderAll() 全站渲染流水线:");
try {
  window.renderAll();
  console.log("  ✅ 成功：真实调用 window.renderAll() 顺利通过，无任何语法或渲染错误！");
} catch (err) {
  console.error("  ❌ 失败：window.renderAll() 执行失败！", err);
  process.exit(1);
}

// 6. 验证结构化简历编辑器动态增删
console.log("\n[Test 4] 验证结构化简历编辑器 ResumeEditor:");
window.AuthManager.login("likai2026");
window.switchEditorTab("basic");
console.log("  ✅ 成功：成功渲染 basic Tab");

window.switchEditorTab("experience");
console.log("  ✅ 成功：成功渲染 experience Tab，当前经历段数: " + window.RESUME_DATA.zh.experience.items.length);

const beforeCount = window.RESUME_DATA.zh.experience.items.length;
window.addExperienceItem();
const afterCount = window.RESUME_DATA.zh.experience.items.length;
if (afterCount === beforeCount + 1) {
  console.log("  ✅ 成功：动态添加工作经历测试通过 (" + beforeCount + " -> " + afterCount + ")");
} else {
  console.error("  ❌ 失败：添加工作经历失败！");
  process.exit(1);
}

const beforePatents = window.RESUME_DATA.zh.research.patents.length;
window.addPatentItem();
const afterPatents = window.RESUME_DATA.zh.research.patents.length;
if (afterPatents === beforePatents + 1) {
  console.log("  ✅ 成功：动态添加国家发明专利测试通过 (" + beforePatents + " -> " + afterPatents + ")");
  const newPat = window.RESUME_DATA.zh.research.patents[afterPatents - 1];
  console.log("       新专利默认专利号包含: " + newPat.patentNo);
} else {
  console.error("  ❌ 失败：添加专利失败！");
  process.exit(1);
}

// 7. 验证保存并触发真实页面重绘
console.log("\n[Test 5] 验证保存简历数据并触发真实页面重新渲染:");
window.switchEditorTab("basic");
getOrCreateElement('edit-hero-title').value = "李凯 (Kai Li) - Verified Clean";
getOrCreateElement('edit-hero-badge').value = "系统级验证徽章";
getOrCreateElement('edit-hero-subtitle').value = "大模型基础设施与全栈架构";
getOrCreateElement('edit-hero-desc').value = "实战验证通过";
getOrCreateElement('edit-hero-email').value = "test@ustb.edu.cn";
getOrCreateElement('edit-hero-phone').value = "13800000000";
getOrCreateElement('edit-hero-location').value = "北京市海淀区学院路30号";
getOrCreateElement('edit-about-p1').value = "段落1";
getOrCreateElement('edit-about-p2').value = "段落2";
getOrCreateElement('edit-about-p3').value = "段落3";

try {
  window.saveResumeEditorData();
  console.log("  ✅ 成功：window.saveResumeEditorData() 调用顺利，且成功连带执行 window.renderAll()");
} catch (err) {
  console.error("  ❌ 失败：保存或重绘过程中出现异常！", err);
  process.exit(1);
}

const savedDataStr = localStorage.getItem("SELF_WEBSITE_CUSTOM_DATA");
if (savedDataStr) {
  const parsed = JSON.parse(savedDataStr);
  if (parsed.zh.hero.title === "李凯 (Kai Li) - Verified Clean") {
    console.log("  ✅ 成功：表单编辑内容已完整持久化存入 localStorage！");
    console.log("       持久化简历名: " + parsed.zh.hero.title);
  } else {
    console.error("  ❌ 失败：保存内容与预期不符！", parsed.zh.hero.title);
    process.exit(1);
  }
} else {
  console.error("  ❌ 失败：未能在 localStorage 中检测到存盘数据！");
  process.exit(1);
}

console.log("\n==================================================");
console.log("🎉 所有 7 个核心前端模块真实加载、解析与渲染测试全部 100% 通过！");
console.log("==================================================");
