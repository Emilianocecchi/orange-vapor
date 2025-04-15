/**
 * Orange Vapor - JavaScript para Navbar
 * Script exclusivo para funcionalidades de la barra de navegación
 * Versión: 2.1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =========================================================================
    // VARIABLES GLOBALES PARA NAVBAR
    // =========================================================================
    
    // Variables DOM compartidas
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navWrapper = document.querySelector('.nav-wrapper');
    
    // Variables para el manejo de estado
    let lastScrollTop = 0;
    let isScrolling = false;
    let resizeTimer;
    
    // =========================================================================
    // UTILIDADES Y FUNCIONES AUXILIARES PARA NAVBAR
    // =========================================================================
    
    /**
     * Selecciona elementos del DOM y ejecuta una función para cada uno
     * @param {string} selector - Selector CSS
     * @param {Function} fn - Función a ejecutar para cada elemento
     * @param {HTMLElement} [parent=document] - Elemento padre donde buscar
     */
    const forEachElement = (selector, fn, parent = document) => {
        const elements = parent.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(fn);
            return true;
        }
        return false;
    };
    
    /**
     * Añade un evento a múltiples elementos
     * @param {string} selector - Selector CSS
     * @param {string} event - Nombre del evento
     * @param {Function} handler - Función manejadora del evento
     * @param {HTMLElement} [parent=document] - Elemento padre donde buscar
     */
    const addEventToElements = (selector, event, handler, parent = document) => {
        forEachElement(selector, element => {
            element.addEventListener(event, handler);
        }, parent);
    };
    
    /**
     * Comprueba si un elemento existe en el DOM
     * @param {string} selector - Selector CSS
     * @returns {boolean} - True si existe, false en caso contrario
     */
    const elementExists = selector => document.querySelector(selector) !== null;
    
    // =========================================================================
    // NAVEGACIÓN Y NAVBAR
    // =========================================================================
    
    /**
     * Inicializa la navegación y comportamiento del navbar
     */
    function initNavbar() {
        if (!header) return;

        // Referencias adicionales
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        const ctaButton = document.querySelector('.cta-button');
        
        // Manejar scroll para cambiar estilo de navbar
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Cambiar a scrolled cuando scrollea
            if (scrollTop > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            // Ocultar navbar al scrollear hacia abajo
            if (scrollTop > lastScrollTop && scrollTop > 300) {
                header.classList.add('scrolled-down');
            } else {
                header.classList.remove('scrolled-down');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Toggle menú móvil
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
        
        // Dropdowns en móvil
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 1024) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    
                    // Cerrar otros dropdowns
                    dropdowns.forEach(dropdown => {
                        if (dropdown !== parent) {
                            dropdown.classList.remove('active');
                            const dropToggle = dropdown.querySelector('.dropdown-toggle');
                            if (dropToggle) dropToggle.setAttribute('aria-expanded', 'false');
                        }
                    });
                    
                    // Abrir/cerrar el dropdown actual
                    parent.classList.toggle('active');
                    const isExpanded = parent.classList.contains('active');
                    this.setAttribute('aria-expanded', isExpanded);
                }
            });
        });
        
        // Cerrar menú móvil cuando se hace click en links (excepto toggles)
        navLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', function() {
                    if (window.innerWidth <= 1024 && navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navWrapper.classList.remove('active');
                        
                        if (mobileToggle) {
                            mobileToggle.classList.remove('active');
                            mobileToggle.setAttribute('aria-expanded', 'false');
                        }
                        
                        document.body.style.overflow = '';
                    }
                });
            }
        });
        
        // Cerrar dropdown y menú al hacer click fuera
        document.addEventListener('click', function(e) {
            // Solo en modo móvil para el menú
            if (window.innerWidth <= 1024) {
                // Verificar si el click fue fuera del menú y toggle
                if (navMenu && navMenu.classList.contains('active') && 
                    !navMenu.contains(e.target) && 
                    !mobileToggle.contains(e.target)) {
                    mobileToggle.classList.remove('active');
                    navWrapper.classList.remove('active');
                    navMenu.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            }
            
            // En cualquier modo, cerrar dropdowns si click fuera
            if (!e.target.closest('.dropdown')) {
                dropdowns.forEach(dropdown => {
                    dropdown.classList.remove('active');
                    const toggle = dropdown.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });
        
        // En modo desktop, hover para dropdowns
        if (window.innerWidth > 1024) {
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                    const toggle = this.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'true');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    this.classList.remove('active');
                    const toggle = this.querySelector('.dropdown-toggle');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            });
        }
        
        // Manejar cambios de tamaño de ventana
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Si cambia de móvil a desktop
                if (window.innerWidth > 1024) {
                    document.body.style.overflow = '';
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
                    
                    // Configurar hover de dropdowns para desktop
                    dropdowns.forEach(dropdown => {
                        dropdown.addEventListener('mouseenter', function() {
                            this.classList.add('active');
                            const toggle = this.querySelector('.dropdown-toggle');
                            if (toggle) toggle.setAttribute('aria-expanded', 'true');
                        });
                        
                        dropdown.addEventListener('mouseleave', function() {
                            this.classList.remove('active');
                            const toggle = this.querySelector('.dropdown-toggle');
                            if (toggle) toggle.setAttribute('aria-expanded', 'false');
                        });
                    });
                }
            }, 250);
        });
        
        // Inicializar scrolling suave
        initSmoothScroll();
        
        // Inicializar animación del CTA principal
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
        
        // Actualizar enlaces activos
        setActiveNavLinks();
    }
    
    /**
     * Cerrar menú móvil
     */
    function closeMobileMenu() {
        if (window.innerWidth <= 1024 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            if (navWrapper) {
                navWrapper.classList.remove('active');
            }
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Activar un item de dropdown y su toggle
     * @param {string} href - Ruta del enlace a activar
     */
    function activateDropdownItem(href) {
        const item = document.querySelector(`a[href="${href}"]`);
        if (!item) return;
        
        item.classList.add('active');
        const dropdown = item.closest('.dropdown');
        
        if (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.classList.add('active');
        }
    }
    
    /**
     * Activar enlace según hash en la URL
     * @param {string} hash - Hash de la URL sin #
     */
    function activateLinkByHash(hash) {
        forEachElement('.nav-link', link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkHash = href.startsWith('#') ? href.substring(1) : '';
                if (linkHash === hash) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    /**
     * Establecer enlaces activos según URL
     */
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        forEachElement('.nav-link, .dropdown-item', link => {
            link.classList.remove('active');
        });
        
        // Activar enlace según la página actual
        if (filename === '' || filename === 'index.html') {
            // En la home page, activar enlaces según la sección visible
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
            const link = document.querySelector('a[href="optimizacion-express.html"]');
            if (link) link.classList.add('active');
        } else if (filename.includes('contacto.html')) {
            const link = document.querySelector('a[href="contacto.html"]');
            if (link) link.classList.add('active');
        }
    }
    
    /**
     * Inicializar scroll suave para enlaces internos
     */
    function initSmoothScroll() {
        forEachElement('a[href^="#"]:not(.dropdown-toggle)', anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil primero si está abierto
                    closeMobileMenu();
                    
                    // Calcular offset según altura del header
                    const headerHeight = header?.offsetHeight || 0;
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
                    forEachElement('.nav-link', link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }
    
    // =========================================================================
    // INICIALIZACIÓN PRINCIPAL
    // =========================================================================
    
    // Inicializar componentes de la navbar
    initNavbar();
    
    // Configurar event listeners globales para la navbar
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    /**
     * Maneja el evento de scroll
     */
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateNavActiveState();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    /**
     * Maneja el evento de resize de la ventana
     */
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
                
                if (navWrapper) {
                    navWrapper.classList.remove('active');
                }
            }
        }, 150);
    }
    
    /**
     * Actualizar enlaces activos según sección visible
     */
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
            if (currentSection) {
                // Actualizar navegación visual
                forEachElement('.nav-link', link => {
                    link.classList.remove('active');
                    
                    const href = link.getAttribute('href');
                    if (href) {
                        const sectionId = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
                        if (sectionId === currentSection) {
                            link.classList.add('active');
                        }
                    }
                });
            }
        }
    }
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporNavbar = {
        closeMobileMenu,
        setActiveNavLinks,
        initNavbar
    };
});
