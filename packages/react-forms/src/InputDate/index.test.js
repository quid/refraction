// @flow
import React from 'react';
import { mount } from 'enzyme';
import InputDate from './';

it('renders the expected markup', () => {
  const wrapper = mount(<InputDate />);
  expect(wrapper).toMatchSnapshot();
});
