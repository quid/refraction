/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { css } from 'emotion';
import styled from '@emotion/styled/macro';
import { textStyles, withFallback as wf } from '@quid/theme';
import InvalidHandler from '@quid/react-invalid-handler';
import { INPUT_ATTRIBUTES, omit, include } from '../utils/inputPropsFilters';
import mergeRefs from '../utils/mergeRefs';

type RenderProp<P> = P => React.Node;

type Props = {
  type?: string,
  size?: 'regular' | 'large' | 'small',
  renderAddon?: RenderProp<{
    onClick: (SyntheticEvent<Element>) => void,
    marginRightClass: string,
  }>,
  as?: string,
  onChange?: (SyntheticInputEvent<any>) => void,
  validationErrorMessage?: string,
  focus?: boolean,
};

// istanbul ignore next
const noop = () => undefined;

export const HEIGHT = {
  large: 50,
  small: 24,
  regular: 32,
};

export const PADDING = {
  large: 15,
  small: 5,
  regular: 10,
};

export const Input = styled.input`
  all: unset;
  min-width: 0;
  align-self: stretch;
  flex: 1;
  padding: 0 ${props => PADDING[props.size || 'regular']}px;
  line-height: ${props => HEIGHT[props.size || 'regular'] - 4}px;

  // needed to remove :invalid red border in Firefox
  box-shadow: none;

  &[type='number'],
  &[type='date'] {
    -moz-appearance: textfield;
    -webkit-appearance: none;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button,
    &::-webkit-calendar-picker-indicator,
    &::-webkit-inner-spin-button,
    &::-webkit-clear-button {
      -webkit-appearance: none;
      appearance: none;
      margin: 0;
      display: none;
    }
  }
  &:focus {
    outline: 0;
  }
  &:not(:last-child) {
    padding-right: ${props => PADDING[props.size || 'regular']}px;
  }
  &::placeholder {
    color: ${wf(props => props.theme.colors.gray3)};
  }
  &:disabled::placeholder {
    color: ${wf(props => props.theme.colors.gray2)};
  }
`;

const Container = styled.div`
  ${textStyles('normal')}
  vertical-align: top;

  display: inline-flex;
  align-items: center;
  border: 1px solid
    ${wf(props =>
      props.isInvalid
        ? /* istanbul ignore next */ props.theme.colors.red
        : props.disabled
        ? props.theme.colors.gray1
        : props.theme.colors.gray3
    )};
  transition: border 0.2s ease-in-out;
  border-radius: 2px;
  height: ${props => HEIGHT[props.size || 'regular']}px;
  background-color: transparent;
  color: ${wf(props =>
    props.disabled ? props.theme.colors.gray2 : props.theme.primary
  )};

  &:focus-within ${props => props.focus && ', &'} {
    border-color: ${wf(props =>
      props.isInvalid
        ? /* istanbul ignore next */ props.theme.colors.red
        : props.theme.colors.selected
    )};
  }
`;

const InputText: React.StatelessFunctionalComponent<Props> = styled(
  React.forwardRef(
    ({ onChange, validationErrorMessage, as, ...props }: Props, ref) => {
      const input = React.createRef();
      return (
        <InvalidHandler errorMessage={validationErrorMessage}>
          {(getInputProps, isInvalid) => (
            <Container {...omit(props)(INPUT_ATTRIBUTES)} isInvalid={isInvalid}>
              <Input
                ref={mergeRefs(input, ref)}
                as={as}
                {...include(props)([...INPUT_ATTRIBUTES, 'disabled'])}
                {...getInputProps({ onChange })}
              />
              {props.renderAddon &&
                props.renderAddon({
                  onClick: () =>
                    input.current
                      ? input.current.focus()
                      : /* istanbul ignore next */ noop(),
                  marginRightClass: css`
                    margin-right: ${PADDING[props.size || 'regular']}px;
                  `,
                })}
            </Container>
          )}
        </InvalidHandler>
      );
    }
  )
)();

// @component
export default InputText;
