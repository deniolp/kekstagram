'use strict';

(function () {
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

  var processPictures = function (pictures) {
    var pictureData;
    var pictureElement;
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      pictureData = pictures[i];
      pictureData.description = pictureData.comments[0];

      pictureElement = createPictureElement(pictureTemplate, pictureData);
      pictureElement.addEventListener('click', createPictureClickHandler(pictureData, bigPictureElement));

      fragment.appendChild(pictureElement);
    }

    picturesElements.appendChild(fragment);
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  window.backend.load(processPictures, window.errorMessage.show);
})();
