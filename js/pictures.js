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
var ENTER_KEYCODE = 13;
var EFFECT_GRAYSCALE_DEFAULT_VALUE = 1;
var EFFECT_SEPIA_DEFAULT_VALUE = 1;
var EFFECT_INVERT_DEFAULT_VALUE = 100;
var EFFECT_BLUR_DEFAULT_VALUE = 3;
var EFFECT_BRIGHTNESS_DEFAULT_VALUE = 3;

var SCALE_STEP_VALUE = 25;
var SCALE_LIMIT_LAST_INCREASE = 75;
var SCALE_LIMIT_LAST_DECREASE = 50;

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
    commentBlock.querySelector('img').src = 'img/avatar-' + generateRandomNumber(1, 6) + '.svg';
    commentBlock.lastChild.textContent = data.comments[i];
    fragmentComment.appendChild(commentBlock);
  }

  commentsBlock.innerHTML = '';
  commentsBlock.appendChild(fragmentComment);
};

var popupEscPressHandler = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  uploadImageElement.classList.remove('hidden');

  document.addEventListener('keydown', popupEscPressHandler);
};

var closePopup = function () {
  uploadImageElement.classList.add('hidden');

  document.removeEventListener('keydown', popupEscPressHandler);
  uploadFileInputElement.value = '';
};

var createEffectClickHanlder = function (effectName) {
  return function () {
    previewElement.className = 'img-upload__preview effects__preview--' + effectName;
    if (effectName === 'none') {
      scaleElement.classList.add('hidden');
    } else {
      scaleElement.classList.remove('hidden');
    }
    previewElement.style.filter = createDefaultStyleEffect(effectName);

    scalePinElement.addEventListener('mouseup', function (evt) {
      getEffectIntensity(evt.clientX);
      previewElement.style.filter = createStyleEffect(effectName);
    });
  };
};

var createDefaultStyleEffect = function (effect) {
  switch (effect) {
    case 'chrome':
      return 'grayscale(' + EFFECT_GRAYSCALE_DEFAULT_VALUE + ')';
    case 'sepia':
      return 'sepia(' + EFFECT_SEPIA_DEFAULT_VALUE + ')';
    case 'marvin':
      return 'invert(' + EFFECT_INVERT_DEFAULT_VALUE + '%)';
    case 'phobos':
      return 'blur(' + EFFECT_BLUR_DEFAULT_VALUE + 'px)';
    case 'heat':
      return 'brightness(' + EFFECT_BRIGHTNESS_DEFAULT_VALUE + ')';
    default:
      return 'none';
  }
};

var createStyleEffect = function (effect) {
  switch (effect) {
    case 'chrome':
      return 'grayscale(' + effectIntensity / 100 + ')';
    case 'sepia':
      return 'sepia(' + effectIntensity / 100 + ')';
    case 'marvin':
      return 'invert(' + effectIntensity + '%)';
    case 'phobos':
      return 'blur(' + effectIntensity * EFFECT_BLUR_DEFAULT_VALUE / 100 + 'px)';
    case 'heat':
      return 'brightness(' + (effectIntensity * (EFFECT_BRIGHTNESS_DEFAULT_VALUE - 1) / 100 + 1) + ')';
    default:
      return 'none';
  }
};

var caclulateScrollBarWidth = function (scaleLineElement) {
  return scaleLineElement.getBoundingClientRect().width;
};

var getEffectIntensity = function (value) {
  var pinPosition = value - (document.documentElement.clientWidth - caclulateScrollBarWidth(scaleLine)) / 2;
  effectIntensity = Math.floor(pinPosition / (caclulateScrollBarWidth(scaleLine) / 100));

  scaleValueInputElement.value = effectIntensity;

  return effectIntensity;
};

var pictures = [];

var pictureTemplate = document.querySelector('#picture').content.querySelector('a');
var picturesElements = document.querySelector('.pictures');
var bigPictureElement = document.querySelector('.big-picture');
var uploadFormElement = document.querySelector('.img-upload__form');
var uploadFileInputElement = uploadFormElement.querySelector('#upload-file');
var uploadImageElement = uploadFormElement.querySelector('.img-upload__overlay');
var uploadImageCancelElement = uploadFormElement.querySelector('.img-upload__cancel');
var previewElement = uploadFormElement.querySelector('.img-upload__preview');

var effectNoneElement = uploadFormElement.querySelector('#effect-none');
var effectChromeElement = uploadFormElement.querySelector('#effect-chrome');
var effectSepiaElement = uploadFormElement.querySelector('#effect-sepia');
var effectMarvinElement = uploadFormElement.querySelector('#effect-marvin');
var effectPhobosElement = uploadFormElement.querySelector('#effect-phobos');
var effectHeatElement = uploadFormElement.querySelector('#effect-heat');

var scalePinElement = uploadFormElement.querySelector('.scale__pin');
var scaleValueInputElement = uploadFormElement.querySelector('.scale__value');
var scaleElement = uploadFormElement.querySelector('.img-upload__scale');
var scaleLine = uploadFormElement.querySelector('.scale__line');

var resizeButtonMinus = uploadFormElement.querySelector('.resize__control--minus');
var resizeButtonPlus = uploadFormElement.querySelector('.resize__control--plus');
var resizeValue = uploadFormElement.querySelector('.resize__control--value');
var bigPictureCancelElement = bigPictureElement.querySelector('#picture-cancel');

var fragment = document.createDocumentFragment();
var effectIntensity;
var picture;
var pictureElement;

for (var i = 0; i < LIMIT_PICTURES; i++) {
  picture = generatePicture(i + 1);
  pictures.push(picture);

  pictureElement = createPictureElement(pictureTemplate, picture);
  pictureElement.addEventListener('click', createPictureClickHandler(picture, bigPictureElement));

  fragment.appendChild(pictureElement);
}

picturesElements.appendChild(fragment);

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
  bigPictureElement.classList.add('hidden');
});

document.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    bigPictureElement.classList.add('hidden');
  }
});

scaleElement.classList.add('hidden');

effectNoneElement.addEventListener('click', createEffectClickHanlder('none'));
effectChromeElement.addEventListener('click', createEffectClickHanlder('chrome'));
effectSepiaElement.addEventListener('click', createEffectClickHanlder('sepia'));
effectMarvinElement.addEventListener('click', createEffectClickHanlder('marvin'));
effectPhobosElement.addEventListener('click', createEffectClickHanlder('phobos'));
effectHeatElement.addEventListener('click', createEffectClickHanlder('heat'));

resizeValue.value = '100%';

resizeButtonMinus.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) >= SCALE_LIMIT_LAST_DECREASE) {
    resizeValue.value = parseInt(resizeValue.value, 10) - SCALE_STEP_VALUE + '%';
    previewElement.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  }
});

resizeButtonPlus.addEventListener('click', function () {
  if (parseInt(resizeValue.value, 10) <= SCALE_LIMIT_LAST_INCREASE) {
    resizeValue.value = parseInt(resizeValue.value, 10) + SCALE_STEP_VALUE + '%';
    previewElement.style.transform = 'scale(' + parseInt(resizeValue.value, 10) / 100 + ')';
  } if (parseInt(resizeValue.value, 10) === 100) {
    previewElement.style.transform = '';
  }
});
