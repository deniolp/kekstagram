'use strict';

(function () {
  var ERROR_TIMEOUT = 5000;
  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var errorElement = document.querySelector('.img-upload__message--error');
  var errorLinksElement = document.querySelector('.error__links');

  window.errorMessage = {
    show: function (errorMessage) {
      errorElement.classList.remove('hidden');
      uploadImageElement.classList.add('hidden');
      uploadFileInputElement.value = '';

      if (errorElement.contains(errorLinksElement)) {
        errorElement.removeChild(errorLinksElement);
      }

      errorElement.textContent = errorMessage;

      setTimeout(function () {
        errorElement.classList.add('hidden');
      }, ERROR_TIMEOUT);
    }
  };
})();
