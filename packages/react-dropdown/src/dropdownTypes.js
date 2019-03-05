/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import { type PropGetters } from 'downshift';

export type DropdownItem = {
  id: number | string,
  label: string,
  categoryId?: number | string,
  disabled?: boolean,
  children?: ({
    isSelected: boolean,
    isDisabled: boolean,
    isHighlighted: boolean,
    item: DropdownItem,
  }) => React.Node,
};

export type DropdownCategory = {
  id: number | string,
  label: string,
  hidden?: boolean,
};

export type ExtendedCategory = DropdownCategory & {
  items?: Array<DropdownItem>,
};

export type DropdownSelectedItem = {
  id: number | string,
  label?: string,
};

export type GetItemProps = $PropertyType<
  PropGetters<DropdownItem>,
  'getItemProps'
>;
