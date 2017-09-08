'use strict';

window.debounce = function (fun, interval) {
  var lastTimeout;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(fun, interval);
};
