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
  const handleChange = jest.fn();
  const wrapper = mount(
    <InputNumber defaultValue={0} onChange={handleChange} />
  );
  const input = wrapper.find('input').getDOMNode();
  input.stepUp = jest.fn(() => (input.value = String(Number(input.value) + 1)));
  wrapper
    .find('button')
    .at(0)
    .simulate('click');

  expect(input.stepUp).toBeCalledTimes(1);
  expect(handleChange).toBeCalledTimes(1);
  expect(handleChange.mock.calls[0][0].target.value).toBe('1');
});

it('decrements on click on down arrow', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <InputNumber defaultValue={0} onChange={handleChange} />
  );
  const input = wrapper.find('input').getDOMNode();
  input.stepDown = jest.fn(
    () => (input.value = String(Number(input.value) - 1))
  );
  wrapper
    .find('button')
    .at(1)
    .simulate('click');

  expect(input.stepDown).toBeCalledTimes(1);
  expect(handleChange).toBeCalledTimes(1);
  expect(handleChange.mock.calls[0][0].target.value).toBe('-1');
});
