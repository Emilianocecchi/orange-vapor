/**
 * Orange Vapor - JavaScript para Navbar
 * Optimizado para rendimiento y experiencia de usuario
 * Version: 3.0
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // =========================================================================
  // VARIABLES GLOBALES PARA NAVBAR
  // =========================================================================
  
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.ov-mobile-toggle');
  const navMenu = document.querySelector('.ov-nav-menu');
  const navWrapper = document.querySelector('.ov-nav-wrapper');
  const dropdowns = document.querySelectorAll('.ov-dropdown');
  const dropdownToggles = document.querySelectorAll('.ov-dropdown-toggle');
  
  // Variables para control de animaciones y eventos
  let lastScrollTop = 0;
  let isScrolling = false;
  let resizeTimer;
  let scrollTimer;
  
  // =========================================================================
  // FUNCIONES PRINCIPALES DE NAVBAR
  // =========================================================================
  
  /**
   * Inicializa todos los componentes de la navbar
   */
  function initNavbar() {
    if (!header) return;
    
    // Configurar listeners para eventos principales
    setupScrollEvents();
    setupMobileMenu();
    setupDropdowns();
    setupSmoothScroll();
    setupCloseOnClick();
    
    // Añadir clases iniciales si es necesario
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    }
    
    // Highlight de enlaces activos
    highlightActiveLinks();
    
    // Inicializar animación del CTA
    initCtaAnimation();
  }
  
  /**
   * Configura eventos de scroll para la navbar
   */
  function setupScrollEvents() {
    window.addEventListener('scroll', function() {
      if (!isScrolling) {
        window.requestAnimationFrame(function() {
          handleScroll();
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }
  
  /**
   * Maneja el comportamiento de scroll
   */
  function handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Cambio de estilo al scrollear
    if (scrollTop > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Ocultar navbar al scrollear hacia abajo (solo en desktop)
    if (window.innerWidth > 1024) {
      if (scrollTop > lastScrollTop && scrollTop > 300) {
        header.classList.add('scrolled-down');
      } else {
        header.classList.remove('scrolled-down');
      }
    } else {
      header.classList.remove('scrolled-down');
    }
    
    // Actualizar enlaces activos según sección visible
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(function() {
        highlightActiveSection();
      }, 100);
    }
    
    lastScrollTop = scrollTop;
  }
  
  /**
   * Configura el comportamiento del menú móvil
   */
  function setupMobileMenu() {
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navWrapper.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Actualizar aria-expanded
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Controlar scroll del body
        document.body.style.overflow = isExpanded ? 'hidden' : '';
      });
    }
  }
  
  /**
   * Cierra el menú móvil
   */
  function closeMobileMenu() {
    if (window.innerWidth <= 1024) {
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      
      if (navWrapper) {
        navWrapper.classList.remove('active');
      }
      
      if (navMenu) {
        navMenu.classList.remove('active');
      }
      
      document.body.style.overflow = '';
    }
  }
  
  /**
   * Configura el comportamiento de los dropdowns
   */
  function setupDropdowns() {
    // Toggle en dropdown
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function(e) {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          const parent = this.closest('.ov-dropdown');
          
          // Cerrar otros dropdowns
          dropdowns.forEach(dropdown => {
            if (dropdown !== parent) {
              dropdown.classList.remove('active');
              const dropToggle = dropdown.querySelector('.ov-dropdown-toggle');
              if (dropToggle) dropToggle.setAttribute('aria-expanded', 'false');
            }
          });
          
          // Toggle del dropdown actual
          parent.classList.toggle('active');
          const isExpanded = parent.classList.contains('active');
          this.setAttribute('aria-expanded', isExpanded);
        }
      });
    });
    
    // En desktop, comportamiento de hover
    function setupHoverBehavior() {
      if (window.innerWidth > 1024) {
        dropdowns.forEach(dropdown => {
          // Mouseenter
          dropdown.addEventListener('mouseenter', function() {
            this.classList.add('active');
            const toggle = this.querySelector('.ov-dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'true');
          });
          
          // Mouseleave
          dropdown.addEventListener('mouseleave', function() {
            this.classList.remove('active');
            const toggle = this.querySelector('.ov-dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          });
        });
      }
    }
    
    // Iniciar comportamiento hover
    setupHoverBehavior();
    
    // Eventos para clicks fuera
    document.addEventListener('click', function(e) {
      // Cerrar dropdowns si click fuera
      if (!e.target.closest('.ov-dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const toggle = dropdown.querySelector('.ov-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
      
      // Cerrar menu movil si click fuera
      if (window.innerWidth <= 1024) {
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
          closeMobileMenu();
        }
      }
    });
    
    // Evento resize
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 1024) {
          // Reset cuando pasa a desktop
          document.body.style.overflow = '';
          setupHoverBehavior();
          
          // Resetear estados
          if (mobileToggle) {
            mobileToggle.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
          }
          
          if (navWrapper) {
            navWrapper.classList.remove('active');
          }
          
          if (navMenu) {
            navMenu.classList.remove('active');
          }
        }
      }, 150);
    }, { passive: true });
  }
  
  /**
   * Configura el cierre del menú al hacer clic en enlaces
   */
  function setupCloseOnClick() {
    const navLinks = document.querySelectorAll('.ov-nav-link:not(.ov-dropdown-toggle), .ov-service-card, .ov-mini-cta, .ov-cta-button');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          // Tiempo para que se complete la animación de click
          setTimeout(closeMobileMenu, 100);
        }
      });
    });
  }
  
  /**
   * Configura el scroll suave para enlaces internos
   */
  function setupSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not(.ov-dropdown-toggle)');
    
    anchorLinks.forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId === '#') return;
        
        e.preventDefault();
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Cerrar menú móvil primero
          closeMobileMenu();
          
          // Calcular offset para header
          const headerHeight = header?.offsetHeight || 0;
          const offset = headerHeight + 16;
          
          // Scroll suave
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
          
          // Actualizar URL
          if (history.pushState) {
            history.pushState(null, null, targetId);
          } else {
            location.hash = targetId;
          }
          
          // Actualizar enlaces activos
          document.querySelectorAll('.ov-nav-link').forEach(link => {
            link.classList.remove('active');
          });
          
          // Si es un link normal (no un dropdown item)
          if (this.classList.contains('ov-nav-link')) {
            this.classList.add('active');
          }
        }
      });
    });
  }
  
  /**
   * Resalta los enlaces activos según la URL actual
   */
  function highlightActiveLinks() {
    const currentUrl = window.location.pathname;
    const filename = currentUrl.split('/').pop();
    
    // Resetear todos los enlaces
    document.querySelectorAll('.ov-nav-link, .ov-service-card').forEach(link => {
      link.classList.remove('active');
    });
    
    // Activar según página
    if (filename === '' || filename === 'index.html') {
      // En home, activar según hash o primera sección
      if (window.location.hash) {
        const targetSelector = `a[href="${window.location.hash}"]`;
        const targetLink = document.querySelector(targetSelector);
        if (targetLink) {
          targetLink.classList.add('active');
        }
      }
      
      // También llamar a highlightActiveSection para validar la sección visible
      highlightActiveSection();
      
    } else {
      // En otras páginas
      activateMatchingLinks(filename);
    }
  }
  
  /**
   * Activa los enlaces que coincidan con la página actual
   */
  function activateMatchingLinks(filename) {
    let activated = false;
    
    // Buscar enlaces que coincidan con el filename
    document.querySelectorAll('a[href*="' + filename + '"]').forEach(link => {
      link.classList.add('active');
      activated = true;
      
      // Si es un dropdown-item, activar también el toggle
      const dropdown = link.closest('.ov-dropdown');
      if (dropdown) {
        const toggle = dropdown.querySelector('.ov-dropdown-toggle');
        if (toggle) {
          toggle.classList.add('active');
        }
      }
    });
    
    // Fallback para secciones específicas
    if (!activated) {
      if (filename.includes('ads') || filename.includes('google')) {
        const serviciosToggle = document.querySelector('button[aria-controls="servicios-dropdown"]');
        if (serviciosToggle) serviciosToggle.classList.add('active');
      } else if (filename.includes('optimizacion-express')) {
        document.querySelectorAll('a[href*="express"]').forEach(link => {
          link.classList.add('active');
        });
      } else if (filename.includes('contacto')) {
        document.querySelectorAll('a[href*="contacto"]').forEach(link => {
          link.classList.add('active');
        });
      }
    }
  }
  
  /**
   * Resalta la sección actualmente visible en la página
   */
  function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.ov-nav-link[href^="#"]');
    
    if (!sections.length || !navLinks.length) return;
    
    let currentSection = '';
    const scrollPosition = window.scrollY + header.offsetHeight + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    if (currentSection) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
        }
      });
    }
  }
  
  /**
   * Inicializa la animación del botón CTA
   */
  function initCtaAnimation() {
    const ctaButton = document.querySelector('.ov-cta-button');
    
    if (ctaButton && !sessionStorage.getItem('visited')) {
      setTimeout(function() {
        ctaButton.classList.add('pulse-animation');
        
        setTimeout(function() {
          ctaButton.classList.remove('pulse-animation');
        }, 5000);
      }, 2000);
      
      sessionStorage.setItem('visited', 'true');
    }
  }
  
  // =========================================================================
  // INICIALIZACIÓN
  // =========================================================================
  
  // Iniciar navbar
  initNavbar();
  
  // Exponer funciones públicas para acceso desde otros scripts
  window.OrangeVapor = {
    closeMobileMenu,
    highlightActiveLinks,
    initNavbar
  };
});
