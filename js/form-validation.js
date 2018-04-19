'use strict';

(function () {

  var validateHashtags = function () {
    var hashtags = hashtagInputElement.value.toLowerCase().trim();
    var hashtagsForTest = hashtags.split(' ');
    var doubleHashtags = [];
    var testDoubleHashtags = [];
    hashtagInputElement.setCustomValidity('');

    if (hashtags === '') {
      return;
    }

    if (hashtagsForTest.length > 5) {
      hashtagInputElement.setCustomValidity('У вас слишком много хэштегов, можно не больше 5');
      return;
    }

    for (var m = 0; m < hashtagsForTest.length; m++) {
      if (hashtagsForTest[m].charAt(0) !== '#') {
        hashtagInputElement.setCustomValidity('Каждый хэштег должен начинаться с символа #');
        return;
      } else if (hashtagsForTest[m].length > 20 || hashtagsForTest[m].length === 1) {
        hashtagInputElement.setCustomValidity('Хэштег не должен быть длиннее 20 и короче 2 символов');
        return;
      }
    }

    for (var l = 0; l < hashtagsForTest.length; l++) {
      if (testDoubleHashtags.includes(hashtagsForTest[l]) && !doubleHashtags.includes(hashtagsForTest[l])) {
        doubleHashtags.push(hashtagsForTest[l]);
      } else {
        testDoubleHashtags.push(hashtagsForTest[l]);
      }
    }
    if (doubleHashtags.length > 0) {
      hashtagInputElement.setCustomValidity('Пожалуйста, уберите повторяющийся хэштег');
      return;
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var submitPictureElement = uploadFormElement.querySelector('.img-upload__submit');
  var hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');
  var commentTextareaElement = uploadFormElement.querySelector('.text__description');

  hashtagInputElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupEscPressHandler);
  });

  hashtagInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', popupEscPressHandler);
  });

  commentTextareaElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', popupEscPressHandler);
  });

  commentTextareaElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', popupEscPressHandler);
  });

  submitPictureElement.addEventListener('click', function () {
    validateHashtags();
  });
})();
