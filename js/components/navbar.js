import { getThemeIcon } from '../theme.js';
import { getSession, clearSession } from '../session.js';
import { showToast } from '../toast.js';

const LOGO_SVG = `
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
    <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
    <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/>
    <circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
  </svg>`;

export function renderNavbar(activePage = 'accueil') {
  const session = getSession();
  const icon    = getThemeIcon();

  const navLinks = [
    { hash: 'accueil', label: 'Accueil' },
    { hash: 'flotte',  label: 'Notre Flotte' },
    { hash: 'tarifs',  label: 'Tarifs' },
    { hash: 'carte',   label: 'Itinéraires' },
    { hash: 'apropos', label: 'À propos' },
  ].map(({ hash, label }) => `
    <a href="#${hash}" class="nav-link ${activePage === hash ? 'active' : ''}">${label}</a>
  `).join('');

  let userSection = '';
  
  if (session) {
    const initials = session.nom
      .split(' ')
      .map(n => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
    
    const firstName = session.nom.split(' ')[0];
    const isAdmin = session.role === 'admin';
    

    const clickAction = isAdmin 
      ? "ND.navigate('dashboard')" 
      : "ND.logout()";
    
    const label = isAdmin ? '' : '<span style="font-size:9px;color:var(--txt-faint);margin-left:4px;"></span>';
    
    userSection = `
      <div class="nav-user-pill" onclick="${clickAction}" style="cursor:pointer">
        <div class="nav-user-avatar">${initials}</div>
        <span class="nav-user-name">${firstName} ${label}</span>
      </div>
    `;
  } else {
    userSection = `<a href="#connexion" class="btn-outline">Connexion</a>`;
  }

  return `
    <nav class="navbar">
      <a href="#accueil" class="logo">
        <div class="logo-icon">${LOGO_SVG}</div>
        <span class="logo-text">ŇiouDeem</span>
      </a>

      <div class="nav-links">${navLinks}</div>

      <div class="nav-actions">
        <button id="nav-theme-btn" class="theme-btn">
          <span class="theme-icon">${icon}</span>
        </button>
        ${userSection}
        <a href="#reservation" class="btn-yellow">Réserver →</a>
      </div>
    </nav>`;
}

export function initNavbar() {
  document.getElementById('nav-theme-btn')
    ?.addEventListener('click', () => ND.toggleTheme());
}
