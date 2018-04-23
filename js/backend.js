'use strict';

(function () {

  var xhrRepeatedCode = function (xhr, onSuccess, onError) {
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = 5000;
    window.errorMessage.clear();
  };

  window.backend = {
    load: function (onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhrRepeatedCode(xhr, onSuccess, onError);

      xhr.open('GET', URL);
      xhr.send();
    },

    save: function (data, onSuccess, onError) {
      var URL = 'https://js.dump.academy/kekstagram';
      var xhr = new XMLHttpRequest();
      xhrRepeatedCode(xhr, onSuccess, onError);

      xhr.open('POST', URL);
      xhr.send(data);
    }
  };
})();
