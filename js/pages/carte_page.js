export const cartePage = `
<div class="carte-layout">

  <!-- Sidebar gauche -->
  <aside class="carte-sidebar">
    <div class="carte-sidebar-header">
      <a href="#accueil" class="logo">
        <div class="logo-icon logo-icon--sm">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M5 17H3a2 2 0 01-2-2V9a2 2 0 012-2h2l3-4h8l3 4h2a2 2 0 012 2v6a2 2 0 01-2 2h-2l-1 2H6l-1-2z" fill="#111827"/>
            <circle cx="7.5" cy="13.5" r="1.5" fill="#111827"/>
            <circle cx="16.5" cy="13.5" r="1.5" fill="#111827"/>
          </svg>
        </div>
        <span class="logo-text logo-text--sm">ŇiouDeem</span>
      </a>
      <div style="display:flex;flex-direction:column;align-items:flex-end;gap:2px">
        <div id="carte-time" style="font-size:12px;font-weight:700;color:var(--yellow)">--:--:--</div>
        <div style="font-size:10px;color:var(--txt-faint)" id="carte-count">— trajets</div>
      </div>
    </div>

    <div style="padding:12px 16px;border-bottom:1px solid var(--border-faint)">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;color:var(--txt-faint);text-transform:uppercase">TRAJETS EN COURS</div>
    </div>

    <div class="carte-trajets" id="carte-trajets">
      <!-- généré par JS -->
    </div>

    <div class="carte-legende">
      <div style="font-size:10px;font-weight:700;letter-spacing:1px;color:var(--txt-faint);text-transform:uppercase;margin-bottom:8px">LÉGENDE</div>
      <div style="display:flex;gap:16px;flex-wrap:wrap">
        <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt-sub)"><span style="width:10px;height:10px;border-radius:50%;background:#FACC15;display:inline-block"></span>Ibrahima</span>
        <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt-sub)"><span style="width:10px;height:10px;border-radius:50%;background:#22C55E;display:inline-block"></span>Moussa</span>
        <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt-sub)"><span style="width:10px;height:10px;border-radius:50%;background:#60A5FA;display:inline-block"></span>Seydou</span>
        <span style="display:flex;align-items:center;gap:5px;font-size:12px;color:var(--txt-sub)"><span style="width:10px;height:10px;border-radius:50%;background:#A78BFA;display:inline-block"></span>Cheikh</span>
      </div>
    </div>
  </aside>

  <!-- Tooltip -->
  <div class="carte-tooltip" id="carte-tooltip" style="display:none">
    <div class="tooltip-chauffeur" id="tt-chauffeur">—</div>
    <div class="tooltip-vehicule" id="tt-vehicule">—</div>
    <div class="tooltip-trajet" id="tt-trajet">— → —</div>
    <div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px">
      <span style="font-size:11px;color:var(--txt-faint)">Arrivée estimée</span>
      <span class="tooltip-eta" id="tt-eta">—</span>
    </div>
  </div>

  <!-- Carte SVG -->
  <div class="carte-map" id="carte-map">
    <div class="carte-controls">
      <button class="carte-ctrl-btn" id="btn-zoom-in">+</button>
      <button class="carte-ctrl-btn" id="btn-zoom-out">−</button>
    </div>

    <div class="carte-compass">
      <div style="font-weight:900;color:var(--txt-main);font-size:13px">N</div>
      <div style="display:flex;gap:4px">
        <span style="color:var(--txt-faint);font-size:11px">O</span>
        <span style="color:var(--txt-faint);font-size:11px">E</span>
      </div>
      <div style="color:var(--txt-faint);font-size:11px">S</div>
    </div>

    <svg id="map-svg" viewBox="0 0 900 650" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
      <!-- Fond zones -->
      <rect width="900" height="650" fill="transparent"/>
      <polygon points="0,0 400,0 500,650 0,650" fill="rgba(30,41,59,0.3)" opacity="0.4"/>

      <!-- Routes / lignes de trajet -->
      <!-- Plateau → Aéroport LSS (Ibrahima - jaune) -->
      <line id="route-0" x1="540" y1="390" x2="780" y2="260" stroke="#FACC15" stroke-width="2.5" stroke-dasharray="8,4" opacity="0.6"/>
      <!-- Almadies → Thiès (Moussa - vert) -->
      <line id="route-1" x1="310" y1="330" x2="480" y2="185" stroke="#22C55E" stroke-width="2.5" stroke-dasharray="8,4" opacity="0.6"/>
      <!-- Mermoz → Saly (Seydou - bleu) -->
      <line id="route-2" x1="430" y1="360" x2="830" y2="560" stroke="#60A5FA" stroke-width="2.5" stroke-dasharray="8,4" opacity="0.6"/>
      <!-- Point E → Saint-Louis (Cheikh - violet) -->
      <line id="route-3" x1="570" y1="360" x2="470" y2="110" stroke="#A78BFA" stroke-width="2.5" stroke-dasharray="8,4" opacity="0.6"/>

      <!-- Villes — points -->
      <g id="villes">
        <!-- Saint-Louis -->
        <circle cx="470" cy="110" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="488" y="114" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Saint-Louis</text>

        <!-- Thiès -->
        <circle cx="480" cy="185" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="494" y="189" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Thiès</text>

        <!-- Aéroport LSS -->
        <circle cx="780" cy="260" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="796" y="264" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Aéroport LSS</text>

        <!-- Almadies -->
        <circle cx="310" cy="330" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="220" y="325" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Almadies</text>

        <!-- Point E -->
        <circle cx="570" cy="360" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="580" y="354" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Point E</text>

        <!-- Plateau -->
        <circle cx="540" cy="390" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="548" y="410" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Plateau</text>

        <!-- Mermoz -->
        <circle cx="430" cy="360" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="340" y="368" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Mermoz</text>

        <!-- Dakar Centre -->
        <circle cx="490" cy="430" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="498" y="448" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Dakar Centre</text>

        <!-- Saly -->
        <circle cx="830" cy="560" r="5" fill="#E2E8F0" opacity="0.8"/>
        <text x="840" y="564" fill="#94A3B8" font-size="13" font-family="system-ui" font-weight="600">Saly</text>
      </g>

      <!-- Échelle -->
      <line x1="650" y1="610" x2="780" y2="610" stroke="#475569" stroke-width="1.5"/>
      <line x1="650" y1="605" x2="650" y2="615" stroke="#475569" stroke-width="1.5"/>
      <line x1="780" y1="605" x2="780" y2="615" stroke="#475569" stroke-width="1.5"/>
      <text x="690" y="630" fill="#64748B" font-size="11" font-family="system-ui">50 km</text>

      <!-- Voitures animées -->
      <g id="car-0" style="cursor:pointer">
        <circle r="18" fill="#FACC15" opacity="0.2"/>
        <circle r="12" fill="#FACC15"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="800" fill="#111827">IS</text>
      </g>
      <g id="car-1" style="cursor:pointer">
        <circle r="18" fill="#22C55E" opacity="0.2"/>
        <circle r="12" fill="#22C55E"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="800" fill="#111827">MB</text>
      </g>
      <g id="car-2" style="cursor:pointer">
        <circle r="18" fill="#60A5FA" opacity="0.2"/>
        <circle r="12" fill="#60A5FA"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="800" fill="#fff">SD</text>
      </g>
      <g id="car-3" style="cursor:pointer">
        <circle r="18" fill="#A78BFA" opacity="0.2"/>
        <circle r="12" fill="#A78BFA"/>
        <text text-anchor="middle" dominant-baseline="middle" font-size="11" font-weight="800" fill="#fff">CK</text>
      </g>
    </svg>
  </div>
</div>

`;
