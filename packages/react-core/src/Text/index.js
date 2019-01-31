/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { textStyles, withFallback as wf } from '@quid/theme';
import { keyframes } from '@emotion/core';
import css from '@emotion/css/macro';
import styled from '@emotion/styled/macro';
import Color from 'color';

type Props = {
  /** Any valid HTML tag name used to render the text block */
  as?: string,
  /** A space separated list of supported text styles */
  type?: string,
};

type SkeletonProps = {
  ...Props,
  width?: string,
};

const BACKGROUND = {
  light: 'gray2',
  dark: 'gray7',
};

const reduceOpacity = color =>
  Color(color)
    .alpha(0.5)
    .string();

const pulse = wf(
  props => keyframes`
  0% {
    background-color: ${props.theme.colors[BACKGROUND[props.theme.current]]};
  }

  50% {
    background-color: ${reduceOpacity(
      props.theme.colors[BACKGROUND[props.theme.current]]
    )};
  }

  100% {
    background-color: ${props.theme.colors[BACKGROUND[props.theme.current]]};
  }
`
);

// @component
const Skeleton: React.StatelessFunctionalComponent<SkeletonProps> = styled(
  ({ as: As = 'span', type, className, width, ...props }) => {
    return (
      <As {...props}>
        <span className={className}>{props.children}</span>
      </As>
    );
  }
)`
  ${({ type = '' }) => textStyles(...type.split(' '))};
  color: transparent;
  user-select: none;
  border-radius: 2px;
  background-color: ${wf(
    props => props.theme.colors[BACKGROUND[props.theme.current]]
  )};
  animation: ${pulse} 3s ease-in-out infinite;
  ${wf(
    props =>
      props.width != null &&
      css`
        width: ${props.width};
        display: inline-block;
        &::before {
          content: 'X';
        }
      `
  )}
`;

// @component
const Text: React.StatelessFunctionalComponent<Props> & {
  Skeleton: typeof Skeleton,
} = styled.span`
  ${({ type = '' }) => textStyles(...type.split(' '))}
`;

Text.Skeleton = Skeleton;

export { Skeleton };

// @component
export default Text;
