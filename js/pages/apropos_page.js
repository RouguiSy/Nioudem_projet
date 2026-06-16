export const aproposPage = `
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
    <a href="#tarifs" class="nav-link">Tarifs</a>
    <a href="#carte" class="nav-link">Itinéraires</a>
    <a href="#apropos" class="nav-link active">À propos</a>
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
