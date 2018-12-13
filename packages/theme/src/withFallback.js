// @flow
import themeData from './theme';

// Use this function in your components to provide a fallback theme in case
// no ThemeProvider is available
const withFallback = (fn: Object => any) => ({
  theme,
  ...props
}: {
  theme: Object,
}) => {
  const t = Object.keys(theme).length ? theme : themeData.light;
  return fn({ theme: t, ...props });
};

export default withFallback;
