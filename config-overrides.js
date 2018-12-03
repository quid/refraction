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
module.exports = override(
  babelInclude([path.resolve('packages')]),
  useBabelRc(),
  useEslintRc()
);
