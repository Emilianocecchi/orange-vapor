/**
 * Orange Vapor - JavaScript Optimizado
 * Enfocado en la experiencia del usuario y claridad del mensaje principal (Grunt Test)
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // ANIMACIONES AL SCROLL - Optimizadas para enfatizar contenido clave
    // =========================================================================
    
    // Detectar elementos para animar al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Animación inmediata para elementos clave en la vista inicial (hero section)
    const heroFadeElements = document.querySelectorAll('#home .fade-in');
    heroFadeElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 300); // Pequeño retraso para asegurar que todo esté cargado
    });
    
    // Crear un observador de intersección para activar animaciones al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Una vez que el elemento ya se mostró, dejamos de observarlo
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar todos los elementos con la clase fade-in (excepto los del hero)
    fadeElements.forEach(element => {
        if (!element.closest('#home')) {
            observer.observe(element);
        }
    });
    
    // =========================================================================
    // EFECTOS DE VAPOR - Mantenidos pero optimizados
    // =========================================================================
    
    // Añadir efectos de vapor dinámicos
    function createVaporBubbles() {
        const vaporEffect = document.querySelector('.vapor-effect');
        if (!vaporEffect) return;
        
        // Reducimos el número de burbujas para mejorar rendimiento
        const maxBubbles = 5;
        let bubbleCount = 0;
        
        // Función para crear burbujas de vapor aleatoriamente
        function createRandomBubble() {
            // Limitar número máximo de burbujas activas
            if (bubbleCount >= maxBubbles) return;
            
            const bubble = document.createElement('div');
            bubble.classList.add('vapor-bubble');
            
            // Posicionamiento aleatorio
            const posX = Math.random() * 100; // posición X en porcentaje
            const size = 50 + Math.random() * 150; // tamaño entre 50 y 200px
            const delay = Math.random() * 3; // retraso de animación de 0 a 3 segundos
            const duration = 10 + Math.random() * 10; // duración entre 10 y 20 segundos
            
            // Aplicar estilos
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.bottom = '-20%';
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;
            
            // Añadir burbuja al DOM
            vaporEffect.appendChild(bubble);
            bubbleCount++;
            
            // Eliminar burbuja después de que termine la animación
            setTimeout(() => {
                bubble.remove();
                bubbleCount--;
            }, (delay + duration) * 1000);
        }
        
        // Crear burbujas periódicamente
        setInterval(createRandomBubble, 5000); // Reducimos frecuencia para mejor rendimiento
        
        // Crear algunas burbujas iniciales
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createRandomBubble(), i * 1000);
        }
    }
    
    // Ejecutar la creación de burbujas de vapor solo si estamos en desktop
    if (window.innerWidth > 768) {
        createVaporBubbles();
    }
    
    // =========================================================================
    // ANIMACIÓN DE MÉTRICAS - Adaptada para presentar los resultados claramente
    // =========================================================================
    
    // Animar los valores de métricas cuando son visibles
    const metricElements = document.querySelectorAll('.metric-after');
    
    // Mejorar la observación de métricas para asegurar que se animen
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const metric = entry.target;
                const targetValue = metric.getAttribute('data-value');
                
                if (targetValue) {
                    // Si el valor contiene números, animamos la parte numérica
                    if (/\d/.test(targetValue)) {
                        const numericPart = targetValue.match(/[\d.]+/)[0];
                        const prefix = targetValue.split(numericPart)[0] || '';
                        const suffix = targetValue.split(numericPart)[1] || '';
                        const decimalPlaces = numericPart.includes('.') ? numericPart.split('.')[1].length : 0;
                        const startValue = 0;
                        const endValue = parseFloat(numericPart);
                        
                        // Utilizamos requestAnimationFrame para una animación suave
                        let startTime = null;
                        const duration = 1500; // 1.5 segundos de duración (más rápido que antes)
                        
                        function animateValue(timestamp) {
                            if (!startTime) startTime = timestamp;
                            const progress = Math.min((timestamp - startTime) / duration, 1);
                            
                            // Usamos una función de ease-out para que se desacelere al final
                            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
                            const currentValue = startValue + easeOutProgress * (endValue - startValue);
                            
                            // Formatear el valor con los decimales correctos
                            const formattedValue = currentValue.toFixed(decimalPlaces);
                            metric.textContent = `${prefix}${formattedValue}${suffix}`;
                            
                            if (progress < 1) {
                                requestAnimationFrame(animateValue);
                            } else {
                                // Al finalizar, destacar el valor final con un pequeño efecto
                                metric.style.transform = 'scale(1.05)';
                                setTimeout(() => {
                                    metric.style.transform = 'scale(1)';
                                }, 150);
                            }
                        }
                        
                        requestAnimationFrame(animateValue);
                    } else {
                        // Si no contiene números, simplemente mostramos el valor
                        metric.textContent = targetValue;
                    }
                }
                
                // Dejar de observar después de la animación
                metricObserver.unobserve(metric);
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -10% 0px' // Activar un poco antes para mejor efecto
    });
    
    // Observar todos los elementos de métricas
    metricElements.forEach(metric => {
        metricObserver.observe(metric);
    });
    
    // =========================================================================
    // FORMULARIO DE CONTACTO Y HUBSPOT - Optimizado para conversión
    // =========================================================================
    
    // Comprobar si el formulario de HubSpot está listo
    function checkHubspotForm() {
        const hsFormFrame = document.querySelector('.hs-form-frame');
        if (hsFormFrame && typeof window.hbspt !== 'undefined') {
            // HubSpot está disponible, podríamos hacer personalizaciones adicionales aquí
            console.log('HubSpot form is ready');
            
            // Añadir enfoque automático al formulario si se llegó desde un CTA
            if (window.location.hash === '#contacto-form' || window.location.hash === '#contacto') {
                setTimeout(() => {
                    const formIframe = hsFormFrame.querySelector('iframe');
                    if (formIframe) {
                        // Intentar enfocar el iframe
                        formIframe.focus();
                    }
                }, 1000);
            }
        }
    }
    
    // Verificar periódicamente si el formulario de HubSpot está listo
    let hubspotCheckInterval = setInterval(() => {
        checkHubspotForm();
        
        // Después de 5 segundos, dejamos de verificar
        setTimeout(() => {
            clearInterval(hubspotCheckInterval);
        }, 5000);
    }, 1000);
    
    // =========================================================================
    // BOTONES CTA - Mejorados para facilitar la conversión
    // =========================================================================
    
    // Función para scroll suave al formulario de contacto desde botones CTA
    const ctaButtons = document.querySelectorAll(
        '.hero-buttons .btn, ' +
        '.cta-box .btn, ' +
        '.btn-outline[href="#contacto"], ' +
        '.nav-cta .btn, ' +
        '.btn-flotante, ' +
        '.proceso-card .btn'
    );
    
    // Agregar event listener con destacado al hacer clic
    ctaButtons.forEach(button => {
        // Añadir efecto de pulsación al hacer click
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
        
        // Gestionar navegación
        button.addEventListener('click', function(event) {
            // Solo prevenir si el enlace es interno
            const href = this.getAttribute('href');
            if (href && (href.startsWith('#') || href.includes('contacto'))) {
                event.preventDefault();
                
                // Obtener el formulario de contacto
                const contactForm = document.getElementById('contacto-form');
                
                if (contactForm) {
                    // Añadir indicador visual para guiar al usuario
                    const formPosition = contactForm.getBoundingClientRect().top + window.pageYOffset;
                    
                    // Crear indicador pulsante temporal
                    const indicator = document.createElement('div');
                    indicator.style.position = 'absolute';
                    indicator.style.top = '-20px';
                    indicator.style.left = '50%';
                    indicator.style.transform = 'translateX(-50%)';
                    indicator.style.width = '40px';
                    indicator.style.height = '40px';
                    indicator.style.borderRadius = '50%';
                    indicator.style.backgroundColor = 'rgba(255, 126, 0, 0.3)';
                    indicator.style.zIndex = '10';
                    indicator.style.animation = 'pulse 1.5s infinite';
                    
                    // Añadir keyframes para la animación
                    if (!document.querySelector('#pulse-animation')) {
                        const styleSheet = document.createElement('style');
                        styleSheet.id = 'pulse-animation';
                        styleSheet.textContent = `
                            @keyframes pulse {
                                0% { transform: translateX(-50%) scale(0.8); opacity: 0.8; }
                                50% { transform: translateX(-50%) scale(1.2); opacity: 0.6; }
                                100% { transform: translateX(-50%) scale(0.8); opacity: 0.8; }
                            }
                        `;
                        document.head.appendChild(styleSheet);
                    }
                    
                    // Añadir al formulario
                    contactForm.style.position = 'relative';
                    contactForm.appendChild(indicator);
                    
                    // Eliminar después de 3 segundos
                    setTimeout(() => {
                        indicator.remove();
                    }, 3000);
                    
                    // Hacer scroll suave hasta el formulario
                    window.scrollTo({
                        top: formPosition - 100,
                        behavior: 'smooth'
                    });
                    
                    // Actualizar la URL para reflejar el objetivo
                    history.pushState(null, null, '#contacto-form');
                } else if (href.startsWith('#')) {
                    // Si no hay formulario pero es un enlace de anclaje, navegar al ancla
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                        
                        // Actualizar la URL
                        history.pushState(null, null, href);
                    }
                }
            }
        });
    });
    
    // =========================================================================
    // OPTIMIZACIÓN MOBILE - Mejor experiencia en dispositivos móviles
    // =========================================================================
    
    // Ajustes específicos para dispositivos móviles
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
            
            // Ajustar scroll del hero para mejor vista del contenido
            const heroButtons = document.querySelector('.hero-buttons');
            if (heroButtons) {
                heroButtons.addEventListener('click', function() {
                    const serviciosSection = document.getElementById('servicios');
                    if (serviciosSection) {
                        setTimeout(() => {
                            window.scrollTo({
                                top: serviciosSection.offsetTop - 70,
                                behavior: 'smooth'
                            });
                        }, 200);
                    }
                });
            }
        }
    }
    
    // Ejecutar optimizaciones para móvil
    setupMobileEnhancements();
    
    // Reconfigurar en cambio de tamaño
    window.addEventListener('resize', function() {
        setupMobileEnhancements();
    });
    
    // =========================================================================
    // CARGA DIFERIDA DE IMÁGENES - Mejor rendimiento
    // =========================================================================
    
    // Lazy load para imágenes que no están en la vista inicial
    const lazyImages = document.querySelectorAll('img:not(.profile-image)');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Navegador soporta lazy loading nativo
        lazyImages.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback para navegadores que no soportan lazy loading
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.src = src;
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            if (!img.src && img.getAttribute('data-src')) {
                imageObserver.observe(img);
            }
        });
    }
    
    // =========================================================================
    // INICIALIZACIÓN Y FINALIZACIÓN
    // =========================================================================
    
    // Detectar cuando el sitio está completamente cargado
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
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                setTimeout(() => {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    });
    
    // Interactividad para los service-pills en el hero
    const servicePills = document.querySelectorAll('.service-pill');
    
    servicePills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Determinar qué sección debe mostrarse basado en la clase del pill
            let targetSection = '#servicios';
            
            if (this.classList.contains('express-pill')) {
                targetSection = '#optimizacion-express';
            }
            
            // Scroll a la sección correspondiente
            const section = document.querySelector(targetSection);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Destacar brevemente la tarjeta correspondiente en la sección de servicios
                if (targetSection === '#servicios') {
                    let serviceCard = null;
                    
                    if (this.classList.contains('ads-pill')) {
                        serviceCard = document.querySelector('.soluciones-card.ads');
                    } else if (this.classList.contains('email-pill')) {
                        serviceCard = document.querySelector('.soluciones-card.email');
                    } else if (this.classList.contains('chatbot-pill')) {
                        serviceCard = document.querySelector('.soluciones-card.chatbot');
                    }
                    
                    if (serviceCard) {
                        serviceCard.style.transform = 'scale(1.05)';
                        serviceCard.style.boxShadow = 'var(--sombra-fuerte)';
                        setTimeout(() => {
                            serviceCard.style.transform = '';
                            serviceCard.style.boxShadow = '';
                        }, 2000);
                    }
                }
            }
        });
    });
// JavaScript para la sección de Servicios Mensuales
document.addEventListener('DOMContentLoaded', function() {
    // Observador para animar los elementos al scrollear
    const serviciosMensuales = document.querySelector('.servicios-mensuales');
    if (serviciosMensuales) {
        const servicioCards = document.querySelectorAll('.servicio-mensual-card');
        const ofertaEspecial = document.querySelector('.oferta-especial');
        const serviciosGarantia = document.querySelector('.servicios-garantia');
        
        // Observador de intersección para animaciones
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Si es el contenedor principal, comenzar animación de las tarjetas escalonada
                    if (entry.target === serviciosMensuales) {
                        servicioCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.add('visible');
                                card.style.transform = 'translateY(0)';
                                card.style.opacity = '1';
                            }, 100 * index);
                        });
                        
                        // Animar oferta especial después de las tarjetas
                        if (ofertaEspecial) {
                            setTimeout(() => {
                                ofertaEspecial.classList.add('visible');
                                ofertaEspecial.style.transform = 'translateY(0)';
                                ofertaEspecial.style.opacity = '1';
                            }, 100 * servicioCards.length + 100);
                        }
                        
                        // Animar garantía al final
                        if (serviciosGarantia) {
                            setTimeout(() => {
                                serviciosGarantia.classList.add('visible');
                                serviciosGarantia.style.transform = 'translateY(0)';
                                serviciosGarantia.style.opacity = '1';
                            }, 100 * servicioCards.length + 300);
                        }
                    }
                    
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        // Configurar elementos para animación
        servicioCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        if (ofertaEspecial) {
            ofertaEspecial.style.opacity = '0';
            ofertaEspecial.style.transform = 'translateY(20px)';
            ofertaEspecial.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        if (serviciosGarantia) {
            serviciosGarantia.style.opacity = '0';
            serviciosGarantia.style.transform = 'translateY(20px)';
            serviciosGarantia.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        }
        
        // Comenzar a observar
        observer.observe(serviciosMensuales);
    }
    
    // Efecto de hover en las tarjetas
    const cards = document.querySelectorAll('.servicio-mensual-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Obtener el botón dentro de esta tarjeta
            const button = this.querySelector('.btn-servicio');
            if (button) {
                button.style.transform = 'translateY(-5px)';
                button.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const button = this.querySelector('.btn-servicio');
            if (button) {
                button.style.transform = '';
                button.style.boxShadow = '';
            }
        });
    });
    
    // Efecto de destello para la oferta especial
    const ofertaEspecial = document.querySelector('.oferta-especial');
    if (ofertaEspecial) {
        // Crear un efecto de destello periódico
        setInterval(() => {
            ofertaEspecial.classList.add('oferta-destello');
            setTimeout(() => {
                ofertaEspecial.classList.remove('oferta-destello');
            }, 700);
        }, 5000);
        
        // Agregar estilos para el destello si no existen
        if (!document.querySelector('#oferta-destello-estilo')) {
            const styleSheet = document.createElement('style');
            styleSheet.id = 'oferta-destello-estilo';
            styleSheet.textContent = `
                @keyframes ofertaDestello {
                    0% { box-shadow: 0 0 5px rgba(255, 126, 0, 0.1); }
                    50% { box-shadow: 0 0 15px rgba(255, 126, 0, 0.3); }
                    100% { box-shadow: 0 0 5px rgba(255, 126, 0, 0.1); }
                }
                
                .oferta-destello {
                    animation: ofertaDestello 0.7s ease;
                }
            `;
            document.head.appendChild(styleSheet);
        }
    }
    
    // Eventos de navegación para botones de contacto
    const contactButtons = document.querySelectorAll('.servicios-mensuales .btn');
    contactButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#contacto') {
                e.preventDefault();
                const contactoSection = document.getElementById('contacto');
                if (contactoSection) {
                    window.scrollTo({
                        top: contactoSection.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Efecto visual en el formulario de contacto
                    const contactoForm = document.querySelector('.contacto-content');
                    if (contactoForm) {
                        contactoForm.classList.add('destacado-temporal');
                        setTimeout(() => {
                            contactoForm.classList.remove('destacado-temporal');
                        }, 2000);
                    }
                }
            }
        });
    });
    
    // Estilo para destacado temporal
    if (!document.querySelector('#destacado-temporal-estilo')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'destacado-temporal-estilo';
        styleSheet.textContent = `
            .destacado-temporal {
                animation: pulseDestacado 2s ease;
            }
            
            @keyframes pulseDestacado {
                0% { box-shadow: 0 0 0 0 rgba(255, 126, 0, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(255, 126, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 126, 0, 0); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});


    // Código para el Express Box
document.addEventListener('DOMContentLoaded', function() {
    // Animación para los elementos del box de entregables
    const expressBox = document.querySelector('.express-box-container');
    const expressBoxItems = document.querySelectorAll('.express-box-list li');
    
    // Verificar si el box existe en la página
    if (expressBox) {
        // Crear efecto de hover para los ítems de la lista
        expressBoxItems.forEach((item, index) => {
            // Agregar un pequeño retraso escalonado a la aparición inicial
            if (window.innerWidth > 768) {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.transitionDelay = (index * 0.1) + 's';
            }
            
            // Interactividad al hacer hover
            item.addEventListener('mouseenter', function() {
                this.style.backgroundColor = 'rgba(255, 126, 0, 0.05)';
                this.style.borderRadius = '8px';
                this.style.padding = '8px';
                this.style.marginLeft = '-8px';
                this.style.marginRight = '-8px';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
                this.style.padding = '';
                this.style.marginLeft = '';
                this.style.marginRight = '';
            });
        });
        
        // Observador de intersección para activar las animaciones al hacer scroll
        const boxObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animar el box cuando sea visible
                    expressBox.classList.add('visible');
                    
                    // Animar cada ítem de la lista con un retraso escalonado
                    expressBoxItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, 300 + (index * 100)); // 300ms base + 100ms por cada ítem
                    });
                    
                    // Dejar de observar una vez animado
                    boxObserver.unobserve(expressBox);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Comenzar a observar el box
        boxObserver.observe(expressBox);
    }
    
    // Efecto de pulsación para el botón CTA del box
    const expressCTA = document.querySelector('.express-box-footer .btn');
    if (expressCTA) {
        expressCTA.addEventListener('click', function(event) {
            if (this.getAttribute('href') === '#contacto') {
                event.preventDefault();
                const contactForm = document.getElementById('contacto');
                if (contactForm) {
                    window.scrollTo({
                        top: contactForm.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Efecto de destacado en el formulario de contacto
                    setTimeout(() => {
                        const formContainer = document.querySelector('.contacto-content');
                        if (formContainer) {
                            formContainer.style.animation = 'pulse-highlight 1.5s';
                            
                            // Limpiar la animación después
                            setTimeout(() => {
                                formContainer.style.animation = '';
                            }, 1500);
                        }
                    }, 800);
                }
            }
        });
    }
    
    // Agregar estilo de pulsación para la animación del formulario si no existe
    if (!document.querySelector('#pulse-highlight-animation')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'pulse-highlight-animation';
        styleSheet.textContent = `
            @keyframes pulse-highlight {
                0% { box-shadow: 0 0 0 0 rgba(255, 126, 0, 0.4); }
                70% { box-shadow: 0 0 0 15px rgba(255, 126, 0, 0); }
                100% { box-shadow: 0 0 0 0 rgba(255, 126, 0, 0); }
            }
        `;
        document.head.appendChild(styleSheet);
    }
});


    
    // Mostrar inmediatamente el contenido crítico para el Grunt Test
    // Asegurarnos que los elementos clave se muestran sin esperar animaciones
    const criticalElements = [
        document.querySelector('#home h1'),
        document.querySelector('#home .hero-subtitle'),
        document.querySelector('#home .grunt-test-services'),
        document.querySelector('#home .grunt-test-points'),
        document.querySelector('#home .hero-buttons'),
        document.querySelector('#servicios .seccion-titulo')
    ];
    
    criticalElements.forEach(el => {
        if (el && el.closest('.fade-in')) {
            el.closest('.fade-in').classList.add('visible');
        }
    });
});
