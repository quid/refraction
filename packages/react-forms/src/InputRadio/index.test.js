// @flow
import React from 'react';
import { mount } from 'enzyme';
import InputRadio, { OUTLINE_HOVER } from '.';

jest.mock('nanoid', () => () => 'random-id');

it('renders an InputRadio', () => {
  const wrapper = mount(<InputRadio />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled InputRadio', () => {
  const wrapper = mount(<InputRadio disabled />);
  expect(wrapper).toMatchSnapshot();
});

it('works with dark theme', () => {
  expect(
    OUTLINE_HOVER({ theme: { current: 'dark', colors: { gray2: 'black' } } })
  ).toMatchInlineSnapshot(`"rgba(0, 0, 0, 0.8)"`);
});
