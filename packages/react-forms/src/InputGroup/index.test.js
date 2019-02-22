/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputGroup from '.';

it('provides the expected class names', () => {
  mount(
    <InputGroup>
      {cn => expect(cn).toMatchInlineSnapshot(`"css-fbg2rn"`)}
      {cn => expect(cn).toMatchInlineSnapshot(`"css-b3o0lg"`)}
      {cn => expect(cn).toMatchInlineSnapshot(`"css-18leva3"`)}
    </InputGroup>
  );
});

it('applies the expected class names', () => {
  expect(
    mount(
      <InputGroup>
        <span />
        <span />
        <span />
      </InputGroup>
    )
  ).toMatchSnapshot();
});

it("doesn't explodes on unexpected children", () => {
  mount(<InputGroup />);
});
