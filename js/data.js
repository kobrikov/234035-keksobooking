'use strict';

window.data = (function () {
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

  return {
    create: getAds
  };

})();
