/**
 * Orange Vapor - Contacto Landing Page
 * JavaScript Específico para la landing page de Contacto
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
    scrollTopBtn.style.backgroundColor = '#FF7E00';
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
    
    // Interactividad para los FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Comprobar si este FAQ ya está activo
            const isActive = item.classList.contains('active');
            
            // Cerrar todos los FAQs abiertos
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });
            
            // Si este FAQ no estaba activo, abrirlo
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
    
    // Abrir el primer FAQ por defecto
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
    }
    
    // Navegación suave para enlaces internos
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
    
    // Animación para los elementos benefits-card al hacer hover
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
            
            // Animar el ícono del beneficio
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
                icon.style.backgroundColor = 'rgba(255, 126, 0, 0.2)';
                icon.style.transition = 'all 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            
            // Restaurar el ícono del beneficio
            const icon = this.querySelector('.benefit-icon');
            if (icon) {
                icon.style.transform = 'scale(1)';
                icon.style.backgroundColor = 'rgba(255, 126, 0, 0.1)';
            }
        });
    });
    
    // Animación de entrada para elementos visibles
    function checkVisibility() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight * 0.9) { // Elemento visible al 90% del viewport
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar la visibilidad de los elementos al cargar la página
    checkVisibility();
    
    // Verificar la visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    
    // Verificar si HubSpot form está cargado
    function checkHubspotForm() {
        const hsFormFrame = document.querySelector('.hs-form-frame');
        if (hsFormFrame && typeof window.hbspt !== 'undefined') {
            console.log('HubSpot form is ready');
            
            // Si llegamos al formulario desde un enlace, enfocar el formulario
            if (window.location.hash === '#contacto-form') {
                setTimeout(() => {
                    const formIframe = hsFormFrame.querySelector('iframe');
                    if (formIframe) {
                        formIframe.focus();
                    }
                }, 1000);
            }
        }
    }
    
    // Verificar periódicamente si HubSpot form está listo
    let hubspotCheckInterval = setInterval(() => {
        checkHubspotForm();
        
        // Después de 5 segundos, detener la verificación
        setTimeout(() => {
            clearInterval(hubspotCheckInterval);
        }, 5000);
    }, 1000);
    
    // Animación para los enlaces de redes sociales
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) rotate(5deg)';
            this.style.backgroundColor = '#FF7E00';
            this.style.color = '#FFFFFF';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
            this.style.backgroundColor = 'rgba(255, 126, 0, 0.1)';
            this.style.color = '#FF7E00';
        });
    });
    
    // Mobile nav toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
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
    
    // Efecto pulsante para el botón principal en el hero
    function addPulseEffect() {
        const heroCta = document.querySelector('.hero-contacto .btn:not(.btn-outline)');
        if (heroCta) {
            heroCta.classList.add('pulse-effect');
            
            // Estilos para la animación de pulso
            const style = document.createElement('style');
            style.textContent = `
                @keyframes pulse-effect {
                    0% {
                        box-shadow: 0 0 0 0 rgba(255, 126, 0, 0.7);
                    }
                    70% {
                        box-shadow: 0 0 0 15px rgba(255, 126, 0, 0);
                    }
                    100% {
                        box-shadow: 0 0 0 0 rgba(255, 126, 0, 0);
                    }
                }
                
                .pulse-effect {
                    animation: pulse-effect 2s infinite;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    // Agregar efecto pulsante después de 1.5 segundos
    setTimeout(addPulseEffect, 1500);
    
    // Detectar cuando el sitio está completamente cargado
    window.addEventListener('load', function() {
        // Eliminar cualquier clase de precarga
        document.body.classList.remove('preload');
        
        // Volver a verificar la visibilidad de los elementos
        checkVisibility();
    });
});
