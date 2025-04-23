// main.js – Lógica global de QrossPass

document.addEventListener("DOMContentLoaded", () => {
  console.log("QrossPass cargado correctamente");

  // 🌐 Selector de idioma con persistencia en localStorage
  const langSelector = document.querySelector(".language-selector");
  if (langSelector) {
    langSelector.value = localStorage.getItem("qrosspass_lang") || "es";
    langSelector.addEventListener("change", (e) => {
      const lang = e.target.value;
      localStorage.setItem("qrosspass_lang", lang);
      alert("Idioma cambiado a: " + lang + " (funcionalidad en desarrollo)");
    });
  }

  // 🔐 Redirección de botones si existen por ID
  const loginBtn = document.getElementById("login-btn");
  const registerBtn = document.getElementById("register-btn");

  loginBtn?.addEventListener("click", () => {
    window.location.href = "pages/usuarios/principal.html";
  });

  registerBtn?.addEventListener("click", () => {
    window.location.href = "pages/usuarios/registro.html";
  });

  // 🖼️ Activar íconos Lucide
  if (window.lucide) {
    lucide.createIcons();
  }

  // 💬 Tooltips Bootstrap
  const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
  tooltipTriggerList.forEach(el => new bootstrap.Tooltip(el));

  // 🔽 Navbar: esconder al bajar, mostrar al subir
  const navbar = document.getElementById('mainNavbar');
  let lastScrollTop = 0;

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    // Ocultar o mostrar navbar
    if (scrollTop > lastScrollTop && scrollTop > 150) {
      navbar?.classList.add("hide");
    } else {
      navbar?.classList.remove("hide");
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    // Mostrar u ocultar botón scroll-to-top
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (scrollTop > 300) {
      scrollTopBtn?.classList.add("show");
    } else {
      scrollTopBtn?.classList.remove("show");
    }
  });

  // Mostrar navbar al subir cursor cerca del top
  document.addEventListener("mousemove", (e) => {
    if (e.clientY < 80) {
      navbar?.classList.remove("hide");
    }
  });

  // 🧊 Blur dinámico cuando se hace hover sobre items del navbar central
  const overlay = document.getElementById("blur-overlay");
  const hoverTriggers = document.querySelectorAll(".dropdown-hover");

  hoverTriggers.forEach(trigger => {
    trigger.addEventListener("mouseenter", () => {
      overlay?.classList.add("active");
    });

    trigger.addEventListener("mouseleave", () => {
      setTimeout(() => {
        const isStillHovering = Array.from(hoverTriggers).some(item => item.matches(":hover"));
        if (!isStillHovering) {
          overlay?.classList.remove("active");
        }
      }, 100);
    });
  });

  overlay?.addEventListener("mouseenter", () => {
    overlay.classList.remove("active");
  });

  // 🎬 Animación inicial del Hero Section
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.style.opacity = 0;
    hero.style.transform = "translateY(30px)";
    setTimeout(() => {
      hero.style.transition = "all 0.6s ease";
      hero.style.opacity = 1;
      hero.style.transform = "translateY(0)";
    }, 300);
  }

  // 📱 Navbar responsive toggle en móviles
  const toggleButton = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (toggleButton && navbarCollapse) {
    toggleButton.addEventListener('click', () => {
      navbarCollapse.classList.toggle('show');
    });
  }

  // ⬆️ Botón flotante scroll-to-top
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  scrollTopBtn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// 👁️ Observer para efecto fade-in al hacer scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-hidden').forEach(el => {
  observer.observe(el);
});

