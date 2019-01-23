// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import Row from './Row';
import Cell from './Cell';

// Fixed date
const now = new Date(2017, 1, 1);

const days = [undefined].concat(new Array(31).fill().map((_, i) => i + 1));

it('renders the expected markup', () => {
  const wrapper = mount(
    <table>
      <tbody>
        <Row
          minDate={undefined}
          maxDate={undefined}
          days={days}
          date={now}
          selected={now}
          onSelect={f => f}
        />
      </tbody>
    </table>
  );
  expect(wrapper).toMatchSnapshot();
});

it('selects date on click', () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <table>
      <tbody>
        <Row
          minDate={undefined}
          maxDate={undefined}
          days={days}
          date={now}
          selected={now}
          onSelect={handleSelect}
        />
      </tbody>
    </table>
  );
  wrapper
    .find(Cell)
    .at(2)
    .find('button')
    .simulate('click');
  expect(handleSelect).toHaveBeenCalled();
  expect(handleSelect.mock.calls[0][0].toString()).toBe(
    new Date(2017, 1, 2).toString()
  );
});

it("empty cells aren't clickable", () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <table>
      <tbody>
        <Row
          minDate={undefined}
          maxDate={undefined}
          days={days}
          date={now}
          selected={now}
          onSelect={handleSelect}
        />
      </tbody>
    </table>
  );
  wrapper
    .find(Cell)
    .at(0)
    .find('button')
    .simulate('click');
  expect(handleSelect).not.toBeCalled();
});

it("doesn't allow to click on dates outside the minDate and maxDate range", () => {
  const handleSelect = jest.fn();
  const wrapper = mount(
    <table>
      <tbody>
        <Row
          minDate={new Date(2017, 1, 10)}
          maxDate={new Date(2017, 1, 15)}
          days={days}
          date={now}
          selected={now}
          onSelect={handleSelect}
        />
      </tbody>
    </table>
  );
  wrapper
    .find(Cell)
    .at(6)
    .find('button')
    .simulate('click');
  expect(handleSelect).not.toBeCalled();
});
