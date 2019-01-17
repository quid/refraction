// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { textStyles, withFallback as wf } from '@quid/theme';
import { cx } from 'emotion';

import { CELL_HEIGHT, CELL_WIDTH } from './styles';

const Td = styled.td`
  height: ${CELL_HEIGHT + 6}px;
  width: ${CELL_WIDTH}px;
  vertical-align: middle;
  color: ${wf(props =>
    props.current ? props.theme.selected : props.theme.primary
  )};
  ${props =>
    textStyles(cx(props.current && 'bold', props.header && 'secondary'))};
`;

export const Button = styled.button`
  font: inherit;
  background: inherit;
  border: inherit;
  line-height: inherit;
  color: inherit;
  cursor: pointer;

  height: ${CELL_HEIGHT}px;
  width: ${CELL_WIDTH}px;
  border-radius: 2px;
  transition: all 0.2s ease-in-out;

  &:focus:not(:focus-visible) {
    outline: 0;
  }

  ${wf(
    props =>
      props.selected &&
      css`
        background-color: ${props.theme.current === 'light'
          ? props.theme.colors.gray4
          : props.theme.colors.white};
        color: ${props.theme.primaryInverse};
        ${textStyles('bold')(props)}
      `
  )}

  ${wf(
    props =>
      props.disabled &&
      css`
        cursor: default;
        color: ${props.theme.disabled};
      `
  )}
`;

type Props = {
  isCurrent?: boolean,
  isSelected?: boolean,
  isHeader?: boolean,
  onClick?: Function,
  children?: number | string,
  disabled?: boolean,
};

export default function Cell({
  isCurrent,
  isSelected,
  isHeader,
  onClick,
  children,
  disabled,
  ...props
}: Props) {
  return (
    <Td current={isCurrent} header={isHeader} {...props}>
      <Button
        type="button"
        onClick={onClick}
        disabled={disabled || isNaN(children)}
        selected={isSelected}
      >
        {children}
      </Button>
    </Td>
  );
}
