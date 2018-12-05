// @flow
import Color from 'color';
import colors from '../colors';

const darkTheme = {
  primary: colors.white,
  primaryInverse: colors.black,
  secondary: colors.gray2,
  background: colors.gray6,
  backdrop: Color(colors.gray6)
    .alpha(0.8)
    .string(),
  selected: colors.selected,
  link: colors.link,
  disabled: colors.gray3,
  shadow: colors.black,
};

export default darkTheme;
