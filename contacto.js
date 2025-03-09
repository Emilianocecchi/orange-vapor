/**
 * Orange Vapor - Página de Contacto
 * JavaScript específico para la página de contacto
 */

document.addEventListener('DOMContentLoaded', function() {
    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
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
    
    // Asegurar que las animaciones al scroll funcionen en esta página específica
    const contactoFadeElements = document.querySelectorAll('.contacto-page .fade-in');
    
    contactoFadeElements.forEach(element => {
        // Animar elementos del hero inmediatamente
        if (element.closest('#hero')) {
            setTimeout(() => {
                element.classList.add('visible');
            }, 300);
        }
    });
    
    // Scroll suave para enlaces internos específicos de contacto
    document.querySelectorAll('.contacto-page a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            const targetElement = document.querySelector(href);
            if (!targetElement) return;
            
            e.preventDefault();
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });
});
