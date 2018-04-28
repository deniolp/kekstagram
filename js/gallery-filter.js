'use strict';

(function () {

  var sorters = {
    'filter-popular': function (a, b) {
      if (a.likes > b.likes) {
        return -1;
      } else if (a.likes < b.likes) {
        return 1;
      } else {
        return 0;
      }
    },
    'filter-discussed': function (a, b) {
      if (a.comments.length > b.comments.length) {
        return -1;
      } else if (a.comments.length < b.comments.length) {
        return 1;
      } else {
        return 0;
      }
    },
    'filter-randomed': function () {
      return Math.random() - 0.5;
    }
  };

  var addFilteredPictures = function (pictures, sorterName) {
    return function () {
      var sortBy = sorters[sorterName];
      var copiedPictures = pictures.slice();
      var sortedPictures = sortBy ? copiedPictures.sort(sortBy) : copiedPictures;

      window.addPictures(sortedPictures);
    };
  };

  window.addFilteredPictures = addFilteredPictures;
})();
