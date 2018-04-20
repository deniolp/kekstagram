'use strict';

(function () {
  var SCALE_STEP_VALUE = 25;
  var SCALE_LIMIT_MIN = 25;
  var SCALE_LIMIT_MAX = 100;

  var uploadFormElement = document.querySelector('.img-upload__form');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var resizeButtonMinus = uploadFormElement.querySelector('.resize__control--minus');
  var resizeButtonPlus = uploadFormElement.querySelector('.resize__control--plus');
  var resizeValue = uploadFormElement.querySelector('.resize__control--value');

  resizeButtonMinus.addEventListener('click', function () {
    var currentValue = parseInt(resizeValue.value, 10);
    var updatedValue = Math.max(SCALE_LIMIT_MIN, currentValue - SCALE_STEP_VALUE);

    resizeValue.value = updatedValue + '%';
    previewElement.style.transform = 'scale(' + updatedValue / 100 + ')';
  });

  resizeButtonPlus.addEventListener('click', function () {
    var currentValue = parseInt(resizeValue.value, 10);
    var updatedValue = Math.min(SCALE_LIMIT_MAX, currentValue + SCALE_STEP_VALUE);

    resizeValue.value = updatedValue + '%';
    previewElement.style.transform = 'scale(' + updatedValue / 100 + ')';
  });
})();
