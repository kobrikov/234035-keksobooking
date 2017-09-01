'use strict';

window.data = (function () {
  var AD_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  var AD_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var AD_TYPES = ['flat', 'house', 'bungalo'];
  var AD_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
  var AD_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var COUNT_ADS = 8;
  var MAP_DND_X_START = 300;
  var MAP_DND_X_END = 900;
  var MAP_DND_Y_START = 100;
  var MAP_DND_Y_END = 500;

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

  var getRandomNum = function (num) {
    return Math.floor(Math.random() * num);
  };

  var getRandomFromRange = function (min, max) {
    return Math.round(min + Math.random() * (max - min));
  };

  var getAds = function () {
    var adsArray = [];
    var avatarsArray = AD_AVATARS.slice();
    var titlesArray = AD_TITLES.slice();
    for (var i = 0; i < COUNT_ADS; i++) {
      var locX = getRandomFromRange(MAP_DND_X_START, MAP_DND_X_END);
      var locY = getRandomFromRange(MAP_DND_Y_START, MAP_DND_Y_END);

      adsArray[i] = {
        author: {
          avatar: getNoRepeatValue(avatarsArray)
        },

        offer: {
          title: getNoRepeatValue(titlesArray),
          address: locX + ', ' + locY,
          price: getRandomFromRange(1000, 1000000),
          type: AD_TYPES[getRandomNum(AD_TYPES.length)],
          rooms: getRandomFromRange(1, 5),
          guests: getRandomFromRange(1, 8),
          checkin: AD_CHECKIN_CHECKOUT[getRandomNum(AD_CHECKIN_CHECKOUT.length)],
          checkout: AD_CHECKIN_CHECKOUT[getRandomNum(AD_CHECKIN_CHECKOUT.length)],
          features: getRandomArray(AD_FEATURES),
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

  return {
    get: getAds,
    mapPano: {
      startX: MAP_DND_X_START,
      endX: MAP_DND_X_END,
      startY: MAP_DND_Y_START,
      endY: MAP_DND_Y_END
    }
  };

})();
