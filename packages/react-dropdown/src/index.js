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
  defaultSelectedItems?: Array<DropdownSelectedItem>,
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
  defaultIsOpen?: boolean,
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
  renderDropdown?: ({ dropdown: React.Node }) => React.Node,
};

const DropdownContainer = styled.div`
  display: inline-block;
`;

const defaultRenderDropdown = ({ dropdown }) => dropdown;

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
  defaultSelectedItems,
  selectedItems,
  defaultIsOpen = false,
  placement = 'bottom-start',
  popperModifiers,
  popperPositionFixed = false,
  onChange,
  onSelect,
  highlight = false,
  renderDropdown = defaultRenderDropdown,
  ...props
}: Props) => {
  if (defaultSelectedItems != null && selectedItems != null) {
    console.error(
      'Warning: App contains an input of type undefined with both `selectedItems` and `defaultSelectedItems` props. Dropdown elements must be either controlled or uncontrolled (specify either the selectedItems prop, or the defaultSelectedItems prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props.'
    );
  }

  if (selectedItems != null && onChange == null) {
    console.error(
      'Warning: Failed prop type: You provided a `selectedItems` prop to a form field without an `onChange` handler. If the field should be mutable use `defaultSelectedItems`. Otherwise, set `onChange`.'
    );
  }
  return (
    <Manager>
      <MultiDownshift
        multiselect={multiselect}
        itemToString={item => (item && item.label ? item.label : '')}
        defaultSelectedItems={defaultSelectedItems || []}
        selectedItems={selectedItems}
        defaultIsOpen={defaultIsOpen}
        onChange={onChange}
        onSelect={onSelect}
        useFilter={useFilter}
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
                  {isOpen &&
                    renderDropdown({
                      dropdown: (
                        <DropdownList
                          // $FlowFixMe(fzivolo): react-popper has wrong types?
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
                      ),
                    })}
                </DevFragment>
              )}
            </Popper>
          </DropdownContainer>
        )}
      </MultiDownshift>
    </Manager>
  );
};

export { DropdownList };

export default Dropdown;
