/**
 * Orange Vapor - Navbar Mejorado
 * Funcionalidades optimizadas para la navegación
 */

(function() {
    'use strict';
    
    // =========================================================================
    // VARIABLES GLOBALES
    // =========================================================================
    
    // Variables DOM compartidas (inicializadas durante load para evitar bloqueo)
    let header, mobileToggle, navMenu, headerHeight;
    
    // Variables para el manejo de estado
    let lastScrollTop = 0;
    let isScrolling = false;
    let scrollTimer;
    let resizeTimer;
    
    // Variables para controlar replaceState
    let lastReplaceStateTime = 0;
    let lastSection = '';
    let replaceStateCount = 0;
    
    // Umbral para throttling de scroll
    const SCROLL_THROTTLE = 100; // ms
    const RESIZE_DEBOUNCE = 150; // ms
    
    // =========================================================================
    // FUNCIONES DE UTILIDAD OPTIMIZADAS
    // =========================================================================
    
    // Función óptima para calcular si un elemento está en el viewport
    function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return rect.top < window.innerHeight && rect.bottom > 0;
    }
    
    // Función optimizada para easing
    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
    
    // =========================================================================
    // NAVEGACIÓN Y NAVBAR - INICIALIZACIÓN
    // =========================================================================
    
    function initNavbar() {
        // Inicializar variables DOM solo cuando se necesitan
        header = document.getElementById('header');
        mobileToggle = document.querySelector('.mobile-toggle');
        navMenu = document.getElementById('nav-menu');
        headerHeight = header ? header.offsetHeight : 70; // Altura por defecto si no existe
        
        if (!header || !navMenu) return; // Salir si los elementos no existen
        
        // Navegación: referencias adicionales
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        const ctaButton = document.querySelector('.cta-button');
        
        // Inicializar estado
        updateHeaderState();
        setActiveNavLinks();
        
        // Agregar event listeners para navegación
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
            // Añadir accesibilidad
            mobileToggle.setAttribute('aria-label', 'Menú principal');
            mobileToggle.setAttribute('aria-controls', 'nav-menu');
            mobileToggle.setAttribute('aria-expanded', 'false');
        }
        
        // Dropdown toggles con mejoras de accesibilidad
        dropdownToggles.forEach(toggle => {
            const parent = toggle.closest('.dropdown');
            const menu = parent ? parent.querySelector('.dropdown-menu') : null;
            const id = menu ? `dropdown-menu-${Math.random().toString(36).substring(2, 9)}` : null;
            
            if (menu && id) {
                menu.id = id;
                toggle.setAttribute('aria-controls', id);
                toggle.setAttribute('aria-expanded', 'false');
                toggle.setAttribute('aria-haspopup', 'true');
            }
            
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = this.closest('.dropdown');
                    toggleDropdown(parent);
                }
            });
            
            // Soporte para navegación por teclado
            toggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    toggleDropdown(parent);
                } else if (e.key === 'Escape') {
                    const parent = this.closest('.dropdown');
                    if (parent && parent.classList.contains('active')) {
                        toggleDropdown(parent);
                        this.focus();
                    }
                }
            });
        });
        
        // Enlaces de navegación
        navLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', function() {
                    // Cerrar menú móvil con animación suave
                    if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                        closeMobileMenu();
                    }
                });
            }
        });
        
        // Cerrar menú al hacer clic fuera - delegación de eventos para mejor rendimiento
        document.addEventListener('click', function(e) {
            // Cerrar menú móvil
            if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
            
            // Cerrar dropdowns en escritorio cuando se hace clic fuera
            if (window.innerWidth > 768) {
                dropdowns.forEach(dropdown => {
                    if (dropdown.classList.contains('active') && !dropdown.contains(e.target)) {
                        dropdown.classList.remove('active');
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    }
                });
            }
        });
        
        // Configurar dropdowns con comportamiento mejorado
        setupDropdowns(dropdowns);
        
        // Inicializar scrolling suave
        initSmoothScroll();
        
        // Inicializar animación del CTA principal
        if (ctaButton) {
            initCTAAnimation(ctaButton);
        }
        
        // Indicar que el navbar está listo después de un pequeño retraso para asegurar el renderizado
        requestAnimationFrame(() => {
            document.body.classList.add('navbar-initialized');
            
            // Agregar clase para transiciones solo después de cargar completamente
            if (header && !header.classList.contains('transitions-enabled')) {
                setTimeout(() => {
                    header.classList.add('transitions-enabled');
                }, 100);
            }
        });
    }
    
    // =========================================================================
    // FUNCIONES DE NAVEGACIÓN
    // =========================================================================
    
    // Actualizar estado del header al hacer scroll con mejor rendimiento
    function updateHeaderState() {
        if (!header) return;
        
        const scrollPosition = window.scrollY;
        
        // Detectar dirección del scroll
        const scrollingDown = scrollPosition > lastScrollTop;
        lastScrollTop = scrollPosition;
        
        // Realizar operaciones de lectura antes de las de escritura
        const shouldBeSticky = scrollPosition > 50;
        const shouldBeHidden = scrollPosition > 200 && scrollingDown;
        
        // Aplicar clases según posición (agrupando las modificaciones del DOM)
        requestAnimationFrame(() => {
            if (shouldBeSticky) {
                if (!header.classList.contains('sticky')) {
                    header.classList.add('sticky');
                }
                
                // Auto-ocultar header en scroll hacia abajo después de 200px
                if (shouldBeHidden) {
                    header.classList.add('header-hidden');
                } else {
                    header.classList.remove('header-hidden');
                }
            } else {
                header.classList.remove('sticky');
                header.classList.remove('header-hidden');
            }
        });
    }
    
    // Toggle del menú móvil con mejor animación
    function toggleMobileMenu() {
        if (!mobileToggle || !navMenu) return;
        
        const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
        
        mobileToggle.classList.toggle('active');
        
        if (isExpanded) {
            // Cerrar el menú con animación
            navMenu.classList.add('closing');
            
            // Esperar a que termine la animación
            setTimeout(() => {
                navMenu.classList.remove('active');
                navMenu.classList.remove('closing');
                document.body.style.overflow = '';
            }, 300);
        } else {
            // Abrir el menú
            navMenu.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        // Actualizar estado de accesibilidad
        mobileToggle.setAttribute('aria-expanded', !isExpanded);
        
        // Resetear dropdowns al cerrar menú
        if (isExpanded) {
            resetDropdowns();
        }
    }
    
    // Toggle dropdown específico con animación mejorada
    function toggleDropdown(dropdown) {
        if (!dropdown) return;
        
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        const isActive = dropdown.classList.contains('active');
        
        // En móvil, cerrar otros dropdowns primero
        if (window.innerWidth <= 768) {
            document.querySelectorAll('.dropdown.active').forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                    const itemToggle = item.querySelector('.dropdown-toggle');
                    if (itemToggle) {
                        itemToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        }
        
        // Toggle estado actual
        dropdown.classList.toggle('active');
        
        if (toggle) {
            const newState = dropdown.classList.contains('active');
            toggle.setAttribute('aria-expanded', newState);
            
            // Rotar ícono con animación suave
            const icon = toggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = newState ? 'rotate(180deg)' : '';
            }
        }
        
        // Animar altura en móvil - usar requestAnimationFrame para mejor rendimiento
        if (window.innerWidth <= 768 && menu) {
            if (!isActive) {
                // Abrir menú
                requestAnimationFrame(() => {
                    menu.style.maxHeight = `${menu.scrollHeight}px`;
                });
            } else {
                // Cerrar menú
                requestAnimationFrame(() => {
                    menu.style.maxHeight = '0px';
                });
            }
        }
    }
    
    // Cerrar todos los dropdowns
    function resetDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
            
            // Resetear altura para menús en móvil
            if (window.innerWidth <= 768) {
                const menu = dropdown.querySelector('.dropdown-menu');
                if (menu) {
                    menu.style.maxHeight = '0px';
                }
            }
        });
    }
    
    // Cerrar menú móvil con transición suave
    function closeMobileMenu() {
        if (!navMenu || !mobileToggle) return;
        
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            // Añadir clase para animar el cierre
            navMenu.classList.add('closing');
            
            // Esperar a que termine la animación
            setTimeout(() => {
                navMenu.classList.remove('active');
                navMenu.classList.remove('closing');
                
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
                
                document.body.style.overflow = '';
            }, 300);
        }
    }
    
    // Configurar dropdowns con hover en desktop y click en móvil
    function setupDropdowns(dropdowns) {
        if (!dropdowns || !dropdowns.length) return;
        
        // Limpiar listeners previos (útil si se reinicializa)
        dropdowns.forEach(dropdown => {
            dropdown.removeAttribute('data-initialized');
        });
        
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Marcar como inicializado
            dropdown.setAttribute('data-initialized', 'true');
            
            let hoverTimeout;
            
            // Para desktop
            if (window.innerWidth > 768) {
                // Hover con delay para evitar activaciones accidentales
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    
                    // Cerrar otros dropdowns primero
                    document.querySelectorAll('.dropdown.active').forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                            const itemToggle = item.querySelector('.dropdown-toggle');
                            if (itemToggle) itemToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Abrir después de un pequeño delay
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.add('active');
                        if (toggle) toggle.setAttribute('aria-expanded', 'true');
                    }, 50);
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    clearTimeout(hoverTimeout);
                    
                    // Cerrar con delay para permitir moverse al menú
                    hoverTimeout = setTimeout(() => {
                        dropdown.classList.remove('active');
                        if (toggle) toggle.setAttribute('aria-expanded', 'false');
                    }, 100);
                });
                
                // Permitir clic para mantener abierto
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth > 768) {
                        e.preventDefault();
                        dropdown.classList.add('active');
                        toggle.setAttribute('aria-expanded', 'true');
                    }
                });
            }
            
            // Manejar contenido del dropdown en hover - delegación de eventos
            menu.addEventListener('mouseenter', function(e) {
                if (e.target.classList.contains('dropdown-item')) {
                    e.target.classList.add('hover');
                }
            }, true);
            
            menu.addEventListener('mouseleave', function(e) {
                if (e.target.classList.contains('dropdown-item')) {
                    e.target.classList.remove('hover');
                }
            }, true);
        });
    }
    
    // =========================================================================
    // ENLACES ACTIVOS Y NAVEGACIÓN POR SCROLL
    // =========================================================================
    
    // Establecer enlaces activos según URL con soporte mejorado para hash
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const hash = window.location.hash;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar enlace según la página actual
        if (filename === '' || filename === 'index.html') {
            // En la home page, activar enlaces según hash
            if (hash) {
                const hashValue = hash.substring(1);
                activateLinkByHash(hashValue);
            } else {
                // Activar el primer enlace si estamos en home sin hash
                const firstNavLink = document.querySelector('.nav-link');
                if (firstNavLink) firstNavLink.classList.add('active');
            }
        } else {
            // Activar enlaces para otras páginas
            document.querySelectorAll('a[href]').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes(filename)) {
                    link.classList.add('active');
                    
                    // Si es un item de dropdown, activar también el toggle
                    const dropdown = link.closest('.dropdown');
                    if (dropdown) {
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.classList.add('active');
                    }
                }
            });
        }
    }
    
    // Activar enlace según hash
    function activateLinkByHash(hash) {
        if (!hash) return;
        
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkHash = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
                if (linkHash === hash) {
                    link.classList.add('active');
                    
                    // Si es parte de un dropdown, activar el dropdown
                    const dropdown = link.closest('.dropdown');
                    if (dropdown) {
                        const toggle = dropdown.querySelector('.dropdown-toggle');
                        if (toggle) toggle.classList.add('active');
                    }
                }
            }
        });
    }
    
    // Actualizar enlaces activos según sección visible con throttling
    function updateNavActiveState() {
        // Solo para página principal
        if (!window.location.pathname.endsWith('index.html') && 
            !window.location.pathname.endsWith('/')) {
            return;
        }
        
        // Throttle usando requestAnimationFrame para mejor rendimiento
        if (!isScrolling) {
            requestAnimationFrame(() => {
                // Obtener todas las secciones una vez y reutilizar
                const sections = document.querySelectorAll('section[id]');
                let currentSection = '';
                
                const offset = headerHeight + 20;
                
                // Identificar la sección actual en el viewport
                sections.forEach(section => {
                    const rect = section.getBoundingClientRect();
                    
                    // Sección en vista cuando su top está por debajo del header pero aún visible
                    if (rect.top <= offset && rect.bottom >= offset) {
                        currentSection = section.getAttribute('id');
                    }
                });
                
                // Solo actualizar si hay una sección identificada y es diferente
                if (currentSection && currentSection !== lastSection) {
                    // Preparar selectores para minimizar búsquedas en DOM
                    const links = document.querySelectorAll('.nav-link');
                    
                    // Actualizar navegación visual
                    links.forEach(link => {
                        link.classList.remove('active');
                        
                        const href = link.getAttribute('href');
                        if (href) {
                            const sectionId = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
                            if (sectionId === currentSection) {
                                link.classList.add('active');
                                
                                // Si es parte de un dropdown, activar el toggle
                                const dropdown = link.closest('.dropdown');
                                if (dropdown) {
                                    const toggle = dropdown.querySelector('.dropdown-toggle');
                                    if (toggle) toggle.classList.add('active');
                                }
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
                    if (replaceStateCount < 90) {
                        const newUrl = `${window.location.pathname}#${currentSection}`;
                        history.replaceState(null, '', newUrl);
                        replaceStateCount++;
                        
                        // Actualizar sección actual
                        lastSection = currentSection;
                    }
                }
                
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    }
    
    // Inicializar scroll suave para enlaces internos
    function initSmoothScroll() {
        // Usar delegación de eventos para mejor rendimiento
        document.addEventListener('click', (e) => {
            // Comprobar si el clic fue en un enlace interno
            const target = e.target.closest('a[href^="#"]:not(.dropdown-toggle)');
            if (!target) return;
            
            const targetId = target.getAttribute('href');
            
            if (targetId === '#') return;
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Cerrar menú móvil primero si está abierto
                if (window.innerWidth <= 768) {
                    closeMobileMenu();
                }
                
                // Calcular offset según altura del header
                const offset = headerHeight + 16;
                
                // Calcular posición de destino
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
                
                // Añadir una animación más suave en dispositivos que lo soportan
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback para navegadores que no soportan scrollBehavior
                    animateScroll(targetPosition, 800);
                }
                
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
                target.classList.add('active');
            }
        });
    }
    
    // Función auxiliar para animar scroll en navegadores antiguos
    function animateScroll(targetY, duration) {
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = easeOutCubic(progress);
            
            window.scrollTo(0, startY + difference * easeProgress);
            
            if (elapsed < duration) {
                window.requestAnimationFrame(step);
            }
        }
        
        window.requestAnimationFrame(step);
    }
    
    // Inicializar animación del CTA para primera visita
    function initCTAAnimation(ctaButton) {
        if (!ctaButton) return;
        
        if (!sessionStorage.getItem('visited')) {
            setTimeout(() => {
                ctaButton.classList.add('pulse-animation');
                
                setTimeout(() => {
                    ctaButton.classList.remove('pulse-animation');
                }, 5000);
            }, 2000);
            
            // Marcar como visitado
            sessionStorage.setItem('visited', 'true');
        }
        
        // Añadir efecto de hover avanzado
        ctaButton.addEventListener('mouseenter', () => {
            ctaButton.classList.add('hover-scale');
        });
        
        ctaButton.addEventListener('mouseleave', () => {
            ctaButton.classList.remove('hover-scale');
            // Añadir efecto de "bounce-back"
            ctaButton.classList.add('bounce-back');
            setTimeout(() => {
                ctaButton.classList.remove('bounce-back');
            }, 400);
        });
    }
    
    // =========================================================================
    // EVENT HANDLERS OPTIMIZADOS
    // =========================================================================
    
    // Handler optimizado para scroll con requestAnimationFrame y throttling
    function handleScroll() {
        // Limitar número de ejecuciones durante scroll rápido
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            updateHeaderState();
            updateNavActiveState();
        }, SCROLL_THROTTLE);
    }
    
    // Handler para cambios de tamaño de ventana
    function handleResize() {
        // Debounce para evitar demasiadas llamadas
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Actualizar altura del header
            if (header) {
                headerHeight = header.offsetHeight;
            }
            
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
                    navMenu.classList.remove('closing');
                }
                
                // Reiniciar configuración de dropdowns para desktop
                setupDropdowns(document.querySelectorAll('.dropdown'));
            } else {
                // Reiniciar para móvil
                resetDropdowns();
                setupDropdowns(document.querySelectorAll('.dropdown'));
            }
        }, RESIZE_DEBOUNCE);
    }
    
    // =========================================================================
    // INICIALIZACIÓN OPTIMIZADA
    // =========================================================================
    
    // Pre-cargar funciones críticas
    document.addEventListener('DOMContentLoaded', function() {
        initNavbar();
        
        // Configurar event listeners globales con passive para mejor rendimiento
        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize, { passive: true });
    });
    
    // Configuraciones específicas cuando la página está completamente cargada
    window.addEventListener('load', function() {
        // Eliminar cualquier clase de precarga si existe
        document.body.classList.remove('preload');
        
        // Iniciar animación de scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
        
        // Verificar si hay un hash en la URL para navegar directamente
        if (window.location.hash) {
            const targetId = window.location.hash;
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Posponer para asegurar que todo esté renderizado
                requestAnimationFrame(() => {
                    // Asegurar que la transición de carga terminó
                    window.scrollTo({
                        top: targetElement.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                    
                    // Activar el enlace correspondiente
                    activateLinkByHash(targetId.substring(1));
                });
            }
        }
    });
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporNav = {
        updateHeaderState,
        closeMobileMenu,
        resetDropdowns
    };
})();
