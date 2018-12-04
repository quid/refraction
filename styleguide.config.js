// @noflow
const fs = require('fs');
const override = require('./config-overrides').webpack;

const packages = fs
  .readdirSync('./packages')
  .filter(pkg => !pkg.startsWith('.'))
  .filter(pkg => pkg !== '_example')
  .map(pkg => ({
    name: pkg,
    content: `packages/${pkg}/README.md`,
    components: `packages/${pkg}/**/*.js`,
  }));

module.exports = {
  webpackConfig: override(require('react-scripts/config/webpack.config.dev')),
  ignore: ['**/*.{test,spec}.js', '**/dist/**/*'],
  sections: [
    {
      name: 'Introduction',
      content: 'docs/introduction.md',
    },
    {
      name: 'Packages',
      sections: packages,
    },
  ],
  getExampleFilename: componentPath =>
    componentPath.replace(/\.js$/, '.examples.md'),
};
