var extend = require('extend');
var find = require('lodash/find');
var forEach = require('lodash/forEach');

module.exports = function (_arr1, _arr2, _opts) {

  var arr1 = _arr1 ? _arr1 : [];
  var arr2 = _arr2 ? _arr2 : [];
  var opts = extend(true, {
    id: 'id'
  }, _opts);

  var id = opts.id;
  var arr = [];
  var temp1, temp2;

  forEach(arr1, function (a1) {

    temp1 = find(arr, function (a) {
      return a[id] === a1[id];
    });
    if (temp1) {
      extend(true, temp1, a1);
    }

    temp2 = find(arr2, function (a2) {
      return a2[id] === a1[id];
    });
    if (temp1) {
      extend(temp1, temp2);
    }
    else if (temp2) {
      arr.push(extend(true, {}, a1, temp2));
    }
    else {
      arr.push(a1);
    }
  });

  forEach(arr2, function (a2) {
    temp1 = find(arr, function (a) {
      return a[id] === a2[id];
    });
    if (!temp1) {
      arr.push(a2);
    }
  });

  return arr;
};
