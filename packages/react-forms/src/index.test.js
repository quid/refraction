// @flow
import * as components from '.';

it('exports the expected number of components', () => {
  expect(Object.keys(components)).toMatchInlineSnapshot(`
Array [
  "Button",
  "InputText",
  "InputNumber",
  "InputGroup",
  "InputToggle",
]
`);
});
