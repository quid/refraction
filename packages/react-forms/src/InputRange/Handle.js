// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { keyframes } from '@emotion/core';
import { withFallback as wf } from '@quid/theme';
import Color from 'color';
import { TRACK_BACKGROUND, HANDLE_SIZE } from './styles';

const pulseBg = props =>
  Color(props.theme.colors.quidTeal)
    .alpha(0.26)
    .string();

const pulse = wf(
  props => keyframes`
    from {
       box-shadow: 0 0 0 0 ${pulseBg(props)};
    }
    to {
      box-shadow: 0 0 0 ${HANDLE_SIZE / 2}px ${pulseBg(props)};
    }
`
);

const handleTransform = props => css`
  transform: scale(${props.disabled ? 2 : 3});
  transition-delay: 0s;
`;

type Props = {
  offset: number,
  dragging?: boolean,
  value?: number,
  name?: string,
  disabled?: boolean,
  readOnly?: boolean,
  zero?: boolean,
};

const Handle = styled(
  ({ dragging, value, name, disabled, readOnly, zero, ...props }: Props) => (
    <div
      tabIndex={!disabled ? 0 : undefined}
      data-action="drag-handle"
      data-value={value}
      {...props}
    >
      <input
        type="hidden"
        value={value}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
      />
    </div>
  )
)`
  ${wf(
    props =>
      !(props.disabled || props.readOnly) &&
      css`
        color: ${props.theme.selected};
      `
  )}
  top: 50%;
  left: 0;
  position: absolute;
  width: ${HANDLE_SIZE}px;
  height: ${HANDLE_SIZE}px;
  margin-top: ${HANDLE_SIZE / -2}px;
  cursor: default;
  z-index: 2;
  transform: translateX(calc(${props => props.offset}px - 50%));
  &::before {
    content: '';
    display: block;
    background-color: ${wf(props =>
      props.disabled
        ? TRACK_BACKGROUND(props)
        : props.zero
        ? 'transparent'
        : 'currentColor'
    )};
    width: ${HANDLE_SIZE}px;
    height: ${HANDLE_SIZE}px;
    transform: scale(2);
    border-radius: 50%;
    transition: transform 0.2s ease-in-out, width 0.2s ease-in-out,
      height 0.2s ease-in-out;
    ${wf(
      props =>
        props.zero &&
        css`
          border: 1px solid ${TRACK_BACKGROUND(props)};
        `
    )}
  }

  &:active::before {
    ${handleTransform}
  }

  ${props =>
    props.dragging &&
    css`
      &::before {
        ${handleTransform(props)}
      }
    `}

  &:focus {
    outline: 0;
  }

  &:focus-visible::before {
    animation: ${pulse} 1s infinite alternate ease-in-out;
  }
`;

export default Handle;
