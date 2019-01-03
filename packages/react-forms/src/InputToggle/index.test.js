// @flow
import React from 'react';
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
