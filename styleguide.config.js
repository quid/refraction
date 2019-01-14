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
  .filter(pkg => fs.existsSync(`packages/${pkg}/README.md`))
  .map(pkg => ({
    name: pkg,
    content: `packages/${pkg}/README.md`,
    components: [`packages/${pkg}/**/index.js`],
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
  usageMode: 'expand',
  require: ['@quid/theme/fonts/index.css', './src/index.css'],
  styleguideComponents: {
    StyleGuide: require.resolve('./src/components/StyleGuide'),
    Wrapper: require.resolve('./src/components/Wrapper'),
  },
};
