/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { mount } from 'enzyme';
import { Popover, Container, Arrow } from '.';

jest.mock('use-debounce', () => ({
  useDebouncedCallback: callback => [callback, jest.fn()],
}));

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
    'border-bottom-color',
    '#FFFFFF',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="right" />)).toHaveStyleRule(
    'border-right-color',
    '#FFFFFF',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="top" />)).toHaveStyleRule(
    'border-top-color',
    '#FFFFFF',
    { target: `${Arrow}` }
  );
  expect(mount(<Container placement="left" />)).toHaveStyleRule(
    'border-left-color',
    '#FFFFFF',
    { target: `${Arrow}` }
  );
});

it('renders the Arrow component', () => {
  expect(mount(<Arrow />)).toMatchSnapshot();
});

it('can be open programmatically', async () => {
  const handleToggle = jest.fn();
  const wrapper = mount(
    <Popover
      onToggle={handleToggle}
      renderPopover={({ ref }) => <x-popover ref={ref}>popover</x-popover>}
    >
      {({ ref, open }) => (
        <x-reference onClick={open} ref={ref}>
          referece
        </x-reference>
      )}
    </Popover>
  );

  wrapper.find('x-reference').simulate('click');
  act(() => void expect(handleToggle).toHaveBeenCalledWith(true));
});

it('can close on mouse move outside', async () => {
  const handleToggle = jest.fn();
  mount(
    <Popover
      open
      onToggle={handleToggle}
      renderPopover={({ ref }) => <x-popover ref={ref}>popover</x-popover>}
      mouseMoveBehavior
    >
      {({ ref, open }) => (
        <x-reference onClick={open} ref={ref}>
          referece
        </x-reference>
      )}
    </Popover>
  );

  act(() => void document.dispatchEvent(new Event('mousemove')));
  expect(handleToggle).toHaveBeenCalledWith(false);
});

it('can be toggled programmatically (open)', async () => {
  const handleToggle = jest.fn();
  const wrapper = mount(
    <Popover
      onToggle={handleToggle}
      renderPopover={({ ref }) => <x-popover ref={ref}>popover</x-popover>}
    >
      {({ ref, toggle }) => (
        <x-reference onClick={toggle} ref={ref}>
          referece
        </x-reference>
      )}
    </Popover>
  );

  wrapper.find('x-reference').simulate('click');
  act(() => void expect(handleToggle).toHaveBeenCalledWith(true));
  handleToggle.mockClear();
});

it('can be toggled programmatically (close)', async () => {
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
  act(() => void expect(handleToggle).toHaveBeenCalledWith(false));
  handleToggle.mockClear();

  act(() => void document.dispatchEvent(new Event('click')));
  expect(handleToggle).toHaveBeenCalledWith(false);
});
