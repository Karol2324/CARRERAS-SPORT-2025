// Conexión a Supabase
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

  const supabaseUrl = 'https://excevrofgzathrripceq.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV4Y2V2cm9mZ3phdGhycmlwY2VxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyMDE4MTIsImV4cCI6MjA2ODc3NzgxMn0.AAyL9tvpEBblI1107r_P3bMOsEULP5ffVESt_T1OUnM';
  const supabase = createClient(supabaseUrl, supabaseKey);

  document.addEventListener('DOMContentLoaded', function () {
    const formSwitcher = document.querySelector('.form-switcher');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const recoverPasswordForm = document.getElementById('recoverPasswordForm')
    
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

    // Registro con Supabase
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

      const [nombre, ...resto] = nombreCompleto.split(' ');
      const apellido = resto.join(' ') || '';
      const hashedPassword = btoa(password); // ⚠️ Solo demostración

      const { data, error } = await supabase
        .from('usuarios')
        .insert([
          {
            nombre,
            apellido,
            email,
            password_hash: hashedPassword
          }
        ]);
        
        if (error) {
          console.error('Error al registrar:', error);
          alert('Error al registrar el usuario. Revisa la consola para más detalles.');
        } else {
          alert('Usuario registrado con éxito');
          registerForm.reset();
        }
      });

      // Opcional: Login y recuperación simulados
      loginForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value;
        const hashedPassword = btoa(password); // igual al registro

      // Buscar el usuario en Supabase
        const { data, error } = await supabase
          .from('usuarios')
          .select('nombre, apellido')
          .eq('email', email)
          .eq('password_hash', hashedPassword)
          .single(); // solo un resultado

        if (error || !data) {
          alert('Correo o contraseña incorrectos.');
          return;
        }

      // Guardar nombre en localStorage y redirigir
          localStorage.setItem('nombreUsuario', data.nombre);
          window.location.href = 'index.html'; // Redirige al inicio
      });

      recoverPasswordForm.addEventListener('submit', function (e) {
          e.preventDefault();
          alert('Aquí irá la lógica de recuperación');
      });
    });

// console.log('Login hash:', hashedPassword);
// console.log('Email:', email);
// console.log('Resultado de Supabase:', data);
// console.log('Error:', error);