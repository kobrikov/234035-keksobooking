'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var AD_TYPES = ['flat', 'house', 'bungalo'];
var AD_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var COUNT_ADS = 8;
var sizePin = {};
var pinsMap = document.querySelector('.tokyo__pin-map');
var offerDialog = document.querySelector('#offer-dialog');
var dialogClose = offerDialog.querySelector('.dialog__close');
var dialogTemplate = document.querySelector('#lodge-template').content;
var formContent = document.querySelector('.form__content');
var timeIn = formContent.querySelector('#timein');
var timeOut = formContent.querySelector('#timeout');
var typeHouse = formContent.querySelector('#type');
var priceHouse = formContent.querySelector('#price');
var roomNumber = formContent.querySelector('#room_number');
var capacity = formContent.querySelector('#capacity');

var getRandomNum = function (num) {
  return Math.floor(Math.random() * num);
};

var getRandomFromRange = function (min, max) {
  return Math.round(min + Math.random() * (max - min));
};

var getRandomArray = function (array) {
  var newArray = [];
  var randomCount = getRandomNum(array.length);
  var value = null;
  while (randomCount > 0) {
    value = array[getRandomNum(array.length)];
    if (newArray.indexOf(value) !== -1) {
      continue;
    } else {
      newArray.push(value);
      randomCount--;
    }
  }
  return newArray;
};

var getNoRepeatValue = function (array) {
  var index = getRandomNum(array.length);
  var value = array[index];
  array.splice(index, 1);
  return value;
};

var getAds = function (avatars, titles, types, check, features, count) {
  var adsArray = [];
  var avatarsArray = avatars.slice();
  var titlesArray = titles.slice();
  for (var i = 0; i < count; i++) {
    var locX = getRandomFromRange(300, 900);
    var locY = getRandomFromRange(100, 500);

    adsArray[i] = {
      author: {
        avatar: getNoRepeatValue(avatarsArray)
      },

      offer: {
        title: getNoRepeatValue(titlesArray),
        address: locX + ', ' + locY,
        price: getRandomFromRange(1000, 1000000),
        type: types[getRandomNum(types.length)],
        rooms: getRandomFromRange(1, 5),
        guests: getRandomFromRange(1, 8),
        checkin: check[getRandomNum(check.length)],
        checkout: check[getRandomNum(check.length)],
        features: getRandomArray(features),
        description: '',
        photos: []
      },

      location: {
        x: locX,
        y: locY
      }
    };
  }
  return adsArray;
};

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

var renderDialog = function (dialogElement) {
  var newDialog = dialogTemplate.cloneNode(true);
  newDialog.querySelector('.lodge__title').textContent = dialogElement.offer.title;
  newDialog.querySelector('.lodge__address').textContent = dialogElement.offer.address;
  newDialog.querySelector('.lodge__price').textContent = dialogElement.offer.price + ' \u20BD/ночь';
  newDialog.querySelector('.lodge__type').textContent = dialogElement.offer.type;
  newDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dialogElement.offer.guests + ' гостей в ' + dialogElement.offer.rooms + ' комнатах';
  newDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dialogElement.offer.checkin + ', выезд до ' + dialogElement.offer.checkout;
  var featuresBox = newDialog.querySelector('.lodge__features');
  for (var i = 0; i < dialogElement.offer.features.length; i++) {
    var span = document.createElement('span');
    span.className = 'feature__image feature__image--' + dialogElement.offer.features[i];
    featuresBox.appendChild(span);
  }
  newDialog.querySelector('.lodge__description').textContent = dialogElement.offer.description;
  return newDialog;
};

var replaceDialog = function (adsElement) {
  var dialogTitle = offerDialog.querySelector('.dialog__title');
  var dialogImage = dialogTitle.querySelector('img');
  var oldDialog = offerDialog.querySelector('.dialog__panel');
  dialogImage.src = adsElement.author.avatar;
  offerDialog.replaceChild(renderDialog(adsElement), oldDialog);
  offerDialog.tabIndex = '0';
};

var clearActiveElement = function () {
  var clearActiveClass = pinsMap.querySelector('.pin--active');
  if (clearActiveClass) {
    clearActiveClass.classList.remove('pin--active');
  }
};

var activeDialog = function (element) {
  var parent = element.parentNode;
  for (var i = 0; i < parent.children.length; i++) {
    if (parent.children[i] === element) {
      replaceDialog(ads[i - 1]);
    }
  }
};

var setActiveElement = function (evt) {
  clearActiveElement();
  offerDialog.classList.remove('hidden');
  var currentElement = evt.currentTarget;
  currentElement.className += ' pin--active';
  activeDialog(currentElement);
};

var onEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    setActiveElement(evt);
  }
};

var onEnterClose = function (evt) {
  evt.stopPropagation();
  if (evt.keyCode === ENTER_KEYCODE) {
    closeDialog();
  }
};

var closeDialog = function () {
  offerDialog.classList.add('hidden');
  clearActiveElement();
};

var onEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeDialog();
  }
};

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

var ads = getAds(AD_AVATARS, AD_TITLES, AD_TYPES, AD_CHECKIN_CHECKOUT, AD_FEATURES, COUNT_ADS);
renderPin(ads);
replaceDialog(ads[0]);

var activePins = pinsMap.querySelectorAll('.pin');
for (var i = 0; i < activePins.length; i++) {
  activePins[i].addEventListener('click', setActiveElement);
  activePins[i].addEventListener('keydown', onEnterPress);
}

dialogClose.addEventListener('click', closeDialog);
dialogClose.addEventListener('keydown', onEnterClose);
offerDialog.addEventListener('keydown', onEscPress);

timeIn.addEventListener('change', autoTimeInOut);
timeOut.addEventListener('change', autoTimeInOut);
typeHouse.addEventListener('change', getPriceHouse);
roomNumber.addEventListener('change', getRoom);
