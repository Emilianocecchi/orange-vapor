/**
 * Orange Vapor - Meta Ads Landing Page
 * JavaScript optimizado para resaltar los elementos clave y pasar el "Grunt Test"
 */

document.addEventListener('DOMContentLoaded', function() {
    // Elementos críticos para el Grunt Test - Mostrar inmediatamente
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
    
    // Interacción con las métricas del hero
    const metricPills = document.querySelectorAll('.metric-pill');
    
    metricPills.forEach(pill => {
        pill.addEventListener('click', function() {
            // Determinar qué sección debe mostrarse basado en la clase
            let targetSection = '.resultados-section';
            const resultadosSection = document.querySelector(targetSection);
            
            if (resultadosSection) {
                // Añadir un efecto de scroll suave
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

    // FAQ Accordion
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
    
    // Mostrar/ocultar botón de "Volver arriba" al hacer scroll
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollTopBtn.style.display = 'none';
    document.body.appendChild(scrollTopBtn);
    
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
    
    // Estilizar el botón de scroll top
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '20px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.backgroundColor = '#1877f2';
    scrollTopBtn.style.color = 'white';
    scrollTopBtn.style.width = '50px';
    scrollTopBtn.style.height = '50px';
    scrollTopBtn.style.borderRadius = '50%';
    scrollTopBtn.style.border = 'none';
    scrollTopBtn.style.fontSize = '20px';
    scrollTopBtn.style.cursor = 'pointer';
    scrollTopBtn.style.boxShadow = '0 3px 6px rgba(0,0,0,0.16)';
    scrollTopBtn.style.zIndex = '99';
    scrollTopBtn.style.transition = 'all 0.3s ease';
    
    // Efecto de vapor burbujas - optimizado para rendimiento
    function createVaporBubbles() {
        const vaporEffect = document.querySelector('.vapor-effect');
        if (!vaporEffect) return;
        
        // Limitar el número de burbujas para mejor rendimiento
        const maxBubbles = 5;
        let bubbleCount = 0;
        
        // Función para crear burbujas de vapor aleatoriamente
        function createRandomBubble() {
            // Salir si ya tenemos el máximo de burbujas
            if (bubbleCount >= maxBubbles) return;
            
            const bubble = document.createElement('div');
            bubble.classList.add('vapor-bubble');
            
            // Posicionamiento aleatorio
            const posX = Math.random() * 100; // posición X en porcentaje
            const size = 50 + Math.random() * 200; // tamaño entre 50 y 250px
            const delay = Math.random() * 5; // retraso de animación de 0 a 5 segundos
            const duration = 10 + Math.random() * 20; // duración entre 10 y 30 segundos
            
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
                if (bubble.parentNode === vaporEffect) {
                    bubble.remove();
                    bubbleCount--;
                }
            }, (delay + duration) * 1000);
        }
        
        // Crear burbujas periódicamente - reducido para mejor rendimiento
        const bubbleInterval = setInterval(createRandomBubble, 4000);
        
        // Crear algunas burbujas iniciales con retraso para no afectar carga inicial
        setTimeout(() => {
            for (let i = 0; i < 2; i++) {
                createRandomBubble();
            }
        }, 2000);
        
        // Limpieza al cambiar de página
        window.addEventListener('beforeunload', function() {
            clearInterval(bubbleInterval);
        });
    }
    
    // Solo crear efectos de vapor después de cargar elementos esenciales
    setTimeout(createVaporBubbles, 1000);
    
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
                    if (button.textContent.includes('SOLICITAR')) {
                        button.textContent = 'UNIRSE A LISTA DE ESPERA';
                    } else {
                        button.textContent = 'UNIRSE A LISTA DE ESPERA';
                    }
                    button.classList.remove('pulse-button');
                });
            }
        }
    }
    
    // Inicializar contadores
    updateOfertaTag();
    
    // Simular reservas aleatorias - mejorado para mejor UX
    function simulateRandomBookings() {
        // Solo ejecutar si hay lugares disponibles
        if (availableSpots > 0) {
            // Probabilidad baja para que no sea demasiado agresivo
            if (Math.random() < 0.1) {
                availableSpots--;
                updateOfertaTag();
                // Mostrar notificación de nueva reserva
                showBookingNotification();
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
    
    // Esperar un tiempo inicial antes de mostrar notificaciones
    let initialTimeElapsed = false;
    setTimeout(() => {
        initialTimeElapsed = true;
    }, 15000);
    
    // Iniciar simulación de reservas cada 40 segundos (menos frecuente para no molestar)
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
        
        @keyframes bubble-rise {
            0% { transform: translateY(100px); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translateY(-100px); opacity: 0; }
        }
        
        @keyframes highlight-pulse {
            0% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(24, 119, 242, 0.5); }
            100% { transform: scale(1); box-shadow: none; }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Animación de elementos interactivos
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
    
    // Resaltar enlaces de navegación activos para esta landing page
    const navLinks = document.querySelectorAll('.nav-link, .dropdown-item');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'ads.html') {
            link.classList.add('active');
        }
    });
    
    // Smooth scroll para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Destacar brevemente el área objetivo
                const originalBackground = targetElement.style.background;
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Efecto de highlight para que el usuario sepa dónde ha llegado
                if (targetId === '#contacto-form') {
                    setTimeout(() => {
                        const form = document.querySelector('.hubspot-form-container');
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
    
    // Efecto hover en las cards de resultado cuando el usuario hace scroll
    const resultadoCards = document.querySelectorAll('.resultado-card');
    
    // Crear un observador para las cards de resultado
    const resultadoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Añadir un efecto de entrada suave
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 200);
                
                // Después añadir un efecto de pulso
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
    
    // Asegurarnos que los botones CTAs sean altamente visibles
    const ctaButtons = document.querySelectorAll('.btn-lg, .btn-flotante');
    
    ctaButtons.forEach(button => {
        // Añadir efecto de pulsación al hacer hover
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(24, 119, 242, 0.3)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    // Detectar si el usuario está a punto de irse para mostrar un último CTA
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
                        <h3>¡Espera un momento!</h3>
                        <p>Antes de irte, ¿te gustaría un diagnóstico gratuito de tus Meta Ads?</p>
                        <p>Descubre cuánto potencial están perdiendo tus campañas actuales.</p>
                        <a href="#contacto-form" class="btn btn-lg">Solicitar Diagnóstico Gratuito</a>
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
                            const form = document.querySelector('.hubspot-form-container');
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
    
    // Detectar si hay un hash en la URL y navegar automaticamente
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
});
