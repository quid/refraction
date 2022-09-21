/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import Color from 'color';
import colors from '../colors';
import sizes from '../sizes';

const darkTheme = {
  primary: colors.gray1,
  primaryInverse: colors.gray6,
  secondary: colors.gray2,
  background: colors.gray6,
  backdrop: Color(colors.gray6)
    .alpha(0.8)
    .string(),
  selected: colors.selected,
  link: colors.teal400,
  disabled: colors.gray3,
  shadow: colors.black,
  primaryDefaultBg: colors.teal400,
  primaryHoverBg: colors.teal300,
  colors,
  sizes,
};

export default darkTheme;
