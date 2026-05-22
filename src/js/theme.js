/**
 * Dark / Light mode toggle
 * Persists preference in localStorage.
 */
(function () {
  var STORAGE_KEY = "theme";
  var DARK = "dark";
  var LIGHT = "light";

  function getPreferred() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored === DARK || stored === LIGHT) return stored;
    return window.matchMedia("(prefers-color-scheme: light)").matches
      ? LIGHT
      : DARK;
  }

  function apply(theme, btn) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(STORAGE_KEY, theme);

    if (btn) {
      btn.textContent = theme === DARK ? "☀️ Light" : "🌙 Dark";
      btn.setAttribute("aria-label", "Switch to " + (theme === DARK ? "light" : "dark") + " mode");
    }
  }

  // Apply immediately (before paint) so there is no flash
  apply(getPreferred(), null);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    // Re-apply to update button text now that DOM is ready
    apply(getPreferred(), btn);

    if (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        apply(current === DARK ? LIGHT : DARK, btn);
      });
    }
  });
})();
