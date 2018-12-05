// @flow
import React, { type Node } from 'react';
import { ThemeProvider } from 'emotion-theming';
import { type SerializedStyles } from '@emotion/utils';

import colors from './colors';
import * as themes from './themes';
import sizes from './sizes';
import textStyles from './textStyles';

const themeData = {
  light: {
    colors,
    sizes,
    textStyles,
    ...themes.light,
  },
  dark: {
    colors,
    sizes,
    textStyles,
    ...themes.dark,
  },
};

type Props = {
  theme?: 'dark' | 'light',
  children: Node,
};

const DEFAULT = 'light';
const QuidThemeProvider = ({ theme, children, ...props }: Props) => (
  <ThemeProvider
    {...props}
    theme={themeData[theme != null ? theme : DEFAULT]}
    children={children}
  />
);

// Use this function in your components to provide a fallback theme in case
// no ThemeProvider is available
const withFallback = (fn: Object => SerializedStyles) => ({
  theme,
  ...props
}: {
  theme: Object,
}) => {
  const t = Object.keys(theme).length ? theme : themeData.light;
  return fn({ theme: t, ...props });
};

export { colors, themes, sizes, textStyles, withFallback };
export default QuidThemeProvider;
