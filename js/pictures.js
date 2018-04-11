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
var EFFECTS = [
  'chrome',
  'sepia',
  'marvin',
  'phobos',
  'heat'
];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


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

// var showBigPicture = function (picture) {
//   var commentBlockTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
//   var commentsBlock = bigPicture.querySelector('.social__comments');
//   var fragmentComment = document.createDocumentFragment();
//   var commentBlock;
//
//   bigPicture.classList.remove('hidden');
//   bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
//   bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
//   bigPicture.querySelector('.big-picture__img').querySelector('img').src = picture.url;
//   bigPicture.querySelector('.likes-count').textContent = picture.likes;
//   bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
//
//   for (var i = 0; i < picture.comments.length; i++) {
//     commentBlock = commentBlockTemplate.cloneNode(true);
//     commentBlock.querySelector('img').src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
//     commentBlock.lastChild.textContent = picture.comments[i];
//     fragmentComment.appendChild(commentBlock);
//   }
//
//   commentsBlock.innerHTML = '';
//   commentsBlock.appendChild(fragmentComment);
// };

var addEffectPreview = function (effect) {
  imgPreviewElement.className = 'img-upload__preview';
  imgPreviewElement.classList.add('effects__preview--' + effect);
};

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadImageElement.classList.remove('hidden');

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  uploadImageElement.classList.add('hidden');

  document.removeEventListener('keydown', onPopupEscPress);
  uploadFileInputElement.value = '';
};

var getEffect = function (effect) {
  for (var i = 0; i < EFFECTS.length; i++) {
    if (effect === EFFECTS[i]) {
      var effectFilter = effectFilters[i];
      break;
    }
  } return effectFilter;
};

var getEffectIntensity = function (value) {
  scaleValueInputElement.value = value - (document.documentElement.clientWidth - 453) / 2;
  effectIntensity = Math.floor(scaleValueInputElement.value / 4.53);
  return effectIntensity;
};

var pictureList = [];
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
// var bigPicture = document.querySelector('.big-picture');
var uploadFormElement = document.querySelector('.img-upload__form');
var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
var uploadImageCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
var imgPreviewElement = uploadFormElement.querySelector('.img-upload__preview');
var effectNoneElement = uploadFormElement.querySelector('#effect-none');
var effectChromeElement = uploadFormElement.querySelector('#effect-chrome');
var effectSepiaElement = uploadFormElement.querySelector('#effect-sepia');
var effectMarvinElement = uploadFormElement.querySelector('#effect-marvin');
var effectPhobosElement = uploadFormElement.querySelector('#effect-phobos');
var effectHeatElement = uploadFormElement.querySelector('#effect-heat');
var scalePinElement = uploadFormElement.querySelector('.scale__pin');
var scaleValueInputElement = uploadFormElement.querySelector('.scale__value');
// var scaleLevelElement = uploadFormElement.querySelector('.scale__level');
var effectIntensity = 20;
var effectFilters = [
  'grayscale(' + effectIntensity / 100 + ')',
  'sepia(' + effectIntensity / 100 + ')',
  'invert(' + effectIntensity + '%)',
  'blur(' + effectIntensity * 0.03 + 'px)',
  'brightness(' + (effectIntensity * 0.02 + 1) + ')'
];

for (var i = 0; i < LIMIT_PICTURES; i++) {
  pictureList.push(generatePicture(i + 1));
}

for (var j = 0; j < LIMIT_PICTURES; j++) {
  fragment.appendChild(createPictureElement(pictureTemplate, pictureList[j]));
}

pictures.appendChild(fragment);

// showBigPicture(pictureList[0]);

uploadFileInputElement.addEventListener('change', function () {
  openPopup();
});

uploadImageCancelElement.addEventListener('click', function () {
  closePopup();
});

uploadImageCancelElement.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

effectNoneElement.addEventListener('click', function () {
  imgPreviewElement.className = 'img-upload__preview';
  imgPreviewElement.style.filter = '';
});

effectChromeElement.addEventListener('click', function () {
  addEffectPreview('chrome');
  imgPreviewElement.style.filter = getEffect('chrome');

  scalePinElement.addEventListener('mouseup', function (evt) {
    getEffectIntensity(evt.clientX);
    imgPreviewElement.style.filter = getEffect('chrome');
  });
});

effectSepiaElement.addEventListener('click', function () {
  addEffectPreview('sepia');
  imgPreviewElement.style.filter = getEffect('sepia');

  scalePinElement.addEventListener('mouseup', function (evt) {
    getEffectIntensity(evt.clientX);
    imgPreviewElement.style.filter = getEffect('sepia');
  });
});

effectMarvinElement.addEventListener('click', function () {
  addEffectPreview('marvin');
  imgPreviewElement.style.filter = getEffect('marvin');

  scalePinElement.addEventListener('mouseup', function (evt) {
    getEffectIntensity(evt.clientX);
    imgPreviewElement.style.filter = getEffect('marvin');
  });
});

effectPhobosElement.addEventListener('click', function () {
  addEffectPreview('phobos');
  imgPreviewElement.style.filter = getEffect('phobos');

  scalePinElement.addEventListener('mouseup', function (evt) {
    getEffectIntensity(evt.clientX);
    imgPreviewElement.style.filter = getEffect('phobos');
  });
});

effectHeatElement.addEventListener('click', function () {
  addEffectPreview('heat');
  imgPreviewElement.style.filter = getEffect('heat');

  scalePinElement.addEventListener('mouseup', function (evt) {
    getEffectIntensity(evt.clientX);
    imgPreviewElement.style.filter = getEffect('heat');
  });
});
