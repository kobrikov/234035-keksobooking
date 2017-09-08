'use strict';

window.pin = (function () {
  var ENTER_KEYCODE = 13;
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var DEBOUNCE_INTERVAL = 500;
  var sizePin = {};
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var filters = document.querySelectorAll('.tokyo__filter');
  var housingTypeFilter = document.querySelector('#housing_type');
  var housingPriceFilter = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var feature = document.getElementsByName('feature');
  var loadArray;

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

  var clearMap = function () {
    var pins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    offerDialog.classList.add('hidden');
    for (var i = 0; i < pins.length; i++) {
      pins[i].parentNode.removeChild(pins[i]);
    }
  };

  var getElementFilter = function (value1, value2) {
    if (value1 !== 'any') {
      return value1 === String(value2);
    }
    return true;
  };

  var getRangeElementFilter = function (value, price) {
    switch (value) {
      case 'any':
        return true;
      case 'middle':
        return (price >= PRICE_LOW && price <= PRICE_HIGH);
      case 'low':
        return (price < PRICE_LOW);
      case 'high':
        return (price > PRICE_HIGH);
    }
    return false;
  };

  var getClickElementFilter = function (features) {
    var currentElement = false;
    var beChecked = false;
    var whileNeedElement = false;
    for (var i = 0; i < feature.length; i++) {
      if (feature[i].checked) {
        beChecked = true;
        for (var j = 0; j < features.length; j++) {
          if (feature[i].value === features[j]) {
            currentElement = true;
            whileNeedElement = true;
            break;
          } else {
            whileNeedElement = false;
          }
        }
        if (!whileNeedElement) {
          currentElement = false;
          break;
        }
      }
    }
    if (!beChecked) {
      return true;
    }
    return currentElement;
  };

  var setFilter = function () {
    var newArray = loadArray.filter(function (el) {
      return getElementFilter(housingTypeFilter.value, el.offer.type);
    });
    newArray = newArray.filter(function (el) {
      return getRangeElementFilter(housingPriceFilter.value, el.offer.price);
    });
    newArray = newArray.filter(function (el) {
      return getElementFilter(housingRoomNumber.value, el.offer.rooms);
    });
    newArray = newArray.filter(function (el) {
      return getElementFilter(housingGuestsNumber.value, el.offer.guests);
    });
    newArray = newArray.filter(function (el) {
      return getClickElementFilter(el.offer.features);
    });
    clearMap();
    if (newArray.length) {
      window.pin.renderPin(newArray);
      window.dialog.renderDialog(newArray[0]);
      window.showDialog(newArray);
      offerDialog.classList.remove('hidden');
    }
  };

  var getFilterPin = function (array) {
    loadArray = array;
    feature.forEach(function (element) {
      element.addEventListener('change', function () {
        window.debounce(setFilter, DEBOUNCE_INTERVAL);
      });
    });
    filters.forEach(function (element) {
      element.addEventListener('change', function () {
        window.debounce(setFilter, DEBOUNCE_INTERVAL);
      });
    });
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
    setActiveKey: onEnterPress,
    getFilterPin: getFilterPin
  };

})();
