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

    var addComments = function () {
      for (var i = 0; i < COMMENTS_DOSE; i++) {
        commentBlock = commentBlockTemplate.cloneNode(true);
        commentBlock.querySelector('img').src = 'img/avatar-' + (i % AVATAR_LIMIT + 1) + '.svg';
        commentBlock.lastChild.textContent = data.comments[i];
        fragmentComment.appendChild(commentBlock);
      }
    };

    element.classList.remove('hidden');
    element.querySelector('.big-picture__img').querySelector('img').src = data.url;
    element.querySelector('.likes-count').textContent = data.likes;
    element.querySelector('.comments-count').textContent = data.comments.length;
    element.querySelector('.social__caption').textContent = data.description;

    var currentCommentNumber = COMMENTS_DOSE;
    addComments();

    loadMoreButton.addEventListener('click', function () {
      addComments();
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
