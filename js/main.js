/**
 * Main Application Logic
 * Dynamic rendering, interaction binding, project filtering, and logging.
 */

(function () {
  let activeProjectFilter = "all";

  // Core Render Functions
    // Core Render Functions
  function renderAll() {
    const data = window.getCurrentData();
    const currentLang = window.getCurrentLang();
    console.log(`[MainApp] Rendering full application. Current Language: ${currentLang}`);

    if (!data) {
      console.error("[MainApp] Unable to load resume data.");
      return;
    }

    // 打印关键渲染变量 (符合开发规范)
    console.log("[MainApp] 待渲染工作经历数:", data.experience?.items?.length, data.experience?.items?.map(i => i.company));
    console.log("[MainApp] 待渲染教育背景数:", data.education?.items?.length, data.education?.items?.map(i => i.degree));
    console.log("[MainApp] 待渲染专利成果数:", data.research?.patents?.length, data.research?.patents?.map(p => `${p.name} (${p.patentNo})`));

    renderNav(data.nav);
    renderHero(data.hero);
    renderStats(data.stats);
    renderAbout(data.about);
    renderSkills(data.skills);
    renderExperience(data.experience);
    renderEducation(data.education);
    renderResearch(data.research);
    renderProjects(data.projects);
    renderFooter(data.footer);

    console.log("[MainApp] Render completed successfully.");
  }

  // 挂载至全局 window，供数据管理器 (data-manager.js) 动态触发重绘
  window.renderAll = renderAll;

  function renderNav(nav) {
    const navMap = {
      "nav-link-about": nav.about,
      "nav-link-experience": nav.experience,
      "nav-link-skills": nav.skills,
      "nav-link-projects": nav.projects,
      "nav-link-research": nav.research,
      "nav-link-print": nav.resume
    };

    for (const [id, text] of Object.entries(navMap)) {
      const el = document.getElementById(id);
      if (el) el.textContent = text;
    }
  }

  function renderHero(hero) {
    document.getElementById("hero-badge-text").textContent = hero.badge;
    document.getElementById("hero-name").textContent = hero.title;
    document.getElementById("hero-subtitle").textContent = hero.subtitle;
    document.getElementById("hero-description").textContent = hero.description;

    document.getElementById("hero-location-text").textContent = hero.location;
    document.getElementById("hero-email-link").textContent = hero.email;
    document.getElementById("hero-email-link").setAttribute("href", `mailto:${hero.email}`);
    document.getElementById("hero-phone-link").textContent = hero.phone;
    document.getElementById("hero-phone-link").setAttribute("href", `tel:${hero.phone.replace(/\s+/g, "")}`);

    const printBtn = document.getElementById("hero-print-btn");
    if (printBtn) printBtn.textContent = hero.downloadPdf;

    const projBtn = document.getElementById("hero-projects-btn");
    if (projBtn) projBtn.textContent = hero.viewProjects;
  }

  function renderStats(stats) {
    const container = document.getElementById("stats-grid");
    if (!container) return;

    container.innerHTML = stats
      .map(
        (s) => `
        <div class="stat-card">
          <div class="stat-number gradient-text">${s.number}</div>
          <div class="stat-label">${s.label}</div>
        </div>
      `
      )
      .join("");
  }

  function renderAbout(about) {
    document.getElementById("about-title").textContent = about.title;
    document.getElementById("about-subtitle").textContent = about.subtitle;
    document.getElementById("about-p1").textContent = about.p1;
    document.getElementById("about-p2").textContent = about.p2;
    document.getElementById("about-p3").textContent = about.p3;
  }

  function renderSkills(skills) {
    document.getElementById("skills-title").textContent = skills.title;
    document.getElementById("skills-subtitle").textContent = skills.subtitle;

    const container = document.getElementById("skills-categories-grid");
    if (!container) return;

    container.innerHTML = skills.categories
      .map(
        (cat) => `
        <div class="glass-card skill-cat-card">
          <h3 class="skill-cat-title">${cat.name}</h3>
          <div class="skill-list">
            ${cat.skills
              .map(
                (sk) => `
              <div class="skill-item">
                <div class="skill-name">${sk.name}</div>
                <div class="skill-desc">${sk.level}</div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");
  }

  function renderExperience(exp) {
    document.getElementById("exp-title").textContent = exp.title;
    document.getElementById("exp-subtitle").textContent = exp.subtitle;

    const container = document.getElementById("exp-timeline");
    if (!container) return;

    container.innerHTML = exp.items
      .map(
        (item) => `
        <div class="timeline-item">
          <div class="timeline-marker"></div>
          <div class="timeline-content glass-card">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-company">${item.company} <span class="timeline-dept">· ${item.department}</span></h3>
                <div class="timeline-role">${item.role}</div>
              </div>
              <div class="timeline-meta">
                <span class="timeline-period">${item.period}</span>
                <span class="timeline-location">${item.location}</span>
              </div>
            </div>
            <ul class="timeline-bullets">
              ${item.achievements.map((ach) => `<li>${ach}</li>`).join("")}
            </ul>
          </div>
        </div>
      `
      )
      .join("");
  }

  function renderEducation(edu) {
    document.getElementById("edu-title").textContent = edu.title;
    document.getElementById("edu-subtitle").textContent = edu.subtitle;

    const container = document.getElementById("edu-grid");
    if (!container) return;

    container.innerHTML = edu.items
      .map(
        (item) => `
        <div class="glass-card edu-card">
          <div class="edu-header">
            <h3 class="edu-school">${item.school}</h3>
            <span class="edu-period">${item.period}</span>
          </div>
          <div class="edu-degree">${item.degree} · ${item.major}</div>
          <p class="edu-desc">${item.description}</p>
        </div>
      `
      )
      .join("");
  }

  function renderResearch(res) {
    document.getElementById("research-title").textContent = res.title;
    document.getElementById("research-subtitle").textContent = res.subtitle;
    document.getElementById("papers-header-title").textContent = res.papersTitle;
    document.getElementById("patents-header-title").textContent = res.patentsTitle;

    const papersContainer = document.getElementById("papers-list");
    if (papersContainer) {
      papersContainer.innerHTML = res.papers
        .map(
          (p) => `
          <div class="glass-card research-item">
            <div class="research-item-top">
              <span class="research-badge">${p.type}</span>
              <span class="research-venue">${p.venue}</span>
            </div>
            <h4 class="research-item-title">${p.title}</h4>
            <div class="research-authors">${p.authors}</div>
            <p class="research-highlights">${p.highlights}</p>
          </div>
        `
        )
        .join("");
    }

    const patentsContainer = document.getElementById("patents-list");
    if (patentsContainer) {
      patentsContainer.innerHTML = res.patents
        .map(
          (pt) => `
          <div class="glass-card patent-item">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; margin-bottom: 6px; flex-wrap: wrap;">
              <h4 class="patent-name" style="margin: 0;">${pt.name}</h4>
              ${pt.patentNo ? `<span class="badge" style="color: var(--accent-cyan); font-family: var(--font-mono); font-size: 0.8rem; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); padding: 2px 8px; border-radius: 4px;">${pt.patentNo}</span>` : ''}
            </div>
            <div class="patent-owner">${pt.owner}</div>
            <p class="patent-desc">${pt.desc}</p>
          </div>
        `
        )
        .join("");
    }
  }

  function renderProjects(proj) {
    document.getElementById("projects-title").textContent = proj.title;
    document.getElementById("projects-subtitle").textContent = proj.subtitle;

    // Filter Buttons labels
    document.getElementById("filter-btn-all").textContent = proj.filterAll;
    document.getElementById("filter-btn-llm").textContent = proj.filterLlm;
    document.getElementById("filter-btn-kg").textContent = proj.filterKg;
    document.getElementById("filter-btn-quant").textContent = proj.filterQuant;

    const container = document.getElementById("projects-grid");
    if (!container) return;

    // Filter projects based on active filter
    const filteredProjects =
      activeProjectFilter === "all"
        ? proj.list
        : proj.list.filter((p) => p.category === activeProjectFilter);

    console.log(`[MainApp] Rendering ${filteredProjects.length} projects for filter: '${activeProjectFilter}'`);

    container.innerHTML = filteredProjects
      .map(
        (item) => `
        <div class="glass-card project-card" data-category="${item.category}" onclick="window.openProjectModal('${item.id}')">
          ${
            item.gallery && item.gallery.length > 0
              ? `
            <div class="project-card-cover-wrapper">
              <img src="${item.gallery[0].src}" alt="${item.gallery[0].title}" loading="lazy" class="project-card-cover">
              <span class="cover-badge">📸 ${item.gallery.length} 张实盘截图</span>
            </div>
          `
              : `
            <div class="project-card-arch-preview">
              <div class="arch-preview-header">
                <span class="arch-tag">📐 6 阶架构流</span>
                <span class="arch-tag-sub">Summary-First / Fallback</span>
              </div>
              <div class="arch-preview-steps">
                ${item.architecture.flowSteps.slice(0, 3).map((s) => `<span class="arch-mini-pill">${s.stage}</span>`).join(" ➔ ")}
              </div>
            </div>
          `
          }

          <div class="project-top">
            <span class="project-badge">${item.badge}</span>
            <div class="project-category-indicator">${item.category.toUpperCase()}</div>
          </div>
          <h3 class="project-title">${item.title}</h3>
          <p class="project-tagline">${item.tagline}</p>
          
          <div class="project-metrics-row">
            ${item.metrics
              .map(
                (m) => `
              <div class="project-metric-col">
                <span class="p-metric-val">${m.value}</span>
                <span class="p-metric-lbl">${m.label}</span>
              </div>
            `
              )
              .join("")}
          </div>

          <p class="project-summary">${item.summary}</p>

          <div class="project-techs-wrap">
            ${item.techs.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>

          <div class="project-footer">
            <button class="btn btn-outline btn-sm" onclick="event.stopPropagation(); window.openProjectModal('${item.id}')">
              <span>${proj.viewDetailBtn}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </div>
      `
      )
      .join("");
  }

  function renderFooter(footer) {
    document.getElementById("footer-copyright").textContent = footer.copyright;
    document.getElementById("footer-quote").textContent = footer.quote;
    const topBtn = document.getElementById("footer-back-to-top");
    if (topBtn) topBtn.textContent = footer.backToTop;
  }

  // Setup Project Category Filters
  function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const filter = btn.getAttribute("data-filter");
        if (filter === activeProjectFilter) return;

        console.log(`[MainApp] Switching project category filter: ${activeProjectFilter} -> ${filter}`);
        activeProjectFilter = filter;

        buttons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const data = window.getCurrentData();
        if (data) renderProjects(data.projects);
      });
    });
  }

  // Smooth scroll and active navbar spy
  function setupNavSpy() {
    const navLinks = document.querySelectorAll(".nav-link[href^='#']");
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        const targetId = link.getAttribute("href");
        if (!targetId || targetId === "#") return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
          closeMobileNav();
        }
      });
    });
  }

  // Mobile navigation drawer toggle
  function setupMobileNav() {
    const toggleBtn = document.getElementById("mobile-menu-btn");
    const navLinksList = document.getElementById("nav-links-list");
    if (toggleBtn && navLinksList) {
      toggleBtn.addEventListener("click", () => {
        navLinksList.classList.toggle("open");
      });
    }
  }

  function closeMobileNav() {
    const navLinksList = document.getElementById("nav-links-list");
    if (navLinksList) navLinksList.classList.remove("open");
  }

  // Print button handlers
  function setupPrintTriggers() {
    const triggers = ["hero-print-btn", "nav-link-print", "print-direct-btn"];
    triggers.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("[MainApp] Triggering print dialog (Ctrl+P / PDF Export).");
          window.print();
        });
      }
    });
  }

  // Global listener for language switch
  window.addEventListener("languageChanged", (e) => {
    console.log(`[MainApp] Received languageChanged event: ${e.detail.lang}`);
    renderAll();
  });

  // Lifecycle boot
  document.addEventListener("DOMContentLoaded", () => {
    console.log("[MainApp] DOM fully loaded, starting initialization...");
    renderAll();
    setupFilters();
    setupNavSpy();
    setupMobileNav();
    setupPrintTriggers();

    // Back to top button
    const backToTopBtn = document.getElementById("footer-back-to-top");
    if (backToTopBtn) {
      backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  });
})();

