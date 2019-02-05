/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputCheckbox, { OUTLINE_HOVER } from '.';

jest.mock('nanoid', () => () => 'random-id');

it('renders an InputCheckbox', () => {
  const wrapper = mount(<InputCheckbox />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled InputCheckbox', () => {
  const wrapper = mount(<InputCheckbox disabled />);
  expect(wrapper).toMatchSnapshot();
});

it('works with dark theme', () => {
  expect(
    // $FlowIgnoreMe: we don't need the whole theme object here
    OUTLINE_HOVER({ theme: { current: 'dark', colors: { gray2: 'black' } } })
  ).toMatchInlineSnapshot(`"rgba(0, 0, 0, 0.8)"`);
});
