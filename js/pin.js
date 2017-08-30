'use strict';

window.pin = (function () {
  var ENTER_KEYCODE = 13;
  var sizePin = {};
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');

  var getSizePin = function (element) {
    var param = {};
    pinsMap.appendChild(element);
    param.halfWidth = element.clientWidth / 2;
    param.height = element.clientHeight;
    pinsMap.removeChild(element);
    return param;
  };

  var createPin = function (pinAds) {
    var pinElement = document.createElement('div');
    var pinImage = document.createElement('img');
    pinElement.appendChild(pinImage);
    pinElement.className = 'pin';
    pinImage.className = 'rounded';
    pinImage.width = '40';
    pinImage.height = '40';
    if (!sizePin.height) {
      sizePin = getSizePin(pinElement);
    }
    pinElement.style.left = pinAds.location.x - sizePin.halfWidth + 'px';
    pinElement.style.top = pinAds.location.y - sizePin.height + 'px';
    pinImage.src = pinAds.author.avatar;
    pinElement.tabIndex = '0';
    return pinElement;
  };

  var renderPin = function (arrayPin) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < arrayPin.length; i++) {
      fragment.appendChild(createPin(arrayPin[i]));
    }
    pinsMap.appendChild(fragment);
  };

  var clearActiveElement = function () {
    var clearActiveClass = pinsMap.querySelector('.pin--active');
    if (clearActiveClass) {
      clearActiveClass.classList.remove('pin--active');
    }
  };

  var setActiveElement = function (evt) {
    clearActiveElement();
    offerDialog.classList.remove('hidden');
    var currentElement = evt.currentTarget;
    currentElement.className += ' pin--active';
  };

  var onEnterPress = function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      setActiveElement(evt);
    }
  };

  return {
    renderPin: renderPin,
    clearActivePin: clearActiveElement,
    setActiveClick: setActiveElement,
    setActiveKey: onEnterPress
  };

})();
