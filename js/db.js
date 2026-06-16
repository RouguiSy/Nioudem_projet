const BASE = 'http://127.0.0.1:3000'; 
const API_USERS        = `${BASE}/users`;
const API_RESERVATIONS = `${BASE}/reservations`;
const API_VEHICLES     = `${BASE}/vehicles`;
const API_DRIVERS      = `${BASE}/drivers`;
const API_INCIDENTS    = `${BASE}/incidents`;

export async function initDB() {}

export async function getUsers() {
    const res = await fetch(API_USERS);
    return await res.json();
}

export async function findUser(email) {
    const res   = await fetch(`${API_USERS}?email=${encodeURIComponent(email)}`);
    const users = await res.json();
    return users[0] || null;
}

export async function addUser(user) {
    await fetch(API_USERS, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(user)
    });
}


export async function getReservations() {
    const res = await fetch(API_RESERVATIONS);
    return await res.json();
}

export async function getReservationsByUser(userId) {
    const res  = await fetch(`${API_RESERVATIONS}?clientId=${userId}`);
    return await res.json();
}

export async function addReservation(reservation) {
    const res = await fetch(API_RESERVATIONS, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(reservation)
    });
    return await res.json();
}

async function postJSON(url, payload) {
    const res = await fetch(url, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload)
    });
    return await res.json();
}

async function patchJSON(url, payload) {
    const res = await fetch(url, {
        method : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(payload)
    });
    return await res.json();
}

async function deleteJSON(url) {
    await fetch(url, { method: 'DELETE' });
}

export async function getVehicles() {
    const res = await fetch(API_VEHICLES);
    return await res.json();
}

export async function addVehicle(vehicle) {
    return await postJSON(API_VEHICLES, vehicle);
}

export async function updateVehicle(id, vehicle) {
    return await patchJSON(`${API_VEHICLES}/${encodeURIComponent(id)}`, vehicle);
}

export async function deleteVehicle(id) {
    return await deleteJSON(`${API_VEHICLES}/${encodeURIComponent(id)}`);
}

export async function getDrivers() {
    const res = await fetch(API_DRIVERS);
    return await res.json();
}

export async function addDriver(driver) {
    return await postJSON(API_DRIVERS, driver);
}

export async function updateDriver(id, driver) {
    return await patchJSON(`${API_DRIVERS}/${encodeURIComponent(id)}`, driver);
}

export async function deleteDriver(id) {
    return await deleteJSON(`${API_DRIVERS}/${encodeURIComponent(id)}`);
}

export async function getIncidents() {
    const res = await fetch(API_INCIDENTS);
    return await res.json();
}

export async function addIncident(incident) {
    return await postJSON(API_INCIDENTS, incident);
}

export async function updateIncident(id, incident) {
    return await patchJSON(`${API_INCIDENTS}/${encodeURIComponent(id)}`, incident);
}

export async function deleteIncident(id) {
    return await deleteJSON(`${API_INCIDENTS}/${encodeURIComponent(id)}`);
}
