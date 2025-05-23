/* ==========================================================================
   ORANGE VAPOR - JAVASCRIPT MINIMALISTA
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Cambiar estilo del navbar al hacer scroll
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Ocultar/mostrar navbar según dirección del scroll
        if (currentScroll > lastScroll && currentScroll > 300) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Smooth Scroll para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animación de números (si están visibles)
    const animateNumbers = () => {
        const numbers = document.querySelectorAll('.stat-number');
        
        numbers.forEach(number => {
            const target = parseInt(number.innerText.replace(/\D/g, ''));
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const updateNumber = () => {
                current += increment;
                if (current < target) {
                    number.innerText = Math.floor(current).toLocaleString();
                    requestAnimationFrame(updateNumber);
                } else {
                    number.innerText = target.toLocaleString();
                }
            };
            
            // Iniciar animación cuando sea visible
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(number);
        });
    };

    // Inicializar animaciones
    animateNumbers();

    // Ocultar CTA flotante cuando esté cerca del formulario de contacto
    const floatingCTA = document.querySelector('.floating-cta');
    const contactSection = document.querySelector('#contacto');

    if (floatingCTA && contactSection) {
        window.addEventListener('scroll', () => {
            const contactRect = contactSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (contactRect.top < windowHeight && contactRect.bottom > 0) {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.pointerEvents = 'none';
            } else {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.pointerEvents = 'auto';
            }
        });
    }

    // Animación de aparición para elementos
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const appearObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
                appearObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.problem-card, .service-card, .plan-feature').forEach(el => {
        appearObserver.observe(el);
    });

    // Formulario de Mailchimp - Validación adicional
    const form = document.getElementById('mc-embedded-subscribe-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const emailInput = document.getElementById('mce-EMAIL');
            const phoneInput = document.getElementById('mce-PHONE');
            
            // Validación básica del email
            if (!emailInput.value || !emailInput.value.includes('@')) {
                e.preventDefault();
                alert('Por favor, ingresá un email válido');
                return;
            }
            
            // Validación del teléfono
            if (!phoneInput.value || phoneInput.value.length < 8) {
                e.preventDefault();
                alert('Por favor, ingresá un número de WhatsApp válido');
                return;
            }
        });
    }

    // Countdown timer simulado
    const updateTimer = () => {
        const timerElements = document.querySelectorAll('.cta-timer strong');
        timerElements.forEach(timer => {
            // Simular spots disponibles (empezar con 5)
            const currentSpots = parseInt(timer.innerText) || 5;
            
            // Reducir aleatoriamente cada cierto tiempo
            setTimeout(() => {
                if (currentSpots > 2) {
                    const newSpots = currentSpots - 1;
                    timer.innerText = newSpots;
                }
            }, Math.random() * 300000 + 60000); // Entre 1 y 6 minutos
        });
    };

    updateTimer();

    // Lazy loading para imágenes
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Mejorar accesibilidad del navbar móvil
    const handleMobileMenu = () => {
        const menuButton = document.querySelector('.mobile-menu-button');
        const navMenu = document.querySelector('.nav-menu');
        
        if (menuButton && navMenu) {
            menuButton.addEventListener('click', () => {
                const isOpen = navMenu.classList.contains('active');
                navMenu.classList.toggle('active');
                menuButton.setAttribute('aria-expanded', !isOpen);
            });
        }
    };

    handleMobileMenu();

    // Analytics eventos personalizados
    const trackEvent = (category, action, label) => {
        if (typeof gtag !== 'undefined') {
            gtag('event', action, {
                'event_category': category,
                'event_label': label
            });
        }
    };

    // Rastrear clicks en CTAs importantes
    document.querySelectorAll('.btn-nav, .btn-primary, .btn-success, .btn-hero-cta, .btn-final').forEach(btn => {
        btn.addEventListener('click', function() {
            const btnText = this.innerText;
            trackEvent('CTA', 'click', btnText);
        });
    });

    // Rastrear scroll depth
    let maxScroll = 0;
    const trackScrollDepth = () => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.round((window.pageYOffset / scrollHeight) * 100);
        
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            
            // Rastrear en intervalos de 25%
            if (maxScroll === 25 || maxScroll === 50 || maxScroll === 75 || maxScroll === 100) {
                trackEvent('Engagement', 'scroll', `${maxScroll}%`);
            }
        }
    };

    window.addEventListener('scroll', trackScrollDepth);

    // Mejorar performance con throttle
    const throttle = (func, delay) => {
        let timeoutId;
        let lastExecTime = 0;
        return function (...args) {
            const currentTime = Date.now();
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            }
        };
    };

    // Aplicar throttle a eventos de scroll
    window.addEventListener('scroll', throttle(() => {
        trackScrollDepth();
    }, 100));

    // Precargar fuentes críticas
    const preloadFont = (href) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'font';
        link.type = 'font/woff2';
        link.href = href;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
    };

    // Detectar y manejar errores de JavaScript
    window.addEventListener('error', (e) => {
        console.error('Error capturado:', e.message);
        // Aquí podrías enviar el error a un servicio de tracking
    });

    // Inicializar todo cuando el DOM esté listo
    console.log('Orange Vapor - Scripts cargados correctamente');
});

// Función helper para formatear números en los testimonios
const formatNumber = (num) => {
    return new Intl.NumberFormat('es-AR').format(num);
};

// Función para validar email más robusta
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Función para validar teléfono argentino
const validatePhone = (phone) => {
    // Eliminar espacios y guiones
    const cleaned = phone.replace(/[\s-]/g, '');
    // Verificar que tenga al menos 10 dígitos
    return /^\d{10,}$/.test(cleaned);
};

// Service Worker para mejorar performance (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(err => {
            console.log('ServiceWorker registration failed: ', err);
        });
    });
}
