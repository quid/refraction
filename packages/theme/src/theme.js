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
