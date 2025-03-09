/**
 * Orange Vapor - Navbar Module
 * Script profesional optimizado para UX/UI
 */

(function() {
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
    
    // Optimización mejorada de scroll con requestAnimationFrame
    function handleScroll() {
        // Usar requestAnimationFrame para optimizar rendimiento
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                // Llamar a updateHeaderState directamente sin condiciones adicionales
                updateHeaderState();
                
                // Otras funciones relacionadas con scroll
                updateNavActiveState();
                
                // Resetear flag de scroll
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    }
    
    // Función corregida para la animación del logo
    function updateHeaderState() {
        const scrollPosition = window.scrollY;
        
        // Simplificación extrema para asegurar consistencia
        if (scrollPosition > 50) {
            // Si hacemos scroll down más de 50px, activar sticky
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
            }
        } else {
            // Si estamos arriba (menos de 50px), desactivar sticky
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
    
    // Inicializar posible animación del CTA
    function initCTAAnimation() {
        // Solo si es primera visita (podría usarse localStorage)
        if (ctaButton && !sessionStorage.getItem('visited')) {
            setTimeout(() => {
                ctaButton.classList.add('pulse-animation');
                
                // Quitar después de unos segundos
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
    
    /**
     * Comprueba si el ratón está actualmente sobre un elemento
     */
    function isMouseOverElement(element) {
        if (!event) return false;
        
        const rect = element.getBoundingClientRect();
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        
        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    }
    
    /**
     * Configuración mejorada para los dropdowns
     */
    function setupDropdowns() {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Variables para controlar el estado
            let isOpen = false;
            let timeoutId = null;
            
            // Para desktop, usar mouse events
            if (window.innerWidth > 768) {
                // Al entrar al dropdown
                dropdown.addEventListener('mouseenter', function(e) {
                    clearTimeout(timeoutId);
                    dropdown.classList.add('active');
                    isOpen = true;
                });
                
                // Al salir del dropdown
                dropdown.addEventListener('mouseleave', function(e) {
                    timeoutId = setTimeout(() => {
                        if (!isOpen || (e.relatedTarget && !menu.contains(e.relatedTarget) && !dropdown.contains(e.relatedTarget))) {
                            dropdown.classList.remove('active');
                            isOpen = false;
                        }
                    }, 150);
                });
                
                // Al entrar al menú directamente
                menu.addEventListener('mouseenter', () => {
                    clearTimeout(timeoutId);
                    dropdown.classList.add('active');
                    isOpen = true;
                });
                
                // Al salir del menú
                menu.addEventListener('mouseleave', (e) => {
                    if (!dropdown.contains(e.relatedTarget)) {
                        dropdown.classList.remove('active');
                        isOpen = false;
                    }
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
            
            if (currentSection) {
                // Actualizar enlaces de navegación
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
                
                // Actualizar URL sin provocar scroll
                const newUrl = `${window.location.pathname}#${currentSection}`;
                history.replaceState(null, '', newUrl);
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
    
    // =========================================================================
    // INICIALIZACIÓN AL CARGAR LA PÁGINA
    // =========================================================================
    document.addEventListener('DOMContentLoaded', function() {
        init();
        initSmoothScroll();
        setupDropdowns(); // Configuración mejorada de dropdowns
    });
    
    // Exponer funciones que puedan ser útiles para otros scripts
    window.NavbarModule = {
        updateHeaderState,
        closeMobileMenu
    };
})();
