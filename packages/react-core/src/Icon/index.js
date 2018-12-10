// @flow
import * as React from 'react';
import { injectGlobal } from 'emotion';
import { css } from '@emotion/core';
import styled from '@emotion/styled';

const I = styled.i`
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

type Props = {
  /** Icon name */
  name: string,
  /** Forces the icon to be rendered with a squared area, this helps icons alignment */
  squared?: boolean,
};

// FIXME(fzivolo): JSDOM doesn't really like this unfortunately
// istanbul ignore next
if (process.env.NODE_ENV !== 'test') {
  injectGlobal`
    @font-face {
      font-family: 'quid-icons';
      src: url(${require('./icons/quid-icons.ttf')}) format('truetype'),
        url(${require('./icons/quid-icons.woff')}) format('woff'),
        url(${require('./icons/quid-icons.svg')}) format('svg');
      font-weight: normal;
      font-style: normal;
    }
  `;
}

const Icon = ({ name, squared = true }: Props) => (
  <I squared={squared}>{name}</I>
);

export default Icon;
