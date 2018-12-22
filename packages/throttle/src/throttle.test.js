/* eslint-env jest */
/* global setTimeout */

import sinon from 'sinon';
import throttle from './throttle';

describe('throttle', () => {
  test('Should be a function', () => {
    expect(throttle).toBeFunction();
  });

  test('Should throw error if first parameter is not a function', () => {
    expect(() => throttle()).toThrow();
  });

  test('Should returns a function when called properly', () => {
    const actual = throttle(() => {});
    expect(actual).toBeFunction();
  });

  test('Should call function once within 1 second by default', done => {
    const fn = sinon.spy();
    const interval = 1000;
    const thr = throttle(fn);

    // 0s
    expect(fn.callCount).toBe(0);
    thr();
    thr();
    thr();
    expect(fn.callCount).toBe(1);

    setTimeout(() => {
      // 1s
      expect(fn.callCount).toBe(2);
      thr();
      thr();
      thr();
      expect(fn.callCount).toBe(2);

      setTimeout(() => {
        // 2s
        expect(fn.callCount).toBe(3);
        thr();
        thr();
        thr();
        expect(fn.callCount).toBe(3);

        done();
      }, interval + 50);
    }, interval + 50);
  });

  test('Should call function once within provided interval', done => {
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });

    // 0ms
    expect(fn.callCount).toBe(0);
    thr();
    thr();
    thr();
    expect(fn.callCount).toBe(1);

    setTimeout(() => {
      // 100ms
      expect(fn.callCount).toBe(2);
      thr();
      thr();
      thr();
      expect(fn.callCount).toBe(2);

      setTimeout(() => {
        // 200ms
        expect(fn.callCount).toBe(3);
        thr();
        thr();
        thr();
        expect(fn.callCount).toBe(3);

        done();
      }, interval + 10);
    }, interval + 10);
  });

  test('Should prevent the throttle if returns true when a gate is provided', done => {
    let pass = false;
    const fn = sinon.spy();
    const interval = 100;
    const gate = () => pass;
    const thr = throttle(fn, { interval, gate });

    // 0ms
    expect(fn.callCount).toBe(0);

    pass = true;
    thr();
    expect(fn.callCount).toBe(1);
    thr();
    expect(fn.callCount).toBe(2);
    thr();
    expect(fn.callCount).toBe(3);

    pass = false;
    thr();
    thr();
    thr();
    expect(fn.callCount).toBe(3);

    setTimeout(() => {
      // 100ms
      expect(fn.callCount).toBe(4);

      pass = true;
      thr();
      expect(fn.callCount).toBe(5);
      thr();
      expect(fn.callCount).toBe(6);
      thr();
      expect(fn.callCount).toBe(7);

      done();
    }, interval + 10);
  });

  test('Should pass arguments to function throttle', () => {
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });

    thr(10, true, {});
    expect(fn.calledWith(10, true, {})).toBeTrue();
  });

  test('Should set context in function throttle', () => {
    const fn = sinon.spy();
    const interval = 100;
    const thr = throttle(fn, { interval });
    const context = [1, 2, 3];

    thr.call(context);
    expect(fn.calledOn(context)).toBeTrue();
  });
});
