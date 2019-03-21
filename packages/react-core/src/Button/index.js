/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import css from '@emotion/css/macro';
import styled from '@emotion/styled/macro';
import { Link } from 'react-router-dom';
import Color from 'color';
import { withFallback as wf, textStyles } from '@quid/theme';
import Icon from '../Icon';

const OKAY = '#039849';
const WARNING = '#FFCE03';
const HAZARD = '#E61E27';

const HEIGHT = {
  small: 24,
  regular: 32,
};

export type Importance =
  | 'primary'
  | 'secondary'
  | 'okay'
  | 'warning'
  | 'hazard';

export type Size = 'regular' | 'small';

type Props = {
  /** The "color" of the button */
  importance?: Importance,
  /** Make the button background transparent */
  transparent?: boolean,
  /** Button height */
  size?: Size,
  /** What to render inside the button */
  children?: React.Node,
  /** Normal `href` URL, if present, the button will render as anchor (`<a />`) */
  href?: string,
  /** react-router URL, if present, the button will render as `Link` */
  to?: string | Object,
  /** when `true`, the button can't be clicked */
  disabled?: boolean,
  /** type to apply to the button HTMLelement when rendering a "real" button */
  type?: 'button' | 'submit' | 'reset',
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

const Button = styled(
  ({
    to,
    href,
    transparent,
    size,
    importance,
    disabled,
    type,
    children,
    ...props
  }: Props) => {
    let Tag, specificProps;
    if (to && !disabled) {
      Tag = Link;
      specificProps = { to };
    } else if ((href || to) && !disabled) {
      Tag = 'a';
      specificProps = { href };
    } else {
      Tag = 'button';
      specificProps = { disabled, type };
    }

    return (
      <Tag {...specificProps} {...props}>
        {React.Children.map(children, node =>
          ['string', 'number'].includes(typeof node) ? (
            <span>{node}</span>
          ) : (
            node
          )
        )}
      </Tag>
    );
  }
)`
  ${reset};

  ${textStyles('normal', 'bold')};
  display: inline-flex;
  vertical-align: top;
  align-items: center;
  border-radius: 2px;
  height: ${props => HEIGHT[props.size]}px;
  padding-left: 0.769em;
  padding-right: 0.769em;
  transition: padding 0.2s ease-in-out, background 0.2s ease-in-out;
  color: ${wf(props => props.theme.colors.black)};
  border: 1px solid transparent;

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
      &:hover,
      &[data-state*='hover'] {
        background-color: ${hoverMod(color)};
      }
      &:active,
      &[data-state*='active'] {
        background-color: ${activeMod(color)};
      }
      &:focus:not(:focus-visible) {
        outline: 0;
      }
      &:focus-visible,
      &[data-state*='focus'] {
        outline: 0;
        box-shadow: 0 0 0 0.5px ${props.theme.background}, 0 0 2px 2px ${color};
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
    props.transparent &&
    css`
      background-color: transparent;
      color: ${props.theme.primary};
    `}

  ${Icon} {
    display: block;
    line-height: 1;
    font-size: ${props => (props.size === 'small' ? 1 : 1.42)}em;
    margin: 5px -6px;
  }

  ${props =>
    React.Children.count(props.children) > 1 &&
    css`
      ${Icon} {
        display: inline-block;
        position: relative;
        font-size: 1em;
        margin-left: 0;
        bottom: -1px;
        margin-left: 0.35em;
        margin-right: 0;
        &:first-child {
          margin-right: 0.35em;
          margin-left: 0;
        }
        &:last-child {
          margin-left: 0.35em;
          margin-right: 0;
        }
      }
    `}
`;

Button.defaultProps = {
  importance: 'secondary',
  size: 'regular',
  type: 'button',
};

// @component
export default Button;
