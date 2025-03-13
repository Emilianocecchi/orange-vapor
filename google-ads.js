/**
 * Orange Vapor - Google Ads Landing Page
 * JavaScript optimizado para mejor rendimiento y experiencia de usuario
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

    // Crear un observador de intersección para mayor eficiencia
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Dejar de observar después de que el elemento sea visible
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar todos los elementos con fade-in que no están en el hero
    fadeElements.forEach(element => {
        if (!element.closest('.hero-google')) {
            observer.observe(element);
        }
    });

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
    const resultadosSection = document.querySelector('.resultados-section');
    if (resultadosSection) {
        const resultadosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        const resultCards = document.querySelectorAll('.resultado-card');
                        resultCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.style.animation = 'highlight-pulse 1s ease';
                                setTimeout(() => {
                                    card.style.animation = '';
                                }, 1000);
                            }, index * 300);
                        });
                    }, 500);
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
    setInterval(() => {
        if (availableSpots > 0 && Math.random() < 0.1) {
            availableSpots--;
            updateOfertaTag();
            
            // Mostrar notificación solo si hay scroll
            if (document.documentElement.scrollTop > 300) {
                showBookingNotification();
            }
        }
    }, 45000);
    
    // Notificación de reserva
    function showBookingNotification() {
        const notification = document.createElement('div');
        notification.className = 'booking-notification';
        notification.style.position = 'fixed';
        notification.style.bottom = '20px';
        notification.style.left = '20px';
        notification.style.backgroundColor = 'white';
        notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        notification.style.borderRadius = '8px';
        notification.style.padding = '15px';
        notification.style.display = 'flex';
        notification.style.alignItems = 'center';
        notification.style.maxWidth = '320px';
        notification.style.zIndex = '1000';
        notification.style.animation = 'fadeInUp 0.5s forwards';
        
        notification.innerHTML = `
            <div class="notification-icon" style="width:40px;height:40px;border-radius:50%;background-color:rgba(66,133,244,0.1);display:flex;align-items:center;justify-content:center;margin-right:15px;color:#4285F4;">
                <i class="fas fa-user-check"></i>
            </div>
            <div class="notification-content">
                <p style="margin:0;font-weight:600;">¡Alguien acaba de reservar su diagnóstico!</p>
                <span style="font-size:0.9rem;color:#666;">Quedan ${availableSpots} lugares con precio especial</span>
            </div>
            <button class="notification-close" style="position:absolute;top:5px;right:5px;background:none;border:none;cursor:pointer;color:#999;font-size:12px;"><i class="fas fa-times"></i></button>
        `;
        
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
    
    // Agregar estilos para animaciones de notificación
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeOutDown {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        .booking-notification {
            animation: fadeInUp 0.5s forwards;
        }
    `;
    document.head.appendChild(style);
    
    // =========================================================================
    // EFECTOS STORYBRAND - Resaltado de elementos clave según el marco SB7
    // =========================================================================
    
    // Destacar los pasos del plan - elemento crucial de StoryBrand
    const planSection = document.querySelector('.plan-section');
    if (planSection) {
        const planObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
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
                    }, 500);
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
    // BOTÓN VOLVER ARRIBA
    // =========================================================================
    
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    // Mostrar/ocultar botón según el scroll
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 700) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // Funcionalidad del botón
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
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
    
    // Gestionar navegación suave a secciones al hacer clic en enlaces internos
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Actualizar el hash en la URL sin provocar scroll
                history.pushState(null, null, targetId);
            }
        });
    });
    
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
    });
});
