/**
 * Orange Vapor - Navbar Module
 * Script independiente para la funcionalidad del navbar
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // ELEMENTOS DEL DOM
    // =========================================================================
    const header = document.getElementById('header');
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.querySelector('.logo');
    const logoText = document.querySelector('.logo-text');
    const logoInitials = document.querySelector('.logo-initials');
    const ctaButton = document.querySelector('.nav-cta .btn');
    
    // =========================================================================
    // FUNCIONES PRINCIPALES
    // =========================================================================
    
    // Header adhesivo (sticky) al hacer scroll con animación mejorada
    function updateHeaderState() {
        const scrollPosition = window.scrollY;
        
        // Transición principal: sticky header y animación del logo
        if (scrollPosition > 50) {
            if (!header.classList.contains('sticky')) {
                header.classList.add('sticky');
                
                // Añadir efecto de transición al logo
                if (logo) {
                    logo.classList.add('logo-transition');
                    
                    // Efecto de enfoque en CTA después de scrollear
                    if (ctaButton && !ctaButton.classList.contains('pulse-btn')) {
                        setTimeout(() => {
                            ctaButton.classList.add('pulse-btn');
                        }, 500);
                    }
                }
            }
        } else {
            if (header.classList.contains('sticky')) {
                header.classList.remove('sticky');
                
                // Quitar efectos de transición
                if (logo) {
                    logo.classList.remove('logo-transition');
                }
                
                // Remover animación del CTA
                if (ctaButton) {
                    ctaButton.classList.remove('pulse-btn');
                }
            }
        }
        
        // Efecto de paralaje sutil en el logo durante el scroll inicial
        if (logoText && logoInitials && scrollPosition <= 80) {
            const parallaxSpeed = 0.05;
            const parallaxOffset = scrollPosition * parallaxSpeed;
            
            // Efecto sutil de movimiento mientras se hace scroll
            logoText.style.transform = `translateY(${-parallaxOffset}px)`;
        }
    }
    
    // Inicializar el estado del header al cargar
    updateHeaderState();
    
    // Optimización de rendimiento con requestAnimationFrame para scroll events
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (!scrollTimeout) {
            scrollTimeout = window.requestAnimationFrame(function() {
                updateHeaderState();
                scrollTimeout = null;
            });
        }
    });
    
    // Toggle del menú móvil con animación mejorada
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Actualizar aria-expanded para accesibilidad
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            // Bloquear scroll en el body cuando el menú está abierto en móvil
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
    }
    
    // Toggle del menú desplegable en móvil con animación mejorada
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                
                const dropdown = this.parentElement;
                const dropdownMenu = this.nextElementSibling;
                const icon = this.querySelector('i');
                
                // Toggle de la clase active
                dropdown.classList.toggle('active');
                
                // Animación del icono
                if (dropdown.classList.contains('active')) {
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
            // No cerrar si es un dropdown toggle en móvil
            if (this.classList.contains('dropdown-toggle') && window.innerWidth <= 768) {
                return;
            }
            
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                
                if (mobileToggle) {
                    mobileToggle.classList.remove('active');
                    mobileToggle.setAttribute('aria-expanded', 'false');
                }
                
                // Restaurar scroll
                document.body.style.overflow = '';
            }
        });
    });
    
    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        }
    });
    
    // Gestión de enlaces activos basado en la URL actual
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar enlace correspondiente según la página actual
        if (filename === '' || filename === 'index.html') {
            // En la home page, se maneja con el scroll
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
    
    // =========================================================================
    // NAVEGACIÓN ACTIVA POR SECCIONES (PARA PÁGINA PRINCIPAL)
    // =========================================================================
    
    // Si estamos en la página principal, actualizamos los enlaces activos al desplazarnos
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
        // Navegación activa según la sección visible (solo en la página principal)
        function setActiveNavLinkBySection() {
            const sections = document.querySelectorAll('section[id]');
            let current = '';
            
            // Identificar qué sección está actualmente visible
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            // Actualizar enlaces de navegación principal
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                const href = link.getAttribute('href');
                if (href) {
                    const sectionId = href.startsWith('#') ? href.substring(1) : href.split('#')[1];
                    if (sectionId === current) {
                        link.classList.add('active');
                    }
                }
            });
        }
        
        // Optimización con requestAnimationFrame
        let scrollAnimationFrame;
        window.addEventListener('scroll', function() {
            if (!scrollAnimationFrame) {
                scrollAnimationFrame = window.requestAnimationFrame(function() {
                    setActiveNavLinkBySection();
                    scrollAnimationFrame = null;
                });
            }
        });
    }
    
    // =========================================================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLL) PARA ENLACES INTERNOS
    // =========================================================================
    
    // Navegación suave para enlaces internos dentro del navbar
    document.querySelectorAll('#nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // No aplicar a los dropdowns en móvil
            if (targetId === '#' || (this.classList.contains('dropdown-toggle') && window.innerWidth <= 768)) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset para compensar la altura del header
                const headerHeight = header.offsetHeight;
                const navOffset = headerHeight + 20;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navOffset,
                    behavior: 'smooth'
                });
                
                // Actualizar URL para reflejar la sección
                history.pushState(null, null, targetId);
            }
        });
    });
    
    // =========================================================================
    // INTERACCIÓN CON EL BOTÓN CTA
    // =========================================================================
    
    // Mejorar interacción del botón CTA
    if (ctaButton) {
        // Detener animación de pulso al hover
        ctaButton.addEventListener('mouseenter', function() {
            if (this.classList.contains('pulse-btn')) {
                this.classList.remove('pulse-btn');
                this.dataset.wasAnimating = 'true';
            }
        });
        
        // Restaurar animación al quitar hover
        ctaButton.addEventListener('mouseleave', function() {
            if (this.dataset.wasAnimating === 'true' && window.scrollY > 50) {
                setTimeout(() => {
                    this.classList.add('pulse-btn');
                }, 1500);
            }
        });
        
        // Efecto de clic
        ctaButton.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        ctaButton.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
    }
    
    // =========================================================================
    // RESIZE HANDLER
    // =========================================================================
    
    // Manejar cambios de tamaño de ventana
    window.addEventListener('resize', function() {
        // Restaurar elementos si pasamos de móvil a desktop
        if (window.innerWidth > 768) {
            // Restaurar scroll
            document.body.style.overflow = '';
            
            // Resetear estado del botón móvil
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
            }
            
            // Resetear dropdowns
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
});
