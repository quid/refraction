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
import { Icon } from '@quid/react-core';
import InputText from '../InputText';

type Props = {
  step?: number,
  disabled?: boolean,
  readOnly?: boolean,
  unit?: string,
  onChange?: (SyntheticInputEvent<any> | Event) => void,
};

const Addon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  justify-content: center;
`;

const Unit = styled.div`
  margin-left: -0.7em;
  margin-right: 0.7em;
`;

const Caret = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  &:focus-visible {
    box-shadow: 0 0 0 0.5px ${wf(props => props.theme.background)},
      0 0 2px 2px ${wf(props => props.theme.selected)};
  }
  &:not(:disabled):active {
    color: ${wf(props => props.theme.selected)};
  }
`;

const InputNumber = styled(
  ({
    step = 1,
    disabled = false,
    readOnly = false,
    unit,
    onChange,
    ...props
  }: Props) => {
    const input = React.createRef();
    const dispatchChange = React.useCallback(() => {
      const event = new Event('change');
      input.current && input.current.dispatchEvent(event);
      onChange && onChange(event);
    }, [input, onChange]);

    return (
      <InputText
        ref={input}
        type="number"
        step={step}
        disabled={disabled}
        readOnly={readOnly}
        renderAddon={({ marginRightClass }) => (
          <React.Fragment>
            <Unit>{unit}</Unit>
            <Addon className={marginRightClass}>
              <Caret
                disabled={disabled || readOnly}
                onClick={() => {
                  input.current && input.current.stepUp(step);
                  dispatchChange();
                }}
              >
                <Icon name="caret_up" />
              </Caret>
              <Caret
                disabled={disabled || readOnly}
                onClick={() => {
                  input.current && input.current.stepDown(step);
                  dispatchChange();
                }}
              >
                <Icon name="caret_down" />
              </Caret>
            </Addon>
          </React.Fragment>
        )}
        onChange={onChange}
        {...props}
      />
    );
  }
)`
  text-align: right;
`;

// @component
export default InputNumber;
