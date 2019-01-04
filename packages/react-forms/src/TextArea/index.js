// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import InputText, { Input, PADDING } from '../InputText';

const TextArea = styled(props => <InputText as="textarea" {...props} />)`
  ${Input} {
    padding: ${props => PADDING[props.size || 'regular'] / 2.5}px
      ${props => PADDING[props.size || 'regular']}px;
  }
`;

export default TextArea;
