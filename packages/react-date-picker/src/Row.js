// @flow
import * as React from 'react';
import compareAsc from 'date-fns/compare_asc';
import styled from '@emotion/styled/macro';
import Cell from './Cell';

type Props = {
  days: Array<number>,
  date: Date,
  maxDate: ?Date,
  minDate: ?Date,
  selected?: Date,
  onSelect: Function,
};

const Row = styled(
  ({
    days,
    date: outerDate,
    selected,
    onSelect,
    maxDate,
    minDate,
    ...props
  }: Props) => (
    <tr {...props}>
      {days.map((day, key) => {
        const date = new Date(outerDate.valueOf());
        date.setDate(day);
        const isCurrent =
          new Date(Date.now()).toDateString() === date.toDateString();
        const isSelected =
          selected && selected.toDateString() === date.toDateString();

        // Disable the cell if the corresponding date is outside the minDate and maxDate
        const isTooLate = maxDate ? compareAsc(maxDate, date) === -1 : false;
        const isTooEarly = minDate ? compareAsc(date, minDate) === -1 : false;
        const disabled = isTooLate || isTooEarly;

        return (
          <Cell
            key={day || `idx-${key}`}
            onClick={() => onSelect(date)}
            isCurrent={isCurrent}
            isSelected={isSelected}
            disabled={disabled}
          >
            {day}
          </Cell>
        );
      })}
    </tr>
  )
)``;

export default Row;
