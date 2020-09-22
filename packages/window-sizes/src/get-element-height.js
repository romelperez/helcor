/* eslint-env browser */

import isNode from 'detect-node';

function calculateElementHeight (element) {
  return Math.max(
    element.scrollHeight,
    element.offsetHeight,
    element.clientHeight
  );
}

function getElementHeight (element) {
  if (isNode) {
    return 0;
  }

  if (element instanceof Window) {
    return Math.max(
      calculateElementHeight(element.document.body),
      calculateElementHeight(element.document.documentElement)
    );
  }

  return calculateElementHeight(element);
}

export { calculateElementHeight, getElementHeight };
