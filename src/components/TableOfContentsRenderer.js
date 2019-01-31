/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import * as React from 'react';
import { InputText } from '@quid/react-forms';
import styled from '@emotion/styled/macro';

const TableOfContentsRenderer = styled(
  ({ searchTerm, onSearchTermChange, children, className }) => (
    <div className={className}>
      <InputText
        className={className}
        value={searchTerm}
        placeholder="Filter by name"
        aria-label="Filter by name"
        onChange={event => onSearchTermChange(event.target.value)}
      />
      {children}
    </div>
  )
)`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  ${InputText} {
    margin: 14px;
  }
`;

export default TableOfContentsRenderer;
