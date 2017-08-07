var extend = require('extend');
var find = require('lodash/find');
var filter = require('lodash/filter');
var mergeCollection = require('../merge-collections');

/**
 * Move item by position in a list of positioned elements.
 * @param  {Array} list - The current list.
 * @param  {Object} [opts] - Options.
 * @param  {String} [opts.id] - Element id to move.
 * @param  {Number} [opts.to] - New position.
 * @param  {String} [opts.key] - List identifier key.
 * @param  {String} [opts.positionKey] - List position key.
 * @return {Array} - The updated list.
 */
module.exports = function moveInArray (_list, _opts) {

  // No valid array, return empty array.
  if (!_list) return [];

  var list = _list ? _list.map(function (el) { return el; }) : [];
  var opts = extend({
    id: '',
    key: 'id',
    to: void 0,
    positionKey: 'position',
  }, _opts);

  // Return no-mutated array.
  if (typeof opts.to !== 'number') return _list;

  var field = list.find(function (el) {
    return el[opts.key] === opts.id;
  });
  var positionTo = opts.to;
  var positionFrom = field && field[opts.positionKey];

  // No field to move or the the new position is the same as the current one.
  if (!field || positionTo === positionFrom) return _list;

  var items = filter(list, function (el) { return el[opts.key] !== opts.id; });
  items = items.map(function (el) {
    var mapped = {};
    mapped[opts.key] = el[opts.key];
    mapped[opts.positionKey] = el[opts.positionKey];
    return mapped;
  });
  items = items.sort(function (a, b) {
    return a[opts.positionKey] - b[opts.positionKey];
  });

  // There is an item in the position we want to move the item.
  var current = find(items, function (el) {
    return el[opts.positionKey] === positionTo;
  });

  if (current) {
    var toUp = positionFrom - positionTo > 0;

    // Update all the items between the from and to positions, the only items affected.
    items = items.map(el => {
      var mapped = {};
      if (toUp && el[opts.positionKey] >= positionTo && el[opts.positionKey] < positionFrom) {
        mapped[opts.positionKey] = el[opts.positionKey] + 1;
        return extend(el, mapped);
      }
      else if (!toUp && el[opts.positionKey] <= positionTo && el[opts.positionKey] > positionFrom) {
        mapped[opts.positionKey] = el[opts.positionKey] - 1;
        return extend(el, mapped);
      }
      return el;
    });

    // Update the affected items.
    list = mergeCollection(
      list,
      items,
      { id: opts.key }
    );
  }

  var itemToMove = {};
  itemToMove[opts.key] = opts.id;
  itemToMove[opts.positionKey] = positionTo;

  // Update the item to move.
  list = mergeCollection(
    list,
    [itemToMove],
    { id: opts.key }
  );

  return list;
};
