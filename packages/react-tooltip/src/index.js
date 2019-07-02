/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { type Placement, type Modifiers } from 'popper.js';
import { type PopperArrowProps } from 'react-popper';
import styled from '@emotion/styled/macro';
import Popover, {
  Container as PopoverContainer,
  Arrow,
  type Helpers,
} from '@quid/react-popover';

type RenderTooltipProps = {
  ref: React.ElementRef<any>,
  style: $Shape<CSSStyleDeclaration>,
  placement: Placement,
  arrowProps: PopperArrowProps,
  toggle: () => void,
};

type Props = {
  open?: boolean,
  onToggle?: boolean => void,
  defaultOpen?: boolean,
  renderTooltip: RenderTooltipProps => React.Node,
  placement?: Placement,
  modifiers?: Modifiers,
  eventsEnabled?: boolean,
  positionFixed?: boolean,
  children: ({ ref: React.ElementRef<any> } & Helpers) => React.Node,
};

const Tooltip = ({ renderTooltip, ...props }: Props) => (
  <Popover renderPopover={renderTooltip} mouseMoveBehavior {...props} />
);
Tooltip.defaultProps = {
  closeOnMouseOutside: true,
};

export const Container = styled(
  React.forwardRef(({ arrowProps, children, ...props }, ref) => (
    <PopoverContainer {...props} arrowProps={arrowProps} ref={ref}>
      {children}
      <Arrow ref={arrowProps.ref} />
    </PopoverContainer>
  ))
)``;

export default Tooltip;
