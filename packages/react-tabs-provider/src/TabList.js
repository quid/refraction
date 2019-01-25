/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { Context, type ContextState } from './Tabs';

type Props = {
  children: ContextState => React.Node,
};

export default class TabList extends React.Component<Props> {
  render() {
    return this.props.children(this.context);
  }

  static contextType = Context;
}
