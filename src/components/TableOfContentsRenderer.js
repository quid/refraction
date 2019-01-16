// @noflow
import React from 'react';
import { InputText } from '@quid/react-forms';
import styled from '@emotion/styled/macro';

const TableOfContentsRenderer = styled(
  ({ searchTerm, onSearchTermChange, children, className }) => (
    <div>
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
  margin: 14px;
`;

export default TableOfContentsRenderer;
