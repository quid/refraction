/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { GroupedVirtuoso } from 'react-virtuoso';
import {
  ThemeProvider,
  themes,
  textStyles,
  withFallback as wf,
} from '@quid/theme';
import { Icon, Text } from '@quid/react-core';
import { Container } from '@quid/react-tooltip';
import isPropValid from '@emotion/is-prop-valid';

const BG_COLOR = wf(({ theme }) =>
  theme.current === 'light' ? theme.colors.gray0 : theme.colors.gray7
);
const INACTIVE_COLOR = wf(({ theme }) =>
  theme.current === 'light' ? theme.colors.gray3 : theme.colors.gray5
);
const BORDER_COLOR = wf(({ theme }) =>
  theme.current === 'light' ? theme.colors.gray1 : theme.colors.gray6
);
const FLEX_ALIGN_MAP = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};
const alignToFlex = (align = 'left') => FLEX_ALIGN_MAP[align];

export const ColumnCell = styled.div`
  box-sizing: border-box;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  width: ${props => props.width};
  justify-content: ${props => alignToFlex(props.align)};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 ${wf(props => props.theme.sizes.small)};
  ${wf(props =>
    textStyles(...[props.bold ? 'bold' : null].filter(Boolean))(props)
  )};
  color: ${themes.dark.primary};
`;

export const Row = styled.div`
  display: flex;
  align-items: stretch;
  position: relative;
  height: 40px;
  cursor: pointer;
  padding: 0 ${wf(props => props.theme.sizes.regular)};
  &::before,
  &::after {
    content: '';
    position: absolute;
    background-color: ${INACTIVE_COLOR};
    transition: transform 0.2s ease-in-out;
  }
  &::before {
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    transform: scaleX(${({ open }) => (open ? 1 : 0)});
  }
  &::after {
    left: 0;
    bottom: 0;
    right: 0;
    height: 1px;
    transform: scaleY(${({ open }) => (open ? 1 : 0)});
  }
  &:not(:focus-visible) {
    outline: 0;
  }
  &:focus-visible {
    box-shadow: inset 0 0 0 1px ${wf(props => props.theme.selected)};
    z-index: 1;
  }
`;

export const ExpandableContent = styled.div`
  box-shadow: inset 0 -2px 2px -2px ${INACTIVE_COLOR};
  background-color: ${BG_COLOR};
`;

export const List = styled(GroupedVirtuoso, {
  shouldForwardProp: prop =>
    ['group', 'item', 'groupCounts'].includes(prop) || isPropValid(prop),
})`
  color: ${wf(props => props.theme.primary)};
  background-color: ${BG_COLOR};
  border: 2px solid ${BORDER_COLOR};
  border-radius: 2px;
  max-height: ${props => (props.maxHeight ? `${props.maxHeight}px` : 'auto')};
`;

export const Header = styled.header`
  display: flex;
  align-items: stretch;
  background-color: ${BG_COLOR};
  border-bottom: 1px solid ${wf(props => props.theme.selected)};
  border-radius: 2px 2px 0 0;
  padding: 0 ${wf(props => props.theme.sizes.regular)};
  height: 40px;
  font-weight: bold;

  ${Container} {
    font-weight: regular;
  }
`;

export const AngleButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${wf(props => (props.open ? 180 : 0))}deg);
  transition: transform 0.5s ease-out;
  ${textStyles('xlarge')};
  border-radius: 50%;
  width: 20px;
  height: 20px;
  &:focus-visible {
    box-shadow: 0 0 2px 2px ${wf(props => props.theme.selected)};
  }
`;

export const Ellipsis = styled(props => (
  <Text title={props.children} {...props} />
))`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const HeaderTitle = styled(Ellipsis)`
  margin-top: -2px;
  cursor: pointer;
  user-select: none;
  color: ${wf(props =>
    props.inactive ? INACTIVE_COLOR(props) : props.theme.primary
  )};
  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;
HeaderTitle.defaultProps = {
  tabIndex: -1,
};

export const InfoIcon = styled(
  React.forwardRef((props, ref) => (
    <button type="button" {...props} ref={ref}>
      <Icon name="question_circle" />
    </button>
  ))
)`
  all: unset;
  cursor: pointer;
  color: ${INACTIVE_COLOR};
  margin-left: ${wf(props => props.theme.sizes.small)};
  flex-shrink: 0;

  &:hover,
  &:focus-visible {
    color: ${wf(props => props.theme.primary)};
  }
`;

const SortAsc = styled(props => <Icon name="sort_asc" {...props} />)``;
const SortDesc = styled(props => <Icon name="sort_desc" {...props} />)``;
const NEXT_ARROW = props =>
  props.sort == null ? SortDesc : props.sort === 'desc' ? SortAsc : false;
const ACTIVE_ARROW = props =>
  props.sort === 'desc' ? SortDesc : props.sort === 'asc' ? SortAsc : false;

export const SortIcon = styled(
  React.forwardRef(({ sort, ...props }, ref) => (
    <button type="button" {...props} ref={ref}>
      <SortAsc />
      <SortDesc />
    </button>
  ))
)`
  all: unset;
  display: inline-block;
  position: relative;
  height: 14px;
  width: 14px;
  cursor: pointer;
  margin-left: ${wf(props => props.theme.sizes.small)};
  flex-shrink: 0;

  ${SortAsc}, ${SortDesc} {
    position: absolute;
    top: 0;
    left: 0;
    color: ${INACTIVE_COLOR};
  }

  ${wf(
    props =>
      ACTIVE_ARROW(props) &&
      css`
        ${ACTIVE_ARROW(props)} {
          color: ${props.theme.selected};
        }
      `
  )}

  &:hover,
  &:focus-visible {
    ${wf(
      props =>
        NEXT_ARROW(props) &&
        css`
          ${NEXT_ARROW(props)} {
            color: ${props.theme.primary};
          }
        `
    )}
  }
`;

export const TooltipContainer = styled(
  React.forwardRef(({ children, ...props }, ref) => (
    <ThemeProvider theme="light">
      <Container {...props} ref={ref}>
        {children}
      </Container>
    </ThemeProvider>
  ))
)`
  font-weight: normal;
  color: ${themes.light.primary};
`;
