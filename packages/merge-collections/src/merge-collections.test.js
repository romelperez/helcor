/* eslint-env jest */

import merge from './merge-collections';

describe('merge-collections', () => {
  test('Should be a function', () => {
    expect(merge).toBeFunction();
  });

  test('Should not return empty array on no parameters', () => {
    const received = merge();
    expect(received).toEqual([]);
  });

  test('Should return empty array on empty arrays', () => {
    const received = merge([], []);
    expect(received).toEqual([]);
  });

  test('Should merge unique items', () => {
    const col1 = [{ id: 1, v: 'a' }];
    const col2 = [{ id: 2, v: 'b' }];
    const received = merge(col1, col2);
    const expected = [{ id: 1, v: 'a' }, { id: 2, v: 'b' }];
    expect(received).toEqual(expected);
  });

  test('Should merge shared items', () => {
    const col1 = [{ id: 1, v: 'a' }, { id: 2, v: 'b' }, { id: 3, v: 'c' }];
    const col2 = [{ id: 1, v: 'x' }, { id: 2, v: 'y' }, { id: 4, v: 'd' }];
    const received = merge(col1, col2);
    const expected = [
      { id: 1, v: 'x' },
      { id: 2, v: 'y' },
      { id: 3, v: 'c' },
      { id: 4, v: 'd' }
    ];
    expect(received).toEqual(expected);
  });

  test('Should merge on different identifier', () => {
    const col1 = [
      { itemId: 'x1', v: 'a' },
      { itemId: 'x2', v: 'b' },
      { itemId: 'x3', v: 'c' }
    ];
    const col2 = [
      { itemId: 'x1', v: 'x' },
      { itemId: 'x2', v: 'y' },
      { itemId: 'x4', v: 'd' }
    ];
    const received = merge(col1, col2, { id: 'itemId' });
    const expected = [
      { itemId: 'x1', v: 'x' },
      { itemId: 'x2', v: 'y' },
      { itemId: 'x3', v: 'c' },
      { itemId: 'x4', v: 'd' }
    ];
    expect(received).toEqual(expected);
  });

  test('Should merge shared deep items', () => {
    const col1 = [
      { id: 1, v: { p: 1, q: 2 } },
      { id: 2, v: { p: 3, q: 4 } },
      { id: 3, v: { p: 5, q: 6 } }
    ];
    const col2 = [{ id: 2, v: { p: 7 } }, { id: 3, v: { q: 10 } }];
    const received = merge(col1, col2);
    const expected = [
      { id: 1, v: { p: 1, q: 2 } },
      { id: 2, v: { p: 7, q: 4 } },
      { id: 3, v: { p: 5, q: 10 } }
    ];
    expect(received).toEqual(expected);
  });

  test('Should merge repeated items', () => {
    const col1 = [
      { id: 1, v: 'a' },
      { id: 1, v: 'm' },
      { id: 2, v: 'b' },
      { id: 2, v: 'n' }
    ];
    const col2 = [{ id: 2, v: 'x' }, { id: 3, v: 'y' }];
    const received = merge(col1, col2);
    const expected = [{ id: 1, v: 'm' }, { id: 2, v: 'x' }, { id: 3, v: 'y' }];
    expect(received).toEqual(expected);
  });

  test('Should shallow merge (deep objects/arrays are referenced)', () => {
    const col1 = [
      { id: 1, p: 10, v: { a: 1, b: 2 }, arr: [1, 2, 3] },
      { id: 2, p: 10, v: { a: 1, b: 2 }, arr: [9, 8, 7] }
    ];
    const col2 = [
      { id: 1, p: 10, v: { a: 7 }, arr: [7, 4] },
      { id: 2, p: 10, v: { b: 4 }, arr: [4, 9] }
    ];
    const received = merge(col1, col2, { shallow: true });
    const expected = [
      { id: 1, p: 10, v: { a: 7 }, arr: [7, 4] },
      { id: 2, p: 10, v: { b: 4 }, arr: [4, 9] }
    ];
    expect(received).toEqual(expected);
  });
});
