/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import createCache from '@emotion/cache';
import focusVisiblePlugin from '@quid/stylis-plugin-focus-visible';
export default createCache({ stylisPlugins: [focusVisiblePlugin] });
