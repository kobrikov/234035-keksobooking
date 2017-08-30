'use strict';

(function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');

  var advertisements = window.data.get();
  window.pin.renderPin(advertisements);
  window.dialog.renderDialog(advertisements[0]);

  var activePins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
  advertisements.forEach(function (element, i) {
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
