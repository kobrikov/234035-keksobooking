'use strict';

window.util = (function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var debounce = function (fun, interval) {
    var lastTimeout;
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(fun, interval);
  };
  var onEnterPress = function (evt, fun) {
    evt.stopPropagation();
    if (evt.keyCode === ENTER_KEYCODE) {
      fun(evt);
    }
  };
  var onEscPress = function (evt, fun) {
    if (evt.keyCode === ESC_KEYCODE) {
      fun(evt);
    }
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
    node.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    node.style.color = 'rgba(255, 255, 255, 1)';
    node.style.zIndex = 100;
    node.textContent = message;
    document.body.insertAdjacentElement('afterbegin', node);
  };
  var deleteMessageElement = function () {
    var element = document.body.querySelector('.inform');
    element.parentNode.removeChild(element);
  };
  return {
    debounce: debounce,
    onEnterPress: onEnterPress,
    onEscPress: onEscPress,
    createMessageElement: createMessageElement,
    deleteMessageElement: deleteMessageElement
  };
})();
