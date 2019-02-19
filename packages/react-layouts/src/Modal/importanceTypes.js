/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
const ACTION: 'action' = 'action';
const INFO: 'info' = 'info';
const WARNING: 'warning' = 'warning';

type Importance = typeof ACTION | typeof INFO | typeof WARNING;
export { ACTION, INFO, WARNING };
export type { Importance };
