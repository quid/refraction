/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';
import mergeRefs from '.';

it('merges two React refs', () => {
  const ref = document.createElement('div');
  const a = React.createRef();
  const b = React.createRef();
  mergeRefs(a, b)(ref);

  expect(a.current).toBe(ref);
  expect(b.current).toBe(ref);
});

it('merges two function refs', () => {
  const ref = document.createElement('div');
  const a = jest.fn();
  const b = jest.fn();
  mergeRefs(a, b)(ref);

  expect(a).toHaveBeenCalledWith(ref);
  expect(b).toHaveBeenCalledWith(ref);
});

it('merges two invalid refs', () => {
  const ref = document.createElement('div');
  const a = null;
  const b = null;
  mergeRefs(a, b)(ref);
  expect(a).toBe(null);
  expect(b).toBe(null);
});

it('merges all the supported types', () => {
  const ref = document.createElement('div');
  const a = React.createRef();
  const b = jest.fn();
  const c = null;
  mergeRefs(a, b, c)(ref);

  expect(a.current).toBe(ref);
  expect(b).toHaveBeenCalledWith(ref);
  expect(c).toBe(null);
});
