/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// @flow
import React from 'react';
import { mount } from 'enzyme';
import Breadcrumb from './index';
import NavLink from './NavLink';
import { BrowserRouter } from 'react-router-dom';

const items = [
  {
    label: 'Project Name 13',
    path: '/',
    arrowIcon: 'angle_double_right',
  },
  {
    label: 'SEARCH',
    path: '/search',
    tooltip: 'project AND name',
  },
  {
    label: 'REVIEW',
    path: '/search/review',
  },
  {
    label: 'ANALYZE',
    path: '/search/review/analyze',
    disabled: true,
  },
  {
    label: 'SHARE',
    path: '/search/review/analyze/share',
    external: true,
    emphasized: true,
  },
];

it('renders the expected markup', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Breadcrumb items={items} />
    </BrowserRouter>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a default NavLink', () => {
  const wrapper = mount(
    <BrowserRouter>
      <NavLink to="foobar" />
    </BrowserRouter>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a NavLink', () => {
  const wrapper = mount(
    <BrowserRouter>
      <NavLink to="foobar" external disabled activeClassName="foobar--active" />
    </BrowserRouter>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders x amount of Breadcrumb separators', () => {
  const wrapper = mount(
    <BrowserRouter>
      <Breadcrumb items={items} separator={<div data-context="separator" />} />
    </BrowserRouter>
  );

  expect(wrapper.find('[data-context="separator"]').length).toBe(
    items.length - 1
  );

  expect(wrapper.find('[data-context="separator"]').first()).toMatchSnapshot();
});

it('renders an item where label as defined', () => {
  const itemsWithChildren = [
    ...items,
    {
      label: <div data-context="label">Children</div>,

      path: '/children',
    },
  ];
  const wrapper = mount(
    <BrowserRouter>
      <Breadcrumb items={itemsWithChildren} />
    </BrowserRouter>
  );

  expect(wrapper.find('[data-context="label"]').first()).toMatchSnapshot();
});
