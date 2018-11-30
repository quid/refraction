module.exports = {
  hooks: {
    commitmsg: 'commitlint -e $GIT_PARAMS',
  },
};
