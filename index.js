var mergeCollections = require('./merge-collections');
var throttle = require('./throttle');
var concurrent = require('./concurrent');

module.exports = {
  version: '1.2.0',
  mergeCollections: mergeCollections,
  throttle: throttle,
  concurrent: concurrent,
};
