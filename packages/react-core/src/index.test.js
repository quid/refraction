/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as components from '.';

it('exports the expected named exports', () => {
  expect(Object.keys(components)).toMatchInlineSnapshot(`
Array [
  "Button",
  "Icon",
  "Text",
]
`);
});
