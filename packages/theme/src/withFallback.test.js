/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import withFallback from './withFallback';

it('should fallback theme to light', () => {
  // $FlowIgnoreMe: we don't need the whole theme object here
  expect(withFallback(props => props.theme.current)({ theme: {} })).toBe(
    'light'
  );
});

it('should preserve theme if provided', () => {
  expect(
    // $FlowIgnoreMe: we don't need the whole theme object here
    withFallback(props => props.theme.current)({ theme: { current: 'dark' } })
  ).toBe('dark');
});
