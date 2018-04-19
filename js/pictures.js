'use strict';

(function () {

  var LIMIT_PICTURES = 25;
  var ESC_KEYCODE = 27;

  var createPictureElement = function (template, object) {
    var element = template.cloneNode(true);
    element.querySelector('img').src = object.url;
    element.querySelector('.picture__stat--likes').textContent = object.likes;
    element.querySelector('.picture__stat--comments').textContent = object.comments.length;

    return element;
  };

  var createPictureClickHandler = function (data, element) {
    return function () {
      showPicture(data, element);
    };
  };

  var showPicture = function (data, element) {
    var commentBlockTemplate = element.querySelector('.social__comment').cloneNode(true);
    var commentsBlock = element.querySelector('.social__comments');
    var fragmentComment = document.createDocumentFragment();
    var commentBlock;

    element.classList.remove('hidden');
    element.querySelector('.social__comment-count').classList.add('visually-hidden');
    element.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
    element.querySelector('.big-picture__img').querySelector('img').src = data.url;
    element.querySelector('.likes-count').textContent = data.likes;
    element.querySelector('.comments-count').textContent = data.comments.length;

    for (var i = 0; i < data.comments.length; i++) {
      commentBlock = commentBlockTemplate.cloneNode(true);
      commentBlock.querySelector('img').src = 'img/avatar-' + window.utils.generateRandomNumber(1, 6) + '.svg';
      commentBlock.lastChild.textContent = data.comments[i];
      fragmentComment.appendChild(commentBlock);
    }

    commentsBlock.innerHTML = '';
    commentsBlock.appendChild(fragmentComment);
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

  var fragment = document.createDocumentFragment();
  var pictureElement;

  var pictures = window.generatePictures(LIMIT_PICTURES);

  for (var i = 0; i < pictures.length; i++) {
    pictureElement = createPictureElement(pictureTemplate, pictures[i]);
    pictureElement.addEventListener('click', createPictureClickHandler(pictures[i], bigPictureElement));

    fragment.appendChild(pictureElement);
  }

  picturesElements.appendChild(fragment);

  bigPictureCancelElement.addEventListener('click', function () {
    bigPictureElement.classList.add('hidden');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      bigPictureElement.classList.add('hidden');
    }
  });
})();
