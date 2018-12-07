// @flow
import withFallback from './withFallback';

it('should fallback theme to light', () => {
  expect(withFallback(props => props.theme.current)({ theme: {} })).toBe(
    'light'
  );
});

it('should preserve theme if provided', () => {
  expect(
    withFallback(props => props.theme.current)({ theme: { current: 'dark' } })
  ).toBe('dark');
});
