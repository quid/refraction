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
        value={'2019-01-01'}
        onChange={jest.fn()}
        calendarValue={new Date('2019-01-01')}
        onCalendarChange={handleCalendarChange}
      />
    );

    const nextMonthButton = wrapper
      .find('[data-context="calendar"]')
      .find('[data-action="next-month"]')
      .hostNodes();

    nextMonthButton.simulate('click');

    expect(handleCalendarChange).toHaveBeenCalledWith(new Date('2019-02-01'));
  });

  it('checks if if defaultCalendarValue works', () => {
    const wrapper = mount(
      <InputDate
        defaultIsOpen={true}
        value={'2019-01-01'}
        onChange={jest.fn()}
        defaultCalendarValue={new Date('2019-05-01')}
      />
    );

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('May 2019');
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
        value={'2019-01-01'}
        onChange={jest.fn()}
        calendarValue={new Date('2019-10-01')}
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

  it('value change should change change the calendar page if defaultCalendarValue is defined', () => {
    const wrapper = mount(
      <InputDate
        value="2019-01-01"
        defaultCalendarValue={new Date('2020-05-05')}
        onChange={jest.fn()}
        defaultIsOpen={true}
      />
    );

    expect(
      wrapper
        .find('[data-context="calendar"]')
        .find('Navigator')
        .find('Year')
        .text()
    ).toBe('May 2020');

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
