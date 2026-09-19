/**
 * Structured Resume Editor (resume-editor.js)
 * 1. 彻底解决在原生 DOM 上 contenteditable 误删内部标签导致的排版塌陷问题
 * 2. 提供分模块（基本信息、工作经历、教育背景、发明专利、核心项目）的结构化表单编辑
 * 3. 严格受 AuthManager 权限守卫保护，保存后即时持久化并全局无缝重绘
 */

(function () {
  let activeTab = "experience";

  console.log("[ResumeEditor] 正在初始化结构化简历编辑器...");

  // 1. 打开简历编辑器（鉴权守卫）
  window.openResumeEditor = function () {
    if (!window.AuthManager || !window.AuthManager.isLoggedIn()) {
      console.log("[ResumeEditor] 未登录管理员，拦截并引导身份验证");
      window.AuthManager.openAuthModal(() => {
        openResumeEditorModal();
      });
      return;
    }
    openResumeEditorModal();
  };

  function openResumeEditorModal() {
    const modal = document.getElementById("resume-editor-modal");
    if (!modal) return;

    renderEditorTab(activeTab);
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  // 2. 关闭简历编辑器
  window.closeResumeEditor = function () {
    const modal = document.getElementById("resume-editor-modal");
    if (modal) modal.classList.remove("active");
    document.body.style.overflow = "";
  };

  // 3. 切换编辑器 Tab
  window.switchEditorTab = function (tabName) {
    activeTab = tabName;
    const tabBtns = document.querySelectorAll(".editor-tab-btn");
    tabBtns.forEach(btn => {
      if (btn.dataset.tab === tabName) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    renderEditorTab(tabName);
  };

  // 4. 渲染当前 Tab 的编辑表单
  function renderEditorTab(tabName) {
    const container = document.getElementById("editor-tab-content");
    if (!container) return;

    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    const data = window.RESUME_DATA ? window.RESUME_DATA[currentLang] : null;
    if (!data) {
      container.innerHTML = `<div style="color:red;">未找到当前简历数据源！</div>`;
      return;
    }

    if (tabName === "basic") {
      renderBasicForm(container, data);
    } else if (tabName === "experience") {
      renderExperienceForm(container, data);
    } else if (tabName === "education") {
      renderEducationForm(container, data);
    } else if (tabName === "research") {
      renderResearchForm(container, data);
    } else if (tabName === "projects") {
      renderProjectsForm(container, data);
    }
  }

  // --- Tab 1: 基本信息表单 ---
  function renderBasicForm(container, data) {
    const h = data.hero || {};
    const a = data.about || {};
    container.innerHTML = `
      <div class="editor-section">
        <h3 class="editor-section-title">📌 核心名片与个人简介</h3>
        <div class="editor-form-grid">
          <div class="form-group">
            <label>姓名与称谓</label>
            <input type="text" id="edit-hero-title" class="form-control" value="${h.title || ''}">
          </div>
          <div class="form-group">
            <label>求职意向徽章</label>
            <input type="text" id="edit-hero-badge" class="form-control" value="${h.badge || ''}">
          </div>
          <div class="form-group full-width">
            <label>专业定位副标题 (Subtitle)</label>
            <input type="text" id="edit-hero-subtitle" class="form-control" value="${h.subtitle || ''}">
          </div>
          <div class="form-group full-width">
            <label>个人一句话总结与核心优势</label>
            <textarea id="edit-hero-desc" class="form-control" rows="3">${h.description || ''}</textarea>
          </div>
          <div class="form-group">
            <label>联系邮箱</label>
            <input type="text" id="edit-hero-email" class="form-control" value="${h.email || ''}">
          </div>
          <div class="form-group">
            <label>联系电话</label>
            <input type="text" id="edit-hero-phone" class="form-control" value="${h.phone || ''}">
          </div>
          <div class="form-group full-width">
            <label>常驻地点 / 院校</label>
            <input type="text" id="edit-hero-location" class="form-control" value="${h.location || ''}">
          </div>
        </div>

        <h3 class="editor-section-title" style="margin-top: 24px;">📝 关于我 (背景与追求三段论)</h3>
        <div class="form-group full-width">
          <label>段落 1: 学术训练与背景</label>
          <textarea id="edit-about-p1" class="form-control" rows="3">${a.p1 || ''}</textarea>
        </div>
        <div class="form-group full-width">
          <label>段落 2: 大厂实习与工业级落地</label>
          <textarea id="edit-about-p2" class="form-control" rows="3">${a.p2 || ''}</textarea>
        </div>
        <div class="form-group full-width">
          <label>段落 3: 架构追求与系统沉淀</label>
          <textarea id="edit-about-p3" class="form-control" rows="3">${a.p3 || ''}</textarea>
        </div>
      </div>
    `;
  }

  // --- Tab 2: 工作与实习经历表单 ---
  function renderExperienceForm(container, data) {
    const items = data.experience?.items || [];
    let html = `
      <div class="editor-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 class="editor-section-title" style="margin: 0;">💼 工作与实习经历 (共 ${items.length} 段)</h3>
          <button class="btn btn-outline btn-sm" onclick="window.addExperienceItem()">+ 添加新经历</button>
        </div>
        <div id="exp-items-wrapper">
    `;

    items.forEach((item, idx) => {
      const bulletsText = (item.achievements || []).join('\n');
      html += `
        <div class="editor-card" data-index="${idx}">
          <div class="editor-card-header">
            <span class="editor-card-badge">第 ${idx + 1} 段经历</span>
            <button class="btn-delete-item" onclick="window.removeExperienceItem(${idx})">🗑️ 删除本条</button>
          </div>
          <div class="editor-form-grid">
            <div class="form-group">
              <label>公司名称</label>
              <input type="text" class="form-control exp-company" value="${item.company || ''}">
            </div>
            <div class="form-group">
              <label>所属部门 / 小组</label>
              <input type="text" class="form-control exp-dept" value="${item.department || ''}">
            </div>
            <div class="form-group">
              <label>担任职位</label>
              <input type="text" class="form-control exp-role" value="${item.role || ''}">
            </div>
            <div class="form-group">
              <label>任职时间周期</label>
              <input type="text" class="form-control exp-period" value="${item.period || ''}">
            </div>
            <div class="form-group">
              <label>工作地点</label>
              <input type="text" class="form-control exp-location" value="${item.location || ''}">
            </div>
            <div class="form-group">
              <label>核心技术栈</label>
              <input type="text" class="form-control exp-stack" value="${item.techStack || ''}">
            </div>
            <div class="form-group full-width">
              <label>工作成果与业绩要点 (每行一段，自动转为项目列表，绝不搞乱格式)</label>
              <textarea class="form-control exp-bullets" rows="4">${bulletsText}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  window.addExperienceItem = function () {
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    if (!window.RESUME_DATA[currentLang].experience.items) {
      window.RESUME_DATA[currentLang].experience.items = [];
    }
    window.RESUME_DATA[currentLang].experience.items.push({
      company: "新公司名称",
      department: "研发部",
      role: "AI算法开发",
      period: "2025.01 — 至今",
      location: "北京",
      techStack: "Python / PyTorch",
      achievements: ["主要工作与成果阐述第 1 条", "主要工作与成果阐述第 2 条"]
    });
    renderEditorTab("experience");
  };

  window.removeExperienceItem = function (idx) {
    if (!confirm(`确定要删除第 ${idx + 1} 段工作经历吗？`)) return;
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    window.RESUME_DATA[currentLang].experience.items.splice(idx, 1);
    renderEditorTab("experience");
  };

  // --- Tab 3: 教育背景表单 ---
  function renderEducationForm(container, data) {
    const items = data.education?.items || [];
    let html = `
      <div class="editor-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 class="editor-section-title" style="margin: 0;">🎓 教育背景 (共 ${items.length} 段)</h3>
          <button class="btn btn-outline btn-sm" onclick="window.addEducationItem()">+ 添加教育经历</button>
        </div>
        <div id="edu-items-wrapper">
    `;

    items.forEach((item, idx) => {
      html += `
        <div class="editor-card" data-index="${idx}">
          <div class="editor-card-header">
            <span class="editor-card-badge">阶段 ${idx + 1}</span>
            <button class="btn-delete-item" onclick="window.removeEducationItem(${idx})">🗑️ 删除</button>
          </div>
          <div class="editor-form-grid">
            <div class="form-group">
              <label>学校名称</label>
              <input type="text" class="form-control edu-school" value="${item.school || ''}">
            </div>
            <div class="form-group">
              <label>学历层次 (如: 硕士研究生 / 博士研究生 / 本科)</label>
              <input type="text" class="form-control edu-degree" value="${item.degree || ''}">
            </div>
            <div class="form-group">
              <label>专业方向</label>
              <input type="text" class="form-control edu-major" value="${item.major || ''}">
            </div>
            <div class="form-group">
              <label>就读时间段</label>
              <input type="text" class="form-control edu-period" value="${item.period || ''}">
            </div>
            <div class="form-group full-width">
              <label>阶段说明 / 学术培养重点</label>
              <textarea class="form-control edu-desc" rows="2">${item.description || ''}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div></div>`;
    container.innerHTML = html;
  }

  window.addEducationItem = function () {
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    window.RESUME_DATA[currentLang].education.items.push({
      school: "北京科技大学 (USTB)",
      degree: "工学硕士",
      major: "计算机科学与技术",
      period: "2026.09 — 至今",
      description: "主攻大模型与分布式系统研发"
    });
    renderEditorTab("education");
  };

  window.removeEducationItem = function (idx) {
    if (!confirm(`确定要删除该教育阶段吗？`)) return;
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    window.RESUME_DATA[currentLang].education.items.splice(idx, 1);
    renderEditorTab("education");
  };

  // --- Tab 4: 科研与发明专利表单 ---
  function renderResearchForm(container, data) {
    const patents = data.research?.patents || [];
    const papers = data.research?.papers || [];

    let html = `
      <div class="editor-section">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
          <h3 class="editor-section-title" style="margin: 0;">💡 国家发明专利 (共 ${patents.length} 项，专利号显式高亮)</h3>
          <button class="btn btn-outline btn-sm" onclick="window.addPatentItem()">+ 添加新专利</button>
        </div>
    `;

    patents.forEach((pt, idx) => {
      html += `
        <div class="editor-card" data-index="${idx}">
          <div class="editor-card-header">
            <span class="editor-card-badge">专利 ${idx + 1}</span>
            <button class="btn-delete-item" onclick="window.removePatentItem(${idx})">🗑️ 删除</button>
          </div>
          <div class="editor-form-grid">
            <div class="form-group" style="grid-column: span 2;">
              <label>专利名称</label>
              <input type="text" class="form-control pat-name" value="${pt.name || ''}">
            </div>
            <div class="form-group">
              <label>国家发明专利号 (Registration No.)</label>
              <input type="text" class="form-control pat-no" style="color: var(--accent-cyan); font-weight: 700; font-family: monospace;" value="${pt.patentNo || ''}" placeholder="例如: CN116740790B">
            </div>
            <div class="form-group">
              <label>专利发明人与授权状态</label>
              <input type="text" class="form-control pat-owner" value="${pt.owner || ''}">
            </div>
            <div class="form-group full-width">
              <label>专利核心发明要点描述</label>
              <textarea class="form-control pat-desc" rows="2">${pt.desc || ''}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    html += `
        <h3 class="editor-section-title" style="margin-top: 28px; margin-bottom: 16px;">📚 学术代表作与论文 (共 ${papers.length} 篇)</h3>
    `;

    papers.forEach((p, idx) => {
      html += `
        <div class="editor-card">
          <div class="editor-form-grid">
            <div class="form-group" style="grid-column: span 2;">
              <label>论文标题</label>
              <input type="text" class="form-control paper-title" value="${p.title || ''}">
            </div>
            <div class="form-group">
              <label>级别与类别 (如: CCF-A / SCI)</label>
              <input type="text" class="form-control paper-type" value="${p.type || ''}">
            </div>
            <div class="form-group full-width">
              <label>作者列表</label>
              <input type="text" class="form-control paper-authors" value="${p.authors || ''}">
            </div>
            <div class="form-group full-width">
              <label>发表期刊/会议 (Venue)</label>
              <input type="text" class="form-control paper-venue" value="${p.venue || ''}">
            </div>
            <div class="form-group full-width">
              <label>核心技术创新点与贡献</label>
              <textarea class="form-control paper-highlights" rows="2">${p.highlights || ''}</textarea>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  window.addPatentItem = function () {
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    window.RESUME_DATA[currentLang].research.patents.push({
      name: "《一种新发明方法及系统》",
      patentNo: "CN100000000A",
      owner: "李凯 等 (国家发明专利)",
      desc: "核心算法与系统架构发明专利。"
    });
    renderEditorTab("research");
  };

  window.removePatentItem = function (idx) {
    if (!confirm(`确定要删除该专利吗？`)) return;
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    window.RESUME_DATA[currentLang].research.patents.splice(idx, 1);
    renderEditorTab("research");
  };

  // --- Tab 5: 核心项目表单 ---
  function renderProjectsForm(container, data) {
    const list = data.projects?.list || [];
    let html = `
      <div class="editor-section">
        <h3 class="editor-section-title">🚀 核心系统项目 (共 ${list.length} 个)</h3>
    `;

    list.forEach((proj, idx) => {
      html += `
        <div class="editor-card" data-index="${idx}">
          <div class="editor-card-header">
            <span class="editor-card-badge">${proj.title}</span>
            <span style="font-size: 12px; color: var(--accent-cyan);">${proj.category}</span>
          </div>
          <div class="editor-form-grid">
            <div class="form-group">
              <label>项目名称</label>
              <input type="text" class="form-control proj-title" value="${proj.title || ''}">
            </div>
            <div class="form-group">
              <label>项目标签徽章 (Badge)</label>
              <input type="text" class="form-control proj-badge" value="${proj.badge || ''}">
            </div>
            <div class="form-group full-width">
              <label>架构一句话定位 (Tagline)</label>
              <input type="text" class="form-control proj-tagline" value="${proj.tagline || ''}">
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
    container.innerHTML = html;
  }

  // 5. 保存全部表单数据并持久化
  window.saveResumeEditorData = function () {
    console.log("[ResumeEditor] 正在收集表单编辑数据并同步...");
    const currentLang = window.getCurrentLang ? window.getCurrentLang() : "zh";
    const data = window.RESUME_DATA[currentLang];
    if (!data) return;

    // 1. 如果在 basic tab
    const heroTitle = document.getElementById("edit-hero-title");
    if (heroTitle) {
      data.hero.title = heroTitle.value.trim();
      data.hero.badge = document.getElementById("edit-hero-badge").value.trim();
      data.hero.subtitle = document.getElementById("edit-hero-subtitle").value.trim();
      data.hero.description = document.getElementById("edit-hero-desc").value.trim();
      data.hero.email = document.getElementById("edit-hero-email").value.trim();
      data.hero.phone = document.getElementById("edit-hero-phone").value.trim();
      data.hero.location = document.getElementById("edit-hero-location").value.trim();

      data.about.p1 = document.getElementById("edit-about-p1").value.trim();
      data.about.p2 = document.getElementById("edit-about-p2").value.trim();
      data.about.p3 = document.getElementById("edit-about-p3").value.trim();
    }

    // 2. 如果在 experience tab
    const expCards = document.querySelectorAll("#exp-items-wrapper .editor-card");
    if (expCards.length > 0) {
      const newItems = [];
      expCards.forEach(card => {
        const bulletsRaw = card.querySelector(".exp-bullets").value;
        const bullets = bulletsRaw.split('\n').map(b => b.trim()).filter(Boolean);
        newItems.push({
          company: card.querySelector(".exp-company").value.trim(),
          department: card.querySelector(".exp-dept").value.trim(),
          role: card.querySelector(".exp-role").value.trim(),
          period: card.querySelector(".exp-period").value.trim(),
          location: card.querySelector(".exp-location").value.trim(),
          techStack: card.querySelector(".exp-stack").value.trim(),
          achievements: bullets
        });
      });
      data.experience.items = newItems;
      console.log(`[ResumeEditor] 已同步 ${newItems.length} 段工作经历`);
    }

    // 3. 如果在 education tab
    const eduCards = document.querySelectorAll("#edu-items-wrapper .editor-card");
    if (eduCards.length > 0) {
      const newEdu = [];
      eduCards.forEach(card => {
        newEdu.push({
          school: card.querySelector(".edu-school").value.trim(),
          degree: card.querySelector(".edu-degree").value.trim(),
          major: card.querySelector(".edu-major").value.trim(),
          period: card.querySelector(".edu-period").value.trim(),
          description: card.querySelector(".edu-desc").value.trim()
        });
      });
      data.education.items = newEdu;
      console.log(`[ResumeEditor] 已同步 ${newEdu.length} 段教育背景`);
    }

    // 4. 如果在 research tab
    const patCards = document.querySelectorAll(".pat-name");
    if (patCards.length > 0) {
      const newPatents = [];
      const parentCards = document.querySelectorAll(".pat-name");
      parentCards.forEach(nameInput => {
        const card = nameInput.closest(".editor-card");
        if (card) {
          newPatents.push({
            name: card.querySelector(".pat-name").value.trim(),
            patentNo: card.querySelector(".pat-no").value.trim(),
            owner: card.querySelector(".pat-owner").value.trim(),
            desc: card.querySelector(".pat-desc").value.trim()
          });
        }
      });
      data.research.patents = newPatents;
      console.log(`[ResumeEditor] 已同步 ${newPatents.length} 项国家专利`);
    }

    // 5. 如果在 projects tab
    const projCards = document.querySelectorAll(".proj-title");
    if (projCards.length > 0) {
      projCards.forEach((titleInput, idx) => {
        const card = titleInput.closest(".editor-card");
        if (card && data.projects.list[idx]) {
          data.projects.list[idx].title = card.querySelector(".proj-title").value.trim();
          data.projects.list[idx].badge = card.querySelector(".proj-badge").value.trim();
          data.projects.list[idx].tagline = card.querySelector(".proj-tagline").value.trim();
        }
      });
    }

    // 持久化存储
    // 持久化存储至当前浏览器
    localStorage.setItem("SELF_WEBSITE_CUSTOM_DATA", JSON.stringify(window.RESUME_DATA));
    console.log("[ResumeEditor] 数据已成功持久化至 localStorage！");
    console.log("[ResumeEditor] 数据已成功更新至当前浏览器内存与 localStorage！");

    // 全站重新渲染
    if (window.renderAll) {
      window.renderAll();
    }

    window.closeResumeEditor();
    if (window.AuthManager) {
      alert("🎉 简历修改已成功保存并立即生效！");

    // 检查是否在本地开发服务环境下运行 (通过 serve.py 提供 API 支持)
    const isLocalServer = typeof window !== 'undefined' && window.location && ["localhost", "127.0.0.1"].includes(window.location.hostname);
    console.log("[ResumeEditor] 当前运行环境检测: isLocalServer =", isLocalServer, "hostname =", (typeof window !== 'undefined' && window.location ? window.location.hostname : 'node'));

    if (isLocalServer && typeof fetch !== 'undefined') {
      // 异步向本地后台服务发送物理落盘请求
      fetch("/api/save-data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(window.RESUME_DATA)
      })
        .then(res => res.json())
        .then(result => {
          console.log("[ResumeEditor] 后端物理落盘结果:", result);
          if (result && result.success) {
            const wantPublish = confirm(
              "🎉 简历修改已成功保存并【物理写入本地源文件 js/data.js】！\n\n" +
              "💡 提示：为了让全网其他人访问时也能立即看到您的最新内容，是否现在【一键推送到 GitHub 远端】？\n\n" +
              "点击【确定】立即推送到 GitHub 触发全网自动更新；\n点击【取消】仅在本地保留最新修改。"
            );
            if (wantPublish) {
              console.log("[ResumeEditor] 用户触发一键推送到 GitHub 远端流程...");
              fetch("/api/publish-github", { method: "POST" })
                .then(r => r.json())
                .then(pushRes => {
                  console.log("[ResumeEditor] Git 推送结果:", pushRes);
                  if (pushRes && pushRes.success) {
                    alert("🚀 恭喜！最新修改已成功推送到 GitHub 远端仓库！\n\nGitHub Pages 将在数十秒内自动完成构建，全网所有人打开即可见最新简历！");
                  } else {
                    alert("⚠️ 提交成功，但推送到远端时遇到提示：\n" + (pushRes.log || pushRes.error || "未知异常") + "\n请您稍后在本地终端手动运行 git push。");
                  }
                })
                .catch(err => {
                  console.error("[ResumeEditor] Git 发布请求失败:", err);
                  alert("⚠️ 推送请求失败，但本地源文件 js/data.js 已成功保存！您可随时在终端执行 git push 提交。");
                });
            }
          } else {
            alert("⚠️ 网页已生效，但写入本地源文件时遇到提示：" + (result.error || "未知错误"));
          }
        })
        .catch(err => {
          console.warn("[ResumeEditor] 本地后台服务连接异常 (可能未通过 serve.py 启动):", err);
          alert("🎉 简历修改已在当前浏览器生效！\n(提示：若需全网生效，请在终端运行 python scripts/serve.py 后编辑，或在【数据管理】中导出数据更新本地文件)");
        });
    } else {
      // 线上纯静态环境 (如 GitHub Pages 访问) 或非浏览器测试环境
      if (typeof alert !== 'undefined') {
        alert(
          "🎉 简历修改已在当前浏览器即时生效！\n\n" +
          "💡 提示：当前处于线上纯静态托管环境。若要让【全网所有其他人】都能看到您的最新修改，推荐在本地运行 python scripts/serve.py 进行一键全网发布，或在【数据管理】中导出数据同步到仓库。"
        );
      }
    }
  };
})();
