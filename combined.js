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
    const navWrapper = document.querySelector('.nav-wrapper');
    
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
    // Microinteracciones para Orange Vapor Landing Page
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las microinteracciones
    initScrollAnimations();
    initServiceTabsAnimation();
    initPricingHoverEffects();
    initCardHoverEffects();
    initButtonEffects();
    initCountersAnimation();
    initParallaxEffect();
    initIconAnimations();
    initAuditBadgePulse();
    initFeatureCardTilt();
});

// 1. ANIMACIONES AL SCROLL
function initScrollAnimations() {
    // Seleccionar todos los elementos que deben animarse al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Opciones para el Intersection Observer
    const options = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // El elemento es visible cuando el 15% está en el viewport
    };
    
    // Callback para el observer
    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            // Si el elemento es visible
            if (entry.isIntersecting) {
                // Diferentes animaciones basadas en clases adicionales
                if (entry.target.classList.contains('fade-left')) {
                    entry.target.classList.add('animate-fade-left');
                } else if (entry.target.classList.contains('fade-right')) {
                    entry.target.classList.add('animate-fade-right');
                } else if (entry.target.classList.contains('fade-up')) {
                    entry.target.classList.add('animate-fade-up');
                } else {
                    entry.target.classList.add('animate-fade-in');
                }
                
                // Añadir la clase visible para la opacidad
                entry.target.classList.add('visible');
                
                // Dejar de observar este elemento
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(fadeInOnScroll, options);
    
    // Observar cada elemento fadeIn
    fadeElements.forEach(el => {
        observer.observe(el);
    });
    
    // Añadir delay personalizado a elementos en secuencia
    document.querySelectorAll('.features-sequence > *').forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Añadir clase para animaciones continuas (como fade-slide)
    document.querySelectorAll('.continuous-animation').forEach(el => {
        const continuousObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-continuous');
                } else {
                    entry.target.classList.remove('animate-continuous');
                }
            });
        }, { threshold: 0.2 });
        
        continuousObserver.observe(el);
    });
}

// 2. ANIMACIÓN DE TABS DE SERVICIOS
function initServiceTabsAnimation() {
    const serviceTabs = document.querySelectorAll('.servicio-tab');
    const serviceContents = document.querySelectorAll('.servicio-content-wrapper');
    
    serviceTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remover la clase activa de todos los tabs
            serviceTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase activa al tab actual
            this.classList.add('active');
            
            // Obtener el servicio al que hace referencia este tab
            const servicio = this.getAttribute('data-servicio');
            
            // Animar la salida del contenido activo y entrada del nuevo
            serviceContents.forEach(content => {
                if (content.classList.contains('active')) {
                    // Animar la salida
                    content.classList.add('animate-fade-out');
                    setTimeout(() => {
                        content.classList.remove('active', 'animate-fade-out');
                    }, 300);
                }
                
                // Si este es el contenido que debe mostrarse
                if (content.getAttribute('data-servicio') === servicio) {
                    // Mostrar después de un breve delay para la animación
                    setTimeout(() => {
                        content.classList.add('active', 'animate-fade-in');
                        
                        // Remover la clase de animación después
                        setTimeout(() => {
                            content.classList.remove('animate-fade-in');
                        }, 600);
                    }, 300);
                }
            });
            
            // Añadir efecto de ripple al hacer clic
            const ripple = document.createElement('span');
            ripple.classList.add('tab-ripple');
            this.appendChild(ripple);
            
            // Calcular el tamaño del ripple basado en el tamaño del elemento
            const size = Math.max(this.offsetWidth, this.offsetHeight);
            ripple.style.width = ripple.style.height = `${size}px`;
            
            // Posicionar el ripple
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${event.clientX - rect.left - (size / 2)}px`;
            ripple.style.top = `${event.clientY - rect.top - (size / 2)}px`;
            
            // Remover el ripple después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Selección de tiers similar a los tabs
    const tierTabs = document.querySelectorAll('.tier-tab');
    
    tierTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Obtener el tier seleccionado
            const tier = this.getAttribute('data-tier');
            
            // Remover clase activa de todos los tabs de tier
            tierTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase activa al tab actual
            this.classList.add('active');
            
            // Activar info de tier correspondiente
            document.querySelectorAll('.tier-info').forEach(info => {
                info.classList.remove('active');
            });
            document.querySelector(`.tier-info.${tier}`).classList.add('active');
            
            // Activar precios correspondientes
            document.querySelectorAll('.tier-price').forEach(price => {
                price.classList.remove('active');
            });
            document.querySelectorAll(`.tier-price.${tier}`).forEach(price => {
                price.classList.add('active');
            });
            
            // Activar detalles correspondientes
            document.querySelectorAll('.tier-detalle').forEach(detail => {
                detail.classList.remove('active');
            });
            document.querySelectorAll(`.tier-detalle.${tier}`).forEach(detail => {
                detail.classList.add('active');
            });
            
            // Añadir efecto de wave para el cambio
            document.querySelectorAll('.categoria-detalles').forEach(cat => {
                cat.classList.add('tier-change-wave');
                setTimeout(() => {
                    cat.classList.remove('tier-change-wave');
                }, 500);
            });
        });
    });
}

// 3. EFECTOS HOVER PARA CARDS DE PRECIOS
function initPricingHoverEffects() {
    const pricingCards = document.querySelectorAll('.precio-card');
    
    pricingCards.forEach(card => {
        card.addEventListener('mouseover', function() {
            if (this.classList.contains('active')) {
                this.classList.add('price-hover');
                
                // Animar el precio
                const precioValor = this.querySelector('.precio-valor');
                precioValor.classList.add('price-bounce');
                
                setTimeout(() => {
                    precioValor.classList.remove('price-bounce');
                }, 1000);
            }
        });
        
        card.addEventListener('mouseout', function() {
            this.classList.remove('price-hover');
        });
    });
}

// 4. EFECTOS HOVER PARA CARDS DE SERVICIOS Y CARACTERÍSTICAS
function initCardHoverEffects() {
    // Efecto para cards de características
    const featureItems = document.querySelectorAll('.auditoria-feature-item');
    
    featureItems.forEach(item => {
        item.addEventListener('mouseover', function() {
            // Añadir clase para efecto hover avanzado
            this.classList.add('feature-hover');
            
            // Animar el icono
            const icon = this.querySelector('.feature-icon');
            icon.classList.add('icon-wiggle');
            
            setTimeout(() => {
                icon.classList.remove('icon-wiggle');
            }, 500);
        });
        
        item.addEventListener('mouseout', function() {
            this.classList.remove('feature-hover');
        });
    });
    
    // Efecto de profundidad 3D al hover sobre la card de auditoría
    const auditCard = document.querySelector('.auditoria-card');
    if (auditCard) {
        auditCard.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calcular distancia desde el centro (de -15 a 15 grados)
            const rotateY = ((x - centerX) / centerX) * 3;
            const rotateX = ((y - centerY) / centerY) * -3;
            
            // Aplicar la rotación
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-12px)`;
            
            // Efecto de iluminación basado en la posición del cursor
            const shadowX = (x - centerX) / 10;
            const shadowY = (y - centerY) / 10;
            this.style.boxShadow = `0 20px 50px rgba(0, 0, 0, 0.1), ${shadowX}px ${shadowY}px 30px rgba(47, 133, 90, 0.15)`;
        });
        
        auditCard.addEventListener('mouseleave', function() {
            // Restaurar el estado original con una transición suave
            this.style.transform = 'translateY(-12px)';
            this.style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.12), 0 15px 35px rgba(0, 0, 0, 0.08)';
        });
    }
    
    // Efecto para servicios específicos
    const servicioContentWrappers = document.querySelectorAll('.servicio-content-wrapper');
    
    servicioContentWrappers.forEach(wrapper => {
        const servicio = wrapper.getAttribute('data-servicio');
        const icon = wrapper.querySelector('.servicio-icon');
        
        if (icon) {
            icon.addEventListener('mouseover', function() {
                // Añadir clase específica al servicio
                this.classList.add(`${servicio}-pulse`);
            });
            
            icon.addEventListener('mouseout', function() {
                this.classList.remove(`${servicio}-pulse`);
            });
        }
    });
}

// 5. EFECTOS PARA BOTONES
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn-auditoria-premium, .btn-servicio-premium, .btn-oferta-especial');
    
    buttons.forEach(button => {
        // Efecto de ripple al hacer clic
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('btn-ripple');
            this.appendChild(ripple);
            
            // Calcular tamaño basado en el ancho del botón
            const size = Math.max(this.offsetWidth, this.offsetHeight) * 2;
            ripple.style.width = ripple.style.height = `${size}px`;
            
            // Posición del clic
            const rect = this.getBoundingClientRect();
            ripple.style.left = `${e.clientX - rect.left - (size / 2)}px`;
            ripple.style.top = `${e.clientY - rect.top - (size / 2)}px`;
            
            // Remover después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Efecto de hover avanzado
        button.addEventListener('mouseover', function() {
            // Obtener el icono de flecha
            const arrow = this.querySelector('.btn-arrow-container, .btn-lightning');
            if (arrow) {
                arrow.classList.add('arrow-bounce');
                
                setTimeout(() => {
                    arrow.classList.remove('arrow-bounce');
                }, 600);
            }
        });
    });
    
    // Efecto especial para botones CTA principales
    const ctaButtons = document.querySelectorAll('.hero-cta .btn, .btn-auditoria-premium');
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('mouseover', function() {
            this.classList.add('cta-glow');
        });
        
        btn.addEventListener('mouseout', function() {
            this.classList.remove('cta-glow');
        });
    });
}

// 6. ANIMACIÓN DE CONTADORES
function initCountersAnimation() {
    // Animación para métricas en resultados
    const metricAfters = document.querySelectorAll('.metric-after');
    
    // Opciones para el Intersection Observer
    const options = {
        threshold: 0.5
    };
    
    // Callback para el observer
    const animateCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const targetValue = entry.target.getAttribute('data-value');
                let isPercentage = false;
                
                // Verificar si es porcentaje
                if (targetValue.includes('%')) {
                    isPercentage = true;
                }
                
                // Remover símbolos para obtener el valor numérico
                let numericValue = parseFloat(targetValue.replace(/[^0-9.-]+/g, ''));
                
                // Valor inicial
                let currentValue = 0;
                let prefix = '';
                let suffix = '';
                
                // Determinar prefijo/sufijo
                if (targetValue.includes('$')) {
                    prefix = '$';
                }
                
                if (isPercentage) {
                    suffix = '%';
                }
                
                // Cálculo para la animación
                const duration = 1500; // 1.5 segundos
                const frameDuration = 1000 / 60; // 60fps
                const totalFrames = Math.round(duration / frameDuration);
                const increment = numericValue / totalFrames;
                
                // Función para animar el contador
                const animate = (currentFrame) => {
                    currentValue += increment;
                    
                    // Asegurarse de no exceder el valor objetivo
                    if (currentFrame === totalFrames) {
                        currentValue = numericValue;
                    }
                    
                    // Formatear el valor (2 decimales si es necesario)
                    let formattedValue;
                    if (Number.isInteger(numericValue)) {
                        formattedValue = Math.floor(currentValue).toLocaleString();
                    } else {
                        formattedValue = currentValue.toFixed(1);
                    }
                    
                    // Actualizar el texto
                    entry.target.textContent = `${prefix}${formattedValue}${suffix}`;
                    
                    // Continuar la animación si no hemos llegado al final
                    if (currentFrame < totalFrames) {
                        requestAnimationFrame(() => animate(currentFrame + 1));
                    }
                };
                
                // Iniciar la animación
                animate(1);
                
                // Marcar como animado
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    };
    
    // Crear el observer
    const observer = new IntersectionObserver(animateCounter, options);
    
    // Observar cada elemento counter
    metricAfters.forEach(metric => {
        observer.observe(metric);
    });
    
    // Animación para cuenta regresiva
    const countdownTimer = document.querySelector('.countdown-timer');
    if (countdownTimer) {
        // Añadir pulsación a los números del countdown
        const numbers = countdownTimer.querySelectorAll('.countdown-number');
        let index = 0;
        
        // Animar un número cada 2 segundos, rotando entre ellos
        setInterval(() => {
            // Remover la clase del número anterior
            numbers.forEach(num => num.classList.remove('countdown-pulse'));
            
            // Añadir clase al número actual
            numbers[index].classList.add('countdown-pulse');
            
            // Incrementar índice y volver a 0 si es necesario
            index = (index + 1) % numbers.length;
        }, 2000);
    }
}

// 7. EFECTO PARALLAX
function initParallaxEffect() {
    // Seleccionar elementos para el efecto parallax
    const parallaxElements = document.querySelectorAll('.servicios-bg-gradient, .auditoria-card');
    
    // Escuchar movimiento del mouse
    document.addEventListener('mousemove', function(e) {
        // Calcular posición relativa del mouse (de 0 a 1 para cada dimensión)
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;
        
        // Aplicar movimiento a los elementos
        parallaxElements.forEach(el => {
            // El elemento debe tener la clase para el efecto parallax
            if (el.classList.contains('servicios-bg-gradient')) {
                // Movimiento amplio para el fondo
                const moveX = (mouseX - 0.5) * 40; // -20px a 20px
                const moveY = (mouseY - 0.5) * 40; // -20px a 20px
                
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            } else if (el.classList.contains('auditoria-card') && !el.classList.contains('hover-3d-active')) {
                // Movimiento más sutil para la tarjeta
                const moveX = (mouseX - 0.5) * 15; // -7.5px a 7.5px
                const moveY = (mouseY - 0.5) * 10; // -5px a 5px
                
                // Preservar la transformación existente y añadir el parallax
                const existingTransform = el.style.transform.replace(/translate\([^)]*\)/g, '');
                el.style.transform = `${existingTransform} translate(${moveX}px, ${moveY}px)`;
            }
        });
    });
}

// 8. ANIMACIONES PARA ICONOS
function initIconAnimations() {
    // Iconos que deben tener animaciones continuas
    const pulseIcons = document.querySelectorAll('.pulse-slow, .auditoria-timer i, .btn-lightning i');
    pulseIcons.forEach(icon => {
        icon.classList.add('continuous-pulse');
    });
    
    // Iconos de características que se animan al hacer hover
    const featureIcons = document.querySelectorAll('.feature-icon i');
    featureIcons.forEach(icon => {
        const parent = icon.closest('.auditoria-feature-item');
        
        parent.addEventListener('mouseover', function() {
            icon.classList.add('icon-spin');
        });
        
        parent.addEventListener('mouseout', function() {
            icon.classList.remove('icon-spin');
        });
    });
    
    // Iconos de servicio que se transforman
    const serviceIcons = document.querySelectorAll('.servicio-tab i');
    serviceIcons.forEach(icon => {
        const tab = icon.closest('.servicio-tab');
        
        tab.addEventListener('mouseover', function() {
            icon.classList.add('icon-pop');
        });
        
        tab.addEventListener('mouseout', function() {
            setTimeout(() => {
                icon.classList.remove('icon-pop');
            }, 300);
        });
    });
    
    // Animación para el ribbon de "GRATIS"
    const ribbon = document.querySelector('.auditoria-ribbon');
    if (ribbon) {
        setInterval(() => {
            ribbon.classList.add('ribbon-wave');
            
            setTimeout(() => {
                ribbon.classList.remove('ribbon-wave');
            }, 1000);
        }, 5000);
    }
}

// 9. PULSO PARA EL BADGE DE AUDITORÍA
function initAuditBadgePulse() {
    const titleBadge = document.querySelector('.title-badge');
    
    if (titleBadge) {
        // Aplicar efecto de pulso con intervalo
        setInterval(() => {
            titleBadge.classList.add('badge-pulse');
            
            setTimeout(() => {
                titleBadge.classList.remove('badge-pulse');
            }, 1000);
        }, 8000);
    }
    
    // Animar el badge de precio en oferta especial
    const ofertaBadge = document.querySelector('.oferta-badge');
    
    if (ofertaBadge) {
        setInterval(() => {
            ofertaBadge.classList.add('oferta-badge-highlight');
            
            setTimeout(() => {
                ofertaBadge.classList.remove('oferta-badge-highlight');
            }, 1200);
        }, 7000);
    }
}

// 10. EFECTO TILT PARA TARJETAS DE CARACTERÍSTICAS
function initFeatureCardTilt() {
    const cards = document.querySelectorAll('.auditoria-feature-item');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            // Solo aplicar si no está en dispositivo móvil
            if (window.innerWidth > 768) {
                const rect = this.getBoundingClientRect();
                
                // Calcular posición relativa del cursor dentro del elemento
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                // Calcular rotación (valores bajos para un efecto sutil)
                const tiltX = (y / rect.height - 0.5) * 5; // -2.5 a 2.5 grados
                const tiltY = (x / rect.width - 0.5) * -5; // -2.5 a 2.5 grados
                
                // Aplicar transformación
                this.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }
        });
        
        // Restaurar al salir
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}
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
     * Actualiza el estado del header según la posición de scroll
     * @deprecated Reemplazado por la lógica en initNavbar
     */
    function updateHeaderState() {
        // Esta función se mantiene para compatibilidad pero su lógica ahora está en initNavbar
        return;
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
     * @deprecated La lógica ahora está en initNavbar
     */
    function initCTAAnimation(ctaButton) {
        // Función mantenida para compatibilidad, pero su lógica está en initNavbar
        return;
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
