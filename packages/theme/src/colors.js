/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

// Quid UI patterns
// https://quid.invisionapp.com/d/main#/console/11011818/233087591/preview
import Color from 'color';

export const grayPalette = {
  white: '#FFFFFF',
  gray1: '#E3E6E8',
  gray2: '#C7CCD1',
  gray3: '#8F9BA3',
  gray4: '#6C7983',
  gray5: '#49535A',
  gray6: '#2E3338',
  gray7: '#1B1F22',
  black: '#121212',
};

export const nodePalette = {
  aqua: '#1ED7D1',
  coral: '#F04E53',
  lime: '#87C445',
  purple: '#A8499A',
  yellow: '#FFCE03',
  teal: '#3C8790',
  peach: '#F4A467',
  red: '#E61E27',
  rose: '#BF8092',
  green: '#039849',
  sky: '#A6DEF3',
  brown: '#9A6051',
  lemon: '#EAE962',
  margenta: '#B22264',
  tan: '#C1966B',
  emerald: '#00804F',
  lilac: '#9581BC',
  orange: '#F9621E',
  blue: '#2E56BC',
  pink: '#D72E8E',
};

const brandPalette = {
  quidTeal: '#00a7b8',
  selected: '#00c1bb',
  highlighted: Color('#00c1bb')
    .alpha(0.6)
    .string(),
  link: '#3C8790', // DEPRECATED! Use `theme.link` instead
};

const colors = {
  ...grayPalette,
  ...nodePalette,
  ...brandPalette,
};

export default colors;
