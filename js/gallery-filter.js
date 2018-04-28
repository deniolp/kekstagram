'use strict';

(function () {

  var removePhotos = function () {
    var allPhotos = picturesElements.querySelectorAll('.picture__link');

    allPhotos.forEach(function (item) {
      item.remove();
    });
  };

  var createFilter = function (filter) {

    switch (filter) {
      case 'filter-popular':
        return (function (a, b) {
          if (a.likes > b.likes) {
            return -1;
          } else if (a.likes < b.likes) {
            return 1;
          } else {
            return 0;
          }
        });
      case 'filter-discussed':
        return (function (a, b) {
          if (a.comments.length > b.comments.length) {
            return -1;
          } else if (a.comments.length < b.comments.length) {
            return 1;
          } else {
            return 0;
          }
        });
      case 'filter-randomed':
        return (function () {
          return Math.random() - 0.5;
        });
      default:
        return false;
    }
  };

  var changeFilter = function (pictures, filter) {
    return function () {

      removePhotos();
      if (filter === 'filter-new') {
        window.processPictures(pictures);
      } else {
        window.processPictures(pictures.slice().sort(createFilter(filter)));
      }
    };
  };

  var picturesElements = document.querySelector('.pictures');

  window.changeFilter = changeFilter;
})();
