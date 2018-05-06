'use strict';

(function () {

  var Filter = {
    POPULAR: 'filter-popular',
    DISCUSSED: 'filter-discussed',
    RANDOMED: 'filter-randomed'
  };

  window.galleryFilter = {
    addFilteredPictures: function (pictures, sorterName) {
      switch (sorterName) {
        case Filter.POPULAR:
          sortBy = function (a, b) {
            if (a.likes > b.likes) {
              return -1;
            }
            if (a.likes < b.likes) {
              return 1;
            }
            return 0;
          };
          break;
        case Filter.DISCUSSED:
          sortBy = function (a, b) {
            if (a.comments.length > b.comments.length) {
              return -1;
            }
            if (a.comments.length < b.comments.length) {
              return 1;
            }
            return 0;
          };
          break;
        case Filter.RANDOMED:
          sortBy = function () {
            return Math.random() - 0.5;
          };
      }

      var sortBy;
      var copiedPictures = pictures.slice();
      var sortedPictures = sortBy ? copiedPictures.sort(sortBy) : copiedPictures;

      window.gallery.addPictures(sortedPictures);
    }
  };
})();
