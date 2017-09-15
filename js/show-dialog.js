'use strict';

window.showDialog = (function () {
  return function (array) {
    var pinsMap = document.querySelector('.tokyo__pin-map');
    var activePins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    array.forEach(function (element, i) {
      activePins[i].addEventListener('click', function (evt) {
        window.pin.setActiveClick(evt, element);
        window.dialog.render(element);
      });
      activePins[i].addEventListener('keydown', function (evt) {
        if (window.util.isEnterPress(evt)) {
          window.pin.setActiveClick(evt);
          window.dialog.render(element);
        }
      });
    });
  };
})();
