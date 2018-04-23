'use strict';

(function () {
  var errorElement = document.createElement('div');

  errorElement.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; height: 50px; padding-top: 10px; position: absolute; left: 0; right: 0; font-size: 30px';
  errorElement.className = 'error';

  window.errorMessage = {
    show: function (errorMessage) {
      errorElement.textContent = errorMessage;

      if (!document.body.contains(errorElement)) {
        document.body.insertAdjacentElement('afterbegin', errorElement);
      }
    },
    clear: function () {
      if (document.body.contains(errorElement)) {
        document.body.removeChild(errorElement);
      }
    }
  };
})();
