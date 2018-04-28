'use strict';

(function () {

  var HASHTAGS_MAX_QUANTITY = 5;
  var HASHTAG_MAX_LENGTH = 20;

  var Errors = {
    HASHTAGS_TOO_MUCH: 'У вас слишком много хэштегов, можно не больше 5',
    HASHTAG_HAS_NO_HASH: 'Каждый хэштег должен начинаться с символа #',
    HASHTAG_TOO_LONG: 'Хэштег не должен быть длиннее 20 символов',
    HASHTAG_ONLY_HASH: 'Хэштег не должен состоять только из одной #',
    HASHTAG_HAS_DOUBLE: 'Пожалуйста, уберите повторяющийся хэштег'
  };

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
      hashtagInputElement.setCustomValidity(Errors.HASHTAGS_TOO_MUCH);
      return;
    }

    for (var i = 0; i < hashtagsForTest.length; i++) {
      if (hashtagsForTest[i].charAt(0) !== '#') {
        hashtagInputElement.setCustomValidity(Errors.HASHTAG_HAS_NO_HASH);
        return;
      } else if (hashtagsForTest[i].length > HASHTAG_MAX_LENGTH) {
        hashtagInputElement.setCustomValidity(Errors.HASHTAG_TOO_LONG);
        return;
      } else if (hashtagsForTest[i] === '#') {
        hashtagInputElement.setCustomValidity(Errors.HASHTAG_ONLY_HASH);
        return;
      }
      if (testDoubleHashtags.includes(hashtagsForTest[i]) && !doubleHashtags.includes(hashtagsForTest[i])) {
        doubleHashtags.push(hashtagsForTest[i]);
      } else {
        testDoubleHashtags.push(hashtagsForTest[i]);
      }
    }
    if (doubleHashtags.length > 0) {
      hashtagInputElement.setCustomValidity(Errors.HASHTAG_HAS_DOUBLE);
      return;
    }
  };

  var uploadFormElement = document.querySelector('.img-upload__form');
  var submitPictureElement = uploadFormElement.querySelector('.img-upload__submit');
  var hashtagInputElement = uploadFormElement.querySelector('.text__hashtags');

  submitPictureElement.addEventListener('click', function () {
    validateHashtags();
  });
})();
