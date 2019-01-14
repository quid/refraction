// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { colors } from '@quid/theme';
import InputRange, {
  getDecimals,
  toFixed,
  valueToObject,
  computeW3cDefaultValue,
  areValuesEqual,
  Rect,
} from '.';
import { Track, TRACK_BACKGROUND } from './styles';
import Handle from './Handle';

it('renders an InputRange', () => {
  expect(
    mount(
      <InputRange
        step={5}
        min={0}
        max={10}
        defaultValue={0}
        name="x"
        discrete
      />
    )
  ).toMatchSnapshot();
});

it('renders a Track component', () => {
  expect(mount(<Track />)).toMatchSnapshot();
  expect(mount(<Track disabled />)).toMatchSnapshot();
});

it('renders a disabled Handle', () => {
  expect(
    mount(<Handle disabled />)
      .find('input')
      .prop('disabled')
  ).toBeTruthy();
});

it('renders a zero Handle', () => {
  expect(mount(<Handle zero />)).toHaveStyleRule(
    'border',
    `1px solid ${colors.gray4}`
  );
});

it('renders a dragging Handle', () => {
  expect(mount(<Handle dragging />)).toHaveStyleRule('transition-delay', `0s`);
});

it('returns the alt background on dark theme', () => {
  expect(
    TRACK_BACKGROUND({ theme: { current: 'dark', colors: { gray2: 'gray2' } } })
  ).toMatchInlineSnapshot(`"gray2"`);
});

it('tests getDecimals', () => {
  expect(getDecimals(10.123)).toBe(3);
  expect(getDecimals(10)).toBe(0);
});

it('tests toFixed', () => {
  expect(toFixed(10.1234, 2)).toBe('10.12');
  expect(toFixed(10, 2)).toBe('10.00');
});

it('tests valueToObject', () => {
  expect(valueToObject(10)).toMatchInlineSnapshot(`
Object {
  "start": 10,
}
`);
  expect(valueToObject({ start: 5 })).toMatchInlineSnapshot(`
Object {
  "start": 5,
}
`);
  expect(valueToObject({ start: 5, end: 10 })).toMatchInlineSnapshot(`
Object {
  "end": 10,
  "start": 5,
}
`);
  expect(valueToObject({ end: 10 })).toMatchInlineSnapshot(`
Object {
  "end": 10,
}
`);
});

it('tests computeW3cDefaultValue', () => {
  expect(computeW3cDefaultValue(0, 10)).toBe(5);
  expect(computeW3cDefaultValue(10, 0)).toBe(10);
});

it('tests areValuesEqual', () => {
  expect(areValuesEqual(1, 1)).toBeTruthy();
  expect(areValuesEqual(1, 2)).toBeFalsy();
});

it('renders Rect', () => {
  // $FlowIgnoreMe
  console.error = jest.fn();
  expect(mount(<Rect width={-1} />)).toHaveStyleRule('width', '0px');
});
