/**
 * Dark / Light mode toggle
 * Persists preference in localStorage.
 */
(function () {
  const STORAGE_KEY = "theme";
  const DARK = "dark";
  const LIGHT = "light";

  function getPreferred() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? LIGHT
      : DARK;
  }

  function apply(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.textContent = theme === DARK ? "☀️ Light" : "🌙 Dark";
      btn.setAttribute("aria-label", "Switch to " + (theme === DARK ? "light" : "dark") + " mode");
    }
  }

  // Apply immediately (before paint) so there is no flash
  apply(getPreferred());

  document.addEventListener("DOMContentLoaded", function () {
    // Re-apply to update button text once DOM is ready
    apply(getPreferred());

    var btn = document.getElementById("theme-toggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        apply(current === DARK ? LIGHT : DARK);
      });
    }
  });
})();
