// @noflow
const fs = require('fs');
const override = require('./config-overrides').webpack;

const ignore = [
  '**/__mocks__/**',
  '**/*.test.js',
  '**/*.spec.js',
  '**/node_modules/**',
];

const packages = fs
  .readdirSync('./packages')
  .filter(pkg => !pkg.startsWith('.'))
  .filter(pkg => pkg !== '_example')
  .map(pkg => ({
    content: `packages/${pkg}/README.md`,
    components: `packages/${pkg}/**/*.js`,
    ignore,
  }));

module.exports = {
  webpackConfig: override(require('react-scripts/config/webpack.config.dev')),
  ignore: ['**/*.{test,spec}.js', '**/dist/**/*'],
  skipComponentsWithoutExample: true,
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
  require: ['@quid/theme/fonts/asap/index.css', './src/index.css'],
};
