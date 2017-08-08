var mergeCollections = require('./merge-collections');
var throttle = require('./throttle');
var serialAsync = require('./serial-async');
var moveInArray = require('./move-in-array');

module.exports = {
  version: '1.5.3',
  mergeCollections: mergeCollections,
  throttle: throttle,
  serialAsync: serialAsync,
  moveInArray: moveInArray,
};
