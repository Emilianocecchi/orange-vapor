/**
 * Orange Vapor - Chatbot Landing Page
 * JavaScript específico para la landing page de Chatbot
 */

document.addEventListener('DOMContentLoaded', function() {
    // =========================================================================
    // FUNCIONES AUXILIARES
    // =========================================================================
    
    // Función para hacer scroll suave a elementos
    function scrollToElement(elementId, offset = 80) {
        const element = document.querySelector(elementId);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            
            // Actualizar URL para reflejar la sección
            history.pushState(null, null, elementId);
        }
    }
    
    // Función para comprobar si un elemento es visible
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight * 0.9) &&
            rect.bottom >= 0
        );
    }
    
    // =========================================================================
    // ANIMACIONES DE ENTRADA
    // =========================================================================
    
    // Mostrar/ocultar elementos con fade-in al hacer scroll
    function checkVisibility() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }
    
    // Verificar la visibilidad inicial
    checkVisibility();
    
    // Verificar la visibilidad al hacer scroll
    window.addEventListener('scroll', checkVisibility);
    
    // =========================================================================
    // BOTÓN DE VOLVER ARRIBA
    // =========================================================================
    
    // Crear botón de "Volver arriba"
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollTopBtn.style.display = 'none';
    scrollTopBtn.style.position = 'fixed';
    scrollTopBtn.style.bottom = '100px';
    scrollTopBtn.style.right = '20px';
    scrollTopBtn.style.backgroundColor = '#6f42c1';
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
    document.body.appendChild(scrollTopBtn);
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostrar/ocultar botón según la posición del scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    // =========================================================================
    // MEJORA DEL HEADER
    // =========================================================================
    
    // Mejorar el header al hacer scroll
    const header = document.getElementById('header');
    
    function updateHeaderState() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
    
    // Inicializar el estado del header
    updateHeaderState();
    
    // Actualizar el header al hacer scroll
    window.addEventListener('scroll', updateHeaderState);
    
    // =========================================================================
    // SECCIÓN FAQ
    // =========================================================================
    
    // Interactividad para la sección de FAQs
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
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
    
    // =========================================================================
    // NAVEGACIÓN INTERNA
    // =========================================================================
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            scrollToElement(targetId);
        });
    });
    
    // =========================================================================
    // INTERACCIONES UI
    // =========================================================================
    
    // Animación para tarjetas de beneficios
    document.querySelectorAll('.beneficio-chatbot-card, .plataforma-card, .uso-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Animación para resultados de clientes
    document.querySelectorAll('.resultado-story').forEach(story => {
        story.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 12px 25px rgba(111, 66, 193, 0.15)';
        });
        
        story.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });
    
    // Hover efectos para el CTA flotante
    const ctaFlotante = document.querySelector('.btn-flotante');
    if (ctaFlotante) {
        ctaFlotante.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(111, 66, 193, 0.25)';
        });
        
        ctaFlotante.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 8px 15px rgba(111, 66, 193, 0.2)';
        });
    }
    
    // =========================================================================
    // ANIMACIÓN DE MÉTRICAS Y NÚMEROS
    // =========================================================================
    
    // Animación para las métricas cuando son visibles
    function animateMetric(element, value, duration = 1500) {
        const startValue = 0;
        const targetValue = parseFloat(value);
        let startTime = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cúbico
            
            const currentValue = startValue + (targetValue - startValue) * easedProgress;
            
            if (Number.isInteger(targetValue)) {
                element.textContent = Math.round(currentValue);
            } else {
                element.textContent = currentValue.toFixed(1);
            }
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Observer para las estadísticas
    const statsElements = document.querySelectorAll('.estadistica-numero');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const value = element.textContent;
                
                // No animar para valores con caracteres no numéricos como "24/7"
                if (value.match(/^[\d.]+$/)) {
                    animateMetric(element, value);
                }
                
                statsObserver.unobserve(element);
            }
        });
    }, { threshold: 0.3 });
    
    // Observar elementos de estadística
    statsElements.forEach(element => {
        statsObserver.observe(element);
    });
    
    // Observer para las métricas de resultados
    const metricElements = document.querySelectorAll('.metric-after');
    const metricObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const value = element.getAttribute('data-value');
                
                // Extraer número si existe (por ejemplo, obtener 32 de "32%")
                const numMatch = value.match(/(\d+(\.\d+)?)/);
                if (numMatch) {
                    const originalText = element.textContent;
                    const originalNum = numMatch[0];
                    
                    // Animar solo la parte numérica manteniendo el resto del texto
                    const before = value.substring(0, value.indexOf(originalNum));
                    const after = value.substring(value.indexOf(originalNum) + originalNum.length);
                    
                    animateMetric({
                        textContent: 0,
                        set textContent(val) {
                            element.textContent = before + val + after;
                        }
                    }, parseFloat(originalNum));
                }
                
                metricObserver.unobserve(element);
            }
        });
    }, { threshold: 0.3 });
    
    // Observar elementos de métrica
    metricElements.forEach(element => {
        metricObserver.observe(element);
    });
    
    // =========================================================================
    // DEMO DE CHATBOT
    // =========================================================================
    
    // Simular interacción del chatbot demo
    const chatOptions = document.querySelectorAll('.chat-options .option');
    const chatBody = document.querySelector('.chat-body');
    const chatInput = document.querySelector('.chat-input input');
    const sendBtn = document.querySelector('.send-btn');
    
    // Agregar interacción a las opciones del chat
    chatOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Crear mensaje de usuario
            const userMessage = document.createElement('div');
            userMessage.className = 'chat-message user';
            userMessage.innerHTML = `
                <div class="message-bubble">${this.textContent}</div>
                <div class="message-time">${getCurrentTime()}</div>
            `;
            chatBody.appendChild(userMessage);
            
            // Ocultar opciones actuales
            this.parentElement.style.display = 'none';
            
            // Scroll al final
            chatBody.scrollTop = chatBody.scrollHeight;
            
            // Mostrar respuesta después de un breve retraso
            setTimeout(() => {
                let response = '';
                
                if (this.textContent === 'Más detalles') {
                    response = 'El servicio premium incluye atención 24/7, integración con WhatsApp, sitio web y CRM, así como reportes semanales y personalización avanzada. ¿Te gustaría agendar una demo personalizada?';
                } else {
                    response = '¡Perfecto! Podemos agendar una demo sin costo ni compromiso. Completá el formulario en nuestra sección de contacto y te contactaremos en menos de 24 horas.';
                }
                
                // Crear mensaje del bot
                const botMessage = document.createElement('div');
                botMessage.className = 'chat-message bot';
                botMessage.innerHTML = `
                    <div class="message-bubble">${response}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                `;
                chatBody.appendChild(botMessage);
                
                // Si hay nuevas opciones, mostrarlas
                if (this.textContent === 'Más detalles') {
                    const newOptions = document.createElement('div');
                    newOptions.className = 'chat-options';
                    newOptions.innerHTML = `
                        <div class="option">Agendar demo</div>
                        <div class="option">Ver precios</div>
                    `;
                    chatBody.appendChild(newOptions);
                    
                    // Agregar evento a las nuevas opciones
                    newOptions.querySelectorAll('.option').forEach(opt => {
                        opt.addEventListener('click', function() {
                            // Repetir proceso similar al anterior
                            const userMsg = document.createElement('div');
                            userMsg.className = 'chat-message user';
                            userMsg.innerHTML = `
                                <div class="message-bubble">${this.textContent}</div>
                                <div class="message-time">${getCurrentTime()}</div>
                            `;
                            chatBody.appendChild(userMsg);
                            
                            // Ocultar estas opciones
                            this.parentElement.style.display = 'none';
                            
                            // Scroll al final
                            chatBody.scrollTop = chatBody.scrollHeight;
                            
                            // Respuesta final que lleva a contacto
                            setTimeout(() => {
                                const finalMsg = document.createElement('div');
                                finalMsg.className = 'chat-message bot';
                                finalMsg.innerHTML = `
                                    <div class="message-bubble">Podés ver toda la información y solicitar tu demo gratuita en la sección de contacto de esta página. ¡Será un placer ayudarte!</div>
                                    <div class="message-time">${getCurrentTime()}</div>
                                `;
                                chatBody.appendChild(finalMsg);
                                chatBody.scrollTop = chatBody.scrollHeight;
                            }, 800);
                        });
                    });
                }
                
                // Scroll al final
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 800);
        });
    });
    
    // Simular enviando un mensaje al hacer clic en el botón de enviar
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            if (chatInput.value.trim() !== '') {
                // Crear mensaje de usuario
                const userMessage = document.createElement('div');
                userMessage.className = 'chat-message user';
                userMessage.innerHTML = `
                    <div class="message-bubble">${chatInput.value}</div>
                    <div class="message-time">${getCurrentTime()}</div>
                `;
                chatBody.appendChild(userMessage);
                
                // Limpiar input
                chatInput.value = '';
                
                // Scroll al final
                chatBody.scrollTop = chatBody.scrollHeight;
                
                // Respuesta automática
                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.className = 'chat-message bot';
                    botMessage.innerHTML = `
                        <div class="message-bubble">Gracias por tu mensaje. En un caso real, nuestro chatbot entrenado responderá a tus preguntas específicas. ¿Te gustaría agendar una demo para ver cómo funciona en tu negocio?</div>
                        <div class="message-time">${getCurrentTime()}</div>
                    `;
                    chatBody.appendChild(botMessage);
                    
                    // Agregar opciones
                    const options = document.createElement('div');
                    options.className = 'chat-options';
                    options.innerHTML = `
                        <div class="option">Sí, quiero una demo</div>
                        <div class="option">No por ahora</div>
                    `;
                    chatBody.appendChild(options);
                    
                    // Scroll al final
                    chatBody.scrollTop = chatBody.scrollHeight;
                    
                    // Agregar evento a las nuevas opciones
                    options.querySelectorAll('.option').forEach(opt => {
                        opt.addEventListener('click', function() {
                            // Similar a la lógica anterior
                            const userMsg = document.createElement('div');
                            userMsg.className = 'chat-message user';
                            userMsg.innerHTML = `
                                <div class="message-bubble">${this.textContent}</div>
                                <div class="message-time">${getCurrentTime()}</div>
                            `;
                            chatBody.appendChild(userMsg);
                            
                            // Ocultar opciones
                            this.parentElement.style.display = 'none';
                            
                            // Scroll al final
                            chatBody.scrollTop = chatBody.scrollHeight;
                            
                            // Respuesta final
                            setTimeout(() => {
                                let finalResponse = '';
                                if (this.textContent === 'Sí, quiero una demo') {
                                    finalResponse = 'Excelente decisión. Agendá tu demo gratuita ahora mismo en nuestra sección de contacto.';
                                    
                                    // Scroll hacia la sección de contacto después de 1 segundo
                                    setTimeout(() => {
                                        scrollToElement('#contacto');
                                    }, 1000);
                                } else {
                                    finalResponse = 'Entendido. Cuando estés listo para explorar cómo un chatbot puede transformar tu negocio, estamos a tu disposición.';
                                }
                                
                                const finalMsg = document.createElement('div');
                                finalMsg.className = 'chat-message bot';
                                finalMsg.innerHTML = `
                                    <div class="message-bubble">${finalResponse}</div>
                                    <div class="message-time">${getCurrentTime()}</div>
                                `;
                                chatBody.appendChild(finalMsg);
                                chatBody.scrollTop = chatBody.scrollHeight;
                            }, 800);
                        });
                    });
                }, 800);
            }
        });
        
        // Permitir enviar mensaje con Enter
        chatInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendBtn.click();
            }
        });
    }
    
    // Función auxiliar para obtener la hora actual formateada
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        
        // Formatear como 08:05 en lugar de 8:5
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return hours + ':' + minutes;
    }
    
    // =========================================================================
    // INICIALIZACIÓN Y VERIFICACIÓN FINAL
    // =========================================================================
    
    // Verificar si hay un hash en la URL para navegar directamente
    if (window.location.hash) {
        setTimeout(() => {
            scrollToElement(window.location.hash);
        }, 500);
    }
    
    // Detectar cuando el sitio está completamente cargado
    window.addEventListener('load', function() {
        // Eliminar cualquier clase de precarga
        document.body.classList.remove('preload');
        
        // Volver a verificar la visibilidad de elementos
        checkVisibility();
        
        // Agregar efecto pulsante al CTA principal
        const mainCta = document.querySelector('.chatbot-hero-btn');
        if (mainCta) {
            setTimeout(() => {
                mainCta.classList.add('pulse');
            }, 1500);
        }
    });
});
