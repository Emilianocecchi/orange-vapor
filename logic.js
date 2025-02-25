/**
 * Orange Vapor - JavaScript Principal
 * Añade interactividad y funcionalidades al sitio web
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // NAVEGACIÓN Y HEADER
    // =========================================================================
    
    // Header adhesivo (sticky) al hacer scroll
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
    
    // Toggle del menú móvil
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        mobileToggle.setAttribute('aria-expanded', 
            mobileToggle.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
        );
    });
    
    // Toggle del menú desplegable en móvil
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
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
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Gestión de enlaces activos mejorada
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
            document.querySelector('a[href="ads.html"]').classList.add('active');
            document.querySelector('.dropdown-toggle').classList.add('active');
        } else if (filename.includes('google-ads.html')) {
            document.querySelector('a[href="google-ads.html"]').classList.add('active');
            document.querySelector('.dropdown-toggle').classList.add('active');
        } else if (filename.includes('email-marketing.html')) {
            document.querySelector('a[href="email-marketing.html"]').classList.add('active');
            document.querySelector('.dropdown-toggle').classList.add('active');
        } else if (filename.includes('chatbot.html')) {
            document.querySelector('a[href="chatbot.html"]').classList.add('active');
            document.querySelector('.dropdown-toggle').classList.add('active');
        } else if (filename.includes('optimizacion-express.html')) {
            document.querySelector('a[href="optimizacion-express.html"]').classList.add('active');
        } else if (filename.includes('contacto.html')) {
            document.querySelector('a[href="contacto.html"]').classList.add('active');
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
    
    // Navegación suave (smooth scroll) para enlaces internos
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
    // FORMULARIO DE CONTACTO
    // =========================================================================
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            
            if (!nombre) {
                alert('Por favor, ingresa tu nombre.');
                return;
            }
            
            if (!email || !isValidEmail(email)) {
                alert('Por favor, ingresa un email válido.');
                return;
            }
            
            // Simulación de envío (reemplazar con tu lógica real de envío)
            // En un sitio real, aquí enviarías los datos mediante fetch o XMLHttpRequest
            
            // Mostrar mensaje de éxito
            alert('¡Gracias por contactarnos! Te responderemos a la brevedad.');
            
            // Restablecer el formulario
            contactForm.reset();
        });
    }
    
    // Función auxiliar para validar email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // =========================================================================
    // SLIDER DE TESTIMONIOS (si hay más de uno)
    // =========================================================================
    
    const testimonioSlider = document.querySelector('.testimonios-slider');
    const testimonioSlides = document.querySelectorAll('.testimonio-slide');
    
    if (testimonioSlider && testimonioSlides.length > 1) {
        let currentSlide = 0;
        
        // Ocultar todos los slides excepto el primero
        testimonioSlides.forEach((slide, index) => {
            if (index !== 0) {
                slide.style.display = 'none';
            }
        });
        
        // Función para cambiar de slide
        function changeSlide() {
            testimonioSlides[currentSlide].style.display = 'none';
            currentSlide = (currentSlide + 1) % testimonioSlides.length;
            testimonioSlides[currentSlide].style.display = 'grid';
        }
        
        // Cambiar slide cada 5 segundos
        setInterval(changeSlide, 5000);
    }
    
    // =========================================================================
    // INICIALIZACIÓN DE ELEMENTOS ADICIONALES
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
    });
});