/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

import * as React from 'react';
import styled from '@emotion/styled/macro';
import type { Importance } from './importanceTypes';
import { Icon } from '@quid/react-core';
import css from '@emotion/css/macro';
import { withFallback as wf, textStyles } from '@quid/theme';

type Props = {
  title: React.Node,
  icon?: string,
  importance: Importance,
  className?: string,
};

const HeaderTitle = styled.h1`
  ${textStyles('regular', 'xlarge')};
  color: inherit;
`;

const HeaderIcon = styled(Icon)`
  box-sizing: initial;
  text-align: center;
  font-size: 2.6em;
  height: 0.93em;
  width: 0.93em;
  display: block;
  position: absolute;
  bottom: 0;
  left: 0.56em;
  transform: translateY(30%);
  padding: 0.37em;
  border-radius: 100%;

  ${wf(
    props =>
      css`
        background-color: ${props.theme.current === 'light'
          ? props.theme.colors.gray1
          : props.theme.colors.gray7};
        box-shadow: 0 0 0 2px
          ${props.theme.current === 'light'
            ? props.theme.colors.white
            : props.theme.colors.black};
        color: ${props.theme.primary};
      `
  )};
`;

const INFO_COLOR = '#B5ECEA';
const WARNING_COLOR = '#F5BBBE';

const Header = styled(({ title, icon, ...props }: Props) => (
  <header {...props}>
    <HeaderTitle>{title}</HeaderTitle>
    {icon && <HeaderIcon name={icon} />}
  </header>
))`
  position: relative;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  height: 4.64em;
  border-bottom: 1px solid transparent;
  border-radius: 2px 2px 0 0;

  ${wf(
    props =>
      props.importance &&
      props.importance === 'action' &&
      css`
        color: ${props.theme.primary};
        background-color: ${props.theme.current === 'light'
          ? props.theme.colors.white
          : props.theme.colors.black};
        border-color: ${props.theme.current === 'light'
          ? props.theme.colors.gray1
          : props.theme.colors.gray7};
      `
  )}

  ${wf(
    props =>
      props.importance &&
      props.importance === 'info' &&
      css`
        color: ${props.theme.colors.black};
        background-color: ${INFO_COLOR};
        border-color: ${INFO_COLOR};
      `
  )}

  ${props =>
    props.importance &&
    props.importance === 'warning' &&
    css`
      background-color: ${WARNING_COLOR};
      border-color: ${WARNING_COLOR};
    `};
`;

export default Header;
export { HeaderIcon };
