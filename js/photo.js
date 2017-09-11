'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var FILE_COUNT = 16;
  var noticePhoto = document.querySelector('.notice__photo');
  var fileChooserAvatar = noticePhoto.querySelector('.upload input[type=file]');
  var noticePreviewAvatar = document.querySelector('.notice__preview');
  var previewAvatar = noticePreviewAvatar.querySelector('.notice__preview img');
  var formPhoto = document.querySelector('.form__photo-container');
  var fileChooserPhotos = formPhoto.querySelector('.upload input[type=file]');
  var noticePreviewPhotos = document.querySelectorAll('.form__photo');
  var count = 0;
  var message = 'Вы можете выбрать только 16 файлов для загрузки';
  var debounceInterval = 3000;
  fileChooserAvatar.addEventListener('change', function () {
    var file = fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        previewAvatar.src = reader.result;
        previewAvatar.width = 70;
        previewAvatar.height = 70;
        noticePreviewAvatar.style.overflow = 'hidden';
      });
      reader.readAsDataURL(file);
    }
  });
  fileChooserPhotos.addEventListener('change', function () {
    var file = fileChooserPhotos.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches && (count < FILE_COUNT)) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        var image = document.createElement('img');
        noticePreviewPhotos[count].appendChild(image);
        count++;
        image.width = '70';
        image.height = '70';
        image.src = reader.result;
      });
      reader.readAsDataURL(file);
    } else {
      window.util.createMessageElement(message);
      window.util.debounce(window.util.deleteMessageElement, debounceInterval);
    }
  });
})();
