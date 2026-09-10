const THEME_KEY = 'portfolio-theme';
const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const themeMeta = document.querySelector('meta[name="theme-color"]');
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

function readThemePreference() {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null;
  }
}

function saveThemePreference(theme) {
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {
    // The selected theme still applies for the current page if storage is unavailable.
  }
}

function updateThemeControl(theme) {
  if (!themeToggle) return;
  const dark = theme === 'dark';
  themeToggle.setAttribute('aria-pressed', String(dark));
  themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
  themeToggle.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
}

function applyTheme(theme, persist = false) {
  root.dataset.theme = theme;
  root.style.colorScheme = theme;
  if (themeMeta) themeMeta.content = theme === 'dark' ? '#0c0d0b' : '#f5f5f2';
  updateThemeControl(theme);
  if (persist) saveThemePreference(theme);
}

const initialTheme = root.dataset.theme || readThemePreference() || (systemTheme.matches ? 'dark' : 'light');
applyTheme(initialTheme);

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
  });
}

function followSystemTheme(event) {
  if (readThemePreference()) return;
  applyTheme(event.matches ? 'dark' : 'light');
}

if (systemTheme.addEventListener) systemTheme.addEventListener('change', followSystemTheme);
