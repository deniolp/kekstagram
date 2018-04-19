'use strict';

(function () {

  var COMMENTS_LIST = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];
  var DESCRIPTION_LIST = [
    'Тестим новую камеру!',
    'Затусили с друзьями на море',
    'Как же круто тут кормят',
    'Отдыхаем...',
    'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......',
    'Вот это тачка!'
  ];

  var generateComments = function (quantityOfComments) {
    var comments = [];
    for (var i = 1; i <= quantityOfComments; i++) {
      comments.push(COMMENTS_LIST[window.utils.generateRandomNumber(0, COMMENTS_LIST.length - 1)]);
    }
    return comments;
  };

  var generatePicture = function (index) {
    return {
      url: 'photos/' + index + '.jpg',
      likes: window.utils.generateRandomNumber(15, 200),
      comments: generateComments(window.utils.generateRandomNumber(1, 2)),
      description: DESCRIPTION_LIST[window.utils.generateRandomNumber(0, DESCRIPTION_LIST.length - 1)]
    };
  };

  var generatePictures = function (number) {
    for (var i = 0; i < number; i++) {
      picture = generatePicture(i + 1);
      pictures.push(picture);
    }
    return pictures;
  };

  var pictures = [];
  var picture;

  window.generatePictures = generatePictures;
})();
