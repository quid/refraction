// @flow
import * as React from 'react';
import styled from '@emotion/styled/macro';
import { Icon, Button } from '@quid/react-core';
import addMonths from 'date-fns/add_months';
import getDaysInMonth from 'date-fns/get_days_in_month';

import Header from './Header';
import Cell from './Cell';
import Row from './Row';

import {
  Container,
  Calendar,
  Table,
  Year,
  Days,
  Navigator,
  Th,
} from './styles';

function loop(times) {
  return new Array(times).fill();
}

const chunk = size => input => {
  return input.reduce((arr, item, idx) => {
    return idx % size === 0
      ? [...arr, [item]]
      : [...arr.slice(0, -1), [...arr.slice(-1)[0], item]];
  }, []);
};

const DAYS_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const MONTHS_LABELS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const WEEK_LENGTH = 7;
const MIN_ROWS = 6;
const MIN_CELLS = WEEK_LENGTH * MIN_ROWS;

type Props = {
  forwardedRef?: React.ElementRef<any>,
  current: Date,
  selected?: Date,
  minDate?: Date,
  maxDate?: Date,
  onChangeCurrent: Function,
  onSelect: Function,
  className?: string,
};

const Inner = styled(
  class Inner extends React.Component<Props> {
    static defaultProps = {
      current: new Date(),
    };

    render() {
      const {
        forwardedRef,
        current,
        onChangeCurrent,
        onSelect, // eslint-disable-line no-unused-vars
        selected, // eslint-disable-line no-unused-vars
        className,
        minDate,
        maxDate,
        ...props
      } = this.props;

      // Selected date
      let selectedDate, selectedYear, selectedMonth, selectedDay;
      if (selected) {
        selectedYear = selected.getFullYear();
        selectedMonth = selected.getMonth();
        selectedDay = selected.getDate();
        selectedDate = new Date(selectedYear, selectedMonth, selectedDay);
      }

      // Current date
      const year = current.getFullYear();
      const month = current.getMonth();
      const day = current.getDate();

      // Calendar info
      const firstDay = new Date(year, month, 1);
      const startingDay = firstDay.getDay();
      const monthLength = getDaysInMonth(current);
      const monthName = MONTHS_LABELS[month];

      // Create cells of days
      const days = loop(startingDay)
        .fill()
        .concat(loop(monthLength).map((_, i) => i + 1))
        .concat(loop(MIN_CELLS - (startingDay + monthLength)));

      // Split cells in rows
      const rows = chunk(WEEK_LENGTH)(days);

      return (
        <Container
          className={className}
          ref={forwardedRef}
          tabIndex={-1}
          data-context="calendar"
          {...props}
        >
          <Header year={selectedYear} month={selectedMonth} day={selectedDay} />
          <Calendar>
            <Table>
              <thead>
                <tr>
                  <Th colSpan={WEEK_LENGTH}>
                    <Navigator>
                      <Button
                        data-action="previous-month"
                        importance="secondary"
                        size="small"
                        transparent
                        onClick={() =>
                          onChangeCurrent(
                            addMonths(new Date(year, month, day), -1)
                          )
                        }
                      >
                        <Icon name="chevron_left" />
                      </Button>
                      <Year>
                        {monthName} {year}
                      </Year>
                      <Button
                        data-action="next-month"
                        importance="secondary"
                        size="small"
                        transparent
                        onClick={() =>
                          onChangeCurrent(
                            addMonths(new Date(year, month, day), +1)
                          )
                        }
                      >
                        <Icon name="chevron_right" />
                      </Button>
                    </Navigator>
                  </Th>
                </tr>
                <tr>
                  {DAYS_LABELS.map((weekDay, index) => (
                    <Cell key={index} isHeader>
                      {weekDay}
                    </Cell>
                  ))}
                </tr>
              </thead>
              <Days>
                {rows.map((days, index) => (
                  <Row
                    key={index}
                    days={days}
                    date={new Date(year, month)}
                    selected={!isNaN(selectedDate) ? selectedDate : undefined}
                    onSelect={this.props.onSelect}
                    minDate={minDate}
                    maxDate={maxDate}
                  />
                ))}
              </Days>
            </Table>
          </Calendar>
        </Container>
      );
    }
  }
)``;

/** @visibleName Usage example */
const DatePicker = (React.forwardRef((props, ref) => (
  <Inner {...props} forwardedRef={ref} />
)): React.ComponentType<Props>);

export default DatePicker;
