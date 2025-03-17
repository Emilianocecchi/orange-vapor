// Guardar como components.js
document.addEventListener('DOMContentLoaded', function() {
  // Cargar componentes
  fetch('navbar.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('nav-placeholder').innerHTML = html;
      
      // Inicializar scripts de navegación después de cargar el HTML
      if (typeof initNavbar === 'function') {
        initNavbar();
      } else {
        // Cargar navbar.js si aún no se ha cargado
        const script = document.createElement('script');
        script.src = 'navbar.js';
        document.body.appendChild(script);
      }
    });
});
