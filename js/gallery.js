'use strict';

(function () {
  var LIMIT_PICTURES = 25;

  var generatePicture = function (object) {
    return {
      url: object.url,
      likes: object.likes,
      comments: object.comments,
      description: object.comments[0]
    };
  };

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

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red; height: 50px; padding-top: 10px;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var generatePictures = function (data) {

    for (var i = 0; i < LIMIT_PICTURES; i++) {
      var pictureObject = generatePicture(data[i]);
      pictureElement = createPictureElement(pictureTemplate, pictureObject);
      pictureElement.addEventListener('click', createPictureClickHandler(pictureObject, bigPictureElement));

      fragment.appendChild(pictureElement);
    }
    picturesElements.appendChild(fragment);
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  var fragment = document.createDocumentFragment();
  var pictureElement;

  window.errorHandler = errorHandler;
  window.backend.load(generatePictures, errorHandler);
})();
