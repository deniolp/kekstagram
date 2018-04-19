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
var ESC_KEYCODE = 27;

var generateComments = function (quantityOfComments) {
  var comments = [];
  for (var i = 1; i <= quantityOfComments; i++) {
    comments.push(COMMENTS_LIST[window.utils.generateRandomNumber(0, COMMENTS_LIST.length - 1)]);
  }
  return comments;
};

var generatePictureObject = function (index) {
  return {
    url: 'photos/' + index + '.jpg',
    likes: window.utils.generateRandomNumber(15, 200),
    comments: generateComments(window.utils.generateRandomNumber(1, 2)),
    description: DESCRIPTION_LIST[window.utils.generateRandomNumber(0, DESCRIPTION_LIST.length - 1)]
  };
};

var createPictureElement = function (template, object) {
  var element = template.cloneNode(true);
  element.querySelector('img').src = object.url;
  element.querySelector('.picture__stat--likes').textContent = object.likes;
  element.querySelector('.picture__stat--comments').textContent = object.comments.length;

  return element;
};

var createPictureClickHandler = function (data, element) {
  return function () {
    showPicture(data, element);
  };
};

var showPicture = function (data, element) {
  var commentBlockTemplate = element.querySelector('.social__comment').cloneNode(true);
  var commentsBlock = element.querySelector('.social__comments');
  var fragmentComment = document.createDocumentFragment();
  var commentBlock;

  element.classList.remove('hidden');
  element.querySelector('.social__comment-count').classList.add('visually-hidden');
  element.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  element.querySelector('.big-picture__img').querySelector('img').src = data.url;
  element.querySelector('.likes-count').textContent = data.likes;
  element.querySelector('.comments-count').textContent = data.comments.length;

  for (var i = 0; i < data.comments.length; i++) {
    commentBlock = commentBlockTemplate.cloneNode(true);
    commentBlock.querySelector('img').src = 'img/avatar-' + window.utils.generateRandomNumber(1, 6) + '.svg';
    commentBlock.lastChild.textContent = data.comments[i];
    fragmentComment.appendChild(commentBlock);
  }

  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragmentComment);
};

var pictures = [];

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var picturesElements = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

var fragment = document.createDocumentFragment();
var picture;
var pictureElement;

for (var i = 0; i < LIMIT_PICTURES; i++) {
  picture = generatePictureObject(i + 1);
  pictures.push(picture);

  pictureElement = createPictureElement(pictureTemplate, picture);
  pictureElement.addEventListener('click', createPictureClickHandler(picture, bigPictureElement));

  fragment.appendChild(pictureElement);
}

picturesElements.appendChild(fragment);

bigPictureCancelElement.addEventListener('click', function () {
  bigPictureElement.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPictureElement.classList.add('hidden');
  }
});
