# prhone-tools

[![npm version](https://badge.fury.io/js/prhone-tools.svg)](https://badge.fury.io/js/prhone-tools)
[![Build Status](https://travis-ci.org/romelperez/prhone-tools.svg?branch=master)](https://travis-ci.org/romelperez/prhone-tools)
[![license](https://img.shields.io/github/license/romelperez/prhone-tools.svg?maxAge=2592000)](./LICENSE)
[![changelog](https://img.shields.io/badge/changelog-md-007ec6.svg)](./CHANGELOG.md)
[![prhone](https://img.shields.io/badge/prhone-project-1b38a9.svg)](http://romelperez.com)

Universal JavaScript Tools.

## Install

```bash
$ npm install --save prhone-tools
```

## merge-collections

Merge two array of objects deeply by identifier.

### API

`mergeCollections(array1, array2 [, options])`

- `Array array1` - Source collection.
- `Array array2` - Collection to merge.
- `Object options` - Optional options.
  - `String id` - The identifier. Default: `'id'`.
- Returns a new collection with the merged items.

### Example

```js
const mergeCollections = require('prhone-tools/merge-collections');

const col1 = [
  { myId: 'x1', v: 'a' },
  { myId: 'x2', v: 'b' },
  { myId: 'x3', v: 'c' }
];

const col2 = [
  { myId: 'x1', v: 'x' },
  { myId: 'x2', v: 'y' },
  { myId: 'x4', v: 'd' }
];

const actual = mergeCollections(col1, col2, { id: 'myId' });

const expected = [
  { myId: 'x1', v: 'x' },
  { myId: 'x2', v: 'y' },
  { myId: 'x3', v: 'c' },
  { myId: 'x4', v: 'd' }
];

expect(actual).to.eql(expected);
```
