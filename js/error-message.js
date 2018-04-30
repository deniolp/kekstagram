'use strict';

(function () {
  var ERROR_TIMEOUT = 5000;

  var errorElement = document.createElement('div');

  errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; height: 50px; padding-top: 10px; position: absolute; left: 0; right: 0; font-size: 30px';
  errorElement.className = 'error';

  window.errorMessage = {
    show: function (errorMessage) {
      errorElement.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorElement);

      if (errorElement.classList.contains('hidden')) {
        errorElement.classList.remove('hidden');
      }

      setTimeout(function () {
        errorElement.classList.add('hidden');
      }, ERROR_TIMEOUT);
    }
  };
})();
