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
  - `Boolean shallow` - Shallow extend. Default: `false`.
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

## throttle

Returns a function that will be called once in an interval of time right away when it is called
but will not be called more than once per interval no matter how many times you call it.

### API

`throttle(fn [, opts])`

- `Function fn` - Function to throttle.
- `Object opts` - Optional options.
  - `Number interval` - Optional time in milliseconds to regulate. Default `1000`.
  - `Function gate` - Optional function to validate the throttle. If it returns `true`, we prevent the throttle and function will be called as normal.
- Returns a function to use as a throttle.

### Example

A function that will feed you only once every 1 second. In total it will feed you
three times within 2 seconds (at 0s, 1s and 2s).

```js
const throttle = require('prhone-tools/throttle');

function feed () {
  // eat something healthy... really
}
const feedRegulated = throttle(feed);

feedRegulated();  // (CALLED) ok, eat an apple
feedRegulated();  // you have just eaten, I'll do it 1s later
feedRegulated();  // nope, you have to wait...

setTimeout(() => {
  // (CALLED) ok, 1s passed, eat an orange
  feedRegulated();  // again, you have just eaten, wait 1s more
  feedRegulated();  // wait wait, you'll get fat

  setTimeout(() => {
    // (CALLED) ok, another 1s passed, eat pizz... no no, eat a banana
  }, 1000);
}, 1000);
```

## serial-async

Execute serial asynchronous identified tasks based on promises.

### API

`Promise serialAsync(name, fn)`

- `String name` - Identifier of the task.
- `Function fn` - Task to execute in serial. It should return a promise to indicate
when it finishes to execute the next task in queue.
- Returns a promise when the task (resolved or rejected) is completed.

### Example

Suppose we have a task to get data from database or write some files but we
need to execute the task only once at the same time and we call the task
many times simultaneously.

It should execute in order so:

```js
const serialAsync = require('prhone-tools/serial-async');

function updateDatabase () {
  return serialAsync('taskName', function () {
    return somethingThatReturnsPromise().
      then(function () {
        // More async stuff...
      }).
      then(function () {
        // Still more async stuff...
      });
  });
}

updateDatabase(); // this one will be called right away
updateDatabase(); // this one will have to wait until current one ends
updateDatabase(); // this one is also in queue
```

## move-in-array

Move an item by position in a list of positionated items.

### API

`Array moveInArray(list, opts)`

- `Array list` - Current list of items.
- `Object opts` - Options.
  - `String id` - Element identifier to move.
  - `Number to` - Position to move element.
  - `String key` - Optional element identifier key in the list. Default `'id'`.
  - `String positionKey` - Optional element position identifier key in the list. Default `'position'`.
- Returns a new list with the updated items. If no update was made the same list is returned.

### Example

Move element by id `'i1'` from position `1` to `3` where the id key is `'_id'` and
the position key is `'pos'`.

```js
const moveInArray = require('prhone-tools/move-in-array');

const list = [
  { _id: 'i0', pos: 0 },
  { _id: 'i1', pos: 1 },
  { _id: 'i2', pos: 2 },
  { _id: 'i3', pos: 3 },
  { _id: 'i4', pos: 4 }
];
const actual = moveInArray(list, {
  id: 'i1',
  to: 3,
  key: '_id',
  positionKey: 'pos'
});
const expected = [
  { _id: 'i0', pos: 0 },
  { _id: 'i1', pos: 3 },  // moved down
  { _id: 'i2', pos: 1 },  // moved up
  { _id: 'i3', pos: 2 },  // moved up
  { _id: 'i4', pos: 4 }
];
expect(actual).to.eql(expected);
expect(actual).to.not.equal(list);
```
