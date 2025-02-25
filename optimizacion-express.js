/**
 * Orange Vapor - Optimización Express
 * JavaScript Específico para la landing page de Optimización Express
 */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar todos los otros items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            item.classList.toggle('active');
        });
    });
    
    // Activar el primer FAQ por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
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
    scrollTopBtn.style.backgroundColor = 'var(--naranja-principal)';
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
    
    // Simular escasez con contador decreciente
    let availableSpots = 1; // 3 spots totales - 2 ya ocupados
    const spotsLabel = document.querySelector('.spots-label span:last-child');
    const spotsBar = document.querySelector('.spots-bar');
    
    function updateSpots() {
        if (availableSpots > 0) {
            spotsLabel.textContent = `${3 - availableSpots} spots ocupados`;
            spotsBar.style.width = `${((3 - availableSpots) / 3) * 100}%`;
        } else {
            spotsLabel.textContent = `¡TODOS LOS SPOTS OCUPADOS!`;
            spotsBar.style.width = '100%';
            
            // Actualizar CTA y añadir lista de espera
            const ctaButtons = document.querySelectorAll('.pulse-button');
            ctaButtons.forEach(button => {
                button.textContent = 'UNIRSE A LISTA DE ESPERA';
                button.classList.remove('pulse-button');
            });
        }
    }
    
    // Formulario de contacto específico para Optimización Express
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validación básica del formulario
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const plataforma = document.getElementById('plataforma').value;
            const presupuesto = document.getElementById('presupuesto').value;
            
            if (!nombre || !email || !telefono || !plataforma || !presupuesto) {
                alert('Por favor, completa todos los campos requeridos.');
                return;
            }
            
            // Verificar si quedan spots disponibles
            if (availableSpots <= 0) {
                alert('¡Lo sentimos! Todos los spots están ocupados actualmente. Te añadiremos a nuestra lista de espera y te contactaremos en cuanto haya disponibilidad.');
            } else {
                // Disminuir spots disponibles
                availableSpots--;
                updateSpots();
                
                // Mensaje de éxito
                alert('¡Felicidades! Has asegurado tu lugar. Te contactaremos dentro de las próximas 24 horas para coordinar tu auditoría gratuita.');
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
    
    // Resaltar enlaces de navegación activos para esta landing page
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === 'optimizacion-express.html') {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});