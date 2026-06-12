const SESSION_KEY = "nioudeem_session";

export function getSession() {
    try {
        return JSON.parse(sessionStorage.getItem(SESSION_KEY));
    } catch {
        return null;
    }
}

export function setSession(user) {
    const { password, ...safe } = user;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(safe));
}

export function clearSession() {
    sessionStorage.removeItem(SESSION_KEY);
}