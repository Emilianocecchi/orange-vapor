/**
 * Orange Vapor - Funcionalidad específica de la página de contacto
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
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                    otherItem.querySelector('.faq-answer').style.padding = '0 1.5rem';
                }
            });
            
            // Alternar estado actual
            const isActive = item.classList.contains('active');
            
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = '0';
                answer.style.padding = '0 1.5rem';
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.padding = '0 1.5rem 1.5rem';
            }
        });
    });

    // Manejo de animaciones al scroll
    function handleScrollAnimations() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight * 0.85) {
                element.classList.add('visible');
            }
        });
    }
    
    // Inicializar animaciones
    window.addEventListener('scroll', handleScrollAnimations);
    
    // Llamar una vez para animar elementos visibles inicialmente
    setTimeout(handleScrollAnimations, 100);
    
    // Animación inmediata para elementos del hero
    const heroElements = document.querySelectorAll('#hero .fade-in');
    setTimeout(() => {
        heroElements.forEach(element => {
            element.classList.add('visible');
        });
    }, 300);

    // Scroll suave para enlaces internos
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
                
                // Actualizar URL (opcional)
                history.pushState(null, null, targetId);
            }
        });
    });
});
