/* ==========================================================================
   MAILCHIMP CAPTCHA HANDLER
   ========================================================================== */

// Este archivo maneja específicamente la integración con Mailchimp
// y cualquier funcionalidad relacionada con el captcha

(function() {
    'use strict';

    // Esperar a que el DOM esté listo
    document.addEventListener('DOMContentLoaded', function() {
        
        // Buscar todos los formularios de Mailchimp
        const mcForms = document.querySelectorAll('form[name="mc-embedded-subscribe-form"]');
        
        mcForms.forEach(form => {
            // Mejorar la experiencia del usuario
            form.addEventListener('submit', function(e) {
                // Mostrar estado de carga
                const submitButton = form.querySelector('#mc-embedded-subscribe');
                if (submitButton) {
                    const originalText = submitButton.value;
                    submitButton.value = 'Enviando...';
                    submitButton.disabled = true;
                    
                    // Restaurar después de 3 segundos
                    setTimeout(() => {
                        submitButton.value = originalText;
                        submitButton.disabled = false;
                    }, 3000);
                }
            });
            
            // Manejar respuestas de Mailchimp
            const handleResponse = () => {
                const successMsg = form.querySelector('#mce-success-response');
                const errorMsg = form.querySelector('#mce-error-response');
                
                if (successMsg && successMsg.style.display !== 'none') {
                    // Éxito: mostrar mensaje personalizado
                    successMsg.innerHTML = '¡Excelente! Revisá tu email para confirmar tu suscripción.';
                    
                    // Rastrear conversión
                    if (typeof gtag !== 'undefined') {
                        gtag('event', 'conversion', {
                            'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL',
                            'value': 1.0,
                            'currency': 'USD'
                        });
                    }
                    
                    // Limpiar formulario
                    form.reset();
                }
                
                if (errorMsg && errorMsg.style.display !== 'none') {
                    // Error: mejorar mensajes
                    const errorText = errorMsg.innerText;
                    if (errorText.includes('already subscribed')) {
                        errorMsg.innerHTML = 'Este email ya está registrado. ¿Querés usar otro?';
                    } else if (errorText.includes('invalid')) {
                        errorMsg.innerHTML = 'Por favor, verificá que el email sea correcto.';
                    }
                }
            };
            
            // Observar cambios en los mensajes de respuesta
            const observer = new MutationObserver(handleResponse);
            const config = { attributes: true, childList: true, subtree: true };
            
            const successResponse = form.querySelector('#mce-success-response');
            const errorResponse = form.querySelector('#mce-error-response');
            
            if (successResponse) observer.observe(successResponse, config);
            if (errorResponse) observer.observe(errorResponse, config);
        });
        
        // Mejorar campos del formulario
        const improveFormFields = () => {
            // Auto-formatear teléfono
            const phoneInputs = document.querySelectorAll('input[name="PHONE"]');
            phoneInputs.forEach(input => {
                input.addEventListener('input', function(e) {
                    let value = e.target.value.replace(/\D/g, '');
                    
                    // Formatear como número argentino
                    if (value.length > 0) {
                        if (value.length <= 2) {
                            value = value;
                        } else if (value.length <= 6) {
                            value = value.slice(0, 2) + ' ' + value.slice(2);
                        } else if (value.length <= 10) {
                            value = value.slice(0, 2) + ' ' + value.slice(2, 6) + '-' + value.slice(6);
                        } else {
                            value = value.slice(0, 2) + ' ' + value.slice(2, 6) + '-' + value.slice(6, 10);
                        }
                    }
                    
                    e.target.value = value;
                });
            });
            
            // Autocompletar nombre con mayúsculas
            const nameInputs = document.querySelectorAll('input[name="FNAME"]');
            nameInputs.forEach(input => {
                input.addEventListener('blur', function(e) {
                    const words = e.target.value.split(' ');
                    const capitalized = words.map(word => 
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    ).join(' ');
                    e.target.value = capitalized;
                });
            });
        };
        
        improveFormFields();
        
        // Validación en tiempo real
        const realTimeValidation = () => {
            const emailInputs = document.querySelectorAll('input[type="email"]');
            
            emailInputs.forEach(input => {
                input.addEventListener('blur', function() {
                    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
                    
                    if (this.value && !isValid) {
                        this.style.borderColor = '#F44336';
                        
                        // Mostrar mensaje de error
                        let errorMsg = this.parentElement.querySelector('.field-error');
                        if (!errorMsg) {
                            errorMsg = document.createElement('span');
                            errorMsg.className = 'field-error';
                            errorMsg.style.color = '#F44336';
                            errorMsg.style.fontSize = '12px';
                            errorMsg.style.display = 'block';
                            errorMsg.style.marginTop = '5px';
                            this.parentElement.appendChild(errorMsg);
                        }
                        errorMsg.textContent = 'Por favor, ingresá un email válido';
                    } else {
                        this.style.borderColor = '';
                        const errorMsg = this.parentElement.querySelector('.field-error');
                        if (errorMsg) errorMsg.remove();
                    }
                });
            });
        };
        
        realTimeValidation();
    });
})();
