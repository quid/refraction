/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { Tooltip, Container } from '.';

jest.mock('@quid/react-popover', () => ({
  __esModule: true,
  Popover: ({ children, ...props }) => children(props),
  Container: 'x-popover-container',
  Arrow: 'x-popover-arrow',
}));

it('renders the Container component', () => {
  const ref = React.createRef();
  const arrowRef = React.createRef();
  const wrapper = mount(
    <Container
      ref={ref}
      arrowProps={{ ref: arrowRef, style: { left: 0, top: 0 } }}
    >
      foobar
    </Container>
  );
  expect(wrapper).toMatchSnapshot();
});

it('forwards props to Popover', () => {
  const wrapper = mount(
    <Tooltip renderTooltip={() => <x-tooltip />}>
      {({ mouseMoveBehavior }: any) => (
        <x-content mouseMoveBehavior={mouseMoveBehavior} />
      )}
    </Tooltip>
  );

  expect(wrapper.find('x-content').prop('mouseMoveBehavior')).toBe(true);
});
