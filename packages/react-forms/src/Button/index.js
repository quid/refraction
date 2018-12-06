// @flow
import React, { type Node } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import Color from 'color';
import { withFallback as wf, textStyles } from '@quid/theme';

const OKAY = '#039849';
const WARNING = '#FFCE03';
const HAZARD = '#E61E27';

type Props = {
  /** The "color" of the button */
  importance?: 'primary' | 'secondary' | 'okay' | 'warning' | 'hazard',
  /** Make the button background transparent */
  transparent?: boolean,
  /** Button height */
  size?: 'regular' | 'small',
  /** What to render inside the button */
  children?: Node,
  /** Normal `href` URL, if present, the button will render as anchor (`<a />`) */
  href?: string,
  /** react-router URL, if present, the button will render as `Link` */
  to?: string | Object,
  /** when `true`, the button can't be clicked */
  disabled?: boolean,
};

const hoverMod = color =>
  Color(color)
    .darken(0.1)
    .string();
const activeMod = color =>
  Color(color)
    .darken(0.2)
    .string();

const reset = css`
  border: 0;
  padding: 0;
  background: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  text-decoration: none;
  box-sizing: border-box;
  color: inherit;
`;

const BaseButton = styled.button`
  ${reset}

  ${textStyles('normal', 'bold')}
  display: inline-block;
  border-radius: 2px;
  line-height: ${props => (props.size === 'small' ? 1.9 : 2.3)};
  padding-left: 0.769em;
  padding-right: 0.769em;
  transition: padding 0.2s ease-in-out, background 0.2s ease-in-out;
  color: ${wf(props => props.theme.primary)};

  ${wf(props => {
    const variations = {
      primary: props.theme.colors.aqua,
      secondary: props.theme.colors.gray2,
      okay: OKAY,
      warning: WARNING,
      hazard: HAZARD,
    };

    const color = variations[props.importance];

    return css`
      background-color: ${color};
      &:hover {
        background-color: ${hoverMod(color)};
      }
      &:active {
        background-color: ${activeMod(color)};
      }
      &:focus:not(:focus-visible) {
        outline: 0;
      }
      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 0.5px white, 0 0 2px 2px ${color};
      }
    `;
  })}

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      &,
      &:hover,
      &:focus,
      &:active {
        opacity: 0.4;
      }
    `}
  ${props =>
    props.disabled &&
    props.transparent &&
    css`
      background-color: transparent;
    `}
`;

const Button = (props: Props) => {
  let tag;
  if (props.to && !props.disabled) {
    tag = Link;
  } else if (props.href || (props.to && props.disabled)) {
    tag = 'a';
  } else {
    tag = 'button';
  }

  return <BaseButton as={tag} {...props} />;
};
Button.defaultProps = {
  importance: 'primary',
};

export default Button;
