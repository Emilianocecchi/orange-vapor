/**
 * Orange Vapor - JavaScript para Home
 * Script para funcionalidades específicas de la página principal
 * Versión: 1.1.0 (Refactorizado)
 */

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // =========================================================================
    // UTILIDADES Y FUNCIONES AUXILIARES
    // =========================================================================

    /**
     * Selecciona elementos del DOM y ejecuta una función para cada uno
     * @param {string} selector - Selector CSS
     * @param {Function} fn - Función a ejecutar para cada elemento
     * @param {HTMLElement} [parent=document] - Elemento padre donde buscar
     */
    const forEachElement = (selector, fn, parent = document) => { /* [784] */
        const elements = parent.querySelectorAll(selector); /* [784] */
        if (elements.length > 0) { /* [784] */
            elements.forEach(fn); /* [784] */
            return true; /* [784] */
        }
        return false; /* [784] */
    };

    // =========================================================================
    // ASEGURAR VISIBILIDAD INICIAL Y ANIMACIONES
    // =========================================================================

    /**
     * Asegura que los elementos críticos estén visibles lo antes posible
     * y configura el observador para animaciones de scroll.
     */
    function initVisibilityAndAnimations() {
        // --- Forzar visibilidad inicial (puede ser necesario para LCP) ---
        const criticalSelectors = [ /* [785] */
             '.hero-content', '.hero-image', '#header', /* [787] */
             '#servicios .seccion-titulo', /* [785] */
             '.servicios-tabs-wrapper', // Usar el wrapper si existe
             '.servicios-content' // Usar el wrapper si existe /* [786] */
            // Añade otros elementos críticos si es necesario
        ];
        criticalSelectors.forEach(selector => { /* [788] */
            forEachElement(selector, elemento => { /* [788] */
                // Usa una clase CSS helper '.force-visible' definida en el CSS
                elemento.classList.add('force-visible');
            });
        });
        console.log('Elementos críticos iniciales forzados a visibles.'); /* [790] */

        // --- Observer para animaciones de scroll (.fade-in) ---
        const fadeElements = document.querySelectorAll('.fade-in:not(.force-visible)'); /* [793] */
        if (fadeElements.length === 0) {
             console.log('No hay elementos .fade-in para observar.');
        } else {
            const observerOptions = { /* [794] */
                root: null, /* [794] */
                rootMargin: '0px', /* [794] */
                threshold: 0.1 // Activar cuando el 10% es visible /* [794] */
            };

            const observer = new IntersectionObserver((entries, obs) => { /* [795] */
                entries.forEach(entry => { /* [795] */
                    if (entry.isIntersecting) { /* [795] */
                        entry.target.classList.add('visible'); // Activa la transición CSS
                        obs.unobserve(entry.target); // Dejar de observar una vez visible /* [797] */
                    }
                });
            }, observerOptions);

            fadeElements.forEach(element => { /* [799] */
                observer.observe(element); /* [799] */
            });
        }

        // --- Observer para animaciones de métricas ---
        const metricElements = document.querySelectorAll('.metric-after:not(.animated)'); /* [872] */
        if(metricElements.length > 0) {
            const metricObserver = new IntersectionObserver((entries, obs) => { /* [874] */
                entries.forEach(entry => { /* [874] */
                    if (entry.isIntersecting) { /* [874] */
                        const metric = entry.target; /* [874] */
                        metric.classList.add('animated'); /* [874] */
                        metric.style.opacity = '1'; // Asegura visibilidad /* [875] */

                        const targetValue = metric.getAttribute('data-value'); /* [875] */
                        if (targetValue) { /* [876] */
                            // Simplemente muestra el valor final. Añadir lógica de count-up aquí si se desea.
                            metric.textContent = targetValue; /* [876] */
                        }
                        obs.unobserve(metric); /* [877] */
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' }); /* [877] */

            metricElements.forEach(metric => metricObserver.observe(metric)); /* [878] */
        } else {
            // Si no hay métricas nuevas para observar, forzar las existentes por si acaso
             forEachElement('.metric-after', metric => { /* [872] */
                 if (!metric.classList.contains('animated')) {
                     metric.classList.add('animated'); /* [872] */
                     metric.style.opacity = '1'; /* [873] */
                     const targetValue = metric.getAttribute('data-value'); /* [875] */
                     if (targetValue) metric.textContent = targetValue; /* [876] */
                 }
             });
        }

        // --- Delay para elementos en secuencia ---
        forEachElement('.features-sequence > *', (item, index) => { /* [800] */
            item.style.transitionDelay = `${index * 0.1}s`; /* [800] */
        });
    }

    // =========================================================================
    // CONTADOR REGRESIVO
    // =========================================================================

    /**
     * Inicializa y configura el contador regresivo con una fecha objetivo persistente.
     * @returns {number|null} Interval ID or null if countdown elements are missing.
     */
    function initCountdown() {
        const countdownContainer = document.querySelector('.countdown-timer'); /* [801] */
        // Asegúrate que los selectores coincidan con tu HTML. Ejemplo:
        const elements = { /* [802] */
            days: countdownContainer?.querySelector('.days .countdown-number'), /* [802] */
            hours: countdownContainer?.querySelector('.hours .countdown-number'), /* [802] */
            minutes: countdownContainer?.querySelector('.minutes .countdown-number'), /* [802] */
            seconds: countdownContainer?.querySelector('.seconds .countdown-number') /* [802] */
        };

        if (!countdownContainer || Object.values(elements).some(el => !el)) { /* [803] */
            // console.warn('Elementos del contador regresivo no encontrados.');
            return null; /* [803] */
        }

        let targetDate;
        const savedTargetTimestamp = localStorage.getItem('ofertaTargetDate'); /* [805] */
        const defaultDurationDays = 15; // Duración por defecto de la oferta

        if (savedTargetTimestamp) { /* [805] */
            targetDate = new Date(parseInt(savedTargetTimestamp)); /* [805] */
            if (isNaN(targetDate.getTime()) || targetDate < new Date()) { /* [806] */
                targetDate = new Date(); /* [806] */
                targetDate.setDate(targetDate.getDate() + defaultDurationDays); /* [807] */
                localStorage.setItem('ofertaTargetDate', targetDate.getTime().toString()); /* [807] */
                // console.log('Nueva fecha objetivo del contador establecida.');
            }
        } else {
            targetDate = new Date(); /* [807] */
            targetDate.setDate(targetDate.getDate() + defaultDurationDays); /* [808] */
            localStorage.setItem('ofertaTargetDate', targetDate.getTime().toString()); /* [808] */
            // console.log('Fecha objetivo inicial del contador establecida.');
        }

        const formatNumber = num => String(num).padStart(2, '0'); /* [830] */

        function updateVisualUrgency(daysLeft) {
            countdownContainer.classList.remove('urgent', 'very-urgent', 'extremely-urgent'); /* [809] */
            forEachElement('.countdown-item', item => item.classList.remove('pulse'), countdownContainer); /* [809] */

            let urgencyClass = '';
            if (daysLeft <= 3) urgencyClass = 'extremely-urgent'; /* [810] */
            else if (daysLeft <= 7) urgencyClass = 'very-urgent'; /* [812] */
            else if (daysLeft <= 10) urgencyClass = 'urgent'; /* [813] */

            if (urgencyClass) {
                 countdownContainer.classList.add(urgencyClass); /* [810] */
                 if (urgencyClass === 'extremely-urgent') {
                     elements.days?.closest('.countdown-item')?.classList.add('pulse'); /* [811] */
                 }
            }

             // Actualizar mensaje (si existe) - Adapta el selector si es necesario
             const urgencyMsgContainer = countdownContainer.closest('.oferta-countdown'); /* [814] */
             const urgencyMsgElement = urgencyMsgContainer?.querySelector('.limited-offer'); /* [814] */
             if (urgencyMsgElement) { /* [815] */
                 urgencyMsgElement.classList.remove('extreme-urgency', 'high-urgency'); /* [816] */
                 let msg = `Oferta por tiempo limitado`; /* [817] */
                 if (daysLeft <= 3) { /* [815] */
                     msg = `<span class="urgency-text">¡ÚLTIMOS ${daysLeft} DÍAS!</span>`; /* [815] */
                     urgencyMsgElement.classList.add('extreme-urgency'); /* [816] */
                 } else if (daysLeft <= 7) { /* [816] */
                    msg = `<span class="urgency-text">¡Oferta termina pronto!</span>`; /* [817] */
                    urgencyMsgElement.classList.add('high-urgency'); /* [817] */
                 }
                 urgencyMsgElement.innerHTML = msg; /* [815] */
             }
        }

        function updateElementWithAnimation(element, newValue) { /* [832] */
             if (!element || element.textContent === newValue) return; /* [832] */

             element.classList.add('flip-animation'); /* [833] */
             requestAnimationFrame(() => { /* [834] */
                 element.textContent = newValue; /* [834] */
                 setTimeout(() => { /* [834] */
                     element.classList.remove('flip-animation'); /* [835] */
                 }, 300); /* [835] */
             });
        }

        function updateCountdownDisplay() {
            const now = new Date(); /* [818] */
            let diff = targetDate - now; /* [819] */

            if (diff <= 0) { /* [820] */
                targetDate = new Date(); /* [820] */
                targetDate.setDate(targetDate.getDate() + defaultDurationDays); /* [821] */
                localStorage.setItem('ofertaTargetDate', targetDate.getTime().toString()); /* [821] */
                diff = targetDate - now; // Recalcular diferencia para mostrarla inmediatamente
                 // console.log('Contador reiniciado.'); /* [822] */
            }

            const d = Math.floor(diff / (1000 * 60 * 60 * 24)); /* [825] */
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); /* [826] */
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); /* [827] */
            const s = Math.floor((diff % (1000 * 60)) / 1000); /* [828] */

            updateElementWithAnimation(elements.days, formatNumber(d)); /* [830] */
            updateElementWithAnimation(elements.hours, formatNumber(h)); /* [831] */
            updateElementWithAnimation(elements.minutes, formatNumber(m)); /* [831] */
            updateElementWithAnimation(elements.seconds, formatNumber(s)); /* [831] */

            updateVisualUrgency(d); /* [831] */
        }

        updateCountdownDisplay(); // Primera ejecución inmediata /* [836] */
        return setInterval(updateCountdownDisplay, 1000); // Actualizar cada segundo /* [837] */
    }

    // =========================================================================
    // TABS DE SERVICIOS Y TIERS
    // =========================================================================

    /**
     * Inicializa las pestañas de servicios y tiers.
     */
    function initTabs() {
        let activeTier = 'starter'; // Variable para recordar el tier activo

        // --- Service Tabs ---
        const serviceTabsContainer = document.querySelector('.servicios-tabs');
        if (serviceTabsContainer) {
            serviceTabsContainer.addEventListener('click', function(event) {
                const clickedTab = event.target.closest('.servicio-tab');
                if (!clickedTab) return; // Salir si no se hizo clic en un tab

                const servicio = clickedTab.dataset.servicio; /* [839] */
                if (!servicio) return;

                // Update tabs UI
                forEachElement('.servicio-tab', t => t.classList.remove('active'), serviceTabsContainer); /* [840] */
                clickedTab.classList.add('active'); /* [840] */

                // Update content panels UI
                const panelsContainer = clickedTab.closest('.servicios').querySelector('.servicios-content'); // Buscar contenedor padre
                if (panelsContainer) {
                    forEachElement('.servicio-panel', panel => { /* [301] */
                        panel.classList.remove('active'); /* [301] */
                        panel.style.display = 'none'; // Asegurar que esté oculto
                    }, panelsContainer);

                    const targetPanel = panelsContainer.querySelector(`.servicio-panel[data-servicio="${servicio}"]`); /* [305] */
                    if (targetPanel) { /* [305] */
                        targetPanel.style.display = 'block'; // Mostrar antes de añadir clase
                        requestAnimationFrame(() => { // Forzar reflow para animación
                           targetPanel.classList.add('active'); /* [301] */
                        });
                         // Re-aplicar filtro de tier a la nueva tabla visible
                         updateComparisonTableTier(activeTier, targetPanel);
                    }
                }
            });
             // Activate the first service tab initially
             const firstServiceTab = serviceTabsContainer.querySelector('.servicio-tab'); /* [843] */
             if (firstServiceTab) {
                 firstServiceTab.click(); // Simular click para activar contenido
                 // console.log(`Servicio inicial activado: ${firstServiceTab.dataset.servicio}`);
             }
         } else {
              console.warn("Contenedor '.servicios-tabs' no encontrado.");
         }


        // --- Tier Tabs ---
        const tierTabsContainer = document.querySelector('.tier-tabs');
        if (tierTabsContainer) {
            tierTabsContainer.addEventListener('click', function(event) {
                const clickedTab = event.target.closest('.tier-tab');
                if (!clickedTab) return;

                const tier = clickedTab.dataset.tier; /* [847] */
                if (!tier) return;
                activeTier = tier; // Actualizar tier activo

                // Update tabs UI
                forEachElement('.tier-tab', t => t.classList.remove('active'), tierTabsContainer); /* [848] */
                clickedTab.classList.add('active'); /* [848] */

                 // Update tier description UI
                 const tierDescContainer = tierTabsContainer.closest('.tier-selector')?.querySelector('.tier-descriptions');
                 if (tierDescContainer){
                    forEachElement('.tier-info', info => info.classList.remove('active'), tierDescContainer); /* [849] */
                    const targetInfo = tierDescContainer.querySelector(`.tier-info.${tier}`); /* [849] */
                    if (targetInfo) targetInfo.classList.add('active'); /* [849] */
                 }

                // Update details in the *currently visible* comparison table
                const activeServicePanel = document.querySelector('.servicio-panel.active'); /* [301] */
                updateComparisonTableTier(tier, activeServicePanel); /* [852] */
            });
             // Activate the first tier tab initially
             const firstTierTab = tierTabsContainer.querySelector('.tier-tab'); /* [854] */
             if (firstTierTab) {
                 firstTierTab.click(); // Simular click para activar contenido y tabla
                 activeTier = firstTierTab.dataset.tier || 'starter'; // Asegurar que activeTier tenga valor inicial
                 // console.log(`Tier inicial activado: ${activeTier}`); /* [854] */
             }
         } else {
              console.warn("Contenedor '.tier-tabs' no encontrado.");
         }

         // --- Mini Tier Selector (if present) ---
         initTierSelectorMini(); /* [862] */
    }

    /**
     * Actualiza la tabla comparativa dentro de un panel de servicio específico
     * para mostrar solo la columna/detalles del tier seleccionado.
     * @param {string} tier - El tier seleccionado ('starter', 'pro', 'elite', 'bundle').
     * @param {HTMLElement|null} servicePanel - El panel de servicio actualmente activo.
     */
    function updateComparisonTableTier(tier, servicePanel) {
         if (!servicePanel) return; // Salir si no hay panel activo

         const comparisonTable = servicePanel.querySelector('.tabla-comparativa-servicios');
         if (!comparisonTable) return;

         // Lógica para mostrar/ocultar columnas o celdas según el tier
         // Ejemplo: Si se usan clases como .col-starter, .col-pro...
         // forEachElement('.tabla-col-plan', col => {
         //     col.style.display = col.classList.contains(`tabla-col-${tier}`) ? 'flex' : 'none';
         // }, comparisonTable);

         // Ejemplo 2: Si se muestran/ocultan celdas individuales con clases .tier-starter, .tier-pro...
         // forEachElement('.tabla-comparativa-fila', row => {
         //      forEachElement('.tabla-col-plan > *', cellContent => { // Asumiendo contenido directo en la celda
         //          cellContent.style.display = 'none';
         //      }, row);
         //      const targetCellContent = row.querySelector(`.tabla-col-plan > .tier-${tier}`);
         //      if (targetCellContent) targetCellContent.style.display = 'block'; // o 'inline', etc.
         // }, comparisonTable);

         // Nota: El CSS proporcionado en las partes anteriores NO parece ocultar columnas o celdas
         // basado en el tier. Muestra todas las columnas (Starter, Pro, Elite, Bundle).
         // Por lo tanto, esta función JS actualmente no necesita modificar la visibilidad
         // de la tabla basada en el tier si el CSS ya muestra todo.
         // Si el requisito es SÍ ocultar/mostrar columnas/celdas, el CSS y este JS necesitarán ajustes.

         // console.log(`Tabla comparativa en panel [${servicePanel.dataset.servicio}] actualizada para tier: ${tier}`); /* [852] */
    }

     /**
      * Inicializa el selector de tiers mini (si existe).
      */
     function initTierSelectorMini() {
         const miniTierContainer = document.querySelector('.tier-selector-mini');
         if (!miniTierContainer) return;

         miniTierContainer.addEventListener('click', function(event) {
             const clickedOption = event.target.closest('.tier-option');
             if (!clickedOption) return;

             const tier = clickedOption.dataset.tier; /* [864] */
             if (!tier) return;

             // Update mini tabs UI
             forEachElement('.tier-option', o => o.classList.remove('active'), miniTierContainer); /* [863] */
             clickedOption.classList.add('active'); /* [863] */

             // Update mini price display UI (buscar en el contenedor padre del selector)
             const parentCard = miniTierContainer.closest('.opcion-card');
             if (parentCard) {
                 forEachElement('.opcion-precio.tier-mini', price => price.classList.remove('active'), parentCard); /* [864] */
                 const targetPrice = parentCard.querySelector(`.opcion-precio.tier-mini.${tier}`); /* [867] */
                 if (targetPrice) targetPrice.classList.add('active'); /* [868] */
             }
         });
         // Activate the first mini tier option initially
         const firstMiniTierOption = miniTierContainer.querySelector('.tier-option'); /* [866] */
         if (firstMiniTierOption) {
             firstMiniTierOption.click(); // Simulate click /* [866] */
         }
     }

    // =========================================================================
    // TOOLTIPS
    // =========================================================================

    /**
     * Inicializa tooltips simples basados en hover y focus.
     */
    function initTooltips() {
        forEachElement('.tooltip-trigger', trigger => { /* [868] */
            const tooltip = trigger.querySelector('.tooltip'); /* [869] */
            if (!tooltip) return; /* [869] */

            // Usamos mouseenter/mouseleave para hover y focus/blur para teclado/accesibilidad
            const showTooltip = () => tooltip.classList.add('visible'); /* [869] */
            const hideTooltip = () => tooltip.classList.remove('visible'); /* [870] */

            trigger.addEventListener('mouseenter', showTooltip); /* [869] */
            trigger.addEventListener('focus', showTooltip);
            trigger.addEventListener('mouseleave', hideTooltip); /* [870] */
            trigger.addEventListener('blur', hideTooltip);

            // Opcional: Clic para mostrar/ocultar en táctil (puede necesitar gestión de cierre al tocar fuera)
            // trigger.addEventListener('click', (e) => {
            //      e.preventDefault();
            //      tooltip.classList.toggle('visible');
            // });
        });
    }

    // =========================================================================
    // FUNCIONES ADICIONALES Y MEJORAS
    // =========================================================================

    /**
     * Actualiza dinámicamente los precios/ahorros de la oferta especial (si aplica).
     * (Asegúrate que los selectores y precios sean correctos)
     */
    function updateSpecialOffer() { /* [879] */
        // Ejemplo de cálculo, ajusta según tus precios reales
        const precios = { meta: 299, google: 299, email: 299, chatbot: 299 };
        const precioBundle = 1000; /* [880] */
        const precioRegularTotal = Object.values(precios).reduce((sum, p) => sum + p, 0); /* [879] */
        const ahorro = precioRegularTotal - precioBundle; /* [881] */

        const offerTitleElement = document.querySelector('.oferta-especial h3'); /* [882] */
        if (offerTitleElement) { /* [883] */
            offerTitleElement.innerHTML = `Growth Accelerator: Todos los servicios por <span class="precio-destacado">US$${precioBundle}/mes</span> <span class="precio-strike">$${precioRegularTotal}</span>`; /* [883] */
        }

        // Actualizar información de ahorro (Ajusta selector si es necesario)
        const bundleInfoElement = document.querySelector('.bundle-pricing-new'); /* [884] */
         if (bundleInfoElement) {
            // Podrías añadir un elemento específico para el ahorro si no existe
             let savingsElement = bundleInfoElement.parentElement.querySelector('.ahorro-bundle');
             if(!savingsElement) {
                 savingsElement = document.createElement('span');
                 savingsElement.className = 'ahorro-bundle'; // Añade estilo CSS para esta clase
                 savingsElement.style.display = 'block';
                 savingsElement.style.fontSize = 'var(--texto-sm)';
                 savingsElement.style.color = 'var(--auditoria-verde)';
                 savingsElement.style.fontWeight = '600';
                 savingsElement.style.marginTop = '5px';
                 bundleInfoElement.parentElement.appendChild(savingsElement);
             }
             if (ahorro > 0) {
                 savingsElement.textContent = `¡Ahorra $${ahorro}/mes!`; /* [886] */
             } else {
                 savingsElement.textContent = ''; // No mostrar si no hay ahorro
             }
         }
    }

    /**
     * Aplica ajustes específicos para mejorar la experiencia en móviles.
     */
    function setupMobileEnhancements() { /* [886] */
        // Puedes añadir lógica aquí si necesitas cambios específicos en JS para móvil
        // Ejemplo: Cambiar clases, ajustar atributos, etc.
        // const isMobile = window.innerWidth <= 768; /* [886] */
        // document.body.classList.toggle('mobile-view-active', isMobile); /* [888] */
    }

     /**
      * Maneja el scroll suave a secciones basado en el hash de la URL.
      */
     function handleHashNavigation() {
         if (window.location.hash) { /* [892] */
             const targetId = window.location.hash; /* [892] */
             try {
                 const targetElement = document.querySelector(targetId); /* [892] */
                 if (targetElement) { /* [892] */
                     // Esperar un poco para asegurar que todo esté renderizado
                     setTimeout(() => { /* [893] */
                         const header = document.getElementById('header'); /* [893] */
                         const headerHeight = header ? header.offsetHeight : 70; // Altura por defecto si no se encuentra /* [893] */
                         const offset = headerHeight + 20; // Espacio adicional /* [893] */
                         const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset; /* [893] */
                         const offsetPosition = elementPosition - offset; /* [893] */

                         window.scrollTo({ /* [894] */
                             top: offsetPosition, /* [894] */
                             behavior: 'smooth' /* [894] */
                         });
                         console.log(`Scrolled to ${targetId}`);
                     }, 300); /* [895] */
                 } else {
                    console.warn(`Elemento con hash ${targetId} no encontrado.`);
                 }
             } catch (e) {
                 console.error(`Error al seleccionar o hacer scroll al elemento con hash ${targetId}:`, e);
             }
         }
     }

    // =========================================================================
    // INICIALIZACIÓN PRINCIPAL
    // =========================================================================

    function init() {
        console.log('Orange Vapor Home Script Initializing...');
        initVisibilityAndAnimations(); /* [890] */
        const countdownInterval = initCountdown(); /* [891] */
        initTabs(); /* [891] */
        initTooltips(); /* [891] */
        updateSpecialOffer(); /* [891] */
        setupMobileEnhancements(); /* [891] */

        // Limpiar intervalo del contador al salir de la página (buena práctica)
        window.addEventListener('beforeunload', () => {
            if (countdownInterval) clearInterval(countdownInterval);
        });

        console.log('Orange Vapor Home Script Initialized.');
    }

    init(); // Ejecutar inicialización

    // --- Event Listeners Adicionales ---
    window.addEventListener('load', () => { /* [891] */
        document.body.classList.remove('preload'); // Quitar estado de precarga /* [891] */
        handleHashNavigation(); // Manejar scroll a hash después de cargar todo /* [892] */

        // Forzar visibilidad de nuevo por si algo falló (opcional, puede eliminarse si no es necesario)
        // setTimeout(initVisibilityAndAnimations, 500);
    });

    window.addEventListener('resize', setupMobileEnhancements); /* [896] */

    // Escuchar cambios en hash para navegación interna SPA (si aplica)
    // window.addEventListener('hashchange', handleHashNavigation);

    // =========================================================================
    // EXPORTAR FUNCIONES (Opcional, si se necesitan globalmente)
    // =========================================================================
    window.OrangeVaporHome = { /* [897] */
        initTabs, /* [897] */
        initTooltips, /* [897] */
        updateSpecialOffer, /* [897] */
        handleHashNavigation
    };

}); /* [898] */
