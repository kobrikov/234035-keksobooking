'use strict';

window.form = (function () {
  var form = document.querySelector('.notice__form');
  var formContent = document.querySelector('.form__content');
  var myPin = document.querySelector('.pin__main');
  var address = formContent.querySelector('#address');
  var timeIn = formContent.querySelector('#timein');
  var timeOut = formContent.querySelector('#timeout');
  var typeHouse = formContent.querySelector('#type');
  var priceHouse = formContent.querySelector('#price');
  var roomNumber = formContent.querySelector('#room_number');
  var capacity = formContent.querySelector('#capacity');
  var addressX = '';
  var addressY = '';
  var regexp = /x: ([0-9]{3,4}), y: ([0-9]{3})$/i;
  var pano = window.data.mapPano;
  var regTime = window.data.form.regTime;
  var typeHouseArray = window.data.form.type;
  var priceHouseArray = window.data.form.price;
  var roomsCount = window.data.form.rooms;
  var placesCount = window.data.form.places;
  var lastTimeout;

  var setAddress = function (x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
  };

  var delChar = function (string) {
    return string.replace(/\D/gi, '');
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var createLoadElement = function (message) {
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

  var deleteLoadElement = function () {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      var element = document.body.querySelector('.inform');
      element.parentNode.removeChild(element);
    }, 3000);
  };

  var onLoad = function (message) {
    window.form.createLoadElement(message);
    window.form.deleteLoadElement();
    form.reset();
  };

  var onError = function (message) {
    window.form.createLoadElement(message);
    window.form.deleteLoadElement();
  };

  window.synchronizeFields(timeIn, timeOut, regTime, regTime, syncValues);
  window.synchronizeFields(timeOut, timeIn, regTime, regTime, syncValues);
  window.synchronizeFields(typeHouse, priceHouse, typeHouseArray, priceHouseArray, syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, roomsCount, placesCount, syncValues);

  address.addEventListener('input', function (evt) {
    addressX = '';
    addressY = '';
    if (regexp.test(evt.target.value)) {
      var addressArray = address.value.split(', ');
      addressX = delChar(addressArray[0]);
      addressY = delChar(addressArray[1]);
    }

    var poolX = (addressX >= pano.startX && addressX <= pano.endX);
    var poolY = (addressY >= pano.startY && addressY <= pano.endY);

    if (addressX && addressY && poolX && poolY) {
      myPin.style.left = addressX - Math.round(myPin.clientWidth / 2) + 'px';
      myPin.style.top = addressY - myPin.clientHeight + 'px';
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  });

  return {
    setAddress: setAddress,
    createLoadElement: createLoadElement,
    deleteLoadElement: deleteLoadElement
  };
})();
