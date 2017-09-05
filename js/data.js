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

  return {
    // get: getAds,
    mapPano: {
      startX: MAP_DND_X_START,
      endX: MAP_DND_X_END,
      startY: MAP_DND_Y_START,
      endY: MAP_DND_Y_END
    },
    form: {
      regTime: AD_CHECKIN_CHECKOUT,
      type: AD_TYPES,
      price: PRICE_HOUSE,
      rooms: ROOMS_COUNT,
      places: PLACES_COUNT
    }
  };

})();
