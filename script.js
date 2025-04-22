/**
 * Orange Vapor - JavaScript Optimizado
 * Script para funcionalidades específicas con mejor rendimiento
 * Versión: 2.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

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
     * Crea un trigger de evento personalizado
     * @param {string} eventName - Nombre del evento
     * @returns {Event} - Objeto de evento
     */
    const createEvent = (eventName) => {
        return new Event(eventName, {
            bubbles: true,
            cancelable: true
        });
    };
    
    /**
     * Detecta si está en modo de reducción de movimiento
     * @returns {boolean} - Verdadero si prefiere reducción de movimiento
     */
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };
    
    // =========================================================================
    // ASEGURAR VISIBILIDAD DE ELEMENTOS CRÍTICOS
    // =========================================================================
    
    /**
     * Asegura que los elementos críticos estén visibles de inmediato
     */
    function asegurarVisibilidadCritica() {
        const elementosCriticos = [
            '.hero-content', 
            '.hero-image',
            '.auditoria-card-redesign',
            '.seccion-titulo',
            '.servicios-tabs-container',
            '.tabs-content',
            '.tab-content.active'
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
    }
    
    // Llamar inmediatamente para asegurar visibilidad
    asegurarVisibilidadCritica();
    
    // Respaldo adicional con setTimeout para asegurar visibilidad
    setTimeout(asegurarVisibilidadCritica, 100);
    setTimeout(() => {
        forEachElement('.fade-in', elemento => {
            elemento.classList.add('visible');
        });
    }, 500);
    
    // =========================================================================
    // MICROINTERACCIONES Y ANIMACIONES OPTIMIZADAS
    // =========================================================================
    
    function initScrollAnimations() {
        // Omitir si se prefiere reducción de movimiento
        if (prefersReducedMotion()) {
            forEachElement('.fade-in', el => el.classList.add('visible'));
            return;
        }
        
        // Usar Intersection Observer para animaciones más eficientes
        const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
        
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Añadir clases de animación según tipo
                    if (entry.target.classList.contains('fade-left')) {
                        entry.target.classList.add('animate-fade-left');
                    } else if (entry.target.classList.contains('fade-right')) {
                        entry.target.classList.add('animate-fade-right');
                    } else if (entry.target.classList.contains('fade-up')) {
                        entry.target.classList.add('animate-fade-up');
                    }
                    
                    // Dejar de observar después de animar
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });

        // Añadir delay personalizado a elementos en secuencia
        document.querySelectorAll('.features-sequence > *').forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    }
    
    // =========================================================================
    // TABS DE SERVICIOS - OPTIMIZADO
    // =========================================================================
    
    /**
     * Inicializa las pestañas de servicios con mejor UX
     */
    function initServiceTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        if (!tabButtons.length) return;
        
        tabButtons.forEach(tab => {
            tab.addEventListener('click', function() {
                // Obtener el tab seleccionado
                const tabId = this.getAttribute('data-tab');
                
                // Actualizar botones
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.setAttribute('aria-selected', 'false');
                });
                
                this.classList.add('active');
                this.setAttribute('aria-selected', 'true');
                
                // Actualizar contenido de tabs
                const tabContents = document.querySelectorAll('.tab-content');
                tabContents.forEach(content => {
                    content.classList.remove('active');
                    content.setAttribute('aria-hidden', 'true');
                });
                
                const activeContent = document.getElementById(tabId);
                if (activeContent) {
                    activeContent.classList.add('active');
                    activeContent.setAttribute('aria-hidden', 'false');
                    
                    // Scroll al contenido en móvil
                    if (window.innerWidth < 768) {
                        setTimeout(() => {
                            activeContent.scrollIntoView({
                                behavior: 'smooth',
                                block: 'start',
                                inline: 'nearest'
                            });
                        }, 300);
                    }
                }
            });
        });
    }
    
    // =========================================================================
    // TIER SELECTOR MINI
    // =========================================================================
    
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
        if (tierOptionsMini[0]) {
            tierOptionsMini[0].classList.add('active');
            const firstTierType = tierOptionsMini[0].getAttribute('data-tier');
            if (firstTierType) {
                const firstTierMini = document.querySelector(`.tier-mini.${firstTierType}`);
                if (firstTierMini) firstTierMini.classList.add('active');
            }
        }
    }

    // =========================================================================
    // FAQ ACCORDION - NUEVO
    // =========================================================================
    
    /**
     * Inicializa los acordeones para FAQs
     */
    function initFaqAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (!question || !answer || !toggle) return;
            
            // Configurar ARIA para accesibilidad
            const id = `faq-${Math.random().toString(36).substring(2, 9)}`;
            answer.id = id;
            question.setAttribute('aria-controls', id);
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            
            question.addEventListener('click', () => {
                // Obtener altura real para animación suave
                const isActive = item.classList.contains('active');
                
                // Cerrar todos los demás elementos
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        if (otherQuestion) otherQuestion.setAttribute('aria-expanded', 'false');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                });
                
                // Alternar estado actual
                item.classList.toggle('active');
                question.setAttribute('aria-expanded', !isActive);
                answer.setAttribute('aria-hidden', isActive);
                
                // Cambiar icono
                if (toggle) {
                    toggle.innerHTML = item.classList.contains('active') ? 
                        '<i class="fas fa-minus"></i>' : 
                        '<i class="fas fa-plus"></i>';
                }
            });
        });
        
        // Abrir primer elemento por defecto
        if (faqItems[0]) {
            setTimeout(() => {
                const firstQuestion = faqItems[0].querySelector('.faq-question');
                if (firstQuestion) firstQuestion.click();
            }, 500);
        }
    }
    
    // =========================================================================
    // NAVEGACIÓN SUAVE
    // =========================================================================
    
    /**
     * Inicializa navegación suave para enlaces internos
     */
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil si está abierto
                    const mobileToggle = document.querySelector('.mobile-toggle');
                    const navMenu = document.querySelector('.nav-menu');
                    
                    if (mobileToggle && navMenu) {
                        if (mobileToggle.classList.contains('active')) {
                            mobileToggle.classList.remove('active');
                            navMenu.classList.remove('active');
                        }
                    }
                    
                    // Calcular offset para header fijo
                    const headerHeight = document.querySelector('header') ? 
                        document.querySelector('header').offsetHeight : 70;
                    
                    const offsetTop = targetElement.getBoundingClientRect().top + 
                        window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                    });
                }
            });
        });
    }
    
    // =========================================================================
    // MEJORAS DE ACCESIBILIDAD
    // =========================================================================
    
    /**
     * Mejora la accesibilidad de los elementos interactivos
     */
    function enhanceAccessibility() {
        // Añadir roles y atributos ARIA a las pestañas
        const tabContainers = document.querySelectorAll('.tabs-menu');
        tabContainers.forEach((container, index) => {
            const tablistId = `tablist-${index}`;
            container.setAttribute('role', 'tablist');
            container.id = tablistId;
            
            const tabs = container.querySelectorAll('.tab-button');
            tabs.forEach((tab, tabIndex) => {
                const tabId = tab.getAttribute('data-tab');
                const contentId = tabId;
                
                tab.setAttribute('role', 'tab');
                tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');
                tab.id = `tab-${tabId}`;
                tab.setAttribute('aria-controls', contentId);
                tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');
                
                // Manejar navegación con teclado
                tab.addEventListener('keydown', (e) => {
                    let targetTab = null;
                    
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        targetTab = tabIndex === tabs.length - 1 ? tabs[0] : tabs[tabIndex + 1];
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        targetTab = tabIndex === 0 ? tabs[tabs.length - 1] : tabs[tabIndex - 1];
                    } else if (e.key === 'Home') {
                        targetTab = tabs[0];
                    } else if (e.key === 'End') {
                        targetTab = tabs[tabs.length - 1];
                    }
                    
                    if (targetTab) {
                        e.preventDefault();
                        targetTab.focus();
                        targetTab.click();
                    }
                });
            });
            
            // Configurar paneles de tabs
            const tabPanels = document.querySelectorAll('.tab-content');
            tabPanels.forEach(panel => {
                const tabId = panel.id;
                const controllingTab = document.querySelector(`[aria-controls="${tabId}"]`);
                
                panel.setAttribute('role', 'tabpanel');
                panel.setAttribute('aria-labelledby', controllingTab ? controllingTab.id : '');
                panel.setAttribute('tabindex', '0');
                panel.setAttribute('aria-hidden', panel.classList.contains('active') ? 'false' : 'true');
            });
        });
        
        // Añadir focus-visible a elementos interactivos
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
        interactiveElements.forEach(el => {
            el.classList.add('focus-visible');
        });
    }
    
    // =========================================================================
    // INICIALIZACIÓN
    // =========================================================================
    
    // Iniciar componentes principales
    initScrollAnimations();
    initServiceTabs();
    initTierSelectorMini();
    initFaqAccordion();
    initSmoothScrolling();
    enhanceAccessibility();
    
    // Remover clase de precarga
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 100);
    
    // Evento de página cargada completamente
    window.addEventListener('load', function() {
        // Iniciar JS solo después de carga completa
        document.body.classList.add('js-loaded');
        
        // Manejar navegación por hash
        if (window.location.hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const headerHeight = document.querySelector('header') ? 
                        document.querySelector('header').offsetHeight : 70;
                    
                    const offsetTop = targetElement.getBoundingClientRect().top + 
                        window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'auto'
                    });
                }
            }, 300);
        }
    });
    
    // =========================================================================
    // RESPONSIVE ADJUSTMENTS
    // =========================================================================
    
    /**
     * Ajustes específicos para dispositivos móviles
     */
    function handleResponsiveAdjustments() {
        const isMobile = window.innerWidth <= 768;
        const isTablet = window.innerWidth <= 992 && window.innerWidth > 768;
        
        // Ajustes específicos para móvil
        if (isMobile) {
            // Simplificar animaciones para mejor rendimiento
            document.body.classList.add('mobile-optimized');
            
            // Ajustar CTA flotante en móvil
            const ctaFlotante = document.querySelector('.cta-flotante');
            if (ctaFlotante) {
                ctaFlotante.style.bottom = '15px';
                ctaFlotante.style.right = '15px';
            }
        } else {
            document.body.classList.remove('mobile-optimized');
        }
        
        // Ajustes específicos para tablet
        if (isTablet) {
            // Cualquier ajuste específico para tablets
        }
    }
    
    // Iniciar configuración responsive
    handleResponsiveAdjustments();
    
    // Actualizar en resize de ventana
    window.addEventListener('resize', handleResponsiveAdjustments);
});
