/* eslint-env jest */

import moveInArray from './move-in-array';

describe('move-in-array', () => {
  test('Should return empty array with no parameters', () => {
    const received = moveInArray();
    expect(received).toEqual([]);
  });

  test('Should return provided list with invalid props', () => {
    const list = [{ id: 'i0', position: 0 }];
    const received = moveInArray(list);
    expect(received).toEqual(list);
    expect(received).toBe(list);
  });

  test('Should move item up one position', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i2', to: 1 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 2 },
      { id: 'i2', position: 1 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should move item down one position', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i2', to: 3 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 3 },
      { id: 'i3', position: 2 },
      { id: 'i4', position: 4 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should move item up many positions', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i3', to: 1 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 2 },
      { id: 'i2', position: 3 },
      { id: 'i3', position: 1 },
      { id: 'i4', position: 4 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should move item down many positions', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i1', to: 3 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 3 },
      { id: 'i2', position: 1 },
      { id: 'i3', position: 2 },
      { id: 'i4', position: 4 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should do nothing when moving item to the same position', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i1', to: 1 });
    expect(received).toEqual(list);
    expect(received).toBe(list);
  });

  test('Should move item to not occupied position', () => {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 },
    ];
    const received = moveInArray(list, { id: 'i4', to: 5 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 5 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should move item with different key when defined', () => {
    const list = [
      { _id: 'i0', position: 0 },
      { _id: 'i1', position: 1 },
      { _id: 'i2', position: 2 },
    ];
    const received = moveInArray(list, { id: 'i0', to: 2, key: '_id' });
    const expected = [
      { _id: 'i0', position: 2 },
      { _id: 'i1', position: 0 },
      { _id: 'i2', position: 1 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });

  test('Should move item with a different position key', () => {
    const list = [
      { _id: 'i0', pos: 0 },
      { _id: 'i1', pos: 1 },
      { _id: 'i2', pos: 2 },
    ];
    const received = moveInArray(list, {
      id: 'i0',
      to: 2,
      key: '_id',
      positionKey: 'pos',
    });
    const expected = [
      { _id: 'i0', pos: 2 },
      { _id: 'i1', pos: 0 },
      { _id: 'i2', pos: 1 },
    ];
    expect(received).toEqual(expected);
    expect(received).not.toBe(list);
  });
});
