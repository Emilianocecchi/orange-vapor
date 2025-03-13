/**
 * Orange Vapor - Página de Contacto
 * JavaScript específico para la página de contacto
 * Versión optimizada
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // SISTEMA DE FAQ - ACCORDION
    // =========================================================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Cerrar otras preguntas abiertas
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Alternar estado actual
            item.classList.toggle('active');
        });
    });
    
    // =========================================================================
    // ANIMACIONES AL SCROLLEAR
    // =========================================================================
    const fadeElements = document.querySelectorAll('.contacto-page .fade-in');
    
    // Función para verificar si un elemento está en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    }
    
    // Función para manejar el scroll y animar elementos
    function handleScroll() {
        fadeElements.forEach(element => {
            if (isElementInViewport(element) && !element.classList.contains('visible')) {
                element.classList.add('visible');
            }
        });
    }
    
    // Animar elementos del hero inmediatamente
    fadeElements.forEach(element => {
        if (element.closest('#hero')) {
            setTimeout(() => {
                element.classList.add('visible');
            }, 300);
        }
    });
    
    // Ejecutar handleScroll una vez al cargar para animar elementos ya visibles
    handleScroll();
    
    // Agregar listener de scroll para animar elementos al hacer scroll
    window.addEventListener('scroll', handleScroll);
    
    // =========================================================================
    // NAVEGACIÓN SUAVE PARA ENLACES INTERNOS
    // =========================================================================
    document.querySelectorAll('.contacto-page a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            e.preventDefault();
            
            const headerOffset = 80; // Altura del header fijo
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    
    // =========================================================================
    // OPTIMIZACIÓN MOBILE
    // =========================================================================
    function setupMobileEnhancements() {
        if (window.innerWidth <= 768) {
            // Simplificar animaciones para mejor rendimiento
            document.body.classList.add('mobile-optimized');
            
            // Ajustar espaciado para elementos en mobile
            const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
            ctaButtons.forEach(button => {
                button.style.width = '100%';
                button.style.marginBottom = '10px';
            });
        } else {
            // Restaurar estilos para desktop
            document.body.classList.remove('mobile-optimized');
            
            const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
            ctaButtons.forEach(button => {
                button.style.width = '';
                button.style.marginBottom = '';
            });
        }
    }
    
    // Ejecutar ajustes mobile al cargar
    setupMobileEnhancements();
    
    // Reconfigurar en cambio de tamaño
    window.addEventListener('resize', setupMobileEnhancements);
    
    // =========================================================================
    // VERIFICACIÓN DE FORMULARIO
    // =========================================================================
    // Listener para cuando el formulario de HubSpot esté cargado
    window.addEventListener('message', function(event) {
        if (event.data.type === 'hsFormCallback' && event.data.eventName === 'onFormReady') {
            console.log('Formulario de HubSpot cargado correctamente');
            
            // Agregar clases personalizadas si es necesario
            const formContainer = document.querySelector('.hs-form-frame');
            if (formContainer) {
                formContainer.classList.add('form-loaded');
            }
        }
    });
});
