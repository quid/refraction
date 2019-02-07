/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// @noflow
const path = require('path');
const { override, useEslintRc, babelInclude } = require('customize-cra');
const lernaAlias = require('lerna-alias');

/**
 * react-app-rewired configuration file
 *
 * Theses functions are used to override the configurations provided by
 * create-react-app to be able to tweak it without ejecting the
 * project. Be careful!
 */
module.exports = {
  webpack: override(
    babelInclude([path.resolve('src'), path.resolve('packages')]),
    useEslintRc()
  ),
  jest: config => {
    // create-react-app looks for tests in `src`, we look in `packages`
    config.testMatch = config.testMatch.map(m => m.replace('src', 'packages'));
    config.collectCoverageFrom = ['**/packages/**/*.js'];
    config.coveragePathIgnorePatterns = ['/dist/'];

    // we tell Jest to import the @quid packages from their source directory
    // rather than from the dist one, so we don't have to build them each time
    config.moduleNameMapper = lernaAlias.jest();
    return config;
  },
};
