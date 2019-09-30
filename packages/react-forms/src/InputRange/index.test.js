/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputRange from '.';
import { Track, Rect, TRACK_BACKGROUND, HANDLE_SIZE } from './styles';
import Handle from './Handle';

jest.mock('react-resize-aware', () => () => [
  null,
  { width: 1000, height: 10 },
]);
jest.mock('react-range', () => ({
  __esModule: true,
  Range: ({ renderTrack, renderThumb, values, ...props }) => (
    <x-range {...props}>
      {renderTrack({ props: { style: { zIndex: 0 } } })}
      {values.map((value, index) =>
        renderThumb({ props: { style: { zIndex: 0 }, value, index } })
      )}
    </x-range>
  ),
}));

it('renders an InputRange', () => {
  expect(mount(<InputRange name="x" />)).toMatchSnapshot();
});

it('renders a disabled InputRange', () => {
  expect(
    mount(<InputRange name="x" disabled />)
      .find('rect')
      .at(1)
      .prop('width')
  ).toBe(994);
});

it('renders a discrete InputRange', () => {
  expect(
    mount(<InputRange name="x" discrete step={10} />).find('Tick')
  ).toHaveLength(12);
});

it('renders a double handle InputRange', () => {
  expect(
    mount(<InputRange name="x" defaultValues={[20, 80]} />).find('Handle')
  ).toHaveLength(2);
});

it('renders a Track component', () => {
  expect(mount(<Track />)).toMatchSnapshot();
  expect(mount(<Track disabled />)).toMatchSnapshot();
});

it('renders a disabled Handle', () => {
  expect(mount(<Handle disabled />).prop('tabIndex')).toBe(undefined);
});

it('renders a dragging Handle', () => {
  expect(mount(<Handle dragging />)).toHaveStyleRule('transition-delay', `0s`, {
    target: '::before',
  });
});

it('returns the alt background on dark theme', () => {
  expect(
    TRACK_BACKGROUND({
      theme: ({ current: 'dark', colors: { gray2: 'gray2' } }: any),
    })
  ).toMatchInlineSnapshot(`"gray2"`);
});

it('renders Rect', () => {
  // $FlowIgnoreMe
  console.error = jest.fn();
  expect(
    mount(<Rect width={-1} />)
      .find('rect')
      .prop('width')
  ).toBe(0);
});
