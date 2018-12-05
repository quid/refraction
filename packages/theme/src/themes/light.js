// @flow
import Color from 'color';
import colors from '../colors';

const lightTheme = {
  primary: colors.black,
  primaryInverse: colors.white,
  secondary: colors.gray4,
  background: colors.white,
  backdrop: Color(colors.white)
    .alpha(0.8)
    .string(),
  selected: colors.selected,
  link: colors.link,
  disabled: colors.gray3,
  shadow: colors.black,
};

export default lightTheme;
