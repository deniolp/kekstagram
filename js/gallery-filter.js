'use strict';

(function () {

  var Filters = {
    POPULAR: 'filter-popular',
    DISCUSSED: 'filter-discussed',
    RANDOMED: 'filter-randomed'
  };

  window.galleryFilter = {
    addFilteredPictures: function (pictures, sorterName) {
      switch (sorterName) {
        case Filters.POPULAR:
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
        case Filters.DISCUSSED:
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
        case Filters.RANDOMED:
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
