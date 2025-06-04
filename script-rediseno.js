/**
 * ORANGE VAPOR 2025 - JAVASCRIPT FUTURISTA
 * 
 * Funcionalidades implementadas:
 * 1. Navbar glassmórfico con scroll effects
 * 2. Animaciones de intersección avanzadas
 * 3. Efectos de cursor modernos
 * 4. Smooth scrolling mejorado
 * 5. Parallax sutil y performante
 * 6. Micro-interacciones
 * 7. Formularios con validación visual
 * 8. Efectos de typing
 * 9. Performance optimizado
 * 10. Lazy loading de animaciones
 */

class OrangeVaporApp {
    constructor() {
        this.isInitialized = false;
        this.scrollY = 0;
        this.isScrolling = false;
        this.observers = new Map();
        this.animations = new Map();
        
        // Configuración de performance
        this.config = {
            enableParallax: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            enableAnimations: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            throttleDelay: 16, // ~60fps
            debounceDelay: 250
        };
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        // Esperar a que el DOM esté listo
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }
    
    setup() {
        console.log('🚀 Orange Vapor 2025 - Iniciando experiencia futurista...');
        
        // Inicializar módulos principales
        this.setupNavbar();
        this.setupScrollEffects();
        this.setupIntersectionObserver();
        this.setupFormEnhancements();
        this.setupCursorEffects();
        this.setupPerformanceOptimizations();
        this.setupAccessibility();
        
        // Animaciones de entrada
        if (this.config.enableAnimations) {
            this.playEntryAnimations();
        }
        
        this.isInitialized = true;
        console.log('✨ Orange Vapor 2025 - Listo para impresionar!');
    }
    
    /**
     * ========================================================================
     * NAVBAR GLASSMÓRFICO CON EFECTOS AVANZADOS
     * ========================================================================
     */
    setupNavbar() {
        const navbar = document.querySelector('.navbar');
        if (!navbar) return;
        
        let lastScrollY = 0;
        let ticking = false;
        
        const updateNavbar = () => {
            const currentScrollY = window.scrollY;
            const scrollDelta = currentScrollY - lastScrollY;
            
            // Efecto glassmórfico basado en scroll
            if (currentScrollY > 100) {
                navbar.classList.add('scrolled');
                this.addGlassEffect(navbar, Math.min(currentScrollY / 500, 1));
            } else {
                navbar.classList.remove('scrolled');
                this.removeGlassEffect(navbar);
            }
            
            // Auto-hide navbar en móvil al hacer scroll down
            if (window.innerWidth <= 768) {
                if (scrollDelta > 5 && currentScrollY > 100) {
                    navbar.style.transform = 'translateY(-100%)';
                } else if (scrollDelta < -5) {
                    navbar.style.transform = 'translateY(0)';
                }
            }
            
            lastScrollY = currentScrollY;
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        this.onScroll = onScroll;
        window.addEventListener('scroll', this.onScroll, { passive: true });
        
        // Smooth scroll para enlaces del navbar
        this.setupSmoothScroll();
    }
    
    addGlassEffect(element, intensity) {
        const blur = Math.round(20 + (intensity * 10));
        const opacity = Math.round((0.1 + (intensity * 0.1)) * 100) / 100;
        
        element.style.backdropFilter = `blur(${blur}px) saturate(180%)`;
        element.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    }
    
    removeGlassEffect(element) {
        element.style.backdropFilter = 'blur(20px) saturate(180%)';
        element.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
    }
    
    /**
     * ========================================================================
     * SMOOTH SCROLL MEJORADO
     * ========================================================================
     */
    setupSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const navbar = document.querySelector('.navbar');
                    const navbarHeight = navbar ? navbar.offsetHeight : 0;
                    const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                    
                    // Smooth scroll con easing personalizado
                    this.smoothScrollTo(targetPosition, 1000);
                    
                    // Efecto visual en el enlace clickeado
                    this.addClickEffect(anchor);
                }
            });
        });
    }
    
    smoothScrollTo(targetPosition, duration) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;
        
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };
        
        const animation = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = easeInOutCubic(progress);
            
            window.scrollTo(0, startPosition + distance * ease);
            
            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };
        
        requestAnimationFrame(animation);
    }
    
    addClickEffect(element) {
        element.style.transform = 'scale(0.95)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            setTimeout(() => {
                element.style.transition = '';
            }, 100);
        }, 100);
    }
    
    /**
     * ========================================================================
     * INTERSECTION OBSERVER PARA ANIMACIONES
     * ========================================================================
     */
    setupIntersectionObserver() {
        if (!this.config.enableAnimations) return;
        
        const observerOptions = {
            threshold: [0.1, 0.3, 0.5, 0.7],
            rootMargin: '-50px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target, entry.intersectionRatio);
                }
            });
        }, observerOptions);
        
        // Elementos a animar
        const animatedElements = document.querySelectorAll(`
            .problem-card,
            .service-card,
            .plan-feature,
            .credential,
            .outcome,
            .benefits-list li,
            .testimonial-quote
        `);
        
        animatedElements.forEach(el => {
            observer.observe(el);
            el.classList.add('animate-on-scroll');
        });
        
        this.observers.set('main', observer);
    }
    
    animateElement(element, ratio) {
        if (element.classList.contains('animated')) return;
        
        const animationType = this.getAnimationType(element);
        const delay = this.getAnimationDelay(element);
        
        setTimeout(() => {
            element.classList.add('animated');
            this.playAnimation(element, animationType);
        }, delay);
    }
    
    getAnimationType(element) {
        if (element.classList.contains('problem-card')) return 'slideUp';
        if (element.classList.contains('service-card')) return 'scaleIn';
        if (element.classList.contains('plan-feature')) return 'slideRight';
        if (element.classList.contains('credential')) return 'slideLeft';
        return 'fadeIn';
    }
    
    getAnimationDelay(element) {
        const siblings = Array.from(element.parentElement.children);
        const index = siblings.indexOf(element);
        return index * 100; // 100ms entre elementos
    }
    
    playAnimation(element, type) {
        const animations = {
            fadeIn: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            },
            slideUp: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(40px)';
                element.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                });
            },
            slideRight: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateX(-40px)';
                element.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                });
            },
            slideLeft: () => {
                element.style.opacity = '0';
                element.style.transform = 'translateX(40px)';
                element.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'translateX(0)';
                });
            },
            scaleIn: () => {
                element.style.opacity = '0';
                element.style.transform = 'scale(0.9)';
                element.style.transition = 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                requestAnimationFrame(() => {
                    element.style.opacity = '1';
                    element.style.transform = 'scale(1)';
                });
            }
        };
        
        if (animations[type]) {
            animations[type]();
        }
    }
    
    /**
     * ========================================================================
     * EFECTOS DE CURSOR MODERNOS
     * ========================================================================
     */
    setupCursorEffects() {
        if (window.innerWidth <= 768) return; // Solo en desktop
        
        // Crear cursor personalizado
        const cursor = this.createCustomCursor();
        document.body.classList.add('hide-default-cursor');
        
        // Elementos interactivos
        const interactiveElements = document.querySelectorAll(`
            a,
            button,
            .btn-primary,
            .btn-success,
            .btn-nav,
            .service-card,
            .problem-card,
            input,
            textarea
        `);
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => this.activateCursor(cursor));
            el.addEventListener('mouseleave', () => this.deactivateCursor(cursor));
        });
        
        // Seguimiento del mouse
        document.addEventListener('mousemove', (e) => {
            this.updateCursorPosition(cursor, e.clientX, e.clientY);
        });
    }
    
    createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.innerHTML = `
            <div class="cursor-inner"></div>
            <div class="cursor-outer"></div>
        `;
        
        // Estilos del cursor
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: difference;
            }
            
            .cursor-inner {
                width: 8px;
                height: 8px;
                background: #FF6B35;
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            }
            
            .cursor-outer {
                width: 32px;
                height: 32px;
                border: 2px solid rgba(255, 107, 53, 0.3);
                border-radius: 50%;
                position: absolute;
                transform: translate(-50%, -50%);
                transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }
            
            .custom-cursor.active .cursor-inner {
                transform: translate(-50%, -50%) scale(1.5);
                background: #00C853;
            }
            
            .custom-cursor.active .cursor-outer {
                transform: translate(-50%, -50%) scale(1.5);
                border-color: rgba(0, 200, 83, 0.5);
            }

            .hide-default-cursor {
                cursor: none;
            }
        `;
        
        document.head.appendChild(style);
        document.body.appendChild(cursor);
        
        return cursor;
    }
    
    updateCursorPosition(cursor, x, y) {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
    }
    
    activateCursor(cursor) {
        cursor.classList.add('active');
    }
    
    deactivateCursor(cursor) {
        cursor.classList.remove('active');
    }
    
    /**
     * ========================================================================
     * MEJORAS DE FORMULARIOS
     * ========================================================================
     */
    setupFormEnhancements() {
        const forms = document.querySelectorAll('form');
        
        forms.forEach((form) => {
            this.enhanceForm(form);
        });
    }
    
    enhanceForm(form) {
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach((input) => {
            this.enhanceInput(input);
        });
        
        // Validación en tiempo real
        form.addEventListener('submit', (e) => {
            if (!this.validateForm(form)) {
                e.preventDefault();
                this.showFormErrors(form);
            } else {
                this.showFormSuccess(form);
            }
        });
    }
    
    enhanceInput(input) {
        // Efectos de foco mejorados
        input.addEventListener('focus', () => {
            this.addInputFocusEffect(input);
        });
        
        input.addEventListener('blur', () => {
            this.removeInputFocusEffect(input);
            this.validateInput(input);
        });
        
        // Animación de typing
        if (input.type === 'text' || input.type === 'email') {
            input.addEventListener('input', () => {
                this.addTypingEffect(input);
            });
        }
    }
    
    addInputFocusEffect(input) {
        input.style.transform = 'translateY(-2px)';
        input.style.boxShadow = '0 0 0 4px rgba(255, 107, 53, 0.1), 0 8px 25px rgba(0,0,0,0.15)';
    }
    
    removeInputFocusEffect(input) {
        input.style.transform = 'translateY(0)';
        input.style.boxShadow = '';
    }
    
    addTypingEffect(input) {
        input.classList.add('typing');
        clearTimeout(input.typingTimeout);
        
        input.typingTimeout = setTimeout(() => {
            input.classList.remove('typing');
        }, 500);
    }
    
    validateInput(input) {
        const isValid = input.checkValidity();
        
        if (isValid) {
            this.showInputSuccess(input);
        } else {
            this.showInputError(input);
        }
        
        return isValid;
    }
    
    showInputSuccess(input) {
        input.classList.remove('error');
        input.classList.add('success');
        input.style.borderColor = '#00C853';
    }
    
    showInputError(input) {
        input.classList.remove('success');
        input.classList.add('error');
        input.style.borderColor = '#F44336';
        
        // Shake animation
        input.style.animation = 'shake 0.5s ease-in-out';
        setTimeout(() => {
            input.style.animation = '';
        }, 500);
    }
    
    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach((input) => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    showFormSuccess(form) {
        const button = form.querySelector('button[type="submit"], input[type="submit"]');
        if (button) {
            const originalText = button.value || button.textContent;
            button.textContent = '✓ Enviado!';
            button.style.background = '#00C853';
            
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 3000);
        }
    }
    
    showFormErrors(form) {
        const errorInputs = form.querySelectorAll('.error');
        if (errorInputs.length > 0) {
            errorInputs[0].focus();
            errorInputs[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    /**
     * ========================================================================
     * EFECTOS DE SCROLL PARALLAX
     * ========================================================================
     */
    setupScrollEffects() {
        if (!this.config.enableParallax) return;
        
        const parallaxElements = document.querySelectorAll(`
            .hero-wave,
            .problem-icon,
            .service-icon,
            .floating-cta
        `);
        
        let ticking = false;
        
        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach((el, index) => {
                const speed = 0.3 + (index * 0.1);
                const yPos = -(scrolled * speed);
                el.style.transform = `translateY(${yPos}px)`;
            });
            
            ticking = false;
        };
        
        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        };

        this.parallaxScroll = onScroll;
        window.addEventListener('scroll', this.parallaxScroll, { passive: true });
    }
    
    /**
     * ========================================================================
     * ANIMACIONES DE ENTRADA
     * ========================================================================
     */
    playEntryAnimations() {
        const heroElements = document.querySelectorAll('.hero-content > *');
        const formCard = document.querySelector('.form-card');
        
        // Animar elementos del hero secuencialmente
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 150);
        });
        
        // Animar form card
        if (formCard) {
            setTimeout(() => {
                formCard.style.opacity = '1';
                formCard.style.transform = 'translateX(0) rotateX(0)';
            }, 800);
        }
    }
    
    /**
     * ========================================================================
     * OPTIMIZACIONES DE PERFORMANCE
     * ========================================================================
     */
    setupPerformanceOptimizations() {
        // Lazy loading para imágenes
        this.setupLazyLoading();
        
        // Throttle de eventos
        this.setupEventThrottling();
        
        // Preload de recursos críticos
        this.preloadCriticalResources();
    }
    
    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback para navegadores antiguos
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    }
    
    setupEventThrottling() {
        // Throttle para eventos de resize
        let resizeTimeout;
        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, this.config.debounceDelay);
        };

        this.onResize = onResize;
        window.addEventListener('resize', this.onResize);
    }
    
    handleResize() {
        // Recalcular elementos que dependen del viewport
        const viewport = {
            width: window.innerWidth,
            height: window.innerHeight
        };
        
        // Reactivar/desactivar efectos según el tamaño
        if (viewport.width <= 768) {
            this.disableDesktopEffects();
        } else {
            this.enableDesktopEffects();
        }
    }
    
    disableDesktopEffects() {
        // Desactivar cursor personalizado en móvil
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.display = 'none';
        document.body.classList.remove('hide-default-cursor');
    }

    enableDesktopEffects() {
        // Reactivar efectos de desktop
        const cursor = document.querySelector('.custom-cursor');
        if (cursor) cursor.style.display = 'block';
        document.body.classList.add('hide-default-cursor');
    }
    
    preloadCriticalResources() {
        // Precargar fuentes críticas
        const fontPreloads = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap'
        ];
        
        fontPreloads.forEach(font => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = font;
            link.as = 'style';
            document.head.appendChild(link);
        });
    }
    
    /**
     * ========================================================================
     * ACCESIBILIDAD
     * ========================================================================
     */
    setupAccessibility() {
        // Skip link para navegación por teclado
        this.createSkipLink();
        
        // Mejorar navegación por teclado
        this.enhanceKeyboardNavigation();
        
        // Respeto por prefers-reduced-motion
        this.respectMotionPreferences();
    }
    
    createSkipLink() {
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Saltar al contenido principal';
        skipLink.className = 'skip-link';
        
        const style = document.createElement('style');
        style.textContent = `
            .skip-link {
                position: absolute;
                top: -40px;
                left: 6px;
                background: #000;
                color: #fff;
                padding: 8px;
                text-decoration: none;
                z-index: 9999;
                border-radius: 4px;
            }
            .skip-link:focus {
                top: 6px;
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    enhanceKeyboardNavigation() {
        // Mejorar indicadores de foco
        const focusableElements = document.querySelectorAll(`
            a, button, input, textarea, select, 
            [tabindex]:not([tabindex="-1"])
        `);
        
        focusableElements.forEach(el => {
            el.addEventListener('focus', () => {
                el.style.outline = '2px solid #FF6B35';
                el.style.outlineOffset = '2px';
            });
            
            el.addEventListener('blur', () => {
                el.style.outline = '';
                el.style.outlineOffset = '';
            });
        });
    }
    
    respectMotionPreferences() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Desactivar animaciones para usuarios que prefieren menos movimiento
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    /**
     * ========================================================================
     * UTILIDADES Y HELPERS
     * ========================================================================
     */
    
    // Throttle function
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }
    
    // Debounce function
    debounce(func, delay) {
        let timeoutId;
        
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }
    
    // Cleanup al descargar la página
    cleanup() {
        this.observers.forEach(observer => observer.disconnect());
        this.animations.clear();
        
        // Remover event listeners
        if (this.onScroll) {
            window.removeEventListener('scroll', this.onScroll);
        }
        if (this.parallaxScroll) {
            window.removeEventListener('scroll', this.parallaxScroll);
        }
        if (this.onResize) {
            window.removeEventListener('resize', this.onResize);
        }
    }
}

// CSS adicional para animaciones
const additionalStyles = `
<style>
    /* Animaciones de entrada */
    .hero-content > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .form-card {
        opacity: 0;
        transform: translateX(30px) rotateX(5deg);
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    /* Efectos de typing */
    .typing {
        position: relative;
    }
    
    .typing::after {
        content: '';
        position: absolute;
        right: 10px;
        top: 50%;
        width: 2px;
        height: 60%;
        background: #FF6B35;
        transform: translateY(-50%);
        animation: blink 1s infinite;
    }
    
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    
    /* Shake animation para errores */
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    /* Estados de inputs */
    input.success, textarea.success {
        border-color: #00C853 !important;
        box-shadow: 0 0 0 3px rgba(0, 200, 83, 0.1) !important;
    }
    
    input.error, textarea.error {
        border-color: #F44336 !important;
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1) !important;
    }
    
    /* Elementos que se animan al hacer scroll */
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }
    
    .animate-on-scroll.animated {
        opacity: 1;
        transform: translateY(0);
    }
    
    /* Mejoras de accesibilidad */
    @media (prefers-reduced-motion: reduce) {
        .animate-on-scroll,
        .hero-content > *,
        .form-card {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
        }
    }
    
    /* Optimizaciones para touch devices */
    @media (hover: none) and (pointer: coarse) {
        .custom-cursor {
            display: none !important;
        }
        
        /* Mejorar areas de toque */
        button, a, input[type="submit"] {
            min-height: 44px;
            min-width: 44px;
        }
    }
</style>
`;

// Insertar estilos adicionales
document.head.insertAdjacentHTML('beforeend', additionalStyles);

// Inicializar la aplicación cuando el DOM esté listo
let orangeVaporApp;

const initApp = () => {
    orangeVaporApp = new OrangeVaporApp();
};

// Manejar la descarga de la página
window.addEventListener('beforeunload', () => {
    if (orangeVaporApp) {
        orangeVaporApp.cleanup();
    }
});

// Inicializar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

// Exportar para uso global si es necesario
window.OrangeVaporApp = OrangeVaporApp;
