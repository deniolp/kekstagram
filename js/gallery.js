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

    var additionalButton = filterButtonTemplate.cloneNode(true);

    processPictures(pictures);
    filtersElement.classList.remove('img-filters--inactive');

    additionalButton.textContent = 'Случайные';
    formFiltersElement.appendChild(additionalButton);

    formFiltersElement.addEventListener('click', function (evt) {
      if (evt.target.type === 'button') {
        changeFilter(pictures, evt.target.id);
      }
    });
  };

  var removePhotos = function () {
    var allPhotos = picturesElements.querySelectorAll('.picture__link');
    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var changeFilter = function (pictures, filter) {
    var picturesCopy = pictures.slice();
    var picturesToReRender;

    removePhotos();

    switch (filter) {
      case 'filter-popular': {
        picturesToReRender = picturesCopy.sort(function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
        processPictures(picturesToReRender);
        break;
      }
      case 'filter-discussed': {
        picturesToReRender = picturesCopy.sort(function (a, b) {
          if (a.comments.length > b.comments.length) {
            return -1;
          } else if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });
        processPictures(picturesToReRender);
        break;
      }
      case 'filter-new': {
        processPictures(pictures);
        break;
      }
    }
  };

  var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
  var picturesElements = document.querySelector('.pictures');
  var bigPictureElement = document.querySelector('.big-picture');

  var filtersElement = document.querySelector('.img-filters');
  var formFiltersElement = document.querySelector('.img-filters__form');
  var filterButtonTemplate = formFiltersElement.querySelector('.img-filters__button');

  window.backend.load(successHandler, window.errorMessage.show);
})();
