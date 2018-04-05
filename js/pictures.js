'use strict';

var LIMIT_PHOTOS = 25;
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

var photoList = [];
var template = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();

var generateRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var generateComments = function (quantityOfComments) {
  var comments = [];
  for (var i = 1; i <= quantityOfComments; i++) {
    comments.push(COMMENTS_LIST[generateRandomNumber(0, COMMENTS_LIST.length - 1)]);
  }
  return comments;
};

var generatePhoto = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: generateComments(generateRandomNumber(1, 2)),
    description: DESCRIPTION_LIST[generateRandomNumber(0, DESCRIPTION_LIST.length - 1)]
  };
};

var createElement = function (element, object) {
  element = template.cloneNode(true);
  var img = element.querySelector('img');
  var photoStat = element.querySelector('.picture__stat--likes');
  var commentStat = element.querySelector('.picture__stat--comments');
  img.src = object.url;
  photoStat.textContent = object.likes;
  commentStat.textContent = object.comments.length;
  return element;
};

for (var i = 0; i < LIMIT_PHOTOS; i++) {
  photoList.push(generatePhoto(i + 1));
}

for (var j = 0; j < photoList.length; j++) {
  var element = createElement(template, photoList[j]);
  fragment.appendChild(element);
}

pictures.appendChild(fragment);
