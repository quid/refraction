/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

import * as React from 'react';
import Dropdown from '../index';

type State = {
  selectedItems: Array<Object>,
};

type Props = {
  items: Array<Object>,
  skipUpdate?: boolean,
  initialSelectedItems: Array<Object>,
};

class DropdownWrapper extends React.Component<Props, State> {
  state = {
    selectedItems: this.props.initialSelectedItems,
  };

  handleChange = (selectedItems: Array<Object>): void => {
    if (!this.props.skipUpdate) {
      this.setState({ selectedItems });
    }
  };

  render() {
    return (
      <Dropdown
        defaultIsOpen={true}
        selectedItems={this.state.selectedItems}
        onChange={this.handleChange}
        {...this.props}
      >
        {({ getInputProps }) => <input {...getInputProps()} />}
      </Dropdown>
    );
  }
}

export default DropdownWrapper;
