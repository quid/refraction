/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import sizes from './sizes';

it('exposes the right sizes', () => {
  expect(sizes).toMatchSnapshot();
});
