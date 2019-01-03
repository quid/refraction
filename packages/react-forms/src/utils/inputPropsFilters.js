// @flow
export const INPUT_ATTRIBUTES = [
  'autoComplete',
  'autoFocus',
  'defaultChecked',
  'defaultValue',
  'checked',
  'form',
  'list',
  'min',
  'max',
  'name',
  'onChange',
  'placeholder',
  'readOnly',
  'required',
  'tabIndex',
  'type',
  'value',
];

export const omit = (obj: Object) => (keys: Array<string>) =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, current) => {
      acc[current] = obj[current];
      return acc;
    }, {});

export const include = (obj: Object) => (keys: Array<string>) =>
  Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((acc, current) => {
      acc[current] = obj[current];
      return acc;
    }, {});
