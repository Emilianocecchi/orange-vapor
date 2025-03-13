/**
 * Orange Vapor - JavaScript para Optimización Express
 * Optimizado para mejor rendimiento y experiencia de usuario
 */

document.addEventListener('DOMContentLoaded', function() {
  // =========================================================================
  // 1. INICIALIZACIÓN Y CONFIGURACIÓN
  // =========================================================================
  
  // Detectar soporte para características específicas
  const supportsIntersectionObserver = 'IntersectionObserver' in window;
  
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
        }
      });
      
      // Toggle el item actual
      item.classList.toggle('active');
    });
  });
  
  // Activar el primer FAQ por defecto
  if (faqItems.length > 0) {
    faqItems[0].classList.add('active');
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
    bottom: 90px;
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
    z-index: 99;
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
  window.addEventListener('scroll', function() {
    if (window.scrollY > 600) {
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
  });
  
  // =========================================================================
  // 4. ANIMACIONES AL HACER SCROLL
  // =========================================================================
  const fadeElements = document.querySelectorAll('.fade-in');
  
  if (supportsIntersectionObserver) {
    // Usar IntersectionObserver si está disponible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Una vez visible, dejar de observar
          observer.unobserve(entry.target);
        }
      });
    }, { 
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });
    
    fadeElements.forEach(element => {
      observer.observe(element);
    });
  } else {
    // Fallback para navegadores que no soportan IntersectionObserver
    function checkVisibility() {
      fadeElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
          rect.bottom >= 0
        );
        
        if (isVisible && !element.classList.contains('visible')) {
          element.classList.add('visible');
        }
      });
    }
    
    // Ejecutar al cargar y al hacer scroll
    checkVisibility();
    window.addEventListener('scroll', checkVisibility);
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
        const headerOffset = 80;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        
        window.scrollTo({
          top: targetPosition - headerOffset,
          behavior: 'smooth'
        });
        
        // Actualizar URL sin recargar la página
        history.pushState(null, null, targetId);
      }
    });
  });
  
  // =========================================================================
  // 6. EFECTOS PARA ELEMENTOS INTERACTIVOS
  // =========================================================================
  
  // Efecto hover para tarjetas del plan
  const procesoPasos = document.querySelectorAll('.proceso-paso');
  procesoPasos.forEach(paso => {
    paso.addEventListener('mouseenter', function() {
      this.querySelector('.paso-icono').style.transform = 'rotate(10deg)';
    });
    
    paso.addEventListener('mouseleave', function() {
      this.querySelector('.paso-icono').style.transform = '';
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
  // 7. SIMULAR ESCASEZ (CONTADOR DE SPOTS DISPONIBLES)
  // =========================================================================
  const spotsLabel = document.querySelector('.spots-label span:last-child');
  const spotsBar = document.querySelector('.spots-bar');
  
  // Valor inicial ya establecido en HTML (2 spots ocupados)
  
  function mostrarNotificacionReserva() {
    // Solo mostrar si el usuario ha bajado lo suficiente en la página
    if (document.documentElement.scrollTop > 400) {
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
        <button class="notification-close"><i class="fas fa-times"></i></button>
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
  
  // Mostrar notificación de reserva aleatoria después de cierto tiempo
  setTimeout(() => {
    // 40% de probabilidad de mostrar la notificación
    if (Math.random() < 0.4) {
      mostrarNotificacionReserva();
      
      // Actualizar contadores después de la notificación
      setTimeout(() => {
        if (spotsLabel && spotsBar) {
          spotsLabel.textContent = '2 spots ocupados';
          spotsBar.style.width = '66%';
        }
      }, 10000);
    }
  }, 45000); // Después de 45 segundos
  
  // =========================================================================
  // 8. ESTILOS DINÁMICOS (NECESARIOS PARA ANIMACIONES)
  // =========================================================================
  
  // Añadir estilos para animaciones
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
  `;
  document.head.appendChild(styleElement);
  
  // =========================================================================
  // 9. VERIFICAR HASH EN URL PARA SCROLL INICIAL
  // =========================================================================
  function manejarHashInicial() {
    // Si hay un hash en la URL al cargar, hacer scroll hasta ese elemento
    if (window.location.hash) {
      const targetElement = document.querySelector(window.location.hash);
      if (targetElement) {
        // Dar tiempo a que se cargue la página completamente
        setTimeout(() => {
          const headerOffset = 80;
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
          
          window.scrollTo({
            top: targetPosition - headerOffset,
            behavior: 'smooth'
          });
        }, 500);
      }
    }
  }
  
  // Ejecutar después de que la página esté completamente cargada
  window.addEventListener('load', manejarHashInicial);
  
  // =========================================================================
  // 10. OPTIMIZACIONES PARA DISPOSITIVOS MÓVILES
  // =========================================================================
  function aplicarOptimizacionesMobile() {
    if (window.innerWidth <= 768) {
      // Simplificar animaciones para mejor rendimiento
      document.body.classList.add('mobile-optimized');
      
      // Ajustar CTA principal para mayor visibilidad
      const mainCTA = document.querySelector('.hero-buttons .btn');
      if (mainCTA) {
        mainCTA.style.width = '100%';
        mainCTA.style.padding = '16px 24px';
        mainCTA.style.fontSize = '1.1rem';
      }
    } else {
      document.body.classList.remove('mobile-optimized');
    }
  }
  
  // Ejecutar al cargar y al cambiar tamaño de ventana
  aplicarOptimizacionesMobile();
  window.addEventListener('resize', aplicarOptimizacionesMobile);
  
  // =========================================================================
  // 11. INICIALIZACIÓN AL CARGAR LA PÁGINA 
  // =========================================================================
  window.addEventListener('load', function() {
    // Eliminar clases de precarga
    document.body.classList.remove('preload');
    
    // Destacar secciones principales
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      heroContent.classList.add('visible');
    }
    
    // Iniciar animación de scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
      scrollIndicator.style.opacity = '1';
    }
  });
});
