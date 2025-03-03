/**
 * Orange Vapor - JavaScript Principal
 * Añade interactividad y funcionalidades al sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // NAVEGACIÓN Y HEADER
    // =========================================================================
    
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Header adhesivo (sticky) al hacer scroll
    function updateHeaderState() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Inicializar el estado del header al cargar
    updateHeaderState();
    
    // Actualizar el estado del header al hacer scroll
    window.addEventListener('scroll', updateHeaderState);
    
    // Toggle del menú móvil
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', 
                mobileToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
            );
        });
    }
    
    // Toggle del menú desplegable en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.parentElement.classList.toggle('active');
                const icon = this.querySelector('i');
                if (this.parentElement.classList.contains('active')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0)';
                }
            }
        });
    });
    
    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                if (mobileToggle) {
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
            }
        });
    });
    
    // Gestión de enlaces activos
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar enlace correspondiente
        if (filename === '' || filename === 'index.html') {
            // Home page - ningún enlace activo o especial para home
        } else if (filename.includes('ads.html')) {
            const adsLink = document.querySelector('a[href="ads.html"]');
            if (adsLink) adsLink.classList.add('active');
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) dropdownToggle.classList.add('active');
        } else if (filename.includes('google-ads.html')) {
            const googleAdsLink = document.querySelector('a[href="google-ads.html"]');
            if (googleAdsLink) googleAdsLink.classList.add('active');
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) dropdownToggle.classList.add('active');
        } else if (filename.includes('email-marketing.html')) {
            const emailLink = document.querySelector('a[href="email-marketing.html"]');
            if (emailLink) emailLink.classList.add('active');
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) dropdownToggle.classList.add('active');
        } else if (filename.includes('chatbot.html')) {
            const chatbotLink = document.querySelector('a[href="chatbot.html"]');
            if (chatbotLink) chatbotLink.classList.add('active');
            const dropdownToggle = document.querySelector('.dropdown-toggle');
            if (dropdownToggle) dropdownToggle.classList.add('active');
        } else if (filename.includes('optimizacion-express.html')) {
            const optimizacionLink = document.querySelector('a[href="optimizacion-express.html"]');
            if (optimizacionLink) optimizacionLink.classList.add('active');
        } else if (filename.includes('contacto.html')) {
            const contactoLink = document.querySelector('a[href="contacto.html"]');
            if (contactoLink) contactoLink.classList.add('active');
        }
    }
    
    // Llamar a esta función al cargar la página
    setActiveNavLinks();
    
    // Si estamos en la página principal, también actualizamos los enlaces activos al desplazarnos
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        // Navegación activa según la sección visible (solo en la página principal)
        function setActiveNavLinkBySection() {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            // Sólo actualizar enlaces internos de la página principal
            document.querySelectorAll('a[href^="#"]').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }
        
        window.addEventListener('scroll', setActiveNavLinkBySection);
    }
    
    // =========================================================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLL)
    // =========================================================================
    
    // Navegación suave para enlaces internos
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
    
    // =========================================================================
    // ANIMACIONES AL SCROLL
    // =========================================================================
    
    // Detectar elementos para animar al hacer scroll
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Crear un observador de intersección para activar animaciones
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
    
    // Observar todos los elementos con la clase fade-in
    fadeElements.forEach(element => {
        observer.observe(element);
    });
    
    // =========================================================================
    // EFECTOS DE VAPOR
    // =========================================================================
    
    // Añadir efectos de vapor dinámicos
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
    
    // =========================================================================
    // ANIMACIÓN DE MÉTRICAS
    // =========================================================================
    
    // Animar los valores de métricas cuando son visibles
    const metricElements = document.querySelectorAll('.metric-after');
    
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
                        const duration = 2000; // 2 segundos de duración
                        
                        function animateValue(timestamp) {
                            if (!startTime) startTime = timestamp;
                            const progress = Math.min((timestamp - startTime) / duration, 1);
                            const currentValue = startValue + progress * (endValue - startValue);
                            
                            // Formatear el valor con los decimales correctos
                            const formattedValue = currentValue.toFixed(decimalPlaces);
                            metric.textContent = `${prefix}${formattedValue}${suffix}`;
                            
                            if (progress < 1) {
                                requestAnimationFrame(animateValue);
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
        threshold: 0.5
    });
    
    // Observar todos los elementos de métricas
    metricElements.forEach(metric => {
        metricObserver.observe(metric);
    });
    
    // =========================================================================
    // FORMULARIO DE CONTACTO Y HUBSPOT
    // =========================================================================
    
    // Comprobar si el formulario de HubSpot está listo
    function checkHubspotForm() {
        const hsFormFrame = document.querySelector('.hs-form-frame');
        if (hsFormFrame && typeof window.hbspt !== 'undefined') {
            // HubSpot está disponible, podríamos hacer personalizaciones adicionales aquí
            console.log('HubSpot form is ready');
        }
    }
    
    // Verificar periódicamente si el formulario de HubSpot está listo
    let hubspotCheckInterval = setInterval(() => {
        checkHubspotForm();
        
        // Después de 10 segundos, dejamos de verificar
        setTimeout(() => {
            clearInterval(hubspotCheckInterval);
        }, 10000);
    }, 1000);
    
    // =========================================================================
    // BOTONES CTA
    // =========================================================================
    
    // Función para scroll suave al formulario de contacto desde botones CTA
    const ctaButtons = document.querySelectorAll(
        '.hero-buttons .btn, ' +
        '.cta-box .btn, ' +
        '.cta-section .btn, ' +
        '.btn-outline[href="#contacto"], ' +
        '.nav-cta .btn, ' +
        '.garantia-box .btn, ' +
        '.btn-flotante, ' +
        '.proceso-card .btn'
    );
    
    // Agregar event listener a cada botón
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Solo prevenir si el enlace es interno
            const href = this.getAttribute('href');
            if (href && (href.startsWith('#') || href.includes('contacto'))) {
                event.preventDefault();
                
                // Obtener el formulario de contacto
                const contactForm = document.getElementById('contacto-form');
                
                if (contactForm) {
                    // Calcular la posición del formulario
                    const formPosition = contactForm.getBoundingClientRect().top + window.pageYOffset;
                    
                    // Hacer scroll suave hasta el formulario
                    window.scrollTo({
                        top: formPosition - 100,
                        behavior: 'smooth'
                    });
                } else if (href.startsWith('#')) {
                    // Si no hay formulario pero es un enlace de anclaje, navegar al ancla
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // =========================================================================
    // INICIALIZACIÓN Y FINALIZACIÓN
    // =========================================================================
    
    // Detectar cuando el sitio está completamente cargado
    window.addEventListener('load', function() {
        // Eliminar cualquier clase de precarga si existe
        document.body.classList.remove('preload');
        
        // Activar la primera sección de animación
        const firstSection = document.querySelector('.hero');
        if (firstSection) {
            const fadeElements = firstSection.querySelectorAll('.fade-in');
            fadeElements.forEach(el => {
                el.classList.add('visible');
            });
        }
        
        // Iniciar animación de scroll
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.style.opacity = '1';
        }
    });
});
