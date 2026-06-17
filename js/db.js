let DB = {
    users: [],
    reservations: [],
    vehicles: [],
    drivers: [],
    incidents: [],
};

export async function loadDB() {
    try {
        const response = await fetch('../data/users.json');
        if (!response.ok) {
            throw new Error('Impossible de charger les données');
        }
        const data = await response.json();
        
        DB.users = data.users || [];
        DB.reservations = data.reservations || [];
        DB.vehicles = data.vehicles || [];
        DB.drivers = data.drivers || [];
        DB.incidents = data.incidents || [];
        
        console.log('la base est chargée');
        console.log(`📊 ${DB.users.length} utilisateurs, ${DB.reservations.length} réservations`);
        
        return DB;
    } catch (error) {
        console.error('boy chargement base bi amna erreur dée', error);
        
        DB = {
            users: [
                {
                    id: 'USR-001',
                    nom: 'Admin Système',
                    email: 'admin@nioudeem.com',
                    telephone: '+221 77 000 0000',
                    password: 'admin123',
                    role: 'admin',
                    createdAt: '2024-01-01'
                },
                {
                    id: 'USR-002',
                    nom: 'Client Test',
                    email: 'client@nioudeem.com',
                    telephone: '+221 77 111 1111',
                    password: 'client123',
                    role: 'client',
                    createdAt: '2024-01-15'
                }
            ],
            reservations: [],
            vehicles: [],
            drivers: [],
            incidents: [],
        };
        
        return DB;
    }
}

export function getDB() {
    return DB;
}

export function setDB(data) {
    DB = { ...DB, ...data };
}

export async function getUsers() {
    return DB.users;
}

export async function findUser(email) {
    return DB.users.find(user => user.email === email);
}

export async function addUser(user) {
    DB.users.push(user);
    await saveDB();
    return user;
}

export async function updateUser(id, data) {
    const index = DB.users.findIndex(u => u.id === id);
    if (index !== -1) {
        DB.users[index] = { ...DB.users[index], ...data };
        await saveDB();
        return DB.users[index];
    }
    return null;
}

export async function deleteUser(id) {
    DB.users = DB.users.filter(u => u.id !== id);
    await saveDB();
}

export async function getReservations() {
    return DB.reservations;
}

export async function getReservationsByUser(userId) {
    return DB.reservations.filter(r => r.clientId === userId);
}

export async function addReservation(reservation) {
    DB.reservations.push(reservation);
    await saveDB();
    return reservation;
}

export async function updateReservation(id, data) {
    const index = DB.reservations.findIndex(r => r.id === id);
    if (index !== -1) {
        DB.reservations[index] = { ...DB.reservations[index], ...data };
        await saveDB();
        return DB.reservations[index];
    }
    return null;
}

export async function deleteReservation(id) {
    DB.reservations = DB.reservations.filter(r => r.id !== id);
    await saveDB();
}


export async function getVehicles() {
    return DB.vehicles;
}

export async function addVehicle(vehicle) {
    DB.vehicles.push(vehicle);
    await saveDB();
    return vehicle;
}

export async function updateVehicle(id, data) {
    const index = DB.vehicles.findIndex(v => v.id === id);
    if (index !== -1) {
        DB.vehicles[index] = { ...DB.vehicles[index], ...data };
        await saveDB();
        return DB.vehicles[index];
    }
    return null;
}

export async function deleteVehicle(id) {
    DB.vehicles = DB.vehicles.filter(v => v.id !== id);
    await saveDB();
}

export async function getDrivers() {
    return DB.drivers;
}

export async function addDriver(driver) {
    DB.drivers.push(driver);
    await saveDB();
    return driver;
}

export async function updateDriver(id, data) {
    const index = DB.drivers.findIndex(d => d.id === id);
    if (index !== -1) {
        DB.drivers[index] = { ...DB.drivers[index], ...data };
        await saveDB();
        return DB.drivers[index];
    }
    return null;
}

export async function deleteDriver(id) {
    DB.drivers = DB.drivers.filter(d => d.id !== id);
    await saveDB();
}


export async function getIncidents() {
    return DB.incidents;
}

export async function addIncident(incident) {
    DB.incidents.push(incident);
    await saveDB();
    return incident;
}

export async function updateIncident(id, data) {
    const index = DB.incidents.findIndex(i => i.id === id);
    if (index !== -1) {
        DB.incidents[index] = { ...DB.incidents[index], ...data };
        await saveDB();
        return DB.incidents[index];
    }
    return null;
}

export async function deleteIncident(id) {
    DB.incidents = DB.incidents.filter(i => i.id !== id);
    await saveDB();
}


async function saveDB() {
    try {
        localStorage.setItem('nioudeem_db', JSON.stringify(DB));
        console.log('Base de données sauvegardée');
    } catch (error) {
        console.error(' boy dara sauvegardewoul:', error);
    }
}

export function loadDBFromStorage() {
    try {
        const saved = localStorage.getItem('nioudeem_db');
        if (saved) {
            const data = JSON.parse(saved);
            DB = { ...DB, ...data };
            console.log(' Données chargées depuis localStorage');
            return true;
        }
    } catch (error) {
        console.error('Erreur de chargement localStorage:', error);
    }
    return false;
}

export function resetDB() {
    localStorage.removeItem('nioudeem_db');
    DB = {
        users: [],
        reservations: [],
        vehicles: [],
        drivers: [],
        incidents: [],
    };
    console.log('Base de données réinitialisée');
}