// @flow
import * as components from '.';

it('exports the expected number of components', () => {
  expect(Object.keys(components)).toMatchInlineSnapshot(`
Array [
  "InputColor",
  "InputFile",
  "InputGroup",
  "InputNumber",
  "InputRange",
  "InputText",
  "InputToggle",
  "InvalidHandler",
  "Label",
  "TextArea",
  "Button",
]
`);
});
