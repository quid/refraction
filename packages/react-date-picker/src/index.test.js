// @flow
import * as React from 'react';
import { shallow, mount } from 'enzyme';
import { advanceTo } from 'jest-date-mock';
import Calendar from './';
import Cell from './Cell';

const WEEK_DAYS = 7;

const now = new Date(Date.UTC(2017, 0, 1));
advanceTo(now);

it('renders the expected markup', () => {
  const wrapper = shallow(
    <Calendar
      current={now}
      onChangeCurrent={f => f}
      onCancel={f => f}
      onSelect={f => f}
      selected={now}
    />
  );
  expect(wrapper).toMatchSnapshot();
});

it('works with no selection', () => {
  const wrapper = shallow(
    <Calendar
      current={now}
      onChangeCurrent={f => f}
      onCancel={f => f}
      onSelect={f => f}
    />
  );
  expect(
    wrapper.find('Row').findWhere(n => n.prop('selected') === undefined)
  ).toHaveLength(6);
});

it('navigates to next month', () => {
  const handleChangeCurrent = jest.fn();
  const wrapper = shallow(
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
  const wrapper = shallow(
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
