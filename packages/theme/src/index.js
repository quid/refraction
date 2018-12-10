// @flow
import * as React from 'react';
import { ThemeProvider } from 'emotion-theming';

import themeData from './theme';
import * as themes from './themes';
export { themes };
export { default as colors } from './colors';
export { default as sizes } from './sizes';
export { default as textStyles } from './textStyles';
export { default as withFallback } from './withFallback';

type Props = {
  theme?: 'dark' | 'light',
  children: React.Node,
};

const QuidThemeProvider = ({ theme = 'light', children, ...props }: Props) => (
  <ThemeProvider {...props} theme={themeData[theme]} children={children} />
);

export default QuidThemeProvider;
