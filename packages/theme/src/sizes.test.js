// @flow
import sizes from './sizes';

it('exposes the right sizes', () => {
  expect(sizes).toMatchSnapshot();
});
