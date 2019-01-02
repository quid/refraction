// @flow
import * as React from 'react';
import { css } from 'emotion';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';

const toArray = (children): Array<React.Element<any> | Function> =>
  React.Children.toArray(children).length
    ? React.Children.toArray(children)
    : Array.isArray(children)
    ? children
    : [];

type Props = {
  children: React.Node,
  className?: ?string,
};

const InputGroup = styled(({ children, className, ...props }: Props) => (
  <div className={className}>
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
  </div>
))`
  display: inline-block;
  border-radius: 2px;
  transition: 0.2s ease-in-out border-color;
  border: 1px solid ${wf(props => props.theme.colors.gray3)};
  &:focus-within {
    border-color: ${wf(props => props.theme.colors.selected)};
  }
`;

// @component
export default InputGroup;
