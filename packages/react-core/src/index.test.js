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
