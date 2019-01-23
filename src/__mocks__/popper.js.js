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
