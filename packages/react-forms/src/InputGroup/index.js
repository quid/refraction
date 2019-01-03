// @flow
import * as React from 'react';
import { css, cx } from 'emotion';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';
import InvalidHandler from '../InvalidHandler';

const toArray = (children): Array<React.Element<any> | Function> =>
  React.Children.toArray(children).length
    ? React.Children.toArray(children)
    : Array.isArray(children)
    ? children
    : [];

type Props = {
  children: React.Node,
  className?: ?string,
  onChange?: (SyntheticInputEvent<any>) => void,
  onInvalid?: (SyntheticInputEvent<any>) => void,
  validationErrorMessage?: string,
};

const InputGroup = styled(
  ({
    children,
    className,
    onChange,
    onInvalid,
    validationErrorMessage,
    ...props
  }: Props) => (
    <InvalidHandler errorMessage={validationErrorMessage}>
      {(getInputProps, isInvalid) => (
        <fieldset
          className={className}
          data-invalid={isInvalid}
          {...getInputProps({ onChange, onInvalid })}
          {...props}
        >
          {React.Children.toArray(
            toArray(children).map((child, i) => {
              const className =
                i === 0
                  ? css`
                      border-radius: 1px 0 0 1px;
                      border-left: 0;
                      border-top: 0;
                      border-bottom: 0;
                    `
                  : i === toArray(children).length - 1
                  ? css`
                      border-radius: 0 1px 1px 0;
                      border-right: 0;
                      border-top: 0;
                      border-bottom: 0;
                    `
                  : css`
                      border-radius: 0;
                      border-top: 0;
                      border-bottom: 0;
                    `;

              return typeof child === 'function'
                ? child(className)
                : React.cloneElement(child, { className });
            })
          )}
        </fieldset>
      )}
    </InvalidHandler>
  )
)`
  all: unset;
  display: inline-block;
  border-radius: 2px;
  transition: 0.2s ease-in-out border-color;
  border: 1px solid ${wf(props => props.theme.colors.gray3)};
  &:focus-within {
    border-color: ${wf(props => props.theme.colors.selected)};
  }

  &[data-invalid='true'] {
    border-color: ${wf(props => props.theme.colors.red)};
  }
`;

// @component
export default InputGroup;
