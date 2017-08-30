'use strict';

(function () {
  var formContent = document.querySelector('.form__content');
  var timeIn = formContent.querySelector('#timein');
  var timeOut = formContent.querySelector('#timeout');
  var typeHouse = formContent.querySelector('#type');
  var priceHouse = formContent.querySelector('#price');
  var roomNumber = formContent.querySelector('#room_number');
  var capacity = formContent.querySelector('#capacity');

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

  timeIn.addEventListener('change', autoTimeInOut);
  timeOut.addEventListener('change', autoTimeInOut);
  typeHouse.addEventListener('change', getPriceHouse);
  roomNumber.addEventListener('change', getRoom);
})();
