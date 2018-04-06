'use strict';

var LIMIT_PICTURES = 25;
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

var generatePicture = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: generateRandomNumber(15, 200),
    comments: generateComments(generateRandomNumber(1, 2)),
    description: DESCRIPTION_LIST[generateRandomNumber(0, DESCRIPTION_LIST.length - 1)]
  };
};

var createPictureElement = function (template, object) {
  var element = template.cloneNode(true);
  element.querySelector('img').src = object.url;
  element.querySelector('.picture__stat--likes').textContent = object.likes;
  element.querySelector('.picture__stat--comments').textContent = object.comments.length;
  return element;
};

var openPicture = function (picture) {
  var commentBlockTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var fragmentComment = document.createDocumentFragment();
  var commentBlock;

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  commentsBlock.innerHTML = '';
  for (var i = 0; i < picture.comments.length; i++) {
    commentBlock = commentBlockTemplate.cloneNode(true);
    commentBlock.querySelector('img').src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    commentBlock.lastChild.textContent = picture.comments[i];
    fragmentComment.appendChild(commentBlock);
  }
  commentsBlock.appendChild(fragmentComment);
};

var pictureList = [];
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');

for (var i = 0; i < LIMIT_PICTURES; i++) {
  pictureList.push(generatePicture(i + 1));
}

for (var j = 0; j < LIMIT_PICTURES; j++) {
  fragment.appendChild(createPictureElement(pictureTemplate, pictureList[j]));
}

pictures.appendChild(fragment);

openPicture(pictureList[5]);
bigPicture.classList.remove('hidden');
bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
