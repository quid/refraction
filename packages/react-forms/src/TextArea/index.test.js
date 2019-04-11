/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { Input } from '../InputText';
import TextArea from '.';

it('renders a TextArea with all the supported sizes', () => {
  expect(mount(<TextArea />)).toHaveStyleRule('padding', '4px 10px', {
    target: `${Input}`,
  });
  expect(mount(<TextArea size="small" />)).toHaveStyleRule(
    'padding',
    '2px 5px',
    { target: `${Input}` }
  );
  expect(mount(<TextArea size="large" />)).toHaveStyleRule(
    'padding',
    '6px 15px',
    { target: `${Input}` }
  );
});
