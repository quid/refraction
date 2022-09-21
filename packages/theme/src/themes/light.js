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

const lightTheme = {
  primary: colors.gray6,
  primaryInverse: colors.gray1,
  secondary: colors.gray4,
  background: colors.white,
  backdrop: Color(colors.white)
    .alpha(0.8)
    .string(),
  selected: colors.selected,
  link: colors.teal840,
  disabled: colors.gray3,
  shadow: colors.black,
  primaryDefaultBg: colors.teal840,
  primaryHoverBg: colors.teal900,
  colors,
  sizes,
};

export default lightTheme;
