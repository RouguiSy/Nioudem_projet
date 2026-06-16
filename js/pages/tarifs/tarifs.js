export const tarifsPage = `
<nav class="navbar">
  <a href="#accueil" class="logo">
    <div class="logo-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
        <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/>
        <circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
      </svg>
    </div>
    <span class="logo-text">ŇiouDeem</span>
  </a>

  <div class="nav-links">
    <a href="#accueil" class="nav-link">Accueil</a>
    <a href="#flotte" class="nav-link">Notre Flotte</a>
    <a href="#tarifs" class="nav-link active">Tarifs</a>
    <a href="#carte" class="nav-link">Itinéraires</a>
    <a href="#apropos" class="nav-link">À propos</a>
  </div>

  <div class="nav-actions">
    <button class="theme-btn" data-theme-toggle><span class="theme-icon">☀️</span></button>
    <a id="nav-connexion" href="#connexion" class="btn-outline">Connexion</a>
    <div id="nav-user" class="nav-user-pill" style="display:none">
      <div class="nav-user-avatar" id="nav-user-initials">?</div>
      <span class="nav-user-name" id="nav-user-name">Compte</span>
    </div>
    <a href="#reservation" class="btn-yellow">Réserver →</a>
  </div>
</nav>

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
