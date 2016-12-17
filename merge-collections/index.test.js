const merge = require('./index');

describe('merge-collections', function () {

  it('No parameters should return empty array', function () {
    const actual = merge();
    expect(actual).to.eql([]);
  });

  it('Empty arrays should return empty array', function () {
    const actual = merge([], []);
    expect(actual).to.eql([]);
  });

  it('Merge unique items', function () {
    const col1 = [{ id: 1, v: 'a' }];
    const col2 = [{ id: 2, v: 'b' }];
    const actual = merge(col1, col2);
    const expected = [
      { id: 1, v: 'a' },
      { id: 2, v: 'b' }
    ];
    expect(actual).to.eql(expected);
  });

  it('Shared items', function () {
    const col1 = [
      { id: 1, v: 'a' },
      { id: 2, v: 'b' },
      { id: 3, v: 'c' }
    ];
    const col2 = [
      { id: 1, v: 'x' },
      { id: 2, v: 'y' },
      { id: 4, v: 'd' }
    ];
    const actual = merge(col1, col2);
    const expected = [
      { id: 1, v: 'x' },
      { id: 2, v: 'y' },
      { id: 3, v: 'c' },
      { id: 4, v: 'd' }
    ];
    expect(actual).to.eql(expected);
  });

  it('Different identifier', function () {
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
    const actual = merge(col1, col2, { id: 'itemId' });
    const expected = [
      { itemId: 'x1', v: 'x' },
      { itemId: 'x2', v: 'y' },
      { itemId: 'x3', v: 'c' },
      { itemId: 'x4', v: 'd' }
    ];
    expect(actual).to.eql(expected);
  });

  it('Shared deep items', function () {
    const col1 = [
      { id: 1, v: {p: 1, q: 2} },
      { id: 2, v: {p: 3, q: 4} },
      { id: 3, v: {p: 5, q: 6} }
    ];
    const col2 = [
      { id: 2, v: {p: 7} },
      { id: 3, v: {q: 10} }
    ];
    const actual = merge(col1, col2);
    const expected = [
      { id: 1, v: {p: 1, q: 2} },
      { id: 2, v: {p: 7, q: 4} },
      { id: 3, v: {p: 5, q: 10} }
    ];
    expect(actual).to.eql(expected);
  });

  it('Repeated items', function () {
    const col1 = [
      { id: 1, v: 'a' },
      { id: 1, v: 'm' },
      { id: 2, v: 'b' },
      { id: 2, v: 'n' },
    ];
    const col2 = [
      { id: 2, v: 'x' },
      { id: 3, v: 'y' }
    ];
    const actual = merge(col1, col2);
    const expected = [
      { id: 1, v: 'm' },
      { id: 2, v: 'x' },
      { id: 3, v: 'y' }
    ];
    expect(actual).to.eql(expected);
  });
});
