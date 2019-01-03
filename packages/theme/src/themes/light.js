// @flow
import Color from 'color';
import colors from '../colors';

const lightTheme = {
  primary: colors.gray6,
  primaryInverse: colors.gray1,
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
