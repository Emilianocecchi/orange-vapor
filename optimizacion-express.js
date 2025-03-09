/**
 * Orange Vapor - Optimización Express
 * JavaScript Específico para la landing page de Optimización Express
 */

document.addEventListener('DOMContentLoaded', function() {
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
    scrollTopBtn.style.backgroundColor = '#dc3545';
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
    
    // Efecto de vapor burbujas
    function createVaporBubbles() {
        const vaporEffect = document.querySelector('.vapor-effect');
        if (!vaporEffect) return;
        
        // Función para crear burbujas de vapor aleatoriamente
        function createRandomBubble() {
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
            bubble.style.position = 'absolute';
            bubble.style.borderRadius = '50%';
            bubble.style.background = 'radial-gradient(circle at center, rgba(220, 53, 69, 0.3) 0%, rgba(255, 107, 107, 0.1) 50%, rgba(255, 255, 255, 0) 70%)';
            bubble.style.opacity = '0';
            bubble.style.zIndex = '1';
            bubble.style.boxShadow = '0 0 40px rgba(220, 53, 69, 0.1)';
            bubble.style.animation = 'bubble-rise 15s ease-in-out infinite';
            
            // Añadir burbuja al DOM
            vaporEffect.appendChild(bubble);
            
            // Eliminar burbuja después de que termine la animación
            setTimeout(() => {
                bubble.remove();
            }, (delay + duration) * 1000);
        }
        
        // Crear burbujas periódicamente
        setInterval(createRandomBubble, 3000);
        
        // Crear algunas burbujas iniciales
        for (let i = 0; i < 3; i++) {
            createRandomBubble();
        }
    }
    
    // Ejecutar la creación de burbujas de vapor
    createVaporBubbles();
    
    // Simular escasez con contador decreciente
    let availableSpots = 1; // 3 spots totales - 2 ya ocupados
    const spotsLabel = document.querySelector('.spots-label span:last-child');
    const spotsBar = document.querySelector('.spots-bar');
    
    function updateSpots() {
        if (availableSpots > 0) {
            spotsLabel.textContent = `${3 - availableSpots} spots ocupados`;
            spotsBar.style.width = `${((3 - availableSpots) / 3) * 100}%`;
        } else {
            spotsLabel.textContent = `¡TODOS LOS SPOTS OCUPADOS!`;
            spotsBar.style.width = '100%';
            
            // Actualizar CTA y añadir lista de espera
            const ctaButtons = document.querySelectorAll('.pulse-button');
            ctaButtons.forEach(button => {
                button.textContent = 'UNIRSE A LISTA DE ESPERA';
                button.classList.remove('pulse-button');
            });
        }
    }
    
    // Efectos de destacado para elementos importantes
    function highlightElements() {
        // Destacar el precio
        const precioInfo = document.querySelector('.precio-info');
        if (precioInfo) {
            setTimeout(() => {
                precioInfo.classList.add('highlighted');
                setTimeout(() => {
                    precioInfo.classList.remove('highlighted');
                }, 1000);
            }, 3000); // Destacar después de 3 segundos
        }
        
        // Destacar el bonus
        const bonusSection = document.querySelector('.bonus-section');
        if (bonusSection) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('bonus-highlight');
                            setTimeout(() => {
                                entry.target.classList.remove('bonus-highlight');
                            }, 1500);
                        }, 500);
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.7 });
            
            observer.observe(bonusSection);
        }
    }
    
    // Ejecutar efectos de destacado
    highlightElements();
    
    // Simular reservas aleatorias
    function simulateRandomBookings() {
        // Solo ejecutar si hay lugares disponibles
        if (availableSpots > 0) {
            // 20% de probabilidad cada 45 segundos
            if (Math.random() < 0.2) {
                // Mostrar notificación de nueva reserva
                showBookingNotification();
            }
        }
    }
    
    // Mostrar notificación de reserva
    function showBookingNotification() {
        // Solo mostrar si la página lleva más de 15 segundos cargada y el usuario ha hecho scroll
        if (document.documentElement.scrollTop > 300) {
            const notification = document.createElement('div');
            notification.className = 'booking-notification';
            notification.innerHTML = `
                <div class="notification-icon">
                    <i class="fas fa-user-check"></i>
                </div>
                <div class="notification-content">
                    <p>¡Alguien acaba de reservar su diagnóstico!</p>
                    <span>Quedan ${availableSpots} lugares disponibles esta semana</span>
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
            notificationIcon.style.backgroundColor = 'rgba(220, 53, 69, 0.1)';
            notificationIcon.style.display = 'flex';
            notificationIcon.style.alignItems = 'center';
            notificationIcon.style.justifyContent = 'center';
            notificationIcon.style.marginRight = '15px';
            notificationIcon.style.color = '#dc3545';
            
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
    }
    
    // Iniciar simulación de reservas cada 45 segundos
    setInterval(simulateRandomBookings, 45000);
    
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
        
        .highlighted {
            animation: highlight-pulse 1s ease;
        }
        
        @keyframes highlight-pulse {
            0% { transform: scale(1); box-shadow: none; }
            50% { transform: scale(1.05); box-shadow: 0 0 15px rgba(220, 53, 69, 0.5); }
            100% { transform: scale(1); box-shadow: none; }
        }
        
        .bonus-highlight {
            animation: bonus-glow 1.5s ease;
        }
        
        @keyframes bonus-glow {
            0% { box-shadow: none; }
            50% { box-shadow: 0 0 25px rgba(220, 53, 69, 0.6); }
            100% { box-shadow: none; }
        }
        
        @keyframes bubble-rise {
            0% { transform: translateY(100px); opacity: 0; }
            20% { opacity: 0.7; }
            80% { opacity: 0.7; }
            100% { transform: translateY(-100px); opacity: 0; }
        }
    `;
    document.head.appendChild(styleElement);
    
    // Animaciones al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Función para comprobar si un elemento es visible en la ventana
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Función para animar elementos cuando son visibles
    function animateElementsOnScroll() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Llamar a la función inicialmente
    animateElementsOnScroll();
    
    // Y al hacer scroll
    window.addEventListener('scroll', animateElementsOnScroll);
    
    // Smooth scroll para enlaces internos
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
            }
        });
    });
    
    // Manejar el formulario de HubSpot
    // Verificar periódicamente si el iframe del formulario está cargado
    let hubspotFormCheck = setInterval(() => {
        const hubspotFrame = document.querySelector('.hs-form-frame iframe');
        if (hubspotFrame) {
            clearInterval(hubspotFormCheck);
            console.log('Formulario de HubSpot cargado correctamente');
            
            // Cuando el formulario está completamente cargado, hacer scroll hasta él si hay un hash en la URL
            if (window.location.hash === '#contacto-form') {
                setTimeout(() => {
                    const formElement = document.getElementById('contacto-form');
                    if (formElement) {
                        window.scrollTo({
                            top: formElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }, 500);
            }
        }
    }, 1000);
    
    // Detener el intervalo después de 10 segundos de intentos
    setTimeout(() => {
        clearInterval(hubspotFormCheck);
    }, 10000);
});
