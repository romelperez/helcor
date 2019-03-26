/* eslint-env browser */

import isNode from 'detect-node';

const VIEWPORT_SIZE_DEFAULT = {
  width: 1024,
  height: 768
};

function isNumber(data) {
  return typeof data === 'number';
}

export function getViewportDimension(Name: string): number {
  const name = Name.toLowerCase();
  const document = window.document;
  const documentElement = document.documentElement;

  let size;

  // IE6 & IE7 don't have window.innerWidth or innerHeight.
  if (window['inner' + Name] === undefined) {
    size = documentElement['client' + Name];
  }

  // WebKit doesn't include scrollbars while calculating viewport size so we
  // have to get fancy.
  else if (window['inner' + Name] != documentElement['client' + Name]) {
    // Insert markup to test if a media query will match document.doumentElement["client" + Name]
    var bodyElement = document.createElement('body');
    bodyElement.id = 'vpw-test-b';
    bodyElement.style.cssText = 'overflow:scroll';

    var divElement = document.createElement('div');
    divElement.id = 'vpw-test-d';
    divElement.style.cssText = 'position:absolute;top:-1000px';

    // Getting specific on the CSS selector so it won't get overridden easily.
    divElement.innerHTML =
      '<style>@media(' +
      name +
      ':' +
      documentElement['client' + Name] +
      'px){body#vpw-test-b div#vpw-test-d{' +
      name +
      ':7px!important}}</style>';
    bodyElement.appendChild(divElement);
    documentElement.insertBefore(bodyElement, document.head);

    // Media query matches document.documentElement['client' + Name]
    if (divElement['offset' + Name] === 7) {
      size = documentElement['client' + Name];
    }
    // Media query didn't match, use window['inner' + Name]
    else {
      size = window['inner' + Name];
    }

    // Cleanup.
    documentElement.removeChild(bodyElement);
  }

  // Default to use window["inner" + Name].
  else {
    size = window['inner' + Name];
  }

  return size;
}

export function getViewportSize(
  { wMin, wMax, hMin, hMax }: { wMin: number, wMax: number, hMin: number, hMax: number } = {},
  defaultSize: { width: number, height: number }
): {
  width: number,
  height: number
} {
  if (isNode) {
    return {
      ...VIEWPORT_SIZE_DEFAULT,
      ...defaultSize
    };
  }

  let width = getViewportDimension('Width');
  width = isNumber(wMin) ? Math.max(width, wMin) : width;
  width = isNumber(wMax) ? Math.min(width, wMax) : width;

  let height = getViewportDimension('Height');
  height = isNumber(hMin) ? Math.max(height, hMin) : height;
  height = isNumber(hMax) ? Math.min(height, hMax) : height;

  return { width, height };
}
