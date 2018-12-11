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
  ({ to, href, transparent, size, importance, disabled, ...props }: Props) => {
    let Tag, specificProps;
    if (to && !disabled) {
      Tag = Link;
      specificProps = { to };
    } else if ((href || to) && !disabled) {
      Tag = 'a';
      specificProps = { href };
    } else {
      Tag = 'button';
      specificProps = { disabled };
    }

    return <Tag {...specificProps} {...props} />;
  }
)`
  ${reset}

  ${textStyles('normal', 'bold')}
  display: inline-block;
  border-radius: 2px;
  line-height: ${props => (props.size === 'small' ? 1.9 : 2.3)};
  padding-left: 0.769em;
  padding-right: 0.769em;
  transition: padding 0.2s ease-in-out, background 0.2s ease-in-out;
  color: ${wf(props => props.theme.colors.black)};

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

  ${Icon} {
      display: block;
      line-height: 1;
      font-size: 1.42em;
      margin-left: -6px;
      margin-right: -6px;
      margin-top: 5px;
      margin-bottom: 5px;

      ${props =>
        props.size === 'small' &&
        css`
          font-size: 1em;
        `}

      ${props =>
        React.Children.count(props.children) > 1 &&
        css`
          display: inline-block;
          position: relative;
          font-size: 1em;
          margin-left: 0;
          bottom: -1px;
          margin-right: 0.35em;
        `}
  }
`;

Button.defaultProps = {
  importance: 'primary',
  size: 'regular',
};

// @component
export default Button;
