/**
 * Orange Vapor - Google Ads Landing Page
 * JavaScript Específico para la landing page de Google Ads
 */

document.addEventListener('DOMContentLoaded', function() {
    // Tabs de Servicios
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remover clases activas
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            // Activar tab actual
            const tabId = this.getAttribute('data-tab');
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
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
    scrollTopBtn.style.backgroundColor = '#4285F4'; // Azul de Google
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
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const empresa = document.getElementById('empresa').value.trim();
            
            if (!nombre || !email || !telefono || !empresa) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Mensaje de éxito personalizado según selección
            const situacion = document.getElementById('situacion').value;
            let mensaje = '¡Gracias por contactarnos! ';
            
            switch(situacion) {
                case 'no-uso':
                    mensaje += 'Te enviaremos información sobre cómo Google Ads puede ayudar a tu negocio a crecer.';
                    break;
                case 'gestion-propia':
                    mensaje += 'Analizaremos tu cuenta actual y te sugeriremos mejoras específicas.';
                    break;
                case 'otra-agencia':
                    mensaje += 'Te mostraremos cómo podemos superar los resultados que estás obteniendo actualmente.';
                    break;
                case 'in-house':
                    mensaje += 'Te contactaremos para discutir cómo podemos complementar las capacidades de tu equipo interno.';
                    break;
                default:
                    mensaje += 'Nos pondremos en contacto contigo en las próximas 24 horas.';
            }
            
            alert(mensaje);
            
            // Restablecer el formulario
            contactForm.reset();
            
            // Scroll hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animaciones al scroll
    const animateElements = document.querySelectorAll('.ventaja-item, .desafio-item, .enfoque-paso, .precio-card');
    
    animateElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Resaltar enlaces de navegación activos para esta landing page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'google-ads.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
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
});