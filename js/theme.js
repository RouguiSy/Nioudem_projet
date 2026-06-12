export function syncThemeIcons() {
    const isDark = document.documentElement.classList.contains('dark');
    document.querySelectorAll('.theme-icon').forEach(el => {
        el.textContent = isDark ? '☀️' : '🌙';
    });
}

export function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('nioudeem-theme', isDark ? 'dark' : 'light');
    syncThemeIcons();
}

export function initTheme() {
    const saved = localStorage.getItem('nioudeem-theme');
    if (saved === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
    syncThemeIcons();
}