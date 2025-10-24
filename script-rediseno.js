// ============================================
// NAVEGACIÓN MÓVIL
// ============================================
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Cerrar menú al hacer clic en un enlace
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// ============================================
// SCROLL SUAVE
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const navHeight = document.querySelector('nav').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScroll = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Agregar sombra al hacer scroll
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// FORMULARIO DE CONTACTO
// ============================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obtener valores del formulario
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };
    
    // Validación básica
    if (!formData.name || !formData.email || !formData.message) {
        showNotification('Por favor completá todos los campos obligatorios', 'error');
        return;
    }
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Por favor ingresá un email válido', 'error');
        return;
    }
    
    // Simular envío (aquí deberías integrar con tu backend o servicio de email)
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simulación de envío (reemplazar con tu lógica real)
    setTimeout(() => {
        console.log('Datos del formulario:', formData);
        
        showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
        contactForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Aquí deberías hacer la llamada real a tu backend
        // Ejemplo con fetch:
        /*
        fetch('tu-endpoint-de-backend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            showNotification('¡Mensaje enviado! Te contactaremos pronto.', 'success');
            contactForm.reset();
        })
        .catch(error => {
            showNotification('Error al enviar el mensaje. Intentá de nuevo.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        */
    }, 2000);
});

// ============================================
// FORMULARIO LEAD MAGNET
// ============================================
const leadMagnetForm = document.getElementById('leadMagnetForm');

leadMagnetForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = this.querySelector('input[type="email"]').value;
    
    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        showNotification('Por favor ingresá un email válido', 'error');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Descargando...';
    submitBtn.disabled = true;
    
    // Simular descarga (aquí deberías integrar con Mailchimp o tu servicio de email)
    setTimeout(() => {
        console.log('Email para lead magnet:', email);
        
        showNotification('¡Guía enviada a tu email! Revisá tu bandeja de entrada.', 'success');
        leadMagnetForm.reset();
        
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Aquí deberías integrar con Mailchimp o tu servicio de email marketing
        // Ejemplo de integración con Mailchimp:
        /*
        fetch('tu-endpoint-mailchimp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email })
        })
        .then(response => response.json())
        .then(data => {
            showNotification('¡Guía enviada! Revisá tu email.', 'success');
            leadMagnetForm.reset();
        })
        .catch(error => {
            showNotification('Error al suscribirse. Intentá de nuevo.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        */
    }, 2000);
});

// ============================================
// SISTEMA DE NOTIFICACIONES
// ============================================
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const icon = type === 'success' ? 'fa-check-circle' : 
                 type === 'error' ? 'fa-exclamation-circle' : 
                 'fa-info-circle';
    
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Agregar estilos si no existen
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 10px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                animation: slideIn 0.3s ease-out;
                max-width: 400px;
            }
            
            .notification-success {
                border-left: 4px solid #388E3C;
            }
            
            .notification-error {
                border-left: 4px solid #D32F2F;
            }
            
            .notification-info {
                border-left: 4px solid #FF6B00;
            }
            
            .notification i {
                font-size: 1.5rem;
            }
            
            .notification-success i {
                color: #388E3C;
            }
            
            .notification-error i {
                color: #D32F2F;
            }
            
            .notification-info i {
                color: #FF6B00;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            @keyframes slideOut {
                from {
                    transform: translateX(0);
                    opacity: 1;
                }
                to {
                    transform: translateX(400px);
                    opacity: 0;
                }
            }
            
            @media (max-width: 768px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Remover después de 5 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// ============================================
// ANIMACIONES AL HACER SCROLL
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observar elementos que queremos animar
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.problem-card, .service-card, .blog-card, .value-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// ============================================
// CONTADOR ANIMADO PARA ESTADÍSTICAS
// ============================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Activar contador cuando sea visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target, 788);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statNumber = document.querySelector('.stat-number');
    if (statNumber) {
        statObserver.observe(statNumber);
    }
});

// ============================================
// TRACKING DE EVENTOS (Google Analytics)
// ============================================
function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            'event_category': category,
            'event_label': label
        });
    }
    console.log(`Event tracked: ${category} - ${action} - ${label}`);
}

// Trackear clics en CTAs
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        const btnText = this.textContent.trim();
        trackEvent('CTA', 'click', btnText);
    });
});

// Trackear navegación
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const section = this.getAttribute('href');
        trackEvent('Navigation', 'click', section);
    });
});

// Trackear envío de formularios
contactForm.addEventListener('submit', function() {
    trackEvent('Form', 'submit', 'Contact Form');
});

leadMagnetForm.addEventListener('submit', function() {
    trackEvent('Form', 'submit', 'Lead Magnet');
});

// ============================================
// BOTÓN WHATSAPP FLOTANTE (OPCIONAL)
// ============================================
function createWhatsAppButton() {
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = 'https://wa.me/5491130011554?text=Hola!%20Vengo%20desde%20OrangeVapor%20y%20quiero%20consultar%20sobre%20sus%20servicios';
    whatsappBtn.target = '_blank';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
    whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
    
    // Estilos para el botón flotante
    const style = document.createElement('style');
    style.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            background: #25D366;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: white;
            box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
            z-index: 999;
            transition: all 0.3s;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 8px 30px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 5px 20px rgba(37, 211, 102, 0.4);
            }
            50% {
                box-shadow: 0 5px 30px rgba(37, 211, 102, 0.7);
            }
        }
        
        @media (max-width: 768px) {
            .whatsapp-float {
                bottom: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                font-size: 1.5rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappBtn);
    
    // Trackear clics en WhatsApp
    whatsappBtn.addEventListener('click', function() {
        trackEvent('WhatsApp', 'click', 'Floating Button');
    });
}

// Activar botón de WhatsApp después de 3 segundos
setTimeout(createWhatsAppButton, 3000);

// ============================================
// LAZY LOADING DE IMÁGENES
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ============================================
// PREVENIR SPAM EN FORMULARIOS
// ============================================
let formSubmissions = 0;
const maxSubmissions = 3;
const resetTime = 3600000; // 1 hora

function checkSubmissionLimit() {
    if (formSubmissions >= maxSubmissions) {
        showNotification('Has alcanzado el límite de envíos. Intentá más tarde o contactanos por WhatsApp.', 'error');
        return false;
    }
    formSubmissions++;
    
    // Resetear contador después de 1 hora
    setTimeout(() => {
        formSubmissions = 0;
    }, resetTime);
    
    return true;
}

// ============================================
// DETECCIÓN DE INTENCIÓN DE SALIDA (EXIT INTENT)
// ============================================
let exitIntentShown = false;

document.addEventListener('mouseleave', (e) => {
    if (e.clientY < 10 && !exitIntentShown) {
        exitIntentShown = true;
        showExitIntentPopup();
    }
});

function showExitIntentPopup() {
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = `
        <div class="exit-intent-content">
            <button class="close-popup" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
            <h3>¡Esperá! 🎁</h3>
            <p>Antes de irte, descargá nuestra guía <strong>GRATUITA</strong>:</p>
            <h4>"7 Pasos para Vender Más Cortinas Online en 2025"</h4>
            <form id="exitIntentForm" style="margin-top: 1.5rem;">
                <input type="email" placeholder="Tu email" required style="width: 100%; padding: 12px; border: 2px solid #E0E0E0; border-radius: 8px; margin-bottom: 1rem;">
                <button type="submit" class="btn btn-block">
                    <i class="fas fa-download"></i> Descargar Gratis
                </button>
            </form>
        </div>
    `;
    
    // Estilos para el popup
    const style = document.createElement('style');
    style.textContent = `
        .exit-intent-popup {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10001;
            animation: fadeIn 0.3s ease-out;
        }
        
        .exit-intent-content {
            background: white;
            padding: 3rem;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            position: relative;
            animation: slideUp 0.3s ease-out;
        }
        
        .close-popup {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            color: #999;
            cursor: pointer;
            transition: color 0.3s;
        }
        
        .close-popup:hover {
            color: #FF6B00;
        }
        
        .exit-intent-content h3 {
            font-size: 2rem;
            color: #FF6B00;
            margin-bottom: 1rem;
        }
        
        .exit-intent-content h4 {
            color: #333;
            margin-top: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(50px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .exit-intent-content {
                margin: 20px;
                padding: 2rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(popup);
    
    // Manejar envío del formulario
    document.getElementById('exitIntentForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        console.log('Exit intent email:', email);
        showNotification('¡Guía enviada! Revisá tu email.', 'success');
        popup.remove();
        trackEvent('Exit Intent', 'submit', 'Lead Magnet');
    });
    
    trackEvent('Exit Intent', 'show', 'Popup');
}

// ============================================
// CONSOLE LOG PERSONALIZADO
// ============================================
console.log('%c🟠 OrangeVapor ', 'background: #FF6B00; color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
console.log('%cSitio desarrollado para fabricantes de cortinas', 'color: #666; font-size: 12px;');
console.log('%c¿Interesado en una auditoría gratuita? Contactanos: https://wa.me/5491130011554', 'color: #FF6B00; font-size: 14px;');
