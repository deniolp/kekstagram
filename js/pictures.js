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
  'none',
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

var showBigPicture = function (url, likesQuantity, commentsQuantity, object) {
  var commentBlockTemplate = bigPicture.querySelector('.social__comment').cloneNode(true);
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var fragmentComment = document.createDocumentFragment();
  var commentBlock;

  bigPicture.classList.remove('hidden');
  bigPicture.querySelector('.social__comment-count').classList.add('visually-hidden');
  bigPicture.querySelector('.social__comment-loadmore').classList.add('visually-hidden');
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likesQuantity;
  bigPicture.querySelector('.comments-count').textContent = commentsQuantity;

  for (var i = 0; i < commentsQuantity; i++) {
    commentBlock = commentBlockTemplate.cloneNode(true);
    commentBlock.querySelector('img').src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    commentBlock.lastChild.textContent = object.comments[i];
    fragmentComment.appendChild(commentBlock);
  }

  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragmentComment);
};

var onPictureClick = function (evt) {
  var src = evt.target.src;
  var commentsQuantity = evt.target.nextElementSibling.firstElementChild.textContent;
  var likes = evt.target.nextElementSibling.lastElementChild.textContent;
  var comments = pictureList[0];

  showBigPicture(src, likes, commentsQuantity, comments);
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

var createEffectHandler = function (effectName, previewElement, scale) {
  return function () {
    previewElement.className = 'img-upload__preview effects__preview--' + effectName;
    if (effectName === 'none') {
      scale.classList.add('hidden');
    } else {
      scale.classList.remove('hidden');
    }
    previewElement.style.filter = createDefaultStyleEffect(effectName);

    scalePinElement.addEventListener('mouseup', function (evt) {
      getEffectIntensity(evt.clientX);
      previewElement.style.filter = createStyleEffect(effectName);
    });
  };
};

var createDefaultStyleEffect = function (effect) {
  var effects = [
    '',
    'grayscale(1)',
    'sepia(1)',
    'invert(100%)',
    'blur(3px)',
    'brightness(3)'
  ];
  for (var k = 0; k < EFFECTS.length; k++) {
    if (effect === EFFECTS[k]) {
      var effectFilter = effects[k];
      break;
    }
  } return effectFilter;
};

var createStyleEffect = function (effect) {
  var effectFilters = [
    '',
    'grayscale(' + effectIntensity / 100 + ')',
    'sepia(' + effectIntensity / 100 + ')',
    'invert(' + effectIntensity + '%)',
    'blur(' + effectIntensity * 0.03 + 'px)',
    'brightness(' + (effectIntensity * 0.02 + 1) + ')'
  ];
  for (var i = 0; i < EFFECTS.length; i++) {
    if (effect === EFFECTS[i]) {
      var effectFilter = effectFilters[i];
      break;
    }
  } return effectFilter;
};

var getEffectIntensity = function (value) {
  var pinPosition = value - (document.documentElement.clientWidth - 453) / 2;
  effectIntensity = Math.floor(pinPosition / 4.53);
  scaleValueInputElement.value = effectIntensity;
  return effectIntensity;
};

var pictureList = [];
var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var pictures = document.querySelector('.pictures');
var fragment = document.createDocumentFragment();
var bigPicture = document.querySelector('.big-picture');
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
var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
var resizeButtonMinus = uploadFormElement.querySelector('.resize__control--minus');
var resizeButtonPlus = uploadFormElement.querySelector('.resize__control--plus');
var resizeValue = uploadFormElement.querySelector('.resize__control--value');
var bigPictureCancelElement = bigPicture.querySelector('#picture-cancel');

var effectIntensity;
resizeValue.value = '100%';

for (var i = 0; i < LIMIT_PICTURES; i++) {
  pictureList.push(generatePicture(i + 1));
}

for (var j = 0; j < LIMIT_PICTURES; j++) {
  fragment.appendChild(createPictureElement(pictureTemplate, pictureList[j]));
}

pictures.appendChild(fragment);
var picturesContainer = pictures.querySelectorAll('.picture__img');

for (i = 0; i < LIMIT_PICTURES; i++) {
  picturesContainer[i].addEventListener('click', onPictureClick);
}

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

bigPictureCancelElement.addEventListener('click', function () {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPicture.classList.add('hidden');
  }
});

scaleElement.classList.add('hidden');
effectNoneElement.addEventListener('click', createEffectHandler('none', imgPreviewElement, scaleElement));
effectChromeElement.addEventListener('click', createEffectHandler('chrome', imgPreviewElement, scaleElement));
effectSepiaElement.addEventListener('click', createEffectHandler('sepia', imgPreviewElement, scaleElement));
effectMarvinElement.addEventListener('click', createEffectHandler('marvin', imgPreviewElement, scaleElement));
effectPhobosElement.addEventListener('click', createEffectHandler('phobos', imgPreviewElement, scaleElement));
effectHeatElement.addEventListener('click', createEffectHandler('heat', imgPreviewElement, scaleElement));


resizeButtonMinus.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) >= 50) {
    resizeValue.value = parseInt(resizeValue.value, 10) - 25 + '%';
    imgPreviewElement.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  }
});

resizeButtonPlus.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) <= 75) {
    resizeValue.value = parseInt(resizeValue.value, 10) + 25 + '%';
    imgPreviewElement.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  } if (parseInt(resizeValue.value, 10) === 100) {
    imgPreviewElement.style.transform = '';
  }
});
