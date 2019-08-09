/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
export type ID = string | number;

export const ASC: 'asc' = 'asc';
export const DESC: 'desc' = 'desc';
export type SortOrder = Array<typeof ASC | typeof DESC | null>;

export type Data = {
  id: ID,
  [string]: any,
};
