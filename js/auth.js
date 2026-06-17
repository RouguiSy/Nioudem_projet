import { findUser, addUser, getUsers } from './db.js';
import { setSession, getSession, clearSession } from './session.js';
import { navigate } from './router.js';
import { showToast } from './toast.js';

let _currentRole = 'client';

export function initConnexion() {
    const adminBtn = document.getElementById('btn-admin');
    const clientBtn = document.getElementById('btn-client');
    const backBtn = document.getElementById('btn-back');
    const loginForm = document.getElementById('login-form');

    if (adminBtn) adminBtn.onclick = () => showForm('admin');
    if (clientBtn) clientBtn.onclick = () => showForm('client');
    if (backBtn) backBtn.onclick = showChoose;
    if (loginForm) loginForm.onsubmit = handleLogin;
}

function showForm(role) {
    _currentRole = role;
    const stepChoose = document.getElementById('step-choose');
    const stepForm = document.getElementById('step-form');
    
    if (stepChoose) stepChoose.style.display = 'none';
    if (stepForm) stepForm.style.display = 'block';

    const badge = document.getElementById('login-role-badge');
    if (badge) {
        badge.className = `login-role-badge ${role}`;
        badge.textContent = role === 'admin' ? 'Administrateur' : 'Espace Client';
    }

    const sub = document.getElementById('login-form-sub');
    if (sub) {
        sub.textContent = role === 'admin'
            ? 'Accedez au tableau de bord de gestion'
            : 'Reservez votre voiture en quelques clics';
    }

    const inscLink = document.getElementById('insc-link');
    if (inscLink) inscLink.style.display = role === 'client' ? 'block' : 'none';
}

function showChoose() {
    const stepChoose = document.getElementById('step-choose');
    const stepForm = document.getElementById('step-form');
    const err = document.getElementById('login-error');
    
    if (stepChoose) stepChoose.style.display = 'block';
    if (stepForm) stepForm.style.display = 'none';
    if (err) err.style.display = 'none';
}

async function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('login-email')?.value.trim() || '';
    const pwd = document.getElementById('login-pwd')?.value || '';
    const err = document.getElementById('login-error');
    const btn = event.target.querySelector('button[type="submit"]');

    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Connexion…';
    }

    const user = await findUser(email);

    if (btn) {
        btn.disabled = false;
        btn.textContent = 'Se connecter →';
    }

    if (!user || user.password !== pwd) {
        if (err) {
            err.textContent = 'Email ou mot de passe incorrect';
            err.style.display = 'block';
        }
        return;
    }
    
    if (_currentRole === 'admin' && user.role !== 'admin') {
        if (err) {
            err.textContent = 'Ce compte n\'a pas les droits administrateur';
            err.style.display = 'block';
        }
        return;
    }
    
    if (_currentRole === 'client' && user.role !== 'client') {
        if (err) {
            err.textContent = 'Utilisez l\'espace Administrateur pour ce compte';
            err.style.display = 'block';
        }
        return;
    }

    setSession(user);
    showToast(`Bienvenue ${user.nom.split(' ')[0]} `);
    setTimeout(() => {
        if (user.role === 'admin') {
            navigate('dashboard');
        } else {
            navigate('accueil');
        }
    }, 900);
}

export function initInscription() {
    const pwdInput = document.getElementById('insc-pwd');
    const pwd2Input = document.getElementById('insc-pwd2');
    const inscForm = document.getElementById('insc-form');

    if (pwdInput) pwdInput.oninput = checkPasswords;
    if (pwd2Input) pwd2Input.oninput = checkPasswords;
    if (inscForm) inscForm.onsubmit = handleInscription;
}

function checkPasswords() {
    const pwd = document.getElementById('insc-pwd')?.value ?? '';
    const pwd2 = document.getElementById('insc-pwd2')?.value ?? '';
    const hint = document.getElementById('pwd-match');
    
    if (!hint) return;
    if (!pwd2) { 
        hint.textContent = ''; 
        return; 
    }
    
    if (pwd === pwd2) {
        hint.textContent = 'Les mots de passe correspondent';
        hint.className = 'pwd-hint pwd-hint--ok';
    } else {
        hint.textContent = 'Les mots de passe ne correspondent pas';
        hint.className = 'pwd-hint pwd-hint--err';
    }
}

async function handleInscription(event) {
    event.preventDefault();
    
    const nom = document.getElementById('insc-nom')?.value.trim() || '';
    const tel = document.getElementById('insc-tel')?.value.trim() || '';
    const email = document.getElementById('insc-email')?.value.trim() || '';
    const pwd = document.getElementById('insc-pwd')?.value || '';
    const pwd2 = document.getElementById('insc-pwd2')?.value || '';
    const err = document.getElementById('insc-error');
    const btn = event.target.querySelector('button[type="submit"]');

    if (pwd !== pwd2) {
        if (err) {
            err.textContent = 'Les mots de passe ne correspondent pas';
            err.style.display = 'block';
        }
        return;
    }
    
    if (pwd.length < 6) {
        if (err) {
            err.textContent = 'Mot de passe trop court (6 caracteres minimum)';
            err.style.display = 'block';
        }
        return;
    }
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Verification…';
    }
    
    const existing = await findUser(email);
    
    if (btn) {
        btn.disabled = false;
        btn.textContent = 'Creer mon compte →';
    }
    
    if (existing) {
        if (err) {
            err.textContent = 'Un compte existe deja avec cet email';
            err.style.display = 'block';
        }
        return;
    }

    const newUser = {
        id: 'USR-' + Date.now(),
        nom: nom,
        email: email,
        telephone: tel,
        password: pwd,
        role: 'client',
        createdAt: new Date().toISOString().split('T')[0],
    };
    
    if (btn) {
        btn.disabled = true;
        btn.textContent = 'Creation…';
    }
    
    await addUser(newUser);
    
    setSession(newUser);
    showToast(`Bienvenue ${nom.split(' ')[0]} ! `);
    setTimeout(() => navigate('accueil'), 1200);
}

export async function initDashboard() {
    const logoutBtn = document.getElementById('db-logout-btn');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            if (confirm('Voulez-vous vous deconnecter ?')) {
                clearSession();
                showToast('Deconnexion reussie');
                setTimeout(() => {
                    window.location.hash = 'accueil';
                    window.location.reload();
                }, 500);
            }
        };
    }

    const dateEl = document.getElementById('db-date');
    if (dateEl) {
        dateEl.textContent = new Date().toLocaleDateString('fr-FR', {
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
        });
    }

    const session = getSession();
    if (session) {
        const initiales = session.nom
            .split(' ')
            .map(n => n[0])
            .join('')
            .slice(0, 2)
            .toUpperCase();
        
        const avatarEl = document.getElementById('db-avatar');
        const nameEl = document.getElementById('db-username');
        
        if (avatarEl) avatarEl.textContent = initiales;
        if (nameEl) nameEl.textContent = session.nom;
    }

    const users = await getUsers();
    const clients = users.filter(u => u.role === 'client');
    const tbody = document.getElementById('db-clients-body');
    const countEl = document.getElementById('db-client-count');
    
    if (countEl) {
        countEl.textContent = `${clients.length} compte${clients.length > 1 ? 's' : ''}`;
    }
    
    if (tbody) {
        if (clients.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px;color:var(--txt-faint)">Aucun client inscrit</td></tr>';
        } else {
            tbody.innerHTML = clients.map(u => `
                <tr>
                    <td class="yellow">${u.id}</td>
                    <td style="font-weight:600">${u.nom}</td>
                    <td class="muted">${u.email}</td>
                    <td class="muted">${u.telephone || '—'}</td>
                    <td><span class="badge badge-blue">Client</span></td>
                    <td class="muted">${u.createdAt || '—'}</td>
                </tr>
            `).join('');
        }
    }
}

export function logout() {
    clearSession();
    showToast('Deconnexion reussie');
    setTimeout(() => {
        window.location.hash = 'accueil';
        window.location.reload();
    }, 500);
}

if (typeof window !== 'undefined') {
    window.NiouDeem = window.NiouDeem || {};
    window.NiouDeem.logout = logout;
}