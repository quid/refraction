/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { useCallback, useRef, useEffect, createRef } from 'react';
import parse from 'date-fns/parse';
import { Manager, Popper, Reference } from 'react-popper';
import InputText from '../InputText';
import Calendar from '@quid/react-date-picker';
import { Icon } from '@quid/react-core';
import MouseOutside from '@quid/react-mouse-outside';
import mergeRefs from '@quid/merge-refs';
import useControlledState from '@quid/react-use-controlled-state';

function toYYYYMMDD(date) {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

function isBoolean(bool) {
  return bool === true || bool === false;
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
  defaultCalendarValue?: Date,
  onCalendarChange?: Date => void,
  calendarValue?: Date,
};

const InputDate = ({
  value,
  onChange,
  defaultIsOpen = false,
  isOpen: isOpenProp,
  onToggle,
  min,
  max,
  defaultCalendarValue,
  onCalendarChange,
  calendarValue,
  ...props
}: Props) => {
  const component = createRef();
  const refA = createRef();
  const refB = createRef();
  const didMount = useRef();

  const [isOpen, setOpen] = useControlledState(
    isBoolean(isOpenProp) ? undefined : defaultIsOpen,
    isOpenProp,
    onToggle
  );

  const [current, setCurrent] = useControlledState(
    calendarValue === undefined
      ? defaultCalendarValue
        ? defaultCalendarValue
        : new Date(value)
      : undefined,
    calendarValue,
    onCalendarChange
  );

  const handleOpen = useCallback(() => {
    // istanbul ignore else
    if (isOpen === false) {
      setOpen(true);
    }
  }, [isOpen, setOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setOpen(false);
    }
  }, [isOpen, setOpen]);

  const handleCloseOnBlur = useCallback(
    (evt: MouseEvent) => {
      const { relatedTarget } = evt;
      // istanbul ignore next (this is too DOM related)
      if (
        component.current && relatedTarget instanceof HTMLElement
          ? !component.current.contains(relatedTarget)
          : true
      ) {
        setOpen(false);
      }
    },
    [component, setOpen]
  );

  const setCurrentOnValueChange = useCallback(
    value => {
      const current = new Date(value);
      // istanbul ignore else
      if (!isNaN(current.getTime())) {
        setCurrent(current);
      }
    },
    [setCurrent]
  );

  const handleInputChange = useCallback(
    (evt: SyntheticInputEvent<HTMLInputElement>) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  const handleSelect = useCallback(
    (selected: Date) => {
      setOpen(false);
      onChange(toYYYYMMDD(selected));
    },
    [setOpen, onChange]
  );

  //Syncs calendar page with value
  //Avoid first run for defaultCalendarValue to take effect
  //Avoid when onCalendarChange or calendarValue is defined
  useEffect(() => {
    if (!(onCalendarChange || calendarValue)) {
      if (didMount.current === true) {
        setCurrentOnValueChange(value);
      } else {
        didMount.current = true;
      }
    }
  }, [value, calendarValue, onCalendarChange, setCurrentOnValueChange]);

  const preventDefault = (evt: Event) => evt.preventDefault();
  const dateValue = parse(value);
  const isDateValid = !isNaN(dateValue.getTime());

  return (
    <MouseOutside onClickOutside={handleClose} refs={[refA, refB]}>
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
                onClick={preventDefault}
                min={min}
                max={max}
                ref={mergeRefs(ref, refA)}
                {...props}
              />
            )}
          </Reference>
          {isOpen && (
            <Popper placement="bottom">
              {({ ref, style }) => (
                <Calendar
                  onChangeCurrent={setCurrent}
                  current={current}
                  onSelect={handleSelect}
                  selected={isDateValid ? dateValue : undefined}
                  minDate={min ? new Date(min) : undefined}
                  maxDate={max ? new Date(max) : undefined}
                  ref={mergeRefs(ref, component, refB)}
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
