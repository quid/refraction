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
import { useDebouncedCallback } from 'use-debounce';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import isPropValid from '@emotion/is-prop-valid';
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

const Container = styled('div', {
  shouldForwardProp: prop =>
    !['open', 'close', 'toggle'].includes(prop) && isPropValid(prop),
})`
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

type Helpers = {
  toggle: () => void,
  open: () => void,
  close: () => void,
};
type RenderPopoverProps = {
  ref: React.ElementRef<any>,
  style: $Shape<CSSStyleDeclaration>,
  placement: Placement,
  arrowProps: PopperArrowProps,
} & Helpers;

type Props = {
  open?: boolean,
  onToggle?: boolean => void,
  defaultOpen?: boolean,
  renderPopover: RenderPopoverProps => React.Node,
  placement?: Placement,
  modifiers?: Modifiers,
  eventsEnabled?: boolean,
  positionFixed?: boolean,
  mouseMoveBehavior?: boolean,
  openDelay?: number,
  closeDelay?: number,
  children: ({ ref: React.ElementRef<any> } & Helpers) => React.Node,
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
  mouseMoveBehavior = false,
  openDelay = 0,
  closeDelay = 0,
  children,
}: Props) => {
  const referenceRef = React.useRef();
  const popperRef = React.useRef();

  const [isOpen, setOpen] = useControlledState(defaultOpen, open, onToggle);

  const [debouncedOpen, cancelOpen] = useDebouncedCallback(
    () => setOpen(true),
    openDelay
  );
  const [debouncedClose, cancelClose] = useDebouncedCallback(
    () => setOpen(false),
    closeDelay
  );

  // When a callback is fired, we cancel any inflight call to leave the new one alone
  const openFn = React.useCallback(
    () => void (cancelClose(), debouncedOpen()),
    [cancelClose, debouncedOpen]
  );
  const closeFn = React.useCallback(
    () => void (cancelOpen(), debouncedClose()),
    [cancelOpen, debouncedClose]
  );
  const toggleFn = React.useCallback(() => (isOpen ? closeFn() : openFn()), [
    isOpen,
    closeFn,
    openFn,
  ]);

  const helpers = {
    toggle: toggleFn,
    open: openFn,
    close: closeFn,
  };

  return (
    <MouseOutside
      refs={[referenceRef, popperRef]}
      onClickOutside={closeFn}
      onMoveOutside={mouseMoveBehavior ? closeFn : undefined}
    >
      {() => (
        <Manager>
          <Reference>
            {({ ref }) =>
              children({
                ...helpers,
                ref: mergeRefs(ref, referenceRef),
              })
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
                  ...helpers,
                  ref: mergeRefs(ref, popperRef),
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
