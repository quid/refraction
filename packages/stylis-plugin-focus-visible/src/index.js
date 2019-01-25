/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
const notFocusVisibleRgxp = /:not\(:focus-visible\)/g;
const focusVisibleRgxp = /:focus-visible/g;

const trim = selector => selector.trim().replace(/\s+/g, ' ');

export default (
  context: number,
  content: string,
  selectors: Array<string>,
  parents: Array<string>,
  line: number,
  column: number,
  length: number
) => {
  if (context === 2) {
    selectors.forEach((selector, index) => {
      if (selector.match(notFocusVisibleRgxp)) {
        const cleanSelector = selector.replace(notFocusVisibleRgxp, ':focus');
        selectors[index] = trim(`
          [data-whatinput]:not([data-whatinput="keyboard"]) ${cleanSelector},
          [data-whatinput]:not([data-whatinput="initial"]) ${cleanSelector}
        `);
      } else if (selector.match(focusVisibleRgxp)) {
        const cleanSelector = selector.replace(focusVisibleRgxp, ':focus');
        selectors[index] = trim(`
          [data-whatinput="keyboard"] ${cleanSelector},
          [data-whatinput="initial"] ${cleanSelector}
        `);
      }
    });
  }

  return content;
};
