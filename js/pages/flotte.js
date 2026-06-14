export const flottePage = `
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
    <a href="#flotte"  class="nav-link active">Notre Flotte</a>
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

<div class="flotte-page">

  <div class="flotte-header">
    <div class="section-tag">NOTRE FLOTTE</div>
    <h1 class="flotte-title">Choisissez votre véhicule</h1>
    <p class="flotte-sub">Des véhicules premium pour chaque occasion, inspectés régulièrement.</p>
  </div>

  <div class="flotte-filters">
    <button class="filter-btn active" data-filter="tous">Tous</button>
    <button class="filter-btn" data-filter="berline">Berline</button>
    <button class="filter-btn" data-filter="suv">SUV</button>
    <button class="filter-btn" data-filter="van">Van</button>
    <button class="filter-btn" data-filter="minibus">Minibus</button>
  </div>

  <div class="flotte-grid" id="flotte-grid">

    <div class="car-card" data-categorie="berline">
      <div class="car-status disponible">DISPONIBLE</div>
      <div class="car-scene">
        <div class="car-3d">
           <img src="js/assets/images/Mercedes.png" alt="oups">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">BERLINE LUXE</div>
        <div class="car-nom">Mercedes Classe S</div>
        <div class="car-tags">
          <span class="car-tag">Climatisation</span>
          <span class="car-tag">WiFi</span>
          <span class="car-tag">Cuir</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            4 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Automatique
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">45 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-yellow btn-reserver" onclick="window.location.hash='reservation'">Réserver</button>
        </div>
      </div>
    </div>

    <div class="car-card" data-categorie="berline">
      <div class="car-status reserve">RÉSERVÉ</div>
      <div class="car-scene">
        <div class="car-3d">
          <img src="js/assets/images/BMW.png" alt="oups">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">EXECUTIVE</div>
        <div class="car-nom">BMW Série 7</div>
        <div class="car-tags">
          <span class="car-tag">Massage</span>
          <span class="car-tag">4 écrans</span>
          <span class="car-tag">Bar</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            4 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Automatique
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">60 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-indispo" disabled>Indisponible</button>
        </div>
      </div>
    </div>

    <div class="car-card" data-categorie="berline">
      <div class="car-status disponible">DISPONIBLE</div>
      <div class="car-scene">
        <div class="car-3d">
                <img src="js/assets/images/Peugeot.png" alt="oups">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">BERLINE CONFORT</div>
        <div class="car-nom">Peugeot 508</div>
        <div class="car-tags">
          <span class="car-tag">Clim</span>
          <span class="car-tag">Bluetooth</span>
          <span class="car-tag">GPS</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            4 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Automatique
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">30 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-yellow btn-reserver" onclick="window.location.hash='reservation'">Réserver</button>
        </div>
      </div>
    </div>

    <div class="car-card" data-categorie="suv">
      <div class="car-status disponible">DISPONIBLE</div>
      <div class="car-scene">
        <div class="car-3d">
            <img src="js/assets/images/Toyota.png" alt="oups">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">SUV PREMIUM</div>
        <div class="car-nom">Toyota Land Cruiser</div>
        <div class="car-tags">
          <span class="car-tag">7 places</span>
          <span class="car-tag">4x4</span>
          <span class="car-tag">Cuir</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            7 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Automatique
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">55 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-yellow btn-reserver" onclick="window.location.hash='reservation'">Réserver</button>
        </div>
      </div>
    </div>

    <div class="car-card" data-categorie="van">
      <div class="car-status disponible">DISPONIBLE</div>
      <div class="car-scene">
        <div class="car-3d">
            <img src="js/assets/images/hiace.png" alt="oups">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">VAN CONFORT</div>
        <div class="car-nom">Toyota Hiace</div>
        <div class="car-tags">
          <span class="car-tag">Clim</span>
          <span class="car-tag">USB</span>
          <span class="car-tag">Spacieux</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            9 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Manuelle
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">40 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-yellow btn-reserver" onclick="window.location.hash='reservation'">Réserver</button>
        </div>
      </div>
    </div>

    <div class="car-card" data-categorie="minibus">
      <div class="car-status disponible">DISPONIBLE</div>
      <div class="car-scene">
        <div class="car-3d">
            <img src="js/assets/images/Sprinter_Van.png" alt="">
        </div>
      </div>
      <div class="car-info">
        <div class="car-categorie">MINIBUS</div>
        <div class="car-nom">Mercedes Sprinter</div>
        <div class="car-tags">
          <span class="car-tag">Clim</span>
          <span class="car-tag">WiFi</span>
          <span class="car-tag">Groupe</span>
        </div>
        <div class="car-specs">
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
            16 places
          </span>
          <span class="car-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="2"/></svg>
            Manuelle
          </span>
        </div>
        <div class="car-footer">
          <div class="car-prix"><span class="prix-num">75 000</span> <span class="prix-unit">FCFA/h</span></div>
          <button class="btn-yellow btn-reserver" onclick="window.location.hash='reservation'">Réserver</button>
        </div>
      </div>
    </div>

  </div>

  <div class="flotte-cta">
    <div class="flotte-cta-left">
      <h3>Besoin d'un véhicule spécifique ?</h3>
      <p>Contactez-nous pour des devis personnalisés et des locations longue durée.</p>
    </div>
    <button class="btn-yellow" onclick="window.location.hash='reservation'">Nous contacter →</button>
  </div>

</div>

<script>
(function() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.car-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        if (filter === 'tous' || card.dataset.categorie === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
</script>
`;