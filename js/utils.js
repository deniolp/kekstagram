'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');

  window.utils = {
    generateRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    closePopup: function () {
      uploadImageElement.classList.add('hidden');

      document.removeEventListener('keydown', window.utils.popupEscPressHandler);
      uploadFileInputElement.value = '';
    },
    popupEscPressHandler: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        window.utils.closePopup();
      }
    },
    openPopup: function () {
      uploadImageElement.classList.remove('hidden');

      document.addEventListener('keydown', window.utils.popupEscPressHandler);
    }
  };
})();
