/**
 * Orange Vapor - JavaScript Optimizado y Corregido
 * Scripts centralizados para mejorar rendimiento y mantenibilidad
 * Versión: 2.0.0 - Implementación mejorada con código optimizado
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // =========================================================================
    // VARIABLES GLOBALES
    // =========================================================================
    
    // Variables DOM compartidas
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    // Variables para el manejo de estado
    let lastScrollTop = 0;
    let isScrolling = false;
    let resizeTimer;
    
    // Variables para controlar replaceState
    let lastReplaceStateTime = 0;
    let lastSection = '';
    let replaceStateCount = 0;
    
    // =========================================================================
    // UTILIDADES Y FUNCIONES AUXILIARES
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
    // SOLUCIÓN INMEDIATA PARA LA VISIBILIDAD
    // =========================================================================
    
    /**
     * Asegura que los elementos críticos estén visibles de inmediato
     */
    function asegurarVisibilidadCritica() {
        const elementosCriticos = [
            '#servicios .seccion-titulo',
            '#servicios .servicios-tabs-container',
            '#servicios .servicios-content-container',
            '#servicios .oferta-especial',
            '#servicios .servicios-garantia',
            '#servicios .soluciones-card',
            '#servicios .fade-in',
            '#home .fade-in',
            '#optimizacion-express .fade-in',
            '.servicios-tabla-modern .fade-in',
            '.hero-content',
            '.hero-image'
        ];
        
        elementosCriticos.forEach(selector => {
            forEachElement(selector, elemento => {
                // Añadir clase visible y forzar estilos
                elemento.classList.add('visible');
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
                elemento.style.visibility = 'visible';
            });
        });
        
        console.log('Elementos críticos asegurados como visibles');
    }
    
    // Llamar inmediatamente para asegurar visibilidad
    asegurarVisibilidadCritica();
    
    // Respaldo adicional con setTimeout
    setTimeout(asegurarVisibilidadCritica, 500);
    setTimeout(() => {
        forEachElement('.fade-in', elemento => {
            elemento.classList.add('visible');
        });
        console.log('Todos los elementos fade-in asegurados como visibles');
    }, 2000);
    
    // =========================================================================
    // CONTADOR REGRESIVO
    // =========================================================================
    
    /**
     * Inicializa y configura el contador regresivo
     */
    function initCountdown() {
        // Verificar si existe el contador en la página
        const countdownElements = {
            days: document.querySelector('.countdown-item:nth-child(1) .countdown-number'),
            hours: document.querySelector('.countdown-item:nth-child(2) .countdown-number'),
            minutes: document.querySelector('.countdown-item:nth-child(3) .countdown-number'),
            seconds: document.querySelector('.countdown-item:nth-child(4) .countdown-number')
        };
        
        // Si no existen todos los elementos, no iniciar el contador
        if (!countdownElements.days || !countdownElements.hours || 
            !countdownElements.minutes || !countdownElements.seconds) {
            return;
        }
        
        // Valores iniciales
        let days = 14;
        let hours = 22;
        let minutes = 59;
        let seconds = 59;
        
        // Actualizar los valores iniciales en el DOM
        countdownElements.days.textContent = days;
        countdownElements.hours.textContent = hours;
        countdownElements.minutes.textContent = minutes;
        countdownElements.seconds.textContent = seconds;
        
        // Función para actualizar el contador cada segundo
        function updateCountdown() {
            // Disminuir los segundos
            seconds--;
            
            // Ajustar minutos, horas y días si es necesario
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        hours = 23;
                        days--;
                        
                        if (days < 0) {
                            // Reiniciar el contador cuando llegue a cero
                            days = 14;
                            hours = 22;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
            }
            
            // Formatear valores para mostrar siempre dos dígitos
            const formatNumber = num => num < 10 ? `0${num}` : num;
            
            // Actualizar los valores en el DOM
            countdownElements.days.textContent = days;
            countdownElements.hours.textContent = formatNumber(hours);
            countdownElements.minutes.textContent = formatNumber(minutes);
            countdownElements.seconds.textContent = formatNumber(seconds);
        }
        
        // Actualizar el contador cada segundo
        setInterval(updateCountdown, 1000);
    }
    
    // =========================================================================
    // TABS DE SERVICIOS Y TIERS
    // =========================================================================
    
    /**
     * Inicializa las pestañas de servicios
     */
    function initServiceTabs() {
        // Seleccionar todas las pestañas de servicios
        const servicioTabs = document.querySelectorAll('.servicio-tab');
        if (!servicioTabs.length) return;
        
        servicioTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Obtener el servicio seleccionado
                const servicio = this.getAttribute('data-servicio');
                
                // Remover clase 'active' de todas las pestañas
                servicioTabs.forEach(t => t.classList.remove('active'));
                
                // Añadir clase 'active' a la pestaña seleccionada
                this.classList.add('active');
                
                // Actualizar contenido visible
                forEachElement('.servicio-content-wrapper', content => {
                    content.classList.remove('active');
                });
                
                const targetContent = document.querySelector(`.servicio-content-wrapper[data-servicio="${servicio}"]`);
                if (targetContent) {
                    targetContent.classList.add('active');
                }
            });
        });
        
        // Inicializar mostrando el primer servicio
        const firstTab = document.querySelector('.servicio-tab[data-servicio="meta"]');
        if (firstTab) {
            firstTab.classList.add('active');
            const firstContent = document.querySelector('.servicio-content-wrapper[data-servicio="meta"]');
            if (firstContent) {
                firstContent.classList.add('active');
            }
        }
    }
    
    /**
     * Inicializa las pestañas de tiers (planes)
     */
    function initTierTabs() {
        const tierTabs = document.querySelectorAll('.tier-tab');
        if (!tierTabs.length) return;
        
        tierTabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Obtener el tier seleccionado
                const tier = this.getAttribute('data-tier');
                
                // Remover clase 'active' de todas las pestañas
                tierTabs.forEach(t => t.classList.remove('active'));
                
                // Añadir clase 'active' a la pestaña seleccionada
                this.classList.add('active');
                
                // Actualizar descripciones
                forEachElement('.tier-info', info => {
                    info.classList.remove('active');
                });
                const tierInfo = document.querySelector(`.tier-info.${tier}`);
                if (tierInfo) tierInfo.classList.add('active');
                
                // Actualizar precios
                forEachElement('.precio-compacto', price => {
                    price.classList.remove('active');
                });
                forEachElement(`.precio-compacto.tier-price.${tier}`, price => {
                    price.classList.add('active');
                });
                
                // Actualizar detalles (versiones de tabla normal y compacta)
                updateTierDetails(tier);
                
                // Reiniciar la vista de servicios al primer servicio
                resetServiceView();
            });
        });
        
        // Inicializar con el tier Starter
        const starterTab = document.querySelector('.tier-tab[data-tier="starter"]');
        if (starterTab) {
            starterTab.classList.add('active');
            const starterInfo = document.querySelector('.tier-info.starter');
            if (starterInfo) starterInfo.classList.add('active');
            updateTierDetails('starter');
        }
    }
    
    /**
     * Actualiza los detalles de tier en todas las tablas
     * @param {string} tier - Nombre del tier (starter, pro, elite)
     */
    function updateTierDetails(tier) {
        // Para cada tabla de servicios (normal y compacta)
        forEachElement('.servicios-tabla, .servicios-tabla-compacta, .servicios-tabla-modern', tabla => {
            // Ocultar todos los detalles primero
            forEachElement('.tier-detalle, .tier-detalle-compacto', detalle => {
                detalle.style.display = 'none';
                detalle.classList.remove('active');
            }, tabla);
            
            // Mostrar solo los detalles del tier seleccionado
            forEachElement(`.tier-detalle.${tier}, .tier-detalle-compacto.${tier}`, detalle => {
                detalle.style.display = 'flex';
                detalle.classList.add('active');
                
                // Añadir animación
                detalle.style.animation = 'none';
                setTimeout(() => {
                    detalle.style.animation = 'fadeIn 0.3s ease-in-out forwards';
                }, 10);
            }, tabla);
        });
    }
    
    /**
     * Reinicia la vista de servicios al primer servicio
     */
    function resetServiceView() {
        forEachElement('.servicio-tab', tab => {
            tab.classList.remove('active');
        });
        const firstTab = document.querySelector('.servicio-tab[data-servicio="meta"]');
        if (firstTab) firstTab.classList.add('active');
        
        forEachElement('.servicio-content-wrapper', content => {
            content.classList.remove('active');
        });
        const firstContent = document.querySelector('.servicio-content-wrapper[data-servicio="meta"]');
        if (firstContent) firstContent.classList.add('active');
    }
    
    /**
     * Inicializa el selector de tiers mini en la sección proceso
     */
    function initTierSelectorMini() {
        const tierOptionsMini = document.querySelectorAll('.tier-option');
        if (!tierOptionsMini.length) return;
        
        tierOptionsMini.forEach(option => {
            option.addEventListener('click', function() {
                // Actualizar estado visual de opciones
                tierOptionsMini.forEach(o => o.classList.remove('active'));
                this.classList.add('active');
                
                // Obtener tier seleccionado
                const tier = this.getAttribute('data-tier');
                
                // Actualizar precios mini
                forEachElement('.tier-mini', price => {
                    price.classList.remove('active');
                });
                
                const activeTierMini = document.querySelector(`.tier-mini.${tier}`);
                if (activeTierMini) activeTierMini.classList.add('active');
            });
        });
        
        // Inicializar con el primer tier activo
        if (tierOptionsMini[0]) tierOptionsMini[0].classList.add('active');
        const firstTierType = tierOptionsMini[0]?.getAttribute('data-tier');
        if (firstTierType) {
            const firstTierMini = document.querySelector(`.tier-mini.${firstTierType}`);
            if (firstTierMini) firstTierMini.classList.add('active');
        }
    }
    
    // =========================================================================
    // TOOLTIPS
    // =========================================================================
    
    /**
     * Inicializa el comportamiento de los tooltips
     */
    function initTooltips() {
        const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
        if (!tooltipTriggers.length) return;
        
        tooltipTriggers.forEach(trigger => {
            const tooltip = trigger.querySelector('.tooltip');
            if (!tooltip) return;
            
            // Mostrar tooltip al entrar
            trigger.addEventListener('mouseenter', () => {
                tooltip.classList.add('visible');
            });
            
            // Ocultar tooltip al salir
            trigger.addEventListener('mouseleave', () => {
                tooltip.classList.remove('visible');
            });
            
            // Para dispositivos táctiles
            trigger.addEventListener('touchstart', (e) => {
                e.preventDefault();
                tooltip.classList.toggle('visible');
            }, { passive: false });
        });
    }
    
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
        
        // Inicializar estado
        updateHeaderState();
        setActiveNavLinks();
        
        // Agregar event listener para el botón de menú móvil
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Event listeners para dropdowns en móvil
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    if (parent) toggleDropdown(parent);
                }
            });
        });
        
        // Cerrar menú móvil cuando se hace click en links (excepto toggles)
        navLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMobileMenu);
            }
        });
        
        // Cerrar menú al hacer click fuera
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
        
        // Configurar dropdowns
        setupDropdowns(dropdowns);
        
        // Inicializar scrolling suave
        initSmoothScroll();
        
        // Inicializar animación del CTA principal
        initCTAAnimation(ctaButton);
    }
    
    /**
     * Actualiza el estado del header según la posición de scroll
     */
    function updateHeaderState() {
        if (!header) return;
        
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
    
    /**
     * Toggle del menú móvil
     */
    function toggleMobileMenu() {
        if (!navMenu || !mobileToggle) return;
        
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', (!isExpanded).toString());
        
        // Controlar scroll del body
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Resetear dropdowns al cerrar menú
        if (isExpanded) {
            resetDropdowns();
        }
    }
    
    /**
     * Toggle dropdown específico
     * @param {HTMLElement} dropdown - Elemento dropdown a togglear
     */
    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            const isExpanded = dropdown.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded.toString());
            
            // Rotar ícono
            const icon = toggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
            }
        }
    }
    
    /**
     * Cerrar todos los dropdowns
     */
    function resetDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    /**
     * Cerrar menú móvil
     */
    function closeMobileMenu() {
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            document.body.style.overflow = '';
        }
    }
    
    /**
     * Configurar dropdowns con hover en desktop y click en móvil
     * @param {NodeList} dropdowns - Lista de elementos dropdown
     */
    function setupDropdowns(dropdowns) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Para desktop, usar mouse events
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
                
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
    // NAVEGACIÓN ACTIVA Y SCROLL
    // =========================================================================
    
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
            if (currentSection && currentSection !== lastSection) {
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
    
    /**
     * Inicializar animación del CTA para primera visita
     * @param {HTMLElement} ctaButton - Botón CTA a animar
     */
    function initCTAAnimation(ctaButton) {
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
    // ANIMACIONES
    // =========================================================================
    
    /**
     * Inicializa las animaciones al scroll
     */
    function initScrollAnimations() {
        // Marcar inmediatamente los elementos críticos
        const criticalSections = [
            '#servicios .fade-in',
            '#home .fade-in',
            '.hero-content',
            '.hero-image',
            '.seccion-titulo',
            '.servicios-tabs-container',
            '.servicios-content-container',
            '.oferta-especial',
            '.servicios-garantia'
        ];
        
        criticalSections.forEach(selector => {
            forEachElement(selector, el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
        });
        
        // Configurar IntersectionObserver para animaciones al scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Considerar elementos parcialmente visibles o que están por entrar en la pantalla
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                    entry.target.classList.add('visible');
                    // Dejar de observar después de hacer visible
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.01,  // Detectar con solo 1% visible
            rootMargin: '0px 0px -10% 0px' // Considerar elementos casi visibles
        });
        
        // Observar elementos fade-in que aún no sean visibles
        forEachElement('.fade-in:not(.visible)', element => {
            observer.observe(element);
        });
    }
    
    /**
     * Inicializa las animaciones de métricas
     */
    function initMetricAnimations() {
        // Hacer visibles las métricas inmediatamente
        forEachElement('.metric-after', metric => {
            metric.classList.add('animated');
            metric.style.opacity = '1';
            
            // Obtener y mostrar el valor final
            const targetValue = metric.getAttribute('data-value');
            if (targetValue) {
                metric.textContent = targetValue;
            }
        });
        
        // Configurar respaldo con IntersectionObserver
        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const metric = entry.target;
                    metric.classList.add('animated');
                    metric.style.opacity = '1';
                    
                    // Obtener y mostrar el valor final
                    const targetValue = metric.getAttribute('data-value');
                    if (targetValue) {
                        metric.textContent = targetValue;
                    }
                    
                    // Dejar de observar
                    metricObserver.unobserve(metric);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observar solo métricas que aún no estén animadas
        forEachElement('.metric-after:not(.animated)', metric => {
            metricObserver.observe(metric);
        });
    }
    
    // =========================================================================
    // FUNCIONES ADICIONALES
    // =========================================================================
    
    /**
     * Actualiza el precio de la oferta especial
     */
    function updateSpecialOffer() {
        // Calcular precio regular y ahorro
        const regularPrice = 299 * 4; // $1,196
        const discountedPrice = 1000; // Precio con descuento
        const savings = regularPrice - discountedPrice;
        
        // Actualizar texto de oferta especial
        const ofertaEspecial = document.querySelector('.oferta-especial h3');
        if (ofertaEspecial) {
            ofertaEspecial.innerHTML = `Growth Accelerator: Meta + Google + Email + Chatbot por <span class="precio-destacado">US$${discountedPrice}/mes</span> <span class="precio-strike">$${regularPrice}</span>`;
        }
        
        // Actualizar información de ahorro si existe
        const bundleInfo = document.querySelector('.bundle-offer-price');
        if (bundleInfo) {
            bundleInfo.textContent = `Incluye: 1 consulta estratégica gratis al mes + Set up inicial bonificado. ¡Ahorrá $${savings}/mes!`;
        }
    }
    
    /**
     * Configura mejoras para móvil
     */
    function setupMobileEnhancements() {
        if (window.innerWidth <= 768) {
            // En móvil, hacer los CTAs más accesibles
            const mainCTA = document.querySelector('.hero-buttons .btn');
            if (mainCTA) {
                mainCTA.style.width = '100%';
                mainCTA.style.padding = '16px 24px';
                mainCTA.style.fontSize = '1.1rem';
            }
            
            // Simplificar animaciones para mejor rendimiento
            document.body.classList.add('mobile-optimized');
        } else {
            // En desktop, eliminar optimizaciones móviles
            document.body.classList.remove('mobile-optimized');
        }
    }
    
    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    
    /**
     * Maneja el evento de scroll
     */
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
            }
            
            // Reinicializar mejoras para móvil
            setupMobileEnhancements();
        }, 150);
    }
    
    /**
     * Verifica si hay un hash en la URL para navegar directamente
     */
    function handleHashNavigation() {
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = header?.offsetHeight || 0;
                    const offset = headerHeight + 16;
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    }
    
    // =========================================================================
    // INICIALIZACIÓN PRINCIPAL
    // =========================================================================
    
    // Remover clase preload inmediatamente
    document.body.classList.remove('preload');
    
    // Inicializar componentes principales
    initNavbar();
    initScrollAnimations();
    initMetricAnimations();
    initCountdown();
    initServiceTabs();
    initTierTabs();
    initTierSelectorMini();
    initTooltips();
    updateSpecialOffer();
    setupMobileEnhancements();
    
    // Configurar event listeners globales
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Configuraciones al cargar completamente la página
    window.addEventListener('load', function() {
        // Eliminar cualquier clase de precarga
        document.body.classList.remove('preload');
        
        // Iniciar animación de scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
        
        // Último respaldo para asegurar visibilidad
        asegurarVisibilidadCritica();
        
        // Manejar navegación por hash
        handleHashNavigation();
    });
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporApp = {
        updateHeaderState,
        closeMobileMenu,
        asegurarVisibilidadCritica,
        initServiceTabs,
        initTierTabs,
        initTooltips,
        updateSpecialOffer
    };
});
