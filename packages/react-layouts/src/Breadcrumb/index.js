/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import NavLink from './NavLink';
import { Icon } from '@quid/react-core';
import styled from '@emotion/styled/macro';
import { textStyles } from '@quid/theme';
import { sizes } from '@quid/theme';

export type Props = {
  items: Array<{
    label: React$Node,
    path: string,
    renderArrowIcon?: ({ index: number }) => React.Node,
    arrowIcon?: string,
    disabled?: boolean,
    external?: boolean,
    emphasized?: boolean,
    tooltip?: string,
  }>,
  className?: string,
};

const flatten = (a, b) => a.concat(b);

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
    renderArrowIcon,
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
    >
      {tooltip ? (
        <span title={tooltip} id={`breadcrumb-${index}-tooltip`}>
          {label}
        </span>
      ) : (
        label
      )}
    </NavLink>,
    renderArrowIcon ? (
      renderArrowIcon({ index })
    ) : (
      <Arrow>
        <Icon name={arrowIcon} />
      </Arrow>
    ),
  ];
}

const Breadcrumb = styled(({ items, ...props }: Props) => {
  const processedItems = React.Children.toArray(
    items
      .map(genItem) // generate couple of [[item, arrow], [item, arrow], ...]
      .reduce(flatten, []) // flatten array
      .slice(0, -1) // drop last item
  );

  return <ul {...props}>{processedItems}</ul>;
})`
  display: flex;
  padding: 0;
  align-items: baseline;
`;

// @component
export default Breadcrumb;
