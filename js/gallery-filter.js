'use strict';

(function () {
  var Filter = {
    POPULAR: 'filter-popular',
    DISCUSSED: 'filter-discussed',
    RANDOMED: 'filter-randomed'
  };

  var compareFunctions = {};

  compareFunctions[Filter.POPULAR] = function (a, b) {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

  compareFunctions[Filter.DISCUSSED] = function (a, b) {
    if (a.comments.length > b.comments.length) {
      return -1;
    }
    if (a.comments.length < b.comments.length) {
      return 1;
    }
    return 0;
  };

  compareFunctions[Filter.RANDOMED] = function () {
    return Math.random() - 0.5;
  };

  window.galleryFilter = {
    addFilteredPictures: function (pictures, sorterName) {
      var compareFunction = compareFunctions[sorterName];
      var copiedPictures = pictures.slice();
      var sortedPictures = compareFunction ? copiedPictures.sort(compareFunction) : copiedPictures;

      window.gallery.addPictures(sortedPictures);
    }
  };
})();
