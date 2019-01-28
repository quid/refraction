/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { type DropdownSelectedItem } from './dropdownTypes';
type Props = {
  selectedItems: Array<DropdownSelectedItem>,
  name: string,
  multiselect: boolean,
};

export default function InputCreator({
  selectedItems,
  name,
  multiselect,
}: Props) {
  const inputName = name + (multiselect ? '[]' : '');
  return (
    <React.Fragment>
      {selectedItems.map((item, index) => {
        return (
          <input type="hidden" key={index} name={inputName} value={item.id} />
        );
      })}
    </React.Fragment>
  );
}
