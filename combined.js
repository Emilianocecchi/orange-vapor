/**
 * Orange Vapor - JavaScript Optimizado
 * Scripts centralizados para mejorar rendimiento y mantenibilidad
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
    
    // Variables para el manejo de estado
    let lastScrollTop = 0;
    let isScrolling = false;
    let resizeTimer;
    
    // Variables para controlar replaceState
    let lastReplaceStateTime = 0;
    let lastSection = '';
    let replaceStateCount = 0;
    
    // =========================================================================
    // NAVEGACIÓN Y NAVBAR - INICIALIZACIÓN
    // =========================================================================
    
    function initNavbar() {
        // Navegación: referencias adicionales
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        const navLinks = document.querySelectorAll('.nav-link');
        const dropdowns = document.querySelectorAll('.dropdown');
        const ctaButton = document.querySelector('.cta-button');
        
        // Inicializar estado
        updateHeaderState();
        setActiveNavLinks();
        
        // Agregar event listeners para navegación
        if (mobileToggle) {
            mobileToggle.addEventListener('click', toggleMobileMenu);
        }
        
        // Dropdown toggles
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const parent = this.closest('.dropdown');
                    toggleDropdown(parent);
                }
            });
        });
        
        // Enlaces de navegación
        navLinks.forEach(link => {
            if (!link.classList.contains('dropdown-toggle')) {
                link.addEventListener('click', closeMobileMenu);
            }
        });
        
        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    closeMobileMenu();
                }
            }
        });
        
        // Configurar dropdowns
        setupDropdowns(dropdowns);
        
        // Inicializar scrolling suave
        initSmoothScroll();
        
        // Inicializar animación del CTA principal
        initCTAAnimation(ctaButton);
    }
    
    // =========================================================================
    // FUNCIONES DE NAVEGACIÓN
    // =========================================================================
    
    // Actualizar estado del header al hacer scroll
    function updateHeaderState() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 50) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
            }
        } else {
            if (header.classList.contains('sticky')) {
                header.classList.remove('sticky');
            }
        }
    }
    
    // Toggle del menú móvil
    function toggleMobileMenu() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', !isExpanded);
        
        // Controlar scroll del body
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
        
        // Resetear dropdowns al cerrar menú
        if (isExpanded) {
            resetDropdowns();
        }
    }
    
    // Toggle dropdown específico
    function toggleDropdown(dropdown) {
        dropdown.classList.toggle('active');
        const toggle = dropdown.querySelector('.dropdown-toggle');
        
        if (toggle) {
            const isExpanded = dropdown.classList.contains('active');
            toggle.setAttribute('aria-expanded', isExpanded);
            
            // Rotar ícono
            const icon = toggle.querySelector('.dropdown-icon');
            if (icon) {
                icon.style.transform = isExpanded ? 'rotate(180deg)' : '';
            }
        }
    }
    
    // Cerrar todos los dropdowns
    function resetDropdowns() {
        const dropdowns = document.querySelectorAll('.dropdown');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Cerrar menú móvil
    function closeMobileMenu() {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            document.body.style.overflow = '';
        }
    }
    
    // Configurar dropdowns con hover en desktop y click en móvil
    function setupDropdowns(dropdowns) {
        dropdowns.forEach(dropdown => {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            if (!toggle || !menu) return;
            
            // Para desktop, usar mouse events
            if (window.innerWidth > 768) {
                dropdown.addEventListener('mouseenter', function() {
                    dropdown.classList.add('active');
                });
                
                dropdown.addEventListener('mouseleave', function() {
                    dropdown.classList.remove('active');
                });
                
                toggle.addEventListener('click', (e) => {
                    if (window.innerWidth > 768) {
                        e.preventDefault();
                        dropdown.classList.add('active');
                    }
                });
            }
        });
    }
    
    // =========================================================================
    // ENLACES ACTIVOS Y NAVEGACIÓN POR SCROLL
    // =========================================================================
    
    // Establecer enlaces activos según URL
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
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
            document.querySelector('a[href="optimizacion-express.html"]')?.classList.add('active');
        } else if (filename.includes('contacto.html')) {
            document.querySelector('a[href="contacto.html"]')?.classList.add('active');
        }
    }
    
    // Activar un item de dropdown y su toggle
    function activateDropdownItem(href) {
        const item = document.querySelector(`a[href="${href}"]`);
        const dropdown = item?.closest('.dropdown');
        
        if (item) item.classList.add('active');
        if (dropdown) {
            const toggle = dropdown.querySelector('.dropdown-toggle');
            if (toggle) toggle.classList.add('active');
        }
    }
    
    // Activar enlace según hash
    function activateLinkByHash(hash) {
        document.querySelectorAll('.nav-link').forEach(link => {
            const href = link.getAttribute('href');
            if (href) {
                const linkHash = href.startsWith('#') ? href.substring(1) : '';
                if (linkHash === hash) {
                    link.classList.add('active');
                }
            }
        });
    }
    
    // Actualizar enlaces activos según sección visible
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
                document.querySelectorAll('.nav-link').forEach(link => {
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
    
    // Inicializar scroll suave para enlaces internos
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]:not(.dropdown-toggle)').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Cerrar menú móvil primero si está abierto
                    closeMobileMenu();
                    
                    // Calcular offset según altura del header
                    const headerHeight = header.offsetHeight;
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
                    document.querySelectorAll('.nav-link').forEach(link => {
                        link.classList.remove('active');
                    });
                    this.classList.add('active');
                }
            });
        });
    }
    
    // Inicializar animación del CTA para primera visita
    function initCTAAnimation(ctaButton) {
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
    }
    
    // =========================================================================
    // ANIMACIONES AL SCROLL
    // =========================================================================
    
    function initScrollAnimations() {
        // Detectar elementos para animar al hacer scroll
        const fadeElements = document.querySelectorAll('.fade-in');
        
        // Animación inmediata para elementos en la vista inicial (hero section)
        const heroFadeElements = document.querySelectorAll('#home .fade-in');
        heroFadeElements.forEach(element => {
            setTimeout(() => {
                element.classList.add('visible');
            }, 300);
        });
        
        // Crear un observador de intersección para animaciones al hacer scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
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
    }
    
    // =========================================================================
    // ANIMACIÓN DE MÉTRICAS
    // =========================================================================
    
    function initMetricAnimations() {
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
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observar todos los elementos de métricas
        metricElements.forEach(metric => {
            metricObserver.observe(metric);
        });
    }
    
    // =========================================================================
    // SERVICIOS MENSUALES - ANIMACIONES
    // =========================================================================
    
    function initServiciosMensuales() {
        const serviciosMensuales = document.querySelector('.servicios-mensuales');
        if (!serviciosMensuales) return;
        
        const servicioCards = document.querySelectorAll('.servicio-mensual-card');
        const ofertaEspecial = document.querySelector('.oferta-especial');
        const serviciosGarantia = document.querySelector('.servicios-garantia');
        
        // Observador de intersección para animaciones
        const serviciosObserver = new IntersectionObserver((entries) => {
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
                    
                    serviciosObserver.unobserve(entry.target);
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
        serviciosObserver.observe(serviciosMensuales);
        
        // Efecto hover en las tarjetas
        servicioCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
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
    }
    
    // =========================================================================
    // EXPRESS BOX - ANIMACIONES
    // =========================================================================
    
    function initExpressBox() {
        const expressBox = document.querySelector('.express-box-container');
        if (!expressBox) return;
        
        const expressBoxItems = document.querySelectorAll('.express-box-list li');
        
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
        
        // Crear efecto inicial para los ítems
        if (window.innerWidth > 768) {
            expressBoxItems.forEach((item, index) => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(-20px)';
                item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                item.style.transitionDelay = (index * 0.1) + 's';
            });
        }
        
        // Comenzar a observar el box
        boxObserver.observe(expressBox);
        
        // Interactividad al hover para los ítems de la lista
        expressBoxItems.forEach(item => {
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
    }
    
    // =========================================================================
    // NAVEGACIÓN DE SERVICE PILLS - SECCIÓN HERO
    // =========================================================================
    
    function initServicePills() {
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
    }
    
    // =========================================================================
    // OPTIMIZACIÓN MOBILE
    // =========================================================================
    
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
    
    // =========================================================================
    // EVENT HANDLERS
    // =========================================================================
    
    // Handler optimizado para scroll con requestAnimationFrame
    function handleScroll() {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateHeaderState();
                updateNavActiveState();
                isScrolling = false;
            });
            
            isScrolling = true;
        }
    }
    
    // Handler para cambios de tamaño de ventana
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
            }
            
            // Reinicializar mejoras para móvil
            setupMobileEnhancements();
        }, 150);
    }
    
    // =========================================================================
    // INICIALIZACIÓN PRINCIPAL
    // =========================================================================
    
    // Inicializar componentes de la interfaz
    initNavbar();
    initScrollAnimations();
    initMetricAnimations();
    initServiciosMensuales();
    initExpressBox();
    initServicePills();
    setupMobileEnhancements();
    
    // Configurar event listeners globales
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    
    // Configuraciones específicas cuando la página está completamente cargada
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
    
    // Mostrar inmediatamente el contenido crítico
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
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporApp = {
        updateHeaderState,
        closeMobileMenu
    };
});
