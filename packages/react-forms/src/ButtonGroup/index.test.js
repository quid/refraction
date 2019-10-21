/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { ThemeProvider } from '@quid/theme';
import Button from '../Button';
import ButtonGroup from '.';

jest.mock('../Button', () => 'button');
jest.mock('nanoid', () => () => 'NOT_VERY_RANDOM_STRING');

it('renders a 2 buttons ButtonGroup', () => {
  expect(
    mount(
      <ButtonGroup>
        <Button>a</Button>
        <Button>b</Button>
      </ButtonGroup>
    )
  ).toMatchSnapshot();
});

it('renders the dark theme version', () => {
  expect(
    mount(
      <ThemeProvider theme="dark">
        <ButtonGroup>
          <Button>a</Button>
          <Button>b</Button>
        </ButtonGroup>
      </ThemeProvider>
    )
  ).toMatchSnapshot();
});

it('renders a 3 buttons ButtonGroup', () => {
  expect(
    mount(
      <ButtonGroup>
        <Button>a</Button>
        <Button>b</Button>
        <Button>c</Button>
      </ButtonGroup>
    ).find('button')
  ).toHaveLength(3);
});

it('renders an active button', () => {
  expect(
    mount(
      <ButtonGroup>
        {({ selectedButtonClass }) => (
          <Button className={selectedButtonClass}>a</Button>
        )}
      </ButtonGroup>
    ).find('button')
  ).toMatchInlineSnapshot(`
    <button
      className="NOT_VERY_RANDOM_STRING"
    >
      a
    </button>
  `);
});

it('renders a disabled ButtonGroup', () => {
  expect(
    mount(
      <ButtonGroup disabled>
        <Button disabled>a</Button>
      </ButtonGroup>
    )
      .find('fieldset')
      .prop('disabled')
  ).toBe(true);
});

it('renders a dark disabled ButtonGroup (without throwing errors)', () => {
  expect(
    mount(
      <ThemeProvider theme="dark">
        <ButtonGroup disabled>
          <Button disabled>a</Button>
        </ButtonGroup>
      </ThemeProvider>
    )
      .find('fieldset')
      .prop('disabled')
  ).toBe(true);
});
