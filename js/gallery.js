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

  var successHandler = function (pictures) {
    filterButtonTemplate.classList.remove('img-filters__button--active');

    processPictures(pictures);
    filtersElement.classList.remove('img-filters--inactive');

    var additionalButton = filterButtonTemplate.cloneNode(true);
    additionalButton.textContent = 'Случайные';
    additionalButton.id = 'filter-randomed';
    formFiltersElement.appendChild(additionalButton);

    formFiltersElement.addEventListener('click', function (evt) {
      if (evt.target.type === 'button') {

        var allFilters = formFiltersElement.querySelectorAll('.img-filters__button');

        allFilters.forEach(function (item) {
          item.classList.remove('img-filters__button--active');
        });

        formFiltersElement.querySelector('#' + evt.target.id).classList.add('img-filters__button--active');

        window.debounce(window.changeFilter.bind(null, pictures, evt.target.id));
        window.processPictures = processPictures;
      }
    });
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  var filtersElement = document.querySelector('.img-filters');
  var formFiltersElement = document.querySelector('.img-filters__form');
  var filterButtonTemplate = formFiltersElement.querySelector('.img-filters__button');

  window.backend.load(successHandler, window.errorMessage.show);
})();
