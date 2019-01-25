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
import { withFallback as wf } from '@quid/theme';
import Color from 'color';
import { INPUT_ATTRIBUTES, omit, include } from '../utils/inputPropsFilters';

export const RING_SIZE = 5;
export const WIDTH = 8 + RING_SIZE * 2;
export const HEIGHT = 8 + RING_SIZE * 2;
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

const Circle = styled.div`
  width: ${WIDTH}px;
  height: ${HEIGHT}px;
  border-radius: 50%;
  border-width: 1px;
  border-style: solid;
  border-color: ${wf(props => props.theme.colors.gray3)};
  margin: 1px;
  transition: all 0.2s ease-in-out;

  ${Input}:checked ~ & {
    border-width: ${RING_SIZE}px;
    border-color: ${wf(props => props.theme.selected)};
  }

  ${Input}:focus-visible ~ & {
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

// @component
const InputRadio = styled(props => (
  <label>
    <Input
      {...include(props)([...INPUT_ATTRIBUTES, 'disabled'])}
      type="radio"
    />
    <Circle {...omit(props)(INPUT_ATTRIBUTES)} />
  </label>
))``;

export default InputRadio;
