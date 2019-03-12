/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
const mergeRefs = (...refs: Array<any>) => (ref: any) => {
  refs.forEach(resolvableRef => {
    if (typeof resolvableRef === 'function') {
      resolvableRef(ref);
    } else if (resolvableRef != null) {
      (resolvableRef: any).current = ref;
    }
  });
};

export default mergeRefs;
