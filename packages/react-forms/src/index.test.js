/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as components from '.';

it('exports the expected number of components', () => {
  expect(Object.keys(components)).toMatchInlineSnapshot(`
    Array [
      "Button",
      "INPUT_ATTRIBUTES",
      "InputCheckbox",
      "InputColor",
      "InputDate",
      "InputFile",
      "InputGroup",
      "InputNumber",
      "InputRadio",
      "InputRange",
      "InputText",
      "InputToggle",
      "InvalidHandler",
      "Label",
      "TextArea",
    ]
  `);
});
