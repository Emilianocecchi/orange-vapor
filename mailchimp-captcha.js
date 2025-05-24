/**
 * ORANGE VAPOR 2025 - MAILCHIMP INTEGRATION
 * 
 * Funcionalidades implementadas:
 * 1. Integración avanzada con Mailchimp
 * 2. Validación en tiempo real con efectos visuales
 * 3. Manejo de respuestas con animaciones
 * 4. Sistema de captcha inteligente
 * 5. Analytics y tracking
 * 6. Estados de loading futuristas
 * 7. Manejo de errores elegante
 * 8. Notificaciones toast modernas
 * 9. Auto-completado inteligente
 * 10. Prevención de spam
 */

class MailchimpManager {
    constructor() {
        this.forms = new Map();
        this.validationRules = {
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            phone: /^[\+]?[\d\s\-\(\)]{10,}$/,
            name: /^[a-zA-ZÀ-ÿ\s]{2,}$/
        };
        
        this.config = {
            enableRealTimeValidation: true,
            enableAutoComplete: true,
            enableSpamProtection: true,
            enableAnalytics: true,
            enableVisualEnhancements: true, // Nueva opción para desactivar mejoras visuales
            animationDuration: 300,
            toastDuration: 5000
        };
        
        this.init();
    }
    
    init() {
        console.log('📧 Mailchimp Manager 2025 - Iniciando integración futurista...');
        
        // Detectar posibles conflictos
        this.detectConflicts();
        
        // Encontrar y configurar todos los formularios de Mailchimp
        this.setupMailchimpForms();
        
        // Configurar sistema de notificaciones
        this.setupToastSystem();
        
        // Configurar analytics
        if (this.config.enableAnalytics) {
            this.setupAnalytics();
        }
        
        console.log('✉️ Mailchimp Manager 2025 - Listo para capturar leads!');
    }
    
    detectConflicts() {
        // Detectar si hay múltiples labels o elementos duplicados
        const forms = document.querySelectorAll('#mc-embedded-subscribe-form');
        
        forms.forEach(form => {
            const labels = form.querySelectorAll('label');
            labels.forEach(label => {
                const field = form.querySelector(`#${label.getAttribute('for')}`);
                if (field) {
                    // Si ya hay elementos flotantes o duplicados, desactivar mejoras visuales
                    const existingFloating = field.parentNode.querySelector('.floating-label');
                    if (existingFloating) {
                        this.config.enableVisualEnhancements = false;
                        console.warn('⚠️ Conflictos detectados - Desactivando mejoras visuales');
                    }
                }
            });
        });
    }
    
    /**
     * ========================================================================
     * CONFIGURACIÓN DE FORMULARIOS MAILCHIMP
     * ========================================================================
     */
    setupMailchimpForms() {
        const mailchimpForms = document.querySelectorAll('#mc-embedded-subscribe-form');
        
        mailchimpForms.forEach((form, index) => {
            this.enhanceMailchimpForm(form, `form-${index}`);
        });
    }
    
    enhanceMailchimpForm(form, formId) {
        // Verificar que es realmente un formulario de Mailchimp
        if (!form.action.includes('list-manage.com')) {
            return;
        }
        
        // Registrar formulario
        this.forms.set(formId, {
            element: form,
            isSubmitting: false,
            attemptCount: 0,
            lastSubmission: null
        });
        
        // Preservar elementos existentes del formulario (incluyendo captcha)
        this.preserveMailchimpElements(form);
        
        // Mejorar campos del formulario de forma no invasiva
        this.enhanceFormFields(form);
        
        // Configurar validación en tiempo real
        if (this.config.enableRealTimeValidation) {
            this.setupRealTimeValidation(form);
        }
        
        // Configurar autocompletado inteligente
        if (this.config.enableAutoComplete) {
            this.setupSmartAutoComplete(form);
        }
        
        // Interceptar envío del formulario
        this.interceptFormSubmission(form, formId);
        
        // Configurar protección anti-spam
        if (this.config.enableSpamProtection) {
            this.setupSpamProtection(form);
        }
    }
    
    preserveMailchimpElements(form) {
        // Marcar elementos especiales de Mailchimp para no modificarlos
        const specialSelectors = [
            'div[style*="position: absolute"]', // Honeypot típico
            'input[tabindex="-1"]', // Campos ocultos
            '.g-recaptcha', // Google reCAPTCHA
            '.h-captcha', // hCaptcha
            '.indicates-required', // Texto de campos requeridos
            '#mce-responses', // Contenedor de respuestas
            '.response' // Mensajes de respuesta
        ];
        
        specialSelectors.forEach(selector => {
            const elements = form.querySelectorAll(selector);
            elements.forEach(el => {
                el.dataset.mailchimpOriginal = 'true';
            });
        });
    }
    
    enhanceFormFields(form) {
        const fields = form.querySelectorAll('input[type="email"], input[type="text"], textarea');
        
        fields.forEach(field => {
            // Solo mejorar campos que no sean del sistema (captcha, honeypot, etc.)
            if (this.shouldEnhanceField(field)) {
                this.enhanceField(field);
            }
        });
    }
    
    shouldEnhanceField(field) {
        // No mejorar elementos marcados como originales de Mailchimp
        if (field.dataset.mailchimpOriginal === 'true' || 
            field.parentNode.dataset.mailchimpOriginal === 'true') {
            return false;
        }
        
        // No mejorar campos ocultos, honeypot, o del sistema de Mailchimp
        const skipNames = ['b_386ca740d7cf02ec261f47f33_5a55144e86', 'g-recaptcha-response'];
        const skipTypes = ['hidden', 'submit', 'button'];
        
        if (skipNames.includes(field.name) || skipTypes.includes(field.type)) {
            return false;
        }
        
        // No mejorar si está oculto
        const styles = window.getComputedStyle(field);
        if (styles.display === 'none' || styles.visibility === 'hidden') {
            return false;
        }
        
        // No mejorar si es parte del captcha
        if (field.closest('.g-recaptcha') || field.closest('.h-captcha')) {
            return false;
        }
        
        return true;
    }
    
    enhanceField(field) {
        // Solo añadir mejoras visuales si están habilitadas
        if (this.config.enableVisualEnhancements) {
            // Solo añadir contenedor de validación si no existe
            if (!field.parentNode.querySelector('.field-validation-container')) {
                this.createValidationContainer(field);
            }
            
            // Solo mejorar placeholder para campos de texto principales
            if (field.type === 'email' || field.type === 'text' || field.tagName === 'TEXTAREA') {
                this.enhancePlaceholder(field);
            }
        }
        
        // Configurar eventos de validación (una sola vez)
        if (!field.dataset.enhanced) {
            field.addEventListener('input', (e) => this.handleFieldInput(e));
            field.addEventListener('blur', (e) => this.handleFieldBlur(e));
            field.addEventListener('focus', (e) => this.handleFieldFocus(e));
            field.dataset.enhanced = 'true';
        }
    }
    
    createValidationContainer(field) {
        const container = document.createElement('div');
        container.className = 'field-validation-container';
        
        const icon = document.createElement('div');
        icon.className = 'validation-icon';
        
        const message = document.createElement('div');
        message.className = 'validation-message';
        
        container.appendChild(icon);
        container.appendChild(message);
        
        field.parentNode.insertBefore(container, field.nextSibling);
        
        // Estilos dinámicos
        this.injectValidationStyles();
    }
    
    injectValidationStyles() {
        if (document.querySelector('#mailchimp-validation-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'mailchimp-validation-styles';
        styles.textContent = `
            .field-validation-container {
                display: flex;
                align-items: center;
                gap: 8px;
                margin-top: 4px;
                min-height: 20px;
                opacity: 0;
                transform: translateY(-10px);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .field-validation-container.show {
                opacity: 1;
                transform: translateY(0);
            }
            
            .validation-icon {
                width: 16px;
                height: 16px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 10px;
                font-weight: 700;
                color: white;
                transition: all 0.3s ease;
            }
            
            .validation-icon.success {
                background: #00C853;
                animation: successPulse 0.6s ease;
            }
            
            .validation-icon.error {
                background: #F44336;
                animation: errorShake 0.6s ease;
            }
            
            .validation-icon.loading {
                background: #FF6B35;
                animation: loadingSpin 1s linear infinite;
            }
            
            .validation-message {
                font-size: 0.75rem;
                font-weight: 500;
                transition: color 0.3s ease;
            }
            
            .validation-message.success {
                color: #00C853;
            }
            
            .validation-message.error {
                color: #F44336;
            }
            
            .validation-message.info {
                color: #2196F3;
            }
            
            @keyframes successPulse {
                0% { transform: scale(0); }
                50% { transform: scale(1.2); }
                100% { transform: scale(1); }
            }
            
            @keyframes errorShake {
                0%, 100% { transform: translateX(0); }
                25% { transform: translateX(-3px); }
                75% { transform: translateX(3px); }
            }
            
            @keyframes loadingSpin {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            /* Placeholder flotante futurista - mejorado */
            .mc-field-group {
                position: relative;
            }
            
            .floating-label {
                position: absolute;
                left: 16px;
                top: 16px;
                color: #999;
                font-size: 1rem;
                pointer-events: none;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                background: rgba(255, 255, 255, 0.9);
                padding: 0 4px;
                border-radius: 4px;
                backdrop-filter: blur(10px);
                z-index: 1;
                transform-origin: left top;
            }
            
            .floating-label.active {
                top: -8px;
                font-size: 0.75rem;
                color: #FF6B35;
                font-weight: 600;
                transform: scale(0.9);
                background: rgba(255, 255, 255, 0.95);
            }
            
            /* Botón de envío mejorado */
            .submit-button-enhanced {
                position: relative;
                overflow: hidden;
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .submit-button-enhanced.loading {
                pointer-events: none;
            }
            
            .submit-button-enhanced .button-text {
                transition: opacity 0.3s ease;
            }
            
            .submit-button-enhanced.loading .button-text {
                opacity: 0;
            }
            
            .loading-spinner {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                border: 2px solid rgba(255,255,255,0.3);
                border-top: 2px solid white;
                border-radius: 50%;
                animation: spin 1s linear infinite;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .submit-button-enhanced.loading .loading-spinner {
                opacity: 1;
            }
            
            @keyframes spin {
                from { transform: translate(-50%, -50%) rotate(0deg); }
                to { transform: translate(-50%, -50%) rotate(360deg); }
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    enhancePlaceholder(field) {
        const label = field.previousElementSibling;
        if (!label || label.tagName !== 'LABEL') return;
        
        // Solo aplicar efecto flotante si no existe ya
        if (field.parentNode.querySelector('.floating-label')) return;
        
        // Crear placeholder flotante pero mantener el original oculto cuando esté activo
        const floatingLabel = document.createElement('div');
        floatingLabel.className = 'floating-label';
        floatingLabel.textContent = label.textContent.replace('*', '').trim();
        
        field.parentNode.insertBefore(floatingLabel, field);
        
        // Manejar estados del placeholder
        const updatePlaceholder = () => {
            if (field.value || field === document.activeElement) {
                floatingLabel.classList.add('active');
                // Ocultar label original cuando el flotante esté activo
                label.style.opacity = '0';
            } else {
                floatingLabel.classList.remove('active');
                // Mostrar label original cuando el flotante no esté activo
                label.style.opacity = '1';
            }
        };
        
        // Estilo inicial para el label original
        label.style.transition = 'opacity 0.3s ease';
        
        field.addEventListener('focus', updatePlaceholder);
        field.addEventListener('blur', updatePlaceholder);
        field.addEventListener('input', updatePlaceholder);
        
        // Estado inicial
        updatePlaceholder();
    }
    
    /**
     * ========================================================================
     * VALIDACIÓN EN TIEMPO REAL
     * ========================================================================
     */
    setupRealTimeValidation(form) {
        const emailField = form.querySelector('input[type="email"]');
        const phoneField = form.querySelector('input[name="PHONE"]');
        const nameField = form.querySelector('input[name="FNAME"]');
        
        if (emailField) this.setupEmailValidation(emailField);
        if (phoneField) this.setupPhoneValidation(phoneField);
        if (nameField) this.setupNameValidation(nameField);
    }
    
    setupEmailValidation(field) {
        let validationTimeout;
        
        field.addEventListener('input', () => {
            clearTimeout(validationTimeout);
            
            // Mostrar loading durante la validación
            this.showFieldStatus(field, 'loading', 'Validando email...');
            
            validationTimeout = setTimeout(async () => {
                const email = field.value.trim();
                
                if (!email) {
                    this.hideFieldStatus(field);
                    return;
                }
                
                if (!this.validationRules.email.test(email)) {
                    this.showFieldStatus(field, 'error', 'Email inválido');
                    return;
                }
                
                // Validación avanzada de dominio
                const isValidDomain = await this.validateEmailDomain(email);
                if (!isValidDomain) {
                    this.showFieldStatus(field, 'error', 'Dominio de email no válido');
                    return;
                }
                
                this.showFieldStatus(field, 'success', 'Email válido');
            }, 800);
        });
    }
    
    async validateEmailDomain(email) {
        const domain = email.split('@')[1];
        
        // Lista de dominios comunes válidos
        const commonDomains = [
            'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com',
            'icloud.com', 'aol.com', 'protonmail.com', 'live.com'
        ];
        
        if (commonDomains.includes(domain.toLowerCase())) {
            return true;
        }
        
        // Verificación básica de formato de dominio
        const domainRegex = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9]?\.[a-zA-Z]{2,}$/;
        return domainRegex.test(domain);
    }
    
    setupPhoneValidation(field) {
        field.addEventListener('input', () => {
            const phone = field.value.trim();
            
            if (!phone) {
                this.hideFieldStatus(field);
                return;
            }
            
            if (this.validationRules.phone.test(phone)) {
                this.showFieldStatus(field, 'success', 'Teléfono válido');
            } else {
                this.showFieldStatus(field, 'error', 'Formato de teléfono inválido');
            }
        });
        
        // Auto-formato para números de teléfono
        field.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            // Formato argentino: +54 11 1234-5678
            if (value.startsWith('54')) {
                value = '+54 ' + value.slice(2, 4) + ' ' + value.slice(4, 8) + '-' + value.slice(8, 12);
            } else if (value.length >= 10) {
                value = value.slice(0, 2) + ' ' + value.slice(2, 6) + '-' + value.slice(6, 10);
            }
            
            e.target.value = value;
        });
    }
    
    setupNameValidation(field) {
        field.addEventListener('input', () => {
            const name = field.value.trim();
            
            if (!name) {
                this.hideFieldStatus(field);
                return;
            }
            
            if (this.validationRules.name.test(name)) {
                this.showFieldStatus(field, 'success', '¡Perfecto!');
            } else {
                this.showFieldStatus(field, 'error', 'Solo letras y espacios');
            }
        });
    }
    
    showFieldStatus(field, type, message) {
        const container = field.parentNode.querySelector('.field-validation-container');
        if (!container) return;
        
        const icon = container.querySelector('.validation-icon');
        const messageEl = container.querySelector('.validation-message');
        
        // Limpiar clases previas
        icon.className = 'validation-icon';
        messageEl.className = 'validation-message';
        
        // Aplicar nuevo estado
        icon.classList.add(type);
        messageEl.classList.add(type);
        messageEl.textContent = message;
        
        // Mostrar con animación
        container.classList.add('show');
        
        // Contenido del icono
        const iconContent = {
            success: '✓',
            error: '✕',
            loading: '⋯'
        };
        
        icon.textContent = iconContent[type] || '';
    }
    
    hideFieldStatus(field) {
        const container = field.parentNode.querySelector('.field-validation-container');
        if (container) {
            container.classList.remove('show');
        }
    }
    
    handleFieldInput(e) {
        const field = e.target;
        this.trackFieldInteraction(field, 'input');
    }
    
    handleFieldBlur(e) {
        const field = e.target;
        this.trackFieldInteraction(field, 'blur');
    }
    
    handleFieldFocus(e) {
        const field = e.target;
        this.trackFieldInteraction(field, 'focus');
    }
    
    /**
     * ========================================================================
     * AUTOCOMPLETADO INTELIGENTE
     * ========================================================================
     */
    setupSmartAutoComplete(form) {
        const emailField = form.querySelector('input[type="email"]');
        const companyField = form.querySelector('input[name="COMPANY"]');
        
        if (emailField) this.setupEmailAutoComplete(emailField, companyField);
    }
    
    setupEmailAutoComplete(emailField, companyField) {
        emailField.addEventListener('input', () => {
            const email = emailField.value.trim();
            const domain = email.split('@')[1];
            
            if (domain && companyField && !companyField.value) {
                // Inferir nombre de empresa desde el dominio
                const companyName = this.inferCompanyFromDomain(domain);
                if (companyName) {
                    companyField.value = companyName;
                    this.showAutoCompleteNotification(companyField, companyName);
                }
            }
        });
    }
    
    inferCompanyFromDomain(domain) {
        // Lista de dominios empresariales conocidos
        const businessDomains = {
            'microsoft.com': 'Microsoft',
            'google.com': 'Google',
            'amazon.com': 'Amazon',
            'apple.com': 'Apple',
            'facebook.com': 'Meta',
            'netflix.com': 'Netflix',
            'spotify.com': 'Spotify'
        };
        
        if (businessDomains[domain.toLowerCase()]) {
            return businessDomains[domain.toLowerCase()];
        }
        
        // Generar nombre basado en el dominio
        const parts = domain.split('.');
        if (parts.length >= 2) {
            const companyPart = parts[0];
            return companyPart.charAt(0).toUpperCase() + companyPart.slice(1);
        }
        
        return null;
    }
    
    showAutoCompleteNotification(field, value) {
        const notification = document.createElement('div');
        notification.className = 'autocomplete-notification';
        notification.innerHTML = `
            <i class="fas fa-magic"></i>
            <span>Autocompletado: ${value}</span>
            <button type="button" class="undo-btn">Deshacer</button>
        `;
        
        // Estilos para la notificación
        notification.style.cssText = `
            position: absolute;
            top: -40px;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #FF6B35, #FF8A50);
            color: white;
            padding: 8px 12px;
            border-radius: 8px;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 8px;
            box-shadow: 0 4px 12px rgba(255, 107, 53, 0.3);
            animation: slideDown 0.3s ease;
            z-index: 10;
        `;
        
        field.parentNode.style.position = 'relative';
        field.parentNode.appendChild(notification);
        
        // Botón deshacer
        const undoBtn = notification.querySelector('.undo-btn');
        undoBtn.style.cssText = `
            background: rgba(255,255,255,0.2);
            border: none;
            color: white;
            padding: 2px 6px;
            border-radius: 4px;
            font-size: 0.7rem;
            cursor: pointer;
            transition: background 0.2s ease;
        `;
        
        undoBtn.addEventListener('click', () => {
            field.value = '';
            notification.remove();
        });
        
        // Auto-remover después de 3 segundos
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    /**
     * ========================================================================
     * INTERCEPCIÓN Y MANEJO DE ENVÍO
     * ========================================================================
     */
    interceptFormSubmission(form, formId) {
        const submitButton = form.querySelector('#mc-embedded-subscribe');
        
        if (submitButton) {
            this.enhanceSubmitButton(submitButton);
        }
        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.handleFormSubmission(form, formId);
        });
    }
    
    enhanceSubmitButton(button) {
        // Envolver texto del botón
        const originalText = button.value || button.textContent;
        button.innerHTML = `
            <span class="button-text">${originalText}</span>
            <div class="loading-spinner"></div>
        `;
        
        button.classList.add('submit-button-enhanced');
    }
    
    async handleFormSubmission(form, formId) {
        const formData = this.forms.get(formId);
        
        // Prevenir múltiples envíos
        if (formData.isSubmitting) {
            this.showToast('Ya se está procesando tu solicitud...', 'info');
            return;
        }
        
        // Validar formulario completo
        if (!this.validateCompleteForm(form)) {
            this.showToast('Por favor, completa todos los campos requeridos correctamente', 'error');
            return;
        }
        
        // Verificar protección anti-spam
        if (!this.passesSpamCheck(form)) {
            this.showToast('Se detectó actividad sospechosa. Inténtalo de nuevo.', 'error');
            return;
        }
        
        // Marcar como enviando
        formData.isSubmitting = true;
        this.setSubmissionState(form, 'loading');
        
        try {
            // Envío a Mailchimp
const token = await grecaptcha.execute('6LcWwUcrAAAAABe-kYHQZ0mg6dqjYmz8IRWYAMIZ', {action: 'submit'});
form.querySelector('input[name="token"]')?.value = token;
const result = await this.submitToMailchimp(form);
            
            if (result.success) {
                this.handleSuccessfulSubmission(form, formId, result);
            } else {
                this.handleFailedSubmission(form, formId, result);
            }
        } catch (error) {
            this.handleSubmissionError(form, formId, error);
        } finally {
            formData.isSubmitting = false;
        }
    }
    
    async submitToMailchimp(form) {
        const formData = new FormData(form);
        const action = form.action;
        
        // Añadir datos adicionales
        formData.append('b_386ca740d7cf02ec261f47f33_5a55144e86', ''); // Campo honeypot
        
        try {
            const response = await fetch(action, {
                method: 'POST',
                body: formData,
                mode: 'no-cors' // Mailchimp requiere no-cors
            });
            
            // Como es no-cors, asumimos éxito si no hay error
            return { success: true, message: 'Suscripción exitosa' };
            
        } catch (error) {
            return { success: false, message: error.message };
        }
    }
    
    validateCompleteForm(form) {
        const requiredFields = form.querySelectorAll('input[required]');
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                this.showFieldStatus(field, 'error', 'Campo requerido');
                isValid = false;
            } else {
                // Validar según el tipo de campo
                if (field.type === 'email' && !this.validationRules.email.test(field.value)) {
                    this.showFieldStatus(field, 'error', 'Email inválido');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }
    
    setSubmissionState(form, state) {
        const button = form.querySelector('.submit-button-enhanced');
        if (!button) return;
        
        button.classList.remove('loading', 'success', 'error');
        
        if (state !== 'default') {
            button.classList.add(state);
        }
        
        // Estados del botón
        const buttonText = button.querySelector('.button-text');
        const originalText = buttonText.textContent;
        
        const stateTexts = {
            loading: 'Enviando...',
            success: '¡Enviado!',
            error: 'Error - Reintentar'
        };
        
        if (stateTexts[state]) {
            buttonText.textContent = stateTexts[state];
            
            // Restaurar texto original después de un tiempo
            if (state !== 'loading') {
                setTimeout(() => {
                    buttonText.textContent = originalText;
                    button.classList.remove(state);
                }, 3000);
            }
        }
    }
    
    handleSuccessfulSubmission(form, formId, result) {
        this.setSubmissionState(form, 'success');
        this.showToast('¡Perfecto! Te contactaremos pronto para tu auditoría gratuita.', 'success');
        
        // Limpiar formulario
        setTimeout(() => {
            form.reset();
            this.clearAllFieldStatuses(form);
        }, 2000);
        
        // Analytics
        this.trackConversion(form, 'subscription_success');
        
        // Actualizar contador de intentos
        const formData = this.forms.get(formId);
        formData.attemptCount++;
        formData.lastSubmission = new Date();
    }
    
    handleFailedSubmission(form, formId, result) {
        this.setSubmissionState(form, 'error');
        this.showToast(`Error: ${result.message || 'No se pudo completar la suscripción'}`, 'error');
        
        // Analytics
        this.trackConversion(form, 'subscription_error');
    }
    
    handleSubmissionError(form, formId, error) {
        this.setSubmissionState(form, 'error');
        this.showToast('Error de conexión. Por favor, inténtalo de nuevo.', 'error');
        
        console.error('Error en envío de formulario:', error);
        
        // Analytics
        this.trackConversion(form, 'submission_error');
    }
    
    clearAllFieldStatuses(form) {
        const containers = form.querySelectorAll('.field-validation-container');
        containers.forEach(container => {
            container.classList.remove('show');
        });
    }
    
    /**
     * ========================================================================
     * PROTECCIÓN ANTI-SPAM
     * ========================================================================
     */
    setupSpamProtection(form) {
        // Honeypot field (campo trampa invisible)
        this.addHoneypotField(form);
        
        // Verificación de tiempo de llenado
        form.addEventListener('focus', () => {
            if (!form.dataset.startTime) {
                form.dataset.startTime = Date.now();
            }
        }, true);
        
        // Límite de intentos
        this.addRateLimiting(form);
    }
    
    addHoneypotField(form) {
        const honeypot = document.createElement('input');
        honeypot.type = 'text';
        honeypot.name = 'b_386ca740d7cf02ec261f47f33_5a55144e86';
        honeypot.style.display = 'none';
        honeypot.setAttribute('tabindex', '-1');
        honeypot.setAttribute('autocomplete', 'off');
        
        form.appendChild(honeypot);
    }
    
    addRateLimiting(form) {
        const formId = Array.from(this.forms.keys()).find(id => 
            this.forms.get(id).element === form
        );
        
        if (!formId) return;
        
        const formData = this.forms.get(formId);
        const maxAttempts = 3;
        const timeWindow = 10 * 60 * 1000; // 10 minutos
        
        form.addEventListener('submit', (e) => {
            const now = new Date();
            const lastSubmission = formData.lastSubmission;
            
            if (lastSubmission && (now - lastSubmission) < timeWindow) {
                if (formData.attemptCount >= maxAttempts) {
                    e.preventDefault();
                    this.showToast('Demasiados intentos. Espera unos minutos antes de intentar de nuevo.', 'warning');
                    return false;
                }
            } else {
                // Resetear contador si ha pasado el tiempo
                formData.attemptCount = 0;
            }
        });
    }
    
    passesSpamCheck(form) {
        // Verificar honeypot
        const honeypot = form.querySelector('input[name="b_386ca740d7cf02ec261f47f33_5a55144e86"]');
        if (honeypot && honeypot.value) {
            return false; // Bot detectado
        }
        
        // Verificar tiempo de llenado (muy rápido = bot)
        const startTime = form.dataset.startTime;
        if (startTime) {
            const fillTime = Date.now() - parseInt(startTime);
            if (fillTime < 5000) { // Menos de 5 segundos
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * ========================================================================
     * SISTEMA DE NOTIFICACIONES TOAST
     * ========================================================================
     */
    setupToastSystem() {
        // Crear contenedor de toasts
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(container);
    }
    
    showToast(message, type = 'info', duration = null) {
        const toastContainer = document.getElementById('toast-container');
        if (!toastContainer) return;
        
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const colors = {
            success: { bg: '#00C853', text: '#ffffff' },
            error: { bg: '#F44336', text: '#ffffff' },
            warning: { bg: '#FF9800', text: '#ffffff' },
            info: { bg: '#2196F3', text: '#ffffff' }
        };
        
        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">×</button>
        `;
        
        const color = colors[type] || colors.info;
        toast.style.cssText = `
            background: ${color.bg};
            color: ${color.text};
            padding: 16px 20px;
            border-radius: 12px;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.2);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255,255,255,0.1);
            max-width: 400px;
            pointer-events: auto;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            font-size: 0.9rem;
            font-weight: 500;
        `;
        
        // Estilos para elementos internos
        const icon = toast.querySelector('.toast-icon');
        icon.style.cssText = `
            font-size: 1.2rem;
            font-weight: 700;
            flex-shrink: 0;
        `;
        
        const messageEl = toast.querySelector('.toast-message');
        messageEl.style.cssText = `
            flex: 1;
            line-height: 1.4;
        `;
        
        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: inherit;
            font-size: 1.5rem;
            cursor: pointer;
            padding: 0;
            line-height: 1;
            opacity: 0.7;
            transition: opacity 0.2s ease;
            flex-shrink: 0;
        `;
        
        closeBtn.addEventListener('click', () => this.hideToast(toast));
        closeBtn.addEventListener('mouseenter', () => closeBtn.style.opacity = '1');
        closeBtn.addEventListener('mouseleave', () => closeBtn.style.opacity = '0.7');
        
        toastContainer.appendChild(toast);
        
        // Animar entrada
        requestAnimationFrame(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        });
        
        // Auto-ocultar
        const hideDelay = duration || this.config.toastDuration;
        setTimeout(() => {
            if (toast.parentNode) {
                this.hideToast(toast);
            }
        }, hideDelay);
    }
    
    hideToast(toast) {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 400);
    }

    /**
     * ========================================================================
     * ANALYTICS Y TRACKING
     * ========================================================================
     */
    setupAnalytics() {
        // Configurar eventos de tracking
        this.trackingEvents = {
            form_view: 'Formulario visto',
            field_focus: 'Campo enfocado',
            field_complete: 'Campo completado',
            validation_error: 'Error de validación',
            submission_attempt: 'Intento de envío',
            subscription_success: 'Suscripción exitosa',
            subscription_error: 'Error en suscripción'
        };
        
        // Track vista inicial de formularios
        this.forms.forEach((formData, formId) => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.trackEvent('form_view', { formId });
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(formData.element);
        });
    }
    
    trackFieldInteraction(field, action) {
        if (!this.config.enableAnalytics) return;
        
        const fieldName = field.name || field.id || 'unknown';
        
        this.trackEvent('field_' + action, {
            fieldName,
            fieldType: field.type,
            hasValue: !!field.value,
            timestamp: new Date().toISOString()
        });
    }
    
    trackConversion(form, eventType) {
        if (!this.config.enableAnalytics) return;
        
        const formData = new FormData(form);
        const data = {
            email: formData.get('EMAIL'),
            name: formData.get('FNAME'),
            company: formData.get('COMPANY'),
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer
        };
        
        this.trackEvent(eventType, data);
        
        // Google Analytics 4 si está disponible
        if (typeof gtag !== 'undefined') {
            gtag('event', eventType, {
                event_category: 'form_submission',
                event_label: 'mailchimp_form',
                value: 1
            });
        }
        
        // Facebook Pixel si está disponible
        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                content_name: 'Auditoría Gratis',
                content_category: 'Marketing',
                value: 299, // Valor estimado del lead
                currency: 'USD'
            });
        }
    }
    
    trackEvent(eventName, data = {}) {
        // Enviar a analytics personalizado
        console.log(`📊 Analytics: ${eventName}`, data);
        
        // Almacenar en localStorage para análisis posterior
        try {
            const events = JSON.parse(localStorage.getItem('orange_vapor_events') || '[]');
            events.push({
                event: eventName,
                data,
                timestamp: new Date().toISOString(),
                url: window.location.href
            });
            
            // Mantener solo los últimos 100 eventos
            if (events.length > 100) {
                events.splice(0, events.length - 100);
            }
            
            localStorage.setItem('orange_vapor_events', JSON.stringify(events));
        } catch (error) {
            console.warn('No se pudo guardar evento en localStorage:', error);
        }
    }
    
    /**
     * ========================================================================
     * UTILIDADES Y HELPERS
     * ========================================================================
     */
    
    // Limpiar al descargar la página
    cleanup() {
        this.forms.clear();
        
        // Restaurar labels originales
        document.querySelectorAll('.floating-label').forEach(label => {
            const field = label.nextElementSibling;
            if (field) {
                const originalLabel = field.previousElementSibling?.previousElementSibling;
                if (originalLabel && originalLabel.tagName === 'LABEL') {
                    originalLabel.style.opacity = '1';
                    originalLabel.style.transition = '';
                }
            }
            label.remove();
        });
        
        // Remover toasts
        const toastContainer = document.getElementById('toast-container');
        if (toastContainer) {
            toastContainer.remove();
        }
        
        // Remover estilos dinámicos
        const styles = document.getElementById('mailchimp-validation-styles');
        if (styles) {
            styles.remove();
        }
        
        console.log('🧹 Mailchimp Manager - Limpieza completada');
    }
}

// Inicializar cuando el DOM esté listo
let mailchimpManager;

const initMailchimp = () => {
    mailchimpManager = new MailchimpManager();
};

// Manejar la descarga de la página
window.addEventListener('beforeunload', () => {
    if (mailchimpManager) {
        mailchimpManager.cleanup();
    }
});

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMailchimp);
} else {
    initMailchimp();
}

// Exportar para uso global
window.MailchimpManager = MailchimpManager;
