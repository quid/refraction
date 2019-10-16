/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { withFallback as wf } from '@quid/theme';
import DropdownItems from './Items';
import DropdownCategories from './Categories';
import styled from '@emotion/styled/macro';
import Color from 'color';
import {
  type DropdownItem,
  type DropdownCategory,
  type DropdownSelectedItem,
  type GetItemProps,
} from './dropdownTypes.js';

type Props = {
  items: Array<DropdownItem>,
  categories: Array<DropdownCategory>,
  inputValue: ?string,
  getItemProps: GetItemProps,
  useFilter?: boolean,
  filterFn: (Array<DropdownItem>, ?string) => Array<DropdownItem>,
  twoColumn?: boolean,
  highlightedIndex: ?number | ?string,
  selectedItems: Array<DropdownSelectedItem>,
  highlight: boolean,
  enableCategorySelection: boolean,
  multiselect: boolean,
};

export const List = styled.div`
  z-index: 1;
  list-style: none;
  background-color: ${wf(props =>
    props.theme.current === 'light'
      ? props.theme.colors.white
      : props.theme.colors.gray6
  )};
  color: ${wf(props => props.theme.primary)};
  border: 1px solid ${wf(props => props.theme.colors.gray2)};
  border-radius: 2px;
  box-shadow: 0 1px 2px
    ${wf(props =>
      Color(props.theme.colors.black)
        .alpha(0.4)
        .string()
    )};
  min-width: 27.86em;
`;

const DropdownList: React.ComponentType<Props> = styled(
  React.forwardRef(
    (
      {
        items,
        categories,
        inputValue,
        getItemProps,
        useFilter,
        filterFn,
        twoColumn,
        highlightedIndex,
        selectedItems,
        highlight,
        enableCategorySelection,
        multiselect,
        ...props
      }: Props,
      ref: React.ElementRef<any>
    ) => {
      const filteredItems = useFilter ? filterFn(items, inputValue) : items;
      if (filteredItems.length) {
        return (
          <List ref={ref} {...props}>
            {categories.length > 0 ? (
              <DropdownCategories
                categories={categories}
                items={filteredItems}
                getItemProps={getItemProps}
                twoColumn={twoColumn}
                inputValue={inputValue}
                highlightedIndex={highlightedIndex}
                selectedItems={selectedItems}
                highlight={highlight}
                enableCategorySelection={enableCategorySelection}
                multiselect={multiselect}
              />
            ) : (
              <DropdownItems
                items={filteredItems}
                getItemProps={getItemProps}
                inputValue={inputValue}
                highlightedIndex={highlightedIndex}
                selectedItems={selectedItems}
                highlight={highlight}
                multiselect={multiselect}
              />
            )}
          </List>
        );
      }
      return null;
    }
  )
)();

export default DropdownList;
