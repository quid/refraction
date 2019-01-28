/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputToggle from '.';

jest.mock('nanoid', () => () => 'random-id');

it('renders an InputToggle', () => {
  const wrapper = mount(<InputToggle />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled InputToggle', () => {
  const wrapper = mount(<InputToggle disabled />);
  expect(wrapper).toMatchSnapshot();
});
