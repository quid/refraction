// @noflow
const fs = require('fs');
const override = require('./config-overrides');

const packages = fs
  .readdirSync('./packages')
  .filter(pkg => !pkg.startsWith('.'))
  .map(pkg => ({
    name: pkg,
    content: `packages/${pkg}/README.md`,
    components: `packages/${pkg}/**/*.js`,
  }));

module.exports = {
  webpackConfig: override(require('react-scripts/config/webpack.config.dev')),
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    ...packages,
  ],
  getExampleFilename: componentPath =>
    componentPath.replace(/\.js$/, '.examples.md'),
};
