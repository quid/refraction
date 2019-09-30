# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.1](https://github.com/quid/ui-framework/compare/v4.0.0...v4.0.1) (2019-09-30)

**Note:** Version bump only for package @quid/react-dropdown





# [4.0.0](https://github.com/quid/ui-framework/compare/v3.3.5...v4.0.0) (2019-09-30)

**Note:** Version bump only for package @quid/react-dropdown





## [3.3.2](https://github.com/quid/ui-framework/compare/v3.3.1...v3.3.2) (2019-08-12)


### Bug Fixes

* loosen emotion/styled-base version requirement ([#102](https://github.com/quid/ui-framework/issues/102)) ([5c4bae2](https://github.com/quid/ui-framework/commit/5c4bae2))





# [3.3.0](https://github.com/quid/ui-framework/compare/v3.2.2...v3.3.0) (2019-08-09)

**Note:** Version bump only for package @quid/react-dropdown





## [3.2.2](https://github.com/quid/ui-framework/compare/v3.2.1...v3.2.2) (2019-08-09)


### Bug Fixes

* missing dependencies and minor linting issues ([88c3730](https://github.com/quid/ui-framework/commit/88c3730))





# [3.0.0](https://github.com/quid/ui-framework/compare/v2.5.0...v3.0.0) (2019-07-08)


### Bug Fixes

* never mix named and default exports ([06e907c](https://github.com/quid/ui-framework/commit/06e907c))


### BREAKING CHANGES

* we don’t mix default and named exports anymore, whenever a package needs to export multiple modules, it will export all of them as named exports.

Affected packages:
- @quid/react-tooltip
- @quid/react-popover
- @quid/react-dropdown





# [2.4.0](https://github.com/quid/ui-framework/compare/v2.3.0...v2.4.0) (2019-07-02)

**Note:** Version bump only for package @quid/react-dropdown





# [2.3.0](https://github.com/quid/ui-framework/compare/v2.2.0...v2.3.0) (2019-06-19)

**Note:** Version bump only for package @quid/react-dropdown





## [2.1.3](https://github.com/quid/ui-framework/compare/v2.1.2...v2.1.3) (2019-06-05)

**Note:** Version bump only for package @quid/react-dropdown





## [2.1.2](https://github.com/quid/ui-framework/compare/v2.1.1...v2.1.2) (2019-06-03)


### Bug Fixes

* upgrade Flow to 0.100.0 ([a682ab6](https://github.com/quid/ui-framework/commit/a682ab6))





## [2.1.1](https://github.com/quid/ui-framework/compare/v2.1.0...v2.1.1) (2019-05-31)


### Bug Fixes

* wraps DropdownList with styled ([#86](https://github.com/quid/ui-framework/issues/86)) ([bfe5533](https://github.com/quid/ui-framework/commit/bfe5533))





# [2.1.0](https://github.com/quid/ui-framework/compare/v2.0.0...v2.1.0) (2019-05-30)


### Features

* **react-dropdown:** export DropdownList to allow to be styled ([#84](https://github.com/quid/ui-framework/issues/84)) ([d56ef20](https://github.com/quid/ui-framework/commit/d56ef20))





# [2.0.0](https://github.com/quid/ui-framework/compare/v1.40.1...v2.0.0) (2019-05-23)

**Note:** Version bump only for package @quid/react-dropdown





## [1.40.1](https://github.com/quid/ui-framework/compare/v1.40.0...v1.40.1) (2019-04-18)

**Note:** Version bump only for package @quid/react-dropdown





# [1.40.0](https://github.com/quid/ui-framework/compare/v1.39.3...v1.40.0) (2019-04-12)

**Note:** Version bump only for package @quid/react-dropdown





## [1.39.3](https://github.com/quid/ui-framework/compare/v1.39.2...v1.39.3) (2019-04-11)

**Note:** Version bump only for package @quid/react-dropdown





## [1.39.1](https://github.com/quid/ui-framework/compare/v1.39.0...v1.39.1) (2019-04-10)

**Note:** Version bump only for package @quid/react-dropdown





# [1.39.0](https://github.com/quid/ui-framework/compare/v1.38.6...v1.39.0) (2019-04-02)


### Features

* add `renderDropdown` prop to react-dropdown ([de5a528](https://github.com/quid/ui-framework/commit/de5a528))





## [1.38.6](https://github.com/quid/ui-framework/compare/v1.38.5...v1.38.6) (2019-03-21)

**Note:** Version bump only for package @quid/react-dropdown





## [1.38.4](https://github.com/quid/ui-framework/compare/v1.38.3...v1.38.4) (2019-03-18)

**Note:** Version bump only for package @quid/react-dropdown





## [1.38.1](https://github.com/quid/ui-framework/compare/v1.38.0...v1.38.1) (2019-03-12)


### Bug Fixes

* set all packages to public by default ([6a4d961](https://github.com/quid/ui-framework/commit/6a4d961))





## [1.36.1](https://github.com/quid/ui-framework/compare/v1.36.0...v1.36.1) (2019-03-08)

**Note:** Version bump only for package @quid/react-dropdown





# [1.36.0](https://github.com/quid/ui-framework/compare/v1.35.1...v1.36.0) (2019-03-05)


### Features

* provides the original item as onChange argument at Dropdown ([40bae00](https://github.com/quid/ui-framework/commit/40bae00))





## [1.35.1](https://github.com/quid/ui-framework/compare/v1.35.0...v1.35.1) (2019-03-05)


### Bug Fixes

* don’t type error on undefined defaultSelectedItems ([13275ae](https://github.com/quid/ui-framework/commit/13275ae))





# [1.35.0](https://github.com/quid/ui-framework/compare/v1.34.1...v1.35.0) (2019-03-02)


### Bug Fixes

* fixes test coverage ([c1a27b7](https://github.com/quid/ui-framework/commit/c1a27b7))


### Features

* adds clearSelection support for Dropdown ([923a68d](https://github.com/quid/ui-framework/commit/923a68d))
* adds support for dropdown being used as controlled component ([5928d80](https://github.com/quid/ui-framework/commit/5928d80))
* adds test cases and warnings in case of wrong props applied ([d80b40e](https://github.com/quid/ui-framework/commit/d80b40e))





# [1.34.0](https://github.com/quid/ui-framework/compare/v1.33.0...v1.34.0) (2019-02-20)


### Features

* support for custom item children for the dropdown ([d481d5b](https://github.com/quid/ui-framework/commit/d481d5b))





## [1.30.4](https://github.com/quid/ui-framework/compare/v1.30.3...v1.30.4) (2019-02-07)


### Bug Fixes

* apply normal style to text by default ([97cce43](https://github.com/quid/ui-framework/commit/97cce43))





## [1.30.3](https://github.com/quid/ui-framework/compare/v1.30.2...v1.30.3) (2019-02-07)

**Note:** Version bump only for package @quid/react-dropdown





## [1.30.2](https://github.com/quid/ui-framework/compare/v1.30.1...v1.30.2) (2019-02-06)

**Note:** Version bump only for package @quid/react-dropdown





## [1.30.1](https://github.com/quid/ui-framework/compare/v1.30.0...v1.30.1) (2019-02-06)

**Note:** Version bump only for package @quid/react-dropdown





# [1.29.0](https://github.com/quid/ui-framework/compare/v1.28.0...v1.29.0) (2019-02-05)

**Note:** Version bump only for package @quid/react-dropdown





## [1.27.1](https://github.com/quid/ui-framework/compare/v1.27.0...v1.27.1) (2019-01-31)

**Note:** Version bump only for package @quid/react-dropdown





# [1.27.0](https://github.com/quid/ui-framework/compare/v1.26.1...v1.27.0) (2019-01-31)


### Features

* new react-dropdown component ([38e20e8](https://github.com/quid/ui-framework/commit/38e20e8))
