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
    scrollTopBtn.style.backgroundColor = '#00a4bd';
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
            
            if (!nombre || !email || !telefono) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Mensaje personalizado según tamaño de lista
            const tamanoLista = document.getElementById('tamano_lista').value;
            let mensaje = '¡Gracias por contactarnos! ';
            
            switch(tamanoLista) {
                case 'no_tengo':
                    mensaje += 'Te enseñaremos cómo comenzar a construir tu lista desde cero.';
                    break;
                case 'menos_1000':
                    mensaje += 'Te mostraremos cómo hacer crecer tu lista y obtener más conversiones.';
                    break;
                case 'mas_10000':
                    mensaje += 'Te ayudaremos a optimizar y segmentar tu gran lista para maximizar resultados.';
                    break;
                default:
                    mensaje += 'Analizaremos tu lista actual y te proporcionaremos estrategias personalizadas.';
            }
            
            alert(mensaje);
            
            // Restablecer el formulario
            contactForm.reset();
        });
    }
    
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