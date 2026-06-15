export const reservationPage = `
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

  <div class="res-steps" id="res-steps">
    <div class="res-step active" data-step="1">
      <div class="res-step-num">1</div>
      <span class="res-step-label">Trajet</span>
    </div>
    <div class="res-step-line"></div>
    <div class="res-step" data-step="2">
      <div class="res-step-num">2</div>
      <span class="res-step-label">Véhicule</span>
    </div>
    <div class="res-step-line"></div>
    <div class="res-step" data-step="3">
      <div class="res-step-num">3</div>
      <span class="res-step-label">Détails</span>
    </div>
    <div class="res-step-line"></div>
    <div class="res-step" data-step="4">
      <div class="res-step-num">4</div>
      <span class="res-step-label">Paiement</span>
    </div>
  </div>

  <div class="nav-actions">
    <button class="theme-btn" data-theme-toggle><span class="theme-icon">☀️</span></button>
  </div>
</nav>

<div class="res-page">

  <!-- ═══ ÉTAPE 1 — TRAJET ═══ -->
  <div class="res-screen active" id="screen-1">
    <h1 class="res-title">Planifiez votre trajet</h1>
    <p class="res-sub">Indiquez votre départ et votre destination.</p>
    <div class="res-card">
      <div class="res-row-2">
        <div class="form-field">
          <label class="form-label">Point de départ</label>
          <select class="form-input" id="res-depart">
            <option value="">Choisir...</option>
            <option>Dakar Centre</option>
            <option>Plateau</option>
            <option>Almadies</option>
            <option>Mermoz</option>
            <option>Point E</option>
            <option>Sacré-Cœur</option>
            <option>Aéroport LSS</option>
            <option>Thiès</option>
            <option>Saint-Louis</option>
            <option>Saly</option>
          </select>
        </div>
        <div class="form-field">
          <label class="form-label">Destination</label>
          <select class="form-input" id="res-destination">
            <option value="">Choisir...</option>
            <option>Dakar Centre</option>
            <option>Plateau</option>
            <option>Almadies</option>
            <option>Mermoz</option>
            <option>Point E</option>
            <option>Sacré-Cœur</option>
            <option>Aéroport LSS</option>
            <option>Thiès</option>
            <option>Saint-Louis</option>
            <option>Saly</option>
          </select>
        </div>
      </div>
      <div class="res-row-2">
        <div class="form-field">
          <label class="form-label">Date</label>
          <input type="date" class="form-input" id="res-date"/>
        </div>
        <div class="form-field">
          <label class="form-label">Heure</label>
          <input type="time" class="form-input" id="res-heure"/>
        </div>
      </div>
      <div class="form-field">
        <label class="form-label">Durée estimée (heures)</label>
        <div class="duree-btns" id="duree-btns">
          <button class="duree-btn active" data-duree="1">1h</button>
          <button class="duree-btn" data-duree="2">2h</button>
          <button class="duree-btn" data-duree="3">3h</button>
          <button class="duree-btn" data-duree="4">4h</button>
          <button class="duree-btn" data-duree="6">6h</button>
          <button class="duree-btn" data-duree="8">8h</button>
        </div>
      </div>
    </div>
    <div class="res-nav">
      <a href="#accueil" class="btn-outline">Retour</a>
      <button class="btn-yellow" id="next-1">Continuer →</button>
    </div>
  </div>

  <!-- ═══ ÉTAPE 2 — VÉHICULE ═══ -->
  <div class="res-screen" id="screen-2">
    <h1 class="res-title">Choisissez votre véhicule</h1>
    <p class="res-sub">Sélectionnez un véhicule et un chauffeur pour votre trajet.</p>

    <div class="res-card" style="margin-bottom:24px">
      <div class="vehicules-grid" id="vehicules-grid">
        <div class="vehicule-item" data-vehicule="Mercedes Classe S" data-prix="45000" data-cat="BERLINE LUXE" data-places="4">
          <div class="vehicule-info">
            <div class="vehicule-cat">BERLINE LUXE</div>
            <div class="vehicule-nom">Mercedes Classe S</div>
            <div class="vehicule-places">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
              4 places
            </div>
          </div>
          <div class="vehicule-prix"><span class="prix-num">45 000</span> <span class="prix-unit">FCFA/h</span></div>
        </div>
        <div class="vehicule-item" data-vehicule="Toyota Land Cruiser" data-prix="55000" data-cat="SUV PREMIUM" data-places="7">
          <div class="vehicule-info">
            <div class="vehicule-cat">SUV PREMIUM</div>
            <div class="vehicule-nom">Toyota Land Cruiser</div>
            <div class="vehicule-places">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
              7 places
            </div>
          </div>
          <div class="vehicule-prix"><span class="prix-num">55 000</span> <span class="prix-unit">FCFA/h</span></div>
        </div>
        <div class="vehicule-item" data-vehicule="Hyundai Staria" data-prix="50000" data-cat="MINIBUS VIP" data-places="9">
          <div class="vehicule-info">
            <div class="vehicule-cat">MINIBUS VIP</div>
            <div class="vehicule-nom">Hyundai Staria</div>
            <div class="vehicule-places">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
              9 places
            </div>
          </div>
          <div class="vehicule-prix"><span class="prix-num">50 000</span> <span class="prix-unit">FCFA/h</span></div>
        </div>
        <div class="vehicule-item" data-vehicule="Peugeot 508" data-prix="30000" data-cat="BERLINE CONFORT" data-places="4">
          <div class="vehicule-info">
            <div class="vehicule-cat">BERLINE CONFORT</div>
            <div class="vehicule-nom">Peugeot 508</div>
            <div class="vehicule-places">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="2"/></svg>
              4 places
            </div>
          </div>
          <div class="vehicule-prix"><span class="prix-num">30 000</span> <span class="prix-unit">FCFA/h</span></div>
        </div>
      </div>
    </div>

    <h2 class="res-section-title">Sélectionner un chauffeur</h2>
    <div class="res-card">
      <div class="chauffeurs-grid" id="chauffeurs-grid">
        <div class="chauffeur-item" data-chauffeur="Ibrahima Sow">
          <div class="chauffeur-avatar">IS</div>
          <div class="chauffeur-info">
            <div class="chauffeur-nom">Ibrahima Sow</div>
            <div class="chauffeur-meta">4.9 ★ • 312 trajets</div>
          </div>
        </div>
        <div class="chauffeur-item" data-chauffeur="Moussa Ba">
          <div class="chauffeur-avatar">MB</div>
          <div class="chauffeur-info">
            <div class="chauffeur-nom">Moussa Ba</div>
            <div class="chauffeur-meta">4.8 ★ • 245 trajets</div>
          </div>
        </div>
        <div class="chauffeur-item" data-chauffeur="Seydou Diouf">
          <div class="chauffeur-avatar">SD</div>
          <div class="chauffeur-info">
            <div class="chauffeur-nom">Seydou Diouf</div>
            <div class="chauffeur-meta">4.7 ★ • 198 trajets</div>
          </div>
        </div>
        <div class="chauffeur-item" data-chauffeur="Cheikh Kane">
          <div class="chauffeur-avatar">CK</div>
          <div class="chauffeur-info">
            <div class="chauffeur-nom">Cheikh Kane</div>
            <div class="chauffeur-meta">4.9 ★ • 421 trajets</div>
          </div>
        </div>
      </div>
    </div>

    <div class="res-nav">
      <button class="btn-outline" id="prev-2">← Précédent</button>
      <button class="btn-yellow" id="next-2">Continuer →</button>
    </div>
  </div>

  <!-- ═══ ÉTAPE 3 — DÉTAILS ═══ -->
  <div class="res-screen" id="screen-3">
    <h1 class="res-title">Vos coordonnées</h1>
    <p class="res-sub">Pour confirmer votre réservation.</p>
    <div class="res-card">
      <div class="res-row-2">
        <div class="form-field">
          <label class="form-label">Nom complet</label>
          <input type="text" class="form-input" id="res-nom" placeholder="Mamadou Diallo"/>
        </div>
        <div class="form-field">
          <label class="form-label">Téléphone</label>
          <input type="tel" class="form-input" id="res-tel" placeholder="+221 77 000 0000"/>
        </div>
      </div>
      <div class="form-field">
        <label class="form-label">Notes / Instructions spéciales</label>
        <textarea class="form-input" id="res-notes" rows="4" placeholder="Ex: Besoin d'un siège enfant, arrêt supplémentaire..." style="resize:vertical"></textarea>
      </div>
      <div class="recap-box">
        <div class="recap-title">Récapitulatif</div>
        <div class="recap-row"><span class="recap-label">Trajet</span><span class="recap-val" id="recap-trajet">—</span></div>
        <div class="recap-row"><span class="recap-label">Date</span><span class="recap-val" id="recap-date">—</span></div>
        <div class="recap-row"><span class="recap-label">Durée</span><span class="recap-val" id="recap-duree">—</span></div>
        <div class="recap-row"><span class="recap-label">Véhicule</span><span class="recap-val" id="recap-vehicule">—</span></div>
        <div class="recap-row"><span class="recap-label">Chauffeur</span><span class="recap-val" id="recap-chauffeur">—</span></div>
        <div class="recap-row recap-total"><span class="recap-label" style="font-weight:800;color:var(--txt-main)">Total</span><span class="recap-val yellow" id="recap-total">0 FCFA</span></div>
      </div>
    </div>
    <div class="res-nav">
      <button class="btn-outline" id="prev-3">← Précédent</button>
      <button class="btn-yellow" id="next-3">Continuer →</button>
    </div>
  </div>

  <!-- ═══ ÉTAPE 4 — PAIEMENT ═══ -->
  <div class="res-screen" id="screen-4">
    <h1 class="res-title">Choisissez votre mode de paiement</h1>
    <p class="res-sub">Paiement 100% sécurisé.</p>
    <div class="paiement-grid">
      <div class="paiement-item" data-paiement="Wave">
        <div class="paiement-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect width="24" height="24" rx="6" fill="#1A56DB"/>
            <path d="M6 12h12M6 8l4 8 2-4 2 4 4-8" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="paiement-nom">Wave</div>
      </div>
      <div class="paiement-item" data-paiement="Orange Money">
        <div class="paiement-icon">
          <div style="width:40px;height:40px;border-radius:50%;background:#FF6600;display:flex;align-items:center;justify-content:center;">
            <div style="width:20px;height:20px;border-radius:50%;background:white;"></div>
          </div>
        </div>
        <div class="paiement-nom">Orange Money</div>
      </div>
      <div class="paiement-item" data-paiement="Free Money">
        <div class="paiement-icon">
          <div style="width:40px;height:40px;border-radius:50%;background:#22C55E;display:flex;align-items:center;justify-content:center;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
        </div>
        <div class="paiement-nom">Free Money</div>
      </div>
      <div class="paiement-item" data-paiement="Carte bancaire">
        <div class="paiement-icon">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <rect x="2" y="5" width="20" height="14" rx="3" fill="#374151" stroke="#6B7280" stroke-width="1"/>
            <rect x="2" y="9" width="20" height="4" fill="#FACC15"/>
            <rect x="5" y="15" width="6" height="2" rx="1" fill="#9CA3AF"/>
          </svg>
        </div>
        <div class="paiement-nom">Carte bancaire</div>
      </div>
    </div>

    <div class="res-card" style="margin-top:24px">
      <div class="recap-title" style="margin-bottom:12px">Total à payer</div>
      <div style="display:flex;align-items:baseline;gap:8px;margin-bottom:6px">
        <span class="prix-num" id="total-final" style="font-size:32px">0</span>
        <span style="color:var(--txt-sub);font-weight:700">FCFA</span>
      </div>
      <div style="color:var(--txt-faint);font-size:13px" id="total-detail">• 1h • —</div>
    </div>

    <div class="res-nav">
      <button class="btn-outline" id="prev-4">← Précédent</button>
      <button class="btn-yellow" id="btn-confirmer">Confirmer la réservation →</button>
    </div>
  </div>

</div>

<style>
.res-page { background:var(--bg); min-height:93.1vh; padding:60px 0 80px; display:flex; flex-direction:column; align-items:center; }

/* Stepper */
.res-steps { display:flex; align-items:center; gap:0; }
.res-step { display:flex; align-items:center; gap:8px; }
.res-step-num {
  width:32px; height:32px; border-radius:50%; border:2px solid var(--border);
  display:flex; align-items:center; justify-content:center;
  font-size:13px; font-weight:800; color:var(--txt-faint); transition:all .3s;
}
.res-step.active .res-step-num { background:var(--yellow); border-color:var(--yellow); color:#111827; }
.res-step.done .res-step-num { background:var(--yellow); border-color:var(--yellow); color:#111827; }
.res-step-label { font-size:13px; font-weight:600; color:var(--txt-faint); transition:color .3s; }
.res-step.active .res-step-label { color:var(--txt-main); }
.res-step.done .res-step-label { color:var(--txt-sub); }
.res-step-line { width:48px; height:1px; background:var(--border); margin:0 8px; transition:background .3s; }
.res-step.done + .res-step-line { background:var(--yellow); }

/* Screens */
.res-screen { display:none; width:100%; max-width:600px; padding:0 24px; }
.res-screen.active { display:block; }
.res-title { font-size:36px; font-weight:900; letter-spacing:-1px; color:var(--txt-main); margin-bottom:8px; }
.res-sub { color:var(--txt-sub); font-size:15px; margin-bottom:32px; }
.res-section-title { font-size:18px; font-weight:800; color:var(--txt-main); margin:24px 0 16px; }

.res-card {
  background:var(--bg-card); border:1px solid var(--border-faint);
  border-radius:20px; padding:28px; display:flex; flex-direction:column; gap:18px;
}
.res-row-2 { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

/* Durée */
.duree-btns { display:flex; gap:8px; flex-wrap:wrap; }
.duree-btn {
  padding:10px 18px; border-radius:10px; border:1.5px solid var(--border);
  background:transparent; color:var(--txt-sub); font-size:14px; font-weight:700;
  cursor:pointer; transition:all .2s; font-family:inherit;
}
.duree-btn:hover { border-color:var(--yellow); color:var(--txt-main); }
.duree-btn.active { background:var(--yellow); border-color:var(--yellow); color:#111827; }

/* Véhicules */
.vehicules-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.vehicule-item {
  padding:16px; border-radius:14px; border:1.5px solid var(--border-faint);
  cursor:pointer; transition:all .2s; display:flex; justify-content:space-between; align-items:center;
}
.vehicule-item:hover { border-color:var(--yellow); }
.vehicule-item.selected { border-color:var(--yellow); background:rgba(250,204,21,.06); }
.vehicule-cat { font-size:10px; font-weight:700; letter-spacing:1.5px; color:var(--yellow); margin-bottom:4px; }
.vehicule-nom { font-size:15px; font-weight:800; color:var(--txt-main); margin-bottom:6px; }
.vehicule-places { display:flex; align-items:center; gap:4px; font-size:12px; color:var(--txt-sub); }
.vehicule-prix { text-align:right; }
.vehicule-prix .prix-num { font-size:18px; font-weight:900; color:var(--yellow); }
.vehicule-prix .prix-unit { font-size:11px; color:var(--txt-sub); }

/* Chauffeurs */
.chauffeurs-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
.chauffeur-item {
  display:flex; align-items:center; gap:12px;
  padding:14px 16px; border-radius:14px; border:1.5px solid var(--border-faint);
  cursor:pointer; transition:all .2s;
}
.chauffeur-item:hover { border-color:var(--yellow); }
.chauffeur-item.selected { border-color:var(--yellow); background:rgba(250,204,21,.06); }
.chauffeur-avatar {
  width:40px; height:40px; border-radius:50%; background:var(--yellow);
  color:#111827; font-weight:800; font-size:13px;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}
.chauffeur-nom { font-size:14px; font-weight:700; color:var(--txt-main); }
.chauffeur-meta { font-size:12px; color:var(--txt-sub); margin-top:2px; }

/* Récap */
.recap-box { background:var(--bg-input); border-radius:14px; padding:20px; display:flex; flex-direction:column; gap:10px; }
.recap-title { font-size:14px; font-weight:800; color:var(--txt-main); margin-bottom:4px; }
.recap-row { display:flex; justify-content:space-between; align-items:center; font-size:13px; }
.recap-label { color:var(--txt-sub); }
.recap-val { color:var(--txt-main); font-weight:600; }
.recap-val.yellow { color:var(--yellow); font-weight:900; font-size:16px; }
.recap-total { border-top:1px solid var(--border-faint); padding-top:10px; margin-top:4px; }

/* Paiement */
.paiement-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; width:100%; max-width:600px; padding:0 24px; }
.paiement-item {
  background:var(--bg-card); border:1.5px solid var(--border-faint);
  border-radius:20px; padding:32px 24px;
  display:flex; flex-direction:column; align-items:center; gap:14px;
  cursor:pointer; transition:all .2s;
}
.paiement-item:hover { border-color:var(--yellow); transform:translateY(-2px); }
.paiement-item.selected { border-color:var(--yellow); background:rgba(250,204,21,.06); }
.paiement-nom { font-size:14px; font-weight:700; color:var(--txt-main); }

/* Nav */
.res-nav { display:flex; justify-content:space-between; align-items:center; margin-top:32px; }

.yellow { color:var(--yellow); }
</style>
`;
