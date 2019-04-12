/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import useControlledState from '.';

const UseControlledState = ({
  children,
  defaultValue,
  controlledValue,
  controlValue,
}: {
  children: ([boolean, ((boolean => boolean) | boolean) => void]) => React.Node,
  defaultValue?: boolean,
  controlledValue?: boolean,
  controlValue?: boolean => void,
}) => children(useControlledState(defaultValue, controlledValue, controlValue));

it('works as uncontrolled', () => {
  const wrapper = mount(
    <UseControlledState defaultValue={true}>
      {([state]) => <div data-state={state} />}
    </UseControlledState>
  );

  expect(wrapper.find('div').prop('data-state')).toBe(true);
});

it('works as controlled - setState(fn)', () => {
  const Test = props => {
    const [value, setValue] = React.useState(props.controlledValue);
    return (
      <UseControlledState
        controlValue={value => setValue(value)}
        controlledValue={value}
      >
        {props.children}
      </UseControlledState>
    );
  };
  const wrapper = mount(
    <Test controlledValue={true}>
      {([state, setState]) => (
        <div data-state={state} onClick={() => setState(bool => !bool)} />
      )}
    </Test>
  );

  expect(wrapper.find('div').prop('data-state')).toBe(true);

  wrapper.find('div').simulate('click');

  expect(wrapper.find('div').prop('data-state')).toBe(false);
});

it('works as controlled - setState(value)', () => {
  const Test = props => {
    const [value, setValue] = React.useState(props.controlledValue);
    return (
      <UseControlledState
        controlValue={value => setValue(value)}
        controlledValue={value}
      >
        {props.children}
      </UseControlledState>
    );
  };
  const wrapper = mount(
    <Test controlledValue={true}>
      {([state, setState]) => (
        <div data-state={state} onClick={() => setState(!state)} />
      )}
    </Test>
  );

  expect(wrapper.find('div').prop('data-state')).toBe(true);

  wrapper.find('div').simulate('click');

  expect(wrapper.find('div').prop('data-state')).toBe(false);
});

it('warns on wrong usage', () => {
  // $FlowIgnoreMe: I know Flow, I know, it's fine
  console.error = jest.fn();
  mount(
    <UseControlledState defaultValue={true} controlledValue={true}>
      {([state]) => <div data-state={state} />}
    </UseControlledState>
  );

  expect(console.error).toHaveBeenCalled();
});

it('warns on wrong usage', () => {
  // $FlowIgnoreMe: I know Flow, I know, it's fine
  console.error = jest.fn();
  mount(
    <UseControlledState controlledValue={true}>
      {([state]) => <div data-state={state} />}
    </UseControlledState>
  );

  expect(console.error).toHaveBeenCalled();
});
