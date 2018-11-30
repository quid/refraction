NPM_EMAIL="automated+write@quid.com"
NPM_NAME="automated.write"
NPM_AUTH=$AUTOMATED_WRITE_AUTH

# Setup Git user for automatic deploy
git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME
git remote set-url origin https://${GITHUB_TOKEN}@github.com/quid/ui-framework.git

# Override the read-only npmrc with one with write permissions
# the auth key is stored in Travis CI
yarn config set username $NPM_NAME
yarn config set email $NPM_EMAIL
yarn config set _auth $NPM_AUTH

# Lerna can publish only if on master, Travis CI goes in detached state initially
git checkout master

# Bump versions, commit, push to git, publish to npm/jfrog
$(yarn bin)/lerna publish --yes --no-verify-access --registry https://quid.jfrog.io/quid/api/npm/npm-quid/
