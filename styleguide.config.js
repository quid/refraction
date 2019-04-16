/**
 * Copyright (c) Quid, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
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
  webpackConfig: override(
    require('react-scripts/config/webpack.config')('development')
  ),
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
    Link: require.resolve('./src/components/Link'),
    Logo: require.resolve('./src/components/Logo'),
    TableOfContentsRenderer: require.resolve(
      './src/components/TableOfContentsRenderer'
    ),
    ComponentsListRenderer: require.resolve(
      './src/components/ComponentsListRenderer'
    ),
    Examples: require.resolve('./src/components/Examples'),
    SectionHeading: require.resolve('./src/components/SectionHeading'),
  },
  theme: {
    sidebarWidth: 300,
    color: {
      base: '#2E3338',
      baseBackground: '#FFFFFF',
      sidebarBackground: '#FFFFFF',
      border: '#E3E6E8',
    },
    fontFamily: {
      base: 'IBM Plex Sans, Lucida Grande, Tahoma, Verdana, Arial, sans-serif',
    },
    fontSize: {
      h1: 30,
      h2: 24,
      h3: 20,
      h4: 16,
      h5: 14,
      h6: 14,
      base: 14,
      text: 14,
      small: 12,
    },
  },
};
