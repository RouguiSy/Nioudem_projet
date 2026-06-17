import { renderNavbar, initNavbar } from '../../components/navbar.js';

export function render() {
  return `
    ${renderNavbar('carte')}
    
    <div class="carte-layout">
      <aside class="carte-sidebar">
        <div class="carte-sidebar-header">
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
}

export function init() {
  
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
  
  function renderSidebar() {
    const container = document.getElementById('carte-trajets');
    if (!container) return;
    container.innerHTML = TRAJETS.map((t, i) => `
      <div class="carte-trajet-card" id="card-${t.id}" onclick="window.carteSelectTrajet(${t.id})">
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

  // ============================================================
  // INITIALISATION DE LA CARTE
  // ============================================================
  updateTime();
  const clockInterval = setInterval(updateTime, 1000);

  setTimeout(async () => {
    renderSidebar();

    // Chargement de Leaflet
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

    // Fonction de sélection de trajet
    window.carteSelectTrajet = function(id) {
      document.querySelectorAll('.carte-trajet-card').forEach(c => c.classList.remove('active'));
      document.getElementById('card-' + id)?.classList.add('active');
      const t = TRAJETS[id];
      const pos = lerpPos(t);
      map.setView(pos, 11, { animate: true });
      markers[id].openPopup();
    };

    // Animation des trajets
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

    // Nettoyage lors du changement de page
    window.addEventListener('hashchange', () => {
      clearInterval(animInterval);
      clearInterval(clockInterval);
      map.remove();
      delete window.carteSelectTrajet;
      delete window._L;
    }, { once: true });
  }, 50);
}

export function afterRender() {
  initNavbar();
}