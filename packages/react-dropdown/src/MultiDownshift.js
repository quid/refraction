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
    selectedItems: ?Array<DropdownSelectedItem>,
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ) => {
    const callOnChange = selectedItems => {
      const { onChange } = this.props;
      if (onChange) {
        onChange(selectedItems, this.getStateAndHelpers(downshift));
      }
    };

    const currentSelection = this.getSelectedItems();

    let newSelectedItems = [];
    if (selectedItems != null) {
      const selectedItem = selectedItems[0];
      if (this.props.multiselect) {
        newSelectedItems = this.toggleSelectedItems(
          currentSelection,
          selectedItems
        );
      } else {
        newSelectedItems = this.replaceItem(selectedItem);
      }
    }

    if (this.isSelectedItemsPresentInProps()) {
      //Updating the inputValue is necessary when Dropdown is used as controlled component and useFilter is true
      this.setState(
        ({ inputValue }) => ({
          inputValue: currentSelection.length
            ? currentSelection[currentSelection.length - 1].label
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

  toggleSelectedItems = (
    currentSelection: Array<DropdownSelectedItem>,
    selectedItems: Array<DropdownSelectedItem>
  ): Array<DropdownSelectedItem> => {
    const currentSelectedIds = currentSelection.map(({ id }) => id);
    const duplicatedItems = selectedItems.reduce((accumulator, { id }) => {
      if (currentSelectedIds.includes(id)) {
        accumulator.push(id);
      }
      return accumulator;
    }, []);
    return [...currentSelection, ...selectedItems].filter(({ id }) => {
      return duplicatedItems.includes(id) === false;
    });
  };

  isSelectedItemsPresentInProps = () => this.props.selectedItems != null;

  getSelectedItems = () => this.props.selectedItems || this.state.selectedItems;

  replaceItem = (item: DropdownSelectedItem): Array<DropdownSelectedItem> => [
    item,
  ];

  removeItem = (
    item: DropdownSelectedItem,
    selectedItems: Array<DropdownSelectedItem>
  ): Array<DropdownSelectedItem> => {
    console.log('RemoveItem');
    return selectedItems.filter(({ id }) => id !== item.id);
  };

  getStateAndHelpers = (
    downshift: ControllerStateAndHelpers<DropdownSelectedItem>
  ): MultiControllerStateAndHelpers => ({
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
