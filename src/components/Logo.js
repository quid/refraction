/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import React from 'react';

const path1 = // eslint-disable-next-line
  '\
M276.5 99.2c0-6.1.2-6.6-6.1-6.6-7.7 0-8.6-.2-8.6-3.2 0-3.4 2.7-3.4 7.7-3.4 6.3 0 13.5-.2 \
19-.9l4.3-.4c1.6 0 2 1.1 2 2.7 0 .2-.4 8.4-.4 9.9 0 4.5-.2 9.9-.2 14.7v32.1c0 10.4 0 17.4 \
2.7 20.1 1.6 1.8 2.7 1.8 7.9 2.3 2.5 0 2.9 1.6 2.9 3.2 0 2.9-.7 3.4-4.3 3.4-5.9 0-6.8 0-11\
.5.2l-12.9 1.6c-2 0-2.7-.5-2.9-20.5-6.8 9.9-14.9 21.2-32.7 21.2-12.2 0-27.8-6.5-27.8-29.4 \
0-2 .5-18.7.7-22.8.2-5.4.7-14.9.9-23.9.2-6.3-.2-6.8-8.4-6.8-4.1 0-5.9 0-5.9-3.2 0-2.5 1.1-\
3.4 3.4-3.4 13.3 0 14.9-.4 24.8-1.1 2.3-.2 3.6-.2 3.6-.2 1.1 0 2 .2 2 1.8 0 .9-.7 8.4-.7 9\
.9-.7 9.5-2.3 30-2.3 46.7 0 18.5 5.6 24.2 15.1 24.2 16.5 0 24.8-16.5 26.2-24.4 1.1-6.3 1.4\
-21.9 1.4-29.1V99.2zm72.6-65c0 5.6-3.2 12.4-10.8 12.4-6.1 0-10.8-4.3-10.8-12.4 0-7 4.1-12 \
10.8-12 7.5 0 10.8 6.5 10.8 12m-.9 119.8c0 9.9 0 12.2 5.9 12.4 7.9.5 8.8.7 8.8 4.3 0 2.7-1\
.1 2.9-3.6 2.9-2.3 0-12.4-.7-17.6-.7-6.1 0-16.7.7-21.9.7-3.8 0-4.5-.7-4.5-3.2 0-3.4.9-3.6 \
9-4.1 7.2-.4 6.3-5.9 6.3-13.5v-49c0-9.3.2-11.3-4.7-11.3-6.1 0-9.9 1.1-9.9-3.2 0-2.7 2.3-3.\
4 4.3-3.4s9.7-.4 14.4-.9c6.1-.7 11.7-1.6 12.2-1.6 1.8 0 2.3 1.8 2.3 3.2 0 1.6-.7 9.3-.7 12\
.4 0 2.5-.2 8.6-.2 12v43zm92.6-42c0-11.3-5.2-23.9-23-23.9-21.9 0-28.2 23.2-28.2 39.7 0 20.\
8 6.6 39.5 26.9 39.5 10.8 0 19.6-6.3 22.1-14 2.3-6.8 2.3-16.7 2.3-19.6V112zm1.4-56.9c0-4.5\
.5-19-.5-22.3-.7-2.5-2.7-2.5-5-2.5-1.1 0-5.9.2-6.8 0-1.4-.2-2.3-.9-2.3-2.9 0-3.6 1.6-3.6 7\
.4-3.8 4.1-.2 15.8-1.8 20.5-2.7.7-.2 2-.4 2.9-.4 2.5 0 2.5 1.6 2.5 2.7s-1.1 25.7-1.1 30.5c\
0 5.9-.9 37-.9 41.3v47.4c0 22.8 1.1 23.5 9.3 23.5 2.7 0 4.1.4 4.1 3.6 0 2.9-.7 2.9-6.8 3.2\
-4.5.2-8.4.4-11.1.9-3.8.7-9.7 2-9.9 2-2.9 0-3.2-5.6-3.4-16.5-7.5 10.8-19.4 16.5-32.5 16.5-\
20.3 0-40.2-15.3-40.2-43.1 0-26 17.8-49.9 45.1-49.9 14.4 0 22.3 6.5 27.5 12.6l1.2-40.1zM95\
.3 8.1c34.7 0 68.4 16.3 68.4 83.6 0 67.6-33.7 83.6-68.4 83.6-33.8 0-67.5-16.3-67.5-83.6S60\
.9 8.1 95.3 8.1m.3-8.1C43 0 0 38.3 0 92.3c0 1.9.1 4.4.4 7.4.2 1.9.4 3.8.7 5.6.1.4.1.8.2 1.\
2.6 4 1.5 8 2.6 11.8 0 .2.1.3.1.5.1.4.3.8.4 1.3 5.6 18.4 18.3 40.4 46.1 53.3 13.3 6.7 28.6\
10.5 45.4 10.5 30.9 0 58.4-13.3 75.9-35.2 12-14.6 19.7-33.6 19.7-57.1C191.5 41.8 151.1 0 \
95.6 0M255 227.3c0-6.4-5.2-11.6-11.6-11.6-6.4 0-11.6 5.2-11.6 11.6 0 4.7 2.8 8.7 6.8 10.5\
-34.3 6.9-105.8-29-136.1-41.6-35.1-14.6-53-7.4-60.6 7-1 1.9-3 5.2-2.8 5.9 0 1.6 4.4 4.5 6\
.1 1.2 9-17.8 25.1-14.4 39.9-10.1 26.9 7.9 61.8 26.9 111.3 46.3 42.5 16.7 54.8-8.4 57.3-1\
3.9.8-1.7 1.3-3.4 1.3-5.3';

const path2 = // eslint-disable-next-line
  '\
M111.2 140.3c-.8-1.3-1.5-2.4-3-2.3-1 .1-1.9.7-2.2 1.6v.1c-.9 4.5-7.8 41-49 51.6 0 0 14 4.3\
 18.3 2.1 42.6-22.3 38.3-49.2 35.9-53.1';

const DEFAULT_STYLE = { width: 57 };

export type Props = {
  color?: string,
  style?: Object,
  noDefaultStyle?: boolean,
};

export default function Logo({
  color = '#000000',
  style,
  noDefaultStyle = false,
  ...props
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 472.4 252"
      alt="Quid"
      style={{ ...(!noDefaultStyle ? DEFAULT_STYLE : {}), ...style }}
      {...props}
    >
      <path fill={color} d={path1} />
      <path fill={color} d={path2} />
    </svg>
  );
}
