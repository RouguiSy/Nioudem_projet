import { getSession, clearSession } from "../../session.js";
import { showToast } from "../../toast.js";
import { getUsers, getReservations, getVehicles, getDrivers, getIncidents,addVehicle, updateVehicle, deleteVehicle,addDriver, updateDriver, deleteDriver,addIncident, updateIncident, deleteIncident } from "../../db.js";
import { navigate } from "../../router.js";

export function render() {
  return `
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
        &nbsp; Itinéraires
      </button>
      <button class="db-nav-item" data-section="incidents">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 2048 2048"><path d="M0 0h2048v2048H0z" fill="none"/><path fill="#808080" d="M1920 2048H0L960 128zm-896-384H896v128h128zm0-128V896H896v640z"/></svg>
        &nbsp; Incidents
      </button>
      <button class="db-nav-item" data-section="paiements">
        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 56 56"><path d="M0 0h56v56H0z" fill="none"/><path fill="#808080" d="M2.266 17.734h51.468v-2.18c0-4.827-2.46-7.265-7.359-7.265H9.625c-4.898 0-7.36 2.438-7.36 7.266Zm0 22.735c0 4.828 2.46 7.242 7.359 7.242h36.75c4.898 0 7.36-2.414 7.36-7.242V23.055H2.264zm7.828-5.719v-4.336c0-1.312.914-2.25 2.297-2.25h5.742c1.383 0 2.297.938 2.297 2.25v4.336c0 1.336-.914 2.25-2.297 2.25H12.39c-1.383 0-2.297-.914-2.297-2.25"/></svg>
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
        <button id="db-logout-btn" title="Déconnexion">
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
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 512 512"><path d="M0 0h512v512H0z" fill="none"/><path fill="#FACC15" d="M131.3 20.35c-14.6.1-28.1 10-31.93 24.82c-2.33 9.13-.55 18.4 4.13 25.84c-7.67 4.26-13.69 11.53-16.03 20.66c-2.32 9.13-.56 18.33 4.1 25.83a32.7 32.7 0 0 0-15.96 20.6c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.33 9.1-.54 18.4 4.19 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.08 20.7c-2.34 9.1-.54 18.4 4.18 25.8c-7.72 4.3-13.75 11.5-16.09 20.7c-2.35 9.2-.51 18.5 4.3 26a32.92 32.92 0 0 0-16.28 20.8c-4.48 17.5 6.25 35.6 23.79 40.1l.1-.2l31.71 8.2l-1.47 5.7l261.56 67L374 326.5l-22.4 21.2l-87.8 26.5l15.5-42.5l-151.7-38.8l4.4-17.4l153.5 39.3l9.7-26.7l15.3-14.4l-167-42.8l4.4-17.4l178 45.6l39.6-37.4l-206.1-52.8l4.4-17.4L380.7 207l-.1.4l31.5-29.8l18.3-71.4l-261.6-67.04z"/></svg>
          <div class="db-kpi-val" id="kpi-active-res" style="color:#FACC15">—</div>
          <div class="db-kpi-lbl">Réservations actives</div>
        </div>
        <div class="db-kpi">
        <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#FACC15" d="M14 5a1 1 0 0 1 .694.28l.087.095L18.48 10H19a3 3 0 0 1 2.995 2.824L22 13v4a1 1 0 0 1-1 1h-1.171a3.001 3.001 0 0 1-5.658 0H9.829a3.001 3.001 0 0 1-5.658 0H3a1 1 0 0 1-1-1v-6l.007-.117l.008-.056l.017-.078l.012-.036l.014-.05l2.014-5.034A1 1 0 0 1 5 5zM7 16a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2m-6-9H5.676l-1.2 3H11zm2.52 0H13v3h2.92z"/></svg>
          <div class="db-kpi-val" id="kpi-vehicles" style="color:#22C55E">—</div>
          <div class="db-kpi-lbl">Véhicules en service</div>
        </div>
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">💰</span><span class="db-kpi-delta badge badge-blue">+12%</span></div>
          <div class="db-kpi-val" id="kpi-revenue" style="color:#818CF8">—</div>
          <div class="db-kpi-lbl">Revenus du jour (FCFA)</div>
        </div>
        <div class="db-kpi">
          <div class="db-kpi-top"><span class="db-kpi-icon">⚠️</span><span class="db-kpi-delta badge badge-red">−1</span></div>
          <div class="db-kpi-val" id="kpi-incidents" style="color:#FB923C">—</div>
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
              <tbody id="db-res-body-home">
                <tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Chargement…</td></tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="db-card">
          <div class="db-card-header">
            <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24">
	<path d="M0 0h24v24H0z" fill="none" />
	<path fill="#facc15" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7" />
</svg>

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
            <button class="btn-outline" style="font-size:12px;padding:6px 14px;color:#EF4444;border-color:rgba(239,68,68,.3)" onclick="document.querySelector('[data-section=incidents]').click()">+ Signaler</button>
          </div>
          <div id="db-incidents-recent" class="db-list">Chargement…</div>
        </div>
      </div>

      <!-- ══ SECTION RÉSERVATIONS ══ -->
      <div class="db-section" id="section-reservations">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title">Réservations en cours</span>
            <div style="display:flex;gap:10px;align-items:center">
              <span class="badge badge-blue" id="db-res-count">—</span>
              <button class="btn-yellow" style="font-size:12px;padding:6px 14px" onclick="window.location.hash='reservation'">+ Nouvelle</button>
            </div>
          </div>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead>
                <tr>
                  <th>ID</th><th>Client</th><th>Chauffeur</th><th>Voiture</th>
                  <th>Trajet</th><th>Durée</th><th>Statut</th><th>Montant</th>
                </tr>
              </thead>
              <tbody id="db-res-body">
                <tr>
                  <td colspan="8" class="muted" style="text-align:center;padding:24px">
                    Chargement…
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION FLOTTE ══ -->
      <div class="db-section" id="section-flotte">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title"> Gestion de la Flotte</span>
            <button class="btn-yellow" id="btn-add-vehicle" style="font-size:12px;padding:6px 14px">+ Ajouter</button>
          </div>
          <form id="vehicle-form" class="db-inline-form" style="display:none">
            <input type="hidden" id="vehicle-id" />
            <input id="vehicle-modele" class="form-input" placeholder="Modèle" required />
            <input id="vehicle-categorie" class="form-input" placeholder="Catégorie" required />
            <input id="vehicle-places" class="form-input" type="number" min="1" placeholder="Places" required />
            <select id="vehicle-statut" class="form-input" required>
              <option>Disponible</option>
              <option>Réservé</option>
              <option>En maintenance</option>
              <option>Hors service</option>
            </select>
            <input id="vehicle-prix" class="form-input" type="number" min="0" step="1000" placeholder="Prix/h" required />
            <button class="btn-yellow" type="submit">Enregistrer</button>
            <button class="btn-outline" type="button" id="cancel-vehicle">Annuler</button>
          </form>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Modèle</th><th>Catégorie</th><th>Places</th><th>Statut</th><th>Prix/h</th><th>Actions</th></tr></thead>
              <tbody id="db-vehicles-body">
                <tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Chargement…</td></tr>
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
            <button class="btn-yellow" id="btn-add-driver" style="font-size:12px;padding:6px 14px">+ Ajouter</button>
          </div>
          <form id="driver-form" class="db-inline-form" style="display:none">
            <input type="hidden" id="driver-id" />
            <input id="driver-nom" class="form-input" placeholder="Nom complet" required />
            <input id="driver-telephone" class="form-input" placeholder="Téléphone" required />
            <input id="driver-vehicule" class="form-input" placeholder="Véhicule assigné" required />
            <select id="driver-statut" class="form-input" required>
              <option>Disponible</option>
              <option>En service</option>
              <option>Congé</option>
              <option>Suspendu</option>
            </select>
            <input id="driver-note" class="form-input" type="number" min="0" max="5" step="0.1" placeholder="Note" required />
            <input id="driver-trajets" class="form-input" type="number" min="0" placeholder="Trajets" required />
            <button class="btn-yellow" type="submit">Enregistrer</button>
            <button class="btn-outline" type="button" id="cancel-driver">Annuler</button>
          </form>
          <div style="overflow-x:auto">
            <table class="db-table">
              <thead><tr><th>ID</th><th>Nom</th><th>Téléphone</th><th>Véhicule</th><th>Statut</th><th>Note</th><th>Trajets</th><th>Action</th></tr></thead>
              <tbody id="db-drivers-body">
                <tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Chargement…</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- ══ SECTION CLIENTS ══ -->
      <div class="db-section" id="section-clients">
        <div class="db-card">
          <div class="db-card-header">
            <span class="db-card-title"> Clients inscrits</span>
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
          <div class="db-card-header"><span class="db-card-title"> Trajets en cours</span></div>
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
            <span class="db-card-title"> Incidents & Imprévus</span>
            <button class="btn-outline" id="btn-add-incident" style="font-size:12px;padding:6px 14px;color:#EF4444;border-color:rgba(239,68,68,.3)">+ Signaler</button>
          </div>
          <form id="incident-form" class="db-inline-form" style="display:none">
            <input type="hidden" id="incident-id" />
            <input id="incident-titre" class="form-input" placeholder="Titre" required />
            <select id="incident-type" class="form-input" required>
              <option>Accident</option>
              <option>Panne</option>
              <option>Retard</option>
              <option>Imprévu</option>
            </select>
            <input id="incident-vehicule" class="form-input" placeholder="Véhicule" required />
            <input id="incident-chauffeur" class="form-input" placeholder="Chauffeur" required />
            <input id="incident-date" class="form-input" type="date" required />
            <select id="incident-statut" class="form-input" required>
              <option>Ouvert</option>
              <option>En traitement</option>
              <option>Résolu</option>
            </select>
            <select id="incident-priorite" class="form-input" required>
              <option>Basse</option>
              <option>Moyenne</option>
              <option>Haute</option>
            </select>
            <textarea id="incident-description" class="form-input" rows="2" placeholder="Description"></textarea>
            <button class="btn-yellow" type="submit">Enregistrer</button>
            <button class="btn-outline" type="button" id="cancel-incident">Annuler</button>
          </form>
          <div id="db-incidents-list" class="db-list">Chargement…</div>
        </div>
      </div>

      <!-- ══ SECTION PAIEMENTS ══ -->
      <div class="db-section" id="section-paiements">
        <div class="db-card">
          <div class="db-card-header"><span class="db-card-title"> Historique des paiements</span></div>
          <div id="db-payments-list" class="db-list">Chargement…</div>
        </div>
      </div>

      <!-- ══ SECTION RAPPORTS ══ -->
      <div class="db-section" id="section-rapports">
        <div class="db-card">
          <div class="db-card-header"><span class="db-card-title"> Rapports & Statistiques</span></div>
          <div id="db-reports-content">Chargement…</div>
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
}

export async function init() {
  const dateEl = document.getElementById("db-date");
  const session = getSession();

  if (dateEl) {
    dateEl.textContent = new Date().toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  if (session) {
    const initiales = session.nom
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
    const avatarEl = document.getElementById("db-avatar");
    const nameEl = document.getElementById("db-username");
    if (avatarEl) avatarEl.textContent = initiales;
    if (nameEl) nameEl.textContent = session.nom;
  }

  const titles = {
    tableau: "Tableau de bord",
    reservations: "Réservations",
    flotte: "Flotte",
    chauffeurs: "Chauffeurs",
    clients: "Clients",
    itineraires: "Itinéraires",
    incidents: "Incidents",
    paiements: "Paiements",
    rapports: "Rapports",
  };

  document.querySelectorAll('.db-nav-item[data-section]').forEach(btn => {
    btn.addEventListener('click', () => {
      const section = btn.dataset.section;
      document.querySelectorAll('.db-nav-item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.db-section').forEach(s => s.classList.remove('active'));
      document.getElementById('section-' + section)?.classList.add('active');
      const titleEl = document.getElementById('db-section-title');
      if (titleEl) titleEl.textContent = titles[section] || section;
    });
  });

  const money = (value) => (Number(value) || 0).toLocaleString('fr-FR') + ' F';
  const shortMoney = (value) => {
    const amount = Number(value) || 0;
    if (amount >= 1000000) return (amount / 1000000).toFixed(amount >= 10000000 ? 0 : 1) + 'M';
    if (amount >= 1000) return Math.round(amount / 1000) + 'K';
    return String(amount);
  };
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[char]));
  const badgeClass = (status) => ({
    'Disponible': 'badge-green',
    'En service': 'badge-green',
    'Confirmé': 'badge-green',
    'Résolu': 'badge-green',
    'Planifié': 'badge-yellow',
    'En traitement': 'badge-yellow',
    'En maintenance': 'badge-yellow',
    'Réservé': 'badge-red',
    'Ouvert': 'badge-red',
    'Hors service': 'badge-red',
    'Annulé': 'badge-red',
    'Congé': 'badge-gray',
    'Suspendu': 'badge-red',
  }[status] || 'badge-blue');

  function makeId(prefix) {
    return `${prefix}-${Date.now().toString().slice(-6)}`;
  }

  async function refreshDashboard() {
    const [users, reservations, vehicles, drivers, incidents] = await Promise.all([
      getUsers(),
      getReservations(),
      getVehicles(),
      getDrivers(),
      getIncidents(),
    ]);

    renderReservationsTable(reservations);
    renderVehicles(vehicles);
    renderDrivers(drivers);
    renderIncidents(incidents);
    renderPayments(reservations);
    renderReports({ users, reservations, vehicles, drivers, incidents });
    updateKpis({ reservations, vehicles, incidents });
    await loadClients();
  }

  function renderReservationsTable(reservations) {
    const rows = reservations.length === 0
      ? '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Aucune réservation</td></tr>'
      : reservations.map(r => `
          <tr>
            <td class="yellow">${esc(r.id)}</td>
            <td style="font-weight:600">${esc(r.clientNom)}</td>
            <td class="muted">${esc(r.chauffeur || '—')}</td>
            <td class="muted">${esc(r.vehicule || '—')}</td>
            <td><div>${esc(r.depart)}</div><div class="muted" style="font-size:11px">→ ${esc(r.destination)}</div></td>
            <td class="muted">${esc(r.heure || '—')} · ${esc(r.duree || '—')}h</td>
            <td><span class="badge ${badgeClass(r.statut)}">${esc(r.statut || 'Planifié')}</span></td>
            <td style="font-weight:700">${money(r.montant)}</td>
          </tr>
        `).join('');

    const countEl = document.getElementById('db-res-count');
    if (countEl) countEl.textContent = reservations.length + ' réservation' + (reservations.length > 1 ? 's' : '');
    ['db-res-body', 'db-res-body-home'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = rows;
    });
  }

  function renderVehicles(vehicles) {
    const body = document.getElementById('db-vehicles-body');
    if (!body) return;
    body.innerHTML = vehicles.length === 0
      ? '<tr><td colspan="7" class="muted" style="text-align:center;padding:24px">Aucun véhicule</td></tr>'
      : vehicles.map(v => `
          <tr>
            <td class="yellow">${esc(v.id)}</td>
            <td style="font-weight:600">${esc(v.modele)}</td>
            <td class="muted">${esc(v.categorie)}</td>
            <td class="muted">${esc(v.places)}</td>
            <td><span class="badge ${badgeClass(v.statut)}">${esc(v.statut)}</span></td>
            <td style="font-weight:700;color:var(--yellow)">${money(v.prixHeure)}</td>
            <td>
              <button class="btn-outline db-action-btn" data-action="edit-vehicle" data-id="${esc(v.id)}">Modifier</button>
              <button class="btn-outline db-action-btn danger" data-action="delete-vehicle" data-id="${esc(v.id)}">Supprimer</button>
            </td>
          </tr>
        `).join('');
  }

  function renderDrivers(drivers) {
    const body = document.getElementById('db-drivers-body');
    if (!body) return;
    body.innerHTML = drivers.length === 0
      ? '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Aucun chauffeur</td></tr>'
      : drivers.map(d => {
          const initials = esc(d.nom).split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
          return `
            <tr>
              <td class="yellow">${esc(d.id)}</td>
              <td><div style="display:flex;align-items:center;gap:8px"><div class="db-mini-avatar">${initials}</div>${esc(d.nom)}</div></td>
              <td class="muted">${esc(d.telephone)}</td>
              <td class="muted">${esc(d.vehicule)}</td>
              <td><span class="badge ${badgeClass(d.statut)}">${esc(d.statut)}</span></td>
              <td style="color:var(--yellow);font-weight:700">${esc(d.note)} ★</td>
              <td class="muted">${esc(d.trajets)}</td>
              <td>
                <button class="btn-outline db-action-btn" data-action="edit-driver" data-id="${esc(d.id)}">Modifier</button>
                <button class="btn-outline db-action-btn danger" data-action="delete-driver" data-id="${esc(d.id)}">Supprimer</button>
              </td>
            </tr>`;
        }).join('');
  }

  function incidentCard(i, withActions = true) {
    const icon = i.type === 'Panne' ? '🔧' : i.type === 'Accident' ? '⚠️' : '!';
    return `
      <div class="db-list-row">
        <div class="db-list-icon">${icon}</div>
        <div style="flex:1">
          <div style="font-weight:700;font-size:14px;color:var(--txt-main)">${esc(i.titre)}</div>
          <div style="color:var(--txt-sub);font-size:12px">${esc(i.vehicule)} · ${esc(i.chauffeur)} · ${esc(i.date)} · ${esc(i.priorite)}</div>
          ${i.description ? `<div style="color:var(--txt-faint);font-size:12px;margin-top:4px">${esc(i.description)}</div>` : ''}
        </div>
        <span class="badge ${badgeClass(i.statut)}">${esc(i.statut)}</span>
        ${withActions ? `
          <button class="btn-outline db-action-btn" data-action="edit-incident" data-id="${esc(i.id)}">Gérer</button>
          <button class="btn-outline db-action-btn danger" data-action="delete-incident" data-id="${esc(i.id)}">Supprimer</button>
        ` : ''}
      </div>`;
  }

  function renderIncidents(incidents) {
    const list = document.getElementById('db-incidents-list');
    const recent = document.getElementById('db-incidents-recent');
    const content = incidents.length === 0
      ? '<div class="muted" style="padding:20px">Aucun incident enregistré</div>'
      : incidents.map(i => incidentCard(i)).join('');
    if (list) list.innerHTML = content;
    if (recent) recent.innerHTML = incidents.slice(0, 3).map(i => incidentCard(i, false)).join('') || '<div class="muted" style="padding:20px">Aucun incident récent</div>';
  }

  function renderPayments(reservations) {
    const list = document.getElementById('db-payments-list');
    if (!list) return;
    list.innerHTML = reservations.length === 0
      ? '<div class="muted" style="padding:20px">Aucun paiement</div>'
      : reservations.map((r, index) => `
          <div class="db-list-row">
            <div class="db-list-icon">💳</div>
            <div style="flex:1">
              <div style="font-weight:700;font-size:14px;color:var(--txt-main)">${esc(r.clientNom)}</div>
              <div style="color:var(--txt-sub);font-size:12px">PAY-${String(index + 1).padStart(3, '0')} · ${esc(r.paiement || 'Non renseigné')} · ${esc((r.createdAt || '').slice(0, 10) || r.date || '—')}</div>
            </div>
            <div style="font-weight:800;color:var(--txt-main)">${money(r.montant)}</div>
            <span class="badge ${badgeClass(r.statut === 'Annulé' ? 'Annulé' : 'Confirmé')}">${r.statut === 'Annulé' ? 'Annulé' : 'Confirmé'}</span>
          </div>
        `).join('');
  }

  function renderReports({ users, reservations, vehicles, drivers, incidents }) {
    const wrap = document.getElementById('db-reports-content');
    if (!wrap) return;
    const clients = users.filter(u => u.role === 'client');
    const revenue = reservations.reduce((sum, r) => sum + (Number(r.montant) || 0), 0);
    const avgNote = drivers.length
      ? (drivers.reduce((sum, d) => sum + (Number(d.note) || 0), 0) / drivers.length).toFixed(1)
      : '0.0';
    const vehicleCounts = reservations.reduce((acc, r) => {
      const key = r.vehicule || 'Non renseigné';
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
    const topVehicles = Object.entries(vehicleCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);
    const maxCount = Math.max(1, ...topVehicles.map(([, count]) => count));

    wrap.innerHTML = `
      <div class="db-report-grid">
        <div class="db-report-card"><div>REVENUS TOTAL</div><strong>${shortMoney(revenue)} <span>FCFA</span></strong><small>${reservations.length} paiement(s)</small></div>
        <div class="db-report-card"><div>TRAJETS ENREGISTRÉS</div><strong>${reservations.length}</strong><small>${drivers.length} chauffeur(s)</small></div>
        <div class="db-report-card"><div>NOTE MOYENNE</div><strong>${avgNote}/5</strong><small>Basé sur les chauffeurs</small></div>
        <div class="db-report-card"><div>CLIENTS / INCIDENTS</div><strong>${clients.length} / ${incidents.length}</strong><small>${vehicles.length} véhicule(s) en flotte</small></div>
      </div>
      <div class="db-report-bars">
        <div style="font-size:14px;font-weight:700;color:var(--txt-main);margin-bottom:12px">Top véhicules par réservation</div>
        ${topVehicles.length === 0 ? '<div class="muted">Aucune réservation à analyser</div>' : topVehicles.map(([label, count]) => `
          <div class="db-bar-row">
            <div>${esc(label)}</div>
            <span><i style="width:${(count / maxCount) * 100}%"></i></span>
            <strong>${count}</strong>
          </div>
        `).join('')}
      </div>
    `;
  }

  function updateKpis({ reservations, vehicles, incidents }) {
    const activeReservations = reservations.filter(r => !['Terminé', 'Annulé'].includes(r.statut)).length;
    const vehiclesAvailable = vehicles.filter(v => ['Disponible', 'En service'].includes(v.statut)).length;
    const revenue = reservations.reduce((sum, r) => sum + (Number(r.montant) || 0), 0);
    const openIncidents = incidents.filter(i => i.statut !== 'Résolu').length;
    const set = (id, value) => { const el = document.getElementById(id); if (el) el.textContent = value; };
    set('kpi-active-res', activeReservations);
    set('kpi-vehicles', `${vehiclesAvailable}/${vehicles.length}`);
    set('kpi-revenue', shortMoney(revenue));
    set('kpi-incidents', openIncidents);
  }

  async function loadClients() {
    const users = await getUsers();
    const clients = users.filter((u) => u.role === "client");

    const rows = clients.length === 0
      ? '<tr><td colspan="6" class="muted" style="text-align:center;padding:24px">Aucun client inscrit</td></tr>'
      : clients.map((c) => `
          <tr>
            <td class="yellow">${c.id}</td>
            <td style="font-weight:600">${c.nom}</td>
            <td class="muted">${c.email}</td>
            <td class="muted">${c.telephone || "—"}</td>
            <td><span class="badge badge-blue">Client</span></td>
            <td class="muted">${c.createdAt || "—"}</td>
          </tr>
        `).join("");

    const count = `${clients.length} compte${clients.length > 1 ? "s" : ""}`;
                
    const body1 = document.getElementById("db-clients-body");
    const count1 = document.getElementById("db-client-count");
    if (body1) body1.innerHTML = rows;
    if (count1) count1.textContent = count;

    const body2 = document.getElementById("db-clients-body2");
    const count2 = document.getElementById("db-client-count2");
    if (body2) body2.innerHTML = rows;
    if (count2) count2.textContent = count;
  }

  function showForm(id, show = true) {
    const form = document.getElementById(id);
    if (form) form.style.display = show ? 'grid' : 'none';
  }

  function resetVehicleForm() {
    document.getElementById('vehicle-form')?.reset();
    document.getElementById('vehicle-id').value = '';
  }

  function resetDriverForm() {
    document.getElementById('driver-form')?.reset();
    document.getElementById('driver-id').value = '';
  }

  function resetIncidentForm() {
    document.getElementById('incident-form')?.reset();
    document.getElementById('incident-id').value = '';
    const dateInput = document.getElementById('incident-date');
    if (dateInput) dateInput.value = new Date().toISOString().slice(0, 10);
  }

  function bindDashboardForms() {
    document.getElementById('btn-add-vehicle')?.addEventListener('click', () => {
      resetVehicleForm();
      showForm('vehicle-form');
    });
    document.getElementById('cancel-vehicle')?.addEventListener('click', () => showForm('vehicle-form', false));
    document.getElementById('vehicle-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = document.getElementById('vehicle-id').value;
      const payload = {
        modele: document.getElementById('vehicle-modele').value.trim(),
        categorie: document.getElementById('vehicle-categorie').value.trim(),
        places: Number(document.getElementById('vehicle-places').value),
        statut: document.getElementById('vehicle-statut').value,
        prixHeure: Number(document.getElementById('vehicle-prix').value),
      };
      if (id) await updateVehicle(id, payload);
      else await addVehicle({ id: makeId('VEH'), ...payload });
      showToast(id ? 'Véhicule modifié' : 'Véhicule ajouté');
      showForm('vehicle-form', false);
      await refreshDashboard();
    });

    document.getElementById('btn-add-driver')?.addEventListener('click', () => {
      resetDriverForm();
      showForm('driver-form');
    });
    document.getElementById('cancel-driver')?.addEventListener('click', () => showForm('driver-form', false));
    document.getElementById('driver-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = document.getElementById('driver-id').value;
      const payload = {
        nom: document.getElementById('driver-nom').value.trim(),
        telephone: document.getElementById('driver-telephone').value.trim(),
        vehicule: document.getElementById('driver-vehicule').value.trim(),
        statut: document.getElementById('driver-statut').value,
        note: Number(document.getElementById('driver-note').value),
        trajets: Number(document.getElementById('driver-trajets').value),
      };
      if (id) await updateDriver(id, payload);
      else await addDriver({ id: makeId('CHF'), ...payload });
      showToast(id ? 'Chauffeur modifié' : 'Chauffeur ajouté');
      showForm('driver-form', false);
      await refreshDashboard();
    });

    document.getElementById('btn-add-incident')?.addEventListener('click', () => {
      resetIncidentForm();
      showForm('incident-form');
    });
    document.getElementById('cancel-incident')?.addEventListener('click', () => showForm('incident-form', false));
    document.getElementById('incident-form')?.addEventListener('submit', async (event) => {
      event.preventDefault();
      const id = document.getElementById('incident-id').value;
      const payload = {
        titre: document.getElementById('incident-titre').value.trim(),
        type: document.getElementById('incident-type').value,
        vehicule: document.getElementById('incident-vehicule').value.trim(),
        chauffeur: document.getElementById('incident-chauffeur').value.trim(),
        date: document.getElementById('incident-date').value,
        statut: document.getElementById('incident-statut').value,
        priorite: document.getElementById('incident-priorite').value,
        description: document.getElementById('incident-description').value.trim(),
      };
      if (id) await updateIncident(id, payload);
      else await addIncident({ id: makeId('INC'), ...payload });
      showToast(id ? 'Incident modifié' : 'Incident signalé');
      showForm('incident-form', false);
      await refreshDashboard();
    });

    document.getElementById('section-flotte')?.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'delete-vehicle') {
        if (confirm('Supprimer ce véhicule ?')) {
          await deleteVehicle(id);
          showToast('Véhicule supprimé');
          await refreshDashboard();
        }
        return;
      }
      const vehicle = (await getVehicles()).find(v => v.id === id);
      if (!vehicle) return;
      document.getElementById('vehicle-id').value = vehicle.id;
      document.getElementById('vehicle-modele').value = vehicle.modele;
      document.getElementById('vehicle-categorie').value = vehicle.categorie;
      document.getElementById('vehicle-places').value = vehicle.places;
      document.getElementById('vehicle-statut').value = vehicle.statut;
      document.getElementById('vehicle-prix').value = vehicle.prixHeure;
      showForm('vehicle-form');
    });

    document.getElementById('section-chauffeurs')?.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'delete-driver') {
        if (confirm('Supprimer ce chauffeur ?')) {
          await deleteDriver(id);
          showToast('Chauffeur supprimé');
          await refreshDashboard();
        }
        return;
      }
      const driver = (await getDrivers()).find(d => d.id === id);
      if (!driver) return;
      document.getElementById('driver-id').value = driver.id;
      document.getElementById('driver-nom').value = driver.nom;
      document.getElementById('driver-telephone').value = driver.telephone;
      document.getElementById('driver-vehicule').value = driver.vehicule;
      document.getElementById('driver-statut').value = driver.statut;
      document.getElementById('driver-note').value = driver.note;
      document.getElementById('driver-trajets').value = driver.trajets;
      showForm('driver-form');
    });

    document.getElementById('section-incidents')?.addEventListener('click', async (event) => {
      const btn = event.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      if (btn.dataset.action === 'delete-incident') {
        if (confirm('Supprimer cet incident ?')) {
          await deleteIncident(id);
          showToast('Incident supprimé');
          await refreshDashboard();
        }
        return;
      }
      const incident = (await getIncidents()).find(i => i.id === id);
      if (!incident) return;
      document.getElementById('incident-id').value = incident.id;
      document.getElementById('incident-titre').value = incident.titre;
      document.getElementById('incident-type').value = incident.type;
      document.getElementById('incident-vehicule').value = incident.vehicule;
      document.getElementById('incident-chauffeur').value = incident.chauffeur;
      document.getElementById('incident-date').value = incident.date;
      document.getElementById('incident-statut').value = incident.statut;
      document.getElementById('incident-priorite').value = incident.priorite;
      document.getElementById('incident-description').value = incident.description || '';
      showForm('incident-form');
    });
  }

  const logoutBtn = document.getElementById("db-logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      clearSession();
      showToast("Déconnexion réussie");
      setTimeout(() => navigate("accueil"), 800);
    };
  }

  bindDashboardForms();
  await refreshDashboard();
}