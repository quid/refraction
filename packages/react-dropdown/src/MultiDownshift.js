/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import Downshift, {
  type ControllerStateAndHelpers,
  type StateChangeOptions,
} from 'downshift';
import * as React from 'react';
import { includesId } from './utils';
import { type DropdownSelectedItem } from './dropdownTypes.js';

export type MultiControllerStateAndHelpers = ControllerStateAndHelpers<DropdownSelectedItem> & {
  selectedItems: Array<DropdownSelectedItem>,
};

type Props = {
  selectedItems: Array<DropdownSelectedItem>,
  onSelect?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
  onChange?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
  initialIsOpen: boolean,
  multiselect: boolean,
  children: MultiControllerStateAndHelpers => React.Node,
  selectedItem?: ?string,
};

type State = {
  selectedItems: Array<DropdownSelectedItem>,
};

class MultiDownshift extends React.Component<Props, State> {
  state = { selectedItems: this.props.selectedItems };

  stateReducer = (
    state: ControllerStateAndHelpers<DropdownSelectedItem>,
    changes: StateChangeOptions<DropdownSelectedItem>
  ) => {
    if (this.props.multiselect) {
      switch (changes.type) {
        case Downshift.stateChangeTypes.keyDownEnter:
        case Downshift.stateChangeTypes.clickItem:
          return {
            ...changes,
            highlightedIndex: state.highlightedIndex,
            isOpen: true,
          };
        default:
          return changes;
      }
    } else {
      return changes;
    }
  };

  handleSelection = (
    selectedItem: DropdownSelectedItem | null,
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ) => {
    const callOnChange = () => {
      const { onChange } = this.props;
      const { selectedItems } = this.state;
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift));
      }
    };

    if (selectedItem === null) {
      this.clearItems(callOnChange);
    } else {
      if (this.props.multiselect) {
        if (includesId(this.state.selectedItems, selectedItem.id)) {
          this.removeItem(selectedItem, callOnChange);
        } else {
          this.addSelectedItem(selectedItem, callOnChange);
        }
      } else {
        this.replaceItem(selectedItem, callOnChange);
      }
    }
  };

  clearItems = (cb?: () => void) => {
    this.setState(({ selectedItems }) => {
      return {
        selectedItems: [],
      };
    }, cb);
  };

  replaceItem = (item: DropdownSelectedItem, cb?: () => void) => {
    this.setState(({ selectedItems }) => {
      return {
        selectedItems: [item],
      };
    }, cb);
  };

  removeItem = (item: DropdownSelectedItem, cb?: () => void) => {
    this.setState(({ selectedItems }) => {
      return {
        selectedItems: selectedItems.filter(({ id }) => id !== item.id),
      };
    }, cb);
  };

  addSelectedItem = (item: DropdownSelectedItem, cb?: () => void) => {
    this.setState(
      ({ selectedItems }) => ({
        selectedItems: [...selectedItems, item],
      }),
      cb
    );
  };

  getStateAndHelpers = (
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ): MultiControllerStateAndHelpers => {
    const { selectedItems } = this.state;
    const { removeItem } = this;
    return {
      removeItem,
      selectedItems,
      ...downshift,
    };
  };

  render() {
    const { multiselect, children, selectedItem, ...props } = this.props;
    return (
      <Downshift
        {...props}
        selectedItem={multiselect ? null : selectedItem}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default MultiDownshift;
