// @flow
import * as React from 'react';

type GetInputProps = (
  ?{ onChange?: Function, onInvalid?: Function }
) => {
  onChange: (SyntheticInputEvent<any>) => void,
  onInvalid: (SyntheticInputEvent<any>) => void,
};

type Props = {
  children: (GetInputProps, boolean) => React.Node,
  errorMessage?: string,
};

type State = {
  invalid: boolean,
};

const callAll = (...fns: Array<?Function>) => (...args) =>
  fns.forEach(fn => fn && fn(...args));

class InvalidHandler extends React.Component<Props, State> {
  state = {
    invalid: false,
  };

  handleOnInvalid = ({ target }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ invalid: true });
    if (this.props.errorMessage != null) {
      target.setCustomValidity(this.props.errorMessage);
    }
  };

  handleOnChange = ({ target }: SyntheticInputEvent<HTMLInputElement>) => {
    this.setState({ invalid: false });
    if (this.props.errorMessage != null) {
      target.setCustomValidity('');
    }
  };

  render() {
    return this.props.children(
      props => ({
        onInvalid: callAll(this.handleOnInvalid, (props || {}).onInvalid),
        onChange: callAll(this.handleOnChange, (props || {}).onChange),
      }),
      this.state.invalid
    );
  }
}

export default InvalidHandler;
