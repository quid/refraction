// @noflow
const LEVEL = process.env.ESLINT_ENV === 'production' ? 'error' : 'warn';

module.exports = {
  extends: 'react-app',
  rules: {
    'flow-header/flow-header': LEVEL,
  },
  plugins: ['flow-header'],
};
