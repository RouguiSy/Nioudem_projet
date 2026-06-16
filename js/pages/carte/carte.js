export const cartePage = `
<div class="carte-layout">

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
        <div style="font-size:10px;color:var(--txt-faint)" id="carte-count">4 trajets</div>
      </div>
    </div>

    <div style="padding:12px 16px;border-bottom:1px solid var(--border-faint)">
      <div style="font-size:10px;font-weight:700;letter-spacing:1.5px;color:var(--txt-faint);text-transform:uppercase">TRAJETS EN COURS</div>
    </div>

    <div class="carte-trajets" id="carte-trajets"></div>

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

  <div class="carte-map">
    <div id="leaflet-map" style="width:100%;height:100%"></div>
  </div>

</div>

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>

`;