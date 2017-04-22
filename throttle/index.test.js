const sinon = require('sinon');
const throttle = require('./index');

describe('throttle', function () {
  'use strict';

  it('Module is a function', function () {
    expect(throttle).to.be.a.function;
  });

  it('Throws error if first parameter is not a function', function () {
    expect(function () { throttle(); }).to.throws();
  });

  it('Returns a function when called properly', function () {
    const actual = throttle(function () {});
    expect(actual).to.be.a.function;
  });

  it('By default, a function is called once within 1 second', function (done) {
    this.timeout(2500);
    const fn = sinon.spy();
    const interval = 1000;
    const thr = throttle(fn);

    // 0s
    expect(fn.callCount).to.equal(0);
    thr();
    thr();
    thr();
    expect(fn.callCount).to.equal(1);

    setTimeout(() => {
      // 1s
      expect(fn.callCount).to.equal(2);
      thr();
      thr();
      thr();
      expect(fn.callCount).to.equal(2);

      setTimeout(() => {
        // 2s
        expect(fn.callCount).to.equal(3);
        thr();
        thr();
        thr();
        expect(fn.callCount).to.equal(3);

        done();
      }, interval + 50);
    }, interval + 50);
  });

  it('A function is called once within 100 ms provided', function (done) {
    this.timeout(1000);
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });

    // 0ms
    expect(fn.callCount).to.equal(0);
    thr();
    thr();
    thr();
    expect(fn.callCount).to.equal(1);

    setTimeout(() => {
      // 100ms
      expect(fn.callCount).to.equal(2);
      thr();
      thr();
      thr();
      expect(fn.callCount).to.equal(2);

      setTimeout(() => {
        // 200ms
        expect(fn.callCount).to.equal(3);
        thr();
        thr();
        thr();
        expect(fn.callCount).to.equal(3);

        done();
      }, interval + 10);
    }, interval + 10);
  });

  it('When a gate is provided, it should prevent the throttle if returns true', function (done) {
    this.timeout(1000);
    let pass = false;
    const fn = sinon.spy();
    const interval = 100;
    const gate = function () {
      return pass;
    };
    const thr = throttle(fn, { interval, gate });

    // 0ms
    expect(fn.callCount).to.equal(0);

    pass = true;
    thr();
    expect(fn.callCount).to.equal(1);
    thr();
    expect(fn.callCount).to.equal(2);
    thr();
    expect(fn.callCount).to.equal(3);

    pass = false;
    thr();
    thr();
    thr();
    expect(fn.callCount).to.equal(3);

    setTimeout(() => {
      // 100ms
      expect(fn.callCount).to.equal(4);

      pass = true;
      thr();
      expect(fn.callCount).to.equal(5);
      thr();
      expect(fn.callCount).to.equal(6);
      thr();
      expect(fn.callCount).to.equal(7);

      done();
    }, interval + 10);
  });

  it('Arguments passed to function should be passed to throttle', function () {
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });

    thr(10, true, {});
    expect(fn.calledWith(10, true, {})).to.be.true;
  });

  it('Context in function should be passed to throttle', function () {
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });
    const context = [1, 2, 3];

    thr.call(context);
    expect(fn.calledOn(context)).to.be.true;
  });

});
