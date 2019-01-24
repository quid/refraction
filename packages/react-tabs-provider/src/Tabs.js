// @flow
import * as React from 'react';

export type ContextState = {
  active: ?string,
  select: string => void,
  register: string => void,
};

const noop = () => {};

// prettier-ignore
export const Context = React.createContext/*:: <ContextState> */({
  active: '',
  select: noop,
  register: noop,
});

type Props = {
  children: ({ active: ?string }) => React.Node,
  defaultActive?: string,
  active?: string,
  onSelect?: string => void,
};

type State = {
  registeredTabs: Array<string>,
  active: ?string,
  register: string => void,
  select: string => void,
};

export default class Tabs extends React.Component<Props, State> {
  state = {
    registeredTabs: [],
    active: this.props.defaultActive,
    register: this.register,
    select: this.select,
  };

  register = (name: string) =>
    this.setState(({ registeredTabs }) => ({
      registeredTabs: [...registeredTabs, name],
    }));

  select = (name: string) =>
    this.props.onSelect != null
      ? this.props.onSelect(name)
      : this.setState({
          active: name,
        });

  render() {
    const {
      children,
      active: controlledActive,
      onSelect: controlledOnSelect,
    } = this.props;
    const { active: uncontrolledActive, registeredTabs } = this.state;

    if (
      (controlledActive != null && controlledOnSelect == null) ||
      (controlledOnSelect != null && controlledActive == null)
    ) {
      // eslint-disable-next-line no-console
      console.error(
        'Warning: TabsProvider.Tabs can be used either as a controlled or stateful component, ' +
          'when used as controlled component, make sure to define both `value` and `onSelect` properties to it.'
      );
    }
    const active = controlledActive || uncontrolledActive || registeredTabs[0];

    return (
      <Context.Provider
        value={{ active, register: this.register, select: this.select }}
      >
        {children({ active })}
      </Context.Provider>
    );
  }
}
