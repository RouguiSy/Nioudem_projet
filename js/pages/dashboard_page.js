export const dashboardPage = `
<div class="dashboard">
  <aside class="db-sidebar">
    <div class="db-sidebar-header">
      <a href="#accueil" class="logo">
        <div class="logo-icon logo-icon--sm"><svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/><circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/><circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/></svg></div>
        <span class="logo-text logo-text--sm">ŇiouDeem</span>
      </a>
      <button onclick="NiouDeem.toggleTheme()" class="theme-btn"><span class="theme-icon">☀️</span></button>
    </div>

    <nav class="db-nav">
      <button class="db-nav-item active" data-section="tableau">⊞&nbsp; Tableau de bord</button>
      <button class="db-nav-item" data-section="reservations">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M0 0h512v512H0z" fill="none"/><path fill="#808080" d="M131.3 20.35c-14.6.1-28.1 10-31.93 24.82c-2.33 9.13-.55 18.4 4.13 25.84c-7.67 4.26-13.69 11.53-16.03 20.66c-2.32 9.13-.56 18.33 4.1 25.83a32.7 32.7 0 0 0-15.96 20.6c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.33 9.1-.54 18.4 4.19 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.08 20.7c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.35 9.2-.51 18.5 4.3 26a32.92 32.92 0 0 0-16.28 20.8c-4.48 17.5 6.25 35.6 23.79 40.1l.1-.2l31.71 8.2l-1.47 5.7l261.56 67L374 326.5l-22.4 21.2l-87.8 26.5l15.5-42.5l-151.7-38.8l4.4-17.4l153.5 39.3l9.7-26.7l15.3-14.4l-167-42.8l4.4-17.4l178 45.6l39.6-37.4l-206.1-52.8l4.4-17.4L380.7 207l-.1.4l31.5-29.8l18.3-71.4l-261.6-67.04z"/></svg>
        &nbsp; Réservations
      </button>
      <button class="db-nav-item" data-section="flotte">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#808080" d="M14 5a1 1 0 0 1 .694.28l.087.095L18.48 10H19a3 3 0 0 1 2.995 2.824L22 13v4a1 1 0 0 1-1 1h-1.171a3.001 3.001 0 0 1-5.658 0H9.829a3.001 3.001 0 0 1-5.658 0H3a1 1 0 0 1-1-1v-6l.007-.117l.008-.056l.017-.078l.012-.036l.014-.05l2.014-5.034A1 1 0 0 1 5 5zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-6-9H5.676l-1.2 3H11zm2.52 0H13v3h2.92z"/></svg>
        &nbsp; Flotte
      </button>
      <button class="db-nav-item" data-section="chauffeurs">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#808080" d="M4 22a8 8 0 1 1 16 0zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6"/></svg>
        &nbsp; Chauffeurs
      </button>
      <button class="db-nav-item" data-section="clients">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#808080" fill-rule="evenodd" d="M8 13a3 3 0 1 1 0-6a3 3 0 0 1 0 6m8 0a3 3 0 1 1 0-6a3 3 0 0 1 0 6m-8 2a7.98 7.98 0 0 1 6 2.708V19H2v-1.292A7.98 7.98 0 0 1 8 15m8 4v-2.048l-.5-.567a10 10 0 0 0-1.25-1.193A8 8 0 0 1 16 15a7.98 7.98 0 0 1 6 2.708V19z"/></svg>
        &nbsp; Clients
      </button>
      <button class="db-nav-item" data-section="itineraires">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 512 512"><path d="M0 0h512v512H0z" fill="none"/><path fill="#808080" d="M48.17 113.34A32 32 0 0 0 32 141.24V438a32 32 0 0 0 47 28.37c.43-.23.85-.47 1.26-.74l84.14-55.05a8 8 0 0 0 3.63-6.72V46.45a8 8 0 0 0-12.51-6.63Zm164.19-74.03A8 8 0 0 0 200 46v357.56a8 8 0 0 0 3.63 6.72l96 62.42A8 8 0 0 0 312 466V108.67a8 8 0 0 0-3.64-6.73Zm252.17 7.16a31.64 31.64 0 0 0-31.5-.88a12 12 0 0 0-1.25.74l-84.15 55a8 8 0 0 0-3.63 6.72v357.46a8 8 0 0 0 12.52 6.63l107.07-73.46a32 32 0 0 0 16.41-28v-296a32.76 32.76 0 0 0-15.47-28.21"/></svg>
        &nbsp; 
        <a href="#carte"   class="nav-link">Itinéraires</a>
      </button>
      <button class="db-nav-item" data-section="incidents">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path d="M0 0h2048v2048H0z" fill="none"/><path fill="#808080" d="M1920 2048H0L960 128zm-896-384H896v128h128zm0-128V896H896v640z"/></svg>
        &nbsp; Incidents
      </button>
      <button class="db-nav-item" data-section="paiements">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path d="M0 0h56v56H0z" fill="none"/><path fill="#808080" d="M2.266 17.734h51.468v-2.18c0-4.827-2.46-7.265-7.359-7.265H9.625c-4.898 0-7.36 2.438-7.36 7.266Zm0 22.735c0 4.828 2.46 7.242 7.359 7.242h36.75c4.898 0 7.36-2.414 7.36-7.242V23.055H2.264Zm7.828-5.719v-4.336c0-1.312.914-2.25 2.297-2.25h5.742c1.383 0 2.297.938 2.297 2.25v4.336c0 1.336-.914 2.25-2.297 2.25H12.39c-1.383 0-2.297-.914-2.297-2.25"/></svg>
        &nbsp; Paiements
      </button>
      <button class="db-nav-item" data-section="rapports">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#808080" d="M2.75 2a.75.75 0 0 0-1.5 0v10.057c0 2.309 0 4.118.19 5.53c.194 1.444.6 2.584 1.494 3.479c.895.895 2.035 1.3 3.48 1.494c1.411.19 3.22.19 5.529.19H22a.75.75 0 0 0 0-1.5H12c-2.378 0-4.086-.002-5.386-.176c-1.279-.172-2.05-.5-2.62-1.069c-.569-.57-.896-1.34-1.068-2.619c-.174-1.3-.176-3.008-.176-5.386z"/><path fill="#808080" d="M19.588 7.466a.75.75 0 1 0-1.175-.932l-3.118 3.926c-.245.309-.406.51-.539.656c-.13.143-.19.183-.218.198a.75.75 0 0 1-.678.014c-.028-.013-.09-.05-.227-.187c-.138-.14-.308-.335-.566-.633l-.017-.018c-.237-.274-.44-.508-.62-.688a2.3 2.3 0 0 0-.64-.483a2.25 2.25 0 0 0-2.035.044a2.3 2.3 0 0 0-.62.51c-.17.188-.363.43-.589.715l-3.133 3.946a.75.75 0 1 0 1.174.932l3.119-3.926c.245-.309.406-.51.538-.656c.13-.143.19-.183.218-.198a.75.75 0 0 1 .678-.014c.029.013.091.05.227.187c.139.14.308.335.567.633l.016.018c.238.274.44.508.62.688c.185.187.389.362.64.483a2.25 2.25 0 0 0 2.035-.044a2.4 2.4 0 0 0 .62-.51c.17-.188.363-.43.59-.715z"/></svg>
        &nbsp; Rapports
      </button>
    </nav>

    <div class="db-sidebar-footer">
      <div class="db-user-row">
        <div class="db-user-avatar" id="db-avatar">AD</div>
        <div style="flex:1;min-width:0">
          <div class="db-user-name" id="db-username">Admin</div>
          <div class="db-user-role">Super Administrateur</div>
        </div>
        <button onclick="NiouDeem.logout()" id="db-logout-btn" title="Déconnexion">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
          Sortir
        </button>
      </div>
    </div>
  </aside>

  <main class="db-main">
    <div class="db-topbar">
      <div>
        <div class="db-topbar-title" id="db-section-title">Tableau de bord</div>
        <div class="db-topbar-sub" id="db-date">Chargement…</div>
      </div>
      <div class="db-topbar-actions">
        <button class="icon-btn">🔔</button>
        <button class="btn-yellow" style="font-size:13px;padding:9px 18px" onclick="window.location.hash='reservation'">+ Nouvelle réservation</button>
      </div>
    </div>

    <div class="db-content">

      <!-- KPIs — toujours visibles -->
      <div class="db-kpis">
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">📋</span><span class="db-kpi-delta badge badge-green">+4</span></div>
          <div class="db-kpi-val" style="color:#FACC15">23</div>
          <div class="db-kpi-lbl">Réservations actives</div>
        </div>
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">🚗</span><span class="db-kpi-delta badge badge-green">36%</span></div>
          <div class="db-kpi-val" style="color:#22C55E">18/50</div>
          <div class="db-kpi-lbl">Véhicules en service</div>
        </div>
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">💰</span><span class="db-kpi-delta badge badge-blue">+12%</span></div>
          <div class="db-kpi-val" style="color:#818CF8">2.8M</div>
          <div class="db-kpi-lbl">Revenus du jour (FCFA)</div>
        </div>
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">⚠️</span><span class="db-kpi-delta badge badge-red">−1</span></div>
          <div class="db-kpi-val" style="color:#FB923C">3</div>
          <div class="db-kpi-lbl">Incidents ouverts</div>
        </div>
      </div>

      <!-- ══ SECTION TABLEAU DE BORD ══ -->
      <div class="db-section active" id="section-tableau">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">Réservations en cours</span>
            <button class="btn-outline" style="font-size:12px;padding:6px 14px" onclick="document.querySelector('[data-section=reservations]').click()">Voir tout</button>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Client</th><th>Chauffeur</th><th>Voiture</th><th>Trajet</th><th>Durée</th><th>Statut</th><th>Montant</th></tr></thead>
              <tbody>
                <tr><td class="yellow">RES-001</td><td>Amadou Diallo</td><td class="muted">Ibrahima Sow</td><td class="muted">Mercedes S</td><td><div>Dakar - Plateau</div><div class="muted" style="font-size:11px">→ Aéroport LSS</div></td><td class="muted">09:00 – 10:30</td><td><span class="badge badge-green">En cours</span></td><td style="font-weight:700">45 000 F</td></tr>
                <tr><td class="yellow">RES-002</td><td>Fatou Ndiaye</td><td class="muted">Moussa Ba</td><td class="muted">Toyota LC</td><td><div>Almadies</div><div class="muted" style="font-size:11px">→ Thiès</div></td><td class="muted">07:00 – 10:00</td><td><span class="badge badge-gray">Terminé</span></td><td style="font-weight:700">120 000 F</td></tr>
                <tr><td class="yellow">RES-003</td><td>Oumar Sarr</td><td class="muted">Seydou Diouf</td><td class="muted">BMW Série 7</td><td><div>Mermoz</div><div class="muted" style="font-size:11px">→ Saly</div></td><td class="muted">14:00 – 17:30</td><td><span class="badge badge-yellow">Planifié</span></td><td style="font-weight:700">180 000 F</td></tr>
                <tr><td class="yellow">RES-004</td><td>Aïssatou Fall</td><td class="muted">Cheikh Kane</td><td class="muted">Hyundai Staria</td><td><div>Point E</div><div class="muted" style="font-size:11px">→ Saint-Louis</div></td><td class="muted">06:00 – 14:00</td><td><span class="badge badge-yellow">Planifié</span></td><td style="font-weight:700">320 000 F</td></tr>
                <tr><td class="yellow">RES-005</td><td>Mamadou Touré</td><td class="muted">Aliou Mbaye</td><td class="muted">Peugeot 508</td><td><div>Sacré-Cœur</div><div class="muted" style="font-size:11px">→ Dakar Port</div></td><td class="muted">11:00 – 12:00</td><td><span class="badge badge-red">Annulé</span></td><td style="font-weight:700">30 000 F</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">👥 Clients inscrits</span>
            <span class="badge badge-blue" id="db-client-count">— comptes</span>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Rôle</th><th>Inscrit le</th></tr></thead>
              <tbody id="db-clients-body"><tr><td colspan="6" class="muted" style="text-align:center;padding:24px">Chargement…</td></tr></tbody>
            </table>
          </div>
        </div>

        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">⚠️ Incidents récents</span>
            <button class="btn-outline" style="font-size:12px;padding:6px 14px;color:#EF4444;border-color:rgba(239,68,68,.3)">+ Signaler</button>
          </div>
          <div style="padding:16px 22px;display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(251,146,60,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">⚠️</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Accident mineur</div><div style="color:var(--txt-sub);font-size:12px">Mercedes S · Ibrahima Sow · 08/06/2025</div></div>
              <span class="badge badge-yellow">En traitement</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(34,197,94,.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🔧</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Panne moteur</div><div style="color:var(--txt-sub);font-size:12px">Peugeot 508 · Aliou Mbaye · 05/06/2025</div></div>
              <span class="badge badge-green">Résolu</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SECTION RÉSERVATIONS ══ -->
      <div class="db-section" id="section-reservations">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">Réservations en cours</span>
            <button class="btn-yellow" style="font-size:12px;padding:6px 14px" onclick="window.location.hash='reservation'">+ Nouvelle</button>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Client</th><th>Chauffeur</th><th>Voiture</th><th>Trajet</th><th>Durée</th><th>Statut</th><th>Montant</th></tr></thead>
              <tbody>
                <tr><td class="yellow">RES-001</td><td>Amadou Diallo</td><td class="muted">Ibrahima Sow</td><td class="muted">Mercedes S</td><td><div>Dakar - Plateau</div><div class="muted" style="font-size:11px">→ Aéroport LSS</div></td><td class="muted">09:00 – 10:30</td><td><span class="badge badge-green">En cours</span></td><td style="font-weight:700">45 000 F</td></tr>
                <tr><td class="yellow">RES-002</td><td>Fatou Ndiaye</td><td class="muted">Moussa Ba</td><td class="muted">Toyota LC</td><td><div>Almadies</div><div class="muted" style="font-size:11px">→ Thiès</div></td><td class="muted">07:00 – 10:00</td><td><span class="badge badge-gray">Terminé</span></td><td style="font-weight:700">120 000 F</td></tr>
                <tr><td class="yellow">RES-003</td><td>Oumar Sarr</td><td class="muted">Seydou Diouf</td><td class="muted">BMW Série 7</td><td><div>Mermoz</div><div class="muted" style="font-size:11px">→ Saly</div></td><td class="muted">14:00 – 17:30</td><td><span class="badge badge-yellow">Planifié</span></td><td style="font-weight:700">180 000 F</td></tr>
                <tr><td class="yellow">RES-004</td><td>Aïssatou Fall</td><td class="muted">Cheikh Kane</td><td class="muted">Hyundai Staria</td><td><div>Point E</div><div class="muted" style="font-size:11px">→ Saint-Louis</div></td><td class="muted">06:00 – 14:00</td><td><span class="badge badge-yellow">Planifié</span></td><td style="font-weight:700">320 000 F</td></tr>
                <tr><td class="yellow">RES-005</td><td>Mamadou Touré</td><td class="muted">Aliou Mbaye</td><td class="muted">Peugeot 508</td><td><div>Sacré-Cœur</div><div class="muted" style="font-size:11px">→ Dakar Port</div></td><td class="muted">11:00 – 12:00</td><td><span class="badge badge-red">Annulé</span></td><td style="font-weight:700">30 000 F</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION FLOTTE ══ -->
      <div class="db-section" id="section-flotte">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">🚗 Gestion de la Flotte</span>
            <button class="btn-yellow" style="font-size:12px;padding:6px 14px">+ Ajouter</button>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Modèle</th><th>Catégorie</th><th>Places</th><th>Statut</th><th>Prix/h</th></tr></thead>
              <tbody>
                <tr><td class="yellow">VEH-01</td><td style="font-weight:600">Mercedes Classe S</td><td class="muted">Berline Luxe</td><td class="muted">4</td><td><span class="badge badge-green">Disponible</span></td><td style="font-weight:700;color:var(--yellow)">45 000 F</td></tr>
                <tr><td class="yellow">VEH-02</td><td style="font-weight:600">BMW Série 7</td><td class="muted">Executive</td><td class="muted">4</td><td><span class="badge badge-red">Réservé</span></td><td style="font-weight:700;color:var(--yellow)">60 000 F</td></tr>
                <tr><td class="yellow">VEH-03</td><td style="font-weight:600">Peugeot 508</td><td class="muted">Berline Confort</td><td class="muted">4</td><td><span class="badge badge-green">Disponible</span></td><td style="font-weight:700;color:var(--yellow)">30 000 F</td></tr>
                <tr><td class="yellow">VEH-04</td><td style="font-weight:600">Toyota Land Cruiser</td><td class="muted">SUV Premium</td><td class="muted">7</td><td><span class="badge badge-green">Disponible</span></td><td style="font-weight:700;color:var(--yellow)">55 000 F</td></tr>
                <tr><td class="yellow">VEH-05</td><td style="font-weight:600">Toyota Hiace</td><td class="muted">Van Confort</td><td class="muted">9</td><td><span class="badge badge-yellow">En maintenance</span></td><td style="font-weight:700;color:var(--yellow)">40 000 F</td></tr>
                <tr><td class="yellow">VEH-06</td><td style="font-weight:600">Mercedes Sprinter</td><td class="muted">Minibus</td><td class="muted">16</td><td><span class="badge badge-green">Disponible</span></td><td style="font-weight:700;color:var(--yellow)">75 000 F</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION CHAUFFEURS ══ -->
      <div class="db-section" id="section-chauffeurs">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">Gestion des Chauffeurs</span>
            <button class="btn-yellow" style="font-size:12px;padding:6px 14px">+ Ajouter</button>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Nom</th><th>Téléphone</th><th>Véhicule</th><th>Statut</th><th>Note</th><th>Trajets</th><th>Action</th></tr></thead>
              <tbody>
                <tr><td class="yellow">CHF-01</td><td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);color:#111827;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center">IS</div>Ibrahima Sow</div></td><td class="muted">+221 77 123 4567</td><td class="muted">Mercedes S</td><td><span class="badge badge-green">En service</span></td><td style="color:var(--yellow);font-weight:700">4.9 ★</td><td class="muted">312</td><td><button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer</button></td></tr>
                <tr><td class="yellow">CHF-02</td><td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);color:#111827;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center">MB</div>Moussa Ba</div></td><td class="muted">+221 76 234 5678</td><td class="muted">Toyota LC</td><td><span class="badge badge-green">En service</span></td><td style="color:var(--yellow);font-weight:700">4.8 ★</td><td class="muted">245</td><td><button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer</button></td></tr>
                <tr><td class="yellow">CHF-03</td><td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);color:#111827;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center">SD</div>Seydou Diouf</div></td><td class="muted">+221 78 345 6789</td><td class="muted">BMW Série 7</td><td><span class="badge badge-blue">Disponible</span></td><td style="color:var(--yellow);font-weight:700">4.7 ★</td><td class="muted">198</td><td><button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer</button></td></tr>
                <tr><td class="yellow">CHF-04</td><td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);color:#111827;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center">CK</div>Cheikh Kane</div></td><td class="muted">+221 77 456 7890</td><td class="muted">Hyundai Staria</td><td><span class="badge badge-green">En service</span></td><td style="color:var(--yellow);font-weight:700">4.9 ★</td><td class="muted">421</td><td><button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer</button></td></tr>
                <tr><td class="yellow">CHF-05</td><td><div style="display:flex;align-items:center;gap:8px"><div style="width:32px;height:32px;border-radius:50%;background:var(--yellow);color:#111827;font-weight:800;font-size:11px;display:flex;align-items:center;justify-content:center">AM</div>Aliou Mbaye</div></td><td class="muted">+221 76 567 8901</td><td class="muted">Peugeot 508</td><td><span class="badge badge-gray">Congé</span></td><td style="color:var(--yellow);font-weight:700">4.6 ★</td><td class="muted">167</td><td><button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer</button></td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION CLIENTS ══ -->
      <div class="db-section" id="section-clients">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">👥 Clients inscrits</span>
            <span class="badge badge-blue" id="db-client-count2">— comptes</span>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Nom</th><th>Email</th><th>Téléphone</th><th>Rôle</th><th>Inscrit le</th></tr></thead>
              <tbody id="db-clients-body2"><tr><td colspan="6" class="muted" style="text-align:center;padding:24px">Chargement…</td></tr></tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION ITINÉRAIRES ══ -->
      <div class="db-section" id="section-itineraires">
        <div class="db-card">
          <div class="db-card-header"><span class="db-card-title">🗺️ Trajets en cours</span></div>
          <div style="padding:20px;display:flex;flex-direction:column;gap:12px">
            <div style="background:var(--bg-input);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:10px;height:10px;border-radius:50%;background:#FACC15"></div>
                <div><div style="font-weight:700;color:var(--txt-main)">Ibrahima Sow</div><div style="font-size:12px;color:var(--txt-sub)">Mercedes S • Plateau → Aéroport LSS</div></div>
              </div>
              <div style="text-align:right"><div style="color:#22C55E;font-weight:800;font-size:13px">10 min ETA</div><div style="font-size:11px;color:var(--txt-faint)">76% du trajet</div></div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:10px;height:10px;border-radius:50%;background:#22C55E"></div>
                <div><div style="font-weight:700;color:var(--txt-main)">Moussa Ba</div><div style="font-size:12px;color:var(--txt-sub)">Toyota LC • Almadies → Thiès</div></div>
              </div>
              <div style="text-align:right"><div style="color:#818CF8;font-weight:800;font-size:13px">2h 30min ETA</div><div style="font-size:11px;color:var(--txt-faint)">41% du trajet</div></div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:10px;height:10px;border-radius:50%;background:#60A5FA"></div>
                <div><div style="font-weight:700;color:var(--txt-main)">Seydou Diouf</div><div style="font-size:12px;color:var(--txt-sub)">BMW 7 • Mermoz → Saly</div></div>
              </div>
              <div style="text-align:right"><div style="color:#FB923C;font-weight:800;font-size:13px">1h 20min ETA</div><div style="font-size:11px;color:var(--txt-faint)">77% du trajet</div></div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:16px;display:flex;justify-content:space-between;align-items:center">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:10px;height:10px;border-radius:50%;background:#A78BFA"></div>
                <div><div style="font-weight:700;color:var(--txt-main)">Cheikh Kane</div><div style="font-size:12px;color:var(--txt-sub)">Staria • Point E → Saint-Louis</div></div>
              </div>
              <div style="text-align:right"><div style="color:#EF4444;font-weight:800;font-size:13px">3h 10min ETA</div><div style="font-size:11px;color:var(--txt-faint)">51% du trajet</div></div>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SECTION INCIDENTS ══ -->
      <div class="db-section" id="section-incidents">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">⚠️ Incidents & Imprévus</span>
            <button class="btn-outline" style="font-size:12px;padding:6px 14px;color:#EF4444;border-color:rgba(239,68,68,.3)">+ Signaler</button>
          </div>
          <div style="padding:16px 22px;display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(251,146,60,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">⚠️</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Accident mineur</div><div style="color:var(--txt-sub);font-size:12px">Mercedes S · Ibrahima Sow · 08/06/2025</div></div>
              <span class="badge badge-yellow">En traitement</span>
              <button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer →</button>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(34,197,94,.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🔧</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Panne moteur</div><div style="color:var(--txt-sub);font-size:12px">Peugeot 508 · Aliou Mbaye · 05/06/2025</div></div>
              <span class="badge badge-green">Résolu</span>
              <button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer →</button>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(239,68,68,.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">🚨</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Retard client</div><div style="color:var(--txt-sub);font-size:12px">Toyota LC · Moussa Ba · 09/06/2025</div></div>
              <span class="badge badge-red">Ouvert</span>
              <button class="btn-outline" style="font-size:11px;padding:4px 10px">Gérer →</button>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SECTION PAIEMENTS ══ -->
      <div class="db-section" id="section-paiements">
        <div class="db-card">
          <div class="db-card-header"><span class="db-card-title">💳 Historique des paiements</span></div>
          <div style="padding:16px 22px;display:flex;flex-direction:column;gap:10px">
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(250,204,21,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">💳</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Amadou Diallo</div><div style="color:var(--txt-sub);font-size:12px">PAY-001 · Wave · 09/06/2025 09:15</div></div>
              <div style="font-weight:800;color:var(--txt-main)">45 000 F</div>
              <span class="badge badge-green">Confirmé</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(250,204,21,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">💳</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Fatou Ndiaye</div><div style="color:var(--txt-sub);font-size:12px">PAY-002 · Orange Money · 09/06/2025 07:30</div></div>
              <div style="font-weight:800;color:var(--txt-main)">120 000 F</div>
              <span class="badge badge-green">Confirmé</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(250,204,21,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">💳</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Oumar Sarr</div><div style="color:var(--txt-sub);font-size:12px">PAY-003 · Carte Visa · 08/06/2025 14:00</div></div>
              <div style="font-weight:800;color:var(--txt-main)">180 000 F</div>
              <span class="badge badge-yellow">En attente</span>
            </div>
            <div style="display:flex;align-items:center;gap:14px;background:var(--bg-input);border-radius:12px;padding:14px 16px">
              <div style="width:36px;height:36px;border-radius:10px;background:rgba(250,204,21,.12);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0">💳</div>
              <div style="flex:1"><div style="font-weight:700;font-size:14px;color:var(--txt-main)">Mamadou Touré</div><div style="color:var(--txt-sub);font-size:12px">PAY-004 · Wave · 08/06/2025 11:00</div></div>
              <div style="font-weight:800;color:var(--txt-main)">30 000 F</div>
              <span class="badge badge-blue">Remboursé</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ══ SECTION RAPPORTS ══ -->
      <div class="db-section" id="section-rapports">
        <div class="db-card">
          <div class="db-card-header"><span class="db-card-title">📊 Rapports & Statistiques</span></div>
          <div style="padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div style="background:var(--bg-input);border-radius:14px;padding:20px">
              <div style="font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:1px;margin-bottom:8px">REVENUS CE MOIS</div>
              <div style="font-size:32px;font-weight:900;color:var(--txt-main)">42.6M <span style="font-size:14px;color:var(--txt-sub)">FCFA</span></div>
              <div style="color:#22C55E;font-size:13px;margin-top:4px">↑ +18% vs mois dernier</div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:20px">
              <div style="font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:1px;margin-bottom:8px">TRAJETS CE MOIS</div>
              <div style="font-size:32px;font-weight:900;color:var(--txt-main)">284</div>
              <div style="color:#22C55E;font-size:13px;margin-top:4px">↑ +12% vs mois dernier</div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:20px">
              <div style="font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:1px;margin-bottom:8px">TAUX DE SATISFACTION</div>
              <div style="font-size:32px;font-weight:900;color:var(--txt-main)">98%</div>
              <div style="color:var(--txt-sub);font-size:13px;margin-top:4px">Basé sur 2 400+ avis</div>
            </div>
            <div style="background:var(--bg-input);border-radius:14px;padding:20px">
              <div style="font-size:12px;font-weight:700;color:var(--yellow);letter-spacing:1px;margin-bottom:8px">NOUVEAUX CLIENTS</div>
              <div style="font-size:32px;font-weight:900;color:var(--txt-main)">47</div>
              <div style="color:#22C55E;font-size:13px;margin-top:4px">↑ +9% vs mois dernier</div>
            </div>
          </div>
          <div style="padding:0 24px 24px">
            <div style="font-size:14px;font-weight:700;color:var(--txt-main);margin-bottom:12px">Top véhicules ce mois</div>
            <div style="display:flex;flex-direction:column;gap:8px">
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:120px;font-size:13px;color:var(--txt-sub)">Mercedes S</div>
                <div style="flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="width:85%;height:100%;background:var(--yellow);border-radius:4px"></div></div>
                <div style="font-size:13px;font-weight:700;color:var(--txt-main);width:40px;text-align:right">85%</div>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:120px;font-size:13px;color:var(--txt-sub)">Toyota LC</div>
                <div style="flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="width:72%;height:100%;background:#818CF8;border-radius:4px"></div></div>
                <div style="font-size:13px;font-weight:700;color:var(--txt-main);width:40px;text-align:right">72%</div>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:120px;font-size:13px;color:var(--txt-sub)">BMW Série 7</div>
                <div style="flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="width:61%;height:100%;background:#22C55E;border-radius:4px"></div></div>
                <div style="font-size:13px;font-weight:700;color:var(--txt-main);width:40px;text-align:right">61%</div>
              </div>
              <div style="display:flex;align-items:center;gap:12px">
                <div style="width:120px;font-size:13px;color:var(--txt-sub)">Peugeot 508</div>
                <div style="flex:1;height:8px;background:var(--border);border-radius:4px;overflow:hidden"><div style="width:48%;height:100%;background:#FB923C;border-radius:4px"></div></div>
                <div style="font-size:13px;font-weight:700;color:var(--txt-main);width:40px;text-align:right">48%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </main>
</div>

<style>
.db-section { display:none; }
.db-section.active { display:block; }
</style>
`;