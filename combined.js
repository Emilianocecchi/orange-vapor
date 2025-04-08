/**
 * Orange Vapor - JavaScript Optimizado y Corregido
 * Scripts centralizados para mejorar rendimiento y mantenibilidad
 * Versión: 1.2.0 - Implementación de servicios mensuales compactos
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
    // SOLUCIÓN INMEDIATA PARA LA VISIBILIDAD
    // =========================================================================
    
    // FUNCIÓN: Asegurar que los elementos críticos estén visibles de inmediato
    function asegurarVisibilidadCritica() {
        // Hacer visible inmediatamente la sección de servicios y sus elementos
        const elementosCriticos = [
            '#servicios .seccion-titulo',
            '#servicios .servicios-tabs-container',
            '#servicios .servicios-content-container',
            '#servicios .oferta-especial',
            '#servicios .servicios-garantia',
            '#servicios .soluciones-card'
        ];
        
        elementosCriticos.forEach(selector => {
            const elementos = document.querySelectorAll(selector);
            elementos.forEach(elemento => {
                // Añadir clase visible y forzar estilos
                elemento.classList.add('visible');
                elemento.style.opacity = '1';
                elemento.style.transform = 'translateY(0)';
                elemento.style.visibility = 'visible';
            });
        });
        
        // Elementos específicos dentro de la sección
        document.querySelectorAll('#servicios .fade-in').forEach(elemento => {
            elemento.classList.add('visible');
        });
        
        // También hacer visible los elementos del home
        document.querySelectorAll('#home .fade-in').forEach(elemento => {
            elemento.classList.add('visible');
        });
        
        // Elementos del express
        document.querySelectorAll('#optimizacion-express .fade-in').forEach(elemento => {
            elemento.classList.add('visible');
        });
        
        console.log('Elementos críticos asegurados como visibles');
    }
    
    // Llamar inmediatamente para asegurar visibilidad
    asegurarVisibilidadCritica();
    
    // Respaldo adicional con setTimeout
    setTimeout(asegurarVisibilidadCritica, 500);
    setTimeout(function() {
        // Último respaldo: hacer visible TODOS los elementos fade-in
        document.querySelectorAll('.fade-in').forEach(elemento => {
            elemento.classList.add('visible');
        });
        console.log('Todos los elementos fade-in asegurados como visibles');
    }, 2000);
    // Script para contador regresivo y funcionalidad de tabs
document.addEventListener('DOMContentLoaded', function() {
    // Función para inicializar el contador
    function initCountdown() {
        // Valores iniciales
        let days = 14;
        let hours = 22;
        let minutes = 59;
        let seconds = 59;
        
        // Referencias a los elementos del DOM
        const daysElement = document.querySelector('.countdown-item:nth-child(1) .countdown-number');
        const hoursElement = document.querySelector('.countdown-item:nth-child(2) .countdown-number');
        const minutesElement = document.querySelector('.countdown-item:nth-child(3) .countdown-number');
        const secondsElement = document.querySelector('.countdown-item:nth-child(4) .countdown-number');
        
        // Verificar si se encontraron los elementos
        if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
            console.error('No se encontraron todos los elementos del contador');
            return;
        }
        
        // Actualizar los valores iniciales en el DOM
        daysElement.textContent = days;
        hoursElement.textContent = hours;
        minutesElement.textContent = minutes;
        secondsElement.textContent = seconds;
        
        // Función para actualizar el contador
        function updateCountdown() {
            // Disminuir los segundos
            seconds--;
            
            // Ajustar minutos, horas y días si es necesario
            if (seconds < 0) {
                seconds = 59;
                minutes--;
                
                if (minutes < 0) {
                    minutes = 59;
                    hours--;
                    
                    if (hours < 0) {
                        hours = 23;
                        days--;
                        
                        if (days < 0) {
                            // Reiniciar el contador cuando llegue a cero
                            days = 14;
                            hours = 22;
                            minutes = 59;
                            seconds = 59;
                        }
                    }
                }
            }
            
            // Actualizar los valores en el DOM
            daysElement.textContent = days;
            hoursElement.textContent = hours;
            minutesElement.textContent = minutes < 10 ? '0' + minutes : minutes;
            secondsElement.textContent = seconds < 10 ? '0' + seconds : seconds;
        }
        
        // Actualizar el contador cada segundo
        setInterval(updateCountdown, 1000);
    }
    
    // Inicializar el contador cuando el DOM esté cargado
    initCountdown();
    
    // Seleccionar todas las pestañas de servicios
    const servicioTabs = document.querySelectorAll('.servicio-tab');
    const servicioContents = document.querySelectorAll('.servicio-content-wrapper');
    
    // Añadir evento click a cada pestaña
    servicioTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Obtener el servicio seleccionado
            const servicio = this.getAttribute('data-servicio');
            
            // Remover clase 'active' de todas las pestañas
            servicioTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase 'active' a la pestaña seleccionada
            this.classList.add('active');
            
            // Remover clase 'active' de todos los contenidos
            servicioContents.forEach(content => {
                content.classList.remove('active');
            });
            
            // Añadir clase 'active' al contenido correspondiente
            document.querySelector(`.servicio-content-wrapper[data-servicio="${servicio}"]`).classList.add('active');
        });
    });
    
    // Seleccionar todas las pestañas de tiers
    const tierTabs = document.querySelectorAll('.tier-tab');
    const tierInfos = document.querySelectorAll('.tier-info');
    const tierPrices = document.querySelectorAll('.precio-compacto');
    const tierDetalles = document.querySelectorAll('.tier-detalle-compacto');
    
    // Añadir evento click a cada pestaña de tier
    tierTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Obtener el tier seleccionado
            const tier = this.getAttribute('data-tier');
            
            // Remover clase 'active' de todas las pestañas
            tierTabs.forEach(t => t.classList.remove('active'));
            
            // Añadir clase 'active' a la pestaña seleccionada
            this.classList.add('active');
            
            // Remover clase 'active' de todas las descripciones
            tierInfos.forEach(info => {
                info.classList.remove('active');
            });
            
            // Añadir clase 'active' a la descripción correspondiente
            document.querySelector(`.tier-info.${tier}`).classList.add('active');
            
            // Remover clase 'active' de todos los precios
            tierPrices.forEach(price => {
                price.classList.remove('active');
            });
            
            // Añadir clase 'active' a los precios correspondientes
            document.querySelectorAll(`.precio-compacto.tier-price.${tier}`).forEach(price => {
                price.classList.add('active');
            });
            
            // Remover clase 'active' de todos los detalles
            tierDetalles.forEach(detalle => {
                detalle.classList.remove('active');
            });
            
            // Añadir clase 'active' a los detalles correspondientes
            document.querySelectorAll(`.tier-detalle-compacto.${tier}`).forEach(detalle => {
                detalle.classList.add('active');
            });
        });
    });

    // Tooltips
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    
    tooltipTriggers.forEach(trigger => {
        const tooltip = trigger.querySelector('.tooltip');
        
        trigger.addEventListener('mouseenter', () => {
            tooltip.classList.add('visible');
        });
        
        trigger.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visible');
        });
    });
});
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
        if (window.innerWidth <= 768 && navMenu && navMenu.classList.contains('active')) {
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
    // ANIMACIONES AL SCROLL - MEJORADAS
    // =========================================================================
    
    function initScrollAnimations() {
        // Marcar inmediatamente los elementos críticos
        const criticalSections = [
            '#servicios .fade-in',
            '#home .fade-in',
            '.hero-content',
            '.hero-image',
            '.seccion-titulo',
            '.servicios-tabs-container',
            '.servicios-content-container',
            '.oferta-especial',
            '.servicios-garantia'
        ];
        
        criticalSections.forEach(selector => {
            document.querySelectorAll(selector).forEach(el => {
                if (!el.classList.contains('visible')) {
                    el.classList.add('visible');
                }
            });
        });
        
        // Actualizar el IntersectionObserver para ser más sensible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Considerar elementos parcialmente visibles o que están por entrar en la pantalla
                if (entry.isIntersecting || entry.intersectionRatio > 0) {
                    entry.target.classList.add('visible');
                    // Dejar de observar después de hacer visible
                    observer.unobserve(entry.target);
                    console.log('Elemento hecho visible por el observer:', entry.target);
                }
            });
        }, { 
            // Configuración más sensible
            threshold: 0.01,  // Detectar con solo 1% visible
            rootMargin: '0px 0px -10% 0px' // Considerar elementos casi visibles
        });
        
        // Observar todos los elementos fade-in excepto los ya procesados
        document.querySelectorAll('.fade-in:not(.visible)').forEach(element => {
            observer.observe(element);
        });
    }
    
    // =========================================================================
    // ANIMACIÓN DE MÉTRICAS - MEJORADA
    // =========================================================================
    
    function initMetricAnimations() {
        // Hacer visibles las métricas inmediatamente
        document.querySelectorAll('.metric-after').forEach(metric => {
            metric.classList.add('animated');
            metric.style.opacity = '1';
            
            // Obtener y mostrar el valor final
            const targetValue = metric.getAttribute('data-value');
            if (targetValue) {
                metric.textContent = targetValue;
            }
        });
        
        // Mantener el observer como respaldo
        const metricObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const metric = entry.target;
                    metric.classList.add('animated');
                    metric.style.opacity = '1';
                    
                    // Obtener y mostrar el valor final
                    const targetValue = metric.getAttribute('data-value');
                    if (targetValue) {
                        metric.textContent = targetValue;
                    }
                    
                    // Dejar de observar
                    metricObserver.unobserve(metric);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -10% 0px'
        });
        
        // Observar solo métricas que aún no estén animadas
        document.querySelectorAll('.metric-after:not(.animated)').forEach(metric => {
            metricObserver.observe(metric);
        });
    }
    
    // =========================================================================
    // INICIALIZACIÓN DEL SELECTOR DE TIERS Y SERVICIOS
    // =========================================================================
    
    /**
     * Función para inicializar la interacción con los tiers de servicio
     * @returns {void}
     */
    function initTierSelector() {
        // Selector de tiers en la sección principal
        const tierTabs = document.querySelectorAll('.tier-tab');
        
        tierTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Desactivar todos los tabs
                tierTabs.forEach(t => t.classList.remove('active'));
                
                // Activar el tab seleccionado
                tab.classList.add('active');
                
                // Obtener el tier seleccionado (starter, pro, elite)
                const tier = tab.getAttribute('data-tier');
                
                // Actualizar la descripción del tier
                document.querySelectorAll('.tier-info').forEach(info => {
                    info.classList.remove('active');
                    if (info.classList.contains(tier)) {
                        info.classList.add('active');
                    }
                });
                
                // Actualizar los precios mostrados
                document.querySelectorAll('.tier-price').forEach(price => {
                    price.classList.remove('active');
                });
                document.querySelectorAll(`.tier-price.${tier}`).forEach(price => {
                    price.classList.add('active');
                });
                
                // Actualizar las características mostradas en la nueva estructura
                document.querySelectorAll('.servicios-tabla, .servicios-tabla-compacta').forEach(tabla => {
                    // Ocultar todos los detalles de tier
                    tabla.querySelectorAll('.tier-detalle, .tier-detalle-compacto').forEach(detalle => {
                        detalle.style.display = 'none';
                        detalle.classList.remove('active');
                    });
                    
                    // Mostrar solo los detalles del tier seleccionado
                    tabla.querySelectorAll(`.tier-detalle.${tier}, .tier-detalle-compacto.${tier}`).forEach(detalle => {
                        detalle.style.display = 'flex';
                        detalle.classList.add('active');
                        
                        // Añadir una pequeña animación de entrada
                        detalle.style.animation = 'none';
                        setTimeout(() => {
                            detalle.style.animation = 'fadeIn 0.3s ease-in-out forwards';
                        }, 10);
                    });
                });

                // Actualizar tabs de servicios para el nuevo diseño compacto
                document.querySelectorAll('.servicio-tab').forEach(serviceTab => {
                    serviceTab.classList.remove('active');
                });
                document.querySelector('.servicio-tab[data-servicio="meta"]').classList.add('active');
                
                // Mostrar solo el primer servicio al cambiar de tier
                document.querySelectorAll('.servicio-content-wrapper').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelector('.servicio-content-wrapper[data-servicio="meta"]').classList.add('active');
            });
        });
        
        // Inicialización - mostrar solo características del tier starter por defecto
        document.querySelectorAll('.servicios-tabla, .servicios-tabla-compacta').forEach(tabla => {
            tabla.querySelectorAll('.tier-detalle, .tier-detalle-compacto').forEach(detalle => {
                if (!detalle.classList.contains('starter')) {
                    detalle.style.display = 'none';
                    detalle.classList.remove('active');
                } else {
                    detalle.style.display = 'flex';
                    detalle.classList.add('active');
                }
            });
        });

        // Inicializar mostrando solo la descripción del tier starter
        document.querySelector('.tier-info.starter').classList.add('active');
        
        // Inicializar tabs de servicios para el diseño compacto
        initServiceTabs();
        
        // Inicializar tooltips
        initTooltips();
    }

    // Función para inicializar tabs de servicios para el diseño compacto
    function initServiceTabs() {
        const serviceTabs = document.querySelectorAll('.servicio-tab');
        
        serviceTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Desactivar todos los tabs
                serviceTabs.forEach(t => t.classList.remove('active'));
                
                // Activar el tab seleccionado
                tab.classList.add('active');
                
                // Obtener el servicio seleccionado
                const servicio = tab.getAttribute('data-servicio');
                
                // Mostrar solo el contenido del servicio seleccionado
                document.querySelectorAll('.servicio-content-wrapper').forEach(content => {
                    content.classList.remove('active');
                });
                document.querySelector(`.servicio-content-wrapper[data-servicio="${servicio}"]`).classList.add('active');
            });
        });
        
        // Inicializar mostrando el primer servicio
        if (document.querySelector('.servicio-tab[data-servicio="meta"]')) {
            document.querySelector('.servicio-tab[data-servicio="meta"]').classList.add('active');
            document.querySelector('.servicio-content-wrapper[data-servicio="meta"]')?.classList.add('active');
        }
    }

    // Selector de tiers mini en la sección proceso (si existe)
    function initTierSelectorMini() {
        const tierOptionsMini = document.querySelectorAll('.tier-option');
        if (!tierOptionsMini.length) return;
        
        tierOptionsMini.forEach(option => {
            option.addEventListener('click', () => {
                tierOptionsMini.forEach(o => o.classList.remove('active'));
                option.classList.add('active');
                
                const tier = option.getAttribute('data-tier');
                
                document.querySelectorAll('.tier-mini').forEach(price => {
                    price.classList.remove('active');
                });
                document.querySelector(`.tier-mini.${tier}`).classList.add('active');
            });
        });
    }
    
    // Inicializar tooltips para características
    function initTooltips() {
        const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
        
        tooltipTriggers.forEach(trigger => {
            trigger.addEventListener('mouseenter', () => {
                const tooltip = trigger.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.classList.add('visible');
                }
            });
            
            trigger.addEventListener('mouseleave', () => {
                const tooltip = trigger.querySelector('.tooltip');
                if (tooltip) {
                    tooltip.classList.remove('visible');
                }
            });
        });
    }
    
    /**
     * Actualizar el precio de la oferta especial basado en los nuevos precios de los planes
     */
    function updateSpecialOffer() {
        // El nuevo precio paquete es 4 servicios Elite a $999 con descuento
        const regularPrice = 299 * 4; // $1,196
        const discountedPrice = 1000; // Precio con descuento
        const savings = regularPrice - discountedPrice;
        
        // Actualizar texto de ahorro si existe el elemento
        const ofertaEspecial = document.querySelector('.oferta-especial h3');
        if (ofertaEspecial) {
            ofertaEspecial.innerHTML = `¡Ahorrá $${savings}/mes! Contratá los 4 servicios por solo <span class="precio-destacado">US$${discountedPrice}/mes</span> (valor real $${regularPrice})`;
        }
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
    
    // Remover clase preload inmediatamente
    document.body.classList.remove('preload');
    
    // Inicializar componentes de la interfaz
    initNavbar();
    initScrollAnimations();
    initMetricAnimations();
    initTierSelector();
    initTierSelectorMini();
    updateSpecialOffer();
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
        
        // Último respaldo para hacer todos los elementos visibles
        asegurarVisibilidadCritica();
        
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
    
    // =========================================================================
    // EXPORTAR FUNCIONES GLOBALES
    // =========================================================================
    
    // Exponer funciones públicas para acceso desde otros scripts
    window.OrangeVaporApp = {
        updateHeaderState,
        closeMobileMenu,
        asegurarVisibilidadCritica,
        initTierSelector,
        initServiceTabs,
        initTooltips
    };
});

// JavaScript para controlar el comportamiento del navbar al hacer scroll
document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const navbarHeight = header ? header.offsetHeight : 0;
    
    // Función que se ejecuta al hacer scroll
    const handleScroll = () => {
        // Obtener la posición actual del scroll
        const scrollPosition = window.scrollY;
        
        if (!header) return;
        
        // Si hemos bajado más que la altura del navbar, hacerlo sticky
        if (scrollPosition > navbarHeight) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    };
    
    // Agregar el evento de scroll
    window.addEventListener('scroll', handleScroll);
    
    // Ejecutar una vez al cargar para establecer el estado inicial
    handleScroll();
});
