'use strict';

(function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPES = ['flat', 'house', 'bungalo'];
  var AD_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var COUNT_ADS = 8;

  var ads = window.data.create(AD_AVATARS, AD_TITLES, AD_TYPES, AD_CHECKIN_CHECKOUT, AD_FEATURES, COUNT_ADS);
  window.pin.renderPin(ads);
  window.dialog.renderDialog(ads[0]);

  var activePins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
  ads.forEach(function (element, i) {
    activePins[i].addEventListener('click', function (evt) {
      window.pin.setActiveClick(evt);
      window.dialog.renderDialog(element);
    });
    activePins[i].addEventListener('keydown', function (evt) {
      window.pin.setActiveKey(evt);
      window.dialog.renderDialog(element);
    });
  });

})();
