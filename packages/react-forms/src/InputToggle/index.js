// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { withFallback as wf } from '@quid/theme';
import Color from 'color';
import nanoid from 'nanoid';
import { INPUT_ATTRIBUTES, omit, include } from '../utils/inputPropsFilters';

const WIDTH = 40;
const HEIGHT = 20;
const HANDLE_DIAMETER = 16;
const HANDLE_MARGIN = (HEIGHT - HANDLE_DIAMETER) / 2;
const SHADOW = wf(props =>
  Color(props.theme.colors.gray7)
    .alpha(0.8)
    .string()
);
const OUTLINE_ON = wf(props =>
  Color(props.theme.colors.selected)
    .alpha(0.8)
    .string()
);
const OUTLINE_OFF = wf(props =>
  Color(props.theme.colors.gray7)
    .alpha(0.4)
    .string()
);

const Container = styled.label`
  display: inline-block;
  position: relative;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
`;

const Slider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: ${HEIGHT}px;
  width: ${WIDTH}px;
  border-radius: ${HEIGHT}px;
  background-color: ${wf(props => props.theme.colors.gray2)};
  transition: all 0.2s ease-in-out;

  ${props =>
    props.disabled &&
    css`
      opacity: 0.4;
    `}
`;

const Handle = styled.label`
  position: absolute;
  cursor: pointer;
  top: ${HANDLE_MARGIN}px;
  left: ${HANDLE_MARGIN}px;
  width: ${HANDLE_DIAMETER}px;
  height: ${HANDLE_DIAMETER}px;
  border-radius: ${HANDLE_DIAMETER}px;
  background-color: ${wf(props => props.theme.colors.white)};
  transform: translateX(0px);
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 4px ${SHADOW};
  }

  ${props =>
    props.disabled &&
    css`
      cursor: default;
      &:hover {
        box-shadow: none;
      }
    `}
`;

const Input = styled.input`
  opacity: 0;
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;

  &:focus-visible ~ ${Handle} {
    box-shadow: 0 0 2px 2px ${OUTLINE_OFF};
  }

  &:checked&:focus-visible ~ ${Handle} {
    box-shadow: 0 0 2px 2px ${OUTLINE_ON};
  }

  &:checked ~ ${Slider} {
    background-color: ${wf(props => props.theme.colors.selected)};
  }

  &:checked ~ ${Handle} {
    transform: translateX(${WIDTH - HANDLE_DIAMETER - HANDLE_MARGIN * 2}px);
  }

  &:not(:disabled) ~ ${Handle}:active {
    width: ${HANDLE_DIAMETER * 1.25}px;
  }

  &:checked:not(:disabled) ~ ${Handle}:active {
    margin-left: -${HANDLE_DIAMETER * 0.25}px;
  }
`;

type Props = {
  disabled?: boolean,
};

type State = {
  id: string,
};

class InputToggle extends React.Component<Props, State> {
  state = {
    id: `quid-${nanoid()}`,
  };

  render() {
    const isDisabled = this.props.disabled;
    return (
      <Container {...omit(this.props)(INPUT_ATTRIBUTES)}>
        <Input
          {...include(this.props)([...INPUT_ATTRIBUTES, 'disabled'])}
          id={this.state.id}
          type="checkbox"
        />
        <Slider disabled={isDisabled} />
        <Handle disabled={isDisabled} htmlFor={this.state.id} />
      </Container>
    );
  }
}

export default InputToggle;
