# Setup Git user for automatic deploy
git config --global user.email $GITHUB_EMAIL
git config --global user.name $GITHUB_NAME
git remote set-url origin https://${GITHUB_TOKEN}@github.com/quid/refraction.git
git fetch

# Lerna can publish only if on master, Travis CI goes in detached state initially
git checkout master

# Start verdaccio
$(yarn bin)/verdaccio &

# Bump versions, commit, push to git, publish to npm
$(yarn bin)/lerna publish --yes --registry http://localhost:4873
