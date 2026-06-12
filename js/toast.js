export function showToast(message) {
    const existing = document.getElementById('nd-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'nd-toast';
    toast.textContent = message;

    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '32px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#FACC15',
        color: '#111827',
        padding: '14px 28px',
        borderRadius: '100px',
        fontWeight: '700',
        fontSize: '14px',
        boxShadow: '0 8px 30px rgba(250,204,21,0.4)',
        zIndex: '9999',
        whiteSpace: 'nowrap',
        animation: 'fadeIn 0.3s ease'
    });

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}