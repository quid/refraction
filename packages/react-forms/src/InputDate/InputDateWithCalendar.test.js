/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { mount } from 'enzyme';
import InputDate from './';

describe('InputDate calendar tests', () => {
  it('checks if onCalendarChange is called when calendar arrow is clicked', () => {
    const handleCalendarChange = jest.fn();
    const wrapper = mount(
      <InputDate
        defaultIsOpen={true}
        value="2019-01-01'"
        onChange={jest.fn()}
        calendarValue="2019-01-01"
        onCalendarChange={handleCalendarChange}
      />
    );

    const nextMonthButton = wrapper
      .find('[data-context="calendar"]')
      .find('[data-action="next-month"]')
      .hostNodes();

    nextMonthButton.simulate('click');

    expect(handleCalendarChange).toHaveBeenCalledWith('2019-02-01');
  });

  it('checks if default calendar page equals to the value', () => {
    const wrapper = mount(
      <InputDate
        defaultIsOpen={true}
        value={'2019-02-01'}
        onChange={jest.fn()}
      />
    );

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('February 2019');
  });

  it('checks if default calendar page equals to the value without defaultCalendarValue prop', () => {
    const wrapper = mount(
      <InputDate
        defaultIsOpen={true}
        value={'2019-02-01'}
        onChange={jest.fn()}
      />
    );

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('February 2019');
  });

  it('checks if calendarValue is set when defined', () => {
    const wrapper = mount(
      <InputDate
        defaultIsOpen={true}
        value="2019-01-01"
        onChange={jest.fn()}
        calendarValue="2019-10-01"
        onCalendarChange={jest.fn()}
      />
    );

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('October 2019');
  });

  it('checks if defaultIsOpen opens the calendar', () => {
    const wrapperWithDef = mount(
      <InputDate onChange={jest.fn()} value="2019-01-01" defaultIsOpen />
    );
    const wrapperWithoutDef = mount(
      <InputDate onChange={jest.fn()} value="2019-01-01" />
    );

    expect(wrapperWithDef.exists('[data-context="calendar"]')).toBe(true);
    expect(wrapperWithoutDef.exists('[data-context="calendar"]')).toBe(false);
  });

  it('value change should change the calendar page if calendarValue is not controlled', () => {
    const wrapper = mount(
      <InputDate value="2019-01-01" onChange={jest.fn()} defaultIsOpen={true} />
    );

    wrapper.setProps({
      value: '2019-10-02',
    });

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('October 2019');

    wrapper.setProps({
      value: '2018-10-02',
    });

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('October 2018');
  });
});
