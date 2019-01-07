// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import callAll from '../utils/callAll';
import mergeRefs from '../utils/mergeRefs';
import InputGroup from '../InputGroup';
import InputText from '../InputText';
import Button from '../Button';

const FileSelector = styled.input`
  opacity: 0;
  position: absolute;
  pointer-events: none;
  width: 0;
  height: 0;
  overflow: hidden;
`;

type Props = {
  onClick?: (SyntheticInputEvent<HTMLInputElement>) => void,
  onChange?: (SyntheticInputEvent<HTMLInputElement>) => void,
  className?: string,
  style?: Object,
  multiple?: boolean,
  innerRef?: React.ElementRef<any>,
};

type State = {
  label: string,
};

class InnerInput extends React.Component<Props, State> {
  state = {
    label: '',
  };

  input = React.createRef();

  handleOnClick = callAll(
    (...args) => this.input.current && this.input.current.click(...args),
    this.props.onClick
  );

  updateLabel = ({ target: { files } }) => {
    const label =
      files && files.length > 0
        ? files.length === 1
          ? files[0].name
          : `${files.length} files selected`
        : '';
    this.setState({ label });
  };

  render() {
    const {
      onClick,
      className,
      style,
      multiple,
      onChange,
      innerRef,
      ...props
    } = this.props;

    return (
      <InputGroup className={className} style={style}>
        {cn => (
          <InputText
            {...props}
            readOnly
            className={cn}
            onClick={this.handleOnClick}
            value={this.state.label}
          />
        )}
        {() => (
          <FileSelector
            type="file"
            ref={mergeRefs(this.input, innerRef)}
            onChange={callAll(this.updateLabel, onChange)}
            multiple={multiple}
          />
        )}
        {cn => (
          <Button
            importance="secondary"
            {...props}
            className={cn}
            onClick={this.handleOnClick}
          >
            Select file
          </Button>
        )}
      </InputGroup>
    );
  }
}

const InputFile: React.StatelessFunctionalComponent<Props> = styled(
  React.forwardRef((props, ref) => <InnerInput {...props} innerRef={ref} />)
)();

// @component
export default InputFile;
