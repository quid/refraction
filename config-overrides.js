// @noflow
const path = require('path');
const {
  override,
  useEslintRc,
  useBabelRc,
  babelInclude,
} = require('customize-cra');

/**
 * react-app-rewired configuration file
 *
 * Theses functions are used to override the configurations provided by
 * create-react-app to be able to tweak it without ejecting the
 * project. Be careful!
 */
module.exports = {
  webpack: override(
    babelInclude([path.resolve('packages')]),
    useBabelRc(),
    useEslintRc()
  ),
  jest: config => {
    // create-react-app looks for tests in `src`, we look in `packages`
    config.testMatch = config.testMatch.map(m => m.replace('src', 'packages'));
    config.collectCoverageFrom = ['**/packages/**'];
    config.coveragePathIgnorePatterns = ['/dist/', '.snap$', '.json$'];
    return config;
  },
};
