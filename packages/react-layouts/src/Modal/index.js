/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow

import * as React from 'react';
import ReactModal from 'react-modal';
import styled from '@emotion/styled/macro';
import Centerer from './Centerer';
import { withFallback as wf } from '@quid/theme';
import Color from 'color';
import { ClassNames } from '@emotion/core';
import Header from './Header';
import { ACTION } from './importanceTypes';
import type { Importance } from './importanceTypes';
import ActionBar from './ActionBar';
import css from '@emotion/css/macro';

type Props = {
  title?: React.Node,
  alt?: string, // specify if `title` is not a string
  icon?: string,
  noPadding?: boolean,
  importance?: Importance,
  ignoreHeightLimits?: boolean,
  centerVertically?: boolean,
  action?: React.Node,
  renderActionLeft?: string => React.Node,
  renderActionRight?: string => React.Node,
  children: React.Node,
  overlayClassName?: string,
  ariaHideApp?: boolean,
  isForm?: boolean,
  formProps?: { [string]: * },
};

const OptionalForm = styled(({ isForm, children, ...props }) => {
  const Tag = isForm ? 'form' : 'div';
  return <Tag {...props}>{children}</Tag>;
})`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const Main = styled.main`
  min-height: inherit;
  flex: 1;
`;

const reduceOpacity = (color, alpha) =>
  Color(color)
    .alpha(alpha)
    .string();

const Modal = styled(
  ({
    isForm,
    title,
    alt,
    icon,
    noPadding = false,
    importance = ACTION,
    ignoreHeightLimits = false,
    centerVertically = false,
    children,
    action,
    renderActionLeft,
    renderActionRight,
    overlayClassName,
    ariaHideApp = false,
    formProps,
    ...props
  }: Props) => {
    if (title && typeof title !== 'string' && !alt) {
      throw new Error(
        "`alt` property is required when `title` isn't a string!"
      );
    }

    return (
      <ClassNames>
        {({ css, theme, cx }) => (
          <ReactModal
            overlayClassName={cx(
              css`
                display: flex;
                align-items: center;
                justify-content: center;
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: ${wf(({ theme }) =>
                  reduceOpacity(theme.colors.black, 0.6)
                )({ theme })};
              `,
              overlayClassName
            )}
            contentLabel={alt || title}
            ariaHideApp={ariaHideApp} // this can be overridden by the consumer to improve accessibility
            {...props}
          >
            <OptionalForm isForm={isForm} {...formProps}>
              {!!title && (
                <Header title={title} icon={icon} importance={importance} />
              )}
              <Centerer centerVertically={centerVertically}>
                <Main>{children}</Main>
              </Centerer>

              <ActionBar
                action={action}
                renderActionLeft={renderActionLeft}
                renderActionRight={renderActionRight}
              />
            </OptionalForm>
          </ReactModal>
        )}
      </ClassNames>
    );
  }
)`
  width: 800px;
  display: flex;
  flex-direction: column;
  border-radius: 2px;
  border: 1px solid;

  ${wf(
    props => css`
      color: ${props.theme.primary};
      background-color: ${props.theme.current === 'light'
        ? props.theme.colors.white
        : props.theme.colors.black};
      box-shadow: 2px 2px 2px ${reduceOpacity(props.theme.colors.black, 0.1)};
      border-color: ${props.theme.current === 'light'
        ? props.theme.colors.gray1
        : props.theme.colors.gray7};
    `
  )};

  ${props =>
    !props.ignoreHeightLimits &&
    css`
      min-height: 350px;
      max-height: 500px;
    `}

  &:focus:not(:focus-visible) {
    outline: 0;
  }
`;

export default Modal;
