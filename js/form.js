'use strict';

window.form = (function () {
  var form = document.querySelector('.notice__form');
  var formContent = document.querySelector('.form__content');
  var myPin = document.querySelector('.pin__main');
  var address = formContent.querySelector('#address');
  var timeIn = formContent.querySelector('#timein');
  var timeOut = formContent.querySelector('#timeout');
  var typeHouse = formContent.querySelector('#type');
  var priceHouse = formContent.querySelector('#price');
  var roomNumber = formContent.querySelector('#room_number');
  var capacity = formContent.querySelector('#capacity');
  var addressX = '';
  var addressY = '';
  var regexp = /x: ([0-9]{3,4}), y: ([0-9]{3})$/i;
  var pano = window.data.mapPano;
  var regTime = window.data.form.regTime;
  var typeHouseArray = window.data.form.type;
  var priceHouseArray = window.data.form.price;
  var roomsCount = window.data.form.rooms;
  var placesCount = window.data.form.places;
  var debounceInterval = window.data.form.debounce;
  var formPhotoContainer = document.querySelector('.form__photo-container');
  var avatar = document.querySelector('.notice__preview img');
  var defaultAvatar = window.data.photo.avatar;
  var noticePhoto = document.querySelector('.notice__photo');
  var formPhoto = document.querySelector('.form__photo-container');
  var fileChooserAvatar = noticePhoto.querySelector('.upload input[type=file]');
  var noticePreviewAvatar = document.querySelectorAll('.notice__preview');
  var fileChooserPhotos = formPhoto.querySelector('.upload input[type=file]');
  var noticePreviewPhotos = document.querySelectorAll('.form__photo');
  var loadAvatar = new window.PhotoLoader(fileChooserAvatar, noticePreviewAvatar);
  var loadPhotos = new window.PhotoLoader(fileChooserPhotos, noticePreviewPhotos);

  var setAddress = function (x, y) {
    address.value = 'x: ' + x + ', y: ' + y;
  };

  var delChar = function (string) {
    return string.replace(/\D/gi, '');
  };

  var syncValues = function (element, value) {
    element.value = value;
  };

  var syncValueWithMin = function (element, value) {
    element.min = value;
    element.value = value;
  };

  var deleteFormPhotos = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      photos[i].parentNode.removeChild(photos[i]);
    }
    avatar.src = defaultAvatar;
  };

  var onLoad = function (message) {
    var formPhotos = formPhotoContainer.querySelectorAll('.form__photo img');
    window.util.createMessageElement(message);
    window.util.debounce(window.util.deleteMessageElement, debounceInterval);
    form.reset();
    deleteFormPhotos(formPhotos);
    loadPhotos.clearStep();
  };

  var onError = function (message) {
    window.util.createMessageElement(message);
    window.util.debounce(window.util.deleteMessageElement, debounceInterval);
  };

  window.synchronizeFields(timeIn, timeOut, regTime, regTime, syncValues);
  window.synchronizeFields(timeOut, timeIn, regTime, regTime, syncValues);
  window.synchronizeFields(typeHouse, priceHouse, typeHouseArray, priceHouseArray, syncValueWithMin);
  window.synchronizeFields(roomNumber, capacity, roomsCount, placesCount, syncValues);

  address.addEventListener('input', function (evt) {
    addressX = '';
    addressY = '';
    if (regexp.test(evt.target.value)) {
      var addressArray = address.value.split(', ');
      addressX = delChar(addressArray[0]);
      addressY = delChar(addressArray[1]);
    }

    var poolX = (addressX >= pano.startX && addressX <= pano.endX);
    var poolY = (addressY >= pano.startY && addressY <= pano.endY);

    if (addressX && addressY && poolX && poolY) {
      myPin.style.left = addressX - Math.round(myPin.clientWidth / 2) + 'px';
      myPin.style.top = addressY - myPin.clientHeight + 'px';
    }
  });

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), onLoad, onError);
  });

  fileChooserAvatar.addEventListener('change', function () {
    loadAvatar.addPhoto();
  });
  fileChooserPhotos.addEventListener('change', function () {
    loadPhotos.addPhoto();
  });

  return {
    setAddress: setAddress
  };
})();
