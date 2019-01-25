/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { colors } from '@quid/theme';
import InputText from '.';

it('renders the expected markup', () => {
  const wrapper = mount(<InputText data-foo="bar" />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled input', () => {
  const wrapper = mount(<InputText disabled />);
  expect(wrapper).toHaveStyleRule('color', colors.gray2);
});

it('renders an input with addon', () => {
  const Addon = ({ onClick }) => <div onClick={onClick}>foo</div>;
  const wrapper = mount(<InputText renderAddon={Addon} />);
  expect(wrapper.find('div').at(1)).toMatchSnapshot();
});

it('renders a small input', () => {
  const wrapper = mount(<InputText size="small" />);
  expect(wrapper).toHaveStyleRule('height', '24px');
});

it('renders a large input', () => {
  const wrapper = mount(<InputText size="large" />);
  expect(wrapper).toHaveStyleRule('height', '50px');
});

it('focuses the input on click on the input addon', () => {
  const handleFocus = jest.fn();
  const Addon = props => <div tabIndex={0} {...props} />;
  const wrapper = mount(
    <InputText renderAddon={({ onClick }) => <Addon onClick={onClick} />} />
  );
  wrapper
    .find('input')
    .getDOMNode()
    .addEventListener('focus', handleFocus);

  wrapper.find(Addon).simulate('click');
  expect(handleFocus).toHaveBeenCalled();
});
