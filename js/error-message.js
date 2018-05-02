'use strict';

(function () {
  var ERROR_TIMEOUT = 7500;
  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var errorCenterElement = document.querySelector('.img-upload__message--error');

  window.errorMessage = {
    show: function (errorMessage) {
      var errorElement = document.createElement('div');

      if (errorCenterElement.classList.contains('hidden')) {
        errorCenterElement.classList.remove('hidden');
        uploadImageElement.classList.add('hidden');
        uploadFileInputElement.value = '';
      }

      errorElement.style.backgroundColor = 'red';
      errorElement.style.margin = '0 auto';
      errorElement.style.textAlign = 'center';
      errorElement.style.height = '50px';
      errorElement.style.paddingTop = '10px';
      errorElement.style.position = 'absolute';
      errorElement.style.top = 0;
      errorElement.style.left = 0;
      errorElement.style.right = 0;
      errorElement.style.fontSize = '30px';
      errorElement.style.zIndex = 100;

      errorElement.textContent = errorMessage;

      document.body.appendChild(errorElement);

      setTimeout(function () {
        document.body.removeChild(errorElement);
      }, ERROR_TIMEOUT);
    }
  };
})();
