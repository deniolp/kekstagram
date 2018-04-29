'use strict';

(function () {

  var KEYCODE_ESC = 27;
  var AVATAR_LIMIT = 6;
  var COMMENTS_DOSE = 5;

  var showPicture = function (data, element) {
    var commentBlockTemplate = element.querySelector('.social__comment').cloneNode(true);
    var commentsBlock = element.querySelector('.social__comments');
    var fragmentComment = document.createDocumentFragment();
    var loadMoreButton = element.querySelector('.social__comment-loadmore');
    var commentCountElement = element.querySelector('.social__comment-count');
    var commentBlock;
    var currentCommentNumber = 0;

    var addComments = function (num) {
      for (var i = 0; i < COMMENTS_DOSE; i++) {
        if (currentCommentNumber + i >= data.comments.length) {
          break;
        }
        commentBlock = commentBlockTemplate.cloneNode(true);
        commentBlock.querySelector('img').src = 'img/avatar-' + (i % AVATAR_LIMIT + 1) + '.svg';
        if (!num) {
          num = 0;
        }
        commentBlock.lastChild.textContent = data.comments[num + i];
        fragmentComment.appendChild(commentBlock);
      }
      currentCommentNumber = num + COMMENTS_DOSE;
    };

    element.classList.remove('hidden');
    element.querySelector('.big-picture__img').querySelector('img').src = data.url;
    element.querySelector('.likes-count').textContent = data.likes;
    element.querySelector('.comments-count').textContent = data.comments.length;
    element.querySelector('.social__caption').textContent = data.description;

    addComments();

    loadMoreButton.addEventListener('click', function () {
      addComments(currentCommentNumber);
      commentsBlock.appendChild(fragmentComment);
    });

    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(fragmentComment);
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
