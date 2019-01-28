/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import { type DropdownItem } from './dropdownTypes.js';

/**
 * Filters items where filter value is not included
 */
export function filterItems(
  items: Array<DropdownItem>,
  filter: ?string
): Array<DropdownItem> {
  if (filter) {
    const lowerCaseFilter = filter.toLowerCase();
    return items.filter(
      ({ label }) => label.toLowerCase().indexOf(lowerCaseFilter) !== -1
    );
  } else {
    return items;
  }
}

/**
 * Filters items based on categoryId
 */
export function filterByCategoryId(
  items: Array<DropdownItem>,
  categoryId: string | number
): Array<DropdownItem> {
  return items.filter(item => {
    if (item.categoryId === categoryId) {
      return {
        ...item,
      };
    }
  });
}

/**
 * Checks if the id is in the items
 */
export function includesId(
  items: Array<Object>,
  searchId: number | string
): boolean {
  return items.findIndex(({ id }) => id === searchId) !== -1;
}

/**
 * Iterates trough selectedItems and checks if any of items exist there
 */
export function isItemInCategorySelected(
  selectedItems: Array<Object>,
  items: Array<Object>
): boolean {
  for (let x = 0; x < selectedItems.length; x++) {
    if (includesId(items, selectedItems[x].id)) {
      return true;
    }
  }

  return false;
}

export function splitStringByValue(
  heystack: string,
  needle: string,
  minLenght: number = 3
): Array<{
  value: string,
  highlight: boolean,
}> {
  let textSlices = [];
  const needleLength = needle.length;
  const lowHeystack = heystack.toLowerCase();
  const lowNeedle = needle.toLowerCase();
  let startIndex = 0;
  let index = 0;
  while ((index = lowHeystack.indexOf(lowNeedle, startIndex)) > -1) {
    textSlices.push({
      value: heystack.slice(startIndex, index),
      highlight: false,
    });

    startIndex = index + needleLength;
    textSlices.push({
      value: heystack.slice(index, startIndex),
      highlight: true,
    });
  }

  if (textSlices.length === 0 || minLenght > needle.length) {
    textSlices = [];
    textSlices.push({
      value: heystack,
      highlight: false,
    });
  } else if (startIndex < heystack.length) {
    textSlices.push({
      value: heystack.slice(startIndex, heystack.length),
      highlight: false,
    });
  }

  return textSlices;
}

/**
 * This return a function that will call all the given functions with
 * the arguments with which it's called. It does a null-check before
 * attempting to call the functions and can take any number of functions.
 */
export function callAll(...fns: Array<Function>): Function {
  return (...args: Array<any>) => {
    fns.forEach(fn => {
      if (fn) {
        fn(...args);
      }
    });
  };
}
