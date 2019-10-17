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
import { withFallback as wf } from '@quid/theme';
import HighlightValue from './HighlightValue';
import { includesId } from './utils';
import Color from 'color';
import {
  type DropdownItem,
  type DropdownSelectedItem,
  type GetItemProps,
  type HighlightedIndex,
} from './dropdownTypes.js';
import { isCategoryHighlighted } from './Categories';

export type DropdownItemWithIndex = DropdownItem & { index?: number };

type Props = {
  categoryId?: number | string,
  twoColumn?: boolean,
  items: Array<$Shape<DropdownItemWithIndex>>,
  getItemProps: GetItemProps,
  inputValue: ?string,
  highlightedIndex: ?HighlightedIndex,
  highlight: boolean,
  selectedItems: Array<DropdownSelectedItem>,
  multiselect: boolean,
};

const Items = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const HIGHLIGHTED = (props: { theme: Object }) =>
  props.theme.current === 'light'
    ? props.theme.colors.gray1
    : props.theme.colors.gray5;

export const SELECTED = (props: { theme: Object }) => props.theme.colors.gray3;

export const Item = styled.li`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  padding: 5px;
  background-color: ${wf(props =>
    props.isSelected && props.isHighlighted
      ? Color(HIGHLIGHTED(props))
          .mix(Color(SELECTED(props)))
          .string()
      : props.isHighlighted
      ? HIGHLIGHTED(props)
      : props.isSelected
      ? SELECTED(props)
      : 'transparent'
  )};
  ${wf(
    props =>
      ((props.isHighlighted && props.theme.current === 'light') ||
        props.isSelected) &&
      css`
        color: ${props.theme.current === 'light'
          ? props.theme.primary
          : props.theme.primaryInverse};
      `
  )};

  ${wf(
    props =>
      props.twoColumn &&
      props.categoryId &&
      css`
        &:not(:last-child) {
          border-bottom: 1px solid ${props.theme.colors.gray2};
        }
      `
  )};
`;

export default function DropdownItems({
  twoColumn,
  items,
  getItemProps,
  inputValue,
  highlightedIndex,
  selectedItems,
  categoryId,
  highlight,
  multiselect,
  ...props
}: Props) {
  return (
    <Items>
      {items.map((item, i) => {
        const itemIndex = item.hasOwnProperty('index') ? item.index : i;

        const isHighlighted =
          itemIndex === highlightedIndex ||
          isCategoryHighlighted(multiselect, highlightedIndex, categoryId);

        const isSelected = includesId(selectedItems, item.id);
        const isDisabled = Boolean(item.disabled);
        const { index, ...itemWithoutIndex } = item;

        return (
          <Item
            key={item.id}
            isHighlighted={isHighlighted}
            isSelected={isSelected}
            categoryId={categoryId}
            twoColumn={twoColumn}
            {...getItemProps({
              index: itemIndex,
              item: [itemWithoutIndex],
              disabled: isDisabled,
            })}
          >
            {item.children ? (
              item.children({
                isHighlighted: isHighlighted,
                isSelected: isSelected,
                isDisabled: isDisabled,
                item,
              })
            ) : (
              <HighlightValue
                highlight={highlight}
                value={item.label}
                valueToHighlight={inputValue}
                disabled={isDisabled}
              />
            )}
          </Item>
        );
      })}
    </Items>
  );
}
