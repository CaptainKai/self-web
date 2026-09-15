/**
 * Projects Deep-Dive Modal Controller
 * Displays architectural breakdowns, benchmarks, and problem-solution pairs.
 * Projects Deep-Dive Modal & Image Lightbox Controller
 * Displays architectural breakdowns, dataflow steps, benchmarks, and production screenshots.
 */

(function () {
  let activeProjectId = null;

  function getModalElements() {
    return {
      overlay: document.getElementById("project-modal-overlay"),
      container: document.getElementById("project-modal-container"),
      title: document.getElementById("modal-project-title"),
      badge: document.getElementById("modal-project-badge"),
      tagline: document.getElementById("modal-project-tagline"),
      techs: document.getElementById("modal-project-techs"),
      metrics: document.getElementById("modal-project-metrics"),
      
      // Architecture section
      archContainer: document.getElementById("modal-project-arch-box"),
      archTitle: document.getElementById("modal-arch-title"),
      archSummary: document.getElementById("modal-project-arch-summary"),
      archFlow: document.getElementById("modal-project-arch-flow"),
      archHighlights: document.getElementById("modal-project-arch-highlights"),

      // Gallery section
      galleryContainer: document.getElementById("modal-project-gallery-box"),
      galleryTitle: document.getElementById("modal-gallery-title"),
      galleryGrid: document.getElementById("modal-project-gallery-grid"),

      // Problem / Solution / Pipeline / Future
      problemTitle: document.getElementById("modal-problem-title"),
      problem: document.getElementById("modal-project-problem"),
      solutionTitle: document.getElementById("modal-solution-title"),
      solution: document.getElementById("modal-project-solution"),
      pipelineContainer: document.getElementById("modal-project-pipeline-box"),
      pipelineTitle: document.getElementById("modal-pipeline-title"),
      pipelineText: document.getElementById("modal-project-pipeline"),
      futureContainer: document.getElementById("modal-project-future-box"),
      futureTitle: document.getElementById("modal-future-title"),
      futureText: document.getElementById("modal-project-future"),
      
      closeBtn: document.getElementById("modal-close-btn")
    };
  }

  // Global Lightbox
  window.openLightbox = function (imgSrc, imgTitle) {
    console.log(`[Lightbox] Opening image: ${imgSrc} (${imgTitle})`);
    let lb = document.getElementById("global-lightbox-overlay");
    if (!lb) {
      lb = document.createElement("div");
      lb.id = "global-lightbox-overlay";
      lb.className = "lightbox-overlay";
      lb.innerHTML = `
        <div class="lightbox-content">
          <button class="lightbox-close-btn" onclick="window.closeLightbox()">✕</button>
          <img id="lightbox-img" src="" alt="">
          <div id="lightbox-caption" class="lightbox-caption"></div>
        </div>
      `;
      document.body.appendChild(lb);
      lb.addEventListener("click", (e) => {
        if (e.target === lb) window.closeLightbox();
      });
    }

    const imgEl = document.getElementById("lightbox-img");
    const captionEl = document.getElementById("lightbox-caption");
    if (imgEl) imgEl.src = imgSrc;
    if (captionEl) captionEl.textContent = imgTitle || "";

    lb.classList.add("active");
  };

  window.closeLightbox = function () {
    const lb = document.getElementById("global-lightbox-overlay");
    if (lb) lb.classList.remove("active");
  };

  window.openProjectModal = function (projectId) {
    activeProjectId = projectId;
    console.log(`[ProjectModal] Opening deep dive for project: ${projectId}`);
    renderModalContent();

    const els = getModalElements();
    if (els.overlay) {
      els.overlay.classList.add("active");
      document.body.style.overflow = "hidden"; // Lock background scroll
    }
  };

  window.closeProjectModal = function () {
    console.log(`[ProjectModal] Closing modal for project: ${activeProjectId}`);
    activeProjectId = null;
    const els = getModalElements();
    if (els.overlay) {
      els.overlay.classList.remove("active");
      document.body.style.overflow = ""; // Restore background scroll
    }
  };

  function renderModalContent() {
    if (!activeProjectId) return;
    const data = window.getCurrentData();
    if (!data) return;

    const project = data.projects.list.find((p) => p.id === activeProjectId);
    if (!project) {
      console.error(`[ProjectModal] Project not found: ${activeProjectId}`);
      return;
    }

    const modalLabels = data.modal;
    const els = getModalElements();

    console.log(`[ProjectModal] Rendering modal data for '${project.title}' in language '${window.getCurrentLang()}'`);

    // Basic headers
    els.title.textContent = project.title;
    els.badge.textContent = project.badge;
    els.tagline.textContent = project.tagline;

    // Tech badges
    els.techs.innerHTML = project.techs
      .map((t) => `<span class="tech-tag tech-tag-modal">${t}</span>`)
      .join("");

    // Key metrics grid
    els.metrics.innerHTML = project.metrics
      .map(
        (m) => `
        <div class="modal-metric-card">
          <div class="modal-metric-value">${m.value}</div>
          <div class="modal-metric-label">${m.label}</div>
        </div>
      `
      )
      .join("");

    // Section Titles
    document.getElementById("modal-problem-title").textContent = modalLabels.problemTitle;
    document.getElementById("modal-solution-title").textContent = modalLabels.solutionTitle;
    els.problemTitle.textContent = modalLabels.problemTitle;
    els.solutionTitle.textContent = modalLabels.solutionTitle;

    // Deep dive problem & solution
    els.problem.textContent = project.deepDive.problem;
    els.solution.textContent = project.deepDive.solution;

    // Render Architecture Section
    if (project.architecture) {
      els.archContainer.style.display = "block";
      els.archTitle.textContent = modalLabels.archTitle;
      els.archSummary.textContent = project.architecture.summary;

      // Flow steps
      if (project.architecture.flowSteps && project.architecture.flowSteps.length > 0) {
        els.archFlow.innerHTML = project.architecture.flowSteps
          .map(
            (step, idx) => `
            <div class="arch-step-card">
              <div class="arch-step-badge">${step.stage}</div>
              <div class="arch-step-detail">${step.detail}</div>
            </div>
          `
          )
          .join("");
      } else {
        els.archFlow.innerHTML = "";
      }

      // Highlights
      if (project.architecture.highlights && project.architecture.highlights.length > 0) {
        els.archHighlights.innerHTML = `
          <ul class="arch-highlights-list">
            ${project.architecture.highlights.map((h) => `<li>${h}</li>`).join("")}
          </ul>
        `;
      } else {
        els.archHighlights.innerHTML = "";
      }
    } else {
      els.archContainer.style.display = "none";
    }

    // Render Gallery Section (Screenshots)
    if (project.gallery && project.gallery.length > 0) {
      els.galleryContainer.style.display = "block";
      els.galleryTitle.textContent = modalLabels.galleryTitle;

      els.galleryGrid.innerHTML = project.gallery
        .map(
          (img) => `
          <div class="gallery-card" onclick="window.openLightbox('${img.src}', '${img.title}')">
            <div class="gallery-img-wrapper">
              <img src="${img.src}" alt="${img.title}" loading="lazy" class="gallery-thumb">
              <div class="gallery-overlay-hint">
                <span>🔍 ${modalLabels.viewFullImage}</span>
              </div>
            </div>
            <div class="gallery-info">
              <h4 class="gallery-title">${img.title}</h4>
              <p class="gallery-desc">${img.desc}</p>
            </div>
          </div>
        `
        )
        .join("");
    } else {
      els.galleryContainer.style.display = "none";
      els.galleryGrid.innerHTML = "";
    }

    // Optional pipeline section
    if (project.deepDive.pipeline || project.deepDive.toolCalling) {
      els.pipelineContainer.style.display = "block";
      document.getElementById("modal-pipeline-title").textContent = modalLabels.pipelineTitle;
      els.pipelineTitle.textContent = modalLabels.pipelineTitle;
      els.pipelineText.textContent = project.deepDive.pipeline || project.deepDive.toolCalling;
    } else {
      els.pipelineContainer.style.display = "none";
    }

    // Optional future/roadmap section
    if (project.deepDive.future) {
      els.futureContainer.style.display = "block";
      document.getElementById("modal-future-title").textContent = modalLabels.futureTitle;
      els.futureTitle.textContent = modalLabels.futureTitle;
      els.futureText.textContent = project.deepDive.future;
    } else {
      els.futureContainer.style.display = "none";
    }

    // Close button text
    if (els.closeBtn) {
      els.closeBtn.setAttribute("aria-label", modalLabels.close);
    }
  }

  // Listen for language change to update modal if open
  window.addEventListener("languageChanged", () => {
    if (activeProjectId) {
      console.log(`[ProjectModal] Language changed while modal open, re-rendering...`);
      renderModalContent();
    }
  });

  // Setup event listeners
  document.addEventListener("DOMContentLoaded", () => {
    const els = getModalElements();
    if (els.closeBtn) {
      els.closeBtn.addEventListener("click", window.closeProjectModal);
    }
    if (els.overlay) {
      els.overlay.addEventListener("click", (e) => {
        if (e.target === els.overlay) {
          window.closeProjectModal();
        }
      });
    }

    // Escape key closes modal
    // Escape key closes modal & lightbox
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && activeProjectId) {
        window.closeProjectModal();
      if (e.key === "Escape") {
        const lb = document.getElementById("global-lightbox-overlay");
        if (lb && lb.classList.contains("active")) {
          window.closeLightbox();
        } else if (activeProjectId) {
          window.closeProjectModal();
        }
      }
    });
  });
})();

