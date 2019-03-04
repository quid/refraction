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
  defaultSelectedItems: Array<DropdownSelectedItem>,
  selectedItems?: Array<DropdownSelectedItem>,
  onSelect?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
  onChange?: (
    Array<DropdownSelectedItem>,
    MultiControllerStateAndHelpers
  ) => void,
  defaultIsOpen: boolean,
  multiselect: boolean,
  children: MultiControllerStateAndHelpers => React.Node,
  selectedItem?: ?string,
  useFilter: boolean,
};

type State = {
  selectedItems: Array<DropdownSelectedItem>,
  inputValue: string,
};

class MultiDownshift extends React.Component<Props, State> {
  state = {
    selectedItems: this.props.defaultSelectedItems,
    inputValue: this.getDefaultInputValue(),
  };

  getDefaultInputValue(): string {
    if (
      this.props.selectedItems &&
      this.props.selectedItems.length &&
      this.props.selectedItems[0].label
    ) {
      return this.props.selectedItems[0].label;
    } else if (
      this.props.defaultSelectedItems.length > 0 &&
      this.props.defaultSelectedItems[0].label
    ) {
      return this.props.defaultSelectedItems[0].label;
    } else {
      return '';
    }
  }

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
    if (selectedItem != null) {
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
      //Updating the inputValue is necessary when Dropdown is used as controlled component and useFilter is true
      this.setState(
        ({ inputValue }) => ({
          inputValue: selectedItems.length
            ? selectedItems[selectedItems.length - 1].label
            : inputValue,
        }),
        () => {
          callOnChange(newSelectedItems);
        }
      );
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

  isSelectedItemsPresentInProps = () => this.props.selectedItems != null;

  getSelectedItems = () => this.props.selectedItems || this.state.selectedItems;

  replaceItem = (item: DropdownSelectedItem): Array<DropdownSelectedItem> => [
    item,
  ];

  removeItem = (
    item: DropdownSelectedItem,
    selectedItems: Array<DropdownSelectedItem>
  ): Array<DropdownSelectedItem> =>
    selectedItems.filter(({ id }) => id !== item.id);

  addSelectedItem = (
    item: DropdownSelectedItem,
    selectedItems: Array<DropdownSelectedItem>
  ): Array<DropdownSelectedItem> => [...selectedItems, item];

  getStateAndHelpers = (
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ): MultiControllerStateAndHelpers => ({
    removeItem: this.removeItem,
    selectedItems: this.getSelectedItems(),
    ...downshift,
  });

  handleInputValueChange = (inputValue: string): void => {
    this.setState({
      inputValue: inputValue,
    });
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
        onInputValueChange={this.handleInputValueChange}
        stateReducer={this.stateReducer}
        onChange={this.handleSelection}
        inputValue={this.state.inputValue}
      >
        {downshift => children(this.getStateAndHelpers(downshift))}
      </Downshift>
    );
  }
}

export default MultiDownshift;
