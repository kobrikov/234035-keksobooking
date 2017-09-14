'use strict';

window.data = (function () {
  var AD_TYPES = ['flat', 'house', 'bungalo', 'palace'];
  var AD_CHECKIN_CHECKOUT = ['12:00', '13:00', '14:00'];
  var MAP_DND_X_START = 300;
  var MAP_DND_X_END = 1200;
  var MAP_DND_Y_START = 100;
  var MAP_DND_Y_END = 600;
  var PRICE_HOUSE = [1000, 0, 5000, 10000];
  var ROOMS_COUNT = ['1', '2', '3', '100'];
  var PLACES_COUNT = [1, 2, 3, 0];
  var DEBOUNCE_INTERVAL_LOAD = 3000;
  var DEBOUNCE_INTERVAL_PIN = 500;
  var PRICE_LOW = 10000;
  var PRICE_HIGH = 50000;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_COUNT = 16;
  var AVATAR = 'img/muffin.png';
  var DIALOG_PHOTO_WIDTH = 52;
  var DIALOG_PHOTO_HEIGHT = 42;
  var DEFAULT_COUNT_PINS = 3;

  return {
    pin: {
      priceLow: PRICE_LOW,
      priceHigh: PRICE_HIGH,
      debounce: DEBOUNCE_INTERVAL_PIN,
      randomCount: DEFAULT_COUNT_PINS
    },
    mapPano: {
      startX: MAP_DND_X_START,
      endX: MAP_DND_X_END,
      startY: MAP_DND_Y_START,
      endY: MAP_DND_Y_END
    },
    dialog: {
      photoWidth: DIALOG_PHOTO_WIDTH,
      photoHeight: DIALOG_PHOTO_HEIGHT
    },
    form: {
      regTime: AD_CHECKIN_CHECKOUT,
      type: AD_TYPES,
      price: PRICE_HOUSE,
      rooms: ROOMS_COUNT,
      places: PLACES_COUNT,
      debounce: DEBOUNCE_INTERVAL_LOAD
    },
    photo: {
      types: FILE_TYPES,
      count: FILE_COUNT,
      avatar: AVATAR
    }
  };

})();
