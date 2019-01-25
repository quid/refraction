/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';

export const BASE_HANDLE_SIZE = 6;
export const HANDLE_SIZE = BASE_HANDLE_SIZE;
export const TICK_HEIGHT = 6;
export const TICK_WIDTH = 2;

export const TRACK_BACKGROUND = (props: Object) =>
  props.theme.current === 'light'
    ? props.theme.colors.gray4
    : props.theme.colors.gray2;

export const Container = styled.div`
  position: relative;
  height: ${HANDLE_SIZE * 2}px;
  isolation: isolate;
`;

export const Track = styled.div`
  position: relative;
  top: 50%;
  background-position: center;
  background-size: 100% 2px;
  background-repeat: no-repeat;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    height: ${props => (props.disabled ? HANDLE_SIZE / 1.5 : HANDLE_SIZE)}px;
    width: 100%;
    transform: translateY(-25%);
  }
`;

export const Segment = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  color: ${wf(props =>
    props.on ? TRACK_BACKGROUND(props) : props.theme.selected
  )};
`;

export const Tick = styled.div`
  height: ${TICK_HEIGHT}px;
  width: ${TICK_WIDTH}px;
  position: relative;
  transform: translateX(${TICK_WIDTH / 2}px) translateY(${TICK_HEIGHT / 2}px);
  color: ${wf(props => props.theme.selected)};
  border-radius: ${TICK_WIDTH}px;
  background-color: ${wf(TRACK_BACKGROUND)};
  opacity: ${props => (props.hidden ? 0 : 1)};

  &:first-of-type {
    transform: translateY(${TICK_HEIGHT / 2}px);
  }
`;

export const StepTicks = styled(({ step, max, min, hidden, ...props }) => (
  <div {...props}>
    {Array(Math.ceil((max - min) / step) + 2)
      .fill()
      .map((_, key) => (
        <Tick key={key} hidden={hidden.includes(key)} />
      ))}
  </div>
))`
  pointer-events: none;
  z-index: 1;
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  justify-content: space-between;
`;
