// Conexión a Supabase
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const supabaseUrl = 'https://excevrofgzathrripceq.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Y2V2cm9mZ3phdGhycmlwY2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDE4MTIsImV4cCI6MjA2ODc3NzgxMn0.AAyL9tvpEBblI1107r_P3bMOsEULP5ffVESt_T1OUnM';
const supabase = createClient(supabaseUrl, supabaseKey);

document.addEventListener('DOMContentLoaded', function () {
  const formSwitcher = document.querySelector('.form-switcher');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const recoverPasswordForm = document.getElementById('recoverPasswordForm');
  
  // Mostrar formulario activo
  function showForm(formId) {
    [loginForm, registerForm, recoverPasswordForm].forEach(form => {
      form.classList.add('hidden');
      form.classList.remove('active');
    });
    
    const formToShow = document.getElementById(formId);
    formToShow.classList.remove('hidden');
    formToShow.classList.add('active');

    const switchBtns = document.querySelectorAll('.switch-btn');
    switchBtns.forEach(btn => btn.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-form="${formId.replace('Form', '')}"]`);
    if (activeBtn) activeBtn.classList.add('active');
  }

  // Alternar entre formularios
  formSwitcher.addEventListener('click', function (event) {
    if (event.target.classList.contains('switch-btn')) {
      const formId = event.target.dataset.form + 'Form';
      showForm(formId);
    }
  });
  
  document.querySelector('.forgot-password-link').addEventListener('click', function (e) {
    e.preventDefault();
    showForm('recoverPasswordForm');
  });
  
  document.querySelector('.back-to-login-link').addEventListener('click', function (e) {
    e.preventDefault();
    showForm('loginForm');
  });
  
  showForm('loginForm'); // Mostrar login al cargar

  // --- LÓGICA DE AUTENTICACIÓN CON SUPABASE ---

  // 1. Registro
  registerForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const nombreCompleto = document.getElementById('registerName').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          full_name: nombreCompleto
        }
      }
    });
      
    if (error) {
      console.error('Error al registrar:', error);
      alert('Error al registrar el usuario: ' + error.message);
    } else {
      alert('¡Registro exitoso! Por favor, revisa tu correo para confirmar tu cuenta.');
      registerForm.reset();
    }
  });

  // 2. Inicio de sesión
  loginForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      alert('Correo o contraseña incorrectos.');
      console.error('Error de inicio de sesión:', error);
      return;
    }

    if (data && data.user) {
      const nombreUsuario = data.user.user_metadata?.full_name || data.user.email;
      localStorage.setItem('nombreUsuario', nombreUsuario);
      window.location.href = 'index.html';
    }
  });

  // 3. Recuperación de contraseña con Supabase Auth
  recoverPasswordForm.addEventListener('submit', async function (e) {
    e.preventDefault();
    const email = document.getElementById('recoverEmail').value.trim();
    
    // Aquí está la línea corregida
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://127.0.0.1:5500/CARRERAS-SPORT-2025-main/Proyecto-Carreras%20Sport/nuevacontrasena.html' 
    });

    if (error) {
      console.error('Error al enviar el enlace de recuperación:', error);
      alert('Error al enviar el enlace. Por favor, inténtalo de nuevo.');
    } else {
      alert('Se ha enviado un enlace para restablecer tu contraseña a tu correo electrónico. Revisa tu bandeja de entrada.');
      recoverPasswordForm.reset();
    }
  });
});
