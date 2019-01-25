/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
// istanbul ignore next
module.exports = {
  destination: {
    default: function(data) {
      return `packages/${data.packageName}`;
    },
  },
  prompts: {
    packageName: {
      message: 'package name (e.g. button)',
      validate: function(val) {
        return (
          /^([a-z0-9]+-?)+$/.test(val.trim()) ||
          'Must be lower + dash-cased string'
        );
      },
    },
    packageDescription: {
      message: 'package description',
    },
  },
};
