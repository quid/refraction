/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

// Popper.js doesn't play super nicely inside non browser environments
// such as JSDOM, we can easily mock it to avoid any problem

import PopperJs from 'popper.js';

export default class Popper {
  static placements = PopperJs.placements;

  constructor() {
    return {
      destroy: () => {},
      scheduleUpdate: () => {},
      update: () => {},
    };
  }
}
