/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import themeData from './theme';

type Theme = typeof themeData.light | typeof themeData.dark;

// Use this function in your components to provide a fallback theme in case
// no ThemeProvider is available
const withFallback = (fn: ({ theme: Theme, [string]: any }) => any) => ({
  theme,
  ...props
}: {
  theme: Theme,
}) => {
  const t = Object.keys(theme).length ? theme : themeData.light;
  return fn({ theme: t, ...props });
};

export default withFallback;
