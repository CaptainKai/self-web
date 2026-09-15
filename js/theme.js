/**
 * Theme Management (Dark / Light mode)
 */

(function () {
  const THEME_KEY = "kai_portfolio_theme";
  const root = document.documentElement;

  // Initialize theme from localStorage or system preference
  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") {
      return saved;
    }
    // Default to dark for tech aesthetic
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }

  function applyTheme(theme) {
    console.log(`[ThemeManager] Applying theme: ${theme}`);
    if (theme === "light") {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
    } else {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
    }
    localStorage.setItem(THEME_KEY, theme);
    updateThemeIcon(theme);
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById("theme-toggle-btn");
    if (!btn) return;
    const icon = btn.querySelector("i, span");
    if (icon) {
      icon.textContent = theme === "light" ? "🌙" : "☀️";
    }
    btn.setAttribute("title", theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode");
  }

  window.toggleTheme = function () {
    const currentTheme = root.classList.contains("light-theme") ? "light" : "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    console.log(`[ThemeManager] Toggled theme from ${currentTheme} to ${newTheme}`);
    applyTheme(newTheme);
  };

  // Initial execution
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);

  document.addEventListener("DOMContentLoaded", () => {
    updateThemeIcon(initialTheme);
  });
})();

