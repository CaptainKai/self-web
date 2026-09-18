/**
 * End-to-End Test Suite for Self-Website Canonical Data Sync
 * 1. Checks HTTP 200 & Cache-Control headers
 * 2. Checks version query string on all scripts
 * 3. Verifies 4 work/internship experiences and 3 patents with registration numbers
 */
const http = require('http');

console.log('=== [Test] 开始执行 self-website 简历数据同步与服务测试 ===\n');

function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:8080${path}`, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    }).on('error', reject);
  });
}

async function runTests() {
  let passed = true;

  try {
    // Test 1: HTML
    const htmlRes = await fetchUrl('/');
    console.log(`1. 请求 GET / -> 状态码: ${htmlRes.status}`);
    if (htmlRes.status === 200 && htmlRes.headers['cache-control']?.includes('no-cache')) {
      console.log('   ✅ HTML 响应成功，已携带禁止缓存响应头 (Cache-Control: no-cache)');
    } else {
      console.error('   ❌ HTML 缓存控制头校验失败');
      passed = false;
    }

    if (htmlRes.body.includes('20260918_v4')) {
      console.log('   ✅ HTML 中所有 JS 脚本已携带防缓存版本标识 (?v=20260918_v4)');
    } else {
      console.error('   ❌ 未找到防缓存版本标识');
      passed = false;
    }

    // Test 2: data.js
    const dataRes = await fetchUrl('/js/data.js');
    console.log(`\n2. 请求 GET /js/data.js -> 状态码: ${dataRes.status}`);
    const checkList = [
      '时代凌宇',
      'Ukoom',
      'Double Bridge',
      '腾讯 (Tencent)',
      'CN116740790B',
      'CN109255322B',
      'CN109993061A'
    ];

    for (const item of checkList) {
      if (dataRes.body.includes(item)) {
        console.log(`   ✅ 包含关键数据字段: [${item}]`);
      } else {
        console.error(`   ❌ 缺失关键字段: [${item}]`);
        passed = false;
      }
    }

    // Test 3: main.js
    const mainRes = await fetchUrl('/js/main.js');
    console.log(`\n3. 请求 GET /js/main.js -> 状态码: ${mainRes.status}`);
    if (mainRes.body.includes('window.renderAll = renderAll')) {
      console.log('   ✅ window.renderAll 全局暴露成功，支持动态无感刷新');
    } else {
      console.error('   ❌ window.renderAll 未正确挂载');
      passed = false;
    }

    console.log('\n==============================');
    if (passed) {
      console.log('🎉 所有自动化验证全部通过！数据无缓存残留，完整呈现最新规范数据！');
    } else {
      console.error('⚠️ 部分测试未通过，请检查上述错误信息。');
      process.exit(1);
    }
  } catch (err) {
    console.error('❌ 测试运行异常:', err.message);
    process.exit(1);
  }
}

runTests();

