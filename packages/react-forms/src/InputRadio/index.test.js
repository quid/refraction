// @flow
import React from 'react';
import { mount } from 'enzyme';
import InputRadio from '.';

jest.mock('nanoid', () => () => 'random-id');

it('renders an InputRadio', () => {
  const wrapper = mount(<InputRadio />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled InputRadio', () => {
  const wrapper = mount(<InputRadio disabled />);
  expect(wrapper).toMatchSnapshot();
});
