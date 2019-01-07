// @flow
import * as React from 'react';
import mergeRefs from './mergeRefs';

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
