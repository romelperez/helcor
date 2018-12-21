import extend from 'extend';
import mergeCollection from '@helcor/merge-collections';

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
export default function moveInArray(providedList, providedOptions) {
  if (!Array.isArray(providedList)) {
    return [];
  }

  let list = [...providedList];

  const options = {
    id: '',
    key: 'id',
    to: void 0,
    positionKey: 'position',
    ...providedOptions
  };

  // Return non-mutated list.
  if (typeof options.to !== 'number') {
    return providedList;
  }

  const field = list.find(el => el[options.key] === options.id);
  const positionTo = options.to;
  const positionFrom = field && field[options.positionKey];

  // No field to move or the the new position is the same as the current one.
  if (!field || positionTo === positionFrom) {
    return providedList;
  }

  let items = list.filter(el => el[options.key] !== options.id);

  items = items.map(el => ({
    [options.key]: el[options.key],
    [options.positionKey]: el[options.positionKey]
  }));

  items = items.sort((a, b) => a[options.positionKey] - b[options.positionKey]);

  // There is an item in the position we want to move the item.
  const current = items.find(el => el[options.positionKey] === positionTo);

  if (current) {
    const toUp = positionFrom - positionTo > 0;

    // Update all the items between the "from" and "to" positions, the only
    // items affected.
    items = items.map(el => {
      const mapped = {};

      if (
        toUp &&
        el[options.positionKey] >= positionTo &&
        el[options.positionKey] < positionFrom
      ) {
        mapped[options.positionKey] = el[options.positionKey] + 1;
        return extend(el, mapped);
      } else if (
        !toUp &&
        el[options.positionKey] <= positionTo &&
        el[options.positionKey] > positionFrom
      ) {
        mapped[options.positionKey] = el[options.positionKey] - 1;
        return extend(el, mapped);
      }

      return el;
    });

    // Update the affected items.
    list = mergeCollection(list, items, { id: options.key });
  }

  const itemToMove = {
    [options.key]: options.id,
    [options.positionKey]: positionTo
  };

  // Update the item to move.
  list = mergeCollection(list, [itemToMove], { id: options.key });

  return list;
};
