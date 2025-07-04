// ===================================
// COUNTDOWN TIMER MEJORADO
// ===================================
class CountdownTimer {
  constructor(endDate) {
    this.endDate = endDate;
    this.elements = {
      days: document.getElementById('days'),
      hours: document.getElementById('hours'),
      minutes: document.getElementById('minutes'),
      seconds: document.getElementById('seconds'),
      daysFinal: document.getElementById('days-final'),
      hoursFinal: document.getElementById('hours-final'),
      minutesFinal: document.getElementById('minutes-final'),
      secondsFinal: document.getElementById('seconds-final')
    };
    this.interval = null;
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date().getTime();
    const distance = this.endDate - now;

    if (distance < 0) {
      this.stop();
      this.showExpired();
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Actualizar todos los contadores
    this.updateElement('days', days);
    this.updateElement('hours', hours);
    this.updateElement('minutes', minutes);
    this.updateElement('seconds', seconds);
    this.updateElement('daysFinal', days);
    this.updateElement('hoursFinal', hours);
    this.updateElement('minutesFinal', minutes);
    this.updateElement('secondsFinal', seconds);

    // Añadir urgencia cuando queda poco tiempo
    if (days === 0 && hours < 2) {
      this.addUrgencyClass();
    }
  }

  updateElement(elementId, value) {
    if (this.elements[elementId]) {
      const formattedValue = value.toString().padStart(2, '0');
      if (this.elements[elementId].textContent !== formattedValue) {
        this.elements[elementId].textContent = formattedValue;
        this.animateChange(this.elements[elementId]);
      }
    }
  }

  animateChange(element) {
    element.classList.add('countdown-change');
    setTimeout(() => element.classList.remove('countdown-change'), 300);
  }

  addUrgencyClass() {
    document.querySelectorAll('.countdown-hero, .final-countdown').forEach(el => {
      el.classList.add('urgent');
    });
  }

  showExpired() {
    document.querySelectorAll('.countdown-value, .countdown-number').forEach(el => {
      el.textContent = '00';
    });
    // Opcional: mostrar mensaje de oferta expirada
    this.showExpiredMessage();
  }

  showExpiredMessage() {
    const urgencyElements = document.querySelectorAll('.urgency-title, .countdown-text');
    urgencyElements.forEach(el => {
      if (el.classList.contains('urgency-title')) {
        el.textContent = '¡Oferta finalizada!';
      }
    });
  }

  stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}

// ===================================
// HEADER SCROLL EFFECTS
// ===================================
class HeaderController {
  constructor() {
    this.header = document.getElementById('header');
    this.lastScroll = 0;
    this.scrollThreshold = 50;
  }

  init() {
    window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    const currentScroll = window.pageYOffset;
    
    // Añadir clase cuando se hace scroll
    if (currentScroll > this.scrollThreshold) {
      this.header.classList.add('scrolled');
      
      // Ocultar header al hacer scroll hacia abajo, mostrar al subir
      if (currentScroll > this.lastScroll && currentScroll > 300) {
        this.header.style.transform = 'translateY(-100%)';
      } else {
        this.header.style.transform = 'translateY(0)';
      }
    } else {
      this.header.classList.remove('scrolled');
      this.header.style.transform = 'translateY(0)';
    }
    
    this.lastScroll = currentScroll;
  }
}

// ===================================
// FAQ ACCORDION
// ===================================
class FAQAccordion {
  constructor() {
    this.questions = document.querySelectorAll('.faq-question');
  }

  init() {
    this.questions.forEach(question => {
      question.addEventListener('click', (e) => this.toggleAnswer(e));
    });
  }

  toggleAnswer(e) {
    const question = e.currentTarget;
    const answer = question.nextElementSibling;
    const isOpen = question.getAttribute('aria-expanded') === 'true';
    
    // Cerrar todas las respuestas
    this.closeAll();
    
    // Abrir la seleccionada si estaba cerrada
    if (!isOpen) {
      question.setAttribute('aria-expanded', 'true');
      answer.classList.add('active');
      
      // Scroll suave a la pregunta
      setTimeout(() => {
        question.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 300);
    }
  }

  closeAll() {
    this.questions.forEach(q => {
      q.setAttribute('aria-expanded', 'false');
      q.nextElementSibling.classList.remove('active');
    });
  }
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.benefit-card, .module-card, .testimonial-card, .timeline-item');
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, this.observerOptions);

    this.elements.forEach(element => {
      observer.observe(element);
    });
  }
}

// ===================================
// MOBILE STICKY CTA
// ===================================
class MobileStickyController {
  constructor() {
    this.stickyElement = document.getElementById('mobile-cta');
    this.heroSection = document.querySelector('.hero');
    this.showThreshold = 100;
  }

  init() {
    if (window.innerWidth <= 768) {
      window.addEventListener('scroll', () => this.handleScroll());
    }
  }

  handleScroll() {
    const heroBottom = this.heroSection.offsetTop + this.heroSection.offsetHeight;
    const scrollPosition = window.pageYOffset + window.innerHeight;
    
    if (scrollPosition > heroBottom + this.showThreshold) {
      this.stickyElement.classList.add('visible');
    } else {
      this.stickyElement.classList.remove('visible');
    }
  }
}

// ===================================
// PRICING COMPARISON TOGGLE
// ===================================
class PricingComparison {
  constructor() {
    this.toggle = document.getElementById('comparison-toggle');
    this.table = document.getElementById('comparison-table');
  }

  init() {
    if (this.toggle && this.table) {
      this.toggle.addEventListener('change', () => this.toggleTable());
    }
  }

  toggleTable() {
    if (this.toggle.checked) {
      this.table.classList.add('active');
      // Scroll to table
      setTimeout(() => {
        this.table.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 100);
    } else {
      this.table.classList.remove('active');
    }
  }
}

// ===================================
// SMOOTH SCROLLING
// ===================================
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.headerHeight = 80;
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => this.scrollToSection(e));
    });
  }

  scrollToSection(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    
    if (targetId === '#') return;
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      const offsetTop = targetSection.offsetTop - this.headerHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      
      // Update URL without jumping
      history.pushState(null, null, targetId);
    }
  }
}

// ===================================
// VIDEO PLAYER CONTROLLER
// ===================================
class VideoController {
  constructor() {
    this.playButtons = document.querySelectorAll('.play-button, .play-overlay');
    this.videoModal = null;
  }

  init() {
    this.playButtons.forEach(button => {
      button.addEventListener('click', (e) => this.playVideo(e));
    });
  }

  playVideo(e) {
    e.preventDefault();
    const button = e.currentTarget;
    button.classList.add('playing');
    
    // Si es el video testimonial de Mónica, podrías abrir un modal o redirigir
    // Por ahora solo mostramos un mensaje
    console.log('Reproducir testimonio en video...');
    
    // Opcional: mostrar alert temporal
    const message = document.createElement('div');
    message.className = 'video-message';
    message.textContent = 'Video testimonial próximamente';
    message.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0,0,0,0.8);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      z-index: 9999;
    `;
    document.body.appendChild(message);
    
    setTimeout(() => message.remove(), 2000);
  }
}

// ===================================
// FORM VALIDATION & SUBMISSION
// ===================================
class FormController {
  constructor() {
    this.forms = document.querySelectorAll('form');
  }

  init() {
    this.forms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    
    // Validación básica
    if (this.validateForm(form)) {
      // Enviar datos
      this.submitForm(form);
    }
  }

  validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
      if (!field.value.trim()) {
        isValid = false;
        this.showError(field, 'Este campo es requerido');
      } else {
        this.clearError(field);
      }
    });
    
    return isValid;
  }

  showError(field, message) {
    field.classList.add('error');
    const errorElement = field.parentElement.querySelector('.error-message') || 
                        this.createErrorElement(message);
    field.parentElement.appendChild(errorElement);
  }

  clearError(field) {
    field.classList.remove('error');
    const errorElement = field.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  createErrorElement(message) {
    const error = document.createElement('span');
    error.className = 'error-message';
    error.textContent = message;
    return error;
  }

  submitForm(form) {
    // Aquí iría la lógica de envío
    console.log('Form submitted:', new FormData(form));
    
    // Mostrar mensaje de éxito
    this.showSuccessMessage(form);
  }

  showSuccessMessage(form) {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = '¡Gracias! Te contactaremos pronto.';
    form.appendChild(successMessage);
    
    // Ocultar después de 5 segundos
    setTimeout(() => successMessage.remove(), 5000);
  }
}

// ===================================
// ANALYTICS TRACKING
// ===================================
class Analytics {
  constructor() {
    this.events = {
      ctaClicks: document.querySelectorAll('.btn-primary, .btn-plan, .btn-cta'),
      videoPlays: document.querySelectorAll('.play-button, .play-overlay'),
      faqOpens: document.querySelectorAll('.faq-question')
    };
  }

  init() {
    // Track CTA clicks
    this.events.ctaClicks.forEach(cta => {
      cta.addEventListener('click', () => this.trackEvent('CTA_Click', {
        label: cta.textContent.trim(),
        location: this.getElementLocation(cta)
      }));
    });

    // Track video plays
    this.events.videoPlays.forEach(video => {
      video.addEventListener('click', () => this.trackEvent('Video_Play', {
        label: 'Preview Video'
      }));
    });

    // Track FAQ interactions
    this.events.faqOpens.forEach(faq => {
      faq.addEventListener('click', () => this.trackEvent('FAQ_Open', {
        question: faq.textContent.trim()
      }));
    });

    // Track scroll depth
    this.trackScrollDepth();
  }

  trackEvent(eventName, eventData) {
    // Google Analytics 4
    if (typeof gtag !== 'undefined') {
      gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel
    if (typeof fbq !== 'undefined') {
      fbq('track', eventName, eventData);
    }
    
    // Console log for debugging
    console.log('Analytics Event:', eventName, eventData);
  }

  getElementLocation(element) {
    const section = element.closest('section');
    return section ? section.className.split(' ')[0] : 'unknown';
  }

  trackScrollDepth() {
    let maxScroll = 0;
    const trackPoints = [25, 50, 75, 100];
    
    window.addEventListener('scroll', () => {
      const scrollPercentage = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      trackPoints.forEach(point => {
        if (scrollPercentage >= point && maxScroll < point) {
          maxScroll = point;
          this.trackEvent('Scroll_Depth', { depth: point + '%' });
        }
      });
    });
  }
}

// ===================================
// LAZY LOADING
// ===================================
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    this.videos = document.querySelectorAll('iframe[data-src]');
  }

  init() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.loadImage(entry.target);
          imageObserver.unobserve(entry.target);
        }
      });
    });

    this.images.forEach(img => imageObserver.observe(img));
    this.videos.forEach(video => imageObserver.observe(video));
  }

  loadImage(element) {
    const src = element.getAttribute('data-src');
    if (src) {
      element.src = src;
      element.removeAttribute('data-src');
      element.classList.add('loaded');
    }
  }
}

// ===================================
// TESTIMONIAL CAROUSEL
// ===================================
class TestimonialCarousel {
  constructor() {
    this.testimonials = document.querySelectorAll('.testimonial-card');
    this.currentIndex = 0;
    this.autoplayInterval = null;
  }

  init() {
    if (window.innerWidth <= 768 && this.testimonials.length > 1) {
      this.setupCarousel();
      this.startAutoplay();
    }
  }

  setupCarousel() {
    // Añadir navegación
    const container = document.querySelector('.testimonials-grid');
    const navigation = document.createElement('div');
    navigation.className = 'carousel-navigation';
    
    const prevBtn = document.createElement('button');
    prevBtn.className = 'carousel-btn prev';
    prevBtn.innerHTML = '←';
    prevBtn.addEventListener('click', () => this.prev());
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'carousel-btn next';
    nextBtn.innerHTML = '→';
    nextBtn.addEventListener('click', () => this.next());
    
    navigation.appendChild(prevBtn);
    navigation.appendChild(nextBtn);
    container.appendChild(navigation);
    
    // Mostrar solo el primer testimonio
    this.showTestimonial(0);
  }

  showTestimonial(index) {
    this.testimonials.forEach((testimonial, i) => {
      testimonial.style.display = i === index ? 'block' : 'none';
    });
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.testimonials.length;
    this.showTestimonial(this.currentIndex);
    this.resetAutoplay();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.testimonials.length) % this.testimonials.length;
    this.showTestimonial(this.currentIndex);
    this.resetAutoplay();
  }

  startAutoplay() {
    this.autoplayInterval = setInterval(() => this.next(), 5000);
  }

  resetAutoplay() {
    clearInterval(this.autoplayInterval);
    this.startAutoplay();
  }
}

// ===================================
// MAIN APP INITIALIZATION
// ===================================
class App {
  constructor() {
    this.modules = {
      countdown: CountdownTimer,
      header: HeaderController,
      faq: FAQAccordion,
      animations: ScrollAnimations,
      mobileSticky: MobileStickyController,
      pricing: PricingComparison,
      smoothScroll: SmoothScroll,
      video: VideoController,
      forms: FormController,
      analytics: Analytics,
      lazyLoader: LazyLoader,
      testimonials: TestimonialCarousel
    };
  }

  init() {
    // Inicializar countdown
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 3); // 3 días desde ahora
    const countdown = new this.modules.countdown(endDate);
    countdown.start();

    // Inicializar otros módulos
    Object.keys(this.modules).forEach(key => {
      if (key !== 'countdown') {
        const module = new this.modules[key]();
        if (typeof module.init === 'function') {
          module.init();
        }
      }
    });

    // Añadir clases de animación al cargar
    this.addLoadAnimations();
  }

  addLoadAnimations() {
    setTimeout(() => {
      document.querySelector('.hero-title').classList.add('fade-in-up');
      document.querySelector('.hero-subtitle').classList.add('fade-in-up');
      document.querySelector('.social-proof-hero').classList.add('fade-in-up');
    }, 100);
  }
}

// ===================================
// UTILIDADES
// ===================================
const Utils = {
  // Debounce para optimizar eventos de scroll
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // Throttle para limitar la frecuencia de ejecución
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  // Formatear números con separadores de miles
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  // Detectar dispositivo móvil
  isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }
};

// ===================================
// INICIALIZACIÓN CUANDO EL DOM ESTÁ LISTO
// ===================================
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();

  // Añadir listeners para mejorar performance
  let scrollTimer;
  window.addEventListener('scroll', () => {
    document.body.classList.add('scrolling');
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      document.body.classList.remove('scrolling');
    }, 100);
  });

  // Prevenir zoom en iOS al hacer focus en inputs
  if (Utils.isMobile()) {
    document.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('focus', () => {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
      });
      
      input.addEventListener('blur', () => {
        document.querySelector('meta[name="viewport"]').setAttribute('content', 
          'width=device-width, initial-scale=1.0');
      });
    });
  }

  // Easter egg para desarrolladores
  console.log('%c🚀 Fabuladores - 720 Formas de Narrar', 
    'font-size: 20px; font-weight: bold; color: #f63572;');
  console.log('%c¿Eres desarrollador? ¡Únete a nuestro equipo!', 
    'font-size: 14px; color: #2563eb;');
  console.log('%cContacta con nosotros en: dev@fabuladores.com', 
    'font-size: 12px; color: #666;');
});

// ===================================
// SERVICE WORKER PARA PWA (OPCIONAL)
// ===================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(registration => {
      console.log('ServiceWorker registrado:', registration);
    }).catch(error => {
      console.log('ServiceWorker falló:', error);
    });
  });
}

// ===================================
// CSS PARA ANIMACIONES DINÁMICAS
// ===================================
const style = document.createElement('style');
style.textContent = `
  .countdown-change {
    animation: flipNumber 0.3s ease-in-out;
  }
  
  @keyframes flipNumber {
    0% { transform: rotateX(0deg); }
    50% { transform: rotateX(90deg); }
    100% { transform: rotateX(0deg); }
  }
  
  .urgent .countdown-value,
  .urgent .countdown-number {
    color: #ef4444 !important;
    animation: urgentPulse 1s infinite;
  }
  
  @keyframes urgentPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  
  .scrolling .header {
    transition-duration: 0.1s;
  }
  
  .fade-in-up {
    opacity: 0;
    transform: translateY(30px);
    animation: fadeInUp 0.6s ease-out forwards;
  }
  
  .error {
    border-color: #ef4444 !important;
  }
  
  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
    display: block;
  }
  
  .success-message {
    background: #10b981;
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-top: 1rem;
    text-align: center;
    animation: slideInUp 0.3s ease-out;
  }
  
  @keyframes slideInUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  
  .carousel-navigation {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .carousel-btn {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #2563eb;
    color: white;
    font-size: 1.25rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .carousel-btn:hover {
    background: #1d4ed8;
    transform: scale(1.1);
  }
  
  .loaded {
    animation: imageLoaded 0.3s ease-out;
  }
  
  @keyframes imageLoaded {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);
