/**
 * Orange Vapor - Google Ads Landing Page
 * JavaScript optimizado según principios de StoryBrand
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // ANIMACIONES Y VISIBILIDAD DE ELEMENTOS
    // =========================================================================
    
    // Animación inmediata de elementos clave para el Grunt Test
    const heroElements = document.querySelectorAll('.hero-google .fade-in');
    heroElements.forEach(element => {
        setTimeout(() => {
            element.classList.add('visible');
        }, 300);
    });

    // Función para detectar elementos visibles
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
            rect.bottom >= 0
        );
    }

    // Animar elementos al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    function animateElementsOnScroll() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Inicializar animaciones
    animateElementsOnScroll();
    window.addEventListener('scroll', animateElementsOnScroll);

    // =========================================================================
    // TABS DE SERVICIOS - Google Ads específicos
    // =========================================================================
    
    // Activar tabs de servicios
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clases activas
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Activar tab actual
            const tabId = this.getAttribute('data-tab');
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // =========================================================================
    // EFECTOS DE DESTACADO - Funciones para resaltar elementos clave
    // =========================================================================
    
    // Destacar CTA primary - importante para el Grunt Test
    const primaryCta = document.querySelector('.hero-buttons .btn');
    if (primaryCta) {
        // Destacar botón principal tras carga
        setTimeout(() => {
            primaryCta.style.transform = 'scale(1.05)';
            setTimeout(() => {
                primaryCta.style.transform = 'scale(1)';
            }, 300);
        }, 1500);
        
        // Repetir cada 20 segundos para mantener la atención
        setInterval(() => {
            primaryCta.style.transform = 'scale(1.05)';
            setTimeout(() => {
                primaryCta.style.transform = 'scale(1)';
            }, 300);
        }, 20000);
    }

    // Efecto de destaque para resultados 
    function highlightResults() {
        const resultCards = document.querySelectorAll('.resultado-card');
        
        resultCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.animation = 'highlight-pulse 1s ease';
                setTimeout(() => {
                    card.style.animation = '';
                }, 1000);
            }, index * 600);
        });
    }
    
    // Ejecutar efecto de destaque para resultados cuando sean visibles
    const resultadosSection = document.querySelector('.resultados-section');
    if (resultadosSection) {
        const resultadosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(highlightResults, 500);
                    resultadosObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        resultadosObserver.observe(resultadosSection);
    }

    // Destacar la garantía
    const garantiaBox = document.querySelector('.garantia-box');
    if (garantiaBox) {
        const garantiaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        garantiaBox.style.animation = 'highlight-pulse 1.2s ease';
                        setTimeout(() => {
                            garantiaBox.style.animation = '';
                        }, 1200);
                    }, 500);
                    garantiaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        garantiaObserver.observe(garantiaBox);
    }
    
    // =========================================================================
    // CONTADOR DE DISPONIBILIDAD - Genera urgencia para la oferta
    // =========================================================================
    
    // Contador de disponibilidad para oferta especial
    let availableSpots = 3; // Lugares que quedan disponibles con precio especial
    const ofertaTag = document.querySelector('.oferta-tag');
    const spotsLabel = document.querySelector('.spots-label span:last-child');
    
    // Actualizar la etiqueta de oferta y lugares disponibles
    function updateOfertaTag() {
        if (ofertaTag) {
            if (availableSpots > 0) {
                ofertaTag.innerHTML = `<i class="fas fa-tag"></i> Precio especial para primeros 5 clientes <span class="spots-count">(${availableSpots} disponibles)</span>`;
            } else {
                ofertaTag.innerHTML = `<i class="fas fa-exclamation-circle"></i> ¡Oferta agotada! Precio regular`;
                ofertaTag.style.backgroundColor = '#f8f9fa';
                ofertaTag.style.color = '#666';
            }
        }
        
        if (spotsLabel) {
            if (availableSpots > 0) {
                spotsLabel.textContent = `Solo ${availableSpots} lugares disponibles con precio especial`;
            } else {
                spotsLabel.textContent = `¡TODAS LAS PLAZAS OCUPADAS!`;
                
                // Actualizar CTA y añadir lista de espera
                const ctaButtons = document.querySelectorAll('.pulse-button');
                ctaButtons.forEach(button => {
                    button.textContent = 'UNIRSE A LISTA DE ESPERA';
                    button.classList.remove('pulse-button');
                });
            }
        }
    }
    
    // Inicializar contadores
    updateOfertaTag();
    
    // Simulación de urgencia (cada 45 segundos con 10% de probabilidad)
    function simulateRandomBookings() {
        if (availableSpots > 0 && Math.random() < 0.1) {
            availableSpots--;
            updateOfertaTag();
            
            // Mostrar notificación solo si hay scroll
            if (document.documentElement.scrollTop > 300) {
                showBookingNotification();
            }
        }
    }
    
    // Notificación de reserva
    function showBookingNotification() {
        const notification = document.createElement('div');
        notification.className = 'booking-notification';
        notification.innerHTML = `
            <div class="notification-icon">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="notification-content">
                <p>¡Alguien acaba de reservar su diagnóstico!</p>
                <span>Quedan ${availableSpots} lugares con precio especial</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Estilos para el icono
        const notificationIcon = notification.querySelector('.notification-icon');
        notificationIcon.style.width = '40px';
        notificationIcon.style.height = '40px';
        notificationIcon.style.borderRadius = '50%';
        notificationIcon.style.backgroundColor = 'rgba(66, 133, 244, 0.1)';
        notificationIcon.style.display = 'flex';
        notificationIcon.style.alignItems = 'center';
        notificationIcon.style.justifyContent = 'center';
        notificationIcon.style.marginRight = '15px';
        notificationIcon.style.color = '#4285F4';
        
        // Añadir la notificación al DOM
        document.body.appendChild(notification);
        
        // Cerrar la notificación al hacer clic en el botón de cerrar
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', function() {
            notification.style.animation = 'fadeOutDown 0.5s forwards';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 500);
        });
        
        // Cerrar automáticamente después de 8 segundos
        setTimeout(() => {
            if (document.body.contains(notification)) {
                notification.style.animation = 'fadeOutDown 0.5s forwards';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
                }, 500);
            }
        }, 8000);
    }
    
    // Iniciar simulación de reservas cada 45 segundos
    setInterval(simulateRandomBookings, 45000);
    
    // =========================================================================
    // SCROLL SUAVE Y NAVEGACIÓN
    // =========================================================================
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Destacar el destino brevemente
                targetElement.style.animation = 'highlight-pulse 1s ease';
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Quitar la animación después
                setTimeout(() => {
                    targetElement.style.animation = '';
                }, 1000);
            }
        });
    });
    
    // =========================================================================
    // EFECTOS VISUALES - Elementos decorativos
    // =========================================================================
    
    // Efectos de vapor
    function createVaporBubbles() {
        const vaporEffect = document.querySelector('.vapor-effect');
        if (!vaporEffect) return;
        
        function createRandomBubble() {
            const bubble = document.createElement('div');
            bubble.classList.add('vapor-bubble');
            
            const posX = Math.random() * 100;
            const size = 50 + Math.random() * 150;
            const delay = Math.random() * 3;
            const duration = 10 + Math.random() * 10;
            
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${posX}%`;
            bubble.style.bottom = '-20%';
            bubble.style.animationDelay = `${delay}s`;
            bubble.style.animationDuration = `${duration}s`;
            
            vaporEffect.appendChild(bubble);
            
            setTimeout(() => {
                bubble.remove();
            }, (delay + duration) * 1000);
        }
        
        // Crear burbujas cada 3 segundos (máximo 5)
        let count = 0;
        const maxBubbles = 5;
        
        const bubbleInterval = setInterval(() => {
            if (count < maxBubbles) {
                createRandomBubble();
                count++;
            } else {
                clearInterval(bubbleInterval);
            }
        }, 3000);
        
        // Crear algunas burbujas iniciales
        for (let i = 0; i < 3; i++) {
            setTimeout(createRandomBubble, i * 800);
        }
    }
    
    // Ejecutar efectos de vapor
    createVaporBubbles();
    
    // =========================================================================
    // EFECTOS STORYBRAND - Resaltado de elementos clave según el marco SB7
    // =========================================================================
    
    // Destacar los pasos del plan - elemento crucial de StoryBrand
    function highlightPlanSteps() {
        const procesoPasos = document.querySelectorAll('.proceso-paso');
        
        procesoPasos.forEach((paso, index) => {
            setTimeout(() => {
                paso.style.transform = 'translateY(-5px)';
                paso.style.boxShadow = 'var(--sombra-media)';
                
                setTimeout(() => {
                    paso.style.transform = '';
                    paso.style.boxShadow = '';
                }, 500);
            }, index * 700);
        });
    }

    // Observar cuándo la sección de plan está visible
    const planSection = document.querySelector('.plan-section');
    if (planSection) {
        const planObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(highlightPlanSteps, 500);
                    planObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        planObserver.observe(planSection);
    }

    // Destacar sección de riesgos - otro elemento crucial de StoryBrand
    const riesgosSection = document.querySelector('.riesgos-section');
    if (riesgosSection) {
        const riesgosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Destacar primero los ítems de riesgo
                    const riesgosItems = document.querySelectorAll('.riesgos-lista li');
                    riesgosItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.transform = 'translateX(10px)';
                            item.style.transition = 'transform 0.3s ease';
                            
                            setTimeout(() => {
                                item.style.transform = 'translateX(0)';
                            }, 300);
                        }, index * 300);
                    });
                    
                    riesgosObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        riesgosObserver.observe(riesgosSection);
    }
    
    // =========================================================================
    // OPTIMIZACIONES MÓVILES
    // =========================================================================

    // Adaptaciones para móviles
    function setupMobileEnhancements() {
        if (window.innerWidth <= 768) {
            // Ajustar tamaño del CTA principal en móvil
            const mainCTA = document.querySelector('.hero-buttons .btn');
            if (mainCTA) {
                mainCTA.style.width = '100%';
                mainCTA.style.padding = '16px 24px';
                mainCTA.style.fontSize = '1.1rem';
            }
            
            // Simplificar efectos para mejor rendimiento
            document.body.classList.add('mobile-optimized');
        } else {
            document.body.classList.remove('mobile-optimized');
        }
    }
    
    // Ejecutar optimizaciones para móvil
    setupMobileEnhancements();
    
    // Reconfigurar en cambio de tamaño
    window.addEventListener('resize', function() {
        setupMobileEnhancements();
    });
    
    // =========================================================================
    // FORMULARIO DE CONTACTO - Enfocado en la conversión
    // =========================================================================
    
    // Enfocar automáticamente el formulario cuando se navega a él
    function checkContactForm() {
        if (window.location.hash === '#contacto-form') {
            const contactoForm = document.getElementById('contacto-form');
            if (contactoForm) {
                setTimeout(() => {
                    // Añadir clase de highlight temporal
                    contactoForm.style.animation = 'highlight-pulse 1.5s ease';
                    setTimeout(() => {
                        contactoForm.style.animation = '';
                    }, 1500);
                    
                    // Intentar scrollear al formulario con offset
                    window.scrollTo({
                        top: contactoForm.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Asegurar que el usuario vea que debe completar el formulario
                    const formTitle = contactoForm.querySelector('h2');
                    if (formTitle) {
                        formTitle.style.color = '#4285F4';
                        setTimeout(() => {
                            formTitle.style.color = '';
                        }, 2000);
                    }
                }, 800);
            }
        }
    }
    
    // Verificar al cargar y cuando cambia el hash
    checkContactForm();
    window.addEventListener('hashchange', checkContactForm);
    
    // =========================================================================
    // PRUEBA DE GRUNT - Asegurar que las 3 preguntas se responden en 5 segundos
    // =========================================================================
    
    // Esta función destaca visualmente los elementos clave para pasar el test Grunt
    function highlightGruntElements() {
        // 1. Qué ofreces - Destacar el título
        const mainTitle = document.querySelector('.hero-google h1');
        if (mainTitle) {
            mainTitle.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            setTimeout(() => {
                mainTitle.style.textShadow = '';
            }, 1500);
        }
        
        // 2. Cómo mejora la vida - Destacar los puntos de valor
        const valuePoints = document.querySelectorAll('.grunt-point');
        valuePoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.transform = 'scale(1.05)';
                point.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                
                setTimeout(() => {
                    point.style.transform = '';
                    point.style.backgroundColor = '';
                }, 700);
            }, 500 + (index * 300));
        });
        
        // 3. Qué debo hacer - Destacar el CTA
        setTimeout(() => {
            const mainCTA = document.querySelector('.hero-buttons .btn');
            if (mainCTA) {
                mainCTA.style.transform = 'scale(1.1)';
                mainCTA.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.4)';
                
                setTimeout(() => {
                    mainCTA.style.transform = '';
                    mainCTA.style.boxShadow = '';
                }, 1000);
            }
        }, 2000);
    }
    
    // Ejecutar el destacado del Grunt Test después de la carga inicial
    setTimeout(highlightGruntElements, 1500);
    
    // =========================================================================
    // INICIALIZACIÓN Y FINALIZACIONES
    // =========================================================================
    
    // En carga completa de la página
    window.addEventListener('load', function() {
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
        
        // Asegurar que el header se actualice correctamente
        if (typeof updateHeaderState === 'function') {
            updateHeaderState();
        }
    });
});
