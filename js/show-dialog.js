'use strict';

window.showDialog = (function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var activePins;
  var data;

  var onClickPin = function (evt) {
    for (var i = 0; i < activePins.length; i++) {
      if (activePins[i] === evt.currentTarget) {
        break;
      }
    }
    window.pin.setActiveClick(evt);
    window.dialog.render(data[i]);
  };
  var onPressPin = function (evt) {
    if (window.util.isEnterPress(evt)) {
      onClickPin(evt);
    }
  };
  var showDialog = function (array) {
    data = array;
    activePins = pinsMap.querySelectorAll('.pin:not(.pin__main)');
    [].forEach.call(activePins, function (element) {
      element.addEventListener('click', onClickPin);
      element.addEventListener('keydown', onPressPin);
    });
  };
  return {
    open: showDialog,
    click: onClickPin,
    press: onPressPin
  };
})();
