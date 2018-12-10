// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Icon from '.';

it('renders the expected markup', () => {
  const wrapper = mount(<Icon name="network" />);

  expect(wrapper).toMatchSnapshot();
});

it('renders a non squared Icon', () => {
  const wrapper = mount(<Icon name="network" squared={false} />);

  expect(wrapper).toMatchSnapshot();
});
