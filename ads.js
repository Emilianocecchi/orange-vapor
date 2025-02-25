/**
 * Orange Vapor - Ads Landing Page
 * JavaScript Específico para la landing page de Meta Ads
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
    scrollTopBtn.style.backgroundColor = '#1877f2';
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
    
    // Contador de disponibilidad para oferta especial
    let availableSpots = 5; // Número total de spots disponibles
    let spotsRemaining = 3; // Spots que quedan (5 - 2 ya ocupados)
    const ofertaTag = document.querySelector('.oferta-tag');
    
    if (ofertaTag) {
        // Mostrar spots disponibles
        updateOfertaTag();
        
        // Función para actualizar el contador de ofertas
        function updateOfertaTag() {
            if (spotsRemaining > 0) {
                ofertaTag.innerHTML = `<i class="fas fa-tag"></i> Precio especial para primeros 5 clientes <span class="spots-count">(${spotsRemaining} disponibles)</span>`;
            } else {
                ofertaTag.innerHTML = `<i class="fas fa-exclamation-circle"></i> ¡Oferta agotada! Precio regular`;
                ofertaTag.style.backgroundColor = '#f8f9fa';
                ofertaTag.style.color = '#666';
            }
        }
    }
    
    // Formulario de contacto específico para Ads
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
            
            // Verificar si quedan spots disponibles y decrementar
            if (spotsRemaining > 0) {
                spotsRemaining--;
                updateOfertaTag();
                
                // Mensaje personalizado según disponibilidad
                if (spotsRemaining > 0) {
                    alert(`¡Felicidades! Has asegurado tu lugar con precio especial. Solo quedan ${spotsRemaining} lugares disponibles. Te contactaremos dentro de las próximas 24 horas.`);
                } else {
                    alert('¡Felicidades! Has asegurado el último lugar con precio especial. Te contactaremos dentro de las próximas 24 horas.');
                }
            } else {
                alert('El precio especial ya no está disponible, pero nos pondremos en contacto contigo con el precio regular. Te contactaremos dentro de las próximas 24 horas.');
            }
            
            // Restablecer el formulario
            contactForm.reset();
            
            // Scroll hacia arriba
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Animación de elementos interactivos
    const problemaItems = document.querySelectorAll('.problema-item');
    problemaItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.problema-icon i');
            icon.style.transform = 'scale(1.2)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.problema-icon i');
            icon.style.transform = 'scale(1)';
        });
    });
    
    // Resaltar enlaces de navegación activos para esta landing page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'ads.html') {
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