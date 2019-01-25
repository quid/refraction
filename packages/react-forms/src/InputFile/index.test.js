/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import InputFile from '.';

jest.mock('../Button', () => 'button');
jest.mock('../InputText', () => 'input');

it('renders an InputFile', () => {
  expect(mount(<InputFile />)).toMatchSnapshot();
});

it('changes label when file is selected', () => {
  const wrapper = mount(<InputFile />);
  expect(
    wrapper
      .find('input')
      .at(0)
      .prop('value')
  ).toBe('');

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        files: [{ name: 'foobar' }],
      },
    });

  expect(
    wrapper
      .find('input')
      .at(0)
      .prop('value')
  ).toBe('foobar');
});

it('handles cases when the input has no files selected', () => {
  const wrapper = mount(<InputFile />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        files: [],
      },
    });

  expect(
    wrapper
      .find('input')
      .at(0)
      .prop('value')
  ).toBe('');
});

it('triggers onChange event on select', () => {
  const handleChange = jest.fn();
  const wrapper = mount(<InputFile onChange={handleChange} />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        files: [{ name: 'foobar' }],
      },
    });

  expect(handleChange).toHaveBeenCalled();
});

it('generates correct label on multi selection', () => {
  const wrapper = mount(<InputFile />);

  wrapper
    .find('input')
    .at(1)
    .simulate('change', {
      target: {
        files: [{ name: 'foobar' }, { name: 'foobaz' }],
      },
    });

  expect(
    wrapper
      .find('input')
      .at(0)
      .prop('value')
  ).toBe('2 files selected');
});

it('triggers the input file selector on click', () => {
  const handleClick = jest.fn();
  const wrapper = mount(<InputFile onClick={handleClick} />);

  wrapper.find('button').simulate('click');
  expect(handleClick).toHaveBeenCalled();
});
