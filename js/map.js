'use strict';

(function () {

  var MAP_DND_X1 = 300;
  var MAP_DND_X2 = 1200;
  var MAP_DND_Y1 = 100;
  var MAP_DND_Y2 = 500;
  var pinsMap = document.querySelector('.tokyo__pin-map');
  var myPin = pinsMap.querySelector('.pin__main');

  var widthP = Math.round(myPin.clientWidth / 2);
  var heightP = myPin.clientHeight;

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

  myPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var loc = {
      x: myPin.offsetLeft + widthP,
      y: myPin.offsetTop + heightP
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

      if ((newX >= MAP_DND_X1) && (newX <= MAP_DND_X2)) {
        loc.x = newX;
        myPin.style.left = (myPin.offsetLeft - shift.x) + 'px';
      }

      if ((newY >= MAP_DND_Y1) && (newY <= MAP_DND_Y2)) {
        loc.y = newY;
        myPin.style.top = (myPin.offsetTop - shift.y) + 'px';
      }
      window.form.sendAddress(loc.x, loc.y);
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
