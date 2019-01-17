// @flow

import * as React from 'react';
import { mount } from 'enzyme';
import InvalidHandler from '.';

it('works as expected', () => {
  const handleChange = jest.fn();
  const handleInvalid = jest.fn();

  const wrapper = mount(
    <InvalidHandler>
      {(getInputProps, isInvalid) => {
        const { onChange, onInvalid } = getInputProps({
          onChange: handleChange,
          onInvalid: handleInvalid,
        });
        return (
          <input
            onChange={onChange}
            onInvalid={onInvalid}
            data-invalid={isInvalid}
          />
        );
      }}
    </InvalidHandler>
  );

  wrapper.find('input').simulate('change');
  expect(handleChange).toHaveBeenCalled();
});

it('reports invalid state', () => {
  const handleChange = jest.fn();
  const handleInvalid = jest.fn();

  const wrapper = mount(
    <InvalidHandler>
      {(getInputProps, isInvalid) => {
        const { onChange, onInvalid } = getInputProps({
          onChange: handleChange,
          onInvalid: handleInvalid,
        });
        return (
          <input
            required
            onChange={onChange}
            onInvalid={onInvalid}
            data-invalid={isInvalid}
          />
        );
      }}
    </InvalidHandler>
  );

  wrapper
    .find('input')
    .getDOMNode()
    .checkValidity();
  expect(handleInvalid).toHaveBeenCalled();
});

it('sets custom error message', () => {
  const setCustomValidity = jest.fn();
  const wrapper = mount(
    <InvalidHandler errorMessage="foobar">
      {(getInputProps, isInvalid) => {
        const { onChange, onInvalid } = getInputProps();
        return (
          <input
            required
            onChange={onChange}
            onInvalid={onInvalid}
            data-invalid={isInvalid}
          />
        );
      }}
    </InvalidHandler>
  );

  wrapper.find('input').simulate('invalid', { target: { setCustomValidity } });
  expect(setCustomValidity).toHaveBeenCalledWith('foobar');

  wrapper.find('input').simulate('change', { target: { setCustomValidity } });
  expect(setCustomValidity).toHaveBeenCalledWith('');
});
