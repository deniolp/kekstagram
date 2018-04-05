'use strict';

var photoList = [];
var commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptionList = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];

var getRandom = function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getComments = function (quantityOfComments) {
  var comments = [];
  for (var i = 1; i <= quantityOfComments; i++) {
    comments.push(commentsList[getRandom(0, commentsList.length - 1)]);
  } return comments;
};

for (var i = 1; i <= 25; i++) {
  photoList.push(
      {
        url: 'photos/' + i,
        likes: getRandom(15, 200),
        comments: getComments(getRandom(1, 2)),
        description: descriptionList[getRandom(0, descriptionList.length - 1)]
      }
  );
}
