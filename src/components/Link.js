/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
import * as React from 'react';
import { Text } from '@quid/react-core';

const Link = props => <Text as="a" type="link bold" {...props} />;

export default Link;
