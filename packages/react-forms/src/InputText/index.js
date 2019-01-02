// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { textStyles, withFallback as wf } from '@quid/theme';
import InvalidHandler from '../InvalidHandler';

type RenderProp<P> = P => React.Node;

type Props = {
  type?: string,
  size?: 'regular' | 'large' | 'small',
  renderAddon?: RenderProp<{ onClick: (SyntheticEvent<Element>) => void }>,
  as?: string,
  onChange?: (SyntheticInputEvent<any>) => void,
  validationErrorMessage?: string,
};

const omit = obj => keys =>
  Object.keys(obj)
    .filter(key => !keys.includes(key))
    .reduce((acc, current) => {
      acc[current] = obj[current];
      return acc;
    }, {});

const include = obj => keys =>
  Object.keys(obj)
    .filter(key => keys.includes(key))
    .reduce((acc, current) => {
      acc[current] = obj[current];
      return acc;
    }, {});

// istanbul ignore next
const mergeRefs = (...refs: Array<any>) => (ref: any) => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else if (resolvableRef != null) {
      (resolvableRef: any).current = ref;
    }
  });
};

// istanbul ignore next
const noop = () => undefined;

const INPUT_ATTRIBUTES = [
  'autoComplete',
  'autoFocus',
  'defaultValue',
  'form',
  'list',
  'min',
  'max',
  'name',
  'onChange',
  'placeholder',
  'readOnly',
  'required',
  'tabIndex',
  'type',
  'value',
];

const HEIGHT = {
  large: 50,
  small: 24,
  regular: 32,
};

const PADDING = {
  large: 15,
  small: 5,
  regular: 10,
};

const Input = styled.input`
  all: unset;
  min-width: 0;
  align-self: stretch;
  flex: 1;

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
  padding: 0 ${props => PADDING[props.size || 'regular']}px;
  height: ${props => HEIGHT[props.size || 'regular']}px;
  background-color: transparent;
  color: ${wf(props =>
    props.disabled ? props.theme.colors.gray2 : props.theme.colors.primary
  )};

  &:focus-within {
    border-color: ${wf(props =>
      props.isInvalid
        ? /* istanbul ignore next */ props.theme.colors.red
        : props.theme.colors.selected
    )};
  }
`;

const InputText: React.StatelessFunctionalComponent<Props> = styled(
  React.forwardRef(
    ({ onChange, validationErrorMessage, ...props }: Props, ref) => {
      const input = React.createRef();
      return (
        <InvalidHandler errorMessage={validationErrorMessage}>
          {(getInputProps, isInvalid) => (
            <Container {...omit(props)(INPUT_ATTRIBUTES)} isInvalid={isInvalid}>
              <Input
                ref={mergeRefs(input, ref)}
                {...include(props)([...INPUT_ATTRIBUTES, 'disabled'])}
                {...getInputProps({ onChange })}
              />
              {props.renderAddon &&
                props.renderAddon({
                  onClick: () =>
                    input.current
                      ? input.current.focus()
                      : /* istanbul ignore next */ noop(),
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
