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
