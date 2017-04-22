var extend = require('extend');

module.exports = function (fn, _opts) {

  if (typeof fn !== 'function') {
    throw new Error('Expected function as first parameter');
  }

  var opts = extend({
    interval: 1000,
    // gate: null,
  }, _opts);

  var available = true;
  var queue = false;

  return function () {

    var args = arguments;
    var context = this;

    var call = function () {

      available = false;
      fn.apply(context, args);

      setTimeout(function () {
        if (queue) {
          queue = false;
          call();
        }
        else {
          available = true;
        }
      }, opts.interval);
    };

    available = available || opts.gate && opts.gate();

    if (available) {
      call();
    }
    else {
      queue = true;
    }
  };
};
