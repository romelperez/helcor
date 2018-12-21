# `@helcor/merge-collections`

<a href="https://npmjs.org/package/@helcor/merge-collections">
  <img src="https://img.shields.io/npm/v/@helcor/merge-collections.svg" alt="version" />
</a>
<a href="https://npmjs.org/package/@helcor/merge-collections">
  <img src="https://img.shields.io/npm/dm/@helcor/merge-collections.svg" alt="downloads" />
</a>

Merge two arrays of objects by identifier.

## API

`mergeCollections(array1, array2, options)`

- `Array array1` - Source collection.
- `Array array2` - Collection to merge.
- `Object options` - Options. (Optional)
  - `string id` - The identifier. Default: `'id'`. (Optional)
  - `boolean shallow` - Shallow extend. Default: `false`. (Optional)
- Returns `Array` - A new collection with the merged items.

## Example

```js
import mergeCollections from '@helcor/merge-collections';

const col1 = [
  { myId: 'x1', v: 'a' },
  { myId: 'x2', v: 'b' },
  { myId: 'x3', v: 'c' }
];
const col2 = [
  { myId: 'x1', v: 'x' },
  { myId: 'x2', v: 'y' },
  { myId: 'x4', v: 'z' }
];
const received = mergeCollections(col1, col2, { id: 'myId' });
const expected = [
  { myId: 'x1', v: 'x' },
  { myId: 'x2', v: 'y' },
  { myId: 'x3', v: 'c' },
  { myId: 'x4', v: 'z' }
];
expect(received).toEqual(expected);
```
