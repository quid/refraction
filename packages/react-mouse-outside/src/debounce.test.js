/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import { debounce, conditionalDebounce } from './debounce';

it('should debounce the function with custom delay', async done => {
  const fn = jest.fn();
  const debFn = debounce(fn, 5);

  debFn();
  debFn();

  setTimeout(() => {
    expect(fn.mock.calls.length).toBe(1);
    done();
  }, 20);
});

it('should debounce the function with default delay', async done => {
  const fn = jest.fn();
  const debFn = debounce(fn);

  debFn();
  debFn();

  setTimeout(() => {
    expect(fn.mock.calls.length).toBe(1);
    done();
  }, 500);
});

it('should not debounce if delay is zero', () => {
  const fn = jest.fn();
  const debFn = conditionalDebounce(fn, 0);

  debFn();
  debFn();

  expect(fn.mock.calls.length).toBe(2);
});

it('should debounce if delay is non zero', async done => {
  const fn = jest.fn();
  const debFn = conditionalDebounce(fn, 10);

  debFn();
  debFn();

  setTimeout(() => {
    expect(fn.mock.calls.length).toBe(1);
    done();
  }, 20);
});
