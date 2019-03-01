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
  initialSelectedItems: Array<DropdownSelectedItem>,
  selectedItems?: Array<DropdownSelectedItem>,
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
  state = {
    selectedItems: this.props.initialSelectedItems,
  };

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
    const callOnChange = selectedItems => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift));
      }
    };

    const selectedItems = this.getSelectedItems();
    let newSelectedItems = [];
    if (selectedItem === null) {
      newSelectedItems = this.clearItems();
    } else {
      if (this.props.multiselect) {
        if (includesId(selectedItems, selectedItem.id)) {
          newSelectedItems = this.removeItem(selectedItem, selectedItems);
        } else {
          newSelectedItems = this.addSelectedItem(selectedItem, selectedItems);
        }
      } else {
        newSelectedItems = this.replaceItem(selectedItem);
      }
    }

    if (this.isSelectedItemsPresentInProps()) {
      callOnChange(newSelectedItems);
    } else {
      this.setState(
        {
          selectedItems: newSelectedItems,
        },
        () => {
          callOnChange(this.state.selectedItems);
        }
      );
    }
  };

  isSelectedItemsPresentInProps() {
    return this.props.selectedItems ? true : false;
  }

  getSelectedItems() {
    if (this.props.selectedItems) {
      return this.props.selectedItems;
    }
    return this.state.selectedItems;
  }

  clearItems = () => {
    return [];
  };

  replaceItem = (item: DropdownSelectedItem) => {
    return [item];
  };

  removeItem = (
    item: DropdownSelectedItem,
    selectedItems: Array<DropdownSelectedItem>
  ): Array<DropdownSelectedItem> => {
    return selectedItems.filter(({ id }) => id !== item.id);
  };

  addSelectedItem = (
    item: DropdownSelectedItem,
    selectedItems: Array<DropdownSelectedItem>
  ) => {
    return [...selectedItems, item];
  };

  getStateAndHelpers = (
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ): MultiControllerStateAndHelpers => {
    const { removeItem } = this;

    return {
      removeItem,
      selectedItems: this.getSelectedItems(),
      ...downshift,
    };
  };

  render() {
    const { multiselect, children, ...props } = this.props;
    const selectedItems = this.getSelectedItems();
    return (
      <Downshift
        {...props}
        selectedItem={
          !multiselect && selectedItems.length ? selectedItems[0] : null
        }
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default MultiDownshift;
