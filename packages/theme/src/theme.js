/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import colors from './colors';
import * as themes from './themes';
import sizes from './sizes';

const theme = {
  light: {
    current: 'light',
    colors,
    sizes,
    ...themes.light,
  },
  dark: {
    current: 'dark',
    colors,
    sizes,
    ...themes.dark,
  },
};

export default theme;
