/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { type GetInputPropsReturn } from 'downshift';
import { filterItems, callAll } from './utils';
import DropdownList from './List';
import InputCreator from './InputCreator';
import styled from '@emotion/styled/macro';
import MultiDownshift, {
  type MultiControllerStateAndHelpers,
} from './MultiDownshift';
import { type Modifiers } from 'popper.js';
import { Manager, Reference, Popper, type Placement } from 'react-popper';

import {
  type DropdownItem,
  type DropdownCategory,
  type DropdownSelectedItem,
} from './dropdownTypes.js';

// There's something wrong with Enzyme + jest-emotion that prevents us to use
// React.Fragment as child of the Popper component in this instance
// This is a dirty workaround
// istanbul ignore next
const DevFragment =
  process.env.NODE_ENV === 'test' ? 'x-fragment' : React.Fragment;

type Props = {
  items: Array<DropdownItem>,
  categories?: Array<DropdownCategory>,
  initialSelectedItems?: Array<DropdownSelectedItem>,
  selectedItems?: Array<DropdownSelectedItem>,
  useFilter?: boolean,
  filterFn?: (
    items: Array<DropdownItem>,
    filter: ?string
  ) => Array<DropdownItem>,
  multiselect?: boolean,
  name?: string,
  children: (
    Object & { getInputProps: Object => GetInputPropsReturn }
  ) => React.Node,
  twoColumn?: boolean,
  initialIsOpen?: boolean,
  highlight?: boolean,
  placement?: Placement,
  popperModifiers?: Modifiers,
  popperPositionFixed?: boolean,
  onSelect?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
  onChange?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
};

const DropdownContainer = styled.div`
  display: inline-block;
`;

/** @visibleName Usage example */
const Dropdown = ({
  filterFn = filterItems,
  useFilter = false,
  items,
  categories = [],
  multiselect = false,
  children,
  name = 'dropdown',
  twoColumn = true,
  initialSelectedItems = [],
  selectedItems,
  initialIsOpen = false,
  placement = 'bottom-start',
  popperModifiers,
  popperPositionFixed = false,
  onChange,
  onSelect,
  highlight = false,
  ...props
}: Props) => (
  <Manager>
    <MultiDownshift
      multiselect={multiselect}
      itemToString={item => (item && item.label ? item.label : '')}
      initialSelectedItems={initialSelectedItems}
      selectedItems={selectedItems}
      initialIsOpen={initialIsOpen}
      onChange={onChange}
      onSelect={onSelect}
    >
      {(
        downshift,
        {
          openMenu,
          getItemProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItems,
          getInputProps,
          getRootProps,
        } = downshift
      ) => (
        <DropdownContainer {...getRootProps({ refKey: 'ref', ...props })}>
          <InputCreator
            multiselect={multiselect}
            selectedItems={selectedItems}
            name={name}
          />
          <Popper
            placement={placement}
            positionFixed={popperPositionFixed}
            modifiers={popperModifiers}
          >
            {({ ref, style, scheduleUpdate }) => (
              <DevFragment>
                <Reference>
                  {({ ref }) =>
                    children({
                      ...downshift,
                      getInputProps: (inputProps = {}) => {
                        // NOTE: if you contract this to (inputProps ...) => getInputProps
                        // this thing is going to break compliation for some reason
                        return getInputProps({
                          ...inputProps,
                          ref,
                          onFocus: callAll(inputProps.onFocus, openMenu),
                          onClick: callAll(inputProps.onClick, openMenu),
                          onChange: callAll(
                            inputProps.onChange,
                            scheduleUpdate
                          ),
                        });
                      },
                    })
                  }
                </Reference>
                {isOpen && (
                  <DropdownList
                    ref={ref}
                    style={style}
                    twoColumn={twoColumn}
                    items={items}
                    categories={categories}
                    inputValue={inputValue}
                    getItemProps={getItemProps}
                    useFilter={useFilter}
                    filterFn={filterFn}
                    highlightedIndex={highlightedIndex}
                    selectedItems={selectedItems}
                    highlight={highlight}
                  />
                )}
              </DevFragment>
            )}
          </Popper>
        </DropdownContainer>
      )}
    </MultiDownshift>
  </Manager>
);

export default Dropdown;
