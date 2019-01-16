// @noflow
import React from 'react';
import { getHash } from 'react-styleguidist/lib/utils/handleHash';
import styled from '@emotion/styled/macro';
import { colors, textStyles, themes } from '@quid/theme';

const Link = styled.a`
  ${textStyles('normal')}
  text-decoration: none;
  font-weight: normal;
  color: ${props => (props.selected ? themes.light.selected : 'inherit')};
  font-weight: ${props => (!props.heading ? 'normal' : 'bold')};
  padding: 8px 10px;
  margin: 5px;
  display: block;
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

// className={cx(
//   classes.item,
//   (!content || !content.props.items.length) && classes.isChild,
//   isItemSelected && classes.isSelected
// )}

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
              //className={cx(heading && classes.heading)}
              href={href}
              target={external ? '_blank' : undefined}
              heading={heading}
              selected={isItemSelected}
            >
              {visibleName}
            </Link>
            {content}
          </li>
        );
      })}
    </Ul>
  );
}
