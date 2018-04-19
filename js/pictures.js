'use strict';

(function () {

  var LIMIT_PICTURES = 25;

  var createPictureElement = function (template, object) {
    var element = template.cloneNode(true);
    element.querySelector('img').src = object.url;
    element.querySelector('.picture__stat--likes').textContent = object.likes;
    element.querySelector('.picture__stat--comments').textContent = object.comments.length;

    return element;
  };

  var createPictureClickHandler = function (data, element) {
    return function () {
      window.showPicture(data, element);
    };
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  var fragment = document.createDocumentFragment();
  var pictureElement;

  var pictures = window.generatePictures(LIMIT_PICTURES);

  for (var i = 0; i < pictures.length; i++) {
    pictureElement = createPictureElement(pictureTemplate, pictures[i]);
    pictureElement.addEventListener('click', createPictureClickHandler(pictures[i], bigPictureElement));

    fragment.appendChild(pictureElement);
  }

  picturesElements.appendChild(fragment);
})();
