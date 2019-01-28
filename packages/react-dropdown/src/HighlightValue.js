/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { Text } from '@quid/react-core';
import styled from '@emotion/styled/macro';
import { textStyles } from '@quid/theme';
import { splitStringByValue } from './utils';

type Props = {
  highlight: boolean,
  value: string,
  valueToHighlight: string,
  className: string,
};

const HighlightValue = styled(
  ({ highlight, value, valueToHighlight, className }: Props) => {
    if (highlight && valueToHighlight.length && value.length) {
      const splittedText = splitStringByValue(value, valueToHighlight, 1);
      return (
        <span className={className}>
          {splittedText.map((chunk, index) => {
            return chunk.highlight ? (
              <Text key={index} as="span" type="bold">
                {chunk.value}
              </Text>
            ) : (
              chunk.value
            );
          })}
        </span>
      );
    }
    return <span className={className}>{value}</span>;
  }
)`
  ${props => textStyles(props.disabled ? 'disabled' : '')};
`;

export default HighlightValue;
