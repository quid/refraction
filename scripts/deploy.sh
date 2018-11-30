# Setup Git user for automatic deploy
git config --global user.email "automated+write@quid.com"
git config --global user.name "automated.write"

# Override the read-only npmrc with one with write permissions
# the auth key is stored in Travis CI
bash scripts/npmrc.sh $AUTOMATED_WRITE_AUTH > .npmrc

cat .npmrc
npm whoami

# Bump versions, commit, push to git, publish to npm/jfrog
$(yarn bin)/lerna publish
