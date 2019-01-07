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
    acc[current] = obj[current];
    return acc;
  }, {});
