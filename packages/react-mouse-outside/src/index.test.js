/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import MouseOutside from './index';

const Child = React.forwardRef((props, ref) => <div ref={ref} />);

it('should render expected markup', () => {
  const wrapper = shallow(
    <MouseOutside onClickOutside={f => void f}>
      {ref => <div ref={ref} />}
    </MouseOutside>
  );
  expect(wrapper).toMatchSnapshot();
});

it('should not call onClickOutside on click inside', () => {
  const handleClickOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onClickOutside={handleClickOutside}>
      {ref => <Child ref={ref} />}
    </MouseOutside>
  );

  wrapper.find(Child).simulate('click');
  expect(handleClickOutside).not.toBeCalled();
});

it('should call onClickOutside on... click outside', () => {
  const handleClickOutside = jest.fn();
  mount(
    <MouseOutside onClickOutside={handleClickOutside}>
      {ref => <Child ref={ref} />}
    </MouseOutside>
  );

  document.dispatchEvent(new Event('click'));
  expect(handleClickOutside).toBeCalled();
});

it('should not call onClickOutside on click outside if callback pro has been removed', () => {
  const handleClickOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onClickOutside={handleClickOutside}>
      {ref => <Child ref={ref} />}
    </MouseOutside>
  );

  wrapper.setProps({ onClickOutside: undefined });

  document.dispatchEvent(new Event('click'));
  expect(handleClickOutside).not.toBeCalled();
});

it('should not call onMoveOutside on click outside if callback pro has been removed', () => {
  const handleMouseMoveOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onMoveOutside={handleMouseMoveOutside}>
      {ref => <div ref={ref} />}
    </MouseOutside>
  );

  wrapper.setProps({ onMoveOutside: undefined });

  document.dispatchEvent(new Event('mousemove'));
  expect(handleMouseMoveOutside).not.toBeCalled();
});

it('should remove event listener on unmount', () => {
  const handleClickOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onClickOutside={handleClickOutside}>
      {ref => <div ref={ref} />}
    </MouseOutside>
  );
  wrapper.unmount();
  document.dispatchEvent(new Event('click'));
  expect(handleClickOutside).not.toBeCalled();
});

it('should not call onMoveOutside on mouse move inside', () => {
  const handleMouseMoveOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onMoveOutside={handleMouseMoveOutside}>
      {ref => <Child ref={ref} />}
    </MouseOutside>
  );

  const child = wrapper.find(Child);
  child.simulate('mousemove', { target: child });
  expect(handleMouseMoveOutside).not.toBeCalled();
});

it('should call onMoveOutside when mouse moves outside', () => {
  const handleMouseMoveOutside = jest.fn();
  mount(
    <MouseOutside onMoveOutside={handleMouseMoveOutside}>
      {ref => <Child ref={ref} />}
    </MouseOutside>
  );

  document.dispatchEvent(new Event('mousemove'));
  expect(handleMouseMoveOutside).toBeCalled();
});

it('should remove event listener on unmount', () => {
  const handleMouseMoveOutside = jest.fn();
  const wrapper = mount(
    <MouseOutside onMoveOutside={handleMouseMoveOutside}>
      {ref => <div ref={ref} />}
    </MouseOutside>
  );
  wrapper.unmount();
  document.dispatchEvent(new Event('mousemove'));
  expect(handleMouseMoveOutside).not.toBeCalled();
});
