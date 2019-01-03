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

  var TYPE_EFFECT_DEFAULT = 'default';
  var TYPE_EFFECT_CUSTOM = 'custom';
  var EFFECT_GRAYSCALE_DEFAULT_VALUE = 1;
  var EFFECT_SEPIA_DEFAULT_VALUE = 1;
  var EFFECT_INVERT_DEFAULT_VALUE = 100;
  var EFFECT_BLUR_DEFAULT_VALUE = 3;
  var EFFECT_BLUR_RATIO = 0.03;
  var EFFECT_BRIGHTNESS_DEFAULT_VALUE = 3;
  var EFFECT_BRIGHTNESS_RATIO = 0.02;
  var PIN_WIDTH = 18;
  var PIN_SCROLL_STEP = 10;
  var KEYCODE_LEFT = 37;
  var KEYCODE_RIGHT = 39;

  var applyPinPositionToEffect = function (pinLeftPosition, effectIntensity, scrollBarWidth) {
    if (pinLeftPosition < PIN_WIDTH / 2) {
      pinLeftPosition = PIN_WIDTH / 2;
    } else if (pinLeftPosition > scrollBarWidth - PIN_WIDTH / 2) {
      pinLeftPosition = scrollBarWidth - PIN_WIDTH / 2;
    }

    scaleValueInputElement.value = effectIntensity;
    scalePinElement.style.left = pinLeftPosition + 'px';
    previewElement.style.filter = createStyleEffect(currentEffect, TYPE_EFFECT_CUSTOM);
    scaleBarElement.style.width = effectIntensity + '%';
  };

  var keyDownHandler = function (downEvt) {

    var scrollBarWidth = caclulateScrollBarWidth();
    var scrollBarCoordX = (windowWidth - scrollBarWidth) / 2;
    var pinLeftPosition;

    if (downEvt.keyCode === KEYCODE_LEFT) {
      pinLeftPosition = scalePinElement.offsetLeft - PIN_SCROLL_STEP;
    } else if (downEvt.keyCode === KEYCODE_RIGHT) {
      pinLeftPosition = scalePinElement.offsetLeft + PIN_SCROLL_STEP;
    } else {
      return;
    }

    updateEffectIntensity(pinLeftPosition + scrollBarCoordX);
    applyPinPositionToEffect(pinLeftPosition, effectIntensity, scrollBarWidth);
  };

  var Coordinate = function (x, minX) {
    this.x = x;
    this._minX = minX;
    this._maxX = minX + caclulateScrollBarWidth();
  };

  Coordinate.prototype.setX = function (moveX) {
    if (moveX > this._minX &&
      moveX < this._maxX) {
      this.x = moveX;
    }
    updateEffectIntensity(this.x);
  };

  var mouseDownHandler = function (downEvt) {
    downEvt.preventDefault();

    var scrollBarCoordX = (windowWidth - caclulateScrollBarWidth()) / 2;
    var startCoordX = new Coordinate(downEvt.clientX, scrollBarCoordX);

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var shiftX = startCoordX.x - moveEvt.clientX;
      var pinLeftPosition = scalePinElement.offsetLeft - shiftX;

      startCoordX.setX(moveEvt.clientX);
      applyPinPositionToEffect(pinLeftPosition, effectIntensity, caclulateScrollBarWidth());
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var scaleLineClickHandler = function (evt) {
    evt.preventDefault();
    var scrollBarWidth = caclulateScrollBarWidth();
    var scrollBarCoordX = (windowWidth - scrollBarWidth) / 2;
    var pinLeftPosition = evt.clientX - scrollBarCoordX;

    updateEffectIntensity(evt.clientX);
    applyPinPositionToEffect(pinLeftPosition, effectIntensity, scrollBarWidth);
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
      previewElement.style.filter = createStyleEffect(effectName, TYPE_EFFECT_DEFAULT);
      scalePinElement.style.left = caclulateScrollBarWidth() - PIN_WIDTH / 2 + 'px';
      scaleBarElement.style.width = 100 + '%';
    };
  };

  var createGreyScaleStyle = function (effectType) {
    if (effectType !== TYPE_EFFECT_CUSTOM) {
      return 'grayscale(' + EFFECT_GRAYSCALE_DEFAULT_VALUE + ')';
    }
    return 'grayscale(' + effectIntensity / 100 + ')';
  };

  var createSepiaStyle = function (effectType) {
    if (effectType !== TYPE_EFFECT_CUSTOM) {
      return 'sepia(' + EFFECT_SEPIA_DEFAULT_VALUE + ')';
    }
    return 'sepia(' + effectIntensity / 100 + ')';
  };

  var createInvertStyle = function (effectType) {
    if (effectType !== TYPE_EFFECT_CUSTOM) {
      return 'invert(' + EFFECT_INVERT_DEFAULT_VALUE + '%)';
    }
    return 'invert(' + effectIntensity + '%)';
  };

  var createBlurStyle = function (effectType) {
    if (effectType !== TYPE_EFFECT_CUSTOM) {
      return 'blur(' + EFFECT_BLUR_DEFAULT_VALUE + 'px)';
    }
    return 'blur(' + effectIntensity * EFFECT_BLUR_RATIO + 'px)';
  };

  var createBrightnessStyle = function (effectType) {
    if (effectType !== TYPE_EFFECT_CUSTOM) {
      return 'brightness(' + EFFECT_BRIGHTNESS_DEFAULT_VALUE + ')';
    }
    return 'brightness(' + (effectIntensity * EFFECT_BRIGHTNESS_RATIO + 1) + ')';
  };

  var createStyleEffect = function (effect, effectType) {
    switch (effect) {
      case Effect.CHROME:
        return createGreyScaleStyle(effectType);
      case Effect.SEPIA:
        return createSepiaStyle(effectType);
      case Effect.MARVIN:
        return createInvertStyle(effectType);
      case Effect.PHOBOS:
        return createBlurStyle(effectType);
      case Effect.HEAT:
        return createBrightnessStyle(effectType);
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
  scalePinElement.addEventListener('focus', function () {
    scalePinElement.addEventListener('keydown', keyDownHandler);
  });
  scaleLineElement.addEventListener('click', scaleLineClickHandler);

  scalePinElement.addEventListener('focusout', function () {
    scalePinElement.removeEventListener('keydown', keyDownHandler);
  });

  scaleElement.classList.add('hidden');

  Object.values(Effect).forEach(function (item, index) {
    effectElement[index].addEventListener('click', createEffectClickHandler(item));
  });

})();
