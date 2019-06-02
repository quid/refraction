/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import ResizeAware from 'react-resize-aware';
import styled from '@emotion/styled/macro';
import { withFallback as wf } from '@quid/theme';
import {
  TRACK_BACKGROUND,
  Container,
  Track,
  Segment,
  StepTicks,
} from './styles';
import Handle from './Handle';

export type ComputedValue = { start: number, end: number };
export type Value = number | { start?: number, end?: number };

// We need this to give a proper default value to `track`
// otherwise during tests something may fail because of the
// jsdom quirks that make the component lifecycle execute without
// having the root node initialized
const div = document.createElement('div');

export const handles = {
  START: 'start',
  END: 'end',
};

export const keys = {
  RIGHT: 39,
  LEFT: 37,
};

export function fromPercentToPixel(percent: number, width: number): number {
  return (width / 100) * percent;
}

function hasName(name): boolean %checks {
  return typeof name === 'string';
}

// We used to use CSS gradients with hard stops, but this bug is
// producing a bad visual result (crbug.com/696603)
export function wrapWithSvg(
  content: React$Element<any>,
  { className, on, ...props }: { className?: string, on: boolean }
) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      {...props}
    >
      {content}
    </svg>
  );
}

export const Rect = styled(props => (
  <rect
    {...props}
    fill="currentColor"
    height={2}
    width={Math.max(props.width, 0)}
    x={Math.max(props.offset, 0)}
    rx={1}
    ry={1}
  />
))`
  color: ${wf(props =>
    props.disabled ? TRACK_BACKGROUND(props) : props.theme.selected
  )};
`;

export function drawSegment(width: number, offset: number, disabled: boolean) {
  return (props: Object) =>
    wrapWithSvg(
      <Rect width={width} offset={offset} disabled={disabled} />,
      props
    );
}

export function getDecimals(num: number) {
  const stepArr = num.toString().split('.');
  return stepArr[1] ? stepArr[1].length : 0;
}

export function toFixed(num: number, decimals: number) {
  const parts = num.toString().split('.');
  return `${parts[0]}.${(parts[1] || '00000000').slice(0, decimals)}`;
}

export function valueToObject(value?: Value): Object {
  if (value === undefined) {
    return {};
  }

  if (typeof value === 'object') {
    if (
      value.hasOwnProperty(handles.START) &&
      !isNaN(value[handles.START]) &&
      value.hasOwnProperty(handles.END) &&
      !isNaN(value[handles.END])
    ) {
      return {
        [handles.START]: +value[handles.START],
        [handles.END]: +value[handles.END],
      };
    } else if (
      value.hasOwnProperty(handles.START) &&
      !isNaN(value[handles.START])
    ) {
      return {
        [handles.START]: +value[handles.START],
      };
    } else {
      return {
        [handles.END]: +value[handles.END],
      };
    }
  }

  return {
    [handles.START]: +value,
  };
}

export function computeW3cDefaultValue(min: number, max: number) {
  return max > min ? min + (max - min) / 2 : min;
}

export function isItTwoHandled(value: ComputedValue) {
  return !isNaN(value[handles.END]);
}

export function areValuesEqual(a?: Value, b?: Value): boolean {
  const compA = valueToObject(a);
  const compB = valueToObject(b);

  return (
    compA[handles.START] === compB[handles.START] &&
    compA[handles.END] === compB[handles.END]
  );
}

type Props = {
  onChange?: Function,
  value?: Value,
  defaultValue?: Value,
  name?: string,
  min: number,
  max: number,
  step: number,
  readOnly: boolean,
  disabled: boolean,
  discrete: boolean,
  className?: string,
};

type Updater = () => Object;
type HandleType = 'start' | 'end';
type State = {
  width: number,
  value?: Object,
  dragging: boolean,
  activeHandle: HandleType,
  stepLen: number,
  fontSize: number,
};

// The following component relies on a lot of DOM APIs to work, I'm not able
// to test it with Jest and JSDOM unfortunately
/* istanbul ignore next */
class Inner extends React.PureComponent<Props, State> {
  track: HTMLElement = div;

  static defaultProps = {
    min: 0,
    max: 100,
    step: 1,
    readOnly: false,
    disabled: false,
    discrete: false,
  };

  // Don't use state because
  // 1. We don't care/want to re-render on each pos update
  // 2. We need this value to be updated istantly
  pos = 0;

  state = {
    width: 0,
    value: undefined,
    dragging: false,
    activeHandle: handles.START,
    stepLen: 0,
    fontSize: 13,
  };

  uncontrolledOnChange = (updater: Updater) => {
    const prevValue = { ...this.state.value };
    this.setState(updater, () => {
      const isTwoHandled = this.state.value
        ? isItTwoHandled(this.state.value)
        : false;
      if (this.props.onChange && !areValuesEqual(prevValue, this.state.value)) {
        this.props.onChange(
          // $FlowFixMe(fzivolo): need better type checking for `isTwoHandled`, just being lazy
          isTwoHandled ? this.state.value : this.state.value.start
        );
      }
    });
  };

  controlledOnChange = (updater: Updater) => {
    const { value } = updater();
    const isTwoHandled = isItTwoHandled(value);
    const newValue = isTwoHandled ? value : value[handles.START];
    if (this.props.onChange && !areValuesEqual(this.props.value, newValue)) {
      this.props.onChange(isTwoHandled ? newValue : newValue.start);
    }
  };

  get onChange(): Updater => void {
    return this.props.onChange &&
      (!isNaN(valueToObject(this.props.value)[handles.START]) ||
        !isNaN(valueToObject(this.props.value)[handles.END]))
      ? this.controlledOnChange
      : this.uncontrolledOnChange;
  }

  handleMouseDown = (
    { clientX: pos }: { clientX: number },
    activeHandle: HandleType
  ) => {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    this.updatePos(pos);
    this.setState({ dragging: true, activeHandle });
  };

  handleMouseMove = (evt: MouseEvent | Object) => {
    const { clientX: curPos } = evt;
    const {
      track,
      pos,
      state: { dragging, stepLen, activeHandle },
    } = this;

    if (track && dragging) {
      const { left } = track.getBoundingClientRect();

      // This is used to avoid unwanted text selection while dragging
      evt.preventDefault && evt.preventDefault();

      const diff = curPos - pos;
      const change = diff / stepLen;

      const currentValue = this.computedValue[activeHandle];
      const newValue =
        Math.round((currentValue + change) / this.props.step) * this.props.step;

      this.updatePos(left + (newValue - this.props.min) * stepLen);
      this.updateValue(newValue);
    }
  };

  handleMouseUp = () => this.setState({ dragging: false });

  handleTrackMouseDown = ({ clientX }: { clientX: number }) => {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    const { min } = this.props;
    const { stepLen } = this.state;
    const { left } = this.track.getBoundingClientRect();
    const value = this.computedValue;
    const startOffset = stepLen * value[handles.START];
    const endOffset = stepLen * value[handles.END];
    const middleOffset = startOffset + (endOffset - startOffset) / 2;
    const curPos = clientX - left;

    let activeHandle;
    if (curPos > middleOffset && value[handles.END]) {
      activeHandle = handles.END;
    } else {
      activeHandle = handles.START;
    }
    this.updatePos(left + (value[activeHandle] - min) * stepLen);

    this.setState({ dragging: true, activeHandle }, () => {
      this.handleMouseMove({ clientX });
    });
  };

  handleKeyDown = ({ which }: KeyboardEvent) => {
    if (this.props.disabled || this.props.readOnly) {
      return;
    }

    const { activeHandle } = this.state;
    const { step } = this.props;

    if (which === keys.LEFT) {
      this.updateValue(this.computedValue[activeHandle] - step);
    } else if (which === keys.RIGHT) {
      this.updateValue(this.computedValue[activeHandle] + step);
    }
  };

  updateValue = (newValue: number) =>
    this.onChange((state = this.state) => {
      const safeNewValue =
        Math.round(
          parseFloat(toFixed(newValue, getDecimals(this.props.step))) /
            this.props.step
        ) * this.props.step;

      const { activeHandle, value = this.computedValue } = state;
      const { min, max } = this.props;

      const activeHandleValue =
        activeHandle === handles.START
          ? Math.min(
              !isNaN(value[handles.END]) ? value[handles.END] : max,
              Math.max(min, safeNewValue)
            )
          : Math.max(Math.min(max, safeNewValue), value[handles.START]);

      return {
        value: {
          ...value,
          [activeHandle]: activeHandleValue,
        },
      };
    });

  updatePos = (pos: number) => {
    const { left, right } = this.track.getBoundingClientRect();
    this.pos = Math.max(Math.min(pos, right), left);
  };

  computeSizes = () => {
    this.setState((state, { min, max }) => ({
      width: this.track.offsetWidth,
      stepLen: this.track.offsetWidth / (max - min),
      fontSize: Number(
        window
          .getComputedStyle(this.track)
          .getPropertyValue('font-size')
          .replace('px', '')
      ),
    }));
  };

  get computedValue(): ComputedValue {
    const { value, defaultValue, min, max } = this.props;

    const stateValueObj = valueToObject(this.state.value);
    const propsValueObj = valueToObject(value);
    const defaultValueObj = valueToObject(defaultValue);
    const w3cDefaultValue = valueToObject(computeW3cDefaultValue(min, max));

    // If it's a controlled input, use `value`
    // If there's already a `value` in state, use it
    // If it's an uncontrolled input, use `defaultValue` as initial value
    // If nothing is defined, we fallback to the default defined by W3C
    return {
      [handles.START]: !isNaN(propsValueObj[handles.START])
        ? propsValueObj[handles.START]
        : !isNaN(stateValueObj[handles.START])
        ? stateValueObj[handles.START]
        : !isNaN(defaultValueObj[handles.START])
        ? defaultValueObj[handles.START]
        : w3cDefaultValue[handles.START],
      [handles.END]: !isNaN(propsValueObj[handles.END])
        ? propsValueObj[handles.END]
        : !isNaN(stateValueObj[handles.END])
        ? stateValueObj[handles.END]
        : !isNaN(defaultValueObj[handles.END])
        ? defaultValueObj[handles.END]
        : w3cDefaultValue[handles.END],
    };
  }

  getSegments = (isTwoHandled: boolean) => {
    const { min, max, disabled, readOnly } = this.props;
    const { width, fontSize } = this.state;
    const isGrayedOut = disabled || readOnly;
    const computedValue = this.computedValue;
    const { start, end = max } = computedValue;
    const unit = 100 / (max - min);

    // 0.43em is the handle size as defined in the CSS of this component
    const handleSize = fontSize * 0.462;
    const padding = isGrayedOut ? handleSize : 0;

    const a: number = isTwoHandled ? start - min : 0;
    const b: number = isTwoHandled ? end - min : start - min;

    const seg1W = fromPercentToPixel(unit * a, width);
    const Seg1 = drawSegment(seg1W - padding, 0, true);
    const seg2W =
      fromPercentToPixel(unit * b, width) -
      fromPercentToPixel(unit * a, width) -
      padding * (isTwoHandled ? 2 : 1);
    const seg2O = seg1W + (isTwoHandled ? padding : 0);
    const Seg2 = drawSegment(seg2W, seg2O, false);
    const Seg3 = drawSegment(
      fromPercentToPixel(100 - unit * b, width) - padding,
      fromPercentToPixel(unit * b, width) + padding,
      true
    );

    return [
      isTwoHandled && <Segment as={Seg1} key="1" />,
      <Segment as={Seg2} key="2" on />,
      <Segment as={Seg3} key="3" />,
    ];
  };

  // start and end refer to the handle's name
  handleFocusStart = () => this.setState({ activeHandle: handles.START });
  handleFocusEnd = () => this.setState({ activeHandle: handles.END });
  handleMouseDownStart = (evt: MouseEvent) =>
    this.handleMouseDown(evt, handles.START);
  handleMouseDownEnd = (evt: MouseEvent) =>
    this.handleMouseDown(evt, handles.END);

  componentDidMount() {
    this.computeSizes();
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    const {
      computedValue,
      props: {
        discrete,
        name,
        min,
        max,
        readOnly,
        disabled,
        onChange, // eslint-disable-line no-unused-vars
        step,
        className,
        ...props
      },
      state: { dragging, activeHandle },
    } = this;

    const isGrayedOut = readOnly || disabled;

    // Is two handled only if it has both `start` and `end` props
    const isTwoHandled = isItTwoHandled(computedValue);
    const valueText = isTwoHandled
      ? `${computedValue[handles.START]} - ${computedValue[handles.END]}`
      : `${computedValue[handles.START]}`;

    // If there's a single handle, we keep the original name
    // in case there are two handles, we append `1` and `2` to the original name
    // to distinguish them
    let nameStart, nameEnd;
    if (hasName(name)) {
      nameStart = isTwoHandled ? `${name}1` : name;
      nameEnd = `${name}2`;
    }

    // Ticks shouldn't overlap with handles, we hide them if necessary
    const hiddenTicks = Object.values(computedValue)
      .map(
        (value): ?number =>
          typeof value === 'number' ? (value - min) / step : undefined
      )
      .filter(value => value !== undefined);

    return (
      <Container
        as={ResizeAware}
        role="slider"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={valueText}
        aria-readonly={readOnly}
        aria-disabled={disabled}
        aria-orientation="horizontal"
        onResize={this.computeSizes}
        {...props}
      >
        <Track
          disabled={isGrayedOut}
          ref={el => el !== null && (this.track = el)}
          onMouseDown={this.handleTrackMouseDown}
          data-action="click-track"
        >
          {this.getSegments(isTwoHandled)}
        </Track>
        <Handle
          value={computedValue[handles.START]}
          name={hasName(name) ? nameStart : undefined}
          disabled={disabled}
          readOnly={readOnly}
          dragging={activeHandle === handles.START && dragging}
          onMouseDown={this.handleMouseDownStart}
          onKeyDown={this.handleKeyDown}
          offset={Math.round(
            ((computedValue[handles.START] - min) / (max - min)) *
              this.state.width
          )}
          onFocus={this.handleFocusStart}
        />
        {discrete && (
          <StepTicks step={step} min={min} max={max} hidden={hiddenTicks} />
        )}
        {isTwoHandled && (
          <Handle
            value={computedValue[handles.END]}
            name={hasName(name) ? nameEnd : undefined}
            disabled={disabled}
            readOnly={readOnly}
            dragging={activeHandle === handles.END && dragging}
            onMouseDown={this.handleMouseDownEnd}
            onKeyDown={this.handleKeyDown}
            offset={Math.round(
              ((computedValue[handles.END] - min) / (max - min)) *
                this.state.width
            )}
            onFocus={this.handleFocusEnd}
          />
        )}
      </Container>
    );
  }
}

const InputRange = styled(Inner)();

// @component
export default InputRange;
