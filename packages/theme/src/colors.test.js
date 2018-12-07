// @flow
import colors from './colors';

it('exposes the right colors', () => {
  expect(colors).toMatchSnapshot();
});
