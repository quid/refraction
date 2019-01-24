// @flow
import * as React from 'react';
import { Context } from './Tabs';

type Props = {
  name: string,
  children: ({ name: string }) => React.Node,
};

export default class TabPanel extends React.Component<Props> {
  componentDidMount() {
    this.context.register(this.props.name);
  }

  render() {
    return this.props.name === this.context.active
      ? this.props.children({ name: this.props.name })
      : null;
  }

  static contextType = Context;
}
