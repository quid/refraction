/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import stylis from 'stylis';
import plugin from '.';

stylis.use(plugin);

it('replaces :focus-visible with the proper selector', () => {
  expect(
    stylis(
      '#test',
      `
    &:focus-visible {
      color: red;
    }
  `
    )
  ).toMatchInlineSnapshot(
    `"[data-whatinput=\\"keyboard\\"] #test:focus, [data-whatinput=\\"initial\\"] #test:focus{color:red;}"`
  );
});

it('works with the :not pseudo-class', () => {
  expect(
    stylis(
      '#test',
      `
    &:not(:focus-visible) {
      color: red;
    }
  `
    )
  ).toMatchInlineSnapshot(
    `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus, [data-whatinput]:not([data-whatinput=\\"initial\\"]) #test:focus{color:red;}"`
  );
});

it('works with a combination of :focus and :not pseudo-class', () => {
  expect(
    stylis(
      '#test',
      `
    &:focus:not(:focus-visible) {
      color: red;
    }
  `
    )
  ).toMatchInlineSnapshot(
    `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus:focus, [data-whatinput]:not([data-whatinput=\\"initial\\"]) #test:focus:focus{color:red;}"`
  );
});

it('works with a combination of :not(:focus-visible) and :focus-visible pseudo-classes', () => {
  expect(
    stylis(
      '#test',
      `
    &:focus-visible .foobar:not(:focus-visible) {
      color: red;
    }
  `
    )
  ).toMatchInlineSnapshot(
    `"[data-whatinput]:not([data-whatinput=\\"keyboard\\"]) #test:focus-visible .foobar:focus, [data-whatinput]:not([data-whatinput=\\"initial\\"]) #test:focus-visible .foobar:focus{color:red;}"`
  );
});

it("doesn't affects normal Stylis usage", () => {
  expect(
    stylis(
      '#test',
      `
    &:focus {
      color: red;
    }
  `
    )
  ).toMatchInlineSnapshot(`"#test:focus{color:red;}"`);
});
