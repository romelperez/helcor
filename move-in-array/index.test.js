const moveInArray = require('./');

describe('move-in-array', function () {

  it('Invalid list return empty list', function () {
    const actual = moveInArray();
    expect(actual).to.eql([]);
  });

  it('Invalid props do nothing', function () {
    const list = [{ id: 'i0', position: 0 }];
    const actual = moveInArray(list);
    expect(actual).to.eql(list);
    expect(actual).to.equal(list);
  });

  it('Move item up one position', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i2', to: 1 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 2 },
      { id: 'i2', position: 1 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item down one position', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i2', to: 3 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 3 },
      { id: 'i3', position: 2 },
      { id: 'i4', position: 4 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item up many positions', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i3', to: 1 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 2 },
      { id: 'i2', position: 3 },
      { id: 'i3', position: 1 },
      { id: 'i4', position: 4 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item down many positions', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i1', to: 3 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 3 },
      { id: 'i2', position: 1 },
      { id: 'i3', position: 2 },
      { id: 'i4', position: 4 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item to the same positions does nothing', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i1', to: 1 });
    expect(actual).to.eql(list);
    expect(actual).to.equal(list);
  });

  it('Move item to not occupied position', function () {
    const list = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 4 }
    ];
    const actual = moveInArray(list, { id: 'i4', to: 5 });
    const expected = [
      { id: 'i0', position: 0 },
      { id: 'i1', position: 1 },
      { id: 'i2', position: 2 },
      { id: 'i3', position: 3 },
      { id: 'i4', position: 5 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item with different key', function () {
    const list = [
      { _id: 'i0', position: 0 },
      { _id: 'i1', position: 1 },
      { _id: 'i2', position: 2 }
    ];
    const actual = moveInArray(list, { id: 'i0', to: 2, key: '_id' });
    const expected = [
      { _id: 'i0', position: 2 },
      { _id: 'i1', position: 0 },
      { _id: 'i2', position: 1 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

  it('Move item with a different position key', function () {
    const list = [
      { _id: 'i0', pos: 0 },
      { _id: 'i1', pos: 1 },
      { _id: 'i2', pos: 2 }
    ];
    const actual = moveInArray(list, { id: 'i0', to: 2, key: '_id', positionKey: 'pos' });
    const expected = [
      { _id: 'i0', pos: 2 },
      { _id: 'i1', pos: 0 },
      { _id: 'i2', pos: 1 }
    ];
    expect(actual).to.eql(expected);
    expect(actual).to.not.equal(list);
  });

});
