// @flow
import { type SerializedStyles } from '@emotion/utils';
import themeData from './theme';

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

export default withFallback;
