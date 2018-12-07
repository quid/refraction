// @noflow
// istanbul ignore next
module.exports = {
  destination: {
    default: function(data) {
      return `packages/${data.packageName}`;
    },
  },
  prompts: {
    packageName: {
      message: 'package name (e.g. button)',
      validate: function(val) {
        return (
          /^([a-z0-9]+\-?)+$/.test(val.trim()) ||
          'Must be lower + dash-cased string'
        );
      },
    },
    packageDescription: {
      message: 'package description',
    },
  },
};
