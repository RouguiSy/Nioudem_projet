import { initTheme, toggleTheme } from './theme.js';
import { loadDB } from './db.js';
import { initRouter, navigate } from './router.js';
import { clearSession } from './session.js';
import { showToast } from './toast.js';
import { logout } from './auth.js';

window.NiouDeem = {
    navigate: (route) => navigate(route),
    toggleTheme: () => toggleTheme(),
    logout: () => logout(),
};

async function main() {
    initTheme();
    await loadDB();
    initRouter();
}

main();