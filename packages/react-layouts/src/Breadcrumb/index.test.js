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
      <NavLink to="foobar" external disabled />
    </BrowserRouter>
  );

  expect(wrapper).toMatchSnapshot();
});

it('renders a custom arrowIcon', () => {
  const CustomArrow = ({ foo }) => <div>{foo}</div>;

  const wrapper = mount(
    <BrowserRouter>
      <Breadcrumb
        items={[
          {
            label: 'SHARE',
            path: '/',
            renderArrowIcon: ({ index }) => <CustomArrow foo={index} />,
          },
          {
            label: 'FOO',
            path: '/foo',
          },
        ]}
      />
    </BrowserRouter>
  );

  expect(wrapper.find(CustomArrow)).toMatchSnapshot();
});
