/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputDateWrapper from './__mocks__/InputDateWrapper';
import { act } from 'react-dom/test-utils';

describe('InputDate calendar tests', () => {
  it('checks if the calendar resets to proper date when value changes', () => {
    const onChangeHandler = jest.fn();

    const wrapper = mount(
      <InputDateWrapper
        onChange={onChangeHandler}
        defaultValue="2019-01-01"
        isOpen={true}
      />
    );

    //Expected calendar is focused at January 2019
    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('January 2019');

    //Click next month arrow twice
    const nextMonthButton = wrapper
      .find('[data-context="calendar"]')
      .find('[data-action="next-month"]')
      .hostNodes();

    nextMonthButton.simulate('click');
    nextMonthButton.simulate('click');

    //Expected calendar is focused at March 2019
    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('March 2019');

    //Select 10th of March
    const marchTenButton = wrapper
      .find('[data-context="calendar"]')
      .find('tbody')
      .find('tr')
      .find('td')
      .find('button')
      .at(14);

    expect(marchTenButton.text()).toBe('10');

    marchTenButton.simulate('click');
    expect(onChangeHandler).toHaveBeenCalledWith('2019-03-10');

    //Change the value of InputDate to default
    wrapper.find('[data-action="reset"]').simulate('click');

    //Expected calendar to focus according to date change

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('January 2019');
    const calendarHeaderProps = wrapper
      .find('[data-context="calendar"]')
      .find('Header')
      .props();

    expect(calendarHeaderProps.day).toBe(1);
    expect(calendarHeaderProps.month).toBe(0);
    expect(calendarHeaderProps.year).toBe(2019);
  });

  it('checks if the calendarValue changes properly', () => {
    const onCalendarChange = jest.fn();
    const defaultDate = '2019-02-01';
    const wrapper = mount(
      <InputDateWrapper
        defaultValue={defaultDate}
        isOpen={true}
        onCalendarChange={onCalendarChange}
        defaultCalendarValue={new Date(defaultDate)}
      />
    );

    //Expected calendar is focused at January 2019
    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('February 2019');

    //Click next month arrow twice
    const nextMonthButton = wrapper
      .find('[data-context="calendar"]')
      .find('[data-action="next-month"]')
      .hostNodes();
    nextMonthButton.simulate('click');
    nextMonthButton.simulate('click');

    //Expected calendar is focused at March 2019
    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('April 2019');

    expect(onCalendarChange).toHaveBeenCalledWith(new Date('2019-03-01'));

    //Reset calendar position to selected date
    wrapper.find('[data-action="reset-position"]').simulate('click');

    //Expected calendar is focused at February 2019
    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Year')
        .at(1)
        .text()
    ).toBe('February 2019');

    wrapper.find('[data-action="close"]').simulate('click');

    expect(wrapper.find('[data-context="calendar"]').length).toBe(0);
  });
});
