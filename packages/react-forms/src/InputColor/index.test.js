/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import InputColor from './index';

jest.mock('../InputText', () => ({
  __esModule: true,
  default: 'input',
  HEIGHT: jest.requireActual('../InputText').HEIGHT,
}));
jest.mock('../Button', () => 'button');
jest.mock('@quid/react-core', () => ({
  Icon: 'x-icon',
}));

const noop = () => undefined;

it('renders the expected markup', () => {
  const wrapper = mount(<InputColor onChange={noop} />);

  expect(wrapper).toMatchSnapshot();
});

it('responds to user interaction on fake button', () => {
  const wrapper = mount(<InputColor onChange={noop} />);

  wrapper.find('input[type="color"]').simulate('mouseEnter');
  wrapper.find('input[type="color"]').simulate('mouseDown');
  wrapper.find('input[type="color"]').simulate('focus');

  expect(wrapper.find('button').prop('data-state')).toMatchInlineSnapshot(
    `"hover active focus"`
  );

  wrapper.find('input[type="color"]').simulate('mouseLeave');
  wrapper.find('input[type="color"]').simulate('mouseUp');
  wrapper.find('input[type="color"]').simulate('blur');

  expect(wrapper.find('button').prop('data-state')).toMatchInlineSnapshot(`""`);
});

it('renders a disabled component', () => {
  const wrapper = mount(<InputColor disabled onChange={noop} />);

  expect(
    wrapper
      .find('input')
      .at(0)
      .prop('disabled')
  ).toBe(true);
});

it('triggers onChange when color is changed using the `type=color` input', () => {
  const handleChange = jest.fn();
  const wrapper = mount(<InputColor onChange={handleChange} />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', { target: { value: '#000000' } });

  expect(handleChange.mock.calls[0][0]).toMatchObject({
    target: { value: '#000000' },
  });
});

it('triggers onChange when color is changed using the `type=text` input', () => {
  const handleChange = jest.fn();
  const wrapper = mount(<InputColor onChange={handleChange} />);

  wrapper
    .find('input')
    .at(0)
    .simulate('change', { target: { value: '#000000' } });

  expect(handleChange.mock.calls[0][0]).toMatchObject({
    target: { value: '#000000' },
  });
});
