module.exports = {
  hooks: {
    commitmsg: 'commitlint -e $GIT_PARAMS',
    'pre-commit': 'lint-staged',
  },
};
