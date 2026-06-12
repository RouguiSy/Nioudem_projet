export { accueilPage } from './accueil_page.js';
export { connexionPage } from './connexion_page.js';
export { inscriptionPage } from './inscription_page.js';
export { dashboardPage } from './dashboard_page.js';

export function getPage(pageName) {
        pages = {
        'accueil': accueilPage,
        'connexion': connexionPage,
        'inscription': inscriptionPage,
        'dashboard': dashboardPage
    };
    return pages[pageName] || pages['accueil'];
}