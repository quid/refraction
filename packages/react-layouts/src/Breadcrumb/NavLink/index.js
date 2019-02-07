/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { textStyles, withFallback as wf } from '@quid/theme';
import { ClassNames } from '@emotion/core';

export type Props = {
  to: string,
  external?: boolean,
  disabled?: boolean,
  emphasized?: boolean,
  children: React.Node,
};

const NavLink = styled(
  ({
    to,
    external = false,
    disabled = false,
    emphasized = false,
    children,
    ...props
  }: Props) => {
    if (external || disabled) {
      return (
        <a href={!disabled ? to : undefined} {...props}>
          {children}
        </a>
      );
    } else {
      return (
        <ClassNames>
          {({ css, theme }) => (
            <RouterNavLink
              exact
              activeClassName={css`
                ${textStyles('bold')({ theme })};
              `}
              to={to}
              {...props}
            >
              {children}
            </RouterNavLink>
          )}
        </ClassNames>
      );
    }
  }
)`
  ${textStyles('normal')};
  color: ${wf(props => {
    return props.theme.primary;
  })};
  text-decoration: none;

  ${props =>
    props.emphasized &&
    css`
      ${textStyles('bold')(props)};
    `}

  ${props =>
    props.disabled &&
    css`
      ${textStyles('disabled')(props)};
      cursor: default;
    `}
`;

export default NavLink;
