/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import { Range } from 'react-range';
import useControlledState from '@quid/react-use-controlled-state';
import styled from '@emotion/styled/macro';
import useResizeAware from 'react-resize-aware';
import Handle from './Handle';
import { HANDLE_SIZE, Segment, StepTicks } from './styles';
import { fromPercentToPixel, drawSegment } from './utils';

type Props = {
  onChange?: (Array<number>) => void,
  values?: Array<number>,
  defaultValues?: Array<number>,
  name: string,
  min?: number,
  max?: number,
  step?: number,
  readOnly?: boolean,
  disabled?: boolean,
  discrete?: boolean,
  className?: string,
};
export const Track = styled.div`
  position: relative;
  top: 50%;
  background-position: center;
  background-size: 100% 2px;
  background-repeat: no-repeat;
  height: 2px;
  border-radius: 2px;
  transform: translateY(-50%);

  &::before {
    content: '';
    position: absolute;
    height: ${props => (props.disabled ? HANDLE_SIZE / 1.5 : HANDLE_SIZE)}px;
    width: 100%;
    transform: translateY(-25%);
  }
`;

const InputRange = styled(
  ({
    onChange,
    values: controlledValues,
    defaultValues,
    name,
    min = 0,
    max = 100,
    step = 1,
    readOnly = false,
    disabled = false,
    discrete = false,
    className,
    ...props
  }: Props) => {
    const [values = [min], setValues] = useControlledState(
      defaultValues,
      controlledValues,
      onChange
    );
    const [resizeListener, sizes] = useResizeAware();

    const [start, end = max] = values;
    const width = sizes.width;

    const getSegments = React.useCallback(
      (isTwoHandled: boolean) => {
        const isGrayedOut = disabled || readOnly;
        const unit = 100 / (max - min);

        const padding = isGrayedOut ? HANDLE_SIZE : 0;

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
      },
      [disabled, min, max, readOnly, width, start, end]
    );

    return (
      <Range
        values={values}
        onChange={setValues}
        min={min}
        max={max}
        step={step}
        disabled={disabled || readOnly}
        renderTrack={({ props, children }) => (
          <Track {...props} disabled={disabled} className={className}>
            {children}
            {getSegments(values.length === 2)}
            {discrete && (
              <StepTicks step={step} min={min} max={max} values={values} />
            )}
            {resizeListener}
          </Track>
        )}
        renderThumb={({ index, props, value }) => {
          const { transform, zIndex, ...styles } = props.style;
          return (
            <div
              style={{ position: 'absolute', zIndex: zIndex + 1, transform }}
            >
              <Handle
                {...props}
                style={styles}
                value={value}
                disabled={disabled}
                readOnly={readOnly}
                name={`${name}${index}`}
              />
            </div>
          );
        }}
        {...props}
      />
    );
  }
)();

export default InputRange;
