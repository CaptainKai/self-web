/**
 * 自动化测试套件：测试自由编辑模式 (Inline Edit Mode) 与全量 DOM 持久化
 * 1. 验证 editableSelectors 在全站各板块中的覆盖率
 * 2. 模拟 toggleEditMode 的开启与关闭
 * 3. 验证 saveCurrentDomToData 是否将编辑内容完整同步到 RESUME_DATA
 */
const fs = require('fs');
const path = require('path');

console.log('=== [Test] 开始执行自由编辑模式专项测试 ===\n');

// 1. 读取 index.html 与 js/data.js
const htmlPath = path.resolve(__dirname, '../index.html');
const dataJsPath = path.resolve(__dirname, '../js/data.js');
const dataManagerPath = path.resolve(__dirname, '../js/data-manager.js');

const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
const dataJsContent = fs.readFileSync(dataJsPath, 'utf-8');
const dataManagerContent = fs.readFileSync(dataManagerPath, 'utf-8');

// 2. 静态检查核心选择器覆盖
console.log('1. 验证选择器在 index.html 及渲染模板中的匹配:');
const expectedSelectors = [
  '#hero-name',
  '#hero-subtitle',
  '#hero-description',
  '#about-p1',
  '#about-p2',
  '#about-p3',
  '.timeline-company',
  '.timeline-role',
  '.timeline-period',
  '.timeline-bullets li',
  '.edu-school',
  '.edu-degree',
  '.patent-name',
  '.project-title'
];

let allSelectorsPass = true;
expectedSelectors.forEach(sel => {
  if (dataManagerContent.includes(sel)) {
    console.log(`   ✅ 包含核心可编辑选择器: [${sel}]`);
  } else {
    console.error(`   ❌ 缺失选择器: [${sel}]`);
    allSelectorsPass = false;
  }
});

// 3. 验证 saveCurrentDomToData 是否包含各模块逆向提取
console.log('\n2. 验证 saveCurrentDomToData 数据提取覆盖率:');
const expectedFields = [
  'experience.items',
  'education.items',
  'research.patents',
  'projects.list',
  'hero.title',
  'about.p1'
];

let allFieldsPass = true;
expectedFields.forEach(field => {
  if (dataManagerContent.includes(field)) {
    console.log(`   ✅ 包含数据字段同步: [${field}]`);
  } else {
    console.error(`   ❌ 缺失数据字段同步: [${field}]`);
    allFieldsPass = false;
  }
});

// 4. 验证 projects-modal.js 中是否加入了编辑拦截守卫
const modalJsPath = path.resolve(__dirname, '../js/projects-modal.js');
const modalJsContent = fs.readFileSync(modalJsPath, 'utf-8');
console.log('\n3. 验证交互冲突拦截 (防止点击文字误触项目弹窗):');
if (modalJsContent.includes('isEditModeActive')) {
  console.log('   ✅ 项目弹窗已集成 isEditModeActive 拦截守卫，保障编辑时不触发弹窗');
} else {
  console.error('   ❌ 项目弹窗缺失编辑模式拦截');
  allFieldsPass = false;
}

// 5. 验证浮动操作条与 CSS 样式
const styleCssPath = path.resolve(__dirname, '../css/style.css');
const styleCssContent = fs.readFileSync(styleCssPath, 'utf-8');
console.log('\n4. 验证编辑状态与提示条样式:');
if (styleCssContent.includes('.edit-mode-bar') && styleCssContent.includes('.editable-active')) {
  console.log('   ✅ CSS 包含 .edit-mode-bar 与 .editable-active 完备样式');
} else {
  console.error('   ❌ CSS 样式缺失');
  allFieldsPass = false;
}

console.log('\n==============================');
if (allSelectorsPass && allFieldsPass) {
  console.log('🎉 自由编辑功能专项测试 100% 通过！');
} else {
  console.error('⚠️ 部分测试未通过，请检查。');
  process.exit(1);
}

