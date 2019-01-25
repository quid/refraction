/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
export default (...fns: Array<?Function>) => (...args: Array<any>) =>
  fns.forEach(fn => fn && fn(...args));
