'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var getRandomNumber = function (num) {
    return Math.floor(Math.random() * num);
  };
  var getRandomArray = function (array) {
    var defaultPins = [];
    var randomCount = window.data.pin.randomCount;
    var value = null;
    while (randomCount > 0) {
      value = array[getRandomNumber(array.length)];
      if (defaultPins.indexOf(value) !== -1) {
        continue;
      } else {
        defaultPins.push(value);
        randomCount--;
      }
    }
    return defaultPins;
  };
  var debounce = function (fun, interval) {
    var lastTimeout;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, interval);
  };
  var isEnterPress = function (evt) {
    return evt.keyCode === ENTER_KEYCODE;
  };
  var isEscPress = function (evt) {
    return evt.keyCode === ESC_KEYCODE;
  };
  var createMessageElement = function (message) {
    var node = document.createElement('div');
    node.className = 'inform';
    node.style.position = 'fixed';
    node.style.left = 50 + '%';
    node.style.top = 0;
    node.style.transform = 'translateX(-50%)';
    node.style.padding = 10 + 'px';
    node.style.width = 300 + 'px';
    node.style.textAlign = 'center';
    node.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    node.style.color = 'rgba(255, 255, 255, 1)';
    node.style.zIndex = 1000;
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  var deleteMessageElement = function () {
    var element = document.body.querySelector('.inform');
    element.parentNode.removeChild(element);
  };
  return {
    debounce: debounce,
    isEnterPress: isEnterPress,
    isEscPress: isEscPress,
    createMessageElement: createMessageElement,
    deleteMessageElement: deleteMessageElement,
    getRandomArray: getRandomArray
  };
})();
