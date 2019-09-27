/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { Rect } from './styles';

export const fromPercentToPixel = (percent: number, width: number): number =>
  (width / 100) * percent;

export const drawSegment = (
  width: number,
  offset: number,
  disabled: boolean
) => (props: Object) =>
  wrapWithSvg(
    <Rect width={width} offset={offset} disabled={disabled} />,
    props
  );

export const wrapWithSvg = (
  content: React$Element<any>,
  { className, on, ...props }: { className?: string, on: boolean }
) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="100"
    height="100"
    {...props}
  >
    {content}
  </svg>
);
