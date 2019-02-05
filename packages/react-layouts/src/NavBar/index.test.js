/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import NavBar from './index';

it('renders the expected markup', () => {
  const wrapper = mount(
    <NavBar
      logo={<span>foo</span>}
      breadcrumb={<span>foo</span>}
      tools={<span>foo</span>}
      title={'Example title for the nav tag.'}
    />
  );

  expect(wrapper).toMatchSnapshot();
});
