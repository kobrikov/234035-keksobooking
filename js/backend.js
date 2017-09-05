'use strict';

window.backend = (function () {
  var url = 'https://1510.dump.academy/keksobooking';
  var load = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = 10000;
    xhr.open('GET', url + '/data');
    xhr.send();
  };

  var save = function (dataForm, onSave, onErrorSave) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSave('Данные успешно отправлены');
      } else {
        onErrorSave('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.open('POST', url);
    xhr.send(dataForm);
  };
  return {
    load: load,
    save: save
  };
})();
