'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var documentPressEscHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      uploadImageElement.classList.add('hidden');
      uploadFileInputElement.value = '';
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var uploadImageCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
  var resizeValue = uploadFormElement.querySelector('.resize__control--value');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var scaleElement = uploadFormElement.querySelector('.img-upload__scale');

  uploadFileInputElement.addEventListener('change', function () {
    uploadImageElement.classList.remove('hidden');
    document.addEventListener('keydown', documentPressEscHandler);
  });

  uploadImageCancelElement.addEventListener('click', function () {
    uploadImageElement.classList.add('hidden');
    uploadFileInputElement.value = '';
    document.removeEventListener('keydown', documentPressEscHandler);
  });

  uploadImageCancelElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      uploadImageElement.classList.add('hidden');
      uploadFileInputElement.value = '';
      document.removeEventListener('keydown', documentPressEscHandler);
    }
  });

  uploadFormElement.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(uploadFormElement), function () {
      uploadImageElement.classList.add('hidden');
      uploadFileInputElement.value = '';
      uploadFormElement.reset();
      resizeValue.value = 100 + '%';
      previewElement.style.transform = 'scale(1)';
      previewElement.className = 'img-upload__preview--none';
      scaleElement.classList.add('hidden');
      previewElement.style.filter = '';
    }, window.errorMessage.show);
    evt.preventDefault();
  });

  window.documentPressEscHandler = documentPressEscHandler;
})();
