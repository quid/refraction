/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { TooltipContainer } from './styles';

it('should forward children property', () => {
  expect(
    mount(
      <TooltipContainer
        children="foobar"
        arrowProps={{ ref: jest.fn(), style: { left: 0 } }}
      />
    ).text()
  ).toBe('foobar');
});
