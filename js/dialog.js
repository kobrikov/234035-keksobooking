'use strict';

window.dialog = (function () {
  var offerDialog = document.querySelector('#offer-dialog');
  var dialogClose = offerDialog.querySelector('.dialog__close');
  var dialogTemplate = document.querySelector('#lodge-template').content;

  var renderDialog = function (dialogElement) {
    var newDialog = dialogTemplate.cloneNode(true);
    newDialog.querySelector('.lodge__title').textContent = dialogElement.offer.title;
    newDialog.querySelector('.lodge__address').textContent = dialogElement.offer.address;
    newDialog.querySelector('.lodge__price').textContent = dialogElement.offer.price + ' \u20BD/ночь';
    newDialog.querySelector('.lodge__type').textContent = dialogElement.offer.type;
    newDialog.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + dialogElement.offer.guests + ' гостей в ' + dialogElement.offer.rooms + ' комнатах';
    newDialog.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + dialogElement.offer.checkin + ', выезд до ' + dialogElement.offer.checkout;
    var featuresBox = newDialog.querySelector('.lodge__features');
    for (var i = 0; i < dialogElement.offer.features.length; i++) {
      var span = document.createElement('span');
      span.className = 'feature__image feature__image--' + dialogElement.offer.features[i];
      featuresBox.appendChild(span);
    }
    newDialog.querySelector('.lodge__description').textContent = dialogElement.offer.description;
    return newDialog;
  };

  var replaceDialog = function (adsElement) {
    var dialogTitle = offerDialog.querySelector('.dialog__title');
    var dialogImage = dialogTitle.querySelector('img');
    var oldDialog = offerDialog.querySelector('.dialog__panel');
    dialogImage.src = adsElement.author.avatar;
    offerDialog.replaceChild(renderDialog(adsElement), oldDialog);
    offerDialog.tabIndex = '0';
  };

  var closeDialog = function () {
    offerDialog.classList.add('hidden');
    window.pin.clearActivePin();
  };

  dialogClose.addEventListener('click', closeDialog);
  dialogClose.addEventListener('keydown', function (evt) {
    window.util.onEnterPress(evt, closeDialog);
  });
  offerDialog.addEventListener('keydown', function (evt) {
    window.util.onEscPress(evt, closeDialog);
  });

  return {
    renderDialog: replaceDialog
  };

})();
