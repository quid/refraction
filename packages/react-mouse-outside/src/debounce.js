// @flow
export const debounce = (
  callback: Function,
  delay: number = 250,
  interval?: TimeoutID
) => (...args: any) =>
  // $FlowFixMe(fzivolo): Flow definition doesn't support the advanced usage of setTimeout
  clearTimeout(interval, (interval = setTimeout(callback, delay, ...args)));

// This is mostly to avoid async troubles during tests, but it also
// prevents to make asynchronous the callback when the delay is set to 0
// and it should actually be synchronous
export const conditionalDebounce = (callback: Function, delay: number) =>
  delay > 0 ? debounce(callback, delay) : callback;
