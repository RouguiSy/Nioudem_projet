import { renderNavbar, initNavbar } from '../../components/navbar.js';
import { getThemeIcon } from '../../theme.js';

export function render() {
  return `
    ${renderNavbar('error')}
    
    <div class="error-page">
      <div class="error-container">
        <div class="error-icon">😕</div>
        <h1 class="error-title">Page introuvable</h1>
        <p class="error-sub">Désolé, la page que vous recherchez n'existe pas ou est temporairement indisponible.</p>
        <div class="error-actions">
          <a href="#accueil" class="btn-yellow btn-lg">Retour à l'accueil</a>
          <button onclick="window.history.back()" class="btn-outline btn-lg">Retour en arrière</button>
        </div>
        <div class="error-code">
          <span>Erreur 404</span>
          <span class="error-divider">•</span>
          <span id="error-path">/page-introuvable</span>
        </div>
      </div>
    </div>
  `;
}

export function init() {
  const pathEl = document.getElementById('error-path');
  if (pathEl) {
    const hash = window.location.hash || '#accueil';
    pathEl.textContent = hash || '/';
  }
}

export function afterRender() {
  initNavbar();
}