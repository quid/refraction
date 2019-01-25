/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @flow
import * as React from 'react';

export default function nlToBr(text: string): Array<string | React.Node> {
  return text.split(/\n()/g).map((str, i) => (str ? str : <br key={i} />));
}
