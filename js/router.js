import { accueilPage } from "./pages/accueil_page.js";
import { connexionPage } from "./pages/connexion_page.js";
import { inscriptionPage } from "./pages/inscription_page.js";
import { dashboardPage } from "./pages/dashboard_page.js";
import { flottePage } from "./pages/flotte_page.js";
import { reservationPage } from "./pages/reservation_page.js";
import { cartePage } from "./pages/carte_page.js";
import { getSession, setSession, clearSession } from "./session.js";
import { syncThemeIcons, toggleTheme } from "./theme.js";
import { showToast } from "./toast.js";
import { findUser, addUser, getUsers } from "./db.js";

const PAGES = {
  accueil: accueilPage,
  connexion: connexionPage,
  inscription: inscriptionPage,
  dashboard: dashboardPage,
  flotte: flottePage,
  reservation: reservationPage,
  carte: cartePage,
};

function getHash() {
  return window.location.hash.replace("#", "").trim();
}

export function navigate(hash) {
  window.location.hash = hash;
}

export async function render() {
  const hash = getHash() || "accueil";
  const session = getSession();
  const app = document.getElementById("app");

  if (!app) return;

  if (hash === "dashboard" && !session) {
    navigate("connexion");
    return;
  }
  if (hash === "dashboard" && session?.role !== "admin") {
    navigate("accueil");
    return;
  }

  app.innerHTML = PAGES[hash] || PAGES["accueil"];

  await initPage(hash);

  updateNavbar();
  window.scrollTo({ top: 0, behavior: "instant" });
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

  // ── Navigation sidebar ──
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

  requestAnimationFrame(() => {
    document.querySelectorAll(".db-nav-item[data-section]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const section = btn.dataset.section;

        // Nav active
        document
          .querySelectorAll(".db-nav-item")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Section active
        document
          .querySelectorAll(".db-section")
          .forEach((s) => s.classList.remove("active"));
        document.getElementById("section-" + section)?.classList.add("active");

        // Titre topbar
        const titleEl = document.getElementById("db-section-title");
        if (titleEl) titleEl.textContent = titles[section] || section;
      });
    });

    // ── Charger les clients dans les deux tables ──
    loadClients();
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

    // Table du tableau de bord
    const body1 = document.getElementById("db-clients-body");
    const count1 = document.getElementById("db-client-count");
    if (body1) body1.innerHTML = rows;
    if (count1) count1.textContent = count;

    // Table de la section Clients
    const body2 = document.getElementById("db-clients-body2");
    const count2 = document.getElementById("db-client-count2");
    if (body2) body2.innerHTML = rows;
    if (count2) count2.textContent = count;
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
  // État global de la réservation
  const state = {
    etape: 1,
    depart: "",
    destination: "",
    date: "",
    heure: "",
    duree: 1,
    vehicule: "",
    prixHeure: 0,
    chauffeur: "",
    nom: "",
    tel: "",
    notes: "",
    paiement: "",
  };

  // ── Helpers ──
  function goTo(n) {
    document
      .querySelectorAll(".res-screen")
      .forEach((s) => s.classList.remove("active"));
    document.getElementById("screen-" + n)?.classList.add("active");

    document.querySelectorAll(".res-step").forEach((s) => {
      const sn = parseInt(s.dataset.step);
      s.classList.remove("active", "done");
      if (sn === n) s.classList.add("active");
      if (sn < n) s.classList.add("done");
    });

    state.etape = n;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function calcTotal() {
    return state.prixHeure * state.duree;
  }

  function formatTotal() {
    return calcTotal().toLocaleString("fr-FR") + " FCFA";
  }

  requestAnimationFrame(() => {
    document.querySelectorAll(".duree-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        document
          .querySelectorAll(".duree-btn")
          .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        state.duree = parseInt(btn.dataset.duree);
      });
    });

    document.getElementById("next-1")?.addEventListener("click", () => {
      const depart = document.getElementById("res-depart")?.value;
      const destination = document.getElementById("res-destination")?.value;
      const date = document.getElementById("res-date")?.value;
      const heure = document.getElementById("res-heure")?.value;

      if (!depart || !destination || !date || !heure) {
        showToast("Veuillez remplir tous les champs");
        return;
      }
      if (depart === destination) {
        showToast("Le départ et la destination doivent être différents");
        return;
      }

      state.depart = depart;
      state.destination = destination;
      state.date = date;
      state.heure = heure;

      goTo(2);
    });

    document.querySelectorAll(".vehicule-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".vehicule-item")
          .forEach((v) => v.classList.remove("selected"));
        item.classList.add("selected");
        state.vehicule = item.dataset.vehicule;
        state.prixHeure = parseInt(item.dataset.prix);
      });
    });

    document.querySelectorAll(".chauffeur-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".chauffeur-item")
          .forEach((c) => c.classList.remove("selected"));
        item.classList.add("selected");
        state.chauffeur = item.dataset.chauffeur;
      });
    });

    document.getElementById("prev-2")?.addEventListener("click", () => goTo(1));
    document.getElementById("next-2")?.addEventListener("click", () => {
      if (!state.vehicule) {
        showToast("Choisissez un véhicule");
        return;
      }
      if (!state.chauffeur) {
        showToast("Choisissez un chauffeur");
        return;
      }
      goTo(3);

      const dateStr = state.date
        ? new Date(state.date).toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
          })
        : "—";
      document.getElementById("recap-trajet").textContent =
        state.depart + " → " + state.destination;
      document.getElementById("recap-date").textContent =
        dateStr + " à " + state.heure;
      document.getElementById("recap-duree").textContent = state.duree + "h";
      document.getElementById("recap-vehicule").textContent = state.vehicule;
      document.getElementById("recap-chauffeur").textContent = state.chauffeur;
      document.getElementById("recap-total").textContent = formatTotal();
    });

    document.getElementById("prev-3")?.addEventListener("click", () => goTo(2));
    document.getElementById("next-3")?.addEventListener("click", () => {
      const nom = document.getElementById("res-nom")?.value.trim();
      const tel = document.getElementById("res-tel")?.value.trim();
      if (!nom || !tel) {
        showToast("Nom et téléphone requis");
        return;
      }
      state.nom = nom;
      state.tel = tel;
      state.notes = document.getElementById("res-notes")?.value.trim() || "";
      goTo(4);

      document.getElementById("total-final").textContent =
        calcTotal().toLocaleString("fr-FR");
      document.getElementById("total-detail").textContent =
        "• " + state.duree + "h • " + state.vehicule + " • " + state.chauffeur;
    });

    document.querySelectorAll(".paiement-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".paiement-item")
          .forEach((p) => p.classList.remove("selected"));
        item.classList.add("selected");
        state.paiement = item.dataset.paiement;
      });
    });

    document.getElementById("prev-4")?.addEventListener("click", () => goTo(3));
    document.getElementById("btn-confirmer")?.addEventListener("click", () => {
      if (!state.paiement) {
        showToast("Choisissez un mode de paiement");
        return;
      }
      showToast("Réservation confirmée ! ✓");
      setTimeout(() => navigate("accueil"), 1500);
    });
  });
}

async function initCartePage() {
  const TRAJETS = [
    {
      id: 0,
      chauffeur: "Ibrahima Sow",
      vehicule: "Mercedes S",
      passes: 2,
      depart: "Plateau",
      arrivee: "Aéroport LSS",
      eta: "10 min",
      couleur: "#FACC15",
      textColor: "#111827",
      initiales: "IS",
      x1: 540,
      y1: 390,
      x2: 780,
      y2: 260,
      progress: 0.69,
    },
    {
      id: 1,
      chauffeur: "Moussa Ba",
      vehicule: "Toyota LC",
      passes: 4,
      depart: "Almadies",
      arrivee: "Thiès",
      eta: "2h 30min",
      couleur: "#22C55E",
      textColor: "#111827",
      initiales: "MB",
      x1: 310,
      y1: 330,
      x2: 480,
      y2: 185,
      progress: 0.28,
    },
    {
      id: 2,
      chauffeur: "Seydou Diouf",
      vehicule: "BMW 7",
      passes: 1,
      depart: "Mermoz",
      arrivee: "Saly",
      eta: "1h 20min",
      couleur: "#60A5FA",
      textColor: "#fff",
      initiales: "SD",
      x1: 430,
      y1: 360,
      x2: 830,
      y2: 560,
      progress: 0.57,
    },
    {
      id: 3,
      chauffeur: "Cheikh Kane",
      vehicule: "Staria",
      passes: 8,
      depart: "Point E",
      arrivee: "Saint-Louis",
      eta: "3h 10min",
      couleur: "#A78BFA",
      textColor: "#fff",
      initiales: "CK",
      x1: 570,
      y1: 360,
      x2: 470,
      y2: 110,
      progress: 0.24,
    },
  ];

  const etaColors = ["#22C55E", "#818CF8", "#FB923C", "#EF4444"];

  function updateTime() {
    const t = document.getElementById("carte-time");
    if (t) t.textContent = new Date().toLocaleTimeString("fr-FR");
  }
  updateTime();
  const clockInterval = setInterval(updateTime, 1000);

  function renderSidebar() {
    const container = document.getElementById("carte-trajets");
    const countEl = document.getElementById("carte-count");
    if (!container) return;
    if (countEl) countEl.textContent = TRAJETS.length + " trajets";

    container.innerHTML = TRAJETS.map(
      (t, i) => `
      <div class="carte-trajet-card" id="card-${t.id}" onclick="selectTrajet(${t.id})">
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
               style="width:${t.progress * 100}%;background:${t.couleur}"></div>
        </div>
      </div>
    `,
    ).join("");
  }

  function carPos(t) {
    return {
      x: t.x1 + (t.x2 - t.x1) * t.progress,
      y: t.y1 + (t.y2 - t.y1) * t.progress,
    };
  }

  function updateCars() {
    TRAJETS.forEach((t) => {
      const g = document.getElementById("car-" + t.id);
      if (!g) return;
      const pos = carPos(t);
      g.setAttribute("transform", `translate(${pos.x},${pos.y})`);
    });
  }

  function animateCars() {
    TRAJETS.forEach((t) => {
      const speeds = [0.0004, 0.00015, 0.0003, 0.0001];
      t.progress = Math.min(1, t.progress + speeds[t.id]);
      if (t.progress >= 1) t.progress = 0; // repart du début (démo)

      const fill = document.getElementById("fill-" + t.id);
      const pct = document.getElementById("pct-" + t.id);
      if (fill) fill.style.width = t.progress * 100 + "%";
      if (pct) pct.textContent = Math.round(t.progress * 100) + "%";
    });
    updateCars();
  }

  window.selectTrajet = function (id) {
    const t = TRAJETS[id];
    const tooltip = document.getElementById("carte-tooltip");
    if (!tooltip) return;

    document
      .querySelectorAll(".carte-trajet-card")
      .forEach((c) => c.classList.remove("active"));
    document.getElementById("card-" + id)?.classList.add("active");

    document.getElementById("tt-chauffeur").textContent = t.chauffeur;
    document.getElementById("tt-vehicule").textContent = t.vehicule;
    document.getElementById("tt-trajet").textContent =
      t.depart + " → " + t.arrivee;
    document.getElementById("tt-eta").textContent = t.eta;
    tooltip.style.display = "block";
  };

  document.getElementById("map-svg")?.addEventListener("click", (e) => {
    if (e.target.closest('[id^="car-"]')) return;
    const tooltip = document.getElementById("carte-tooltip");
    if (tooltip) tooltip.style.display = "none";
    document
      .querySelectorAll(".carte-trajet-card")
      .forEach((c) => c.classList.remove("active"));
  });

  TRAJETS.forEach((t) => {
    document.getElementById("car-" + t.id)?.addEventListener("click", (e) => {
      e.stopPropagation();
      window.selectTrajet(t.id);
    });
  });

  requestAnimationFrame(() => {
    renderSidebar();
    updateCars();

    const animInterval = setInterval(animateCars, 50);

    window.addEventListener(
      "hashchange",
      () => {
        clearInterval(animInterval);
        clearInterval(clockInterval);
        delete window.selectTrajet;
      },
      { once: true },
    );
  });
}

export function initRouter() {
  window.addEventListener("hashchange", render);
  render();
}
