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
import { keyframes } from '@emotion/core';
import { withFallback as wf } from '@quid/theme';
import Color from 'color';
import { INPUT_ATTRIBUTES, omit, include } from '../utils/inputPropsFilters';

export const WIDTH = 18;
export const HEIGHT = 18;
const OUTLINE_OFF = wf(props =>
  Color(props.theme.colors.gray3)
    .alpha(0.8)
    .string()
);
const OUTLINE_ON = wf(props =>
  Color(props.theme.colors.selected)
    .alpha(0.8)
    .string()
);
export const OUTLINE_HOVER = wf(props =>
  Color(
    props.theme.current === 'light'
      ? props.theme.colors.gray7
      : props.theme.colors.gray2
  )
    .alpha(0.8)
    .string()
);

const Input = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
`;

const check = keyframes`
  0% {
    box-shadow: 20.5px -7.5px 0 10px currentColor;
  }
  50% {
    box-shadow: 25.8px -7.5px 0 10px currentColor;
  }
  100% {
    box-shadow: 25.8px -21.5px 0 10px currentColor;
  }
`;

const uncheck = keyframes`
  from {
    box-shadow: inset 0 0 0 ${WIDTH / 2}px currentColor;
  }
  to {
    box-shadow: inset 0 0 0 0 currentColor;
  }
`;

const Checkbox = styled.div`
  position: relative;
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  border-radius: 2px;
  color: ${wf(props => props.theme.selected)};
  border: 1px solid ${wf(props => props.theme.colors.gray3)};
  margin: 1px;
  overflow: hidden;
  transition: box-shadow 0.2s ease-in-out;

  ${Input}:checked ~ & {
    color: ${wf(props =>
      props.disabled ? props.theme.colors.gray3 : props.theme.selected
    )};
    border: 1px solid ${wf(props => props.theme.selected)};
  }

  &::before,
  &::after {
    content: '';
    display: none;
    position: absolute;
  }

  ${Input}:not(:checked) ~ &::before {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    color: ${wf(props => props.theme.colors.gray3)};
    animation: ${uncheck} 0s ease-in forwards;
  }
  ${Input}:focus:not(:checked) ~ &::before {
    animation: ${uncheck} 0.2s ease-in forwards;
  }

  ${Input}:checked ~ &::before {
    display: block;
    top: -10px;
    left: -10px;
    width: ${(WIDTH - 2) * 2}px;
    height: ${(HEIGHT - 2) * 2}px;
    transform: rotate(45deg);
    outline: 1px solid green;
    box-shadow: inset 7.5px -3px 0 7px currentColor,
      inset -3.5px -3px 0 7px currentColor,
      inset -3.5px 1.5px 0 7px currentColor;
  }

  ${Input}:checked ~ &::after {
    display: block;
    width: ${WIDTH - 2}px;
    height: ${HEIGHT - 2}px;
    background-color: currentColor;
    transform: rotate(45deg) translateX(-7.2px) translateY(-4px);
    transition: all 0.2s ease-in-out;
    box-shadow: 20.5px -7.5px 0 10px currentColor;
  }

  ${Input}:checked ~ &::after {
    animation: ${check} 0s ease-in forwards;
  }
  ${Input}:checked:focus ~ &::after {
    animation: ${check} 0.4s ease-in forwards;
  }

  ${Input}:focus-visible ~ & {
    box-shadow: 0 0 0 0.5px ${wf(props => props.theme.background)},
      0 0 2px 2px ${OUTLINE_OFF};
  }
  ${Input}:checked:focus-visible ~ & {
    box-shadow: 0 0 0 0.5px ${wf(props => props.theme.background)},
      0 0 2px 2px ${OUTLINE_ON};

    &:hover {
      box-shadow: 0 0 0 0.5px ${wf(props => props.theme.background)},
        0 0 2px 2px ${OUTLINE_ON}, 0 0 4px ${OUTLINE_HOVER};
    }
  }

  &:hover {
    box-shadow: 0 0 4px ${OUTLINE_HOVER};
  }

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
      &:hover {
        box-shadow: none;
      }
    `}
`;

type Props = {};

const InputCheckbox: React.StatelessFunctionalComponent<Props> = styled(
  props => (
    <label>
      <Input {...include(props)(INPUT_ATTRIBUTES)} type="checkbox" />
      <Checkbox {...omit(props)(INPUT_ATTRIBUTES)} disabled={props.disabled} />
    </label>
  )
)``;

// @component
export default InputCheckbox;
