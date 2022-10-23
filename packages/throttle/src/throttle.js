/* global setTimeout */

export default function throttle (fn, providedOptions) {
  if (typeof fn !== 'function') {
    throw new Error('Expected function as first parameter.');
  }

  const options = {
    interval: 1000,
    gate: null,
    ...providedOptions
  };

  let available = true;
  let queue = false;

  return function () {
    const args = arguments;
    const context = this;

    const call = () => {
      available = false;
      fn.apply(context, args);

      setTimeout(() => {
        if (queue) {
          queue = false;
          call();
        }
        else {
          available = true;
        }
      }, options.interval);
    };

    available = available || (options.gate && options.gate());

    if (available) {
      call();
    }
    else {
      queue = true;
    }
  };
}
