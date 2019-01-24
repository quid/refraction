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

const callAll = (...fns: Array<?Function>) => (...args: Array<any>) =>
  fns.forEach(fn => fn && fn(...args));

/** @visibleName Usage example */
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

  getInputProps = (
    props: ?{
      onInvalid?: (SyntheticInputEvent<HTMLInputElement>) => void,
      onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
    }
  ) => ({
    onInvalid: callAll(this.handleOnInvalid, (props || {}).onInvalid),
    onChange: callAll(this.handleOnChange, (props || {}).onChange),
  });

  render() {
    return this.props.children(this.getInputProps, this.state.invalid);
  }
}

export default InvalidHandler;
