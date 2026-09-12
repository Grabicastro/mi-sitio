/* ========================================
   INICIALIZACIÓN
   ======================================== */

document.addEventListener('DOMContentLoaded', function () {
  initScrollToTop();
  initAOS();
  initFormSubmit();
  initSmoothScroll();
});

/* ========================================
   SCROLL TO TOP BUTTON
   ======================================== */

function initScrollToTop() {
  const scrollToTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollToTopBtn.classList.add('show');
    } else {
      scrollToTopBtn.classList.remove('show');
    }
  });

  scrollToTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========================================
   AOS INITIALIZATION
   ======================================== */

function initAOS() {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false,
    offset: 100
  });
}

/* ========================================
   SMOOTH SCROLL LINKS
   ======================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Evita el comportamiento por defecto solo si es un anchor válido
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        
        const target = document.querySelector(href);
        const offsetTop = target.offsetTop - 80; // Compensar navbar fixed
        
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ========================================
   FORM SUBMISSION
   ======================================== */

function initFormSubmit() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Obtener valores del formulario
      const name = contactForm.querySelector('input[type="text"]').value;
      const email = contactForm.querySelector('input[type="email"]').value;
      const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
      const message = contactForm.querySelector('textarea').value;

      // Validación básica
      if (!name || !email || !subject || !message) {
        alert('Por favor completa todos los campos');
        return;
      }

      // Enviar a WhatsApp como alternativa
      const whatsappMessage = encodeURIComponent(
        `Hola Graby, me llamo ${name}.\n\nAsunto: ${subject}\n\nMensaje: ${message}\n\nMi email: ${email}`
      );

      const whatsappUrl = `https://wa.link/gvn74g?text=${whatsappMessage}`;

      // Mostrar confirmación
      alert('¡Gracias por tu mensaje! Te contactaremos pronto.');

      // Redirigir a WhatsApp
      window.open(whatsappUrl, '_blank');

      // Limpiar formulario
      contactForm.reset();
    });
  }
}

/* ========================================
   NAVBAR ACTIVE LINK
   ======================================== */

window.addEventListener('scroll', function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 200;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
    }
  });
});

/* ========================================
   ANIMACIÓN DE NÚMEROS (Stats)
   ======================================== */

function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 30);
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 30);
}

// Observador para animar contadores cuando entran en vista
const observerOptions = {
  threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
      entry.target.classList.add('animated');
      
      const stats = entry.target.querySelectorAll('.stat-number');
      stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        if (!isNaN(target)) {
          animateCounter(stat, target);
        }
      });
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const statsSection = document.querySelector('.stats-section');
  if (statsSection) {
    observer.observe(statsSection);
  }
});

/* ========================================
   TEMA OSCURO (Opcional)
   ======================================== */

function initDarkMode() {
  const darkModeToggle = document.getElementById('darkModeToggle');
  
  if (darkModeToggle) {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      darkModeToggle.textContent = '🌞';
    }

    darkModeToggle.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      darkModeToggle.textContent = isDark ? '🌞' : '🌙';
    });
  }
}

// Descomentar si deseas activar el modo oscuro
// initDarkMode();

/* ========================================
   LAZY LOADING DE IMÁGENES
   ======================================== */

function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

document.addEventListener('DOMContentLoaded', initLazyLoading);