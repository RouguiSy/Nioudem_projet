
import { getThemeIcon } from '../theme.js';
import { getSession }   from '../session.js';

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

  const userSection = session
    ? `<div class="nav-user-pill" onclick="ND.navigate('dashboard')" style="cursor:pointer">
          <div class="nav-user-avatar">${session.nom.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}</div>
          <span class="nav-user-name">${session.nom.split(' ')[0]}</span>
        </div>`
    : `<a href="#connexion" class="btn-outline">Connexion</a>`;

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
