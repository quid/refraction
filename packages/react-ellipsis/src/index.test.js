// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Ellipsis from './';
import nlToBr from './nlToBr';
import isWidthDifferentFn from './isWidthDifferentFn';
import ReactDOM from 'react-dom';

it('converts \\n to <br />', () => {
  expect(nlToBr('foo\nbar')).toEqual(['foo', <br key={1} />, 'bar']);
});

it('checks if element width is different', () => {
  const element = document.createElement('div');
  expect(isWidthDifferentFn(element, 1)).toBe(true);
  // 0 is the default value used by JSDOM for any DOM Node size
  expect(isWidthDifferentFn(element, 0)).toBe(false);
});

it('trims the last word if scrollHeight is higher than maxHeight', () => {
  const wrapper = mount(<Ellipsis maxHeight={20}>some text here</Ellipsis>);
  const instance: any = wrapper.instance();
  instance.element.current = { scrollHeight: 21 };
  instance.updateText();

  expect(wrapper.state().current).toBe(2);
});

it('does not trim the last word if scrollHeight is equal or lower than maxHeight', () => {
  const wrapper = mount(<Ellipsis maxHeight={20}>some text here</Ellipsis>);
  const instance: any = wrapper.instance();
  instance.element.current = { scrollHeight: 20 };
  instance.updateText();

  expect(wrapper.state().current).toBe(3);
});

it('does not trim if only one word is left', () => {
  const wrapper = mount(<Ellipsis maxHeight={20}>wow</Ellipsis>);
  const instance: any = wrapper.instance();
  instance.element.current = { scrollHeight: 21 };
  instance.updateText();

  expect(wrapper.state().current).toBe(1);
});

it('calls componentDidUpdate on update', () => {
  const wrapper = mount(<Ellipsis maxHeight={20}>some text here</Ellipsis>);
  expect(wrapper.state().previousChildren).toBe('some text here');
  wrapper.setProps({ children: 'something else here' });
  expect(wrapper.state().previousChildren).toBe('something else here');
});

it('calls componentDidUpdate on update', () => {
  let toDo = 2;
  // replace the method with one that returns true only the first two times
  // to properly test the update cycle
  class MockEllipsis extends Ellipsis {
    isWidthDifferentFn = () => {
      if (toDo > 0) {
        toDo--;
        return true;
      } else {
        return false;
      }
    };
  }
  const wrapper = mount(
    <MockEllipsis maxHeight={20}>some text here</MockEllipsis>
  );
  wrapper.setProps({ children: 'something else here' });
  expect(wrapper.state().previousChildren).toBe('something else here');
});

it('renders the title tag if `addTitle` is true', () => {
  const wrapper = mount(
    <Ellipsis addTitle maxHeight={20}>
      some text here
    </Ellipsis>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders without errors even if child is null', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ellipsis maxHeight={20}>{null}</Ellipsis>, div);
});

it('renders without errors even if child is false', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ellipsis maxHeight={20}>{false}</Ellipsis>, div);
});

it('renders without errors even if child is an empty string', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Ellipsis maxHeight={20}>{''}</Ellipsis>, div);
});
