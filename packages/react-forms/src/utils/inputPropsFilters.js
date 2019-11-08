/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
export const INPUT_ATTRIBUTES = [
  'autoComplete',
  'autoFocus',
  'defaultChecked',
  'defaultValue',
  'checked',
  'form',
  'id',
  'list',
  'min',
  'max',
  'minLength',
  'maxLength',
  'name',
  'onChange',
  'pattern',
  'placeholder',
  'readOnly',
  'required',
  'tabIndex',
  'title',
  'type',
  'value',
  'disabled',
];

export const omit = (obj: Object) => (keys: Array<string>) =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, current) => {
      acc[current] = obj[current];
      return acc;
    }, {});

export const include = (obj: Object) => (keys: Array<string>) =>
  keys.reduce((acc, current) => {
    if (obj.hasOwnProperty(current)) {
      acc[current] = obj[current];
    }
    return acc;
  }, {});
