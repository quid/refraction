/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React from 'react';
import { mount } from 'enzyme';
import Tabs from './index';
const { Tab, TabPanel } = Tabs;

it('should match TabPanel', () => {
  const wrapper = mount(
    <TabPanel label="foo" name="0" id="0">
      foo
    </TabPanel>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should match a Tabs example', () => {
  const wrapper = mount(
    <Tabs activeTab="one" id="id">
      <TabPanel label="One" name="one">
        foo
      </TabPanel>
      <TabPanel label="Two" name="two">
        bar
      </TabPanel>
    </Tabs>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should call onChange on tab click', () => {
  const handleChange = jest.fn();
  const wrapper = mount(
    <Tabs activeTab="0" id="id" onChange={handleChange}>
      <TabPanel label="foo" name="0" id="0">
        foo
      </TabPanel>
      <TabPanel label="bar" name="1" id="1">
        bar
      </TabPanel>
    </Tabs>
  );
  wrapper
    .find(Tab)
    .at(1)
    .find('button')
    .simulate('click');
  expect(handleChange).toBeCalledWith('1');
});
