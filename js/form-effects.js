'use strict';

(function () {
  var EFFECTS = [
    'none',
    'chrome',
    'sepia',
    'marvin',
    'phobos',
    'heat'
  ];
  var EFFECT_GRAYSCALE_DEFAULT_VALUE = 1;
  var EFFECT_SEPIA_DEFAULT_VALUE = 1;
  var EFFECT_INVERT_DEFAULT_VALUE = 100;
  var EFFECT_BLUR_DEFAULT_VALUE = 3;
  var EFFECT_BRIGHTNESS_DEFAULT_VALUE = 3;
  var PIN_WIDTH = 18;

  var mouseDownHandler = function (downEvt) {
    downEvt.preventDefault();

    var startCoordX = downEvt.clientX;

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var scrollBarWidth = caclulateScrollBarWidth();
      var shiftX = startCoordX - moveEvt.clientX;
      var scrollBarCoordX = (windowWidth - scrollBarWidth) / 2;
      var pinLeftPosition = scalePinElement.offsetLeft - shiftX;

      if (moveEvt.clientX < scrollBarCoordX) {
        startCoordX = scrollBarCoordX;
      } else if (moveEvt.clientX > scrollBarCoordX + scrollBarWidth) {
        startCoordX = scrollBarCoordX + scrollBarWidth;
      } else {
        startCoordX = moveEvt.clientX;
      }
      if (pinLeftPosition < PIN_WIDTH / 2) {
        pinLeftPosition = PIN_WIDTH / 2;
      } else if (pinLeftPosition > scrollBarWidth - PIN_WIDTH / 2) {
        pinLeftPosition = scrollBarWidth - PIN_WIDTH / 2;
      }
      updateEffectIntensity(startCoordX);

      scaleValueInputElement.value = effectIntensity;
      scalePinElement.style.left = pinLeftPosition + 'px';
      previewElement.style.filter = createStyleEffect(currentEffect);
      scaleBarElement.style.width = effectIntensity + '%';
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var createEffectClickHandler = function (effectName) {
    return function () {
      currentEffect = effectName;
      previewElement.className = 'img-upload__preview effects__preview--' + effectName;
      if (effectName === 'none') {
        scaleElement.classList.add('hidden');
      } else {
        scaleElement.classList.remove('hidden');
      }
      previewElement.style.filter = createDefaultStyleEffect(effectName);
      scalePinElement.style.left = caclulateScrollBarWidth() - PIN_WIDTH / 2 + 'px';
      scaleBarElement.style.width = 100 + '%';
    };
  };

  var createDefaultStyleEffect = function (effect) {
    switch (effect) {
      case 'chrome':
        return 'grayscale(' + EFFECT_GRAYSCALE_DEFAULT_VALUE + ')';
      case 'sepia':
        return 'sepia(' + EFFECT_SEPIA_DEFAULT_VALUE + ')';
      case 'marvin':
        return 'invert(' + EFFECT_INVERT_DEFAULT_VALUE + '%)';
      case 'phobos':
        return 'blur(' + EFFECT_BLUR_DEFAULT_VALUE + 'px)';
      case 'heat':
        return 'brightness(' + EFFECT_BRIGHTNESS_DEFAULT_VALUE + ')';
      default:
        return 'none';
    }
  };

  var createStyleEffect = function (effect) {
    switch (effect) {
      case 'chrome':
        return 'grayscale(' + effectIntensity / 100 + ')';
      case 'sepia':
        return 'sepia(' + effectIntensity / 100 + ')';
      case 'marvin':
        return 'invert(' + effectIntensity + '%)';
      case 'phobos':
        return 'blur(' + effectIntensity * EFFECT_BLUR_DEFAULT_VALUE / 100 + 'px)';
      case 'heat':
        return 'brightness(' + (effectIntensity * (EFFECT_BRIGHTNESS_DEFAULT_VALUE - 1) / 100 + 1) + ')';
      default:
        return 'none';
    }
  };

  var caclulateScrollBarWidth = function () {
    return scaleLineElement.getBoundingClientRect().width;
  };

  var updateEffectIntensity = function (value) {
    var scrollBarWidth = caclulateScrollBarWidth();
    var pinPosition = value - (windowWidth - scrollBarWidth) / 2;

    effectIntensity = Math.floor(pinPosition / (scrollBarWidth / 100));

    if (effectIntensity < 0) {
      effectIntensity = 0;
    } else if (effectIntensity > 100) {
      effectIntensity = 100;
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var previewElement = uploadFormElement.querySelector('.img-upload__preview');
  var effectElement = uploadFormElement.querySelectorAll('.effects__radio');
  var scalePinElement = uploadFormElement.querySelector('.scale__pin');
  var scaleValueInputElement = uploadFormElement.querySelector('.scale__value');
  var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
  var scaleLineElement = uploadFormElement.querySelector('.scale__line');
  var scaleBarElement = uploadFormElement.querySelector('.scale__level');
  var windowWidth = document.documentElement.clientWidth;

  var currentEffect;
  var effectIntensity;

  scalePinElement.addEventListener('mousedown', mouseDownHandler);

  scaleElement.classList.add('hidden');

  for (var i = 0; i < EFFECTS.length; i++) {
    effectElement[i].addEventListener('click', createEffectClickHandler(EFFECTS[i]));
  }

})();
