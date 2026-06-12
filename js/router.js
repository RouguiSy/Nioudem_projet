// ─── router.js ───────────────────────────────────────────
import { accueilPage }     from './pages/accueil_page.js';
import { connexionPage }   from './pages/connexion_page.js';
import { inscriptionPage } from './pages/inscription_page.js';
import { dashboardPage }   from './pages/dashboard_page.js';
import { getSession, setSession, clearSession } from './session.js';
import { syncThemeIcons, toggleTheme }          from './theme.js';
import { showToast }                            from './toast.js';
import { findUser, addUser, getUsers }          from './db.js';

const PAGES = {
    'accueil'     : accueilPage,
    'connexion'   : connexionPage,
    'inscription' : inscriptionPage,
    'dashboard'   : dashboardPage
};

function getHash() {
    return window.location.hash.replace('#', '').trim();
}

export function navigate(hash) {
    window.location.hash = hash;
}

export async function render() {
    const hash    = getHash() || 'accueil';
    const session = getSession();
    const app     = document.getElementById('app');

    if (!app) return;

    if (hash === 'dashboard' && !session) {
        navigate('connexion'); return;
    }
    if (hash === 'dashboard' && session?.role !== 'admin') {
        navigate('accueil'); return;
    }

    app.innerHTML = PAGES[hash] || PAGES['accueil'];

    await initPage(hash);   // ← await ajouté

    updateNavbar();
    window.scrollTo({ top: 0, behavior: 'instant' });
}

async function initPage(route) {   // ← async ajouté
    syncThemeIcons();

    document.querySelectorAll('[data-theme-toggle], #login-theme-btn, #insc-theme-btn, #db-theme-btn').forEach(btn => {
        btn.onclick = (e) => { e.preventDefault(); toggleTheme(); };
    });

    if (route === 'connexion')   await initConnexionPage();   // ← await
    if (route === 'inscription') await initInscriptionPage(); // ← await
    if (route === 'dashboard')   await initDashboardPage();   // ← await
}

// ─────────────────────────────────────────────────────────
// PAGE CONNEXION
// ─────────────────────────────────────────────────────────
async function initConnexionPage() {   // ← async
    let currentRole = 'client';

    const adminBtn  = document.getElementById('btn-admin');
    const clientBtn = document.getElementById('btn-client');
    const backBtn   = document.getElementById('btn-back');
    const loginForm = document.getElementById('login-form');

    function showForm(role) {
        currentRole = role;
        const stepChoose = document.getElementById('step-choose');
        const stepForm   = document.getElementById('step-form');
        if (stepChoose) stepChoose.style.display = 'none';
        if (stepForm)   stepForm.style.display   = 'block';

        const badge = document.getElementById('login-role-badge');
        if (badge) {
            badge.className   = `login-role-badge ${role}`;
            badge.textContent = role === 'admin' ? 'Administrateur' : 'Espace Client';
        }

        const sub = document.getElementById('login-form-sub');
        if (sub) {
            sub.textContent = role === 'admin'
                ? 'Accédez au tableau de bord de gestion'
                : 'Réservez votre voiture en quelques clics';
        }

        const inscLink = document.getElementById('insc-link');
        if (inscLink) inscLink.style.display = role === 'client' ? 'block' : 'none';
    }

    function showChoose() {
        const stepChoose = document.getElementById('step-choose');
        const stepForm   = document.getElementById('step-form');
        const err        = document.getElementById('login-error');
        if (stepChoose) stepChoose.style.display = 'block';
        if (stepForm)   stepForm.style.display   = 'none';
        if (err)        err.style.display        = 'none';
    }

    async function handleSubmit(event) {   // ← async
        event.preventDefault();

        const email = document.getElementById('login-email')?.value.trim() || '';
        const pwd   = document.getElementById('login-pwd')?.value || '';
        const err   = document.getElementById('login-error');

        // Désactiver le bouton pendant la requête
        const btn = event.target.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Connexion…'; }

        const user = await findUser(email);   // ← await

        if (btn) { btn.disabled = false; btn.textContent = 'Se connecter →'; }

        if (!user || user.password !== pwd) {
            if (err) { err.textContent = 'Email ou mot de passe incorrect'; err.style.display = 'block'; }
            return;
        }
        if (currentRole === 'admin' && user.role !== 'admin') {
            if (err) { err.textContent = 'Ce compte n\'a pas les droits administrateur'; err.style.display = 'block'; }
            return;
        }
        if (currentRole === 'client' && user.role !== 'client') {
            if (err) { err.textContent = 'Utilisez l\'espace Administrateur pour ce compte'; err.style.display = 'block'; }
            return;
        }

        setSession(user);
        showToast(`Bienvenue ${user.nom.split(' ')[0]} ✓`);
        setTimeout(() => navigate(user.role === 'admin' ? 'dashboard' : 'accueil'), 900);
    }

    if (adminBtn)  adminBtn.onclick  = () => showForm('admin');
    if (clientBtn) clientBtn.onclick = () => showForm('client');
    if (backBtn)   backBtn.onclick   = showChoose;
    if (loginForm) loginForm.onsubmit = handleSubmit;
}

// ─────────────────────────────────────────────────────────
// PAGE INSCRIPTION
// ─────────────────────────────────────────────────────────
async function initInscriptionPage() {   // ← async
    const pwdInput  = document.getElementById('insc-pwd');
    const pwd2Input = document.getElementById('insc-pwd2');
    const inscForm  = document.getElementById('insc-form');

    function checkPasswords() {
        const pwd  = pwdInput?.value  ?? '';
        const pwd2 = pwd2Input?.value ?? '';
        const hint = document.getElementById('pwd-match');
        if (!hint) return;
        if (!pwd2) { hint.textContent = ''; return; }
        if (pwd === pwd2) {
            hint.textContent = '✓ Les mots de passe correspondent';
            hint.className   = 'pwd-hint pwd-hint--ok';
        } else {
            hint.textContent = '✗ Les mots de passe ne correspondent pas';
            hint.className   = 'pwd-hint pwd-hint--err';
        }
    }

    async function handleSubmit(event) {   // ← async
        event.preventDefault();

        const nom   = document.getElementById('insc-nom')?.value.trim()   || '';
        const tel   = document.getElementById('insc-tel')?.value.trim()   || '';
        const email = document.getElementById('insc-email')?.value.trim() || '';
        const pwd   = pwdInput?.value  ?? '';
        const pwd2  = pwd2Input?.value ?? '';
        const err   = document.getElementById('insc-error');

        // Validations synchrones
        if (pwd !== pwd2) {
            if (err) { err.textContent = 'Les mots de passe ne correspondent pas'; err.style.display = 'block'; }
            return;
        }
        if (pwd.length < 6) {
            if (err) { err.textContent = 'Mot de passe trop court (6 caractères minimum)'; err.style.display = 'block'; }
            return;
        }

        // Désactiver le bouton pendant la requête
        const btn = event.target.querySelector('button[type="submit"]');
        if (btn) { btn.disabled = true; btn.textContent = 'Vérification…'; }

        const existing = await findUser(email);   // ← await

        if (existing) {
            if (btn) { btn.disabled = false; btn.textContent = 'Créer mon compte →'; }
            if (err) { err.textContent = 'Un compte existe déjà avec cet email'; err.style.display = 'block'; }
            return;
        }

        const newUser = {
            id        : 'USR-' + Date.now(),
            nom, email, telephone: tel,
            password  : pwd,
            role      : 'client',
            createdAt : new Date().toISOString().split('T')[0]
        };

        if (btn) btn.textContent = 'Création…';

        await addUser(newUser);   // ← await → écrit dans users.json

        setSession(newUser);
        showToast(`Bienvenue ${nom.split(' ')[0]} ! 🎉`);
        setTimeout(() => navigate('accueil'), 1200);
    }

    if (pwdInput && pwd2Input) {
        pwdInput.oninput  = checkPasswords;
        pwd2Input.oninput = checkPasswords;
    }
    if (inscForm) inscForm.onsubmit = handleSubmit;
}

// ─────────────────────────────────────────────────────────
// PAGE DASHBOARD
// ─────────────────────────────────────────────────────────
async function initDashboardPage() {   // ← async
    const logoutBtn = document.getElementById('db-logout-btn');
    const dateEl    = document.getElementById('db-date');
    const session   = getSession();

    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
        });
    }

    if (session) {
        const initiales = session.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
        const avatarEl  = document.getElementById('db-avatar');
        const nameEl    = document.getElementById('db-username');
        if (avatarEl) avatarEl.textContent = initiales;
        if (nameEl)   nameEl.textContent   = session.nom;
    }

    // ← await ajouté : récupère les vrais clients depuis json-server
    const users   = await getUsers();
    const clients = users.filter(u => u.role === 'client');
    const tbody   = document.getElementById('db-clients-body');
    const countEl = document.getElementById('db-client-count');

    if (countEl) countEl.textContent = `${clients.length} compte${clients.length > 1 ? 's' : ''}`;

    if (tbody) {
        if (clients.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="muted" style="text-align:center;padding:24px">Aucun client inscrit</td></tr>';
        } else {
            tbody.innerHTML = clients.map(client => `
                <tr>
                    <td class="yellow">${client.id}</td>
                    <td>${client.nom}</td>
                    <td class="muted">${client.email}</td>
                    <td class="muted">${client.telephone || '—'}</td>
                    <td><span class="badge badge-blue">Client</span></td>
                    <td class="muted">${client.createdAt || '—'}</td>
                </tr>
            `).join('');
        }
    }

    if (logoutBtn) {
        logoutBtn.onclick = () => {
            clearSession();
            showToast('Déconnexion réussie');
            setTimeout(() => navigate('accueil'), 800);
        };
    }
}

// ─────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────
function updateNavbar() {
    const session      = getSession();
    const connexionBtn = document.getElementById('nav-connexion');
    const userPill     = document.getElementById('nav-user');

    if (connexionBtn && userPill) {
        if (session) {
            connexionBtn.style.display = 'none';
            userPill.style.display     = 'flex';
            const initials     = session.nom ? session.nom.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '?';
            const userName     = document.getElementById('nav-user-name');
            const userInitials = document.getElementById('nav-user-initials');
            if (userName)     userName.textContent     = session.nom?.split(' ')[0] || 'Compte';
            if (userInitials) userInitials.textContent = initials;
        } else {
            connexionBtn.style.display = 'inline-flex';
            userPill.style.display     = 'none';
        }
    }
}

// ─────────────────────────────────────────────────────────
// INIT
// ─────────────────────────────────────────────────────────
export function initRouter() {
    window.addEventListener('hashchange', render);
    render();
}