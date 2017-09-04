'use strict';

window.synchronizeFields = function (field1, field2, data1, data2, cb) {
  field1.addEventListener('change', function () {
    var index = data1.indexOf(field1.value);
    cb(field2, data2[index]);
  });
};
