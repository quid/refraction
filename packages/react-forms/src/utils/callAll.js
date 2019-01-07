// @flow
export default (...fns: Array<?Function>) => (...args: Array<any>) =>
  fns.forEach(fn => fn && fn(...args));
