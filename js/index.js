import { initTheme, toggleTheme } from './theme.js';
import { initRouter, navigate }   from './router.js';
import { clearSession }           from './session.js';
import { showToast }              from './toast.js';

window.ND = {
    navigate,
    toggleTheme,
};

async function main() {
    initTheme();
    initRouter(); 
}

main();