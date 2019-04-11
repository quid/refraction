/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import {
  Manager,
  Reference,
  Popper,
  type PopperArrowProps,
} from 'react-popper';
import { type Placement, type Modifiers } from 'popper.js';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { themes } from '@quid/theme';
import Color from 'color';
import MouseOutside from '@quid/react-mouse-outside';
import mergeRefs from '@quid/merge-refs';
import useControlledState from '@quid/react-use-controlled-state';

function getOppositePlacement(placement) {
  const hash = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
  return placement.replace(/left|right|bottom|top/g, matched => hash[matched]);
}

const ArrowBorder = styled.div``;

const Arrow = styled(
  React.forwardRef((props, ref) => (
    <div {...props} ref={ref}>
      <ArrowBorder {...props} />
    </div>
  ))
)`
  display: block;
  position: absolute;
  width: 0;
  height: 0;
  border-style: solid;
  border-color: ${props => props.theme.primaryInverse};
`;
Arrow.defaultProps = {
  theme: themes.light,
};

const Container = styled.div`
  background-color: ${props => props.theme.primaryInverse};
  color: ${props => props.theme.primary};
  border: 1px solid ${props => props.theme.colors.gray2};
  border-radius: 2px;
  padding: ${props => props.theme.sizes.small};
  filter: drop-shadow(
    0 2px 2px
      ${props =>
        Color(props.theme.colors.black)
          .alpha(0.2)
          .string()}
  );
  z-index: 1;

  ${props => css`
    margin-${getOppositePlacement(props.placement)}: ${props.arrowSize}px;

    ${Arrow} {
      border-width: ${props.arrowSize}px;
      ${getOppositePlacement(props.placement)}: -${props.arrowSize}px;
      border-${getOppositePlacement(props.placement)}-width: 0;
      border-${getOppositePlacement(props.placement)}-color: transparent;
      ${
        ['top', 'bottom'].includes(props.placement)
          ? css`
              border-right-color: transparent;
              border-left-color: transparent;
            `
          : css`
              border-top-color: transparent;
              border-bottom-color: transparent;
            `
      }

      left: ${props.arrowProps.style.left}px;
      top: ${props.arrowProps.style.top}px;
    }

    ${ArrowBorder} {
      border-width: ${props.arrowSize + 1}px;
      border-${props.placement}-color: ${props.theme.colors.gray2};
      left: -${props.arrowSize + 1}px;
      top: -${props.arrowSize + 1}px;
      ${
        ['left', 'right'].includes(props.placement)
          ? css`
              transform: translateX(
                ${props.placement === 'left' ? 1.5 : -1.5}px
              );
            `
          : css`
              transform: translateY(
                ${props.placement === 'top' ? 1.5 : -1.5}px
              );
            `
      }

      z-index: -1;
    }
  `}
`;
Container.defaultProps = {
  arrowSize: 6,
  placement: 'bottom',
  arrowProps: { style: { top: 0, left: 0 } },
  theme: themes.light,
};

type RenderPopoverProps = {
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
  renderPopover: RenderPopoverProps => React.Node,
  placement?: Placement,
  modifiers?: Modifiers,
  eventsEnabled?: boolean,
  positionFixed?: boolean,
  children: ({ ref: React.ElementRef<any>, toggle: () => void }) => React.Node,
};

const Popover = ({
  defaultOpen,
  open,
  onToggle,
  renderPopover,
  placement = 'bottom',
  modifiers,
  eventsEnabled = true,
  positionFixed = false,
  children,
}: Props) => {
  const [isOpen, setOpen] = useControlledState(defaultOpen, open, onToggle);
  const toggle = React.useCallback(() => setOpen(open => !open), [setOpen]);
  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const referenceRef = React.useRef();
  const popperRef = React.useRef();

  return (
    <MouseOutside refs={[referenceRef, popperRef]} onClickOutside={close}>
      {() => (
        <Manager>
          <Reference>
            {({ ref }) =>
              children({ ref: mergeRefs(ref, referenceRef), toggle })
            }
          </Reference>
          {isOpen && (
            <Popper
              placement={placement}
              modifiers={modifiers}
              eventsEnabled={eventsEnabled}
              positionFixed={positionFixed}
            >
              {({ ref, ...popperProps }) =>
                renderPopover({
                  ...popperProps,
                  ref: mergeRefs(ref, popperRef),
                  toggle,
                })
              }
            </Popper>
          )}
        </Manager>
      )}
    </MouseOutside>
  );
};

export { Container, Arrow };

export default Popover;
