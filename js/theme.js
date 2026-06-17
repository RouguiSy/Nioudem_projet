function getTheme() {
  return localStorage.getItem("theme") || "dark";
}

function setTheme(theme) {
  localStorage.setItem("theme", theme);
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}

export function toggleTheme() {
  const current = getTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  updateThemeIcon();
}

export function syncThemeIcons() {
  updateThemeIcon();
}

export function getThemeIcon() {
  const theme = getTheme();
  return theme === "dark" ? "☀️" : "🌙";
}

function updateThemeIcon() {
  const icon = getThemeIcon();
  document.querySelectorAll(".theme-icon").forEach((el) => {
    el.textContent = icon;
  });
}

export function initTheme() {
  const theme = getTheme();
  setTheme(theme);
  updateThemeIcon();
}

initTheme();

console.log("Theme module initialisé");
