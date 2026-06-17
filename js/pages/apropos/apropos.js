import { renderNavbar, initNavbar } from '../../components/navbar.js';
export function render() {
  return `
    ${renderNavbar('accueil')}

    <main class="info-page">
      <section class="about-hero">
        <div class="about-copy">
          <div class="section-tag">À propos</div>
          <h1 class="info-title">Un service chauffeur pensé pour Dakar et le Sénégal</h1>
          <p class="info-sub">ŇiouDeem simplifie la réservation de véhicules avec chauffeur: une flotte adaptée, des conducteurs professionnels et une expérience claire du départ au paiement.</p>
          <div class="hero-btns">
            <a href="#reservation" class="btn-yellow btn-lg">Réserver maintenant</a>
            <a href="#carte" class="btn-outline btn-lg">Voir les trajets</a>
          </div>
        </div>
        <div class="about-media">
          <img src="js/assets/images/ma_voiture.jpeg" alt="Véhicule ŇiouDeem" />
        </div>
      </section>
    
      <section class="values-grid">
        <article class="feature-card">
          <div class="feat-title">Fiabilité</div>
          <div class="feat-desc">Des réservations structurées, des chauffeurs identifiés et un suivi des trajets en cours.</div>
        </article>
        <article class="feature-card">
          <div class="feat-title">Confort</div>
          <div class="feat-desc">Berlines, SUV, vans et minibus pour répondre aux besoins personnels, pros et groupes.</div>
        </article>
        <article class="feature-card">
          <div class="feat-title">Transparence</div>
          <div class="feat-desc">Prix visibles, récapitulatif avant paiement et moyens de paiement adaptés au Sénégal.</div>
        </article>
      </section>
    </main>
    `;
}
