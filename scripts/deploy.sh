EMAIL="automated+write@quid.com"
NAME="automated.write"
AUTH=$AUTOMATED_WRITE_AUTH

# Setup Git user for automatic deploy
git config --global user.email $EMAIL
git config --global user.name $NAME

# Override the read-only npmrc with one with write permissions
# the auth key is stored in Travis CI
yarn config set username $NAME
yarn config set email $EMAIL
yarn config set _auth $AUTH

# Lerna can publish only if on master, Travis CI goes in detached state initially
git checkout master

# Bump versions, commit, push to git, publish to npm/jfrog
$(yarn bin)/lerna publish --no-verify-access --registry https://quid.jfrog.io/quid/api/npm/npm-quid/
