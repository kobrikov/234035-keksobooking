'use strict';

window.PhotoLoader = (function () {
  var filesTypes = window.data.photo.types;
  var filesCount = window.data.photo.count;
  var message = 'Вы можете выбрать только 16 файлов для загрузки';
  var debounceInterval = window.data.form.debounce;

  var PhotoLoader = function (chooser, preview) {
    this.chooser = chooser;
    this.preview = preview;
    this.step = 0;
  };

  PhotoLoader.prototype = {
    clearStep: function () {
      this.step = 0;
    },
    setReader: function (reader) {
      reader.addEventListener('load', function () {
        if (!this.preview[this.step].querySelector('img')) {
          var image = document.createElement('img');
          this.preview[this.step].appendChild(image);
        }
        var previewImage = this.preview[this.step].querySelector('img');
        previewImage.src = reader.result;
        previewImage.style.width = 100 + '%';
        previewImage.style.height = 'auto';
        this.preview[this.step].style.overflow = 'hidden';
        this.step++;
      }.bind(this));
    },
    addPhoto: function () {
      var files = this.chooser.files;
      if (!this.chooser.multiple) {
        this.step = 0;
      }
      if (files.length <= filesCount - this.step) {
        [].forEach.call(files, function (el) {
          var fileName = el.name.toLowerCase();
          var isImage = filesTypes.some(function (it) {
            return fileName.endsWith(it);
          });
          if (isImage) {
            var reader = new FileReader();
            this.setReader(reader);
            reader.readAsDataURL(el);
          }
        }.bind(this));
      } else {
        this.chooser.value = '';
        window.util.createMessageElement(message);
        window.util.debounce(window.util.deleteMessageElement, debounceInterval);
      }
    }
  };
  return PhotoLoader;
})();
