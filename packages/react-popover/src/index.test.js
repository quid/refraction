/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
// $FlowFixMe: need to upgrade Flow
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import Popover, { Container, Arrow } from '.';

it('renders a basic popover', () => {
  expect(
    mount(
      <Popover
        open
        onToggle={jest.fn()}
        renderPopover={({ ref }) => <div ref={ref}>popover</div>}
      >
        {({ ref }) => <div ref={ref}>referece</div>}
      </Popover>
    )
  ).toMatchSnapshot();
});

it('renders the Container component', () => {
  expect(mount(<Container placement="bottom" />)).toMatchSnapshot();
});

it('renders the Container component on different placements', () => {
  expect(mount(<Container placement="bottom" />)).toHaveStyleRule(
    'border-right-color',
    'transparent',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="top" />)).toHaveStyleRule(
    'border-right-color',
    'transparent',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="right" />)).toHaveStyleRule(
    'border-top-color',
    'transparent',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="left" />)).toHaveStyleRule(
    'border-top-color',
    'transparent',
    { target: `${Arrow}` }
  );
});

it('renders the Arrow component', () => {
  expect(mount(<Arrow />)).toMatchSnapshot();
});

it('can be toggled programmatically', () => {
  const handleToggle = jest.fn();
  const wrapper = mount(
    <Popover
      open
      onToggle={handleToggle}
      renderPopover={({ ref, toggle }) => (
        <x-popover ref={ref} onClick={toggle}>
          popover
        </x-popover>
      )}
    >
      {({ ref }) => <div ref={ref}>referece</div>}
    </Popover>
  );

  wrapper.find('x-popover').simulate('click');

  expect(handleToggle).toHaveBeenCalledWith(false);

  act(() => void document.dispatchEvent(new Event('click')));

  expect(handleToggle).toHaveBeenCalledWith(false);
  expect(handleToggle).toHaveBeenCalledTimes(2);
});
