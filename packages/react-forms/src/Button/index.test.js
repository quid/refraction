// @flow
import React from 'react';
import { mount } from 'enzyme';
import Button from '.';

jest.mock('react-router-dom');

it('renders the expected markup', () => {
  const wrapper = mount(<Button data-action="foo">Hello, World!</Button>);
  expect(wrapper).toMatchSnapshot();
});

it('renders a button using the text property', () => {
  const wrapper = mount(<Button data-action="foo" text="Hello, World!" />);
  expect(wrapper).toMatchSnapshot();
});

it('renders a Button with link', () => {
  const wrapper = mount(
    <Button data-action="foo" to="/">
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
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled Button with external link', () => {
  const wrapper = mount(
    <Button data-action="foo" disabled href="https://example.org">
      Hello, World!
    </Button>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a link without href if `to` is given but `disabled={true}`', () => {
  const wrapper = mount(
    <Button data-action="foo" to="/" disabled={true}>
      Hello, World!
    </Button>
  );
  expect(wrapper).toMatchSnapshot();
});

// it('applies Button classes to child if child is Icon', () => {
//   const wrapper = mount(<Button data-action="foo"><Icon name="arrow" /></Button>);
//   expect(wrapper).toMatchSnapshot();
// });

// it('does not apply Button classes to child if child is not Icon', () => {
//   const wrapper = mount(<Button data-action="foo"><div>Hello, World!</div></Button>);
//   expect(wrapper).toMatchSnapshot();
// });

// it('applies Button classes to child if child is Icon with near text', () => {
//   const wrapper = mount(<Button><Icon name="arrow" />Foobar</Button>);
//   expect(wrapper).toMatchSnapshot();
// });

// it('renders properly with isGroupChild property', () => {
//   const wrapper = mount(<Button isGroupChild></Button>);
//   expect(wrapper).toMatchSnapshot();
// });
