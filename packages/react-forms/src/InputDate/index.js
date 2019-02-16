/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import parse from 'date-fns/parse';
import { Manager, Popper, Reference } from 'react-popper';
import InputText from '../InputText';
import Calendar from '@quid/react-date-picker';
import { Icon } from '@quid/react-core';
import MouseOutside from '@quid/react-mouse-outside';
import mergeRefs from '../utils/mergeRefs';

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
  className?: string,
  min?: string,
  max?: string,
  disabled?: boolean,
};

type State = {
  current?: Date,
  isOpen: boolean,
};

export default class InputDate extends React.Component<Props, State> {
  component = React.createRef /*:: <HTMLElement> */();
  refA = React.createRef /*:: <HTMLElement> */();
  refB = React.createRef /*:: <HTMLElement> */();

  state = {
    current: undefined,
    isOpen: false,
  };

  get isOpen(): boolean {
    return Boolean(this.props.onToggle ? this.props.isOpen : this.state.isOpen);
  }

  setIsOpen = (isOpen: boolean) =>
    this.props.onToggle
      ? this.props.onToggle(isOpen)
      : this.setState({ isOpen });

  handleOpen = () => this.isOpen === false && this.setIsOpen(true);

  handleClose = /* istanbul ignore next */ () =>
    void (this.isOpen === true && this.setIsOpen(false));

  handleCloseOnBlur = (evt: MouseEvent) => {
    const { relatedTarget } = evt;
    // istanbul ignore next (this is too DOM related)
    if (
      this.component.current && relatedTarget instanceof HTMLElement
        ? !this.component.current.contains(relatedTarget)
        : true
    ) {
      this.setIsOpen(false);
    }
  };

  handleInputChange = (evt: SyntheticInputEvent<HTMLInputElement>) => {
    const current = new Date(evt.target.value);
    // istanbul ignore else
    if (!isNaN(current.getTime())) {
      this.setState({ current });
    }
    this.props.onChange(evt.target.value);
  };

  handleSelect = (selected: Date) => {
    this.setIsOpen(false);
    this.props.onChange(toYYYYMMDD(selected));
  };

  preventDefault = (evt: Event) => evt.preventDefault();

  render() {
    const {
      value,
      onChange, // eslint-disable-line no-unused-vars
      isOpen: isOpenProp, // eslint-disable-line no-unused-vars
      onToggle, // eslint-disable-line no-unused-vars
      className,
      min,
      max,
      ...props
    } = this.props;

    const { current } = this.state;

    const isOpen = this.isOpen;

    const dateValue = parse(value);
    const isDateValid = !isNaN(dateValue.getTime());

    return (
      <MouseOutside
        onClickOutside={this.handleClose}
        refs={[this.refA, this.refB]}
      >
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
                      onClick={!props.disabled ? this.handleOpen : undefined}
                    />
                  )}
                  onFocus={this.handleOpen}
                  focus={isOpen}
                  onBlur={this.handleCloseOnBlur}
                  value={value}
                  onChange={this.handleInputChange}
                  onClick={this.preventDefault}
                  min={min}
                  max={max}
                  ref={mergeRefs(ref, this.refA)}
                  {...props}
                />
              )}
            </Reference>
            {isOpen && (
              <Popper placement="bottom">
                {({ ref, style }) => (
                  <Calendar
                    onChangeCurrent={current => this.setState({ current })}
                    current={current || (isDateValid ? dateValue : new Date())}
                    onSelect={this.handleSelect}
                    selected={isDateValid ? dateValue : undefined}
                    minDate={min ? new Date(min) : undefined}
                    maxDate={max ? new Date(max) : undefined}
                    ref={mergeRefs(ref, this.component, this.refB)}
                    style={style}
                  />
                )}
              </Popper>
            )}
          </Manager>
        )}
      </MouseOutside>
    );
  }
}
