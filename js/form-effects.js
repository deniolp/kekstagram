'use strict';

(function () {
  var Effect = {
    DEFAULT: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var EFFECT_GRAYSCALE_DEFAULT_VALUE = 1;
  var EFFECT_SEPIA_DEFAULT_VALUE = 1;
  var EFFECT_INVERT_DEFAULT_VALUE = 100;
  var EFFECT_BLUR_DEFAULT_VALUE = 3;
  var EFFECT_BLUR_RATIO = 0.03;
  var EFFECT_BRIGHTNESS_DEFAULT_VALUE = 3;
  var EFFECT_BRIGHTNESS_RATIO = 0.02;
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
      if (effectName === Effect.DEFAULT) {
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
      case Effect.CHROME:
        return 'grayscale(' + EFFECT_GRAYSCALE_DEFAULT_VALUE + ')';
      case Effect.SEPIA:
        return 'sepia(' + EFFECT_SEPIA_DEFAULT_VALUE + ')';
      case Effect.MARVIN:
        return 'invert(' + EFFECT_INVERT_DEFAULT_VALUE + '%)';
      case Effect.PHOBOS:
        return 'blur(' + EFFECT_BLUR_DEFAULT_VALUE + 'px)';
      case Effect.HEAT:
        return 'brightness(' + EFFECT_BRIGHTNESS_DEFAULT_VALUE + ')';
      default:
        return Effect.DEFAULT;
    }
  };

  var createStyleEffect = function (effect) {
    switch (effect) {
      case Effect.CHROME:
        return 'grayscale(' + effectIntensity / 100 + ')';
      case Effect.SEPIA:
        return 'sepia(' + effectIntensity / 100 + ')';
      case Effect.MARVIN:
        return 'invert(' + effectIntensity + '%)';
      case Effect.PHOBOS:
        return 'blur(' + effectIntensity * EFFECT_BLUR_RATIO + 'px)';
      case Effect.HEAT:
        return 'brightness(' + (effectIntensity * EFFECT_BRIGHTNESS_RATIO + 1) + ')';
      default:
        return Effect.DEFAULT;
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

  Object.values(Effect).forEach(function (item, index) {
    effectElement[index].addEventListener('click', createEffectClickHandler(item));
  });

})();
