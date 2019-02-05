/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';
import css from '@emotion/css/macro';
import Slot from './Slot';

export type Props = {
  transparent?: boolean,
};

const Footer = styled(({ transparent, ...props }: Props) => <nav {...props} />)`
  font-size: 1rem;
  display: flex;
  height: 2.86em;
  align-items: stretch;

  ${wf(
    props =>
      !props.transparent &&
      props.theme.current === 'light' &&
      css`
        background-color: ${props.theme.colors.white};
      `
  )};

  ${wf(
    props =>
      !props.transparent &&
      props.theme.current === 'dark' &&
      css`
        background-color: ${props.theme.colors.gray7};
      `
  )};
`;

Footer.Slot = Slot;

export default Footer;
