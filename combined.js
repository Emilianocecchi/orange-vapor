/**
 * Orange Vapor - JavaScript para Navbar
 * Version optimizada: funcionalidades estrictamente de navbar
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // Elementos principales de la navbar
  const header = document.getElementById('header');
  const mobileToggle = document.querySelector('.ov-mobile-toggle');
  const navMenu = document.querySelector('.ov-nav-menu');
  const navWrapper = document.querySelector('.ov-nav-wrapper');
  const dropdowns = document.querySelectorAll('.ov-dropdown');
  const dropdownToggles = document.querySelectorAll('.ov-dropdown-toggle');
  
  // Variables de control
  let lastScrollTop = 0;
  let isScrolling = false;
  
  // FUNCIÓN PRINCIPAL: Inicializa la navbar
  function initNavbar() {
    if (!header) return;
    
    // Configuraciones iniciales
    setupScrollEvents();
    setupMobileMenu();
    setupDropdowns();
    setupCloseOnClick();
    
    // Estado inicial de scroll
    if (window.scrollY > 50) header.classList.add('scrolled');
    
    // Detectar enlace activo según URL
    highlightActiveLinks();
  }
  
  // Maneja eventos de scroll
  function setupScrollEvents() {
    window.addEventListener('scroll', function() {
      if (!isScrolling) {
        window.requestAnimationFrame(function() {
          // Gestionar efecto de scroll
          const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
          
          // Toggle clase scrolled para cambiar logo a OV
          if (scrollTop > 50) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          
          // Ocultar navbar al scrollear hacia abajo (solo desktop)
          if (window.innerWidth > 1024) {
            if (scrollTop > lastScrollTop && scrollTop > 300) {
              header.classList.add('scrolled-down');
            } else {
              header.classList.remove('scrolled-down');
            }
          }
          
          lastScrollTop = scrollTop;
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }
  
  // Configura el menú móvil
  function setupMobileMenu() {
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navWrapper.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Actualizar aria-expanded para accesibilidad
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
        
        // Bloquear scroll del body cuando el menú está abierto
        document.body.style.overflow = isExpanded ? 'hidden' : '';
      });
    }
  }
  
  // Cierra el menú móvil
  function closeMobileMenu() {
    if (window.innerWidth <= 1024) {
      if (mobileToggle) {
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
      }
      
      if (navWrapper) navWrapper.classList.remove('active');
      if (navMenu) navMenu.classList.remove('active');
      
      document.body.style.overflow = '';
    }
  }
  
  // Configura comportamiento de dropdowns
  function setupDropdowns() {
    // Click en toggles móvil
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
          this.setAttribute('aria-expanded', parent.classList.contains('active'));
        }
      });
    });
    
    // En desktop, comportamiento hover
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
    
    // Cerrar dropdowns al hacer clic fuera
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.ov-dropdown')) {
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active');
          const toggle = dropdown.querySelector('.ov-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
      }
      
      // Cerrar menú móvil si click fuera
      if (window.innerWidth <= 1024 && navMenu && navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
        closeMobileMenu();
      }
    });
    
    // Ajustes al cambiar tamaño de ventana
    window.addEventListener('resize', function() {
      if (window.innerWidth > 1024) {
        // Reset estados al pasar a desktop
        document.body.style.overflow = '';
        
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
        
        if (navWrapper) navWrapper.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
      }
    }, { passive: true });
  }
  
  // Cerrar menú al hacer clic en enlaces
  function setupCloseOnClick() {
    const navLinks = document.querySelectorAll('.ov-nav-link:not(.ov-dropdown-toggle), .ov-service-card, .ov-mini-cta, .ov-cta-button');
    
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (window.innerWidth <= 1024) {
          setTimeout(closeMobileMenu, 100);
        }
      });
    });
  }
  
  // Determina qué enlaces deben estar activos
  function highlightActiveLinks() {
    const currentUrl = window.location.pathname;
    const filename = currentUrl.split('/').pop();
    
    // Resetear todos los enlaces
    document.querySelectorAll('.ov-nav-link, .ov-service-card').forEach(link => {
      link.classList.remove('active');
    });
    
    // Activar enlaces según la página actual
    if (filename === '' || filename === 'index.html') {
      // En home, activar según hash si existe
      if (window.location.hash) {
        const targetLink = document.querySelector(`a[href="${window.location.hash}"]`);
        if (targetLink) targetLink.classList.add('active');
      }
    } else {
      // En otras páginas, buscar coincidencias
      let activated = false;
      
      document.querySelectorAll('a[href*="' + filename + '"]').forEach(link => {
        link.classList.add('active');
        activated = true;
        
        // Si es dropdown, activar también el toggle
        const dropdown = link.closest('.ov-dropdown');
        if (dropdown) {
          const toggle = dropdown.querySelector('.ov-dropdown-toggle');
          if (toggle) toggle.classList.add('active');
        }
      });
      
      // Activación por tipo de página 
      if (!activated) {
        if (filename.includes('ads') || filename.includes('google')) {
          // Activar dropdown de servicios
          const serviciosToggle = document.querySelector('.ov-dropdown-toggle');
          if (serviciosToggle) serviciosToggle.classList.add('active');
        } else if (filename.includes('optimizacion-express')) {
          document.querySelectorAll('a[href*="express"]').forEach(link => {
            link.classList.add('active');
          });
        }
      }
    }
  }
  
  // Iniciar navbar
  initNavbar();
  
  // Exponer funciones públicas 
  window.OrangeVapor = {
    closeMobileMenu,
    highlightActiveLinks
  };
});
