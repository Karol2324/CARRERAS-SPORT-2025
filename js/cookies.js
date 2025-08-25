document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptButton = document.getElementById('accept-cookies');

  // Comprobar si el usuario ya ha aceptado las cookies
  if (!localStorage.getItem('cookies-accepted')) {
    // Agrega la clase 'active' para que se muestre con la animación
    setTimeout(() => {
      cookieBanner.classList.add('active');
    }, 500); // Pequeño retraso para que la animación se note
  }

  // Manejar el clic en el botón de aceptar
  acceptButton.addEventListener('click', () => {
    localStorage.setItem('cookies-accepted', 'true');
    // Remueve la clase 'active' para ocultarlo con animación
    cookieBanner.classList.remove('active');
  });
});