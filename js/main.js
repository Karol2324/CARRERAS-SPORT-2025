// Función para alternar el menú móvil
function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobileMenu');
  mobileMenu.classList.toggle('active');
}

// Cerrar menú móvil al hacer clic fuera
document.addEventListener('click', function(event) {
  const mobileMenu = document.getElementById('mobileMenu');
  const menuBtn = document.querySelector('.mobile-menu-btn');
    
  if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
  }
});

// Smooth scroll para enlaces internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));

    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Animación de entrada para las cards
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Función para manejar la lógica de la página de cuenta
function handleAccountPage() {
  const nombre = localStorage.getItem('nombreUsuario');
  const email = localStorage.getItem('userEmail');
  const userPanel = document.getElementById('userPanel');
  const formsContainer = document.getElementById('formsContainer');
  const userNamePanel = document.getElementById('userNamePanel');
  const userEmailPanel = document.getElementById('userEmailPanel');
  const cuentaLink = document.getElementById('cuentaLink');
  const cuentaLinkMovil = document.getElementById('cuentaLinkMovil');
  const logoutItem = document.getElementById('logout-item');
  const logoutBtn = document.getElementById('logout-btn');

  if (nombre) {
    if (cuentaLink) {
      cuentaLink.textContent = 'Hola, ' + nombre;
    }
    if (cuentaLinkMovil) {
      cuentaLinkMovil.textContent = 'Hola, ' + nombre;
    }
    if (logoutItem) {
      logoutItem.style.display = 'inline-block';
    }
  } else {
    if (logoutItem) {
      logoutItem.style.display = 'none';
    }
  }

  // Lógica para mostrar el panel o los formularios en la página de cuenta
  if (document.body.classList.contains('account-page-body')) {
    if (nombre) {
      if (userPanel && formsContainer) {
        userPanel.classList.remove('hidden');
        userPanel.classList.add('active');
        formsContainer.classList.add('hidden');
        userNamePanel.textContent = 'Hola, ' + nombre;
        userEmailPanel.textContent = email || 'Correo no disponible';
      }
    } else {
      if (userPanel && formsContainer) {
        userPanel.classList.add('hidden');
        userPanel.classList.remove('active');
        formsContainer.classList.remove('hidden');
      }
    }
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('nombreUsuario');
      localStorage.removeItem('userEmail');
      if (cuentaLink) {
        cuentaLink.textContent = 'Mi cuenta';
      }
      if (cuentaLinkMovil) {
        cuentaLinkMovil.textContent = 'Mi cuenta';
      }
      if (logoutItem) {
        logoutItem.style.display = 'none';
      }
      window.location.href = 'cuenta.html';
    });
  }
}

// Aplicar animación a las cards cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
  // Animación de entrada para las racing cards
  const cards = document.querySelectorAll('.racing-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = `all 0.6s ease ${index * 0.2}s`;
    observer.observe(card);
  });

  // Efecto de hover mejorado para los enlaces de navegación
  const navLinks = document.querySelectorAll('.nav-desktop a');
  navLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.05)';
    });
    
    link.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0) scale(1)';
      }
    });
  });

  // Efecto de carga para el logo
  const logoIcon = document.querySelector('.logo-icon');
  if (logoIcon) {
    logoIcon.addEventListener('click', function() {
      this.style.animation = 'none';
      setTimeout(() => {
        this.style.animation = 'pulse 0.5s ease-in-out';
      }, 10);
    });
  }

  // Mejora de accesibilidad: navegación con teclado
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      const mobileMenu = document.getElementById('mobileMenu');
      mobileMenu.classList.remove('active');
    }
  });

  // Indicador de carga de página
  window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
      document.body.style.opacity = '1';
    }, 100);
  });

  // Muestra el modal de contenido exclusivo si el usuario no ha iniciado sesión
  const nombre = localStorage.getItem('nombreUsuario');
  if (!nombre) {
    const modal = document.getElementById('exclusivoModal');
    const closeBtn = modal?.querySelector('.close');

    if (modal) {
      modal.style.display = 'block';
    }
    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.style.display = 'none';
      };
    }
    window.onclick = (event) => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  }

 // Llama a la nueva función que controla la lógica de la página de cuenta
  handleAccountPage();

  // Lógica del acordeón para el historial de apuestas
  const historyAccordionHeader = document.getElementById('historyAccordionHeader');
  const historyAccordionContent = document.getElementById('historyAccordionContent');
  const accordionContainer = document.querySelector('.accordion-container');

  if (historyAccordionHeader && historyAccordionContent && accordionContainer) {
    historyAccordionHeader.addEventListener('click', () => {
      accordionContainer.classList.toggle('active');
      historyAccordionContent.classList.toggle('hidden');
    });
  }

  // Lógica del acordeón para el historial de compras
  const purchasesAccordionHeader = document.getElementById('purchasesAccordionHeader');
  const purchasesAccordionContent = document.getElementById('purchasesAccordionContent');
  const purchasesAccordionContainer = document.getElementById('purchasesAccordionHeader').closest('.accordion-container');
  
  if (purchasesAccordionHeader && purchasesAccordionContent && purchasesAccordionContainer) {
    purchasesAccordionHeader.addEventListener('click', () => {
      purchasesAccordionContainer.classList.toggle('active');
      purchasesAccordionContent.classList.toggle('hidden');
    });
  }
});

// Función para manejar el cambio de tamaño de ventana
window.addEventListener('resize', function() {
  const mobileMenu = document.getElementById('mobileMenu');
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove('active');
  }
});

// Función para destacar el enlace activo basado en la sección actual
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-desktop a, .nav-mobile a');
  
  let currentSection = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
      currentSection = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

// Actualizar enlace activo al hacer scroll
window.addEventListener('scroll', updateActiveNavLink);