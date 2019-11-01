/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import { INPUT_ATTRIBUTES, omit, include } from './inputPropsFilters';

describe('include', () => {
  it('adds to the output only keys present in the provided props object', () => {
    expect(include({ checked: true })(INPUT_ATTRIBUTES)).not.toHaveProperty(
      'value'
    );
    expect(include({ checked: true })(INPUT_ATTRIBUTES)).toMatchInlineSnapshot(`
          Object {
            "checked": true,
          }
      `);
  });
});

describe('omit', () => {
  it('adds to the output only keys present in the provided props object', () => {
    expect(omit({ foo: true })(INPUT_ATTRIBUTES)).not.toHaveProperty('value');
    expect(omit({ foo: true })(INPUT_ATTRIBUTES)).toMatchInlineSnapshot(`
      Object {
        "foo": true,
      }
    `);
  });
});
