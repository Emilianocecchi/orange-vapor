/**
 * Orange Vapor - Sistema de Componentes
 * Sistema para cargar elementos HTML comunes como la navegación
 */

(function() {
    'use strict';
    
    // Verificar que el DOM esté listo
    function domReady(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }
    
    // Cargar componente y manejar su inicialización
    function loadComponent(containerId, componentPath, initFunction) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        fetch(componentPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error cargando ${componentPath}: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
                
                // Ejecutar función de inicialización si se proporcionó
                if (typeof initFunction === 'function') {
                    initFunction();
                }
            })
            .catch(error => {
                console.error('Error al cargar componente:', error);
                container.innerHTML = `<div class="error-message">No se pudo cargar el componente</div>`;
            });
    }
    
    // Inicializar componentes
    domReady(function() {
        // Cargar la navegación
        loadComponent('nav-placeholder', 'navbar.html', function() {
            // Verificar si el script de navbar ya está cargado
            if (typeof initNavbar === 'function') {
                initNavbar();
            } else {
                // Cargar script de navbar si no está disponible
                const script = document.createElement('script');
                script.src = 'navbar.js';
                script.onload = function() {
                    // Inicializar después de cargar
                    if (typeof initNavbar === 'function') {
                        initNavbar();
                    }
                };
                document.body.appendChild(script);
            }
        });
        
        // Aquí puedes agregar más componentes si los necesitas
    });
})();
