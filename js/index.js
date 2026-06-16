import { initTheme, toggleTheme } from './theme.js';
import { initRouter, navigate }   from './router.js';
import { clearSession }           from './session.js';
import { showToast }              from './toast.js';

const appApi = {
    navigate,
    toggleTheme,
    logout: () => {
        clearSession();
        showToast('Déconnexion réussie');
        setTimeout(() => navigate('accueil'), 800);
    },
};

window.ND = appApi;
window.NiouDeem = appApi;

async function main() {
    initTheme();
    initRouter(); 
}

main();
