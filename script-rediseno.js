/**
 * Orange Vapor - JavaScript Optimizado (Sistema 5S)
 * 
 * Implementa los principios 5S de Toyota:
 * 1. SEIRI (Clasificar): Código organizado en funciones específicas
 * 2. SEITON (Ordenar): Estructura modular y predecible
 * 3. SEISO (Limpiar): Código optimizado sin redundancias
 * 4. SEIKETSU (Estandarizar): Patrones consistentes
 * 5. SHITSUKE (Mantener): Comentarios claros y mantenibilidad
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =========================================================================
    // UTILIDADES Y FUNCIONES AUXILIARES
    // =========================================================================
    
    /**
     * Selecciona elementos del DOM y ejecuta una función para cada uno
     * @param {string} selector - Selector CSS
     * @param {Function} callback - Función a ejecutar para cada elemento
     * @param {HTMLElement} [parent=document] - Elemento padre donde buscar
     * @returns {boolean} - Verdadero si hay elementos encontrados
     */
    const forEachElement = (selector, callback, parent = document) => {
        const elements = parent.querySelectorAll(selector);
        if (elements.length > 0) {
            elements.forEach(callback);
            return true;
        }
        return false;
    };
    
    /**
     * Detecta si está en modo de reducción de movimiento
     * @returns {boolean} - Verdadero si prefiere reducción de movimiento
     */
    const prefersReducedMotion = () => {
        return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    };
    
    /**
     * Agrega o quita una clase basado en una condición
     * @param {HTMLElement} element - Elemento del DOM
     * @param {string} className - Nombre de la clase a modificar
     * @param {boolean} condition - Condición para agregar (true) o quitar (false)
     */
    const toggleClass = (element, className, condition) => {
        if (condition) {
            element.classList.add(className);
        } else {
            element.classList.remove(className);
        }
    };

    /**
     * Detecta si un elemento está visible en el viewport
     * @param {HTMLElement} element - Elemento a comprobar
     * @param {number} offset - Offset opcional
     * @returns {boolean} - Verdadero si el elemento está visible
     */
    const isInViewport = (element, offset = 0) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= offset
        );
    };

    // =========================================================================
    // NAVBAR Y NAVEGACIÓN
    // =========================================================================
    
    
        
        // Menú móvil toggle
        if (mobileToggle && navMenu) {
            mobileToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                
                const isExpanded = navMenu.classList.contains('active');
                mobileToggle.setAttribute('aria-expanded', isExpanded);
                
                // Cambiar icono
                const icon = mobileToggle.querySelector('i');
                if (isExpanded) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        }
        
        // Cerrar menú al hacer clic en links
        forEachElement('.nav-link', link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 991 && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', false);
                    
                    const icon = mobileToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    };
    
    /**
     * Inicializa navegación suave para enlaces internos
     */
    const initSmoothScrolling = () => {
        document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Calcular offset para header fijo
                    const navbarHeight = document.querySelector('.navbar') ? 
                        document.querySelector('.navbar').offsetHeight : 70;
                    
                    const offsetTop = targetElement.getBoundingClientRect().top + 
                        window.pageYOffset - navbarHeight;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: prefersReducedMotion() ? 'auto' : 'smooth'
                    });
                }
            });
        });
    };

    // =========================================================================
    // TABS DE SERVICIOS
    // =========================================================================
    
    /**
     * Inicializa las pestañas de servicios
     */
    const initServiceTabs = () => {
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
                }
            });
        });

        // Configurar roles ARIA para las pestañas
        const tabsContainer = document.querySelector('.tabs-nav');
        if (tabsContainer) {
            tabsContainer.setAttribute('role', 'tablist');
            
            tabButtons.forEach((button, index) => {
                const tabId = button.getAttribute('data-tab');
                button.setAttribute('role', 'tab');
                button.setAttribute('id', `tab-${tabId}`);
                button.setAttribute('aria-controls', tabId);
                button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
                
                const tabPanel = document.getElementById(tabId);
                if (tabPanel) {
                    tabPanel.setAttribute('role', 'tabpanel');
                    tabPanel.setAttribute('aria-labelledby', `tab-${tabId}`);
                    tabPanel.setAttribute('tabindex', '0');
                    tabPanel.setAttribute('aria-hidden', !button.classList.contains('active'));
                }
                
                // Navegación con teclado
                button.addEventListener('keydown', (e) => {
                    // Array de todas las pestañas para la navegación
                    const tabs = Array.from(tabButtons);
                    const maxIndex = tabs.length - 1;
                    let targetIndex;
                    
                    if (e.key === 'ArrowRight') {
                        targetIndex = index < maxIndex ? index + 1 : 0;
                    } else if (e.key === 'ArrowLeft') {
                        targetIndex = index > 0 ? index - 1 : maxIndex;
                    } else if (e.key === 'Home') {
                        targetIndex = 0;
                    } else if (e.key === 'End') {
                        targetIndex = maxIndex;
                    } else {
                        return; // Salir si no es una tecla de navegación
                    }
                    
                    e.preventDefault();
                    tabs[targetIndex].click();
                    tabs[targetIndex].focus();
                });
            });
        }
    };

    // =========================================================================
    // ACCORDION FAQ
    // =========================================================================
    
    /**
     * Inicializa los acordeones para FAQs
     */
    const initFaqAccordion = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        if (!faqItems.length) return;
        
        faqItems.forEach((item, index) => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            if (!question || !answer || !toggle) return;
            
            // Configurar ARIA para accesibilidad
            const id = `faq-answer-${index}`;
            answer.id = id;
            question.setAttribute('aria-controls', id);
            question.setAttribute('aria-expanded', 'false');
            answer.setAttribute('aria-hidden', 'true');
            
            question.addEventListener('click', () => {
                // Obtener estado actual
                const isExpanded = question.getAttribute('aria-expanded') === 'true';
                
                // Cerrar todos los demás acordeones
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        const otherQuestion = otherItem.querySelector('.faq-question');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        
                        if (otherQuestion && otherAnswer && otherToggle) {
                            otherItem.classList.remove('active');
                            otherQuestion.setAttribute('aria-expanded', 'false');
                            otherAnswer.setAttribute('aria-hidden', 'true');
                            otherToggle.innerHTML = '<i class="fas fa-plus"></i>';
                        }
                    }
                });
                
                // Alternar estado del acordeón actual
                item.classList.toggle('active', !isExpanded);
                question.setAttribute('aria-expanded', !isExpanded);
                answer.setAttribute('aria-hidden', isExpanded);
                
                // Cambiar icono
                toggle.innerHTML = !isExpanded ? 
                    '<i class="fas fa-minus"></i>' : 
                    '<i class="fas fa-plus"></i>';
            });
        });
        
        // Abrir primer elemento por defecto tras un breve retraso
        setTimeout(() => {
            const firstItem = faqItems[0];
            if (firstItem) {
                const firstQuestion = firstItem.querySelector('.faq-question');
                if (firstQuestion) {
                    firstQuestion.click();
                }
            }
        }, 500);
    };

    // =========================================================================
    // ANIMACIONES DE SCROLL
    // =========================================================================
    
    /**
     * Inicializa animaciones basadas en scroll
     */
    const initScrollAnimations = () => {
        // Omitir si se prefiere reducción de movimiento
        if (prefersReducedMotion()) return;
        
        // Elementos a animar durante el scroll
        const animateElements = document.querySelectorAll('.audit-card-container, .plan-card, .process-step, .team-member, .value-card, .testimonial-card');
        
        // Función para verificar y animar elementos
        const checkScrollPosition = () => {
            animateElements.forEach(element => {
                if (isInViewport(element, 100) && !element.classList.contains('animated')) {
                    element.classList.add('animated');
                    element.style.animation = 'fadeInUp 0.6s ease forwards';
                }
            });
        };
        
        // Asociamos la función al evento scroll, con debounce para mejor rendimiento
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = window.requestAnimationFrame(checkScrollPosition);
        });
        
        // Verificar posición inicial tras carga
        window.addEventListener('load', checkScrollPosition);
        
        // Agregar keyframes de animación si no están disponibles en el CSS
        if (!document.querySelector('#animation-keyframes')) {
            const style = document.createElement('style');
            style.id = 'animation-keyframes';
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    };

    // =========================================================================
    // MEJORAS DE ACCESIBILIDAD
    // =========================================================================
    
    /**
     * Mejora la accesibilidad de elementos interactivos
     */
    const enhanceAccessibility = () => {
        // Agregar roles ARIA y atributos a elementos interactivos
        const interactiveElements = document.querySelectorAll('button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        
        interactiveElements.forEach(element => {
            // Asegurar que todos los elementos interactivos sean detectables por teclado
            if (!element.hasAttribute('tabindex') && element.tagName.toLowerCase() !== 'a' && element.tagName.toLowerCase() !== 'button') {
                element.setAttribute('tabindex', '0');
            }
        });
        
        // Asegurar que los iconos decorativos sean ignorados por lectores de pantalla
        forEachElement('.fas, .fab, .far', icon => {
            if (!icon.getAttribute('aria-hidden')) {
                icon.setAttribute('aria-hidden', 'true');
            }
        });
        
        // Mejorar elementos para lectores de pantalla
        if (document.querySelector('.gratis-badge')) {
            document.querySelector('.gratis-badge').setAttribute('aria-label', 'Gratis');
        }
        
        if (document.querySelector('.ribbon')) {
            document.querySelector('.ribbon').setAttribute('aria-label', 'Gratis');
        }
    };

    // =========================================================================
    // OPTIMIZACIONES PARA MÓVILES
    // =========================================================================
    
    /**
     * Ajustes específicos para dispositivos móviles
     */
    const handleResponsiveAdjustments = () => {
        const isMobile = window.innerWidth <= 767;
        
        // Simplificar animaciones en móviles para mejor rendimiento
        if (isMobile) {
            document.body.classList.add('mobile-view');
            
            // Ajustar CTA flotante en móvil
            const floatingCta = document.querySelector('.floating-cta');
            if (floatingCta) {
                floatingCta.style.bottom = '15px';
                floatingCta.style.right = '15px';
            }
        } else {
            document.body.classList.remove('mobile-view');
        }
    };

    // =========================================================================
    // INICIALIZACIÓN DEL SITIO
    // =========================================================================
    
    // Iniciar componentes 
    initNavbar();
    initSmoothScrolling();
    initServiceTabs();
    initFaqAccordion();
    enhanceAccessibility();
    handleResponsiveAdjustments();
    
    // Iniciar animaciones solo si no hay preferencia de reducción de movimiento
    if (!prefersReducedMotion()) {
        initScrollAnimations();
    }
    
    // Evento de resize para ajustes responsivos
    window.addEventListener('resize', handleResponsiveAdjustments);
    
    // Evento de página cargada completamente
    window.addEventListener('load', function() {
        // Marcar como cargado para permitir transiciones
        document.body.classList.add('loaded');
        
        // Manejar navegación por hash al cargar la página
        if (window.location.hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(window.location.hash);
                if (targetElement) {
                    const navbarHeight = document.querySelector('.navbar') ? 
                        document.querySelector('.navbar').offsetHeight : 70;
                    
                    const offsetTop = targetElement.getBoundingClientRect().top + 
                        window.scrollY - navbarHeight - 20;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'auto'
                    });
                }
            }, 300);
        }
    });
});
