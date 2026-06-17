import { getSession, setSession } from "../../session.js";
import { showToast } from "../../toast.js";
import { findUser } from "../../db.js";
import { navigate } from "../../router.js";
import { toggleTheme } from "../../theme.js";

export function render() {
  return `
<div class="login-page">
  <div class="login-left">
    <img src="js/assets/images/ma_voiture.jpeg" alt="" class="login-bg-img" />
    <div class="login-left-overlay"></div>
    <div class="login-left-content">
      <a href="#accueil" class="logo">
        <div class="logo-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
            <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/>
            <circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
          </svg>
        </div>
        <span class="logo-text" style="color:#fff">ŇiouDeem</span>
      </a>
      <div>
        <div class="login-location-badge">Location Premium • Dakar</div>
        <h1 class="login-headline">Votre chauffeur<br>vous attend.</h1>
        <p class="login-tagline">Service de location avec chauffeur professionnel à Dakar et dans tout le Sénégal.</p>
        <div class="login-stats">
          <div class="login-stat"><div class="login-stat-num">50+</div><div class="login-stat-lbl">Véhicules</div></div>
          <div class="login-stat"><div class="login-stat-num">120+</div><div class="login-stat-lbl">Chauffeurs</div></div>
          <div class="login-stat"><div class="login-stat-num">5★</div><div class="login-stat-lbl">Évaluation</div></div>
        </div>
      </div>
    </div>
  </div>

  <div class="login-right">
    <button id="login-theme-btn" class="theme-btn login-theme-btn">
      <span class="theme-icon">☀️</span>
    </button>

    <div id="step-choose">
      <h2 class="login-title">Bienvenue</h2>
      <p class="login-subtitle">Choisissez votre type de compte pour continuer</p>
      <div class="account-choices">
        <button id="btn-admin" class="account-btn account-btn--admin">
          <div class="account-btn-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#111827" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="account-btn-text">
            <div class="account-btn-label">Administrateur</div>
            <div class="account-btn-desc">Gérer la flotte, les locations & rapports</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
        <button id="btn-client" class="account-btn account-btn--client">
          <div class="account-btn-icon account-btn-icon--client">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#FACC15" stroke-width="2"/>
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#FACC15" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>
          <div class="account-btn-text">
            <div class="account-btn-label">Client</div>
            <div class="account-btn-desc">Réserver une voiture & un chauffeur</div>
          </div>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
      <p class="login-footer-note">Paiement sécurisé via Wave · Orange Money · Carte bancaire</p>
    </div>

    <div id="step-form" style="display:none">
      <button id="btn-back" class="back-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Retour
      </button>
      <div id="login-role-badge" class="login-role-badge"></div>
      <h2 class="login-title">Connexion</h2>
      <p id="login-form-sub" class="login-subtitle"></p>
      <div id="login-error" class="form-error"></div>
      <form id="login-form" class="login-form">
        <div class="form-field">
          <label class="form-label">Adresse email</label>
          <input id="login-email" type="email" class="form-input" placeholder="vous@exemple.com" required />
        </div>
        <div class="form-field">
          <label class="form-label">Mot de passe</label>
          <input id="login-pwd" type="password" class="form-input" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn-yellow btn-full" style="margin-top:8px">Se connecter →</button>
      </form>
      <p id="insc-link" class="login-footer-note" style="display:none;margin-top:16px">
        Pas encore de compte ? <a href="#inscription" class="link-yellow">Créer un compte client</a>
      </p>
    </div>
  </div>
</div>
  `;
}

export function init() {
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

export function afterRender() {
  const themeBtns = document.querySelectorAll("#login-theme-btn, [data-theme-toggle]");
  themeBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      toggleTheme();
    };
  });
}