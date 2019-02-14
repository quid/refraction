/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { textStyles } from '@quid/theme';
type Props = {
  children: React.Node,
  noPadding?: boolean,
  centerVertically?: boolean,
};

const Centerer: React.ComponentType<Props> = styled.div`
  ${textStyles('normal')};
  display: flex;
  flex: 1;
  overflow-y: auto;

  ${props =>
    !props.noPadding &&
    css`
      padding: 2.04em 7.06em;
    `}

  ${props =>
    props.centerVertically &&
    css`
      align-items: center;
    `}
`;

export default Centerer;
