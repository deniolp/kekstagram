'use strict';

(function () {

  var KEYCODE_ESC = 27;
  var AVATAR_LIMIT = 6;
  var COMMENTS_PER_PAGE = 5;

  var bodyElement = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

  bigPictureCancelElement.addEventListener('click', function () {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEYCODE_ESC) {
      bigPictureElement.classList.add('hidden');
      bodyElement.classList.remove('modal-open');
    }
  });

  window.galleryPreview = {
    showPicture: function (data, element) {
      var commentsBlockElement = element.querySelector('.social__comments');
      var commentBlockTemplate = element.querySelector('.social__comment').cloneNode(true);
      var commentCounterElement = element.querySelector('.social__comment-count');
      var loadMoreButtonElement = element.querySelector('.social__comment-loadmore');
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
          commentBlock.lastChild.textContent = data.comments[commentCounter + i].message;
          commentCounterElement.firstChild.textContent = commentCounter + i + 1 + ' из ';

          fragmentComment.appendChild(commentBlock);
        }

        commentCounter = commentCounter + COMMENTS_PER_PAGE;

        return fragmentComment;
      };

      element.classList.remove('hidden');
      bodyElement.classList.add('modal-open');
      element.querySelector('.big-picture__img').querySelector('img').src = data.url;
      element.querySelector('.likes-count').textContent = data.likes;
      element.querySelector('.comments-count').textContent = data.comments.length;
      element.querySelector('.social__caption').textContent = data.description.message;

      loadMoreButtonElement.addEventListener('click', function () {
        commentsBlockElement.appendChild(createMoreComments());
      });

      commentsBlockElement.innerHTML = '';
      commentsBlockElement.appendChild(createMoreComments());
    }
  };
})();
