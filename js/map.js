'use strict';

(function () {
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var myPin = pinsMap.querySelector('.pin__main');
  var pano = window.data.mapPano;
  var halfWidthtPin = Math.round(myPin.clientWidth / 2);
  var heightPin = myPin.clientHeight;
  var debounceInterval = window.data.form.debounce;

  var onLoad = function (data) {
    var defaultData = window.util.getRandomArray(data);
    window.pin.renderPin(defaultData);
    window.dialog.renderDialog(defaultData[0]);
    window.showDialog(defaultData);
    window.pin.getFilterPin(data);
  };

  var onError = function (message) {
    window.util.createMessageElement(message);
    window.util.debounce(window.util.deleteMessageElement, debounceInterval);
  };

  window.backend.load(onLoad, onError);
  myPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var loc = {
      x: myPin.offsetLeft + halfWidthtPin,
      y: myPin.offsetTop + heightPin
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      var newX = loc.x - shift.x;
      var newY = loc.y - shift.y;

      if ((newX >= pano.startX) && (newX <= pano.endX)) {
        loc.x = newX;
        myPin.style.left = (myPin.offsetLeft - shift.x) + 'px';
      }

      if ((newY >= pano.startY) && (newY <= pano.endY)) {
        loc.y = newY;
        myPin.style.top = (myPin.offsetTop - shift.y) + 'px';
      }
      window.form.setAddress(loc.x, loc.y);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
