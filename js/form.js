'use strict';

window.form = (function () {
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

  var autoTimeInOut = function (evt) {
    if (evt.target.id === 'timein') {
      timeOut.value = evt.target.value;
    } else {
      timeIn.value = evt.target.value;
    }
  };

  var getPriceHouse = function (evt) {
    var value = evt.target.value;
    switch (value) {
      case 'flat':
        priceHouse.min = 1000;
        priceHouse.value = 1000;
        break;
      case 'bungalo':
        priceHouse.min = 0;
        priceHouse.value = 0;
        break;
      case 'house':
        priceHouse.min = 5000;
        priceHouse.value = 5000;
        break;
      case 'palace':
        priceHouse.min = 10000;
        priceHouse.value = 10000;
        break;
    }
  };

  var getRoom = function (evt) {
    var value = evt.target.value;
    switch (value) {
      case '1':
        capacity.value = 1;
        break;
      case '2':
        capacity.value = 2;
        break;
      case '3':
        capacity.value = 3;
        break;
      case '100':
        capacity.value = 0;
        break;
    }
  };

  var setAddress = function (x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
  };

  var delChar = function (string) {
    return string.replace(/\D/gi, '');
  };

  timeIn.addEventListener('change', autoTimeInOut);
  timeOut.addEventListener('change', autoTimeInOut);
  typeHouse.addEventListener('change', getPriceHouse);
  roomNumber.addEventListener('change', getRoom);

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

  return {
    setAddress: setAddress
  };
})();
