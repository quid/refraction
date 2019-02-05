/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { withFallback as wf, sizes } from '@quid/theme';
import css from '@emotion/css/macro';
import { ClassNames } from '@emotion/core';

const PADDING = sizes.small;

export type Props = {
  separated?: boolean,
  left?: boolean,
  right?: boolean,
  center?: boolean,
  children: string => React.Node,
};

const Slot = styled(
  ({
    separated = false,
    left = false,
    right = false,
    center = false,
    children,
    ...props
  }: Props) => (
    <ClassNames>
      {({
        css,
        paddingClass = css`
          margin-left: ${PADDING};
          margin-right: ${PADDING};
          &:first-of-type {
            margin-left: calc(${PADDING} * 2);
          }

          &:last-of-type {
            margin-right: calc(${PADDING} * 2);
          }
        `,
      }) => <div {...props}>{children(paddingClass)}</div>}
    </ClassNames>
  )
)`
  display: flex;
  align-items: center;


  ${props =>
    props.separated &&
    css`
      border-color: ${wf(props =>
        props.theme.current === 'light'
          ? props.theme.colors.gray1
          : props.theme.colors.gray5
      )(props)};
      border-style: solid;
      border-left-width: 1px;
      border-right-width: 1px;
      border-top-width: 0;
      border-bottom-width: 0;
      padding-left: ${PADDING};
      padding-right: ${PADDING};
    `}

  ${props =>
    props.left &&
    css`
      flex: 1;
      justify-content: flex-start;
    `}

  ${props =>
    props.right &&
    css`
      flex: 1;
      justify-content: flex-end;
    `}


  ${props =>
    props.center &&
    css`
      justify-content: center;
    `}
`;

export default Slot;
