const API = 'http://127.0.0.1:3000/users';

export async function initDB() {}

export async function getUsers() {
    const res = await fetch(API);
    return await res.json();
}

export async function findUser(email) {
    const res   = await fetch(`${API}?email=${encodeURIComponent(email)}`);
    const users = await res.json();
    return users[0] || null;
}

export async function addUser(user) {
    await fetch(API, {
        method : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body   : JSON.stringify(user)
    });
}