'use strict';

(function () {

  var removePhotos = function () {
    var allPhotos = picturesElements.querySelectorAll('.picture__link');

    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var createFilter = function (pictures, filter) {
    var picturesCopy = pictures.slice();

    switch (filter) {
      case 'filter-popular':
        return picturesCopy.sort(function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
      case 'filter-discussed':
        return picturesCopy.sort(function (a, b) {
          if (a.comments.length > b.comments.length) {
            return -1;
          } else if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });
      case 'filter-randomed':
        return picturesCopy.sort(function () {
          return Math.random() - 0.5;
        });
      default:
        return pictures;
    }
  };

  var changeFilter = function (pictures, filter) {
    return function () {

      removePhotos();

      window.processPictures(createFilter(pictures, filter));
    };
  };

  var picturesElements = document.querySelector('.pictures');

  window.changeFilter = changeFilter;
})();
