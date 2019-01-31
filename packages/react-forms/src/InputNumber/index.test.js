/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import InputNumber from './';

it('renders the expected markup', () => {
  const wrapper = shallow(<InputNumber />);
  expect(wrapper).toMatchSnapshot();
});

it('increments on click on up arrow', () => {
  const stepUp = jest.fn();
  const wrapper = mount(<InputNumber defaultValue={0} />);
  wrapper.find('input').getDOMNode().stepUp = stepUp;
  wrapper
    .find('button')
    .at(0)
    .simulate('click');

  expect(stepUp).toBeCalled();
  expect(stepUp.mock.calls.length).toBe(1);
});

it('decrements on click on down arrow', () => {
  const stepDown = jest.fn();
  const wrapper = mount(<InputNumber defaultValue={0} />);
  wrapper.find('input').getDOMNode().stepDown = stepDown;
  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  expect(stepDown).toBeCalled();
  expect(stepDown.mock.calls.length).toBe(1);
});
