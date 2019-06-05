/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Button from '.';
import { Link } from 'react-router-dom';
import Icon from '../Icon';

jest.mock('react-router-dom');

it('renders the expected markup', () => {
  const wrapper = mount(<Button data-action="foo">Hello, World!</Button>);
  expect(wrapper).toMatchSnapshot();
});

it('renders a Button with link', () => {
  const wrapper = mount(
    <Button data-action="foo" to="/">
      Hello, World!
    </Button>
  );
  expect(wrapper.find(Link)).toBeDefined();
});

it('renders a Button with small size', () => {
  const wrapper = mount(<Button size="small">Hello, World!</Button>);
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled and transparent Button', () => {
  const wrapper = mount(
    <Button transparent disabled>
      Hello, World!
    </Button>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a Button with external link', () => {
  const wrapper = mount(
    <Button data-action="foo" href="https://example.org">
      Hello, World!
    </Button>
  );
  expect(wrapper.find('a[href]').props().href).toBe('https://example.org');
});

it('renders a disabled Button with external link', () => {
  const wrapper = mount(
    <Button data-action="foo" disabled href="https://example.org">
      Hello, World!
    </Button>
  );
  expect(wrapper.find('a[href]')).toHaveLength(0);
});

it('renders a link without href if `to` is given but `disabled={true}`', () => {
  const wrapper = mount(
    <Button data-action="foo" to="/" disabled={true}>
      Hello, World!
    </Button>
  );
  expect(wrapper.find(Link)).toHaveLength(0);
});

it('applies Button classes to child if child is Icon', () => {
  const wrapper = mount(
    <Button data-action="foo">
      <Icon name="arrow" />
    </Button>
  );
  expect(
    wrapper
      .find('i')
      .props()
      .className.split(' ')
  ).toHaveLength(2);
});

it('does not apply Button classes to child if child is not Icon', () => {
  const wrapper = mount(
    <Button data-action="foo">
      <div data-target>Hello, World!</div>
    </Button>
  );
  expect(wrapper.find('[data-target]').props().className).toMatchInlineSnapshot(
    `undefined`
  );
});

it('applies Button classes to child if child is Icon with near text', () => {
  const wrapper = mount(
    <Button>
      <Icon name="arrow" />
      Foobar
    </Button>
  );
  expect(
    wrapper
      .find('i')
      .props()
      .className.split(' ')
  ).toHaveLength(2);
});

it('renders a Button with type=submit', () => {
  const wrapper = mount(<Button type="submit">Foobar</Button>);
  expect(wrapper.find('button').props().type).toBe('submit');
});

it('forwards ref properly', () => {
  const ref = React.createRef();
  mount(<Button ref={ref}>Foobar</Button>);
  expect(ref.current).toBeDefined();
});

// it('renders properly with isGroupChild property', () => {
//   const wrapper = mount(<Button isGroupChild />);
//   expect(wrapper).toMatchSnapshot();
// });
