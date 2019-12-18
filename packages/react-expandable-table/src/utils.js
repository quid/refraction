/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import { ASC, DESC, type Data, type Cell } from './types';

export const getSortedData = (
  data: Array<Data>,
  sortOrder: typeof ASC | typeof DESC | null,
  sortBy: ?string
): Array<Data> => {
  if (data.length && sortOrder && sortBy) {
    return [...data].sort((a, b) => {
      const valueA = String(
        isCell(a[sortBy]) && a[sortBy].raw != null ? a[sortBy].raw : a[sortBy]
      );
      const valueB = String(
        isCell(b[sortBy]) && b[sortBy].raw != null ? b[sortBy].raw : b[sortBy]
      );
      const parsedA = parseFloat(valueA);
      const parsedB = parseFloat(valueB);
      if (isNaN(parsedA) === false && isNaN(parsedB) === false) {
        return sortOrder === ASC ? parsedA - parsedB : parsedB - parsedA;
      } else {
        if (valueA < valueB) {
          return sortOrder === ASC ? -1 : 1;
        }
        if (valueA > valueB) {
          return sortOrder === ASC ? 1 : -1;
        }
        return 0;
      }
    });
  }
  return data;
};

const RETURN = 13;
const SPACE = 32;
export const onKeyboardSelect = (onClick: () => void) => (
  evt: SyntheticKeyboardEvent<HTMLElement>
) =>
  [RETURN, SPACE].includes(evt.which) && void (onClick(), evt.preventDefault());

export const filterDataForPagination = (
  data: Array<Data>,
  page?: number,
  maxItemsPerPage: number
): Array<Data> => {
  if (page != null && page > 0) {
    const sliceFrom = (page - 1) * maxItemsPerPage;
    const sliceTo = page * maxItemsPerPage;
    return data.slice(sliceFrom, sliceTo);
  }
  return data;
};

export const isCell = (value: Cell): boolean %checks => {
  return (
    value != null &&
    typeof value === 'object' &&
    value.hasOwnProperty('raw') &&
    value.hasOwnProperty('content')
  );
};
