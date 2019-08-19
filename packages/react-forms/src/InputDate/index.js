/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import React, { useCallback, useState, useEffect } from 'react';
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

type Props = {
  value: string,
  onChange: Function,
  isOpen?: boolean,
  onToggle?: Function,
  min?: string,
  max?: string,
  disabled?: boolean,
};

type State = {
  current?: Date,
  isOpen: boolean,
};

const InputDate = ({
  value,
  onChange, // eslint-disable-line no-unused-vars
  isOpen: isOpenProp, // eslint-disable-line no-unused-vars
  onToggle, // eslint-disable-line no-unused-vars
  min,
  max,
  ...props
}: Props) => {
  const component = React.createRef();
  const refA = React.createRef();
  const refB = React.createRef();

  const [current, setCurrent] = useState();
  const [isOpen, setOpen] = useState(isOpenProp);

  useEffect(() => {
    if (isOpen !== isOpenProp) {
      setOpen(isOpenProp);
    }
  }, [isOpen, isOpenProp]);

  const setIsOpen = useCallback(
    (isOpen: boolean) => {
      onToggle ? onToggle(isOpen) : setOpen(isOpen);
    },
    [onToggle, setOpen]
  );

  const handleOpen = useCallback(() => {
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
      const current = new Date(evt.target.value);
      // istanbul ignore else
      if (!isNaN(current.getTime())) {
        setCurrent(current);
      }
      onChange(evt.target.value);
    },
    [setCurrent, onChange]
  );

  const handleSelect = useCallback(
    (selected: Date) => {
      setIsOpen(false);
      onChange(toYYYYMMDD(selected));
    },
    [setIsOpen, onChange]
  );

  const preventDefault = useCallback((evt: Event) => evt.preventDefault(), []);
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
                  onChangeCurrent={current => setCurrent(current)}
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
