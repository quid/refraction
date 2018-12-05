// @flow
import colors from './colors';
import * as themes from './themes';
import sizes from './sizes';

const theme = {
  light: {
    colors,
    sizes,
    ...themes.light,
  },
  dark: {
    colors,
    sizes,
    ...themes.dark,
  },
};

export default theme;
