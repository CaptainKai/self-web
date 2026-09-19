/**
 * self-website 数据管理器 (Data Manager)
 * 1. 负责数据源校验与本地持久化缓存管线
 * 2. 简历编辑触发代理至结构化简历编辑器 window.openResumeEditor()
 * 3. 敏感数据管理（上传导入、导出下载、恢复初始规范）受 AuthManager 权限守卫保护
 */

(function () {
  const STORAGE_KEY = "SELF_WEBSITE_CUSTOM_DATA";
  const VERSION_KEY = "SELF_WEBSITE_DATA_VERSION";
  const CURRENT_VERSION = "2026-09-18-v5";
  let isEditMode = false;

  console.log("[DataManager] 初始化数据管理器，基础数据深度依赖 resume_canonical_data.json");

  // 1. 初始化优先读取本地保存的自定义数据，否则使用规范数据
  function initDataPipeline() {
    const savedVersion = localStorage.getItem(VERSION_KEY);
    const savedCustomData = localStorage.getItem(STORAGE_KEY);

    // 如果版本不匹配，清除旧缓存，强制加载最新规范数据
    if (savedVersion !== CURRENT_VERSION) {
      console.log(`[DataManager] 数据版本升级 (${savedVersion} -> ${CURRENT_VERSION})，强制加载最新规范全量数据并清理旧缓存`);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      return;
    }

    if (savedCustomData) {
      try {
        const parsed = JSON.parse(savedCustomData);
        if (parsed && parsed.zh && parsed.en) {
          const hasFullExperiences = parsed.zh.experience?.items?.length >= 4;
          const hasPatentNo = parsed.zh.research?.patents?.every(p => p.patentNo && p.patentNo.length > 5);
          if (hasFullExperiences && hasPatentNo) {
            window.RESUME_DATA = parsed;
            console.log("[DataManager] 已载入用户本地保存的有效自定义编辑数据，经历数:", parsed.zh.experience.items.length);
          } else {
            console.log("[DataManager] 缓存数据不完整(缺少经历或专利号)，重置为最新规范数据");
            localStorage.removeItem(STORAGE_KEY);
          }
        }
      } catch (e) {
        console.warn("[DataManager] 解析自定义缓存数据失败，回退至基础规范数据:", e);
      }
    }
  }

  initDataPipeline();

  // 对外暴露编辑状态查询，供外部组件进行交互守卫
  window.isEditModeActive = function () {
    return isEditMode;
  };

  // 2. 结构化简历编辑模式触发（受 AuthManager 管理员鉴权守卫保护）
  window.toggleEditMode = function () {
    console.log("[DataManager] 触发简历编辑，引导进入安全结构化编辑器");
    if (window.openResumeEditor) {
      window.openResumeEditor();
    } else {
      console.warn("[DataManager] 未检测到 openResumeEditor 模块");
    }
  };

  // 3. 数据管理弹窗控制（受 AuthManager 鉴权守卫保护）
  window.openDataManageModal = function () {
    if (window.AuthManager && !window.AuthManager.isLoggedIn()) {
      console.log("[DataManager] 打开数据管理受限，等待管理员身份认证");
      window.AuthManager.requireAuth(() => {
        doOpenDataManageModal();
      });
      return;
    }
    doOpenDataManageModal();
  };

  function doOpenDataManageModal() {
    const modal = document.getElementById("data-manage-modal");
    if (!modal) return;

    const textarea = document.getElementById("data-json-textarea");
    if (textarea) {
      textarea.value = JSON.stringify(window.RESUME_DATA, null, 2);
    }
    modal.classList.add("active");
  }

  window.closeDataManageModal = function () {
    const modal = document.getElementById("data-manage-modal");
    if (modal) modal.classList.remove("active");
  };

  // 4. 上传本地 JSON 文件
  window.handleLocalJsonUpload = function (event) {
    if (window.AuthManager && !window.AuthManager.isLoggedIn()) {
      window.AuthManager.requireAuth(() => {
        alert("管理员权限已解锁，请重新选取要上传的 JSON 文件");
      });
      event.target.value = "";
      return;
    }

    const file = event.target.files && event.target.files[0];
    if (!file) return;

    console.log("[DataManager] 用户上传文件:", file.name);
    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const text = e.target.result;
        const parsed = JSON.parse(text);

        // 如果上传的是 resume_canonical_data.json 结构
        if (parsed.personal_info || parsed.education || parsed.projects) {
          applyCanonicalDataToSelfWebsite(parsed);
        } else if (parsed.zh && parsed.en) {
          // 如果上传的是 RESUME_DATA 结构
          window.RESUME_DATA = parsed;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
          if (window.renderAll) window.renderAll();
        } else {
          alert("无法识别该 JSON 数据格式，请上传 resume_canonical_data.json 或网站导出的数据。");
          return;
        }

        const textarea = document.getElementById("data-json-textarea");
        if (textarea) textarea.value = JSON.stringify(window.RESUME_DATA, null, 2);

        showNotification(`🎉 成功导入并应用数据: ${file.name}！`);
      } catch (err) {
        alert(`JSON 解析失败: ${err.message}`);
      }
    };
    reader.readAsText(file, "utf-8");
  };

  // 将 resume_canonical_data.json 动态映射并注入到网站展示中
  function applyCanonicalDataToSelfWebsite(canonical) {
    console.log("[DataManager] 正在将 resume_canonical_data.json 映射至当前网站:", canonical.personal_info?.name);
    const zh = window.RESUME_DATA.zh;

    if (canonical.personal_info) {
      const p = canonical.personal_info;
      zh.hero.title = `${p.name} (Kai Li)`;
      if (p.email) zh.hero.email = p.email;
      if (p.phone) zh.hero.phone = p.phone;
      if (p.address) zh.hero.location = p.address;
    }

    if (canonical.education && canonical.education.length > 0) {
      zh.education.items = canonical.education.map(e => ({
        school: e.school || "北京科技大学",
        degree: e.degree || "硕士",
        major: "计算机科学与技术 / 人工智能",
        period: e.period || "",
        description: e.description || "在校深造阶段"
      }));
    }

    if (canonical.work_experiences && canonical.work_experiences.length > 0) {
      const works = canonical.work_experiences.map(w => ({
        company: w.company,
        department: "研发部",
        role: w.role || "AI算法工程师",
        period: w.period || "",
        location: "中国",
        achievements: w.bullets || []
      }));
      const internships = (canonical.internships || []).map(item => ({
        company: "腾讯 (Tencent)",
        department: "多模态一组",
        role: "大模型数据与算法研发实习生",
        period: item.period || "2024.09 — 2025.02",
        location: "中国 · 北京",
        achievements: item.bullets || []
      }));
      zh.experience.items = [...internships, ...works];
    }

    if (canonical.patents && canonical.patents.length > 0) {
      zh.research.patents = canonical.patents.map(patStr => {
        const parts = patStr.split('--');
        const name = parts[0].trim();
        const patentNo = parts.length > 1 ? parts[1].trim() : '';
        return {
          name: name,
          patentNo: patentNo,
          owner: "李凯 等 (国家发明专利)",
          desc: `基于计算机视觉与多模态表征学习的核心知识产权，专利号: ${patentNo}。`
        };
      });
      console.log("[DataManager] 数据映射完成 -> 经历总数:", zh.experience.items.length, "专利总数:", zh.research.patents.length);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.RESUME_DATA));
    if (window.renderAll) {
      console.log("[DataManager] 触发 window.renderAll() 重新渲染整页视图");
      window.renderAll();
    }
  }

  // 5. 应用文本框中的 JSON
  window.applyTextareaJson = function () {
    if (window.AuthManager && !window.AuthManager.isLoggedIn()) {
      window.AuthManager.requireAuth(() => {
        window.applyTextareaJson();
      });
      return;
    }

    const textarea = document.getElementById("data-json-textarea");
    if (!textarea) return;
    try {
      const parsed = JSON.parse(textarea.value);
      if (parsed.personal_info) {
        applyCanonicalDataToSelfWebsite(parsed);
      } else {
        window.RESUME_DATA = parsed;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
        if (window.renderAll) window.renderAll();
      }
      showNotification("🎉 JSON 数据已成功应用到页面！");
      window.closeDataManageModal();
    } catch (e) {
      alert(`JSON 格式错误: ${e.message}`);
    }
  };

  // 6. 重置回系统初始规范数据
  window.resetToDefaultCanonicalData = function () {
    if (window.AuthManager && !window.AuthManager.isLoggedIn()) {
      window.AuthManager.requireAuth(() => {
        window.resetToDefaultCanonicalData();
      });
      return;
    }

    if (!confirm("确定要清除本地编辑，重置为系统初始规范数据吗？")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };

  // 7. 导出并下载当前 JSON
  window.exportCurrentJsonData = function () {
    if (window.AuthManager && !window.AuthManager.isLoggedIn()) {
      window.AuthManager.requireAuth(() => {
        window.exportCurrentJsonData();
      });
      return;
    }
    const jsonStr = JSON.stringify(window.RESUME_DATA, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "self_website_resume_data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    showNotification("📥 已成功导出 self_website_resume_data.json！");
  };

  // 轻量顶部通知提示
  function showNotification(msg) {
    let notify = document.getElementById("data-notification");
    if (!notify) {
      notify = document.createElement("div");
      notify.id = "data-notification";
      notify.style.cssText = `
        position: fixed; top: 70px; left: 50%; transform: translateX(-50%);
        background: rgba(15, 23, 42, 0.95); color: #38bdf8; padding: 10px 22px;
        border-radius: 8px; border: 1px solid #38bdf8; z-index: 99999;
        font-size: 14px; box-shadow: 0 4px 20px rgba(0,0,0,0.4);
        transition: opacity 0.3s ease;
      `;
      document.body.appendChild(notify);
    }
    notify.textContent = msg;
    notify.style.opacity = "1";
    setTimeout(() => {
      notify.style.opacity = "0";
    }, 3500);
  }
})();
