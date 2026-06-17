import { initTheme, toggleTheme } from './theme.js';
import { loadDB, getDB } from './db.js';
import { initRouter, navigate } from './router.js';
import { clearSession } from './session.js';
import { showToast } from './toast.js';

let isAppInitialized = false;

const appApi = {
    navigate: (route) => navigate(route),
    toggleTheme: () => toggleTheme(),
    logout: () => {
        clearSession();
        showToast('Déconnexion réussie');
        setTimeout(() => {
            window.location.href = window.location.pathname + '#accueil';
            window.location.reload();
        }, 500);
    },
    showToast: (message) => showToast(message),
    render: () => window.location.reload(),
    getDB: () => getDB(),
};

window.ND = appApi;
window.NiouDeem = appApi;

async function main() {
    if (isAppInitialized) {
        console.log('Application déjà initialisée');
        return;
    }
    
    isAppInitialized = true;
    
    console.log('Initialisation de NiouDeem...');
    
    initTheme();
    console.log('Thème initialisé');
    
    await loadDB();
    console.log('Base de données chargée');
    
    initRouter();
    
    console.log('Application NiouDeem prête !');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main);
} else {
    main();
}

window.addEventListener('error', (e) => {
    console.error('Erreur globale:', e.message);
    if (e.message.includes('loadDB')) {
        showToast('Erreur de chargement des données');
    }
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Promesse non gérée:', e.reason);
    showToast('Une erreur est survenue');
});