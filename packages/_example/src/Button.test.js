// @flow
import React from 'react';
import { mount } from 'enzyme';

import Button from './Button';

it('renders a button', () => {
  const wrapper = mount(<Button>foo</Button>);
  expect(wrapper.find('button')).toHaveLength(1);
  expect(wrapper).toMatchSnapshot();
});
