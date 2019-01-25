/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import Text from './';

it('renders the expected markup', () => {
  const wrapper = mount(<Text />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a component with a different tag', () => {
  const wrapper = mount(<Text as="h1" type="xlarge" />);
  expect(wrapper).toMatchSnapshot();
});

it('renders the plain skeleton', () => {
  const wrapper = mount(<Text.Skeleton>foobar foobaz</Text.Skeleton>);
  expect(wrapper).toMatchSnapshot();
});

it('renders a Skeleton with a different tag', () => {
  const wrapper = mount(<Text.Skeleton as="h1">foobar foo</Text.Skeleton>);
  expect(wrapper).toMatchSnapshot();
});

it('renders a Skeleton with set width', () => {
  const wrapper = mount(<Text.Skeleton width="20px" />);
  expect(wrapper).toMatchSnapshot();
});
