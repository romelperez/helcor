# `@helcor/move-in-array`

Move an item by position in a list of positionated items.

## API

`Array moveInArray(list, opts)`

- `Array list` - Current list of items.
- `Object opts` - Options.
  - `string id` - Element identifier to move.
  - `number to` - Position to move element.
  - `string key` - Optional element identifier key in the list. Default `'id'`.
  - `string positionKey` - Optional element position identifier key in the list.
  Default `'position'`.
- Returns `Array` - A new list with the updated items. If no update was made the
same list is returned.

## Example

Move element by id `'i1'` from position `1` to `3` where the id key is `'_id'` and
the position key is `'pos'`.

```js
const moveInArray = require('@helcor/move-in-array');

const list = [
  { _id: 'i0', pos: 0 },
  { _id: 'i1', pos: 1 },
  { _id: 'i2', pos: 2 },
  { _id: 'i3', pos: 3 },
  { _id: 'i4', pos: 4 }
];
const received = moveInArray(list, {
  id: 'i1',
  to: 3,
  key: '_id',
  positionKey: 'pos'
});
const expected = [
  { _id: 'i0', pos: 0 },
  { _id: 'i1', pos: 3 }, // moved down
  { _id: 'i2', pos: 1 }, // moved up
  { _id: 'i3', pos: 2 }, // moved up
  { _id: 'i4', pos: 4 }
];
expect(received).toEqual(expected);
expect(received).not.toBe(list);
```
