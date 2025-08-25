document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptAllBtn = document.getElementById('accept-all');
    const acceptNecessaryBtn = document.getElementById('accept-necessary');

    // Función para mostrar el banner
    const showCookieBanner = () => {
        if (!localStorage.getItem('cookieConsent')) {
            cookieBanner.classList.remove('hidden');
        }
    };

    // Función para ocultar el banner y guardar el consentimiento
    const hideCookieBanner = (consentType) => {
        localStorage.setItem('cookieConsent', consentType);
        cookieBanner.classList.add('hidden');
        console.log(`Consentimiento de cookies guardado: ${consentType}`);
        // Aquí puedes añadir la lógica para cargar scripts de analítica si el usuario aceptó
    };

    // Event listeners para los botones
    acceptAllBtn.addEventListener('click', () => {
        hideCookieBanner('accepted-all');
    });

    acceptNecessaryBtn.addEventListener('click', () => {
        hideCookieBanner('accepted-necessary');
    });

    // Muestra el banner al cargar la página
    showCookieBanner();
});