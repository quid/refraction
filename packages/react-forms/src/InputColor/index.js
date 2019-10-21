/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import callAll from '../utils/callAll';
import InputGroup from '../InputGroup';
import InputText, { HEIGHT } from '../InputText';
import Button from '../Button';
import { Icon } from '@quid/react-core';

type Props = {
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  className?: string,
  style?: Object,
  innerRef?: React.ElementRef<any>,
  disabled?: boolean,
  defaultValue?: string,
  size?: typeof Button.Size,
};

type State = {
  color: string,
  buttonState: Array<string>,
};

const addState = (...states) => ({ buttonState }) => ({
  buttonState: [...new Set([...buttonState, ...states])],
});
const removeState = (...states) => ({ buttonState }) => ({
  buttonState: buttonState.filter(s => !states.includes(s)),
});

const ColorSelector = styled.input`
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  cursor: pointer;

  &:focus:not(:focus-visible) ~ ${Button} {
    box-shadow: none;
  }
`;

const Wrapper = styled.div`
  display: inline-flex;
  position: relative;
  height: ${props => HEIGHT[props.size || 'regular']}px;
`;

class InnerInput extends React.Component<Props, State> {
  state = {
    color: this.props.defaultValue || '#000000',
    buttonState: [],
  };

  static getDerivedStateFromProps(props, state) {
    return { color: props.value || state.color };
  }

  input = React.createRef();

  updateColor = ({ target: { value } }) =>
    this.setState({ color: String(value).toUpperCase() });

  render() {
    const {
      className,
      style,
      disabled,
      innerRef,
      onChange,
      ...props
    } = this.props;
    return (
      <InputGroup style={style} className={className}>
        {cn => (
          <InputText
            {...props}
            className={cn}
            onChange={callAll(this.updateColor, onChange)}
            value={this.state.color}
            maxLength={7}
            disabled={disabled}
          />
        )}
        {cn => (
          <Wrapper size={props.size}>
            <ColorSelector
              type="color"
              value={this.state.color}
              onChange={callAll(this.updateColor, onChange)}
              onMouseDown={() => this.setState(addState('active'))}
              onMouseUp={() => this.setState(removeState('active'))}
              onMouseEnter={() => this.setState(addState('hover'))}
              onMouseLeave={() => this.setState(removeState('hover', 'active'))}
              onFocus={() => this.setState(addState('focus'))}
              onBlur={() => this.setState(removeState('focus', 'active'))}
              ref={innerRef}
              disabled={disabled}
            />
            <Button
              importance="secondary"
              {...props}
              className={cn}
              tabIndex={-1}
              data-state={this.state.buttonState.join(' ')}
              disabled={disabled}
            >
              <Icon name="tint" style={{ color: this.state.color }} />
            </Button>
          </Wrapper>
        )}
      </InputGroup>
    );
  }
}

const InputColor: React.StatelessFunctionalComponent<Props> = styled(
  React.forwardRef((props, ref) => <InnerInput {...props} innerRef={ref} />)
)();

// @component
export default InputColor;
