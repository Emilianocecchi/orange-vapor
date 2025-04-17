/**
 * Orange Vapor - JavaScript para Navbar
 * Version optimizada: funcionalidades estrictamente de navbar
 * Con soporte de hoverIntent y toggle por clic
 * Version: 3.4 - 2025
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
    const dropdowns = document.querySelectorAll('.ov-dropdown');
    const dropdownToggles = document.querySelectorAll('.ov-dropdown-toggle');
    const navLinks = document.querySelectorAll('.ov-nav-link:not(.ov-dropdown-toggle), .ov-service-card, .ov-cta-button');
    
    // Variables de control
    let lastScrollTop = 0;
    let isScrolling = false;
    let hoverIntentTimers = new Map(); // Mapa para los timers de hoverIntent
    
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
    
    // Implementación de hoverIntent para mejorar la interacción con el dropdown
    function hoverIntent(element, enterCallback, leaveCallback, sensitivity = 100) {
      const timerId = Symbol();
      
      // Al entrar con el mouse
      element.addEventListener('mouseenter', function() {
        // Si hay un timer de salida, cancelarlo
        if (hoverIntentTimers.get(element)?.leave) {
          clearTimeout(hoverIntentTimers.get(element).leave);
          hoverIntentTimers.set(element, { enter: null, leave: null });
        }
        
        // Crear timer de entrada
        const enterTimer = setTimeout(() => {
          enterCallback.call(element);
          hoverIntentTimers.set(element, { enter: null, leave: null });
        }, sensitivity);
        
        hoverIntentTimers.set(element, { enter: enterTimer, leave: null });
      });
      
      // Al salir con el mouse
      element.addEventListener('mouseleave', function() {
        // Si hay un timer de entrada, cancelarlo
        if (hoverIntentTimers.get(element)?.enter) {
          clearTimeout(hoverIntentTimers.get(element).enter);
          hoverIntentTimers.set(element, { enter: null, leave: null });
        }
        
        // Crear timer de salida
        const leaveTimer = setTimeout(() => {
          leaveCallback.call(element);
          hoverIntentTimers.set(element, { enter: null, leave: null });
        }, sensitivity);
        
        hoverIntentTimers.set(element, { enter: null, leave: leaveTimer });
      });
    }
    
    // Configura el comportamiento avanzado de los dropdowns
    function setupDropdowns() {
      // Inicializar timers
      dropdowns.forEach(dropdown => {
        hoverIntentTimers.set(dropdown, { enter: null, leave: null });
      });
      
      // COMPORTAMIENTO EN DESKTOP
      if (window.innerWidth > 1024) {
        dropdowns.forEach(dropdown => {
          // Aplicar hoverIntent para interacción suave
          hoverIntent(
            dropdown,
            // Callback para mouseenter
            function() {
              if (!this.classList.contains('clicked')) {
                this.classList.add('active');
                const toggle = this.querySelector('.ov-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'true');
              }
            },
            // Callback para mouseleave
            function() {
              if (!this.classList.contains('clicked')) {
                this.classList.remove('active');
                const toggle = this.querySelector('.ov-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
              }
            },
            50 // Sensibilidad más baja para respuesta más rápida
          );
          
          // Click en el toggle de dropdown
          const toggle = dropdown.querySelector('.ov-dropdown-toggle');
          if (toggle) {
            toggle.addEventListener('click', function(e) {
              e.preventDefault();
              e.stopPropagation();
              
              // Si está activo por click, desactivar
              if (dropdown.classList.contains('clicked')) {
                dropdown.classList.remove('active', 'clicked');
                this.setAttribute('aria-expanded', 'false');
              } else {
                // Cerrar otros dropdowns que estén abiertos por click
                dropdowns.forEach(item => {
                  if (item !== dropdown && item.classList.contains('clicked')) {
                    item.classList.remove('active', 'clicked');
                    const itemToggle = item.querySelector('.ov-dropdown-toggle');
                    if (itemToggle) itemToggle.setAttribute('aria-expanded', 'false');
                  }
                });
                
                // Activar este dropdown y marcarlo como clickeado
                dropdown.classList.add('active', 'clicked');
                this.setAttribute('aria-expanded', 'true');
              }
              
              // Quitar el focus para evitar recuadro
              this.blur();
            });
          }
        });
        
        // Cerrar dropdowns con clicked al hacer clic fuera
        document.addEventListener('click', function(e) {
          if (!e.target.closest('.ov-dropdown')) {
            dropdowns.forEach(dropdown => {
              if (dropdown.classList.contains('clicked')) {
                dropdown.classList.remove('active', 'clicked');
                const toggle = dropdown.querySelector('.ov-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
              }
            });
          }
        });
        
      } else {
        // COMPORTAMIENTO EN MÓVIL
        dropdownToggles.forEach(toggle => {
          toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const dropdown = this.closest('.ov-dropdown');
            const isActive = dropdown.classList.contains('active');
            
            // Cerrar otros dropdowns
            dropdowns.forEach(item => {
              if (item !== dropdown && item.classList.contains('active')) {
                item.classList.remove('active');
                const itemToggle = item.querySelector('.ov-dropdown-toggle');
                if (itemToggle) itemToggle.setAttribute('aria-expanded', 'false');
              }
            });
            
            // Toggle de este dropdown
            dropdown.classList.toggle('active');
            this.setAttribute('aria-expanded', !isActive);
            
            // Quitar el focus para evitar recuadro
            this.blur();
          });
        });
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
          } else {
            // En desktop, cerrar dropdowns si están abiertos
            dropdowns.forEach(dropdown => {
              if (dropdown.classList.contains('clicked')) {
                dropdown.classList.remove('active', 'clicked');
                const toggle = dropdown.querySelector('.ov-dropdown-toggle');
                if (toggle) toggle.setAttribute('aria-expanded', 'false');
              }
            });
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
          }
        }
      }
    }
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
      const isDesktop = window.innerWidth > 1024;
      
      // Si pasamos de móvil a desktop
      if (isDesktop) {
        // Restablecer estados del menú móvil
        document.body.style.overflow = '';
        if (mobileToggle) {
          mobileToggle.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
        if (navWrapper) navWrapper.classList.remove('active');
        if (navMenu) navMenu.classList.remove('active');
        
        // Restablecer dropdowns
        dropdowns.forEach(dropdown => {
          dropdown.classList.remove('active', 'clicked');
          const toggle = dropdown.querySelector('.ov-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
        
        // Reinstalar comportamiento de desktop
        setupDropdowns();
      } else {
        // Si pasamos de desktop a móvil, reinstalar comportamiento móvil
        setupDropdowns();
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

// Manejo de tabs de servicios
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de tabs de servicios
    const servicioTabs = document.querySelectorAll('.servicio-tab');
    const servicioPaneles = document.querySelectorAll('.servicio-panel');
    
    // Agregar evento de clic a cada tab
    servicioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Obtener el atributo data-servicio del tab clickeado
            const servicio = this.getAttribute('data-servicio');
            
            // Desactivar todos los tabs activos
            servicioTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Activar el tab clickeado
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Desactivar todos los paneles
            servicioPaneles.forEach(panel => {
                panel.classList.remove('active');
            });
            
            // Activar el panel correspondiente al tab clickeado
            const panelActivo = document.querySelector(`.servicio-panel[data-servicio="${servicio}"]`);
            if (panelActivo) {
                panelActivo.classList.add('active');
            }
        });
    });
    
    // Manejo de tabs de plan (Starter, Pro, Elite)
    const tierTabs = document.querySelectorAll('.tier-tab');
    
    tierTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tier = this.getAttribute('data-tier');
            
            // Desactivar todos los tabs
            tierTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            
            // Activar este tab
            this.classList.add('active');
            this.setAttribute('aria-selected', 'true');
            
            // Actualizar la información visible del tier
            document.querySelectorAll('.tier-info').forEach(info => {
                info.classList.remove('active');
            });
            const tierInfo = document.querySelector(`.tier-info.${tier}`);
            if (tierInfo) tierInfo.classList.add('active');
            
            // Actualizar los detalles del tier para todos los servicios
            document.querySelectorAll('.tier-detalle').forEach(detalle => {
                detalle.classList.remove('active');
            });
            document.querySelectorAll(`.tier-detalle.${tier}`).forEach(detalle => {
                detalle.classList.add('active');
            });
            
            // Actualizar los precios
            document.querySelectorAll('.tier-price').forEach(precio => {
                precio.classList.remove('active');
            });
            document.querySelectorAll(`.tier-price.${tier}`).forEach(precio => {
                precio.classList.add('active');
            });
        });
    });

    // Mini selector de tiers en sección "Elegí tu Solución"
    const tierOptionsMini = document.querySelectorAll('.tier-option');
    
    if (tierOptionsMini.length > 0) {
        tierOptionsMini.forEach(option => {
            option.addEventListener('click', function() {
                const tier = this.getAttribute('data-tier');
                
                // Actualizar opciones activas
                tierOptionsMini.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Actualizar precios mini activos
                document.querySelectorAll('.tier-mini').forEach(mini => {
                    mini.classList.remove('active');
                });
                const tierMini = document.querySelector(`.tier-mini.${tier}`);
                if (tierMini) tierMini.classList.add('active');
            });
        });
    }
});

// Manejo de tabs de servicios en la sección de planes
document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones de tab
    const tabButtons = document.querySelectorAll('.tab-button');
    
    // Verificar si hay tabs en la página
    if (tabButtons.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Obtener el ID del tab a mostrar
                const tabId = this.getAttribute('data-tab');
                
                // Desactivar todos los botones de tab
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Activar este botón
                this.classList.add('active');
                
                // Ocultar todos los contenidos de tab
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Mostrar el contenido correspondiente
                const tabContent = document.getElementById(tabId);
                if (tabContent) {
                    tabContent.classList.add('active');
                }
            });
        });
    }
    
    // Añadir atributos data-tier a las columnas para versión responsiva
    document.querySelectorAll('.col-starter').forEach(col => {
        col.setAttribute('data-tier', 'Starter');
    });
    
    document.querySelectorAll('.col-pro').forEach(col => {
        col.setAttribute('data-tier', 'Pro');
    });
    
    document.querySelectorAll('.col-elite').forEach(col => {
        col.setAttribute('data-tier', 'Elite');
    });
    
    // Hover mejorado para las características
    document.querySelectorAll('.comparativa-row').forEach(row => {
        const cols = row.querySelectorAll('.comparativa-col');
        
        cols.forEach(col => {
            col.addEventListener('mouseenter', function() {
                cols.forEach(c => c.classList.add('hover-effect'));
            });
            
            col.addEventListener('mouseleave', function() {
                cols.forEach(c => c.classList.remove('hover-effect'));
            });
        });
    });
});
