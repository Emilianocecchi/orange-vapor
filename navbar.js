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
    
    // =========================================================================
    // FUNCIONES PRINCIPALES
    // =========================================================================
    
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
    
    // Gestión de enlaces activos basado en la URL actual
    function setActiveNavLinks() {
        const currentUrl = window.location.pathname;
        const filename = currentUrl.split('/').pop();
        
        // Resetear todos los enlaces
        document.querySelectorAll('.nav-link, .dropdown-item').forEach(link => {
            link.classList.remove('active');
        });
        
        // Activar enlace correspondiente
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
        
        window.addEventListener('scroll', setActiveNavLinkBySection);
    }
    
    // =========================================================================
    // NAVEGACIÓN SUAVE (SMOOTH SCROLL) PARA ENLACES INTERNOS
    // =========================================================================
    
    // Navegación suave para enlaces internos dentro del navbar
    document.querySelectorAll('#nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset más pequeño para asegurar que se vea el encabezado de la sección
                const navOffset = 80;
                
                window.scrollTo({
                    top: targetElement.offsetTop - navOffset,
                    behavior: 'smooth'
                });
                
                // Actualizar URL para reflejar la sección (mejora UX y permite compartir enlaces)
                history.pushState(null, null, targetId);
            }
        });
    });
});
