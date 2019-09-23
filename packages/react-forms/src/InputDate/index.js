/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { useCallback, createRef } from 'react';
import parse from 'date-fns/parse';
import { Manager, Popper, Reference } from 'react-popper';
import InputText from '../InputText';
import Calendar from '@quid/react-date-picker';
import { Icon } from '@quid/react-core';
import MouseOutside from '@quid/react-mouse-outside';
import mergeRefs from '@quid/merge-refs';
import useControlledState from '@quid/react-use-controlled-state';

function toYYYYMMDD(date: Date): string {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export type Props = {
  value: string,
  onChange: string => void,
  defaultIsOpen?: boolean,
  isOpen?: boolean,
  onToggle?: boolean => void,
  min?: string,
  max?: string,
  disabled?: boolean,
  onCalendarChange?: string => void,
  calendarValue?: string,
};

const InputDate = ({
  value,
  onChange,
  defaultIsOpen,
  isOpen: isOpenProp,
  onToggle,
  min,
  max,
  onCalendarChange,
  calendarValue,
  ...props
}: Props) => {
  const inputRef = createRef();
  const calendarRef = createRef();

  const dateValue = parse(value);
  const isDateValid = !isNaN(dateValue.getTime());

  const [isOpen = false, setOpen] = useControlledState(
    defaultIsOpen,
    isOpenProp,
    onToggle
  );

  const [baseCurrent = dateValue, setCurrent] = useControlledState(
    undefined,
    calendarValue,
    onCalendarChange
  );

  const current = parse(baseCurrent);
  const isCurrentValid = !isNaN(current.getTime());

  const handleOpen = useCallback(() => setOpen(true), [setOpen]);
  const handleClose = useCallback(() => setOpen(false), [setOpen]);

  const handleCloseOnBlur = useCallback(
    ({ relatedTarget }: MouseEvent) => {
      // istanbul ignore next (this is too DOM related)
      if (
        calendarRef.current && relatedTarget instanceof HTMLElement
          ? !calendarRef.current.contains(relatedTarget)
          : true
      ) {
        setOpen(false);
      }
    },
    [calendarRef, setOpen]
  );

  const setCurrentOnValueChange = useCallback(
    value => {
      const current = new Date(value);
      // istanbul ignore else
      if (!isNaN(current.getTime())) {
        setCurrent(toYYYYMMDD(current));
      }
    },
    [setCurrent]
  );

  const handleInputChange = useCallback(
    (evt: SyntheticInputEvent<HTMLInputElement>) => {
      if (evt.target.value) {
        onChange(evt.target.value);
        setCurrentOnValueChange(evt.target.value);
      }
    },
    [onChange, setCurrentOnValueChange]
  );

  const handleSelect = useCallback(
    (selected: Date) => {
      setOpen(false);
      onChange(toYYYYMMDD(selected));
    },
    [setOpen, onChange]
  );

  const handleCurrentChange = useCallback(
    date => setCurrent(toYYYYMMDD(date)),
    [setCurrent]
  );

  return (
    <MouseOutside onClickOutside={handleClose} refs={[inputRef, calendarRef]}>
      {() => (
        <Manager>
          <Reference>
            {({ ref }) => (
              <InputText
                type="date"
                renderAddon={({ marginRightClass }) => (
                  <Icon
                    name="calendar"
                    className={marginRightClass}
                    onClick={!props.disabled ? handleOpen : undefined}
                  />
                )}
                onFocus={handleOpen}
                focus={isOpen}
                onBlur={handleCloseOnBlur}
                value={value}
                onChange={handleInputChange}
                onClick={(evt: Event) => evt.preventDefault()}
                min={min}
                max={max}
                ref={mergeRefs(ref, inputRef)}
                {...props}
              />
            )}
          </Reference>
          {isOpen && (
            <Popper placement="bottom">
              {({ ref, style }) => (
                <Calendar
                  onChangeCurrent={handleCurrentChange}
                  current={
                    isCurrentValid
                      ? current
                      : isDateValid
                      ? dateValue
                      : new Date()
                  }
                  onSelect={handleSelect}
                  selected={isDateValid ? dateValue : undefined}
                  minDate={min ? new Date(min) : undefined}
                  maxDate={max ? new Date(max) : undefined}
                  ref={mergeRefs(ref, calendarRef)}
                  style={style}
                />
              )}
            </Popper>
          )}
        </Manager>
      )}
    </MouseOutside>
  );
};

export default InputDate;
