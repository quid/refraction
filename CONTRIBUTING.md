## Local development

To contribute to this repository you will first need to setup a local development environment.

You can do that running the following commands:

```bash
# Clone the repository
git clone git@github.com:quid/refraction.git
# Enter in the repository folder
cd refraction
# Install dependencies and build the packages (npm is not supported, use Yarn)
yarn
```

## Committing and publishing

This repository follows the [conventional commits][conventional-commits] specification,
in addition with the Lerna `publish` command.

This means that the package versions will automatically bump accordingly to the commit
messages that you write. Also, CHANGELOG files will get automatically updated.

If you edit a file in `packages/test` and commit the change with:

```bash
git commit -m 'fix: now it works'
```

When the deploy will occur, the `test` package version will get automatically bumped
by one patch version. Also, any package depending on `test` will automatically get the
new version (if matching the semver ranges defined) and will get a version bump as well.

This means the whole publishing process is completely automated and you don't have to worry
about manual version bumps anymore.

The allowed commit prefixes are:

- `chore` _(updating build tasks etc; no production code change)_
- `docs` _(changes to documentation)_
- `feat` _(new feature)_
- `fix` _(bug fix)_
- `perf` _(code performance improvements)_
- `refactor` _(refactoring production code)_
- `revert` _(git reverts)_
- `style` _(formatting, missing semi colons, etc; no code change)_
- `test` _(adding missing tests, refactoring tests; no production code change)_

## Creating a new package

You can quickly bootstrap a new package running:

```
yarn create-package
```

It will ask for a name and a description and will create the new package
in the `packages` folder.  
Additionally, it will automatically prepare your package to be bundled
using [microbundle][microbundle] and ready to be consumed by [Flow][flow] on
any consumer application.

The newly created package will have the following commands available:

- `yarn prepare` _(builds the library in `/dist`)_
- `yarn start` _(builds the library in `/dist` and watches for changes)_
- `yarn test` _(starts the Jest tests of this package)_

## Hacking a package

Most of the packages available in this code-base export React components.

To test the components while you are working on their code, you can run
`yarn start` on the root of the project, this will start the styleguide
playground, where you'll find your components ready to be tested.

Any code change will be reflected instantly on the playground.

## Running the playground

You can run our style guide playground by running `yarn start` on the root
of this repository.

<!-- links -->

[conventional-commits]: https://www.conventionalcommits.org/en/v1.0.0-beta.2/
[microbundle]: https://github.com/developit/microbundle
[flow]: https://flow.org/
