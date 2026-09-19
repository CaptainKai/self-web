/**
 * Internationalization (i18n) Engine
 * Manages language switching ('zh' <-> 'en') and notifies UI components.
 */

(function () {
  const LANG_KEY = "kai_portfolio_lang";
  let currentLang = "zh";

  function getSavedLang() {
    const saved = localStorage.getItem(LANG_KEY);
    if (saved === "zh" || saved === "en") {
      return saved;
    }
    // Default to 'zh' as requested
    return "zh";
  }

  function setLang(lang) {
    if (lang !== "zh" && lang !== "en") {
      console.warn(`[i18n] Unsupported language: ${lang}`);
      return;
    }
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    console.log(`[i18n] Language updated to: ${currentLang}`);

    // Update toggle button text
    updateLangButton();

    // Dispatch global event for listeners to re-render
    const event = new CustomEvent("languageChanged", { detail: { lang: currentLang } });
    window.dispatchEvent(event);
  }

  function updateLangButton() {
    const btn = document.getElementById("lang-toggle-btn");
    if (!btn) return;
    const label = btn.querySelector(".lang-label") || btn;
    label.textContent = currentLang === "zh" ? "EN" : "中";
    btn.setAttribute("title", currentLang === "zh" ? "Switch to English" : "切换为中文");
  }

  window.toggleLanguage = function () {
    const nextLang = currentLang === "zh" ? "en" : "zh";
    console.log(`[i18n] Toggling language from ${currentLang} -> ${nextLang}`);
    setLang(nextLang);
  };

  window.getCurrentLang = function () {
    return currentLang;
  };

  window.getCurrentData = function () {
    if (!window.RESUME_DATA) {
      console.error("[i18n] RESUME_DATA not found!");
      return null;
    }
    return window.RESUME_DATA[currentLang] || window.RESUME_DATA.zh;
  };

  // Initialize
  currentLang = getSavedLang();
  document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  if (document.documentElement) {
    document.documentElement.lang = currentLang === "zh" ? "zh-CN" : "en";
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateLangButton();
    console.log(`[i18n] Initialized with language: ${currentLang}`);
  });
})();

