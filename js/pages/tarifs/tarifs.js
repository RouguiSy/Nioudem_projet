import { renderNavbar, initNavbar } from '../../components/navbar.js';

export function render() {
  return `
    ${renderNavbar('tarifs')}
    
    <main class="info-page">
      <section class="info-hero">
        <div class="section-tag">Tarifs</div>
        <h1 class="info-title">Des prix clairs pour chaque trajet</h1>
        <p class="info-sub">Choisissez une catégorie, ajoutez la durée, puis confirmez votre réservation avec le moyen de paiement qui vous convient.</p>
      </section>

      <section class="pricing-grid">
        <article class="pricing-card">
          <span class="car-categorie">BERLINE CONFORT</span>
          <h2>Peugeot 508</h2>
          <div class="pricing-price">30 000 <span>FCFA/h</span></div>
          <p>Idéal pour les rendez-vous, transferts urbains et trajets quotidiens.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
        <article class="pricing-card pricing-card--highlight">
          <span class="car-categorie">BERLINE LUXE</span>
          <h2>Mercedes Classe S</h2>
          <div class="pricing-price">45 000 <span>FCFA/h</span></div>
          <p>Confort premium pour vos déplacements professionnels et événements.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
        <article class="pricing-card">
          <span class="car-categorie">SUV PREMIUM</span>
          <h2>Toyota Land Cruiser</h2>
          <div class="pricing-price">55 000 <span>FCFA/h</span></div>
          <p>Parfait pour les trajets longue distance, familles et bagages.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
        <article class="pricing-card">
          <span class="car-categorie">VAN CONFORT</span>
          <h2>Toyota Hiace</h2>
          <div class="pricing-price">40 000 <span>FCFA/h</span></div>
          <p>Solution pratique pour petits groupes, équipes et navettes.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
        <article class="pricing-card">
          <span class="car-categorie">MINIBUS</span>
          <h2>Mercedes Sprinter</h2>
          <div class="pricing-price">75 000 <span>FCFA/h</span></div>
          <p>Grande capacité pour sorties, séminaires et voyages organisés.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
        <article class="pricing-card">
          <span class="car-categorie">EXECUTIVE</span>
          <h2>BMW Série 7</h2>
          <div class="pricing-price">60 000 <span>FCFA/h</span></div>
          <p>Expérience haut de gamme avec équipements premium à bord.</p>
          <a href="#reservation" class="btn-yellow btn-full">Réserver</a>
        </article>
      </section>

      <section class="info-band">
        <div>
          <h2>Ce qui est inclus</h2>
          <p>Chauffeur professionnel, carburant urbain, assurance, assistance 24h/7j et paiement sécurisé.</p>
        </div>
        <a href="#flotte" class="btn-outline">Voir la flotte</a>
      </section>
    </main>
  `;
}

export function init() {
  
}

export function afterRender() {
  initNavbar();
}