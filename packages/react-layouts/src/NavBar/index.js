/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { sizes } from '@quid/theme';

type Props = {
  logo?: React.Node,
  breadcrumb?: React.Node,
  tools?: React.Node,
};

const PADDING = sizes.small;

const Left = styled.div`
  padding-top: calc(3px + ${PADDING});
  padding-left: ${PADDING};
  padding-bottom: ${PADDING};
  min-width: 0;
  height: 100%;
`;

const Middle = styled.div`
  padding-left: calc(${PADDING} * 3);
`;

const Right = styled.div`
  margin-left: auto;
  padding-right: ${PADDING};
`;

const NavBar = styled(({ logo, breadcrumb, tools, ...props }: Props) => (
  <nav {...props}>
    <Left>{logo}</Left>
    <Middle>{breadcrumb}</Middle>
    <Right>{tools}</Right>
  </nav>
))`
  display: flex;
  flex-direction: row;
  height: 50px;
  align-items: center;
`;

export default NavBar;
