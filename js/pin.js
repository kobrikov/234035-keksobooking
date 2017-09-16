'use strict';

window.pin = (function () {
  var sizePin = {};
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var offerDialog = document.querySelector('#offer-dialog');
  var filters = document.querySelectorAll('.tokyo__filter');
  var housingTypeFilter = document.querySelector('#housing_type');
  var housingPriceFilter = document.querySelector('#housing_price');
  var housingRoomNumber = document.querySelector('#housing_room-number');
  var housingGuestsNumber = document.querySelector('#housing_guests-number');
  var feature = document.querySelectorAll('input[name="feature"]');
  var debounceInterval = window.data.pin.debounce;
  var priceLow = window.data.pin.priceLow;
  var priceHigh = window.data.pin.priceHigh;
  var loadArray;

  var getSizePin = function (element) {
    var parameter = {};
    pinsMap.appendChild(element);
    parameter.halfWidth = element.clientWidth / 2;
    parameter.height = element.clientHeight;
    pinsMap.removeChild(element);
    return parameter;
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
      pins[i].removeEventListener('click', window.showDialog.click);
      pins[i].removeEventListener('keydown', window.showDialog.press);
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
        return price >= priceLow && price <= priceHigh;
      case 'low':
        return price < priceLow;
      case 'high':
        return price > priceHigh;
    }
    return false;
  };

  var getClickElementFilter = function (features) {
    var count = 0;
    var featureChecked = document.querySelectorAll('input[name="feature"]:checked');
    for (var i = 0; i < featureChecked.length; i++) {
      features.forEach(function (el) {
        if (featureChecked[i].value === el) {
          count++;
        }
      });
    }
    return count === featureChecked.length;
  };

  var setFilter = function () {
    var filteredPins = loadArray.filter(function (el) {
      return getElementFilter(housingTypeFilter.value, el.offer.type);
    });
    filteredPins = filteredPins.filter(function (el) {
      return getRangeElementFilter(housingPriceFilter.value, el.offer.price);
    });
    filteredPins = filteredPins.filter(function (el) {
      return getElementFilter(housingRoomNumber.value, el.offer.rooms);
    });
    filteredPins = filteredPins.filter(function (el) {
      return getElementFilter(housingGuestsNumber.value, el.offer.guests);
    });
    filteredPins = filteredPins.filter(function (el) {
      return getClickElementFilter(el.offer.features);
    });
    clearMap();
    if (filteredPins.length) {
      window.pin.render(filteredPins);
      window.dialog.render(filteredPins[0]);
      window.showDialog.open(filteredPins);
      offerDialog.classList.remove('hidden');
    }
  };

  var getFilterPin = function (array) {
    loadArray = array;
    feature.forEach(function (element) {
      element.addEventListener('change', function () {
        window.util.debounce(setFilter, debounceInterval);
      });
    });
    filters.forEach(function (element) {
      element.addEventListener('change', function () {
        window.util.debounce(setFilter, debounceInterval);
      });
    });
  };

  var renderPin = function (pins) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < pins.length; i++) {
      fragment.appendChild(createPin(pins[i]));
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

  return {
    render: renderPin,
    clearActivePin: clearActiveElement,
    setActiveClick: setActiveElement,
    getFilterPin: getFilterPin
  };

})();
