/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { Calendar } from './styles';

it('works on dark theme', () => {
  expect(
    mount(<Calendar theme={{ current: 'dark', colors: { gray6: 'gray6' } }} />)
  ).toHaveStyleRule('background-color', 'gray6');
});
