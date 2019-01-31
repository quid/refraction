/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { withFallback as wf, textStyles } from '@quid/theme';
import { isItemInCategorySelected } from './utils';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import DropdownItems from './Items';

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
  twoColumn?: boolean,
  highlightedIndex: ?number,
  highlight: boolean,
  selectedItems: Array<DropdownSelectedItem>,
};

const Categories = styled.div`
  display: flex;
  flex-direction: row;
  &:not(:last-child) {
    border-bottom: 1px solid ${wf(props => props.theme.colors.gray2)};
  }
`;

const Category = styled.main`
  display: flex;
  flex-direction: ${props => (props.twoColumn ? 'row' : 'column')};
  flex-grow: 1;
`;

export const Divider = styled.section`
  display: flex;
  flex-grow: ${props => (props.twoColumn ? '1' : '0')};
  flex-basis: ${props => (props.twoColumn ? '50%' : 'auto')};

  ${wf(
    props =>
      props.isHighlighted &&
      props.twoColumn &&
      css`
        background-color: ${props.theme.current === 'light'
          ? props.theme.colors.gray1
          : props.theme.colors.gray5};
      `
  )};

  ${wf(
    props =>
      props.twoColumn &&
      css`
        &:first-of-type {
          border-right: 1px solid ${props.theme.colors.gray2};
        }
      `
  )};
`;

const GroupTitle = styled.h3`
  ${textStyles('normal', 'bold')};
  margin: 0;
  display: flex;
  padding: 5px;
`;

export default function DropdownCategories({
  items,
  categories,
  inputValue,
  getItemProps,
  twoColumn,
  highlightedIndex,
  highlight,
  selectedItems,
}: Props) {
  const sortedItems = categories
    .map(category => items.filter(item => item.categoryId === category.id))
    .reduce((acc, category) => acc.concat(category), []);

  // Add index to our items
  const itemsWithIndex = sortedItems
    .sort((a, b) => (String(a.categoryId) < String(b.categoryId) ? -1 : 1))
    .map((item, index) => ({ ...item, index }));

  // put the items inside their categories
  const categoriesedItems = categories.reduce((acc, category) => {
    // find the items of the current category
    const categoryItems = itemsWithIndex.filter(
      item => item.categoryId === category.id
    );

    // if no items are available, skip the category
    return categoryItems.length > 0
      ? [
          ...acc,
          {
            ...category,
            firstIndex: categoryItems[0].index,
            lastIndex: categoryItems.slice(-1)[0].index,
            items: categoryItems,
          },
        ]
      : acc;
  }, []);

  return (
    <div>
      {categoriesedItems.map(category => {
        const categoryId = category.id;
        const isHighlighted =
          highlightedIndex != null &&
          highlightedIndex >= category.firstIndex &&
          highlightedIndex <= category.lastIndex;

        const isSelected = isItemInCategorySelected(
          selectedItems,
          category.items
        );

        return (
          <Categories key={categoryId}>
            <Category twoColumn={twoColumn}>
              <Divider
                isHighlighted={isHighlighted}
                isSelected={isSelected}
                twoColumn={twoColumn}
              >
                <GroupTitle>{category.label}</GroupTitle>
              </Divider>
              <Divider twoColumn={twoColumn}>
                <DropdownItems
                  categoryId={categoryId}
                  twoColumn={twoColumn}
                  items={category.items}
                  getItemProps={getItemProps}
                  inputValue={inputValue}
                  highlightedIndex={highlightedIndex}
                  selectedItems={selectedItems}
                  highlight={highlight}
                />
              </Divider>
            </Category>
          </Categories>
        );
      })}
    </div>
  );
}
