'use strict';

window.showDialog = function (array) {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var activePins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
  array.forEach(function (element, i) {
    activePins[i].addEventListener('click', function (evt) {
      window.pin.setActiveClick(evt);
      window.dialog.renderDialog(element);
    });
    activePins[i].addEventListener('keydown', function (evt) {
      window.util.onEnterPress(evt, window.pin.setActiveClick);
      window.dialog.renderDialog(element);
    });
  });
};
