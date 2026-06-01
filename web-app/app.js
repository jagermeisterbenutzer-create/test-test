document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const themeLabel = themeToggle?.querySelector(".theme-toggle__label");
  const storageKey = "todo-app-theme";
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const storedTheme = window.localStorage.getItem(storageKey);
  const initialTheme = storedTheme || (systemPrefersDark ? "dark" : "light");

  const applyTheme = (theme) => {
    const isDark = theme === "dark";

    body.dataset.theme = theme;

    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    }

    if (themeLabel) {
      themeLabel.textContent = isDark ? "Light theme" : "Dark theme";
    }
  };

  applyTheme(initialTheme);

  themeToggle?.addEventListener("click", () => {
    const nextTheme = body.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);
    window.localStorage.setItem(storageKey, nextTheme);
  });
});
