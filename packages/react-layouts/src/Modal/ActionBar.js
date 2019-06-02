/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

import * as React from 'react';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';
import css from '@emotion/css/macro';
import { ClassNames } from '@emotion/core';

type Props = {
  action?: React.Node,
  renderActionLeft?: string => React.Node,
  renderActionRight?: string => React.Node,
};

const Left = styled.div`
  margin-left: auto;
`;

const Right = styled.div`
  margin-right: auto;
`;

const ActionBar = styled(
  ({ action, renderActionLeft, renderActionRight, ...props }: Props) => (
    <ClassNames>
      {({ css }) => {
        const actionClassName = css`
          margin: 0 5px;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        `;
        return (
          <div {...props}>
            {renderActionLeft && (
              <Right>{renderActionLeft(actionClassName)}</Right>
            )}
            {action}
            {renderActionRight && (
              <Left>{renderActionRight(actionClassName)}</Left>
            )}
          </div>
        );
      }}
    </ClassNames>
  )
)`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  height: 50px;
  padding: 10px;
  ${wf(
    props => css`
      border-top: 1px solid
        ${props.theme.current === 'light'
          ? props.theme.colors.gray1
          : props.theme.colors.gray7};
    `
  )};
`;

export default ActionBar;
