# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [4.4.0](https://github.com/quid/refraction/compare/v4.3.1...v4.4.0) (2019-11-01)


### Features

* add light theme support to react-expandable-table ([ad888b6](https://github.com/quid/refraction/commit/ad888b6))





## [4.3.1](https://github.com/quid/refraction/compare/v4.3.0...v4.3.1) (2019-11-01)


### Bug Fixes

* assign to checkbox only properties provided as props ([98bc105](https://github.com/quid/refraction/commit/98bc105))





# [4.3.0](https://github.com/quid/refraction/compare/v4.2.1...v4.3.0) (2019-10-29)


### Bug Fixes

* onClick triggered when Button is child of disabled fieldset ([29e4928](https://github.com/quid/refraction/commit/29e4928))


### Features

* add new ButtonGroup component ([610a519](https://github.com/quid/refraction/commit/610a519))





## [4.2.1](https://github.com/quid/refraction/compare/v4.2.0...v4.2.1) (2019-10-23)


### Bug Fixes

* fixes dropdown multiple selection wrong behaviour for input value ([#115](https://github.com/quid/refraction/issues/115)) ([ce1edb1](https://github.com/quid/refraction/commit/ce1edb1))





# [4.2.0](https://github.com/quid/refraction/compare/v4.1.1...v4.2.0) (2019-10-17)


### Features

* adds dropdown category selection option ([#113](https://github.com/quid/refraction/issues/113)) ([893bc14](https://github.com/quid/refraction/commit/893bc14))





## [4.1.1](https://github.com/quid/refraction/compare/v4.1.0...v4.1.1) (2019-10-17)


### Bug Fixes

* upgrade react-resize-aware and fix yarn.lock ([#114](https://github.com/quid/refraction/issues/114)) ([28ee9cc](https://github.com/quid/refraction/commit/28ee9cc))





# [4.1.0](https://github.com/quid/refraction/compare/v4.0.1...v4.1.0) (2019-10-07)


### Features

* allow to override InputDate Popper.js props ([#112](https://github.com/quid/refraction/issues/112)) ([f3d7a72](https://github.com/quid/refraction/commit/f3d7a72))





## [4.0.1](https://github.com/quid/refraction/compare/v4.0.0...v4.0.1) (2019-10-04)


### Bug Fixes

* updated use-debouce to 3.x([#111](https://github.com/quid/refraction/issues/111)) ([784bc1b](https://github.com/quid/refraction/commit/784bc1b))





# [4.0.0](https://github.com/quid/refraction/compare/v3.3.5...v4.0.0) (2019-10-01)


### Bug Fixes

* controlled InputRange and performance improvements ([#107](https://github.com/quid/refraction/issues/107)) ([70b24bc](https://github.com/quid/refraction/commit/70b24bc))
* eslint issues with version 6.5.0 ([48dad40](https://github.com/quid/refraction/commit/48dad40))


### BREAKING CHANGES

* the InputRange “value” property has been replaced by a “values” property that takes an array rather than an object.





## [3.3.5](https://github.com/quid/refraction/compare/v3.3.4...v3.3.5) (2019-09-26)


### Bug Fixes

* trigger change event on InputNumber step up/down ([#105](https://github.com/quid/refraction/issues/105)) ([48f52e9](https://github.com/quid/refraction/commit/48f52e9))





## [3.3.4](https://github.com/quid/refraction/compare/v3.3.3...v3.3.4) (2019-09-24)

**Note:** Version bump only for package quid-ui





## [3.3.3](https://github.com/quid/refraction/compare/v3.3.2...v3.3.3) (2019-09-12)

**Note:** Version bump only for package quid-ui





## [3.3.2](https://github.com/quid/refraction/compare/v3.3.1...v3.3.2) (2019-08-12)


### Bug Fixes

* loosen emotion/styled-base version requirement ([#102](https://github.com/quid/refraction/issues/102)) ([5c4bae2](https://github.com/quid/refraction/commit/5c4bae2))





## [3.3.1](https://github.com/quid/refraction/compare/v3.3.0...v3.3.1) (2019-08-12)


### Bug Fixes

* set box-sizing to ExpandableTable cell ([#101](https://github.com/quid/refraction/issues/101)) ([0ecfeb3](https://github.com/quid/refraction/commit/0ecfeb3))





# [3.3.0](https://github.com/quid/refraction/compare/v3.2.2...v3.3.0) (2019-08-09)


### Features

* @quid/react-expandable-table pkg ([#97](https://github.com/quid/refraction/issues/97)) ([a053b1c](https://github.com/quid/refraction/commit/a053b1c))





## [3.2.2](https://github.com/quid/refraction/compare/v3.2.1...v3.2.2) (2019-08-09)


### Bug Fixes

* missing dependencies and minor linting issues ([88c3730](https://github.com/quid/refraction/commit/88c3730))





## [3.2.1](https://github.com/quid/refraction/compare/v3.2.0...v3.2.1) (2019-08-08)

**Note:** Version bump only for package quid-ui





# [3.2.0](https://github.com/quid/refraction/compare/v3.1.0...v3.2.0) (2019-07-09)


### Features

* exports flow ContentProps from Breadcrumb component ([#95](https://github.com/quid/refraction/issues/95)) ([ae23fab](https://github.com/quid/refraction/commit/ae23fab))





# [3.1.0](https://github.com/quid/refraction/compare/v3.0.0...v3.1.0) (2019-07-09)


### Features

* adds renderContent to BreadCrumb component ([#94](https://github.com/quid/refraction/issues/94)) ([5e9be65](https://github.com/quid/refraction/commit/5e9be65))





# [3.0.0](https://github.com/quid/refraction/compare/v2.5.0...v3.0.0) (2019-07-08)


### Bug Fixes

* never mix named and default exports ([06e907c](https://github.com/quid/refraction/commit/06e907c))


### BREAKING CHANGES

* we don’t mix default and named exports anymore, whenever a package needs to export multiple modules, it will export all of them as named exports.

Affected packages:
- @quid/react-tooltip
- @quid/react-popover
- @quid/react-dropdown





# [2.5.0](https://github.com/quid/refraction/compare/v2.4.0...v2.5.0) (2019-07-03)


### Features

* add theme support for Popover and Tooltip ([cc98c84](https://github.com/quid/refraction/commit/cc98c84))





# [2.4.0](https://github.com/quid/refraction/compare/v2.3.0...v2.4.0) (2019-07-02)


### Bug Fixes

* forward ref to Icon ([6641ad2](https://github.com/quid/refraction/commit/6641ad2))
* use react-popover Helpers type to define react-tooltip render-prop ([c37a41c](https://github.com/quid/refraction/commit/c37a41c))


### Features

* export Helpers type from react-popover ([3a86bcc](https://github.com/quid/refraction/commit/3a86bcc))





# [2.3.0](https://github.com/quid/refraction/compare/v2.2.0...v2.3.0) (2019-06-19)


### Bug Fixes

* update link color to fix contrast issues ([ec192d5](https://github.com/quid/refraction/commit/ec192d5))


### Features

* add gray0 color ([be27677](https://github.com/quid/refraction/commit/be27677))





# [2.2.0](https://github.com/quid/refraction/compare/v2.1.3...v2.2.0) (2019-06-09)


### Features

* add mousemove and delay feats to Popover ([8518851](https://github.com/quid/refraction/commit/8518851))
* new Tooltip component ([0df5371](https://github.com/quid/refraction/commit/0df5371))





## [2.1.3](https://github.com/quid/refraction/compare/v2.1.2...v2.1.3) (2019-06-05)


### Bug Fixes

* forward Button “ref” property ([00d30e9](https://github.com/quid/refraction/commit/00d30e9))





## [2.1.2](https://github.com/quid/refraction/compare/v2.1.1...v2.1.2) (2019-06-03)


### Bug Fixes

* upgrade Flow to 0.100.0 ([a682ab6](https://github.com/quid/refraction/commit/a682ab6))





## [2.1.1](https://github.com/quid/refraction/compare/v2.1.0...v2.1.1) (2019-05-31)


### Bug Fixes

* wraps DropdownList with styled ([#86](https://github.com/quid/refraction/issues/86)) ([bfe5533](https://github.com/quid/refraction/commit/bfe5533))





# [2.1.0](https://github.com/quid/refraction/compare/v2.0.0...v2.1.0) (2019-05-30)


### Bug Fixes

* updates yarn.lock file ([4d88cce](https://github.com/quid/refraction/commit/4d88cce))


### Features

* **react-dropdown:** export DropdownList to allow to be styled ([#84](https://github.com/quid/refraction/issues/84)) ([d56ef20](https://github.com/quid/refraction/commit/d56ef20))





# [2.0.0](https://github.com/quid/refraction/compare/v1.40.1...v2.0.0) (2019-05-23)


### Bug Fixes

* reduce quid-icons footprint ([dd4411a](https://github.com/quid/refraction/commit/dd4411a))


### BREAKING CHANGES

* this release removes a lot of icons from the quid-icons font since they weren’t used in our applications. We suggest to use a general purpose iconic font if you need a wider set of icons.

This commit also adds support for woff2 compression.





## [1.40.1](https://github.com/quid/refraction/compare/v1.40.0...v1.40.1) (2019-04-18)


### Bug Fixes

* restore PR [#73](https://github.com/quid/refraction/issues/73), accidentally reverted by 9f0c810 ([6846cb0](https://github.com/quid/refraction/commit/6846cb0))
* workaround for missing icons ([012ebab](https://github.com/quid/refraction/commit/012ebab))





# [1.40.0](https://github.com/quid/refraction/compare/v1.39.3...v1.40.0) (2019-04-12)


### Bug Fixes

* expose colors and sizes from themes ([38e507f](https://github.com/quid/refraction/commit/38e507f))
* make Button accept `ref` property ([9f0c810](https://github.com/quid/refraction/commit/9f0c810))


### Features

* add react-use-controlled-state package ([cdadf9a](https://github.com/quid/refraction/commit/cdadf9a))
* new react-popover component ([269f345](https://github.com/quid/refraction/commit/269f345))





## [1.39.3](https://github.com/quid/refraction/compare/v1.39.2...v1.39.3) (2019-04-11)


### Bug Fixes

* properly space Icon when inside Button ([b2bb849](https://github.com/quid/refraction/commit/b2bb849))





## [1.39.2](https://github.com/quid/refraction/compare/v1.39.1...v1.39.2) (2019-04-11)

**Note:** Version bump only for package quid-ui





## [1.39.1](https://github.com/quid/refraction/compare/v1.39.0...v1.39.1) (2019-04-10)

**Note:** Version bump only for package quid-ui





# [1.39.0](https://github.com/quid/refraction/compare/v1.38.6...v1.39.0) (2019-04-02)


### Features

* add `renderDropdown` prop to react-dropdown ([de5a528](https://github.com/quid/refraction/commit/de5a528))





## [1.38.6](https://github.com/quid/refraction/compare/v1.38.5...v1.38.6) (2019-03-21)


### Performance Improvements

* reduce time to first render with font-family: swap ([e7f036e](https://github.com/quid/refraction/commit/e7f036e))





## [1.38.5](https://github.com/quid/refraction/compare/v1.38.4...v1.38.5) (2019-03-21)


### Bug Fixes

* semicolon in wrong position of modal backdrop ([a9993d5](https://github.com/quid/refraction/commit/a9993d5))





## [1.38.4](https://github.com/quid/refraction/compare/v1.38.3...v1.38.4) (2019-03-18)


### Bug Fixes

* support React Router v5 ([6ab0170](https://github.com/quid/refraction/commit/6ab0170))





## [1.38.3](https://github.com/quid/refraction/compare/v1.38.2...v1.38.3) (2019-03-18)


### Bug Fixes

* modal overlay issue ([ce8a7f7](https://github.com/quid/refraction/commit/ce8a7f7))





## [1.38.2](https://github.com/quid/refraction/compare/v1.38.1...v1.38.2) (2019-03-18)


### Bug Fixes

* export Modal ([b9d06e4](https://github.com/quid/refraction/commit/b9d06e4))
* NavBar styling issues ([c80702b](https://github.com/quid/refraction/commit/c80702b))





## [1.38.1](https://github.com/quid/refraction/compare/v1.38.0...v1.38.1) (2019-03-12)


### Bug Fixes

* set all packages to public by default ([6a4d961](https://github.com/quid/refraction/commit/6a4d961))





# [1.38.0](https://github.com/quid/refraction/compare/v1.37.0...v1.38.0) (2019-03-12)


### Features

* move merge-refs to a dedicated package ([3045291](https://github.com/quid/refraction/commit/3045291))





# [1.37.0](https://github.com/quid/refraction/compare/v1.36.2...v1.37.0) (2019-03-12)


### Features

* add renderArrowIcon support to Breadcrumb ([5c657ac](https://github.com/quid/refraction/commit/5c657ac))
* adds navlink to breadcrumbs ([53c74eb](https://github.com/quid/refraction/commit/53c74eb))





## [1.36.2](https://github.com/quid/refraction/compare/v1.36.1...v1.36.2) (2019-03-08)


### Bug Fixes

* missing [@quid](https://github.com/quid)/theme dependency ([a77acde](https://github.com/quid/refraction/commit/a77acde))





## [1.36.1](https://github.com/quid/refraction/compare/v1.36.0...v1.36.1) (2019-03-08)


### Bug Fixes

* default Button to type=button ([ba6a98d](https://github.com/quid/refraction/commit/ba6a98d))





# [1.36.0](https://github.com/quid/refraction/compare/v1.35.1...v1.36.0) (2019-03-05)


### Features

* provides the original item as onChange argument at Dropdown ([40bae00](https://github.com/quid/refraction/commit/40bae00))





## [1.35.1](https://github.com/quid/refraction/compare/v1.35.0...v1.35.1) (2019-03-05)


### Bug Fixes

* don’t type error on undefined defaultSelectedItems ([13275ae](https://github.com/quid/refraction/commit/13275ae))





# [1.35.0](https://github.com/quid/refraction/compare/v1.34.1...v1.35.0) (2019-03-02)


### Bug Fixes

* fixes test coverage ([c1a27b7](https://github.com/quid/refraction/commit/c1a27b7))


### Features

* adds clearSelection support for Dropdown ([923a68d](https://github.com/quid/refraction/commit/923a68d))
* adds support for dropdown being used as controlled component ([5928d80](https://github.com/quid/refraction/commit/5928d80))
* adds test cases and warnings in case of wrong props applied ([d80b40e](https://github.com/quid/refraction/commit/d80b40e))





## [1.34.1](https://github.com/quid/refraction/compare/v1.34.0...v1.34.1) (2019-02-22)


### Bug Fixes

* allow InputDate styling ([c7d2605](https://github.com/quid/refraction/commit/c7d2605))
* make InputGroup stretch its child Input field ([22170d3](https://github.com/quid/refraction/commit/22170d3))





# [1.34.0](https://github.com/quid/refraction/compare/v1.33.0...v1.34.0) (2019-02-20)


### Features

* support for custom item children for the dropdown ([d481d5b](https://github.com/quid/refraction/commit/d481d5b))





# [1.33.0](https://github.com/quid/refraction/compare/v1.32.1...v1.33.0) (2019-02-19)


### Bug Fixes

* adds snapshot tests to fix coverage of modal ([002427f](https://github.com/quid/refraction/commit/002427f))
* changes ems to pixels in Modal component ([07a9bc3](https://github.com/quid/refraction/commit/07a9bc3))
* updates tests, simplifies Centerer and ActioBar component for Modal ([799a6bc](https://github.com/quid/refraction/commit/799a6bc))


### Features

* adds modal component to react layouts ([bb331f3](https://github.com/quid/refraction/commit/bb331f3))





## [1.32.1](https://github.com/quid/refraction/compare/v1.32.0...v1.32.1) (2019-02-16)


### Bug Fixes

* adds support for multiple refs for mouse outside ([ea46b25](https://github.com/quid/refraction/commit/ea46b25))
* fixes code coverage for mouse outside component ([c7afbc7](https://github.com/quid/refraction/commit/c7afbc7))





# [1.32.0](https://github.com/quid/refraction/compare/v1.31.2...v1.32.0) (2019-02-15)


### Bug Fixes

* removes export for Props in Tabs component ([fb801d7](https://github.com/quid/refraction/commit/fb801d7))


### Features

* adds tabs to react-layouts ([48e2da5](https://github.com/quid/refraction/commit/48e2da5))





## [1.31.2](https://github.com/quid/refraction/compare/v1.31.1...v1.31.2) (2019-02-08)


### Bug Fixes

* react-mouse-outside type improvements ([d7907ad](https://github.com/quid/refraction/commit/d7907ad))





## [1.31.1](https://github.com/quid/refraction/compare/v1.31.0...v1.31.1) (2019-02-08)

**Note:** Version bump only for package quid-ui





# [1.31.0](https://github.com/quid/refraction/compare/v1.30.4...v1.31.0) (2019-02-07)


### Bug Fixes

* adds index file with exports for react layout ([bdcd5d8](https://github.com/quid/refraction/commit/bdcd5d8))
* updates breadcrumb tests ([6e53098](https://github.com/quid/refraction/commit/6e53098))


### Features

* adds Breadcrumb component for react layout ([6a3ef4c](https://github.com/quid/refraction/commit/6a3ef4c))





## [1.30.4](https://github.com/quid/refraction/compare/v1.30.3...v1.30.4) (2019-02-07)


### Bug Fixes

* apply normal style to text by default ([97cce43](https://github.com/quid/refraction/commit/97cce43))





## [1.30.3](https://github.com/quid/refraction/compare/v1.30.2...v1.30.3) (2019-02-07)


### Bug Fixes

* style improvements for InputDate component ([c585e32](https://github.com/quid/refraction/commit/c585e32))
* use keyframes object notation to avoid Emotion bug ([723a110](https://github.com/quid/refraction/commit/723a110))





## [1.30.2](https://github.com/quid/refraction/compare/v1.30.1...v1.30.2) (2019-02-06)


### Bug Fixes

* ensure some top and bottom margin between text skeletons ([8aa767f](https://github.com/quid/refraction/commit/8aa767f))





## [1.30.1](https://github.com/quid/refraction/compare/v1.30.0...v1.30.1) (2019-02-06)


### Bug Fixes

* export ThemeProvider as named export ([b1260bf](https://github.com/quid/refraction/commit/b1260bf))





# [1.30.0](https://github.com/quid/refraction/compare/v1.29.0...v1.30.0) (2019-02-05)


### Bug Fixes

* removes unnecessary fragments from footer markdown ([389cef1](https://github.com/quid/refraction/commit/389cef1))


### Features

* adds footer to react-layout ([12aa00e](https://github.com/quid/refraction/commit/12aa00e))





# [1.29.0](https://github.com/quid/refraction/compare/v1.28.0...v1.29.0) (2019-02-05)


### Features

* type withFallback arguments ([5a619c2](https://github.com/quid/refraction/commit/5a619c2))





# [1.28.0](https://github.com/quid/refraction/compare/v1.27.2...v1.28.0) (2019-02-05)


### Bug Fixes

* improves NavBar example, removes unused export ([166d87b](https://github.com/quid/refraction/commit/166d87b))


### Features

* creates react layout and adds NavBar to it ([8a7059d](https://github.com/quid/refraction/commit/8a7059d))





## [1.27.2](https://github.com/quid/refraction/compare/v1.27.1...v1.27.2) (2019-02-05)


### Bug Fixes

* fixes undefined color provided to InpuText ([f57866d](https://github.com/quid/refraction/commit/f57866d))





## [1.27.1](https://github.com/quid/refraction/compare/v1.27.0...v1.27.1) (2019-01-31)


### Bug Fixes

* make sure text color is always transparent ([189d981](https://github.com/quid/refraction/commit/189d981))





# [1.27.0](https://github.com/quid/refraction/compare/v1.26.1...v1.27.0) (2019-01-31)


### Bug Fixes

* button should be "secondary" by default ([e1cdb38](https://github.com/quid/refraction/commit/e1cdb38))


### Features

* new react-dropdown component ([38e20e8](https://github.com/quid/refraction/commit/38e20e8))





## [1.26.1](https://github.com/quid/refraction/compare/v1.26.0...v1.26.1) (2019-01-31)


### Bug Fixes

* set primary text color by default ([8d3d944](https://github.com/quid/refraction/commit/8d3d944))





# 1.26.0 (2019-01-31)


### Bug Fixes

* add missing exports ([e8b0b58](https://github.com/quid/refraction/commit/e8b0b58))
* add missing exports ([b8aaf5f](https://github.com/quid/refraction/commit/b8aaf5f))
* add pointer cursor to links ([d35f338](https://github.com/quid/refraction/commit/d35f338))
* export Text component ([d641d1c](https://github.com/quid/refraction/commit/d641d1c))
* generated invalid CSS with compiled library ([3b0c161](https://github.com/quid/refraction/commit/3b0c161))
* InputRange compat on Firefox ([0ed3ffb](https://github.com/quid/refraction/commit/0ed3ffb))
* missing export for InputDate ([9770e1a](https://github.com/quid/refraction/commit/9770e1a))
* several build problems that prevented proper usage ([d18d06b](https://github.com/quid/refraction/commit/d18d06b))
* styling issue ([cd2165c](https://github.com/quid/refraction/commit/cd2165c))
* vertical align Button component ([49b12f4](https://github.com/quid/refraction/commit/49b12f4))


### Features

* add caption text style ([0cecd4a](https://github.com/quid/refraction/commit/0cecd4a))
* add InputCheckbox component ([27e30aa](https://github.com/quid/refraction/commit/27e30aa))
* add InputColor component ([ca924ba](https://github.com/quid/refraction/commit/ca924ba))
* add InputFile component ([764f638](https://github.com/quid/refraction/commit/764f638))
* add InputRadio component ([b84a764](https://github.com/quid/refraction/commit/b84a764))
* add InputRange component ([e3328e7](https://github.com/quid/refraction/commit/e3328e7))
* add InputToggle component ([f050fd3](https://github.com/quid/refraction/commit/f050fd3))
* add Label component ([57da94d](https://github.com/quid/refraction/commit/57da94d))
* add new stylis-plugin-focus-visible ([1f73cd5](https://github.com/quid/refraction/commit/1f73cd5))
* add TextArea component ([9ab51c6](https://github.com/quid/refraction/commit/9ab51c6))
* allow to manually define button states ([51ff519](https://github.com/quid/refraction/commit/51ff519))
* date picker ([40d1287](https://github.com/quid/refraction/commit/40d1287))
* inputdate component ([97e4c65](https://github.com/quid/refraction/commit/97e4c65))
* move InvalidHandler to own standalone pkg ([e5470ce](https://github.com/quid/refraction/commit/e5470ce))
* react-tabs-provider ([a3200f4](https://github.com/quid/refraction/commit/a3200f4))


### Performance Improvements

* "include" utils improvements ([f64f39b](https://github.com/quid/refraction/commit/f64f39b))





## [1.25.3](https://github.com/quid/refraction/compare/v1.25.2...v1.25.3) (2019-01-30)


### Bug Fixes

* missing export for InputDate ([9266f60](https://github.com/quid/refraction/commit/9266f60))
* vertical align Button component ([60f2ca9](https://github.com/quid/refraction/commit/60f2ca9))





## [1.25.2](https://github.com/quid/refraction/compare/v1.25.1...v1.25.2) (2019-01-30)

**Note:** Version bump only for package quid-ui





## [1.25.1](https://github.com/quid/refraction/compare/v1.25.0...v1.25.1) (2019-01-25)

**Note:** Version bump only for package quid-ui





# [1.25.0](https://github.com/quid/refraction/compare/v1.24.1...v1.25.0) (2019-01-24)


### Features

* react-tabs-provider ([32dd9a9](https://github.com/quid/refraction/commit/32dd9a9))





## [1.24.1](https://github.com/quid/refraction/compare/v1.24.0...v1.24.1) (2019-01-24)

**Note:** Version bump only for package quid-ui





# [1.24.0](https://github.com/quid/refraction/compare/v1.23.0...v1.24.0) (2019-01-23)


### Bug Fixes

* several build problems that prevented proper usage ([d24bdd1](https://github.com/quid/refraction/commit/d24bdd1))
* styling issue ([cba0c21](https://github.com/quid/refraction/commit/cba0c21))


### Features

* date picker ([fdd1c7d](https://github.com/quid/refraction/commit/fdd1c7d))
* inputdate component ([f4724f1](https://github.com/quid/refraction/commit/f4724f1))





# [1.23.0](https://github.com/quid/refraction/compare/v1.22.0...v1.23.0) (2019-01-21)


### Features

* add caption text style ([71f4d3f](https://github.com/quid/refraction/commit/71f4d3f))





# [1.22.0](https://github.com/quid/refraction/compare/v1.21.2...v1.22.0) (2019-01-17)


### Features

* move InvalidHandler to own standalone pkg ([ee26c8c](https://github.com/quid/refraction/commit/ee26c8c))





## [1.21.2](https://github.com/quid/refraction/compare/v1.21.1...v1.21.2) (2019-01-16)


### Bug Fixes

* InputRange compat on Firefox ([207cb98](https://github.com/quid/refraction/commit/207cb98))





## [1.21.1](https://github.com/quid/refraction/compare/v1.21.0...v1.21.1) (2019-01-16)


### Bug Fixes

* add pointer cursor to links ([3a4834d](https://github.com/quid/refraction/commit/3a4834d))
* export Text component ([ebc3f56](https://github.com/quid/refraction/commit/ebc3f56))





# [1.21.0](https://github.com/quid/refraction/compare/v1.20.0...v1.21.0) (2019-01-16)


### Bug Fixes

* add missing exports ([86f57b6](https://github.com/quid/refraction/commit/86f57b6))
* generated invalid CSS with compiled library ([75c5ff6](https://github.com/quid/refraction/commit/75c5ff6))


### Features

* add InputCheckbox component ([8128fbb](https://github.com/quid/refraction/commit/8128fbb))
* add InputRadio component ([3ebf90d](https://github.com/quid/refraction/commit/3ebf90d))





# [1.20.0](https://github.com/quid/refraction/compare/v1.19.0...v1.20.0) (2019-01-14)


### Features

* add InputRange component ([1eebf98](https://github.com/quid/refraction/commit/1eebf98))





# [1.19.0](https://github.com/quid/refraction/compare/v1.18.0...v1.19.0) (2019-01-08)


### Features

* add new stylis-plugin-focus-visible ([97f5235](https://github.com/quid/refraction/commit/97f5235))





# [1.18.0](https://github.com/quid/refraction/compare/v1.17.0...v1.18.0) (2019-01-07)


### Features

* add InputColor component ([39921c7](https://github.com/quid/refraction/commit/39921c7))
* allow to manually define button states ([7466031](https://github.com/quid/refraction/commit/7466031))





# [1.17.0](https://github.com/quid/refraction/compare/v1.16.0...v1.17.0) (2019-01-07)


### Features

* add InputFile component ([da01de1](https://github.com/quid/refraction/commit/da01de1))





# [1.16.0](https://github.com/quid/refraction/compare/v1.15.0...v1.16.0) (2019-01-06)


### Features

* add Label component ([1ff7aec](https://github.com/quid/refraction/commit/1ff7aec))





# [1.15.0](https://github.com/quid/refraction/compare/v1.14.0...v1.15.0) (2019-01-04)


### Features

* add TextArea component ([f2eb2c6](https://github.com/quid/refraction/commit/f2eb2c6))





# [1.14.0](https://github.com/quid/refraction/compare/v1.13.0...v1.14.0) (2019-01-03)


### Bug Fixes

* add missing exports ([bab4e18](https://github.com/quid/refraction/commit/bab4e18))
* dark theme support ([d4a3272](https://github.com/quid/refraction/commit/d4a3272))
* inputNumber alignment ([7c87e8a](https://github.com/quid/refraction/commit/7c87e8a))
* theme colors ([7e24c81](https://github.com/quid/refraction/commit/7e24c81))


### Features

* add InputGroup ([ccf13be](https://github.com/quid/refraction/commit/ccf13be))
* add InputNumber component ([353f254](https://github.com/quid/refraction/commit/353f254))
* add InputToggle component ([c02d3fe](https://github.com/quid/refraction/commit/c02d3fe))
* add support for input validation to InputGroup ([4934336](https://github.com/quid/refraction/commit/4934336))


### Performance Improvements

* "include" utils improvements ([6b72dc9](https://github.com/quid/refraction/commit/6b72dc9))





# [1.13.0](https://github.com/quid/refraction/compare/v1.12.0...v1.13.0) (2018-12-21)


### Features

* add InputText and InvalidHandler components ([43465ee](https://github.com/quid/refraction/commit/43465ee))





# [1.12.0](https://github.com/quid/refraction/compare/v1.11.0...v1.12.0) (2018-12-18)


### Features

* add react-mouse-outside pkg ([4e281c1](https://github.com/quid/refraction/commit/4e281c1))





# [1.11.0](https://github.com/quid/refraction/compare/v1.10.0...v1.11.0) (2018-12-13)


### Bug Fixes

* loosen return type ([0586418](https://github.com/quid/refraction/commit/0586418))


### Features

* add Text component ([5f639a3](https://github.com/quid/refraction/commit/5f639a3))





# [1.10.0](https://github.com/quid/refraction/compare/v1.9.3...v1.10.0) (2018-12-13)


### Bug Fixes

* don't apply "normal" text style by default ([775c447](https://github.com/quid/refraction/commit/775c447))


### Features

* export a fonts index.css to include all at once ([668fefb](https://github.com/quid/refraction/commit/668fefb))





## [1.9.3](https://github.com/quid/refraction/compare/v1.9.2...v1.9.3) (2018-12-11)

**Note:** Version bump only for package quid-ui





## [1.9.2](https://github.com/quid/refraction/compare/v1.9.1...v1.9.2) (2018-12-11)


### Bug Fixes

* button text should always be black ([5cdfd08](https://github.com/quid/refraction/commit/5cdfd08))
* use current background color to style focus ring ([516527e](https://github.com/quid/refraction/commit/516527e))





## [1.9.1](https://github.com/quid/refraction/compare/v1.9.0...v1.9.1) (2018-12-11)


### Bug Fixes

* properly set JSX pragma at build time ([817eab8](https://github.com/quid/refraction/commit/817eab8))





# [1.9.0](https://github.com/quid/refraction/compare/v1.8.0...v1.9.0) (2018-12-11)


### Bug Fixes

* button logic ([16d5e71](https://github.com/quid/refraction/commit/16d5e71))
* icon default properties ([e3450a9](https://github.com/quid/refraction/commit/e3450a9))
* missing dependency` ([98a16c2](https://github.com/quid/refraction/commit/98a16c2))
* use emotion babel macro ([20c534d](https://github.com/quid/refraction/commit/20c534d))
* use Emotion babel macro ([b4e2746](https://github.com/quid/refraction/commit/b4e2746))


### Features

* add support for Icon inside Button ([2eccd7f](https://github.com/quid/refraction/commit/2eccd7f))





# [1.8.0](https://github.com/quid/refraction/compare/v1.7.1...v1.8.0) (2018-12-10)


### Bug Fixes

* get rid of build warnings ([3d5076e](https://github.com/quid/refraction/commit/3d5076e))
* missing dependency ([05269ef](https://github.com/quid/refraction/commit/05269ef))
* move iconic font to [@quid](https://github.com/quid)/theme ([b2a0a97](https://github.com/quid/refraction/commit/b2a0a97))


### Features

* new react-core package ([11637bf](https://github.com/quid/refraction/commit/11637bf))





## [1.7.1](https://github.com/quid/refraction/compare/v1.7.0...v1.7.1) (2018-12-07)


### Bug Fixes

* microbundle doesn't support this syntax ([724623c](https://github.com/quid/refraction/commit/724623c))
* textStyles now works reliably ([ece6ff6](https://github.com/quid/refraction/commit/ece6ff6))
* use semibold instead of bold ([5014425](https://github.com/quid/refraction/commit/5014425))





# [1.7.0](https://github.com/quid/refraction/compare/v1.6.0...v1.7.0) (2018-12-07)


### Bug Fixes

* change default README to work on styleguidist ([746a385](https://github.com/quid/refraction/commit/746a385))


### Features

* switch to IBM Plex font family ([7745489](https://github.com/quid/refraction/commit/7745489))





# [1.6.0](https://github.com/quid/refraction/compare/v1.5.3...v1.6.0) (2018-12-07)


### Features

* add current property to identify active theme ([e7ee0e6](https://github.com/quid/refraction/commit/e7ee0e6))





## [1.5.3](https://github.com/quid/refraction/compare/v1.5.1...v1.5.3) (2018-12-06)


### Bug Fixes

* emotion warning ([5ac8686](https://github.com/quid/refraction/commit/5ac8686))





## [1.5.2](https://github.com/quid/refraction/compare/v1.5.1...v1.5.2) (2018-12-06)


### Bug Fixes

* emotion warning ([5ac8686](https://github.com/quid/refraction/commit/5ac8686))





## [1.5.1](https://github.com/quid/refraction/compare/v1.5.0...v1.5.1) (2018-12-06)


### Bug Fixes

* use resolutions to point to microbundle fork ([16819ab](https://github.com/quid/refraction/commit/16819ab))





# [1.5.0](https://github.com/quid/refraction/compare/v1.4.0...v1.5.0) (2018-12-06)


### Bug Fixes

* add missing peerDependency ([1a00221](https://github.com/quid/refraction/commit/1a00221))
* get rid of enums and use normal strings ([cb6e7b3](https://github.com/quid/refraction/commit/cb6e7b3))
* use testPathPattern rather than runTestsByPath ([2350a80](https://github.com/quid/refraction/commit/2350a80))


### Features

* new react-ellipsis component ([5b54763](https://github.com/quid/refraction/commit/5b54763))





# [1.4.0](https://github.com/quid/refraction/compare/v1.3.1...v1.4.0) (2018-12-05)


### Features

* add support for local test script ([9a9a551](https://github.com/quid/refraction/commit/9a9a551))





## [1.3.1](https://github.com/quid/refraction/compare/v1.3.0...v1.3.1) (2018-12-05)


### Bug Fixes

* focus ring styling ([6f9eb92](https://github.com/quid/refraction/commit/6f9eb92))





# [1.3.0](https://github.com/quid/refraction/compare/v1.2.1...v1.3.0) (2018-12-05)


### Bug Fixes

* apply normal text style to Button ([513546b](https://github.com/quid/refraction/commit/513546b))
* multiple // [@flow](https://github.com/flow) headers ([0603e2d](https://github.com/quid/refraction/commit/0603e2d))
* properly render CSS ([05f2920](https://github.com/quid/refraction/commit/05f2920))
* textStyles is not part of the theme ([919b026](https://github.com/quid/refraction/commit/919b026))


### Features

* new theme and react-forms packages ([61a44a0](https://github.com/quid/refraction/commit/61a44a0))





## [1.2.1](https://github.com/quid/refraction/compare/v1.2.0...v1.2.1) (2018-12-04)

**Note:** Version bump only for package quid-ui





# [1.2.0](https://github.com/quid/refraction/compare/v1.0.6...v1.2.0) (2018-12-04)


### Features

* new example package ([49b9e1f](https://github.com/quid/refraction/commit/49b9e1f))





# [1.1.0](https://github.com/quid/refraction/compare/v1.0.6...v1.1.0) (2018-12-04)


### Features

* new example package ([49b9e1f](https://github.com/quid/refraction/commit/49b9e1f))





## [1.0.6](https://github.com/quid/refraction/compare/v1.0.4...v1.0.6) (2018-12-01)

**Note:** Version bump only for package quid-ui





## [1.0.5](https://github.com/quid/refraction/compare/v1.0.4...v1.0.5) (2018-12-01)

**Note:** Version bump only for package quid-ui





## [1.0.4](https://github.com/quid/refraction/compare/v1.0.3...v1.0.4) (2018-12-01)

**Note:** Version bump only for package quid-ui

## [1.0.3](https://github.com/quid/refraction/compare/v1.0.2...v1.0.3) (2018-12-01)

### Bug Fixes

- add comment ([aa7c353](https://github.com/quid/refraction/commit/aa7c353))

## [1.0.2](https://github.com/quid/refraction/compare/v1.0.1...v1.0.2) (2018-11-30)

### Bug Fixes

- i like foobar more ([94872e6](https://github.com/quid/refraction/commit/94872e6))

## [1.0.1](https://github.com/quid/refraction/compare/v1.0.0...v1.0.1) (2018-11-30)

### Bug Fixes

- test auto publish script ([7757c6e](https://github.com/quid/refraction/commit/7757c6e))

# [1.0.0](https://github.com/quid/refraction/compare/v1.1.1...v1.0.0) (2018-11-30)

### Bug Fixes

- commitlint checks ([f9b1a75](https://github.com/quid/refraction/commit/f9b1a75))

### Features

- new test package ([24918ea](https://github.com/quid/refraction/commit/24918ea))
