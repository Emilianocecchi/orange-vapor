/**
 * Orange Vapor - Navbar Module
 * Script optimizado para rendimiento y UX
 */

// Función global para inicializar la navegación
function initNavbar() {
    'use strict';
    
    // =========================================================================
    // VARIABLES Y SELECTORES DOM
    // =========================================================================
    let header,
        mobileToggle,
        navMenu,
        dropdownToggles,
        navLinks,
        dropdowns,
        logoFull,
        logoShort,
        ctaButton,
        lastScrollTop = 0,
        isScrolling = false,
        resizeTimer;
    
    // Variables para controlar replaceState
    let lastReplaceStateTime = 0;
    let lastSection = '';
    let replaceStateCount = 0;
    
    // =========================================================================
    // INICIALIZACIÓN Y CAPTURA DE ELEMENTOS
    // =========================================================================
    function init() {
        // Capturar elementos del DOM
        header = document.getElementById('header');
        mobileToggle = document.querySelector('.mobile-toggle');
        navMenu = document.getElementById('nav-menu');
        dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        navLinks = document.querySelectorAll('.nav-link');
        dropdowns = document.querySelectorAll('.dropdown');
        logoFull = document.querySelector('.logo-full');
        logoShort = document.querySelector('.logo-short');
        ctaButton = document.querySelector('.cta-button');
        
        // Inicializar estado de la navbar
        updateHeaderState();
        
        // Agregar los event listeners
        attachEventListeners();
        
        // Establecer enlaces activos según URL
        setActiveNavLinks();
        
        // Iniciar posible animación del CTA
        initCTAAnimation();
    }
    
    // =========================================================================
    // EVENT LISTENERS
    // =========================================================================
    function attachEventListeners() {
        // Scroll events - usando throttle para mejor rendimiento
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Mobile toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Dropdown toggles para móvil
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    toggleDropdown(parent);
                }
            });
        });
        
        // Click en enlaces para cerrar el menú móvil
        navLinks.forEach(link => {
            // Excluimos los dropdown toggles
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMobileMenu);
            }
        });
        
        // Click fuera para cerrar menús
        document.addEventListener('click', handleOutsideClick);
        
        // Resize events
        window.addEventListener('resize', handleResize, { passive: true });
    }
    
    // =========================================================================
    // HANDLERS Y FUNCIONES PRINCIPALES
    // =========================================================================
    
    // Optimización de scroll con requestAnimationFrame
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateHeaderState();
                updateNavActiveState();
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    }
    
    // Función para la animación del logo
    function updateHeaderState() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
            }
        } else {
            if (header.classList.contains('sticky')) {
                header.classList.remove('sticky');
            }
        }
    }
    
    // Toggle menú móvil
    function toggleMobileMenu() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        // Toggle clases
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Actualizar atributos ARIA
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Controlar scroll del body
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Resetear dropdowns si cerramos menú
        if (isExpanded) {
            resetDropdowns();
        }
    }
    
    // Toggle dropdown específico
    function toggleDropdown(dropdown) {
        // Toggle directo en móvil
        dropdown.classList.toggle('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            const isExpanded = dropdown.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
            
            // Rotar ícono
            const icon = toggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
            }
        }
    }
    
    // Cerrar todos los dropdowns
    function resetDropdowns() {
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Cerrar menú móvil
    function closeMobileMenu() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Restaurar scroll
            document.body.style.overflow = '';
        }
    }
    
    // Click fuera de elementos interactivos
    function handleOutsideClick(e) {
        // Click fuera del menú móvil
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                closeMobileMenu();
            }
        }
    }
    
    // Manejar cambios de tamaño de ventana
    function handleResize() {
        // Debounce para evitar demasiadas llamadas
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Si pasamos de móvil a desktop
            if (window.innerWidth > 768) {
                // Restaurar scroll
                document.body.style.overflow = '';
                
                // Resetear botón móvil
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Resetear menú
                if (navMenu) {
                    navMenu.classList.remove('active');
                }
            }
        }, 150);
    }
    
    // Inicializar animación del CTA para primera visita
    function initCTAAnimation() {
        if (ctaButton && !sessionStorage.getItem('visited')) {
            setTimeout(() => {
                ctaButton.classList.add('pulse-animation');
                
                setTimeout(() => {
                    ctaButton.classList.remove('pulse-animation');
                }, 5000);
            }, 2000);
            
            // Marcar como visitado
            sessionStorage.setItem('visited', 'true');
        }
    }
    
    // =========================================================================
    // MEJORA DE DROPDOWNS
    // =========================================================================
    
    function setupDropdowns() {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Para desktop, usar mouse events
            if (window.innerWidth > 768) {
                // Al entrar al dropdown
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });
                
                // Al salir del dropdown
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
                
                // Evitar que el clic en toggle cierre el menú en desktop
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth > 768) {
                        e.preventDefault();
                        dropdown.classList.add('active');
                    }
                });
            }
        });
    }
    
    // =========================================================================
    // FUNCIONES PARA ENLACES ACTIVOS
    // =========================================================================
    
    // Establecer enlaces activos según URL
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar enlace según la página actual
        if (filename === '' || filename === 'index.html') {
            // En la home page, activamos enlaces según sección visible
            if (window.location.hash) {
                const hash = window.location.hash.substring(1);
                activateLinkByHash(hash);
            }
        } else if (filename.includes('ads.html')) {
            activateDropdownItem('ads.html');
        } else if (filename.includes('google-ads.html')) {
            activateDropdownItem('google-ads.html');
        } else if (filename.includes('email-marketing.html')) {
            activateDropdownItem('email-marketing.html');
        } else if (filename.includes('chatbot.html')) {
            activateDropdownItem('chatbot.html');
        } else if (filename.includes('optimizacion-express.html')) {
            document.querySelector('a[href="optimizacion-express.html"]')?.classList.add('active');
        } else if (filename.includes('contacto.html')) {
            document.querySelector('a[href="contacto.html"]')?.classList.add('active');
        }
    }
    
    // Activar un item de dropdown y su toggle
    function activateDropdownItem(href) {
        const item = document.querySelector(`a[href="${href}"]`);
        const dropdown = item?.closest('.dropdown');
        
        if (item) item.classList.add('active');
        if (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.classList.add('active');
        }
    }
    
    // Activar enlace según hash
    function activateLinkByHash(hash) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkHash = href.startsWith('#') ? href.substring(1) : '';
                if (linkHash === hash) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Actualizar enlaces activos según sección visible
    // FUNCIÓN OPTIMIZADA PARA EVITAR ERRORES DE REPLACESTATE
    function updateNavActiveState() {
        // Solo para página principal
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const sections = document.querySelectorAll('section[id]');
            let currentSection = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    currentSection = section.getAttribute('id');
                }
            });
            
            // Solo actualizar si hay una sección identificada y es diferente a la última
            if (currentSection && currentSection !== lastSection) {
                // Actualizar navegación visual
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                    
                    const href = link.getAttribute('href');
                    if (href) {
                        const sectionId = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
                        if (sectionId === currentSection) {
                            link.classList.add('active');
                        }
                    }
                });
                
                // Control de límite de replaceState
                const now = Date.now();
                
                // Reiniciar contador si han pasado 10 segundos
                if (now - lastReplaceStateTime > 10000) {
                    replaceStateCount = 0;
                    lastReplaceStateTime = now;
                }
                
                // Solo actualizar URL si no excedemos el límite
                if (replaceStateCount < 90) { // Margen de seguridad
                    const newUrl = `${window.location.pathname}#${currentSection}`;
                    history.replaceState(null, '', newUrl);
                    replaceStateCount++;
                    
                    // Actualizar sección actual
                    lastSection = currentSection;
                }
            }
        }
    }
    
    // =========================================================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    // =========================================================================
    
    // Inicializar scroll suave para enlaces internos
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil primero si está abierto
                    closeMobileMenu();
                    
                    // Calcular offset según altura del header
                    const headerHeight = header.offsetHeight;
                    const offset = headerHeight + 16;
                    
                    // Scroll suave con animación
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
                    
                    // Activar el enlace
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Ejecutar inicialización
    init();
    initSmoothScroll();
    setupDropdowns();
    
    // Exponer funciones útiles para otros scripts
    window.NavbarModule = {
        updateHeaderState,
        closeMobileMenu
    };
}

// Inicializar automáticamente si el DOM ya está cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavbar);
} else {
    initNavbar();
}
