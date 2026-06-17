import { getSession, clearSession } from "./session.js";
import { syncThemeIcons, toggleTheme } from "./theme.js";
import { showToast } from "./toast.js";

const PAGES = {
    accueil: () => import('./pages/accueil/accueil.js'),
    connexion: () => import('./pages/connexion/connexion.js'),
    inscription: () => import('./pages/inscription/inscription.js'),
    dashboard: () => import('./pages/dashboard/dashboard.js'),
    flotte: () => import('./pages/flotte/flotte.js'),
    reservation: () => import('./pages/reservation/reservation.js'),
    carte: () => import('./pages/carte/carte.js'),
    tarifs: () => import('./pages/tarifs/tarifs.js'),
    apropos: () => import('./pages/apropos/apropos.js'),
    error: () => import('./pages/error/error.js'),
};

let isRouterInitialized = false;

function getHash() {
    return window.location.hash.replace("#", "").trim();
}

export function navigate(hash) {
    window.location.hash = hash;
}

export async function render() {
    const hash = getHash() || 'accueil';
    const session = getSession();
    const app = document.getElementById('app');

    if (!app) {
        console.error('Element #app non trouve');
        return;
    }

    if (hash === 'dashboard' && !session) {
        showToast('Veuillez vous connecter pour acceder au dashboard');
        navigate('connexion');
        return;
    }

    if (hash === 'dashboard' && session?.role !== 'admin') {
        showToast('Acces reserve aux administrateurs');
        navigate('accueil');
        return;
    }

    if (hash === 'reservation' && !session) {
        showToast('Connectez-vous pour reserver');
        navigate('connexion');
        return;
    }

    try {
        const pageModule = await PAGES[hash]();

        if (!pageModule || typeof pageModule.render !== 'function') {
            throw new Error(`Page "${hash}" introuvable`);
        }

        app.innerHTML = pageModule.render();

        if (pageModule.init) {
            await pageModule.init();
        }

        if (pageModule.afterRender) {
            await pageModule.afterRender();
        }

        updateNavbar();
        syncThemeIcons();
        window.scrollTo({ top: 0, behavior: 'instant' });

        console.log(`Page "${hash}" chargee`);

    } catch (error) {
        console.error('Erreur:', error);
        await showErrorPage(app);
    }
}

async function showErrorPage(app) {
    try {
        const errorModule = await PAGES.error();
        app.innerHTML = errorModule.render();

        if (errorModule.init) {
            await errorModule.init();
        }

        if (errorModule.afterRender) {
            await errorModule.afterRender();
        }

        updateNavbar();
        syncThemeIcons();
        window.scrollTo({ top: 0, behavior: 'instant' });

    } catch (e) {
        app.innerHTML = `
            <div style="display:flex;align-items:center;justify-content:center;min-height:100vh;padding:40px;text-align:center;">
                <div>
                    <div style="font-size:64px;margin-bottom:16px;">BI bakhoul</div>
                    <h2 style="color:var(--txt-main);margin-bottom:8px;">Erreur critique</h2>
                    <p style="color:var(--txt-sub);margin-bottom:24px;">Une erreur inattendue s'est produite.</p>
                    <a href="#accueil" class="btn-yellow" style="display:inline-block;padding:12px 32px;border-radius:12px;text-decoration:none;font-weight:700;">Accueil</a>
                </div>
            </div>
        `;
    }
}


function updateNavbar() {
    const session = getSession();
    const connexionBtn = document.getElementById("nav-connexion");
    const userPill = document.getElementById("nav-user");

    if (!connexionBtn || !userPill) return;

    if (session) {
        connexionBtn.style.display = "none";
        userPill.style.display = "flex";
        
        const initials = session.nom
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
        
        const userName = document.getElementById("nav-user-name");
        const userInitials = document.getElementById("nav-user-initials");
        
        if (userName) userName.textContent = session.nom?.split(' ')[0] || "Compte";
        if (userInitials) userInitials.textContent = initials;

        userPill.style.cursor = "pointer";
        userPill.onclick = () => {
            clearSession();
            showToast('Déconnexion réussie');
            window.location.hash = 'accueil';
            // Recharger la page
            setTimeout(() => render(), 100);
        };
        
    } else {
        connexionBtn.style.display = "inline-flex";
        userPill.style.display = "none";
        userPill.onclick = null;
    }
}

export function initRouter() {
    if (isRouterInitialized) {
        console.log('Routeur deja initialise, ignore');
        return;
    }
    
    isRouterInitialized = true;
    
    window.addEventListener("hashchange", render);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', render);
    } else {
        render();
    }

    console.log('Routeur initialise');
}

