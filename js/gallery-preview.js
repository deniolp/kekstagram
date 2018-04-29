'use strict';

(function () {

  var KEYCODE_ESC = 27;
  var AVATAR_LIMIT = 6;
  var COMMENTS_PER_PAGE = 5;

  var showPicture = function (data, element) {
    var commentsBlockElement = element.querySelector('.social__comments');
    var commentBlockTemplate = element.querySelector('.social__comment').cloneNode(true);
    var commentCounterElement = element.querySelector('.social__comment-count');
    var loadMoreButton = element.querySelector('.social__comment-loadmore');
    var commentCounter = 0;

    var createMoreComments = function () {
      var commentBlock;
      var fragmentComment = document.createDocumentFragment();

      for (var i = 0; i < COMMENTS_PER_PAGE; i++) {
        if (commentCounter + i >= data.comments.length) {
          break;
        }

        commentBlock = commentBlockTemplate.cloneNode(true);

        commentBlock.querySelector('img').src = 'img/avatar-' + (i % AVATAR_LIMIT + 1) + '.svg';
        commentBlock.lastChild.textContent = data.comments[commentCounter + i];

        fragmentComment.appendChild(commentBlock);
      }

      commentCounterElement.firstChild.textContent = commentCounter + i + ' из ';
      commentCounter = commentCounter + COMMENTS_PER_PAGE;

      return fragmentComment;
    };

    element.classList.remove('hidden');
    element.querySelector('.big-picture__img').querySelector('img').src = data.url;
    element.querySelector('.likes-count').textContent = data.likes;
    element.querySelector('.comments-count').textContent = data.comments.length;
    element.querySelector('.social__caption').textContent = data.description;

    loadMoreButton.addEventListener('click', function () {
      commentsBlockElement.appendChild(createMoreComments());
    });

    commentsBlockElement.innerHTML = '';
    commentsBlockElement.appendChild(createMoreComments());
  };

  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

  bigPictureCancelElement.addEventListener('click', function () {
    bigPictureElement.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      bigPictureElement.classList.add('hidden');
    }
  });

  window.showPicture = showPicture;
})();
