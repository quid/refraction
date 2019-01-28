/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Cell, { Button } from './Cell';

it('renders the expected markup', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <Cell />
        </tr>
      </tbody>
    </table>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders the expected markup', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <Cell isCurrent isHeader />
        </tr>
      </tbody>
    </table>
  );
  expect(wrapper).toMatchSnapshot();
});

it('renders a disabled cell', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <tr>
          <Cell disabled />
        </tr>
      </tbody>
    </table>
  );
  expect(wrapper).toMatchSnapshot();
});

it('works on dark theme', () => {
  expect(
    mount(
      <Button
        selected
        theme={{ current: 'dark', colors: { white: 'white' } }}
      />
    )
  ).toHaveStyleRule('background-color', 'white');
});
