export const accueilPage =
     `
       <nav class="navbar">
  <a href="#accueil" class="logo">
    <div class="logo-icon">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
        <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/><circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
      </svg>
    </div>
    <span class="logo-text">ŇiouDeem</span>
  </a>

  <div class="nav-links">
    <a href="#accueil" class="nav-link active">Accueil</a>
    <a href="#flotte"  class="nav-link">Notre Flotte</a>
    <a href="#tarifs"  class="nav-link">Tarifs</a>
    <a href="#carte"   class="nav-link">Itinéraires</a>
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

<section class="hero">
  <div class="hero-left">
    <div class="hero-badge"><span class="badge-dot"></span><span>Service Premium — Dakar, Sénégal</span></div>
    <h1 class="hero-title">Location de<br>voiture avec<br><span class="gradient-text">chauffeur</span></h1>
    <p class="hero-sub">Voyagez avec style et confort à travers le Sénégal. Chauffeurs professionnels, véhicules premium, disponibles 24h/7j.</p>
    <div class="hero-btns">
      <a href="#reservation" class="btn-yellow btn-lg">Réserver maintenant</a>
      <a href="#flotte" class="btn-ghost btn-lg">
        <span class="play-circle"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M5 3l14 9L5 21V3z"/></svg></span>
        Voir la flotte
      </a>
    </div>
    <div>
      <p class="payment-label">Paiement accepté</p>
      <div class="payment-badges">
        <span class="payment-badge">Wave</span>
        <span class="payment-badge">Orange Money</span>
        <span class="payment-badge">Free Money</span>
        <span class="payment-badge">Carte Visa</span>
      </div>
    </div>
  </div>

  <div class="hero-right">
    <div class="car-img-wrap">
      <img src="js/assets/images/ma_voiture.jpeg" alt="Voiture de luxe" class="car-img" />
      <div class="img-overlay"></div>
    </div>
    <div class="driver-card">
      <div class="driver-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#111827"/>
        </svg>
      </div>
      <div class="driver-info">
        <div class="driver-name">Chauffeur certifié</div>
        <div class="driver-desc">Tous nos chauffeurs sont formés & assurés</div>
      </div>
      <div class="driver-rating">
        <div class="rating-num">4.9</div>
        <div class="rating-stars">★★★★★</div>
      </div>
    </div>
  </div>
</section>

<section class="stats-strip">
  <div class="stat-card"><div class="stat-num">50+</div><div class="stat-label">Véhicules disponibles</div><div class="stat-sub">Berlines, SUV, Minibus</div></div>
  <div class="stat-card"><div class="stat-num">120+</div><div class="stat-label">Chauffeurs actifs</div><div class="stat-sub">Formés et certifiés</div></div>
  <div class="stat-card"><div class="stat-num">15</div><div class="stat-label">Villes couvertes</div><div class="stat-sub">Dakar à Saint-Louis</div></div>
  <div class="stat-card"><div class="stat-num">98%</div><div class="stat-label">Satisfaction client</div><div class="stat-sub">Basé sur 2 400+ avis</div></div>
</section>

<section class="features-section">
  <div class="section-header">
    <div class="section-tag">Pourquoi ŇiouDeem</div>
    <h2 class="section-title">Une expérience sans compromis</h2>
  </div>
  <div class="features-grid">
    <div class="feature-card"><div class="feat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512">
        <path d="M0 0h512v512H0z" fill="none" />
        <path fill="#facc15" d="M439.6 0H204.9L55.4 256h149.5l-128 256l341.3-320H247.5z" />
      </svg>
    </div>
    <div class="feat-title">Réservation instantanée</div><div class="feat-desc">Confirmez votre trajet en moins de 2 minutes.</div></div>
    <div class="feature-card"><div class="feat-icon"> 
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="#facc15" fill-opacity="0" stroke="#facc15" stroke-dasharray="60" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 2l-8 3.5v6.5c0 3.5 3.5 8 8 10c4.5 -1 8 -6.5 8 -10v-6.5l-8 -3.5Z">
          <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.6s" values="60;0" />
          <animate fill="freeze" attributeName="fill-opacity" begin="0.6s" dur="0.4s" to="1" />
        </path>
      </svg>
    </div>
    <div class="feat-title">Sécurité garantie</div><div class="feat-desc">Chauffeurs vérifiés, formés et couverts par assurance.</div></div>
    <div class="feature-card"><div class="feat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="#facc15" fill-rule="evenodd" d="M11.906 1.994a8 8 0 0 1 8.09 8.421a8 8 0 0 1-1.297 3.957a1 1 0 0 1-.133.204l-.108.129q-.268.365-.573.699l-5.112 6.224a1 1 0 0 1-1.545 0L5.982 15.26l-.002-.002a18 18 0 0 1-.309-.38l-.133-.163a1 1 0 0 1-.13-.202a7.995 7.995 0 0 1 6.498-12.518ZM15 9.997a3 3 0 1 1-5.999 0a3 3 0 0 1 5.999 0" clip-rule="evenodd" />
      </svg>
    </div>
    <div class="feat-title">Suivi en temps réel</div><div class="feat-desc">Suivez votre chauffeur en direct sur la carte.</div></div>
    <div class="feature-card"><div class="feat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <g fill="none">
          <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
          <path fill="#facc15" d="M22 10v7a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-7zm-4 4h-3a1 1 0 1 0 0 2h3a1 1 0 1 0 0-2m1-10a3 3 0 0 1 3 3v1H2V7a3 3 0 0 1 3-3z" />
        </g>
      </svg>
    </div>
    <div class="feat-title">Paiement mobile</div><div class="feat-desc">Wave, Orange Money, Free Money — payez librement.</div></div>
    <div class="feature-card"><div class="feat-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0z" fill="none" />
        <path fill="#facc15" d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2m4.2 14.2L11 13V7h1.5v5.2l4.5 2.7z" />
      </svg>
    </div>
    <div class="feat-title">Disponible 24h/7j</div><div class="feat-desc">Nos chauffeurs sont disponibles à toute heure.</div></div>
    <div class="feature-card">
      <div class="feat-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
          <path d="M0 0h24v24H0z" fill="none" />
          <path fill="#facc15" d="M14 5a1 1 0 0 1 .694.28l.087.095L18.48 10H19a3 3 0 0 1 2.995 2.824L22 13v4a1 1 0 0 1-1 1h-1.171a3.001 3.001 0 0 1-5.658 0H9.829a3.001 3.001 0 0 1-5.658 0H3a1 1 0 0 1-1-1v-6l.007-.117l.008-.056l.017-.078l.012-.036l.014-.05l2.014-5.034A1 1 0 0 1 5 5zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-6-9H5.676l-1.2 3H11zm2.52 0H13v3h2.92z" />
        </svg>
      </div>
      <div class="feat-title">Flotte premium</div><div class="feat-desc">Berlines, SUV, minibus — pour chaque occasion.</div>
    </div>
  </div>
</section>

<section class="cta-section">
  <div class="cta-box">
    <h2 class="cta-title">Prêt à voyager ?</h2>
    <p class="cta-sub">Réservez maintenant en 2 minutes. Votre chauffeur vous attend.</p>
    <a href="#reservation" class="btn-yellow btn-lg">Réserver votre trajet →</a>
  </div>
</section>

<footer class="footer">
  <div class="logo">
    <div class="logo-icon logo-icon--sm">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
        <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/><circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
      </svg>
    </div>
    <span class="logo-text logo-text--sm">ŇiouDeem</span>
  </div>
  <div class="footer-copy">© 2025 ŇiouDeem. Tous droits réservés.</div>
  <div class="footer-loc">Dakar, Sénégal</div>
</footer>
`;


