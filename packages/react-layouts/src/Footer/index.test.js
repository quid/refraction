/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { Fragment } from 'react';
import { mount } from 'enzyme';
import Footer from './index';

it('renders the expected markup', () => {
  const wrapper = mount(<Footer>Lorem ipsum</Footer>);

  expect(wrapper).toMatchSnapshot();
});

it('renders the expected markup, transparent Footer', () => {
  const wrapper = mount(
    <Footer theme={{ current: 'dark', colors: { gray7: 'gray7' } }}>
      Lorem ipsum
    </Footer>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders the expected markup basic Footer.Slot', () => {
  const wrapper = mount(
    <Footer.Slot>
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a left Footer.Slot', () => {
  const wrapper = mount(
    <Footer.Slot left>
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a right Footer.Slot', () => {
  const wrapper = mount(
    <Footer.Slot right>
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a center Footer.Slot', () => {
  const wrapper = mount(
    <Footer.Slot center>
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a separated Footer.Slot', () => {
  const wrapper = mount(
    <Footer.Slot separated>
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a separated Footer.Slot, dark theme', () => {
  const wrapper = mount(
    <Footer.Slot
      separated
      theme={{ current: 'dark', colors: { gray7: 'gray7' } }}
    >
      {() => {
        'Test';
      }}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});

it('should apply extra padding to first and last Slot child elements', () => {
  const wrapper = mount(
    <Footer.Slot>
      {paddingClass => (
        <Fragment>
          <button className={paddingClass}>Button 1</button>
          <button className={paddingClass}>Button 2</button>
          <button className={paddingClass}>Button 3</button>
          <button className={paddingClass}>Button 4</button>
          <button className={paddingClass}>Button 5</button>
        </Fragment>
      )}
    </Footer.Slot>
  );

  expect(wrapper).toMatchSnapshot();
});
