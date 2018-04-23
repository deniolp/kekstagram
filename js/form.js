'use strict';

(function () {

  var KEYCODE_ENTER = 13;
  var KEYCODE_ESC = 27;

  var hideUploadOverlay = function () {
    uploadImageElement.classList.add('hidden');
    uploadFileInputElement.value = '';
  };

  var documentPressEscHandler = function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      hideUploadOverlay();
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var uploadImageCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
  var resizeValue = uploadFormElement.querySelector('.resize__control--value');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
  var commentTextareaElement = uploadFormElement.querySelector('.text__description');
  var hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

  uploadFileInputElement.addEventListener('change', function () {
    uploadImageElement.classList.remove('hidden');
    document.addEventListener('keydown', documentPressEscHandler);
  });

  uploadImageCancelElement.addEventListener('click', function () {
    hideUploadOverlay();
    document.removeEventListener('keydown', documentPressEscHandler);
  });

  uploadImageCancelElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ENTER) {
      hideUploadOverlay();
      document.removeEventListener('keydown', documentPressEscHandler);
    }
  });

  hashtagInputElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', documentPressEscHandler);
  });

  hashtagInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', documentPressEscHandler);
  });

  commentTextareaElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', documentPressEscHandler);
  });

  commentTextareaElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', documentPressEscHandler);
  });

  uploadFormElement.addEventListener('submit', function (evt) {
    var data = new FormData(uploadFormElement);
    var onSuccessSaved = function () {
      uploadFormElement.reset();

      hideUploadOverlay();

      resizeValue.value = '100%';
      scaleElement.classList.add('hidden');

      previewElement.className = 'img-upload__preview--none';
      previewElement.style.transform = 'scale(1)';
      previewElement.style.filter = '';
    };

    window.errorMessage.clear();
    window.backend.save(data, onSuccessSaved, window.errorMessage.show);

    evt.preventDefault();
  });
})();
