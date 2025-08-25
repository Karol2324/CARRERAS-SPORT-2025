// Conexión a Supabase (debe ser la misma que en registro.js)
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://excevrofgzathrripceq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Y2V2cm9mZ3phdGhycmlwY2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDE4MTIsImV4cCI6MjA2ODc3NzgxMn0.AAyL9tvpEBblI1107r_P3bMOsEULP5ffVESt_T1OUnM';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', async function () {
  const updatePasswordForm = document.getElementById('updatePasswordForm');
  const statusMessage = document.getElementById('statusMessage');

  // Supabase automáticamente maneja el token de la URL. Solo necesitamos obtener la sesión.
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    statusMessage.style.display = 'block';
    statusMessage.style.color = 'red';
    statusMessage.innerText = 'El enlace de recuperación es inválido o ha expirado. Por favor, solicita uno nuevo.';
    return;
  }

  updatePasswordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmNewPassword = document.getElementById('confirmNewPassword').value;

    if (newPassword !== confirmNewPassword) {
      statusMessage.style.display = 'block';
      statusMessage.style.color = 'red';
      statusMessage.innerText = 'Las contraseñas no coinciden.';
      return;
    }
    
    statusMessage.innerText = '';
    statusMessage.style.display = 'none';

    try {
      // La función updateUser actualiza la contraseña del usuario que está logueado con el token.
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        console.error('Error al actualizar la contraseña:', error.message);
        statusMessage.style.display = 'block';
        statusMessage.style.color = 'red';
        statusMessage.innerText = 'No se pudo actualizar la contraseña. Por favor, inténtalo de nuevo.';
      } else {
        statusMessage.style.display = 'block';
        statusMessage.style.color = 'green';
        statusMessage.innerText = '¡Contraseña actualizada con éxito! Redirigiendo...';
        
        // Redirección corregida con ruta relativa
        setTimeout(() => {
          window.location.href = '/cuenta.html';
        }, 3000);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      statusMessage.style.display = 'block';
      statusMessage.style.color = 'red';
      statusMessage.innerText = 'Ocurrió un error inesperado. Por favor, inténtalo más tarde.';
    }
  });
});