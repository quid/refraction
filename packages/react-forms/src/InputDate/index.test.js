/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputDate from './';
import { act } from 'react-dom/test-utils';

jest.mock(
  '@quid/react-date-picker',
  () =>
    class extends require('react').Component<any> {
      render() {
        const { onSelect, onChangeCurrent, ...props } = this.props;
        return (
          <x-date-picker
            {...props}
            onClick={() => onSelect(new Date('2019-01-01'))}
            onFocus={() => onChangeCurrent(new Date('2020-01-01'))}
          />
        );
      }
    }
);

jest.mock('react-popper', () => ({
  Manager: 'x-manager',
  Reference: ({ children }) => children({}),
  Popper: ({ children }) => children({}),
}));

it('renders the expected markup', () => {
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      isOpen
      onToggle={jest.fn()}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('handles input change', () => {
  const handleOnChange = jest.fn();
  const wrapper = mount(
    <InputDate onChange={handleOnChange} value="2019-01-01" />
  );
  wrapper.find('input').simulate('change', { target: { value: '2020-01-01' } });
  expect(handleOnChange).toHaveBeenCalledWith('2020-01-01');
});

it('handles disabled', () => {
  const handleOnToggle = jest.fn();
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      disabled
      isOpen={false}
      onToggle={handleOnToggle}
    />
  );
  wrapper.find('Icon').simulate('click');
  expect(handleOnToggle).not.toHaveBeenCalled();
});

it('handles min and max', () => {
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-02"
      min="2019-01-01"
      max="2019-01-03"
    />
  );
  wrapper.find('Icon').simulate('click');

  expect(
    wrapper
      .find('x-date-picker')
      .prop('minDate')
      .toString()
  ).toBe(new Date('2019-01-01').toString());
  expect(
    wrapper
      .find('x-date-picker')
      .prop('maxDate')
      .toString()
  ).toBe(new Date('2019-01-03').toString());
});

it('handles invalid value', () => {
  const wrapper = mount(
    <InputDate onChange={jest.fn()} value="xxx" isOpen onToggle={jest.fn()} />
  );

  expect(wrapper.find('x-date-picker').prop('selected')).not.toBeDefined();
});

it('handles selection change through DatePicker', () => {
  const handleOnToggle = jest.fn();
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      isOpen
      onToggle={handleOnToggle}
    />
  );

  wrapper.find('x-date-picker').simulate('click');

  expect(handleOnToggle).toHaveBeenCalledWith(false);
});

it('handles input change through DatePicker', () => {
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      isOpen
      onToggle={jest.fn()}
    />
  );

  wrapper.find('x-date-picker').simulate('focus');

  expect(wrapper.find('x-date-picker').prop('current')).toMatchInlineSnapshot(
    `2020-01-01T00:00:00.000Z`
  );
});

it('handles onblur', () => {
  const handleOnToggle = jest.fn();
  const wrapper = mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      isOpen
      onToggle={handleOnToggle}
    />
  );

  wrapper.find('input').simulate('blur');

  expect(handleOnToggle).toHaveBeenCalledWith(false);

  wrapper
    .find('input')
    .simulate('blur', { relatedTarget: wrapper.find('input').hostNodes() });

  expect(handleOnToggle).toHaveBeenCalledWith(false);
  expect(handleOnToggle).toHaveBeenCalledTimes(2);
});

it('handles close on click outside', () => {
  const handleOnToggle = jest.fn();
  mount(
    <InputDate
      onChange={jest.fn()}
      value="2019-01-01"
      isOpen
      onToggle={handleOnToggle}
    />
  );

  act(() => void document.dispatchEvent(new Event('click')));

  expect(handleOnToggle).toHaveBeenCalledWith(false);
});
