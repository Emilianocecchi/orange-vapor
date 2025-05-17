// mailchimp-captcha.js

document.addEventListener('DOMContentLoaded', function() {
  // 1. Identifica el formulario de Mailchimp
  const form = document.getElementById('mc-embedded-subscribe-form');
  const submitButton = document.getElementById('mc-embedded-subscribe');
  
  if (!form || !submitButton) return;
  
  // 2. Oculta el botón original
  submitButton.style.display = 'none';
  
  // 3. Crea un contenedor para el CAPTCHA y un nuevo botón
  const captchaContainer = document.createElement('div');
  captchaContainer.className = 'captcha-container';
  captchaContainer.style.marginBottom = '20px';
  
  // 4. Añade el div para el reCAPTCHA con TU clave real
  const recaptchaDiv = document.createElement('div');
  recaptchaDiv.className = 'g-recaptcha';
  recaptchaDiv.setAttribute('data-sitekey', '6LcVST4rAAAAAPlgrDCGeNfnAso5DTT9iElYdGdP'); // Tu clave real
  captchaContainer.appendChild(recaptchaDiv);
  
  // 5. Crea un nuevo botón que se verá igual al original
  const newButton = document.createElement('button');
  newButton.type = 'button';
  newButton.className = submitButton.className;
  newButton.id = 'protected-submit';
  newButton.innerText = 'Solicitar Auditoría Gratis';
  newButton.style.marginTop = '15px';
  
  // 6. Inserta el CAPTCHA y el nuevo botón antes del botón original
  submitButton.parentNode.insertBefore(captchaContainer, submitButton);
  submitButton.parentNode.insertBefore(newButton, submitButton);
  
  // 7. Carga el script de reCAPTCHA
  const recaptchaScript = document.createElement('script');
  recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
  recaptchaScript.async = true;
  recaptchaScript.defer = true;
  document.head.appendChild(recaptchaScript);
  
  // 8. Añade la lógica para verificar el CAPTCHA y enviar el formulario
  newButton.addEventListener('click', function() {
    try {
      // Verifica si el CAPTCHA ha sido resuelto
      const recaptchaResponse = grecaptcha.getResponse();
      
      if (recaptchaResponse.length === 0) {
        // El CAPTCHA no ha sido resuelto
        alert('Por favor, complete el CAPTCHA antes de enviar el formulario');
        return false;
      } else {
        // El CAPTCHA ha sido resuelto correctamente, envía el formulario
        form.submit();
      }
    } catch (error) {
      console.error('Error al verificar reCAPTCHA:', error);
      alert('Ha ocurrido un error al verificar el CAPTCHA. Por favor, recarga la página e intenta nuevamente.');
    }
  });
});
