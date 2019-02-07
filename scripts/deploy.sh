# Setup Git user for automatic deploy
git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME
git remote set-url origin https://${GITHUB_TOKEN}@github.com/quid/refraction.git

# Lerna can publish only if on master, Travis CI goes in detached state initially
git checkout master

# Override the read-only npmrc with one with write permissions
# the auth key is stored in Travis CI
bash scripts/npmrc.sh $AUTOMATED_WRITE_AUTH > .npmrc

# Without this, Lerna will not publish because it checks for uncommitted files
git update-index --assume-unchanged .npmrc

# Bump versions, commit, push to git, publish to npm
$(yarn bin)/lerna publish --yes
