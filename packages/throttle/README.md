![helcor](https://github.com/romelperez/helcor/raw/main/helcor.jpg)

# `@helcor/throttle`

<a href="https://npmjs.org/package/@helcor/throttle">
  <img src="https://img.shields.io/npm/v/@helcor/throttle.svg" alt="version" />
</a>
<a href="https://npmjs.org/package/@helcor/throttle">
  <img src="https://img.shields.io/npm/dm/@helcor/throttle.svg" alt="downloads" />
</a>

Creates a function that will be called once in a provided interval of time right
away when it is called. If you call the function for the first time, it will be
called, if you call the function between the first time and the end of the interval
of time, the function will not be called until the interval finishes.

## API

`throttle(fn, options)`

- `Function fn` - Function to throttle.
- `Object options` - Options. Optional.
  - `number interval` - Time in milliseconds to regulate. Default `1000`. Optional.
  - `Function gate` - Function to validate the throttle. If it returns `true`,
  we prevent the throttle and function will be called as normal. If not, the normal
  behavior is expected. Optional.
- Returns a function to use as a throttle.

## Example

A function that will feed you only once every 1 second. In total it will feed you
three times within 2 seconds (at 0s, 1s and 2s).

```js
import throttle from '@helcor/throttle';

function feed () {
  // eat something healthy... really
}
const feedRegulated = throttle(feed);

feedRegulated(); // (CALLED) ok, eat an apple
feedRegulated(); // you have just eaten, I'll do it 1s later
feedRegulated(); // nope, you have to wait...

setTimeout(() => {
  // (CALLED) ok, 1s passed, eat an orange
  feedRegulated(); // again, you have just eaten, wait 1 second more
  feedRegulated(); // hey, you'll get fat

  setTimeout(() => {
    // (CALLED) ok, another 1 second passed, eat pizz... no no, eat a banana
  }, 1000);
}, 1000);
```
