// @flow
import * as React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled/macro';

type Props = {
  /** Icon name */
  name: string,
  /** Forces the icon to be rendered with a squared area, this helps icons alignment */
  squared?: boolean,
};

const Icon = styled(({ name, squared = true, ...props }: Props) => (
  <i {...props}>{name}</i>
))`
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'quid-icons' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: inherit;

  /* Enable Ligatures */
  letter-spacing: 0;
  font-feature-settings: 'liga';
  font-variant-ligatures: discretionary-ligatures;

  /* Better Font Rendering */
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;

  ${props =>
    props.squared &&
    css`
      display: inline-flex;
      align-items: center;
      justify-content: center;
      height: 1em;
      width: 1em;
    `};
`;

// @component
export default Icon;
