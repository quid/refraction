/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { ClassNames } from '@emotion/core';
import { withFallback as wf } from '@quid/theme';
import nanoid from 'nanoid';
import Button from '../Button';

// prettier-ignore
const COLOR = wf(({ theme, disabled }) =>
  theme.current === 'light'
    ? (disabled
      ? theme.colors.gray3
      : theme.colors.gray5
    )
    : (disabled
      ? theme.colors.gray3
      : theme.colors.gray2
    )
);
// prettier-ignore
const ACTIVE = wf(({ theme, disabled }) =>
  theme.current === 'light'
    ? (disabled
      ? theme.colors.gray4
      : theme.colors.gray7
    )
    : (disabled
      ? theme.colors.gray2
      : theme.colors.white
    )
);
// prettier-ignore
const BG_1 = wf(({ theme, disabled }) =>
  theme.current === 'light'
    ? (disabled
      ? theme.colors.gray0
      : theme.colors.gray1
    )
    : (disabled
      ? theme.colors.gray6
      : theme.colors.gray5
    )
);
// prettier-ignore
const BORDER = wf(({ theme, disabled }) =>
  theme.current === 'light'
    ? (disabled
      ? theme.colors.gray2
      : theme.colors.gray5
    )
    : (disabled
      ? theme.colors.gray4
      : theme.colors.gray2
    )
);
const BG_2 = wf(props =>
  props.theme.current === 'light'
    ? props.theme.colors.gray2
    : props.theme.colors.gray4
);

const Fieldset = styled.fieldset`
  all: unset;
`;

const Container = styled.div`
  display: inline-flex;
  position: relative;
  align-items: stretch;

  &::before {
    content: '';
    position: absolute;
    isolation: isolate;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border: 1px solid ${BORDER};
    border-radius: 2px;
    pointer-events: none;
  }

  ${Button}, .${props => props.buttonClass} {
    border-radius: 0;
    background-color: transparent;
    color: ${COLOR};
    box-shadow: inset 0 0 0 0.5px ${BORDER};
    border: 0;

    &:hover {
      background-color: ${BG_1};
    }
    &:active {
      background-color: ${BG_2};
    }
    &:disabled {
      &,
      &:hover,
      &:active {
        background-color: transparent;
      }
    }

    &.${props => props.selectedButtonClass} {
      &,
      &:disabled {
        background-color: ${BG_1};
        color: ${ACTIVE};
      }
    }

    &:focus-visible {
      z-index: 1;
      background-color: ${BG_1};
      box-shadow: inset 0 0 0 1px ${BORDER},
        0 0 1px 0.5px ${wf(props => props.theme.background)},
        0 0 2px 2px ${wf(props => props.theme.colors.gray7)};
    }

    &:first-of-type {
      border-top-left-radius: 2px;
      border-bottom-left-radius: 2px;
    }
    &:last-of-type {
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
  }
`;

type Props = {
  /**
   * Either a list of buttons, or a function which takes as argument an object
   * with two class names (buttonClass,  and selectedButtonClass), and returns a list of buttons
   */
  children:
    | React.Node
    | (({ buttonClass: string, selectedButtonClass: string }) => React.Node),
  /** Class used to target custom button components */
  buttonClass?: string,
  /** The class name used to target the selected/activated buttons, by default is a random string */
  selectedButtonClass?: string,
  /** Set this to `true` to disable all the buttons inside the component */
  disabled?: boolean,
};

const ButtonGroup = ({
  children,
  buttonClass = nanoid(),
  selectedButtonClass = nanoid(),
  disabled,
  ...props
}: Props) => (
  <Fieldset disabled={disabled}>
    <Container
      buttonClass={buttonClass}
      selectedButtonClass={selectedButtonClass}
      disabled={disabled}
    >
      <ClassNames>
        {({ css }) =>
          typeof children === 'function'
            ? children({ buttonClass, selectedButtonClass })
            : children
        }
      </ClassNames>
    </Container>
  </Fieldset>
);

export default ButtonGroup;
