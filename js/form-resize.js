'use strict';

(function () {
  var SCALE_STEP_VALUE = 25;
  var SCALE_LIMIT_LAST_INCREASE = 75;
  var SCALE_LIMIT_LAST_DECREASE = 50;

  var uploadFormElement = document.querySelector('.img-upload__form');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var resizeButtonMinus = uploadFormElement.querySelector('.resize__control--minus');
  var resizeButtonPlus = uploadFormElement.querySelector('.resize__control--plus');
  var resizeValue = uploadFormElement.querySelector('.resize__control--value');

  resizeValue.value = '100%';

  resizeButtonMinus.addEventListener('click', function () {
    var value = parseInt(resizeValue.value, 10);
    if (parseInt(resizeValue.value, 10) >= SCALE_LIMIT_LAST_DECREASE) {
      resizeValue.value = value - SCALE_STEP_VALUE + '%';
      previewElement.style.transform = 'scale(' + value / 100 + ')';
    }
  });

  resizeButtonPlus.addEventListener('click', function () {
    var value = parseInt(resizeValue.value, 10);
    if (value <= SCALE_LIMIT_LAST_INCREASE) {
      resizeValue.value = value + SCALE_STEP_VALUE + '%';
      previewElement.style.transform = 'scale(' + value / 100 + ')';
    } if (value === 100) {
      previewElement.style.transform = '';
    }
  });
})();
