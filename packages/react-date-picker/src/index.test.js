/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import { advanceTo } from 'jest-date-mock';
import Calendar from './';
import Cell from './Cell';

const WEEK_DAYS = 7;

const now = new Date(Date.UTC(2017, 0, 1));
advanceTo(now);

it('works with no selection', () => {
  const wrapper = mount(
    <Calendar
      current={now}
      onChangeCurrent={f => f}
      onCancel={f => f}
      onSelect={f => f}
    />
  );
  expect(wrapper.find('Year').find('span')).toMatchInlineSnapshot(`
Array [
  <span>
     
  </span>,
  .emotion-0 {
  font-family: IBM Plex Sans,Lucida Grande,Tahoma,Verdana,Arial,sans-serif;
  font-size: 14px;
  line-height: 1.57;
  color: #2E3338;
  font-size: 16px;
  line-height: 1.5;
  margin-left: auto;
  margin-right: auto;
}

<span
    className="emotion-0 emotion-1"
  >
    January
     
    2017
  </span>,
]
`);
});

it('navigates to next month', () => {
  const handleChangeCurrent = jest.fn();
  const wrapper = mount(
    <Calendar
      current={now}
      onChangeCurrent={handleChangeCurrent}
      onCancel={f => f}
      onSelect={f => f}
      selected={now}
    />
  );
  wrapper
    .find('Button')
    .at(1)
    .simulate('click');
  expect(handleChangeCurrent.mock.calls[0][0].toDateString()).toBe(
    new Date(2017, 1, 1).toDateString()
  );
});

it('navigates to prev month', () => {
  const handleChangeCurrent = jest.fn();
  const wrapper = mount(
    <Calendar
      current={now}
      onChangeCurrent={handleChangeCurrent}
      onCancel={f => f}
      onSelect={f => f}
      selected={now}
    />
  );
  wrapper
    .find('Button')
    .at(0)
    .simulate('click');
  expect(handleChangeCurrent.mock.calls[0][0].toDateString()).toBe(
    new Date(2016, 11, 1).toDateString()
  );
});

it('selects date on click on cell', () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <Calendar
      current={now}
      onChangeCurrent={f => f}
      onCancel={f => f}
      onSelect={handleSelect}
      selected={now}
    />
  );
  wrapper
    .find(Cell)
    .at(WEEK_DAYS + 5)
    .find('button')
    .simulate('click');

  expect(handleSelect.mock.calls[0][0].toISOString().split('T')[0]).toBe(
    new Date(Date.UTC(2017, 0, 6)).toISOString().split('T')[0]
  );
});
