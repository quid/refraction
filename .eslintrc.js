// @noflow
const LEVEL = process.env.ESLINT_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  extends: 'react-app',
  rules: {
    'flow-header/flow-header': LEVEL,
    'notice/notice': [
      LEVEL,
      {
        templateFile: 'src/licenseHeader.js',
      },
    ],
    'import/no-extraneous-dependencies': LEVEL,
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/__mocks__/**'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
    },
  ],
  plugins: ['flow-header', 'notice'],
};
