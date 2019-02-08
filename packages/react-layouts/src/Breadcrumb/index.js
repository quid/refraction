/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import NavLink from './NavLink';
import { Icon } from '@quid/react-core';
import styled from '@emotion/styled/macro';
import { textStyles } from '@quid/theme';
import { sizes } from '@quid/theme';

export type Props = {
  items: Array<{
    label: React$Node,
    path: string,
    arrowIcon?: string,
    disabled?: boolean,
    external?: boolean,
    emphasized?: boolean,
    tooltip?: string,
  }>,
  className?: string,
};

const Arrow = styled.div`
  padding-left: ${sizes.regular};
  padding-right: ${sizes.regular};
  ${textStyles('normal', 'disabled')};
`;

function genItem(
  {
    label,
    path,
    arrowIcon = 'angle_right',
    disabled = false,
    external = false,
    emphasized = false,
    tooltip = '',
  },
  index
) {
  return [
    <NavLink
      to={path}
      emphasized={emphasized}
      external={external}
      disabled={disabled}
      key={index}
    >
      {tooltip ? (
        <span title={tooltip} id={`breadcrumb-${index}-tooltip`}>
          {label}
        </span>
      ) : (
        label
      )}
    </NavLink>,
    <Arrow key={`${index}_arrow`}>
      <Icon name={arrowIcon} />
    </Arrow>,
  ];
}

const Breadcrumb = styled(({ items, ...props }: Props) => {
  const processedItems = items
    .map(genItem)
    .reduce((a, b) => a.concat(b), [])
    .slice(0, -1);

  return <ul {...props}>{processedItems}</ul>;
})`
  display: flex;
  padding: 0;
  align-items: baseline;
`;

// @component
export default Breadcrumb;
