'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_TYPE_ERROR = 'Ошибка формата файла';

  var uploadFormElement = document.querySelector('.img-upload__form');
  var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var effectPreviewElement = uploadFormElement.querySelectorAll('.effects__preview');

  window.formPhoto = {
    load: function () {
      var file = uploadFileInputElement.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          previewElement.querySelector('img').src = reader.result;

          Array.from(effectPreviewElement).forEach(function (item) {
            item.style.backgroundImage = 'url(' + reader.result + ')';
          });
        });

        reader.readAsDataURL(file);
      } else {
        window.errorMessage.show(FILE_TYPE_ERROR);
        uploadFormElement.reset();
      }
    }
  };
})();
