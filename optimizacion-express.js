/**
 * Orange Vapor - JavaScript para Optimización Express
 * Optimizado para mejor rendimiento y experiencia de usuario
 * Versión: 1.2 - Actualizada para trabajar con la nueva navbar
 */

document.addEventListener('DOMContentLoaded', function() {
  // =========================================================================
  // 1. INICIALIZACIÓN Y CONFIGURACIÓN
  // =========================================================================
  
  // Detectar soporte para características específicas
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  
  // Configuración de animaciones basada en capacidades del dispositivo
  const isMobile = window.innerWidth <= 768;
  const preferReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Reducir animaciones si es móvil o se prefiere menos movimiento
  if (isMobile || preferReducedMotion) {
    document.documentElement.classList.add('reduce-animations');
  }
  
  // =========================================================================
  // 2. MANEJO DEL ACORDEÓN FAQ
  // =========================================================================
  const faqItems = document.querySelectorAll('.faq-item');
  
  // Inicializar el acordeón de preguntas frecuentes
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', function() {
      // Cerrar otros items abiertos
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          const answer = otherItem.querySelector('.faq-answer');
          answer.style.maxHeight = null;
        }
      });
      
      // Toggle el item actual
      item.classList.toggle('active');
      
      // Animación suave de despliegue
      const answer = item.querySelector('.faq-answer');
      if (item.classList.contains('active')) {
        answer.style.display = 'block';
        answer.style.maxHeight = answer.scrollHeight + 'px';
      } else {
        answer.style.maxHeight = null;
        setTimeout(() => {
          answer.style.display = 'none';
        }, 300);
      }
    });
  });
  
  // Activar el primer FAQ por defecto
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
    const firstAnswer = faqItems[0].querySelector('.faq-answer');
    if (firstAnswer) {
      firstAnswer.style.display = 'block';
    }
  }
  
  // =========================================================================
  // 3. BOTÓN PARA VOLVER ARRIBA
  // =========================================================================
  const scrollTopBtn = document.createElement('button');
  scrollTopBtn.className = 'scroll-top-btn';
  scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
  scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 100px;
    right: 20px;
    width: 45px;
    height: 45px;
    background-color: #dc3545;
    color: white;
    border-radius: 50%;
    border: none;
    font-size: 18px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16);
    z-index: 98;
    transition: all 0.3s ease;
    opacity: 0;
    transform: translateY(20px);
    display: none;
  `;
  
  document.body.appendChild(scrollTopBtn);
  
  // Manejar click en el botón
  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Mostrar/ocultar botón según posición del scroll
  let lastScrollTop = 0;
  window.addEventListener('scroll', function() {
    const st = window.scrollY;
    
    // Mostrar botón cuando se ha hecho scroll suficiente
    if (st > 600) {
      scrollTopBtn.style.display = 'block';
      setTimeout(() => {
        scrollTopBtn.style.opacity = '1';
        scrollTopBtn.style.transform = 'translateY(0)';
      }, 10);
    } else {
      scrollTopBtn.style.opacity = '0';
      scrollTopBtn.style.transform = 'translateY(20px)';
      setTimeout(() => {
        if (window.scrollY <= 600) {
          scrollTopBtn.style.display = 'none';
        }
      }, 300);
    }
    
    // Ocultar botón cuando se muestra el CTA flotante en móvil
    if (isMobile && st > lastScrollTop) {
      scrollTopBtn.style.opacity = '0';
    }
    
    lastScrollTop = st <= 0 ? 0 : st;
  }, { passive: true });
  
  // =========================================================================
  // 4. ANIMACIONES AL HACER SCROLL
  // =========================================================================
  const fadeElements = document.querySelectorAll('.fade-in');
  let animationFrameId = null;
  
  if (supportsIntersectionObserver) {
    // Usar IntersectionObserver si está disponible
    const observerOptions = { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };
    
    // En móvil, reducimos el umbral para que se animen antes
    if (isMobile) {
      observerOptions.threshold = 0.05;
      observerOptions.rootMargin = '0px 0px -10px 0px';
    }
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Añadir una pequeña espera para animaciones escalonadas
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, isMobile ? 50 : 100);
          
          // Una vez visible, dejar de observar
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    function checkVisibility() {
      cancelAnimationFrame(animationFrameId);
      
      animationFrameId = requestAnimationFrame(() => {
        const visibleElements = [];
        
        fadeElements.forEach(element => {
          if (!element.classList.contains('visible')) {
            const rect = element.getBoundingClientRect();
            const isVisible = (
              rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
              rect.bottom >= 0
            );
            
            if (isVisible) {
              visibleElements.push(element);
            }
          }
        });
        
        // Aplicar las clases después del cálculo para mejor rendimiento
        visibleElements.forEach((element, index) => {
          setTimeout(() => {
            element.classList.add('visible');
          }, index * 50);
        });
      });
    }
    
    // Ejecutar al cargar y al hacer scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility, { passive: true });
  }
  
  // =========================================================================
  // 5. NAVEGACIÓN SUAVE PARA ENLACES INTERNOS
  // =========================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      // Solo procesar enlaces internos válidos
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        // Calcular offset basado en elementos fijos
        const headerHeight = document.querySelector('.ov-header')?.offsetHeight || 0;
        const offset = headerHeight + 20; // 20px extra para espacio
        
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        history.pushState(null, null, targetId);
        
        // Si el menú móvil está abierto, usar la función de OrangeVapor para cerrarlo
        if (window.OrangeVapor && typeof window.OrangeVapor.closeMobileMenu === 'function') {
          window.OrangeVapor.closeMobileMenu();
        }
      }
    });
  });
  
  // =========================================================================
  // 6. CORRECCIÓN DE ELEMENTOS SUPERPUESTOS
  // =========================================================================
  
  // Corregir superposiciones en la sección de precio
  function corregirSuperposiciones() {
    // Precio Badge
    const precioBadge = document.querySelector('.precio-badge');
    const precioInfo = document.querySelector('.precio-info');
    if (precioBadge && precioInfo) {
      // Asegurar que el badge tiene suficiente espacio
      const badgeHeight = precioBadge.offsetHeight;
      precioInfo.style.paddingTop = (badgeHeight / 2) + 'px';
    }
    
    // Bono especial - badge de descuento
    const descuentoBadge = document.querySelector('.descuento-badge');
    const bonusOferta = document.querySelector('.bonus-oferta');
    
    if (descuentoBadge && bonusOferta && window.innerWidth <= 768) {
      // En móvil, cambiar a flex column para evitar superposición
      bonusOferta.style.flexDirection = 'column';
      bonusOferta.style.gap = '15px';
    }
  }
  
  // Ejecutar al cargar y al cambiar tamaño de ventana
  window.addEventListener('load', corregirSuperposiciones);
  window.addEventListener('resize', corregirSuperposiciones);
  
  // =========================================================================
  // 7. EFECTOS PARA ELEMENTOS INTERACTIVOS
  // =========================================================================
  
  // Efecto hover para tarjetas del plan
  const procesoPasos = document.querySelectorAll('.proceso-paso');
  procesoPasos.forEach(paso => {
    paso.addEventListener('mouseenter', function() {
      const icono = this.querySelector('.paso-icono');
      if (icono && !isMobile) {
        icono.style.transform = 'rotate(10deg)';
      }
    });
    
    paso.addEventListener('mouseleave', function() {
      const icono = this.querySelector('.paso-icono');
      if (icono) {
        icono.style.transform = '';
      }
    });
  });
  
  // Efectos pulsación en botones
  const actionButtons = document.querySelectorAll('.btn-lg, .btn-express');
  actionButtons.forEach(button => {
    button.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // =========================================================================
  // 8. ANIMACIÓN DE CONTADOR DE SPOTS DISPONIBLES
  // =========================================================================
  const spotsLabel = document.querySelector('.spots-label span:last-child');
  const spotsBar = document.querySelector('.spots-bar');
  
  // Simular disminución gradual de spots disponibles
  function actualizarSpots() {
    if (spotsLabel && spotsBar) {
      // Mostrar notificación de plaza ocupada
      const notification = document.createElement('div');
      notification.className = 'booking-notification';
      notification.innerHTML = `
        <div class="notification-icon">
          <i class="fas fa-user-check"></i>
        </div>
        <div class="notification-content">
          <p>¡Alguien acaba de reservar su diagnóstico!</p>
          <span>Queda 1 lugar disponible esta semana</span>
        </div>
        <button class="notification-close" aria-label="Cerrar notificación"><i class="fas fa-times"></i></button>
      `;
      
      // Aplicar estilos
      notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        background-color: white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        border-radius: 8px;
        padding: 15px;
        display: flex;
        align-items: center;
        max-width: 320px;
        z-index: 1000;
        animation: fadeInUp 0.5s forwards;
      `;
      
      // Añadir al DOM
      document.body.appendChild(notification);
      
      // Configurar botón de cierre
      const closeButton = notification.querySelector('.notification-close');
      closeButton.style.cssText = `
        background: none;
        border: none;
        color: #999;
        cursor: pointer;
        padding: 5px;
        margin-left: 10px;
      `;
      
      closeButton.addEventListener('click', function() {
        notification.style.animation = 'fadeOutDown 0.5s forwards';
        setTimeout(() => {
          if (document.body.contains(notification)) {
            document.body.removeChild(notification);
          }
        }, 500);
      });
      
      // Actualizar contador de spots ocupados
      setTimeout(() => {
        if (spotsLabel && spotsBar) {
          spotsLabel.textContent = '2 spots ocupados';
          spotsBar.style.width = '66%';
        }
      }, 1000);
      
      // Auto-cerrar después de 8 segundos
      setTimeout(() => {
        if (document.body.contains(notification)) {
          notification.style.animation = 'fadeOutDown 0.5s forwards';
          setTimeout(() => {
            if (document.body.contains(notification)) {
              document.body.removeChild(notification);
            }
          }, 500);
        }
      }, 8000);
    }
  }
  
  // Mostrar notificación de forma aleatoria después de un tiempo
  if (Math.random() < 0.3 && !isMobile) {
    setTimeout(actualizarSpots, 45000);
  }
  
  // =========================================================================
  // 9. ESTILOS DINÁMICOS Y CORRECCIONES ESPECÍFICAS
  // =========================================================================
  
  // Añadir estilos para animaciones y correcciones
  const styleElement = document.createElement('style');
  styleElement.textContent = `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeOutDown {
      from {
        opacity: 1;
        transform: translateY(0);
      }
      to {
        opacity: 0;
        transform: translateY(20px);
      }
    }
    
    .booking-notification {
      opacity: 0;
      transform: translateY(20px);
      animation: fadeInUp 0.5s forwards;
    }
    
    .booking-notification .notification-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(220, 53, 69, 0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      color: #dc3545;
    }
    
    .booking-notification .notification-content {
      flex: 1;
    }
    
    .booking-notification .notification-content p {
      margin: 0 0 5px 0;
      font-weight: 600;
    }
    
    .booking-notification .notification-content span {
      font-size: 12px;
      color: #666;
    }
    
    /* Correcciones para elementos superpuestos */
    .bonus-section {
      position: relative;
      z-index: 1;
    }
    
    .descuento-badge {
      position: relative;
      z-index: 2;
    }
    
    /* Fixes específicos para móvil */
    @media (max-width: 768px) {
      .precio-badge {
        display: block;
        margin: 0 auto 20px;
      }
      
      .precio-detalle {
        margin-top: 10px;
      }
      
      .bonus-oferta {
        flex-direction: column;
        gap: 15px;
      }
      
      .descuento-badge {
        margin-bottom: 10px;
      }
      
      /* Ajustar timeline proceso */
      .proceso-timeline::before {
        left: 20px;
      }
      
      .proceso-paso {
        width: calc(100% - 50px);
        margin-left: 40px !important;
        margin-right: 0 !important;
      }
      
      .proceso-paso .paso-numero {
        left: -30px !important;
        right: auto !important;
      }
    }
    
    /* Reducir animaciones si se ha solicitado */
    .reduce-animations .fade-in {
      transition-duration: 0.3s;
    }
    
    .reduce-animations .pulse-button,
    .reduce-animations .btn-express,
    .reduce-animations .spots-fire,
    .reduce-animations .cta-icon {
      animation-duration: 4s;
    }
  `;
  document.head.appendChild(styleElement);
  
  // =========================================================================
  // 10. VERIFICAR HASH EN URL PARA SCROLL INICIAL
  // =========================================================================
  function manejarHashInicial() {
    // Si hay un hash en la URL al cargar, hacer scroll hasta ese elemento
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        // Dar tiempo a que se cargue la página completamente
        setTimeout(() => {
          const headerHeight = document.querySelector('.ov-header')?.offsetHeight || 0;
          const offset = headerHeight + 20;
          
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }, 500);
      }
    }
  }
  
  // Ejecutar después de que la página esté completamente cargada
  window.addEventListener('load', manejarHashInicial);
  
  // =========================================================================
  // 11. OPTIMIZACIONES PARA DISPOSITIVOS MÓVILES
  // =========================================================================
  function aplicarOptimizacionesMobile() {
    if (window.innerWidth <= 768) {
      // Simplificar animaciones para mejor rendimiento
      document.body.classList.add('mobile-optimized');
      
      // Ajustar elementos para mejorar la experiencia móvil
      
      // Ajustar CTA principal para mayor visibilidad
      const mainCTA = document.querySelector('.hero-buttons .btn');
      if (mainCTA) {
        mainCTA.style.width = '100%';
        mainCTA.style.padding = '16px 24px';
        mainCTA.style.fontSize = '1.1rem';
      }
      
      // Corregir badge de precio
      const precioBadge = document.querySelector('.precio-badge');
      if (precioBadge) {
        precioBadge.style.display = 'block';
        precioBadge.style.margin = '0 auto 20px';
      }
      
      // Ajustar oferta de bonos
      const bonusOferta = document.querySelector('.bonus-oferta');
      if (bonusOferta) {
        bonusOferta.style.flexDirection = 'column';
        bonusOferta.style.gap = '15px';
      }
      
      // Ajustar badge de descuento
      const descuentoBadge = document.querySelector('.descuento-badge');
      if (descuentoBadge) {
        descuentoBadge.style.marginBottom = '10px';
      }
    } else {
      document.body.classList.remove('mobile-optimized');
    }
  }
  
  // Ejecutar al cargar y al cambiar tamaño de ventana
  aplicarOptimizacionesMobile();
  window.addEventListener('resize', aplicarOptimizacionesMobile);
  
  // =========================================================================
  // 12. INICIALIZACIÓN AL CARGAR LA PÁGINA 
  // =========================================================================
  window.addEventListener('load', function() {
    // Eliminar clases de precarga
    document.body.classList.remove('preload');
    
    // Destacar secciones principales de inmediato
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('visible');
    }
    
    // Iniciar animación de scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.opacity = '1';
    }
    
    // Corregir cualquier superposición restante
    setTimeout(corregirSuperposiciones, 500);
  });

  // =========================================================================
  // 13. CARGAR LA NAVBAR
  // =========================================================================
  // La carga de la navbar ahora se maneja con el archivo combined.js
  // y la estructura está definida en navbar.html
});
