'use strict';

(function () {
  var node = document.createElement('div');

  window.errorMessage = {
    show: function (errorMessage) {
      node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; height: 50px; padding-top: 10px; position: absolute; left: 0; right: 0; font-size: 30px';

      node.className = 'error';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    },
    clear: function () {
      if (document.body.querySelector('.error').length) {
        document.body.removeChild(document.body.querySelector('.error'));
      }
    }
  };
})();
