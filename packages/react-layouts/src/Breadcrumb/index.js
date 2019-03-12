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

type BreadcrumbItem = {
  label: React.Node,
  path: string,
  arrowIcon?: string,
  disabled?: boolean,
  external?: boolean,
  emphasized?: boolean,
  tooltip?: string,
};

export type Props = {
  items: Array<BreadcrumbItem>,
  className?: string,
  separator?: React.Node,
};

const Arrow = styled.div`
  padding-left: ${sizes.regular};
  padding-right: ${sizes.regular};
  ${textStyles('normal', 'disabled')};
`;

type ItemType = BreadcrumbItem & {
  index: number,
  component?: React.Node,
};

const Item = styled(
  ({
    index,
    label,
    path,
    disabled = false,
    external = false,
    emphasized = false,
    tooltip = '',
    ...props
  }: ItemType) => (
    <NavLink
      to={path}
      emphasized={emphasized}
      external={external}
      disabled={disabled}
      key={index}
      {...props}
    >
      {tooltip ? (
        <span title={tooltip} id={`breadcrumb-${index}-tooltip`}>
          {label}
        </span>
      ) : (
        label
      )}
    </NavLink>
  )
)``;

const Breadcrumb = styled(({ items, separator, ...props }: Props) => (
  <nav {...props}>
    {items.reduce((accumulator, accItem, index) => {
      const { arrowIcon = 'angle_right', ...item } = accItem;
      const isLast = items.length === index + 1;
      accumulator.push(<Item key={`${index}_item`} index={index} {...item} />);

      if (isLast === false) {
        if (separator) {
          accumulator.push(
            <React.Fragment key={`${index}_arrow`}>{separator}</React.Fragment>
          );
        } else {
          accumulator.push(
            <Arrow key={`${index}_arrow`}>
              <Icon name={arrowIcon} />
            </Arrow>
          );
        }
      }
      return accumulator;
    }, [])}
  </nav>
))`
  display: flex;
  padding: 0;
  align-items: baseline;
`;

Breadcrumb.Item = Item;

// @component
export default Breadcrumb;
