/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { useCallback, useState, useEffect, createRef } from 'react';
import parse from 'date-fns/parse';
import { Manager, Popper, Reference } from 'react-popper';
import InputText from '../InputText';
import Calendar from '@quid/react-date-picker';
import { Icon } from '@quid/react-core';
import MouseOutside from '@quid/react-mouse-outside';
import mergeRefs from '@quid/merge-refs';

function toYYYYMMDD(date) {
  const day = ('0' + date.getDate()).slice(-2);
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export type Props = {
  value: string,
  onChange: Function,
  isOpen?: boolean,
  onToggle?: Function,
  min?: string,
  max?: string,
  disabled?: boolean,
  onCalendarChange?: Date => void,
  calendarValue?: Date,
};
function isBoolean(bool) {
  return bool === true || bool === false;
}
const InputDate = ({
  value,
  onChange,
  isOpen: isOpenProp,
  onToggle,
  min,
  max,
  onCalendarChange,
  calendarValue,
  ...props
}: Props) => {
  const component = createRef();
  const refA = createRef();
  const refB = createRef();

  const [current, setCurrent] = useState(calendarValue);
  const [isOpen, setOpen] = useState(
    isBoolean(isOpenProp) ? isOpenProp : false
  );

  const setIsOpen = useCallback(
    (isOpen: boolean) => {
      if (onToggle) {
        onToggle(isOpen);
      } else if (!isBoolean(isOpenProp)) {
        setOpen(isOpen);
      }
    },
    [onToggle, setOpen, isOpenProp]
  );

  const handleOpen = useCallback(() => {
    // istanbul ignore else
    if (isOpen === false) {
      setIsOpen(true);
    }
  }, [isOpen, setIsOpen]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [isOpen, setIsOpen]);

  const handleCloseOnBlur = useCallback(
    (evt: MouseEvent) => {
      const { relatedTarget } = evt;
      // istanbul ignore next (this is too DOM related)
      if (
        component.current && relatedTarget instanceof HTMLElement
          ? !component.current.contains(relatedTarget)
          : true
      ) {
        setIsOpen(false);
      }
    },
    [component, setIsOpen]
  );

  const handleInputChange = useCallback(
    (evt: SyntheticInputEvent<HTMLInputElement>) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  const handleSelect = useCallback(
    (selected: Date) => {
      setIsOpen(false);
      onChange(toYYYYMMDD(selected));
    },
    [setIsOpen, onChange]
  );

  const handleCurrentChange = useCallback(
    current => {
      onCalendarChange ? onCalendarChange(current) : setCurrent(current);
    },
    [setCurrent, onCalendarChange]
  );

  useEffect(() => {
    const current = new Date(value);
    // istanbul ignore else
    if (!isNaN(current.getTime()) && !onCalendarChange) {
      setCurrent(current);
    }
  }, [value, setCurrent, onCalendarChange]);

  //Sync is isOpenProp with state: isOpen
  useEffect(() => {
    if (isBoolean(isOpenProp) && isOpen !== isOpenProp) {
      setOpen(isOpenProp);
    }
  }, [isOpen, isOpenProp, setOpen]);

  useEffect(() => {
    if (onCalendarChange && current !== calendarValue) {
      setCurrent(calendarValue);
    }
  }, [current, calendarValue, onCalendarChange]);

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
                  onChangeCurrent={handleCurrentChange}
                  current={current || (isDateValid ? dateValue : new Date())}
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
