/**
 * Orange Vapor - Email Marketing
 * JavaScript Específico para la landing page de Email Marketing
 */
document.addEventListener('DOMContentLoaded', function() {
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
    scrollTopBtn.style.backgroundColor = '#00829b';
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
    
    // Inicializar las animaciones de elementos visibles al cargar
    function initVisibleAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top <= windowHeight * 0.75) {
                element.classList.add('visible');
            }
        });
    }
    
    // Llamar a la función al cargar la página
    setTimeout(initVisibleAnimations, 100);
    
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
    
    // Observar todos los elementos con la clase fade-in
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
    
    // Animación de templates de email en el hero
    function animateEmailTemplates() {
        const templates = document.querySelectorAll('.email-template');
        
        if (templates.length <= 1) return;
        
        let activeIndex = 0;
        const totalTemplates = templates.length;
        
        // Posicionar inicialmente los templates
        function positionTemplates() {
            templates.forEach((template, index) => {
                if (index === activeIndex) {
                    template.style.top = '0';
                    template.style.left = '50%';
                    template.style.transform = 'translateX(-50%)';
                    template.style.zIndex = '5';
                    template.style.opacity = '1';
                } else if (index === (activeIndex + 1) % totalTemplates) {
                    template.style.top = '40px';
                    template.style.left = 'calc(50% + 40px)';
                    template.style.transform = 'translateX(-50%) scale(0.9)';
                    template.style.zIndex = '4';
                    template.style.opacity = '0.9';
                } else {
                    template.style.top = '70px';
                    template.style.left = 'calc(50% + 70px)';
                    template.style.transform = 'translateX(-50%) scale(0.8)';
                    template.style.zIndex = '3';
                    template.style.opacity = '0.7';
                }
            });
        }
        
        // Inicializar posiciones
        positionTemplates();
        
        // Cambiar el template activo cada 3 segundos
        setInterval(() => {
            activeIndex = (activeIndex + 1) % totalTemplates;
            positionTemplates();
        }, 3000);
    }
    
    // Activar animación de templates si estamos en desktop
    if (window.innerWidth > 768) {
        animateEmailTemplates();
    }
    
    // Funcionalidad para los FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Cerrar otros FAQs abiertos
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Abrir/cerrar el FAQ actual
            item.classList.toggle('active');
        });
    });
    
    // Abrir el primer FAQ por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Navegación suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Actualizar URL para reflejar la sección (mejora UX y permite compartir enlaces)
                history.pushState(null, null, targetId);
            }
        });
    });
    
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
                        const duration = 1500; // 1.5 segundos de duración
                        
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
    
    // Comprobar si el formulario de HubSpot está listo
    function checkHubspotForm() {
        const hsFormFrame = document.querySelector('.hs-form-frame');
        if (hsFormFrame && typeof window.hbspt !== 'undefined') {
            console.log('HubSpot form is ready');
            
            // Añadir enfoque automático al formulario si se llegó desde un CTA
            if (window.location.hash === '#contacto-form' || window.location.hash === '#contacto') {
                setTimeout(() => {
                    const formIframe = hsFormFrame.querySelector('iframe');
                    if (formIframe) {
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
    
    // Mejora del header al hacer scroll
    const header = document.getElementById('header');
    
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
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }
    });
});
