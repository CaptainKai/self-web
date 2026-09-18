/**
 * self-website 数据管理器 (Data Manager)
 * 1. 支持依赖 resume_canonical_data.json 规范基础数据展示
 * 2. 支持自由填空编辑模式 (ContentEditable)，实时修改任意文本并保存
 * 3. 支持上传导入本地 JSON 文件
 * 4. 支持重置与导出下载当前数据
 */

(function () {
  const STORAGE_KEY = "SELF_WEBSITE_CUSTOM_DATA";
  const VERSION_KEY = "SELF_WEBSITE_DATA_VERSION";
  const CURRENT_VERSION = "2026-09-18-v4";
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
        if (parsed.zh && parsed.en) {
        const hasFullExperiences = parsed.zh && parsed.en && parsed.zh.experience?.items?.length >= 4;
        const hasPatentNo = parsed.zh?.research?.patents?.every(p => p.patentNo && p.patentNo.length > 5);
        if (hasFullExperiences && hasPatentNo) {
          window.RESUME_DATA = parsed;
          console.log("[DataManager] 已载入用户本地保存的自定义编辑数据");
          console.log("[DataManager] 已载入用户本地保存的有效自定义编辑数据，经历数:", parsed.zh.experience.items.length);
        } else {
          console.log("[DataManager] 缓存数据不完整(缺少经历或专利号)，重置为最新规范数据");
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch (e) {
        console.warn("[DataManager] 解析自定义缓存数据失败，回退至基础规范数据:", e);
      }
    }
  }

  initDataPipeline();

  // 对外暴露编辑状态查询，供外部组件（如项目弹窗）进行交互守卫
  window.isEditModeActive = function () {
    return isEditMode;
  };

  // 2. 自由填空/编辑模式切换
  window.toggleEditMode = function () {
    isEditMode = !isEditMode;
    const btn = document.getElementById("edit-toggle-btn");

    // 全量且精准的各板块可编辑元素选择器
    const editableSelectors = [
      // Hero 核心资料
      "#hero-name", "#hero-subtitle", "#hero-description", "#hero-badge-text",
      "#hero-location-text", "#hero-email-link", "#hero-phone-link",
      // 关于我
      "#about-title", "#about-subtitle", "#about-p1", "#about-p2", "#about-p3",
      // 核心统计数据
      ".stat-number", ".stat-label",
      // 专业技能
      ".skill-cat-title", ".skill-name", ".skill-desc",
      // 工作与实习经历
      ".timeline-company", ".timeline-dept", ".timeline-role", ".timeline-period", ".timeline-location", ".timeline-bullets li",
      // 教育背景
      ".edu-school", ".edu-period", ".edu-degree", ".edu-desc",
      // 科研与专利
      ".research-item-title", ".research-authors", ".research-highlights",
      ".patent-name", ".patent-owner", ".patent-desc", ".patent-item .badge",
      // 核心项目
      ".project-title", ".project-tagline", ".project-badge"
    ];

    const elements = document.querySelectorAll(editableSelectors.join(","));
    console.log(`[DataManager] 切换编辑模式 -> 状态: ${isEditMode ? '开启' : '关闭'}, 激活节点数: ${elements.length}`);

    let bar = document.getElementById("edit-mode-bar");

    if (isEditMode) {
      if (btn) btn.classList.add("active-edit");
      elements.forEach(el => {
        el.setAttribute("contenteditable", "true");
        el.classList.add("editable-active");
        el.addEventListener("click", handleEditableClick);
      });

      if (!bar) {
        bar = document.createElement("div");
        bar.id = "edit-mode-bar";
        bar.className = "edit-mode-bar";
        bar.innerHTML = `
          <div style="display:flex; align-items:center; gap:12px; font-size:13px; color:#e2e8f0;">
            <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981; box-shadow:0 0 8px #10b981;"></span>
            <span>✏️ <strong>自由填空编辑模式已开启</strong>（已激活 <strong>${elements.length}</strong> 处可编辑文字，点击任意文本即可直接修改）</span>
          </div>
          <div style="display:flex; gap:10px; align-items:center;">
            <button class="btn btn-primary btn-sm" onclick="window.toggleEditMode()" style="padding:6px 16px; font-size:13px; font-weight:600; cursor:pointer;">
              💾 保存并退出编辑
            </button>
          </div>
        `;
        document.body.appendChild(bar);
      }
      bar.style.display = "flex";
      showNotification(`✏️ 自由填空编辑模式已开启！全站共 ${elements.length} 处文字可直接点击修改。`);
    } else {
      if (btn) btn.classList.remove("active-edit");
      elements.forEach(el => {
        el.removeAttribute("contenteditable");
        el.classList.remove("editable-active");
        el.removeEventListener("click", handleEditableClick);
      });
      if (bar) bar.style.display = "none";
      saveCurrentDomToData();
      showNotification("✅ 编辑已保存！工作经历、教育背景与核心履历数据已全部持久化存储至本地。");
    }
  };

  // 在编辑模式下阻止链接跳转及冒泡至卡片弹窗
  function handleEditableClick(e) {
    if (isEditMode) {
      e.stopPropagation();
      if (e.target.tagName === 'A' || e.target.closest('a')) {
        e.preventDefault();
      }
    }
  }

  // 采集当前 DOM 文字更新回 RESUME_DATA 并持久化
  function saveCurrentDomToData() {
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    const data = window.RESUME_DATA[currentLang];
    if (!data) return;

    console.log(`[DataManager] 开始执行 DOM 数据全量逆向采集 (${currentLang})...`);

    // 1. Hero 字段
    const nameEl = document.getElementById("hero-name");
    const subEl = document.getElementById("hero-subtitle");
    const descEl = document.getElementById("hero-description");
    const badgeEl = document.getElementById("hero-badge-text");
    const locEl = document.getElementById("hero-location-text");
    const emailEl = document.getElementById("hero-email-link");
    const phoneEl = document.getElementById("hero-phone-link");

    if (nameEl && data.hero) data.hero.title = nameEl.innerText.trim();
    if (subEl && data.hero) data.hero.subtitle = subEl.innerText.trim();
    if (descEl && data.hero) data.hero.description = descEl.innerText.trim();
    if (badgeEl && data.hero) data.hero.badge = badgeEl.innerText.trim();
    if (locEl && data.hero) data.hero.location = locEl.innerText.trim();
    if (emailEl && data.hero) data.hero.email = emailEl.innerText.trim();
    if (phoneEl && data.hero) data.hero.phone = phoneEl.innerText.trim();

    // 2. About 字段
    const p1 = document.getElementById("about-p1");
    const p2 = document.getElementById("about-p2");
    const p3 = document.getElementById("about-p3");
    if (p1 && data.about) data.about.p1 = p1.innerText.trim();
    if (p2 && data.about) data.about.p2 = p2.innerText.trim();
    if (p3 && data.about) data.about.p3 = p3.innerText.trim();

    // 3. Stats 统计字段
    const statCards = document.querySelectorAll(".stat-card");
    if (statCards.length > 0 && data.stats) {
      statCards.forEach((card, idx) => {
        if (data.stats[idx]) {
          const num = card.querySelector(".stat-number");
          const lbl = card.querySelector(".stat-label");
          if (num) data.stats[idx].number = num.innerText.trim();
          if (lbl) data.stats[idx].label = lbl.innerText.trim();
        }
      });
    }

    // 4. Experience 工作与实习经历
    const timelineItems = document.querySelectorAll(".timeline-item");
    if (timelineItems.length > 0 && data.experience?.items) {
      timelineItems.forEach((itemEl, idx) => {
        if (data.experience.items[idx]) {
          const compEl = itemEl.querySelector(".timeline-company");
          const roleEl = itemEl.querySelector(".timeline-role");
          const periodEl = itemEl.querySelector(".timeline-period");
          const locEl = itemEl.querySelector(".timeline-location");
          const bulletEls = itemEl.querySelectorAll(".timeline-bullets li");

          if (compEl) {
            const deptSpan = compEl.querySelector(".timeline-dept");
            if (deptSpan) {
              const deptText = deptSpan.innerText.replace(/^·\s*/, '').trim();
              const cloneComp = compEl.cloneNode(true);
              const cloneDept = cloneComp.querySelector(".timeline-dept");
              if (cloneDept) cloneDept.remove();
              data.experience.items[idx].company = cloneComp.innerText.trim();
              data.experience.items[idx].department = deptText;
            } else {
              data.experience.items[idx].company = compEl.innerText.trim();
            }
          }
          if (roleEl) data.experience.items[idx].role = roleEl.innerText.trim();
          if (periodEl) data.experience.items[idx].period = periodEl.innerText.trim();
          if (locEl) data.experience.items[idx].location = locEl.innerText.trim();
          if (bulletEls.length > 0) {
            data.experience.items[idx].achievements = Array.from(bulletEls).map(b => b.innerText.trim());
          }
        }
      });
      console.log(`[DataManager] 已成功保存 ${timelineItems.length} 段工作经历与业绩要点`);
    }

    // 5. Education 教育背景
    const eduCards = document.querySelectorAll(".edu-card");
    if (eduCards.length > 0 && data.education?.items) {
      eduCards.forEach((card, idx) => {
        if (data.education.items[idx]) {
          const schoolEl = card.querySelector(".edu-school");
          const periodEl = card.querySelector(".edu-period");
          const degreeEl = card.querySelector(".edu-degree");
          const descEl = card.querySelector(".edu-desc");

          if (schoolEl) data.education.items[idx].school = schoolEl.innerText.trim();
          if (periodEl) data.education.items[idx].period = periodEl.innerText.trim();
          if (degreeEl) {
            const parts = degreeEl.innerText.split('·');
            data.education.items[idx].degree = parts[0]?.trim() || degreeEl.innerText.trim();
            if (parts[1]) data.education.items[idx].major = parts[1].trim();
          }
          if (descEl) data.education.items[idx].description = descEl.innerText.trim();
        }
      });
      console.log(`[DataManager] 已成功保存 ${eduCards.length} 段教育背景`);
    }

    // 6. Research 论文与专利
    if (data.research) {
      const paperItems = document.querySelectorAll(".research-item");
      if (paperItems.length > 0 && data.research.papers) {
        paperItems.forEach((pEl, idx) => {
          if (data.research.papers[idx]) {
            const titleEl = pEl.querySelector(".research-item-title");
            const authEl = pEl.querySelector(".research-authors");
            const highEl = pEl.querySelector(".research-highlights");
            if (titleEl) data.research.papers[idx].title = titleEl.innerText.trim();
            if (authEl) data.research.papers[idx].authors = authEl.innerText.trim();
            if (highEl) data.research.papers[idx].highlights = highEl.innerText.trim();
          }
        });
      }

      const patentItems = document.querySelectorAll(".patent-item");
      if (patentItems.length > 0 && data.research.patents) {
        patentItems.forEach((ptEl, idx) => {
          if (data.research.patents[idx]) {
            const nameEl = ptEl.querySelector(".patent-name");
            const badgeEl = ptEl.querySelector(".badge");
            const ownerEl = ptEl.querySelector(".patent-owner");
            const descEl = ptEl.querySelector(".patent-desc");

            if (nameEl) data.research.patents[idx].name = nameEl.innerText.trim();
            if (badgeEl) data.research.patents[idx].patentNo = badgeEl.innerText.trim();
            if (ownerEl) data.research.patents[idx].owner = ownerEl.innerText.trim();
            if (descEl) data.research.patents[idx].desc = descEl.innerText.trim();
          }
        });
        console.log(`[DataManager] 已成功保存 ${patentItems.length} 项专利（含专利号）`);
      }
    }

    // 7. Projects 核心项目
    const projectCards = document.querySelectorAll(".project-card");
    if (projectCards.length > 0 && data.projects?.list) {
      projectCards.forEach((card, idx) => {
        if (data.projects.list[idx]) {
          const tEl = card.querySelector(".project-title");
          const tagEl = card.querySelector(".project-tagline");
          if (tEl) data.projects.list[idx].title = tEl.innerText.trim();
          if (tagEl) data.projects.list[idx].tagline = tagEl.innerText.trim();
        }
      });
      console.log(`[DataManager] 已成功保存 ${projectCards.length} 项核心项目`);
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(window.RESUME_DATA));
    console.log("[DataManager] 当前界面编辑数据已全量保存至 localStorage！");
  }

  // 3. 数据管理弹窗控制
  window.openDataManageModal = function () {
    const modal = document.getElementById("data-manage-modal");
    if (!modal) return;

    const textarea = document.getElementById("data-json-textarea");
    if (textarea) {
      textarea.value = JSON.stringify(window.RESUME_DATA, null, 2);
    }
    modal.classList.add("active");
  };

  window.closeDataManageModal = function () {
    const modal = document.getElementById("data-manage-modal");
    if (modal) modal.classList.remove("active");
  };

  // 4. 上传本地 JSON 文件
  window.handleLocalJsonUpload = function (event) {
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
      // 将实习经历也保留在首位
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
    if (window.renderAll) window.renderAll();
    if (window.renderAll) {
      console.log("[DataManager] 触发 window.renderAll() 重新渲染整页视图");
      window.renderAll();
    }
  }

  // 5. 应用文本框中的 JSON
  window.applyTextareaJson = function () {
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
    if (!confirm("确定要清除本地编辑，重置为系统初始规范数据吗？")) return;
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  };

  // 7. 导出并下载当前 JSON
  window.exportCurrentJsonData = function () {
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

