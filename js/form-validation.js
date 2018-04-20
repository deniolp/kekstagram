'use strict';

(function () {

  var HASHTAGS_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 5;

  var validateHashtags = function () {
    var hashtags = hashtagInputElement.value.toLowerCase().trim();
    var hashtagsForTest = hashtags.split(' ');
    var doubleHashtags = [];
    var testDoubleHashtags = [];
    hashtagInputElement.setCustomValidity('');

    if (hashtags === '') {
      return;
    }

    if (hashtagsForTest.length > HASHTAGS_MAX_QUANTITY) {
      hashtagInputElement.setCustomValidity('У вас слишком много хэштегов, можно не больше 5');
      return;
    }

    for (var i = 0; i < hashtagsForTest.length; i++) {
      if (hashtagsForTest[i].charAt(0) !== '#') {
        hashtagInputElement.setCustomValidity('Каждый хэштег должен начинаться с символа #');
        return;
      } else if (hashtagsForTest[i].length > HASHTAG_MAX_LENGTH) {
        hashtagInputElement.setCustomValidity('Хэштег не должен быть длиннее 20 символов');
        return;
      } else if (hashtagsForTest[i] === '#') {
        hashtagInputElement.setCustomValidity('Хэштег не должен состоять только из одной #');
        return;
      }
      if (testDoubleHashtags.includes(hashtagsForTest[i]) && !doubleHashtags.includes(hashtagsForTest[i])) {
        doubleHashtags.push(hashtagsForTest[i]);
      } else {
        testDoubleHashtags.push(hashtagsForTest[i]);
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
    document.removeEventListener('keydown', window.documentPressEscHandler);
  });

  hashtagInputElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.documentPressEscHandler);
  });

  commentTextareaElement.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.documentPressEscHandler);
  });

  commentTextareaElement.addEventListener('focusout', function () {
    document.addEventListener('keydown', window.documentPressEscHandler);
  });

  submitPictureElement.addEventListener('click', function () {
    validateHashtags();
  });
})();
