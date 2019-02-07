/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
    ${textStyles('secondary', 'disabled', 'link', 'highlighted', 'body')}
  `;
  expect(mount(<T />)).toMatchSnapshot();
});
