import { accueilPage } from "./pages/accueil_page.js";
import { connexionPage } from "./pages/connexion_page.js";
import { inscriptionPage } from "./pages/inscription_page.js";
import { dashboardPage } from "./pages/dashboard_page.js";
import { flottePage } from "./pages/flotte_page.js";
import { reservationPage } from "./pages/reservation_page.js";
import { cartePage } from "./pages/carte_page.js";
import { tarifsPage } from "./pages/tarifs_page.js";
import { aproposPage } from "./pages/apropos_page.js";
import { getSession, setSession, clearSession } from "./session.js";
import { syncThemeIcons, toggleTheme } from "./theme.js";
import { showToast } from "./toast.js";
import {findUser,addUser,getUsers,getReservations,getReservationsByUser,addReservation,getVehicles,addVehicle,updateVehicle,deleteVehicle,getDrivers,addDriver,updateDriver,deleteDriver,getIncidents,addIncident,updateIncident,deleteIncident,} from './db.js';

const PAGES = {
  accueil: accueilPage,
  connexion: connexionPage,
  inscription: inscriptionPage,
  dashboard: dashboardPage,
  flotte: flottePage,
  reservation: reservationPage,
  carte: cartePage,
  tarifs: tarifsPage,
  apropos: aproposPage,
};

function getHash() {
  return window.location.hash.replace("#", "").trim();
}

export function navigate(hash) {
  window.location.hash = hash;
}

export async function render() {
    const hash    = getHash() || 'accueil';
    const session = getSession();
    const app     = document.getElementById('app');

    if (!app) return;


    if (hash === 'dashboard' && !session) {
        navigate('connexion'); return;
    }
    if (hash === 'dashboard' && session?.role !== 'admin') {
        navigate('accueil'); return;
    }
 
    if (hash === 'reservation' && !session) {
        showToast('Connectez-vous pour réserver');
        navigate('connexion');
        return;
    }
 
    app.innerHTML = PAGES[hash] || PAGES['accueil'];
    await initPage(hash);
    updateNavbar();
    window.scrollTo({ top: 0, behavior: 'instant' });
}


async function initPage(route) {
  syncThemeIcons();

  document
    .querySelectorAll(
      "[data-theme-toggle], #login-theme-btn, #insc-theme-btn, #db-theme-btn",
    )
    .forEach((btn) => {
      btn.onclick = (e) => {
        e.preventDefault();
        toggleTheme();
      };
    });

  if (route === "connexion") await initConnexionPage();
  if (route === "inscription") await initInscriptionPage();
  if (route === "dashboard") await initDashboardPage();
  if (route === "flotte") await initFlottePage();
  if (route === "reservation") await initReservationPage();
  if (route === "carte") await initCartePage();
}

async function initConnexionPage() {
  let currentRole = "client";

  const adminBtn = document.getElementById("btn-admin");
  const clientBtn = document.getElementById("btn-client");
  const backBtn = document.getElementById("btn-back");
  const loginForm = document.getElementById("login-form");

  function showForm(role) {
    currentRole = role;
    const stepChoose = document.getElementById("step-choose");
    const stepForm = document.getElementById("step-form");
    if (stepChoose) stepChoose.style.display = "none";
    if (stepForm) stepForm.style.display = "block";

    const badge = document.getElementById("login-role-badge");
    if (badge) {
      badge.className = `login-role-badge ${role}`;
      badge.textContent = role === "admin" ? "Administrateur" : "Espace Client";
    }

    const sub = document.getElementById("login-form-sub");
    if (sub) {
      sub.textContent =
        role === "admin"
          ? "Accédez au tableau de bord de gestion"
          : "Réservez votre voiture en quelques clics";
    }

    const inscLink = document.getElementById("insc-link");
    if (inscLink) inscLink.style.display = role === "client" ? "block" : "none";
  }

  function showChoose() {
    const stepChoose = document.getElementById("step-choose");
    const stepForm = document.getElementById("step-form");
    const err = document.getElementById("login-error");
    if (stepChoose) stepChoose.style.display = "block";
    if (stepForm) stepForm.style.display = "none";
    if (err) err.style.display = "none";
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const email = document.getElementById("login-email")?.value.trim() || "";
    const pwd = document.getElementById("login-pwd")?.value || "";
    const err = document.getElementById("login-error");

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Connexion…";
    }

    const user = await findUser(email);

    if (btn) {
      btn.disabled = false;
      btn.textContent = "Se connecter →";
    }

    if (!user || user.password !== pwd) {
      if (err) {
        err.textContent = "Email ou mot de passe incorrect";
        err.style.display = "block";
      }
      return;
    }
    if (currentRole === "admin" && user.role !== "admin") {
      if (err) {
        err.textContent = "Ce compte n'a pas les droits administrateur";
        err.style.display = "block";
      }
      return;
    }
    if (currentRole === "client" && user.role !== "client") {
      if (err) {
        err.textContent = "Utilisez l'espace Administrateur pour ce compte";
        err.style.display = "block";
      }
      return;
    }

    setSession(user);
    showToast(`Bienvenue ${user.nom.split(" ")[0]} ✓`);
    setTimeout(
      () => navigate(user.role === "admin" ? "dashboard" : "accueil"),
      900,
    );
  }

  if (adminBtn) adminBtn.onclick = () => showForm("admin");
  if (clientBtn) clientBtn.onclick = () => showForm("client");
  if (backBtn) backBtn.onclick = showChoose;
  if (loginForm) loginForm.onsubmit = handleSubmit;
}

async function initInscriptionPage() {
  const pwdInput = document.getElementById("insc-pwd");
  const pwd2Input = document.getElementById("insc-pwd2");
  const inscForm = document.getElementById("insc-form");

  function checkPasswords() {
    const pwd = pwdInput?.value ?? "";
    const pwd2 = pwd2Input?.value ?? "";
    const hint = document.getElementById("pwd-match");
    if (!hint) return;
    if (!pwd2) {
      hint.textContent = "";
      return;
    }
    if (pwd === pwd2) {
      hint.textContent = "✓ Les mots de passe correspondent";
      hint.className = "pwd-hint pwd-hint--ok";
    } else {
      hint.textContent = "✗ Les mots de passe ne correspondent pas";
      hint.className = "pwd-hint pwd-hint--err";
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nom = document.getElementById("insc-nom")?.value.trim() || "";
    const tel = document.getElementById("insc-tel")?.value.trim() || "";
    const email = document.getElementById("insc-email")?.value.trim() || "";
    const pwd = pwdInput?.value ?? "";
    const pwd2 = pwd2Input?.value ?? "";
    const err = document.getElementById("insc-error");

    if (pwd !== pwd2) {
      if (err) {
        err.textContent = "Les mots de passe ne correspondent pas";
        err.style.display = "block";
      }
      return;
    }
    if (pwd.length < 6) {
      if (err) {
        err.textContent = "Mot de passe trop court (6 caractères minimum)";
        err.style.display = "block";
      }
      return;
    }

    const btn = event.target.querySelector('button[type="submit"]');
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Vérification…";
    }

    const existing = await findUser(email);

    if (existing) {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "Créer mon compte →";
      }
      if (err) {
        err.textContent = "Un compte existe déjà avec cet email";
        err.style.display = "block";
      }
      return;
    }

    const newUser = {
      id: "USR-" + Date.now(),
      nom,
      email,
      telephone: tel,
      password: pwd,
      role: "client",
      createdAt: new Date().toISOString().split("T")[0],
    };

    if (btn) btn.textContent = "Création…";

    await addUser(newUser);

    setSession(newUser);
    showToast(`Bienvenue ${nom.split(" ")[0]} ! `);
    setTimeout(() => navigate("accueil"), 1200);
  }

  if (pwdInput && pwd2Input) {
    pwdInput.oninput = checkPasswords;
    pwd2Input.oninput = checkPasswords;
  }
  if (inscForm) inscForm.onsubmit = handleSubmit;
}

async function initDashboardPage() {
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

requestAnimationFrame(async () => {
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

    bindDashboardForms();
    await refreshDashboard(); 
});



  async function loadClients() {
    const users = await getUsers();
    const clients = users.filter((u) => u.role === "client");

    const rows =
      clients.length === 0
        ? '<tr><td colspan="6" class="muted" style="text-align:center;padding:24px">Aucun client inscrit</td></tr>'
        : clients
            .map(
              (c) => `
                <tr>
                    <td class="yellow">${c.id}</td>
                    <td style="font-weight:600">${c.nom}</td>
                    <td class="muted">${c.email}</td>
                    <td class="muted">${c.telephone || "—"}</td>
                    <td><span class="badge badge-blue">Client</span></td>
                    <td class="muted">${c.createdAt || "—"}</td>
                </tr>`,
            )
            .join("");

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

  async function bindDashboardForms() {
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

  // ── Logout ──
  const logoutBtn = document.getElementById("db-logout-btn");
  if (logoutBtn) {
    logoutBtn.onclick = () => {
      clearSession();
      showToast("Déconnexion réussie");
      setTimeout(() => navigate("accueil"), 800);
    };
  }
}

function updateNavbar() {
  const session = getSession();
  const connexionBtn = document.getElementById("nav-connexion");
  const userPill = document.getElementById("nav-user");

  if (connexionBtn && userPill) {
    if (session) {
      connexionBtn.style.display = "none";
      userPill.style.display = "flex";
      const initials = session.nom
        ? session.nom
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()
            .slice(0, 2)
        : "?";
      const userName = document.getElementById("nav-user-name");
      const userInitials = document.getElementById("nav-user-initials");
      if (userName)
        userName.textContent = session.nom?.split(" ")[0] || "Compte";
      if (userInitials) userInitials.textContent = initials;

      userPill.style.cursor = "pointer";
      userPill.onclick = () => {
        clearSession();
        showToast("Déconnexion réussie");
        setTimeout(() => render(), 800);
      };
    } else {
      connexionBtn.style.display = "inline-flex";
      userPill.style.display = "none";
      userPill.onclick = null;
    }
  }
}

async function initFlottePage() {
  requestAnimationFrame(() => {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const cards = document.querySelectorAll(".car-card");

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;

        cards.forEach((card) => {
          if (filter === "tous" || card.dataset.categorie === filter) {
            card.style.display = "";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  });
}

async function initReservationPage() {
    const session = getSession();

    const state = {
        etape      : 1,
        depart     : '',
        destination: '',
        date       : '',
        heure      : '',
        duree      : 1,
        vehicule   : '',
        prixHeure  : 0,
        chauffeur  : '',
        nom        : session?.nom || '',
        tel        : session?.telephone || '',
        notes      : '',
        paiement   : '',
    };

    function goTo(n) {
        document.querySelectorAll('.res-screen').forEach(s => s.classList.remove('active'));
        document.getElementById('screen-' + n)?.classList.add('active');
        document.querySelectorAll('.res-step').forEach(s => {
            const sn = parseInt(s.dataset.step);
            s.classList.remove('active', 'done');
            if (sn === n) s.classList.add('active');
            if (sn < n)  s.classList.add('done');
        });
        state.etape = n;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function calcTotal() { return state.prixHeure * state.duree; }
    function formatTotal() { return calcTotal().toLocaleString('fr-FR') + ' FCFA'; }

    requestAnimationFrame(() => {

        const nomInput = document.getElementById('res-nom');
        const telInput = document.getElementById('res-tel');
        if (nomInput && session?.nom)       nomInput.value = session.nom;
        if (telInput && session?.telephone) telInput.value = session.telephone;

        // ── Étape 1 ──
        document.querySelectorAll('.duree-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.duree-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                state.duree = parseInt(btn.dataset.duree);
            });
        });

        document.getElementById('next-1')?.addEventListener('click', () => {
            const depart      = document.getElementById('res-depart')?.value;
            const destination = document.getElementById('res-destination')?.value;
            const date        = document.getElementById('res-date')?.value;
            const heure       = document.getElementById('res-heure')?.value;
            if (!depart || !destination || !date || !heure) {
                showToast('Veuillez remplir tous les champs'); return;
            }
            if (depart === destination) {
                showToast('Le départ et la destination doivent être différents'); return;
            }
            state.depart = depart; state.destination = destination;
            state.date = date; state.heure = heure;
            goTo(2);
        });

        document.querySelectorAll('.vehicule-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.vehicule-item').forEach(v => v.classList.remove('selected'));
                item.classList.add('selected');
                state.vehicule  = item.dataset.vehicule;
                state.prixHeure = parseInt(item.dataset.prix);
            });
        });

        document.querySelectorAll('.chauffeur-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.chauffeur-item').forEach(c => c.classList.remove('selected'));
                item.classList.add('selected');
                state.chauffeur = item.dataset.chauffeur;
            });
        });

        document.getElementById('prev-2')?.addEventListener('click', () => goTo(1));
        document.getElementById('next-2')?.addEventListener('click', () => {
            if (!state.vehicule)  { showToast('Choisissez un véhicule');  return; }
            if (!state.chauffeur) { showToast('Choisissez un chauffeur'); return; }
            goTo(3);
            const dateStr = state.date
                ? new Date(state.date).toLocaleDateString('fr-FR', { weekday:'long', day:'numeric', month:'long' })
                : '—';
            document.getElementById('recap-trajet').textContent    = state.depart + ' → ' + state.destination;
            document.getElementById('recap-date').textContent      = dateStr + ' à ' + state.heure;
            document.getElementById('recap-duree').textContent     = state.duree + 'h';
            document.getElementById('recap-vehicule').textContent  = state.vehicule;
            document.getElementById('recap-chauffeur').textContent = state.chauffeur;
            document.getElementById('recap-total').textContent     = formatTotal();
        });


        document.getElementById('prev-3')?.addEventListener('click', () => goTo(2));
        document.getElementById('next-3')?.addEventListener('click', () => {
            const nom = document.getElementById('res-nom')?.value.trim();
            const tel = document.getElementById('res-tel')?.value.trim();
            if (!nom || !tel) { showToast('Nom et téléphone requis'); return; }
            state.nom   = nom;
            state.tel   = tel;
            state.notes = document.getElementById('res-notes')?.value.trim() || '';
            goTo(4);
            document.getElementById('total-final').textContent = calcTotal().toLocaleString('fr-FR');
            document.getElementById('total-detail').textContent =
                '• ' + state.duree + 'h • ' + state.vehicule + ' • ' + state.chauffeur;
        });

        document.querySelectorAll('.paiement-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.paiement-item').forEach(p => p.classList.remove('selected'));
                item.classList.add('selected');
                state.paiement = item.dataset.paiement;
            });
        });

        document.getElementById('prev-4')?.addEventListener('click', () => goTo(3));

        document.getElementById('btn-confirmer')?.addEventListener('click', async () => {
            if (!state.paiement) { showToast('Choisissez un mode de paiement'); return; }

            const btn = document.getElementById('btn-confirmer');
            if (btn) { btn.disabled = true; btn.textContent = 'Enregistrement…'; }

            const reservation = {
                id         : 'RES-' + Date.now(),
                clientId   : session?.id || '',
                clientNom  : state.nom,
                clientTel  : state.tel,
                depart     : state.depart,
                destination: state.destination,
                date       : state.date,
                heure      : state.heure,
                duree      : state.duree,
                vehicule   : state.vehicule,
                chauffeur  : state.chauffeur,
                paiement   : state.paiement,
                montant    : calcTotal(),
                statut     : 'Planifié',
                notes      : state.notes,
                createdAt  : new Date().toISOString(),
            };

            try {
                await addReservation(reservation);
                showToast('Réservation confirmée ! ✓');
                setTimeout(() => navigate('accueil'), 1500);
            } catch (err) {
                if (btn) { btn.disabled = false; btn.textContent = 'Confirmer la réservation →'; }
                showToast('Erreur lors de l\'enregistrement');
                console.error(err);
            }
        });
    });
}

async function initCartePage() {

  const TRAJETS = [
    {
      id: 0, chauffeur: 'Ibrahima Sow', vehicule: 'Mercedes S', passes: 2,
      depart: 'Plateau', arrivee: 'Aéroport LSS', eta: '10 min',
      couleur: '#FACC15', initiales: 'IS', progress: 0.69,
      coords: [
        [14.6937, -17.4441], 
        [14.7397, -17.4902],
      ]
    },
    {
      id: 1, chauffeur: 'Moussa Ba', vehicule: 'Toyota LC', passes: 4,
      depart: 'Almadies', arrivee: 'Thiès', eta: '2h 30min',
      couleur: '#22C55E', initiales: 'MB', progress: 0.28,
      coords: [
        [14.7469, -17.5228], 
        [14.7910, -16.9360], 
      ]
    },
    {
      id: 2, chauffeur: 'Seydou Diouf', vehicule: 'BMW 7', passes: 1,
      depart: 'Mermoz', arrivee: 'Saly', eta: '1h 20min',
      couleur: '#60A5FA', initiales: 'SD', progress: 0.57,
      coords: [
        [14.7167, -17.4833], 
        [14.4667, -17.0167], 
      ]
    },
    {
      id: 3, chauffeur: 'Cheikh Kane', vehicule: 'Staria', passes: 8,
      depart: 'Point E', arrivee: 'Saint-Louis', eta: '3h 10min',
      couleur: '#A78BFA', initiales: 'CK', progress: 0.24,
      coords: [
        [14.6881, -17.4476], 
        [16.0333, -16.5000], 
      ]
    },
  ];

  const etaColors = ['#22C55E', '#818CF8', '#FB923C', '#EF4444'];


  function updateTime() {
    const t = document.getElementById('carte-time');
    if (t) t.textContent = new Date().toLocaleTimeString('fr-FR');
  }
  updateTime();
  const clockInterval = setInterval(updateTime, 1000);


  function renderSidebar() {
    const container = document.getElementById('carte-trajets');
    if (!container) return;
    container.innerHTML = TRAJETS.map((t, i) => `
      <div class="carte-trajet-card" id="card-${t.id}" onclick="carteSelectTrajet(${t.id})">
        <div class="trajet-header">
          <div class="trajet-nom">${t.chauffeur}</div>
          <div class="trajet-eta" style="color:${etaColors[i]}">${t.eta}</div>
        </div>
        <div class="trajet-vehicule">${t.vehicule} • ${t.passes} pass.</div>
        <div class="trajet-route">
          <span class="trajet-dot" style="background:${t.couleur}"></span>
          <span>${t.depart}</span>
          <div class="trajet-line-h"></div>
          <span>${t.arrivee}</span>
          <span class="trajet-dot" style="background:rgba(255,255,255,0.2)"></span>
        </div>
        <div class="trajet-progress-wrap">
          <span>Départ</span>
          <span id="pct-${t.id}">${Math.round(t.progress * 100)}%</span>
          <span>Arrivée</span>
        </div>
        <div class="trajet-progress-bar">
          <div class="trajet-progress-fill" id="fill-${t.id}"
              style="width:${t.progress*100}%;background:${t.couleur}"></div>
        </div>
      </div>
    `).join('');
  }

  function lerpPos(t) {
    const [lat1, lng1] = t.coords[0];
    const [lat2, lng2] = t.coords[1];
    return [
      lat1 + (lat2 - lat1) * t.progress,
      lng1 + (lng2 - lng1) * t.progress,
    ];
  }

  function makeIcon(couleur, initiales, textColor = '#111827') {
    return window._L.divIcon({
      className: '',
      html: `
        <div style="
          width:36px;height:36px;border-radius:50%;
          background:${couleur};
          border:3px solid rgba(255,255,255,0.9);
          display:flex;align-items:center;justify-content:center;
          font-size:11px;font-weight:800;color:${textColor};
          box-shadow:0 4px 12px rgba(0,0,0,0.4);
          font-family:system-ui;
        ">${initiales}</div>
        <div style="
          width:8px;height:8px;border-radius:50%;
          background:${couleur};opacity:0.4;
          position:absolute;top:50%;left:50%;
          transform:translate(-50%,-50%);
          animation:pulse 2s ease-in-out infinite;
        "></div>
      `,
      iconSize: [36, 36],
      iconAnchor: [18, 18],
    });
  }

  requestAnimationFrame(async () => {
    renderSidebar();

    if (!window.L) {
      await new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        s.onload = resolve;
        s.onerror = reject;
        document.head.appendChild(s);
      });
    }
    window._L = window.L;

    const map = window._L.map('leaflet-map', {
      center: [14.72, -17.45],
      zoom: 9,
      zoomControl: true,
    });

    window._L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
      maxZoom: 18,
    }).addTo(map);

    const markers = {};
    const polylines = {};

    TRAJETS.forEach(t => {

      polylines[t.id] = window._L.polyline(t.coords, {
        color: t.couleur,
        weight: 3,
        opacity: 0.7,
        dashArray: '10, 6',
      }).addTo(map);

      window._L.circleMarker(t.coords[0], {
        radius: 6, color: t.couleur, fillColor: t.couleur,
        fillOpacity: 1, weight: 2,
      }).addTo(map).bindTooltip(t.depart, { permanent: false });

      window._L.circleMarker(t.coords[1], {
        radius: 6, color: 'white', fillColor: 'rgba(255,255,255,0.3)',
        fillOpacity: 1, weight: 2,
      }).addTo(map).bindTooltip(t.arrivee, { permanent: false });

      const pos = lerpPos(t);
      const textColor = (t.couleur === '#FACC15' || t.couleur === '#22C55E') ? '#111827' : '#fff';
      markers[t.id] = window._L.marker(pos, { icon: makeIcon(t.couleur, t.initiales, textColor) })
        .addTo(map)
        .bindPopup(`
          <div style="min-width:160px">
            <div style="font-size:15px;font-weight:800;color:#F1F5F9;margin-bottom:4px">${t.chauffeur}</div>
            <div style="font-size:12px;color:#64748B;margin-bottom:8px">${t.vehicule}</div>
            <div style="font-size:13px;font-weight:700;color:#FACC15">${t.depart} → ${t.arrivee}</div>
            <div style="display:flex;justify-content:space-between;margin-top:8px">
              <span style="font-size:11px;color:#64748B">Arrivée estimée</span>
              <span style="font-size:13px;font-weight:800;color:#22C55E">${t.eta}</span>
            </div>
          </div>
        `);
    });

    window.carteSelectTrajet = function(id) {
      document.querySelectorAll('.carte-trajet-card').forEach(c => c.classList.remove('active'));
      document.getElementById('card-' + id)?.classList.add('active');
      const t = TRAJETS[id];
      const pos = lerpPos(t);
      map.setView(pos, 11, { animate: true });
      markers[id].openPopup();
    };

    const speeds = [0.0003, 0.0001, 0.00025, 0.00008];
    const animInterval = setInterval(() => {
      TRAJETS.forEach(t => {
        t.progress = Math.min(1, t.progress + speeds[t.id]);
        if (t.progress >= 1) t.progress = 0;

        
        
        const pos = lerpPos(t);
        markers[t.id]?.setLatLng(pos);

        
        const fill = document.getElementById('fill-' + t.id);
        const pct  = document.getElementById('pct-' + t.id);
        if (fill) fill.style.width = (t.progress * 100) + '%';
        if (pct)  pct.textContent  = Math.round(t.progress * 100) + '%';
      });
    }, 100);


    window.addEventListener('hashchange', () => {
      clearInterval(animInterval);
      clearInterval(clockInterval);
      map.remove();
      delete window.carteSelectTrajet;
      delete window._L;
    }, { once: true });
  });
}

async function loadReservations() {
    const reservations = await getReservations();
    const tbody = document.getElementById('db-res-body');
    const countEl = document.getElementById('db-res-count');
 
    if (countEl) countEl.textContent = reservations.length + ' réservation' + (reservations.length > 1 ? 's' : '');
 
    if (!tbody) return;
 
    if (reservations.length === 0) {
        tbody.innerHTML = '<tr><td colspan="8" class="muted" style="text-align:center;padding:24px">Aucune réservation</td></tr>';
        return;
    }
 
    const statutBadge = {
        'Planifié' : 'badge-yellow',
        'En cours' : 'badge-green',
        'Terminé'  : 'badge-gray',
        'Annulé'   : 'badge-red',
    };
 
    tbody.innerHTML = reservations.map(r => `
        <tr>
            <td class="yellow">${r.id}</td>
            <td style="font-weight:600">${r.clientNom}</td>
            <td class="muted">${r.chauffeur || '—'}</td>
            <td class="muted">${r.vehicule || '—'}</td>
            <td>
                <div>${r.depart}</div>
                <div class="muted" style="font-size:11px">→ ${r.destination}</div>
            </td>
            <td class="muted">${r.heure || '—'} · ${r.duree}h</td>
            <td><span class="badge ${statutBadge[r.statut] || 'badge-gray'}">${r.statut}</span></td>
            <td style="font-weight:700">${r.montant?.toLocaleString('fr-FR')} F</td>
        </tr>
    `).join('');
}


export function initRouter() {
  window.addEventListener("hashchange", render);
  render();
}
