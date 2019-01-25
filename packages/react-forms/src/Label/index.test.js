/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Label from '.';

it('renders a label', () => {
  const wrapper = mount(<Label>foobar</Label>);
  expect(wrapper).toMatchSnapshot();
});

it('renders an inline label', () => {
  const wrapper = mount(<Label inline>foobar</Label>);
  expect(wrapper).toHaveStyleRule('display', 'inline-flex');
});

it('renders a form control', () => {
  mount(
    <Label
      renderControl={cn => {
        expect(cn).toMatchInlineSnapshot(`"css-lvyu5j"`);
      }}
    >
      foobar
    </Label>
  );
});

it('renders a left aligned label with form control', () => {
  const wrapper = mount(
    <Label
      renderControl={cn => {
        expect(cn).toMatchInlineSnapshot(`"css-1y6ic72"`);

        return <div className={cn} />;
      }}
      labelAlignment="left"
    >
      foobar
    </Label>
  );
  expect(wrapper).toMatchSnapshot();
});
