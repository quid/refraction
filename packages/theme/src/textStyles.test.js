// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import css from '@emotion/css/macro';
import { mount } from 'enzyme';
import textStyles from './textStyles';

// FIXME(fzivolo): right now I can't find a way to disable source maps in these
// snapshots, once we find a way, get rid of the `.split` call

it('returns a valid CSS', () => {
  expect(
    textStyles('normal')({ theme: {} }).styles.split('/*# sourceMappingURL')[0]
  ).toMatchSnapshot();
});

it('works with "withFallback" powered styles (css)', () => {
  expect(
    css`
      ${textStyles('link')({ theme: {} })}
    `.styles.split('/*# sourceMappingURL')[0]
  ).toMatchSnapshot();
});

it('works with "withFallback" powered styles', () => {
  const T = styled.div`
    ${textStyles('secondary', 'disabled', 'link', 'highlighted')}
  `;
  expect(mount(<T />)).toMatchSnapshot();
});
