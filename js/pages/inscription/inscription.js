import { getSession, setSession } from "../../session.js";
import { showToast } from "../../toast.js";
import { findUser, addUser } from "../../db.js";
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
            <div class="login-location-badge">Nouveau client</div>
            <h1 class="login-headline">Rejoignez<br>ŇiouDeem.</h1>
            <p class="login-tagline">Créez votre compte en quelques secondes et réservez votre premier trajet dès aujourd'hui.</p>
            <div class="login-stats">
              <div class="login-stat"><div class="login-stat-num">2 min</div><div class="login-stat-lbl">Pour s'inscrire</div></div>
              <div class="login-stat"><div class="login-stat-num">Gratuit</div><div class="login-stat-lbl">Sans frais</div></div>
              <div class="login-stat"><div class="login-stat-num">24h/7j</div><div class="login-stat-lbl">Disponible</div></div>
            </div>
          </div>
        </div>
      </div>
    
      <div class="login-right">
        <button id="insc-theme-btn" class="theme-btn login-theme-btn">
          <span class="theme-icon">☀️</span>
        </button>
        <a href="#connexion" class="back-btn">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M19 12H5M5 12l7-7M5 12l7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Retour à la connexion
        </a>
        <div class="login-role-badge client" style="margin-bottom:20px">Espace Client</div>
        <h2 class="login-title">Créer un compte</h2>
        <p class="login-subtitle">Remplissez le formulaire ci-dessous pour vous inscrire</p>
        <div id="insc-error" class="form-error"></div>
        <form id="insc-form" class="login-form">
          <div class="form-field">
            <label class="form-label">Nom complet</label>
            <input id="insc-nom" type="text" class="form-input" placeholder="Mamadou Diallo" required />
          </div>
          <div class="form-field">
            <label class="form-label">Numéro de téléphone</label>
            <input id="insc-tel" type="tel" class="form-input" placeholder="+221 77 000 0000" required />
          </div>
          <div class="form-field">
            <label class="form-label">Adresse email</label>
            <input id="insc-email" type="email" class="form-input" placeholder="vous@exemple.com" required />
          </div>
          <div class="form-divider"><span>Sécurité</span></div>
          <div class="form-field">
            <label class="form-label">Mot de passe <span style="color:var(--txt-faint);font-weight:400">(6 caractères min.)</span></label>
            <input id="insc-pwd" type="password" class="form-input" placeholder="••••••••" required />
          </div>
          <div class="form-field">
            <label class="form-label">Confirmer le mot de passe</label>
            <input id="insc-pwd2" type="password" class="form-input" placeholder="••••••••" required />
            <span id="pwd-match" class="pwd-hint"></span>
          </div>
          <button type="submit" class="btn-yellow btn-full" style="margin-top:4px">Créer mon compte →</button>
        </form>
        <p class="login-footer-note" style="margin-top:16px">Déjà inscrit ? <a href="#connexion" class="link-yellow">Se connecter</a></p>
      </div>
    </div>
      `;
}

export function init() {
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

export function afterRender() {
  const themeBtns = document.querySelectorAll("#insc-theme-btn, [data-theme-toggle]");
  themeBtns.forEach(btn => {
    btn.onclick = (e) => {
      e.preventDefault();
      toggleTheme();
    };
  });
}