/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import * as React from 'react';
import { getHash } from 'react-styleguidist/lib/utils/handleHash';
import styled from '@emotion/styled/macro';
import { colors, textStyles, themes } from '@quid/theme';
import { oss } from '../badges.json';

const Link = styled.a`
  ${textStyles('normal')}
  display: flex;
  align-items: center;
  text-decoration: none;
  font-weight: normal;
  color: ${props => (props.selected ? themes.light.selected : 'inherit')};
  font-weight: ${props => (!props.heading ? 'normal' : 'bold')};
  padding: 8px 10px;
  margin: 5px;
  border-radius: 5px;
  &:hover {
    background-color: ${colors.gray1};
  }
`;

const Ul = styled.ul`
  list-style: none;
  padding: 0;
  & & {
    padding-left: 10px;
  }
`;

const Badge = styled.span`
  display: inline-block;
  font-size: 10px;
  padding: 2px 7px;
  color: ${themes.light.primaryInverse};
  background: ${colors.coral};
  border-radius: 5px;
  margin-left: 5px;
`;

export default function ComponentsListRenderer({ classes = {}, items }) {
  items = items.filter(item => item.visibleName);

  if (!items.length) {
    return null;
  }

  const windowHash = window.location.pathname + getHash(window.location.hash);
  return (
    <Ul>
      {items.map(({ heading, visibleName, href, content, external }) => {
        const isItemSelected = windowHash === href;
        return (
          <li key={href}>
            <Link
              href={href}
              target={external ? '_blank' : undefined}
              heading={heading}
              selected={isItemSelected}
            >
              {visibleName}
              {oss.includes(visibleName) && <Badge>Community</Badge>}
            </Link>
            {content}
          </li>
        );
      })}
    </Ul>
  );
}
