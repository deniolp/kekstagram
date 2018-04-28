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

  var removePictures = function () {
    var allPhotos = picturesElements.querySelectorAll('.picture__link');

    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var addPictures = function (pictures) {
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

  var successLoadHandler = function (pictures) {

    addPictures(pictures);
    filtersElement.classList.remove('img-filters--inactive');
    filterButtonTemplate.classList.remove('img-filters__button--active');

    formFiltersElement.addEventListener('click', function (evt) {
      if (evt.target.type === 'button') {
        allFilters.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });
        formFiltersElement.querySelector('#' + evt.target.id).classList.add('img-filters__button--active');

        removePictures();
        window.debounce(window.addFilteredPictures(pictures, evt.target.id));
      }
    });
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  var filtersElement = document.querySelector('.img-filters');
  var formFiltersElement = document.querySelector('.img-filters__form');
  var filterButtonTemplate = formFiltersElement.querySelector('.img-filters__button');
  var allFilters = formFiltersElement.querySelectorAll('.img-filters__button');

  window.addPictures = addPictures;
  window.backend.load(successLoadHandler, window.errorMessage.show);
})();
