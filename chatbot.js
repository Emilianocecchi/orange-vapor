/**
 * Orange Vapor - Chatbot Landing Page
 * JavaScript Específico para la landing page de Chatbot
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
    
    // Añadir un chatbot de demostración (simulado)
    setTimeout(function() {
        // Crear el botón de chatbot
        const chatbotBtn = document.createElement('button');
        chatbotBtn.className = 'chatbot-demo-btn';
        chatbotBtn.innerHTML = '<i class="fas fa-comment"></i>';
        chatbotBtn.setAttribute('aria-label', 'Abrir demo de chatbot');
        document.body.appendChild(chatbotBtn);
        
        // Crear el contenedor del chatbot
        const chatbotContainer = document.createElement('div');
        chatbotContainer.className = 'chatbot-demo-container';
        chatbotContainer.style.display = 'none';
        
        // Cabecera del chatbot
        const chatbotHeader = document.createElement('div');
        chatbotHeader.className = 'chatbot-demo-header';
        chatbotHeader.innerHTML = `
            <div class="chatbot-title">
                <i class="fas fa-robot"></i> Chatbot Demo
            </div>
            <button class="chatbot-close"><i class="fas fa-times"></i></button>
        `;
        
        // Contenido del chatbot
        const chatbotContent = document.createElement('div');
        chatbotContent.className = 'chatbot-demo-content';
        chatbotContent.innerHTML = `
            <div class="chat-message bot">
                <p>👋 ¡Hola! Soy el chatbot de demostración de Orange Vapor. ¿En qué puedo ayudarte hoy?</p>
            </div>
            <div class="chat-options">
                <button class="chat-option">💡 ¿Qué son los chatbots?</button>
                <button class="chat-option">💰 ¿Cuánto cuesta un chatbot?</button>
                <button class="chat-option">🔧 ¿Cómo funciona?</button>
                <button class="chat-option">📞 Quiero hablar con un humano</button>
            </div>
        `;
        
        // Pie del chatbot
        const chatbotFooter = document.createElement('div');
        chatbotFooter.className = 'chatbot-demo-footer';
        chatbotFooter.innerHTML = `
            <input type="text" placeholder="Escribe tu mensaje..." disabled>
            <button class="chatbot-send-btn" disabled><i class="fas fa-paper-plane"></i></button>
        `;
        
        // Ensamblar el chatbot
        chatbotContainer.appendChild(chatbotHeader);
        chatbotContainer.appendChild(chatbotContent);
        chatbotContainer.appendChild(chatbotFooter);
        document.body.appendChild(chatbotContainer);
        
        // Estilos del chatbot
        chatbotBtn.style.position = 'fixed';
        chatbotBtn.style.bottom = '20px';
        chatbotBtn.style.left = '20px';
        chatbotBtn.style.width = '60px';
        chatbotBtn.style.height = '60px';
        chatbotBtn.style.borderRadius = '50%';
        chatbotBtn.style.backgroundColor = '#6f42c1';
        chatbotBtn.style.color = 'white';
        chatbotBtn.style.border = 'none';
        chatbotBtn.style.fontSize = '24px';
        chatbotBtn.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
        chatbotBtn.style.cursor = 'pointer';
        chatbotBtn.style.zIndex = '1000';
        chatbotBtn.style.transition = 'all 0.3s ease';
        
        chatbotContainer.style.position = 'fixed';
        chatbotContainer.style.bottom = '90px';
        chatbotContainer.style.left = '20px';
        chatbotContainer.style.width = '350px';
        chatbotContainer.style.height = '450px';
        chatbotContainer.style.borderRadius = '10px';
        chatbotContainer.style.backgroundColor = 'white';
        chatbotContainer.style.boxShadow = '0 5px 25px rgba(0,0,0,0.2)';
        chatbotContainer.style.display = 'none';
        chatbotContainer.style.flexDirection = 'column';
        chatbotContainer.style.overflow = 'hidden';
        chatbotContainer.style.zIndex = '1000';
        chatbotContainer.style.transition = 'all 0.3s ease';
        
        chatbotHeader.style.padding = '15px';
        chatbotHeader.style.backgroundColor = '#6f42c1';
        chatbotHeader.style.color = 'white';
        chatbotHeader.style.display = 'flex';
        chatbotHeader.style.justifyContent = 'space-between';
        chatbotHeader.style.alignItems = 'center';
        
        chatbotContent.style.flex = '1';
        chatbotContent.style.padding = '15px';
        chatbotContent.style.overflowY = 'auto';
        
        chatbotFooter.style.padding = '10px 15px';
        chatbotFooter.style.borderTop = '1px solid #eee';
        chatbotFooter.style.display = 'flex';
        
        // Estilos para los elementos dentro del chatbot
        const style = document.createElement('style');
        style.textContent = `
            .chat-message {
                margin-bottom: 15px;
                max-width: 80%;
            }
            .chat-message.bot {
                margin-right: auto;
            }
            .chat-message.user {
                margin-left: auto;
            }
            .chat-message p {
                padding: 10px 15px;
                border-radius: 15px;
                margin: 0;
            }
            .chat-message.bot p {
                background-color: #f0f0f0;
            }
            .chat-message.user p {
                background-color: #6f42c1;
                color: white;
            }
            .chat-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin-top: 15px;
            }
            .chat-option {
                padding: 10px;
                background-color: #f9f7fc;
                border: 1px solid #e6e6e6;
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.2s ease;
                text-align: left;
                font-size: 14px;
            }
            .chat-option:hover {
                background-color: #f0ebfa;
                border-color: #6f42c1;
            }
            .chatbot-demo-footer input {
                flex: 1;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 20px;
                margin-right: 10px;
            }
            .chatbot-send-btn {
                background-color: #6f42c1;
                color: white;
                width: 36px;
                height: 36px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
            }
            .chatbot-close {
                background: transparent;
                border: none;
                color: white;
                font-size: 16px;
                cursor: pointer;
            }
            .chatbot-title {
                display: flex;
                align-items: center;
                gap: 8px;
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
        
        // Evento de toggle para el chatbot
        chatbotBtn.addEventListener('click', function() {
            if (chatbotContainer.style.display === 'none') {
                chatbotContainer.style.display = 'flex';
                chatbotBtn.innerHTML = '<i class="fas fa-times"></i>';
                
                // Animación de entrada
                chatbotContainer.style.opacity = '0';
                chatbotContainer.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    chatbotContainer.style.opacity = '1';
                    chatbotContainer.style.transform = 'translateY(0)';
                }, 50);
            } else {
                // Animación de salida
                chatbotContainer.style.opacity = '0';
                chatbotContainer.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    chatbotContainer.style.display = 'none';
                    chatbotBtn.innerHTML = '<i class="fas fa-comment"></i>';
                }, 300);
            }
        });
        
        // Cerrar chatbot al hacer clic en el botón de cerrar
        document.querySelector('.chatbot-close').addEventListener('click', function() {
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transform = 'translateY(20px)';
            setTimeout(() => {
                chatbotContainer.style.display = 'none';
                chatbotBtn.innerHTML = '<i class="fas fa-comment"></i>';
            }, 300);
        });
        
        // Interactividad de las opciones del chatbot
        document.querySelectorAll('.chat-option').forEach(option => {
            option.addEventListener('click', function() {
                // Mostrar la opción seleccionada como mensaje del usuario
                const chatContent = document.querySelector('.chatbot-demo-content');
                const userMessageEl = document.createElement('div');
                userMessageEl.className = 'chat-message user';
                userMessageEl.innerHTML = `<p>${this.textContent}</p>`;
                chatContent.appendChild(userMessageEl);
                
                // Ocultar las opciones actuales
                document.querySelector('.chat-options').remove();
                
                // Simular "escribiendo..."
                const typingEl = document.createElement('div');
                typingEl.className = 'chat-message bot';
                typingEl.innerHTML = `<p>Escribiendo...</p>`;
                chatContent.appendChild(typingEl);
                chatContent.scrollTop = chatContent.scrollHeight;
                
                // Respuesta del bot después de un breve retraso
                setTimeout(() => {
                    typingEl.remove();
                    
                    // Respuesta del bot basada en la opción seleccionada
                    const botResponse = document.createElement('div');
                    botResponse.className = 'chat-message bot';
                    
                    let responseText = '';
                    let newOptions = [];
                    
                    if (this.textContent.includes('¿Qué son los chatbots?')) {
                        responseText = 'Los chatbots son programas informáticos que simulan conversaciones humanas. Permiten automatizar la comunicación con clientes, responder preguntas frecuentes y calificar leads, entre otras funciones.';
                        newOptions = ['¿Cuánto tiempo lleva implementar un chatbot?', '¿Necesito conocimientos técnicos?'];
                    } else if (this.textContent.includes('¿Cuánto cuesta un chatbot?')) {
                        responseText = 'Nuestros planes de chatbot comienzan desde $299/mes para el plan básico. También ofrecemos soluciones personalizadas según tus necesidades específicas.';
                        newOptions = ['¿Qué incluye el plan básico?', '¿Hay período de prueba?'];
                    } else if (this.textContent.includes('¿Cómo funciona?')) {
                        responseText = 'Nuestros chatbots funcionan 24/7 atendiendo consultas, calificando leads y automatizando procesos. Se integran con tu sitio web, WhatsApp, Facebook y otras plataformas.';
                        newOptions = ['¿Se integra con mi CRM?', '¿Puedo personalizar las respuestas?'];
                    } else if (this.textContent.includes('hablar con un humano')) {
                        responseText = 'Por supuesto. Completa el formulario de contacto y uno de nuestros especialistas te contactará en menos de 24 horas.';
                        newOptions = ['Agendar llamada', 'Volver al inicio'];
                    } else {
                        responseText = 'Gracias por tu interés. Para recibir información más detallada, te recomendamos completar el formulario de contacto.';
                        newOptions = ['Entendido', 'Volver al inicio'];
                    }
                    
                    botResponse.innerHTML = `<p>${responseText}</p>`;
                    chatContent.appendChild(botResponse);
                    
                    // Nuevas opciones
                    const newOptionsEl = document.createElement('div');
                    newOptionsEl.className = 'chat-options';
                    
                    newOptions.forEach(optionText => {
                        const optionBtn = document.createElement('button');
                        optionBtn.className = 'chat-option';
                        optionBtn.textContent = optionText;
                        optionBtn.addEventListener('click', function() {
                            // Similar a la lógica anterior pero simplificada
                            const userMsg = document.createElement('div');
                            userMsg.className = 'chat-message user';
                            userMsg.innerHTML = `<p>${this.textContent}</p>`;
                            chatContent.appendChild(userMsg);
                            
                            newOptionsEl.remove();
                            
                            // Mensaje final que dirige al formulario
                            setTimeout(() => {
                                const finalMsg = document.createElement('div');
                                finalMsg.className = 'chat-message bot';
                                finalMsg.innerHTML = `<p>Para obtener información personalizada y una demostración completa, te invitamos a completar el formulario de contacto. ¡Estaremos encantados de ayudarte!</p>`;
                                chatContent.appendChild(finalMsg);
                                chatContent.scrollTop = chatContent.scrollHeight;
                            }, 800);
                        });
                        newOptionsEl.appendChild(optionBtn);
                    });
                    
                    chatContent.appendChild(newOptionsEl);
                    chatContent.scrollTop = chatContent.scrollHeight;
                }, 1500);
            });
        });
    }, 3000); // Mostrar el chatbot después de 3 segundos
    
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
            
            // Mensaje personalizado según objetivo seleccionado
            const objetivo = document.getElementById('objetivo').value;
            let mensaje = '¡Gracias por contactarnos! ';
            
            switch(objetivo) {
                case 'atencion':
                    mensaje += 'Te mostraremos cómo mejorar la atención al cliente con nuestros chatbots automatizados.';
                    break;
                case 'ventas':
                    mensaje += 'Te explicaremos cómo nuestros chatbots pueden incrementar tus ventas a través de conversiones automatizadas.';
                    break;
                case 'leads':
                    mensaje += 'Te demostraremos cómo nuestros chatbots pueden captar y calificar leads de forma efectiva.';
                    break;
                case 'costos':
                    mensaje += 'Te mostraremos cómo reducir tus costos operativos automatizando la atención con chatbots.';
                    break;
                default:
                    mensaje += 'Pronto te contactaremos para mostrarte una demo de nuestros chatbots.';
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