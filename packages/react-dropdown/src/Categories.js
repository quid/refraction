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

import { type DropdownItemWithIndex } from './Items';

type Props = {
  items: Array<DropdownItem>,
  categories: Array<DropdownCategory>,
  inputValue: ?string,
  getItemProps: GetItemProps,
  twoColumn?: boolean,
  highlightedIndex: ?number | ?string,
  highlight: boolean,
  selectedItems: Array<DropdownSelectedItem>,
  enableCategorySelection: boolean,
  multiselect: boolean,
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

type CategorySelectionProps = {
  categoryId: string | number,
  enabled: boolean,
  children: React.Node,
  getItemProps: GetItemProps,
  items: Array<$Shape<DropdownItemWithIndex>>,
};

export const createCategoryIndex = (categoryId: string | number): string => {
  return `group_${categoryId}`;
};

export const isEntityHighlighted = (
  enabled: boolean = false,
  highlightedIndex: ?number | ?string,
  id: ?number | ?string
): boolean => {
  return (
    enabled === true &&
    id != null &&
    highlightedIndex === createCategoryIndex(id)
  );
};

const CategorySelection = styled(
  ({
    categoryId,
    enabled,
    children,
    getItemProps,
    items,
    ...props
  }: CategorySelectionProps) => {
    if (enabled) {
      return (
        <div
          key={categoryId}
          {...getItemProps({
            index: createCategoryIndex(categoryId),
            item: items,
          })}
          {...props}
        >
          {children}
        </div>
      );
    }

    return children;
  }
)`
  display: flex;
  flex-grow: 1;
  cursor: pointer;
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
  enableCategorySelection,
  multiselect,
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

        const isMultipleCategorySelectionEnabled =
          enableCategorySelection && multiselect;

        const isHighlighted =
          highlightedIndex != null &&
          ((typeof highlightedIndex === 'number' &&
            highlightedIndex >= category.firstIndex &&
            highlightedIndex <= category.lastIndex) ||
            isEntityHighlighted(
              isMultipleCategorySelectionEnabled,
              highlightedIndex,
              categoryId
            ));

        const isSelected = isItemInCategorySelected(
          selectedItems,
          category.items
        );

        return (
          <Categories key={categoryId}>
            <Category twoColumn={twoColumn}>
              {!category.hidden && (
                <Divider
                  isHighlighted={isHighlighted}
                  isSelected={isSelected}
                  twoColumn={twoColumn}
                >
                  <CategorySelection
                    categoryId={categoryId}
                    getItemProps={getItemProps}
                    enabled={isMultipleCategorySelectionEnabled}
                    items={category.items.filter(
                      ({ disabled = false }) => disabled === false
                    )}
                  >
                    <GroupTitle>{category.label}</GroupTitle>
                  </CategorySelection>
                </Divider>
              )}
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
                  enableCategorySelection={enableCategorySelection}
                  multiselect={multiselect}
                />
              </Divider>
            </Category>
          </Categories>
        );
      })}
    </div>
  );
}
