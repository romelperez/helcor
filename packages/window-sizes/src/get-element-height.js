/* eslint-env browser */

import isNode from 'detect-node';

export function calculateElementHeight(element): number {
  return Math.max(
    element.scrollHeight,
    element.offsetHeight,
    element.clientHeight
  );
}

export function getElementHeight(element): number {
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
};
