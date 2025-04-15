/**
 * Orange Vapor - JavaScript para Home
 * Script para funcionalidades específicas de la página principal
 * Versión: 1.0.0
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
    
    // =========================================================================
    // ASEGURAR VISIBILIDAD DE ELEMENTOS CRÍTICOS
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
    // MICROINTERACCIONES Y ANIMACIONES
    // =========================================================================
    
    function initScrollAnimations() {
        // Microinteracciones optimizadas para el rendimiento
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
                    if (entry.target.classList.contains('fade-left')) {
                        entry.target.classList.add('animate-fade-left');
                    } else if (entry.target.classList.contains('fade-right')) {
                        entry.target.classList.add('animate-fade-right');
                    } else if (entry.target.classList.contains('fade-up')) {
                        entry.target.classList.add('animate-fade-up');
                    } else {
                        entry.target.classList.add('animate-fade-in');
                    }
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
    // CONTADOR REGRESIVO
    // =========================================================================
    
    /**
     * Inicializa y configura el contador regresivo con una fecha objetivo real
     */
    function initCountdown() {
        // Verificar si existe el contador en la página
        const countdownContainer = document.querySelector('.countdown-timer');
        const countdownElements = {
            days: document.querySelector('.countdown-item:nth-child(1) .countdown-number'),
            hours: document.querySelector('.countdown-item:nth-child(2) .countdown-number'),
            minutes: document.querySelector('.countdown-item:nth-child(3) .countdown-number'),
            seconds: document.querySelector('.countdown-item:nth-child(4) .countdown-number')
        };
        
        // Si no existen todos los elementos, no iniciar el contador
        if (!countdownContainer || !countdownElements.days || !countdownElements.hours || 
            !countdownElements.minutes || !countdownElements.seconds) {
            return;
        }
        
        // Establecer la fecha objetivo (15 días a partir de ahora) si no hay una guardada
        let finalTargetDate;
        const savedTargetDate = localStorage.getItem('ofertaTargetDate');
        
        if (savedTargetDate) {
            finalTargetDate = new Date(parseInt(savedTargetDate));
            
            // Si la fecha guardada ya pasó, crear una nueva fecha objetivo
            if (finalTargetDate < new Date()) {
                finalTargetDate = new Date();
                finalTargetDate.setDate(finalTargetDate.getDate() + 15);
                localStorage.setItem('ofertaTargetDate', finalTargetDate.getTime().toString());
            }
        } else {
            finalTargetDate = new Date();
            finalTargetDate.setDate(finalTargetDate.getDate() + 15);
            localStorage.setItem('ofertaTargetDate', finalTargetDate.getTime().toString());
        }
        
        // Función para añadir urgencia visual basada en el tiempo restante
        function addVisualUrgency(days) {
            // Remover cualquier clase de urgencia existente
            countdownContainer.classList.remove('urgent', 'very-urgent', 'extremely-urgent');
            
            // Remover pulse de todos los items
            countdownContainer.querySelectorAll('.countdown-item').forEach(item => {
                item.classList.remove('pulse');
            });
            
            // Añadir clases según la urgencia
            if (days <= 3) {
                countdownContainer.classList.add('extremely-urgent');
                // Hacer que el contador de días pulse
                countdownElements.days.closest('.countdown-item').classList.add('pulse');
            } else if (days <= 7) {
                countdownContainer.classList.add('very-urgent');
            } else if (days <= 10) {
                countdownContainer.classList.add('urgent');
            }
            
            // Actualizar el mensaje de urgencia
            const urgencyMsg = countdownContainer.closest('.oferta-countdown')?.querySelector('.limited-offer');
            if (urgencyMsg) {
                if (days <= 3) {
                    urgencyMsg.innerHTML = `<span class="urgency-text">¡ÚLTIMOS ${days} DÍAS!</span> Solo para los primeros 10 clientes`;
                    urgencyMsg.classList.add('extreme-urgency');
                    urgencyMsg.classList.remove('high-urgency');
                } else if (days <= 7) {
                    urgencyMsg.innerHTML = `<span class="urgency-text">¡Oferta por tiempo limitado!</span> Solo para los primeros 10 clientes`;
                    urgencyMsg.classList.add('high-urgency');
                    urgencyMsg.classList.remove('extreme-urgency');
                } else {
                    urgencyMsg.innerHTML = `Solo para los primeros 10 clientes`;
                    urgencyMsg.classList.remove('high-urgency', 'extreme-urgency');
                }
            }
        }
        
        // Función para actualizar el contador
        function updateCountdown() {
            // Obtener la fecha y hora actuales
            const currentDate = new Date();
            
            // Calcular la diferencia en milisegundos
            const difference = finalTargetDate - currentDate;
            
            // Si la diferencia es negativa, la fecha objetivo ya pasó
            if (difference <= 0) {
                // Establecer una nueva fecha objetivo (15 días más)
                const newTargetDate = new Date();
                newTargetDate.setDate(newTargetDate.getDate() + 15);
                localStorage.setItem('ofertaTargetDate', newTargetDate.getTime().toString());
                
                // Actualizar la referencia a la fecha objetivo
                finalTargetDate = newTargetDate;
                
                // Opcional: mostrar algún mensaje o realizar alguna acción
                console.log('¡La oferta se ha renovado por 15 días más!');
                
                // Actualizar inmediatamente para evitar mostrar ceros
                updateVisualCountdown(newTargetDate - currentDate);
                return;
            }
            
            // Actualizar visualmente el contador
            updateVisualCountdown(difference);
        }
        
        // Función para actualizar la visualización del contador
        function updateVisualCountdown(timeRemaining) {
            // Calcular días, horas, minutos y segundos
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
            
            // Formatear valores para mostrar siempre dos dígitos
            const formatNumber = num => num < 10 ? `0${num}` : num;
            
            // Actualizar los valores en el DOM con animación cuando cambian
            updateElementWithAnimation(countdownElements.days, days);
            updateElementWithAnimation(countdownElements.hours, formatNumber(hours));
            updateElementWithAnimation(countdownElements.minutes, formatNumber(minutes));
            updateElementWithAnimation(countdownElements.seconds, formatNumber(seconds));
            
            // Añadir urgencia visual basada en días restantes
            addVisualUrgency(days);
        }
        
        // Función para actualizar un elemento con animación cuando cambia su valor
        function updateElementWithAnimation(element, newValue) {
            // Si el valor no ha cambiado, no hacer nada
            if (element.textContent === newValue.toString()) {
                return;
            }
            
            // Añadir clase para la animación
            element.classList.add('flip-animation');
            
            // Actualizar el valor después de una pequeña pausa
            setTimeout(() => {
                element.textContent = newValue;
                
                // Remover la clase después de completar la animación
                setTimeout(() => {
                    element.classList.remove('flip-animation');
                }, 300);
            }, 100);
        }
        
        // Ejecutar inmediatamente para mostrar los valores iniciales
        updateCountdown();
        
        // Actualizar el contador cada segundo
        return setInterval(updateCountdown, 1000);
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
    // MÉTRICAS Y ANIMACIONES VISUALES
    // =========================================================================
    
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
    // INICIALIZACIÓN PRINCIPAL
    // =========================================================================
    
    // Inicializar componentes principales de la página
    initScrollAnimations();
    initMetricAnimations();
    initCountdown();
    initServiceTabs();
    initTierTabs();
    initTierSelectorMini();
    initTooltips();
    updateSpecialOffer();
    setupMobileEnhancements();
    
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
        if (window.location.hash) {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    const headerHeight = document.getElementById('header')?.offsetHeight || 0;
                    const offset = headerHeight + 16;
                    const targetPosition = targetElement.offsetTop - offset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    });
    
    // Configurar event listener para resize
    window.addEventListener('resize', function() {
        setupMobileEnhancements();
    });
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporHome = {
        asegurarVisibilidadCritica,
        initServiceTabs,
        initTierTabs,
        initTooltips,
        updateSpecialOffer
    };
});
