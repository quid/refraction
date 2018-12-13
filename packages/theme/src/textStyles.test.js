// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { mount } from 'enzyme';
import textStyles from './textStyles';

// FIXME(fzivolo): right now I can't find a way to disable source maps in these
// snapshots, once we find a way, get rid of the `.split` call

it('returns a valid CSS', () => {
  const T = styled.div`
    ${textStyles('normal')({ theme: {} })}
  `;
  expect(mount(<T />)).toMatchSnapshot();
});

it('works with "withFallback" powered styles', () => {
  const T = styled.div`
    ${textStyles('secondary', 'disabled', 'link', 'highlighted')}
  `;
  expect(mount(<T />)).toMatchSnapshot();
});
