/**
 * Orange Vapor - Meta Ads Landing Page
 * JavaScript optimizado para mejorar la experiencia del usuario y conversión
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // INICIALIZACIÓN Y ELEMENTOS CRÍTICOS
    // =========================================================================
    
    // Elementos críticos - Mostrar inmediatamente
    const criticalElements = [
        document.querySelector('.hero-ads h1'),
        document.querySelector('.hero-ads h2'),
        document.querySelector('.grunt-test-metrics'),
        document.querySelector('.hero-guarantee'),
        document.querySelector('.hero-buttons')
    ];
    
    criticalElements.forEach(element => {
        if (element && element.closest('.fade-in')) {
            element.closest('.fade-in').classList.add('visible');
        }
    });
    
    // =========================================================================
    // MOCKUP DE META ADS - INTERACTIVIDAD
    // =========================================================================
    
    // Añadir interactividad al mockup de Meta Ad
    const adButton = document.querySelector('.ad-button');
    if (adButton) {
        adButton.addEventListener('click', function() {
            this.innerHTML = '¡Gracias por tu interés!';
            this.style.backgroundColor = '#4CAF50';
            
            setTimeout(() => {
                this.innerHTML = 'Reservá ahora';
                this.style.backgroundColor = '#1877f2';
            }, 2000);
        });
    }

    // Hacer interactivos los elementos de engagement
    const engagementItems = document.querySelectorAll('.engagement-item');
    engagementItems.forEach(item => {
        item.addEventListener('click', function() {
            const countElement = this.querySelector('span');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + 1;
            
            // Añadir efecto de resaltado temporal
            this.style.color = '#1877f2';
            
            // Añadir animación de rebote pequeña
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.color = '#65676B';
            }, 300);
        });
    });

    // Añadir animación sutil a la ilustración del paisaje
    const sun = document.querySelector('.sun');
    if (sun) {
        setInterval(() => {
            sun.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.8)';
            setTimeout(() => {
                sun.style.boxShadow = '0 0 20px rgba(255, 215, 0, 0.6)';
            }, 1000);
        }, 2000);
    }
    
    // =========================================================================
    // INTERACCIÓN CON METRICS PILLS DEL HERO
    // =========================================================================
    
    const metricPills = document.querySelectorAll('.metric-pill');
    
    metricPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Determinar qué sección debe mostrarse
            let targetSection = '.resultados-section';
            const resultadosSection = document.querySelector(targetSection);
            
            if (resultadosSection) {
                // Scroll suave a la sección
                window.scrollTo({
                    top: resultadosSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Destacar la tarjeta correspondiente
                setTimeout(() => {
                    const resultadoCards = document.querySelectorAll('.resultado-card');
                    let index = 0;
                    
                    if (this.classList.contains('roas-pill')) {
                        index = 0;
                    } else if (this.classList.contains('cpa-pill')) {
                        index = 1;
                    } else if (this.classList.contains('conversion-pill')) {
                        index = 2;
                    }
                    
                    if (resultadoCards[index]) {
                        resultadoCards[index].style.transform = 'scale(1.05)';
                        resultadoCards[index].style.boxShadow = 'var(--sombra-fuerte)';
                        resultadoCards[index].style.border = '2px solid #1877f2';
                        
                        setTimeout(() => {
                            resultadoCards[index].style.transform = '';
                            resultadoCards[index].style.boxShadow = '';
                            resultadoCards[index].style.border = '1px solid #e0e0e0';
                        }, 2000);
                    }
                }, 600);
            }
        });
    });

    // =========================================================================
    // FAQ ACCORDION
    // =========================================================================
    
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
    
    // Activar el primer FAQ por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // =========================================================================
    // BOTÓN "VOLVER ARRIBA"
    // =========================================================================
    
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // =========================================================================
    // SIMULACIÓN DE ESCASEZ - CONTADOR DE DISPONIBILIDAD
    // =========================================================================
    
    let availableSpots = 3; // Lugares disponibles con precio especial
    const spotsLabel = document.querySelector('.spots-label span:last-child');
    
    // Actualizar etiqueta de lugares disponibles
    function updateSpotsLabel() {
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
    
    // Mostrar notificación de reserva
    function showBookingNotification() {
        // Solo mostrar si la página lleva más de 15 segundos cargada y el usuario ha hecho scroll
        if (document.documentElement.scrollTop > 300 && initialTimeElapsed) {
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
            
            // Estilos para la notificación
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
            
            // Estilos para el icono
            const notificationIcon = notification.querySelector('.notification-icon');
            notificationIcon.style.width = '40px';
            notificationIcon.style.height = '40px';
            notificationIcon.style.borderRadius = '50%';
            notificationIcon.style.backgroundColor = 'rgba(24, 119, 242, 0.1)';
            notificationIcon.style.display = 'flex';
            notificationIcon.style.alignItems = 'center';
            notificationIcon.style.justifyContent = 'center';
            notificationIcon.style.marginRight = '15px';
            notificationIcon.style.color = '#1877f2';
            
            // Estilos para el contenido
            const notificationContent = notification.querySelector('.notification-content');
            notificationContent.style.flex = '1';
            
            // Estilos para el texto
            const notificationText = notification.querySelector('.notification-content p');
            notificationText.style.margin = '0 0 5px 0';
            notificationText.style.fontWeight = '600';
            
            // Estilos para el subtexto
            const notificationSubtext = notification.querySelector('.notification-content span');
            notificationSubtext.style.fontSize = '12px';
            notificationSubtext.style.color = '#666';
            
            // Estilos para el botón de cerrar
            const closeButton = notification.querySelector('.notification-close');
            closeButton.style.background = 'none';
            closeButton.style.border = 'none';
            closeButton.style.color = '#999';
            closeButton.style.cursor = 'pointer';
            closeButton.style.padding = '5px';
            closeButton.style.marginLeft = '10px';
            
            // Añadir la notificación al DOM
            document.body.appendChild(notification);
            
            // Cerrar la notificación al hacer clic en el botón de cerrar
            closeButton.addEventListener('click', function() {
                notification.style.animation = 'fadeOutDown 0.5s forwards';
                setTimeout(() => {
                    if (document.body.contains(notification)) {
                        document.body.removeChild(notification);
                    }
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
    }
    
    // Simular reservas aleatorias
    function simulateRandomBookings() {
        // Solo ejecutar si hay lugares disponibles
        if (availableSpots > 0) {
            // Probabilidad baja para que no sea demasiado agresivo
            if (Math.random() < 0.1) {
                availableSpots--;
                updateSpotsLabel();
                // Mostrar notificación de nueva reserva
                showBookingNotification();
            }
        }
    }
    
    // Inicializar
    let initialTimeElapsed = false;
    setTimeout(() => {
        initialTimeElapsed = true;
    }, 15000);
    
    // Iniciar simulación de reservas cada 40 segundos
    setInterval(simulateRandomBookings, 40000);
    
    // Añadir animaciones CSS para las notificaciones
    const styleElement = document.createElement('style');
    styleElement.textContent = `
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
        
        @keyframes fadeOutDown {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(20px);
            }
        }
        
        @keyframes highlight-pulse {
            0% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(24, 119, 242, 0.5); }
            100% { transform: scale(1); box-shadow: none; }
        }
    `;
    document.head.appendChild(styleElement);
    
    // =========================================================================
    // INTERACTIVIDAD DE ELEMENTOS
    // =========================================================================
    
    // Animación para problemas items
    const problemaItems = document.querySelectorAll('.problema-item');
    problemaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.problema-icon i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
                icon.style.transition = 'transform 0.3s ease';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.problema-icon i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });
    
    // Resaltar enlaces de navegación activos
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'ads.html') {
            link.classList.add('active');
        }
    });
    
    // =========================================================================
    // NAVEGACIÓN INTERNA SUAVE
    // =========================================================================
    
    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Efecto de highlight para destacar el destino
                if (targetId === '#contacto-form') {
                    setTimeout(() => {
                        const form = document.querySelector('.contacto-beneficios');
                        if (form) {
                            form.style.boxShadow = '0 0 0 3px #1877f2';
                            setTimeout(() => {
                                form.style.boxShadow = '';
                            }, 1500);
                        }
                    }, 800);
                }
            }
        });
    });
    
    // =========================================================================
    // EFECTOS DE ENTRADA Y ANIMACIONES
    // =========================================================================
    
    // Efectos de entrada para las cards de resultado
    const resultadoCards = document.querySelectorAll('.resultado-card');
    
    // Crear un observador para las cards de resultado
    const resultadoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir efecto de entrada suave
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                
                // Después añadir efecto de pulso
                setTimeout(() => {
                    entry.target.style.animation = 'highlight-pulse 1s ease';
                    setTimeout(() => {
                        entry.target.style.animation = '';
                    }, 1000);
                }, 1000);
                
                resultadoObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    // Observar las cards de resultado
    resultadoCards.forEach(card => {
        resultadoObserver.observe(card);
    });
    
    // Mejorar la experiencia con los botones CTAs
    const ctaButtons = document.querySelectorAll('.btn-lg, .btn-flotante');
    
    ctaButtons.forEach(button => {
        // Añadir efecto de elevación al hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(24, 119, 242, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // =========================================================================
    // DETECTOR DE INTENCIÓN DE SALIDA
    // =========================================================================
    
    let exitIntentShown = false;
    
    document.addEventListener('mouseleave', function(e) {
        // Solo activar cuando el puntero sale por arriba de la página
        if (e.clientY <= 5 && !exitIntentShown && initialTimeElapsed) {
            exitIntentShown = true;
            
            // Verificar si el usuario ya ha completado el formulario
            const contactForm = document.getElementById('contacto-form');
            if (contactForm && !contactForm.classList.contains('submitted')) {
                // Crear modal de CTA final
                const modal = document.createElement('div');
                modal.className = 'exit-intent-modal';
                modal.innerHTML = `
                    <div class="exit-modal-content">
                        <button class="exit-modal-close">&times;</button>
                        <h3>¡Esperá un momento!</h3>
                        <p>Antes de irte, ¿te gustaría un diagnóstico gratuito de tus Meta Ads?</p>
                        <p>Descubrí cuánto potencial están perdiendo tus campañas actuales.</p>
                        <a href="#contacto-form" class="btn btn-lg">Solicitá Diagnóstico Gratuito</a>
                    </div>
                `;
                
                // Estilos para el modal
                modal.style.position = 'fixed';
                modal.style.top = '0';
                modal.style.left = '0';
                modal.style.width = '100%';
                modal.style.height = '100%';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
                modal.style.display = 'flex';
                modal.style.justifyContent = 'center';
                modal.style.alignItems = 'center';
                modal.style.zIndex = '9999';
                modal.style.opacity = '0';
                modal.style.transition = 'opacity 0.3s ease';
                
                // Estilos para el contenido del modal
                const modalContent = modal.querySelector('.exit-modal-content');
                modalContent.style.backgroundColor = 'white';
                modalContent.style.borderRadius = '8px';
                modalContent.style.padding = '30px';
                modalContent.style.maxWidth = '500px';
                modalContent.style.position = 'relative';
                modalContent.style.textAlign = 'center';
                
                // Estilos para el botón de cerrar
                const closeButton = modal.querySelector('.exit-modal-close');
                closeButton.style.position = 'absolute';
                closeButton.style.top = '10px';
                closeButton.style.right = '10px';
                closeButton.style.border = 'none';
                closeButton.style.background = 'none';
                closeButton.style.fontSize = '24px';
                closeButton.style.cursor = 'pointer';
                closeButton.style.color = '#999';
                
                // Añadir el modal al DOM
                document.body.appendChild(modal);
                
                // Mostrar el modal con un pequeño retraso
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 100);
                
                // Cerrar al hacer clic en el botón de cerrar
                closeButton.addEventListener('click', function() {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        if (document.body.contains(modal)) {
                            document.body.removeChild(modal);
                        }
                    }, 300);
                });
                
                // Cerrar al hacer clic fuera del contenido
                modal.addEventListener('click', function(event) {
                    if (event.target === modal) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            if (document.body.contains(modal)) {
                                document.body.removeChild(modal);
                            }
                        }, 300);
                    }
                });
                
                // Navegar al formulario al hacer clic en el CTA
                const ctaButton = modal.querySelector('.btn');
                ctaButton.addEventListener('click', function(event) {
                    event.preventDefault();
                    
                    const contactForm = document.getElementById('contacto-form');
                    if (contactForm) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            if (document.body.contains(modal)) {
                                document.body.removeChild(modal);
                            }
                            
                            window.scrollTo({
                                top: contactForm.offsetTop - 80,
                                behavior: 'smooth'
                            });
                            
                            // Destacar el formulario
                            const form = document.querySelector('.contacto-beneficios');
                            if (form) {
                                form.style.boxShadow = '0 0 0 3px #1877f2';
                                setTimeout(() => {
                                    form.style.boxShadow = '';
                                }, 1500);
                            }
                        }, 300);
                    }
                });
            }
        }
    });
    
    // =========================================================================
    // NAVEGACIÓN DESDE URL
    // =========================================================================
    
    // Detectar si hay un hash en la URL y navegar automáticamente
    if (window.location.hash) {
        setTimeout(() => {
            const targetElement = document.querySelector(window.location.hash);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    }
    
    // =========================================================================
    // ANIMACIONES DE ELEMENTOS AL SCROLL
    // =========================================================================
    
    // Inicializar animaciones de fade-in
    const fadeElements = document.querySelectorAll('.fade-in:not(.visible)');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
