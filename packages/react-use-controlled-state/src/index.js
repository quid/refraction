/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';

declare function useControlledState<T>( // eslint-disable-line no-redeclare
  ?T,
  ?T,
  ?(T) => void
): [T, ((T => T) | T) => void];

// Easily switch between fully controlled to fully uncontrolled component
// if only controlledValue and controlValue are defined, act as fully controlled
// if only defaultValue is defined (and, optionally, controlValue is defined), act as fully uncontrolled
// eslint-disable-next-line no-redeclare
function useControlledState(defaultValue, controlledValue, controlValue) {
  const [internalState, setInternalState] = React.useState(defaultValue);

  const isControlled = (controlledValue, defaultValue): boolean %checks =>
    controlledValue !== undefined && defaultValue === undefined;

  if (controlledValue !== undefined && defaultValue !== undefined) {
    console.error(
      'Warning: both `controlledValue` and `defaultValue` have been defined, decide wheter if you desire the component to be controlled or uncontrolled defining only one of the two properties.'
    );
  }

  if (controlledValue !== undefined && controlValue == null) {
    console.error(
      'Warning: a `controlledValue` was provided, but a `controlValue` is missing. To update the state of the Hook you will need to define one.'
    );
  }

  const setState = React.useCallback(
    value => {
      typeof controlValue === 'function' &&
        controlValue(
          typeof value === 'function' ? value(controlledValue) : value
        );

      setInternalState(value);
    },
    [controlledValue, controlValue, defaultValue]
  );

  const state = isControlled(controlledValue, defaultValue)
    ? controlledValue
    : internalState;

  return [state, setState];
}

export default useControlledState;
