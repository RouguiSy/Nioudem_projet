import { findUser, addUser } from './db.js';
import { setSession, getSession, clearSession } from './session.js';
import { navigate } from './router.js';
import { showToast } from './toast.js';

let _currentRole = 'client';


export function initConnexion() {
  document.getElementById('btn-admin')?.addEventListener('click', () => showForm('admin'));
  document.getElementById('btn-client')?.addEventListener('click', () => showForm('client'));
  document.getElementById('btn-back')?.addEventListener('click', showChoose);
  document.getElementById('login-form')?.addEventListener('submit', handleLogin);
}

function showForm(role) {
  _currentRole = role;
  document.getElementById('step-choose').style.display = 'none';
  document.getElementById('step-form').style.display = 'block';

  const badge = document.getElementById('login-role-badge');
  badge.className = `login-role-badge ${role}`;
  badge.textContent = role === 'admin' ? 'Administrateur' : 'Espace Client';

  document.getElementById('login-form-sub').textContent = role === 'admin'
    ? 'Accédez au tableau de bord de gestion'
    : 'Réservez votre voiture en quelques clics';

  document.getElementById('insc-link').style.display = role === 'client' ? 'block' : 'none';
}

function showChoose() {
  document.getElementById('step-choose').style.display = 'block';
  document.getElementById('step-form').style.display = 'none';
  document.getElementById('login-error').style.display = 'none';
}

function handleLogin(event) {
  event.preventDefault();
  const email = document.getElementById('login-email').value.trim();
  const pwd = document.getElementById('login-pwd').value;
  const err = document.getElementById('login-error');
  const user = findUser(email);

  if (!user || user.password !== pwd) {
    err.textContent = 'Email ou mot de passe incorrect';
    err.style.display = 'block';
    return;
  }
  if (_currentRole === 'admin' && user.role !== 'admin') {
    err.textContent = 'Ce compte n\'a pas les droits administrateur';
    err.style.display = 'block';
    return;
  }
  if (_currentRole === 'client' && user.role !== 'client') {
    err.textContent = 'Utilisez l\'espace Administrateur pour ce compte';
    err.style.display = 'block';
    return;
  }

  setSession(user);
  showToast(`Bienvenue ${user.nom.split(' ')[0]} ✓`);
  setTimeout(() => navigate(user.role === 'admin' ? 'dashboard' : 'accueil'), 900);
}

// ========== INSCRIPTION ==========
export function initInscription() {
  document.getElementById('insc-pwd')?.addEventListener('input', checkPasswords);
  document.getElementById('insc-pwd2')?.addEventListener('input', checkPasswords);
  document.getElementById('insc-form')?.addEventListener('submit', handleInscription);
}

function checkPasswords() {
  const pwd = document.getElementById('insc-pwd')?.value ?? '';
  const pwd2 = document.getElementById('insc-pwd2')?.value ?? '';
  const hint = document.getElementById('pwd-match');
  if (!hint) return;
  if (!pwd2) { hint.textContent = ''; return; }
  if (pwd === pwd2) {
    hint.textContent = '✓ Les mots de passe correspondent';
    hint.className = 'pwd-hint pwd-hint--ok';
  } else {
    hint.textContent = '✗ Les mots de passe ne correspondent pas';
    hint.className = 'pwd-hint pwd-hint--err';
  }
}

function handleInscription(event) {
  event.preventDefault();
  const nom = document.getElementById('insc-nom').value.trim();
  const tel = document.getElementById('insc-tel').value.trim();
  const email = document.getElementById('insc-email').value.trim();
  const pwd = document.getElementById('insc-pwd').value;
  const pwd2 = document.getElementById('insc-pwd2').value;
  const err = document.getElementById('insc-error');

  if (pwd !== pwd2) {
    err.textContent = 'Les mots de passe ne correspondent pas';
    err.style.display = 'block';
    return;
  }
  if (pwd.length < 6) {
    err.textContent = 'Mot de passe trop court (6 caractères minimum)';
    err.style.display = 'block';
    return;
  }
  if (findUser(email)) {
    err.textContent = 'Un compte existe déjà avec cet email';
    err.style.display = 'block';
    return;
  }

  const newUser = {
    id: 'USR-' + Date.now(),
    nom, email, telephone: tel,
    password: pwd,
    role: 'client',
    createdAt: new Date().toISOString().split('T')[0],
  };
  addUser(newUser);
  setSession(newUser);
  showToast(`Bienvenue ${nom.split(' ')[0]} !`);
  setTimeout(() => navigate('accueil'), 1200);
}

// ========== DASHBOARD ==========
export function initDashboard() {
  document.getElementById('db-logout-btn')?.addEventListener('click', () => ND.logout());

  // Remplir les clients
  const clients = getUsers().filter(u => u.role === 'client');
  const tbody = document.getElementById('db-clients-body');
  const countEl = document.getElementById('db-client-count');
  if (countEl) countEl.textContent = `${clients.length} compte${clients.length > 1 ? 's' : ''}`;
  if (tbody) {
    if (clients.length === 0) {
      tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:28px">Aucun client inscrit</td></tr>';
    } else {
      tbody.innerHTML = clients.map(u => `
        <tr>
          <td class="yellow">${u.id}</td>
          <td>${u.nom}</td>
          <td class="muted">${u.email}</td>
          <td class="muted">${u.telephone || '—'}</td>
          <td><span class="badge badge-blue">Client</span></td>
          <td class="muted">${u.createdAt || '—'}</td>
        </tr>
      `).join('');
    }
  }


  const dateEl = document.getElementById('db-date');
  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
  }


  const session = getSession();
  if (session) {
    const initiales = session.nom.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    const avatarEl = document.getElementById('db-avatar');
    const nameEl = document.getElementById('db-username');
    if (avatarEl) avatarEl.textContent = initiales;
    if (nameEl) nameEl.textContent = session.nom;
  }
}

// ========== LOGOUT ==========
export function logout() {
  clearSession();
  showToast('Déconnexion réussie');
  setTimeout(() => navigate('accueil'), 800);
}