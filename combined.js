/*
 * This script appears to be an alternative or older version of the navbar logic.
 * The primary navbar functionality for index.html is currently handled by
 * the inline script in index.html (for loading navbar.html) and
 * script-rediseno.js (for interactivity).
 * This file (combined.js) is likely not actively used for index.html's navbar.
 * Please verify its purpose before making modifications or integrating it.
 */
/**
 * Orange Vapor - JavaScript para Navbar
 * Version optimizada: navbar simplificada con servicios individuales
 * Version: 4.0 - 2025
 */

document.addEventListener('DOMContentLoaded', function() {
  'use strict';
  
  // CARGA DINÁMICA DE NAVBAR
  // Verifica si existe un placeholder para cargar la navbar dinámicamente
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  
  if (navbarPlaceholder) {
    // Si existe el placeholder, cargar navbar.html usando fetch
    fetch('navbar.html')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error al cargar navbar: ${response.status}`);
        }
        return response.text();
      })
      .then(html => {
        // Insertar el contenido HTML de la navbar
        navbarPlaceholder.outerHTML = html;
        
        // Una vez insertada la navbar, inicializarla
        setupNavbar();
      })
      .catch(error => {
        console.error('Error al cargar la navbar:', error);
        // Mostrar una navbar mínima de respaldo en caso de error
        navbarPlaceholder.innerHTML = `
          <header id="header" class="ov-header">
            <div class="container">
              <nav class="ov-navbar">
                <a href="index.html" class="ov-logo" aria-label="Orange Vapor - Inicio">
                  <div class="ov-logo-container">
                    <div class="ov-logo-full">
                      <span class="orange-text">Orange</span><span class="vapor-text">Vapor</span>
                    </div>
                  </div>
                </a>
              </nav>
            </div>
          </header>
        `;
      });
  } else {
    // Si no hay placeholder, asumir que la navbar ya está en el HTML
    setupNavbar();
  }
  
  // CONFIGURACIÓN PRINCIPAL DE LA NAVBAR
  function setupNavbar() {
    // Elementos principales de la navbar
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.ov-mobile-toggle');
    const navMenu = document.querySelector('.ov-nav-menu');
    const navWrapper = document.querySelector('.ov-nav-wrapper');
    const navLinks = document.querySelectorAll('.ov-nav-link, .ov-service-card, .ov-cta-button');
    
    // Variables de control
    let lastScrollTop = 0;
    let isScrolling = false;
    
    // FUNCIÓN PRINCIPAL: Inicializa la navbar
    function initNavbar() {
      if (!header) return;
      
      // Configuraciones iniciales
      setupScrollEvents();
      setupMobileMenu();
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
        mobileToggle.addEventListener('click', function(e) {
          e.preventDefault();
          this.classList.toggle('active');
          navWrapper.classList.toggle('active');
          navMenu.classList.toggle('active');
          
          // Actualizar aria-expanded para accesibilidad
          const isExpanded = this.classList.contains('active');
          this.setAttribute('aria-expanded', isExpanded);
          
          // Bloquear scroll del body cuando el menú está abierto
          document.body.style.overflow = isExpanded ? 'hidden' : '';
          
          // Quitar focus para evitar recuadro
          this.blur();
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
    
    // Cerrar menú al hacer clic en enlaces
    function setupCloseOnClick() {
      navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          // Quitar focus para evitar recuadro
          this.blur();
          
          if (window.innerWidth <= 1024) {
            // En móvil, cerrar el menú al hacer clic en un enlace
            setTimeout(closeMobileMenu, 100);
          }
        });
      });
    }
    
    // Determina qué enlaces deben estar activos según la URL
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
        document.querySelectorAll('a[href*="' + filename + '"]').forEach(link => {
          link.classList.add('active');
        });
        
        // Activación por tipo de página para enlaces de servicio
        if (filename.includes('ads') && filename.includes('facebook') || filename === 'ads.html') {
          document.querySelector('.meta-ads-link')?.classList.add('active');
        } else if (filename.includes('google') || filename.includes('google-ads')) {
          document.querySelector('.google-ads-link')?.classList.add('active');
        } else if (filename.includes('email') || filename.includes('email-marketing')) {
          document.querySelector('.email-marketing-link')?.classList.add('active');
        } else if (filename.includes('chatbot') || filename.includes('bot')) {
          document.querySelector('.chatbot-link')?.classList.add('active');
        }
      }
    }
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
      // Restablecer estados si cambiamos de móvil a desktop
      if (window.innerWidth > 1024) {
        // Restablecer estados del menú móvil
        document.body.style.overflow = '';
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
        if (navWrapper) navWrapper.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
      }
    }, { passive: true });
    
    // Exponer funciones públicas para uso externo
    window.OrangeVapor = {
      closeMobileMenu,
      highlightActiveLinks
    };
    
    // Iniciar navbar
    initNavbar();
  }
});
