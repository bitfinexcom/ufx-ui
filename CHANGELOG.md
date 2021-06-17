# Changelog

All notable changes to this project will be documented in this file.


#### :house: Internal
* `bfx-containers`, `core`, `eslint-config`, `example`, `storybook`, `utils`
  * [#70](https://github.com/bitfinexcom/ufx-ui/pull/70) (internal) Npm audit fix ([@bhoomij](https://github.com/bhoomij))
* `storybook`
  * [#69](https://github.com/bitfinexcom/ufx-ui/pull/69) (doc/test) add more stories/snapshot tests ([@bhoomij](https://github.com/bhoomij))

#### Committers: 1
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))


## v0.8.0 (2021-06-17)

#### :rocket: Feature
* `bfx-containers`, `storybook`
  * [#64](https://github.com/bitfinexcom/ufx-ui/pull/64) (feature) export ticker volume conversion helper and selectors ([@dmytroshch](https://github.com/dmytroshch))

#### :dizzy: Improvement
* `bfx-containers`, `core`, `storybook`, `utils`
  * [#66](https://github.com/bitfinexcom/ufx-ui/pull/66) (improvement) Tickerlist: improve performance, styles and keyboard nav ([@bhoomij](https://github.com/bhoomij))
* `core`, `storybook`
  * [#62](https://github.com/bitfinexcom/ufx-ui/pull/62) (improvement) Dropdown: searchable scroll ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### :bug: Bug Fix
* `core`, `storybook`
  * [#63](https://github.com/bitfinexcom/ufx-ui/pull/63) (fix) tickerlist searchbar: fix 2 close icon ([@bhoomij](https://github.com/bhoomij))

#### :art: Refactor
* `storybook`
  * [#61](https://github.com/bitfinexcom/ufx-ui/pull/61) (refactor) Simplify storybook scripts ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### Committers: 3
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- Dmytro Shcherbonos ([@dmytroshch](https://github.com/dmytroshch))
- Jason M. Hasperhoven ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))


## v0.7.0 (2021-06-11)

#### :dizzy: Improvement
* `core`, `storybook`
  * [#59](https://github.com/bitfinexcom/ufx-ui/pull/59) (improvement) Add font feature settings tnum ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))
  * [#58](https://github.com/bitfinexcom/ufx-ui/pull/58) (improvement) Ticker/TickerList: allow to spectify custom renderer for ticker-name ([@dmytroshch](https://github.com/dmytroshch))
* `core`
  * [#57](https://github.com/bitfinexcom/ufx-ui/pull/57) (improvement) notifications ([@Blaumaus](https://github.com/Blaumaus))
* `bfx-containers`, `core`, `example`
  * [#56](https://github.com/bitfinexcom/ufx-ui/pull/56) (improvement) Ticker font improvement ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### Committers: 4
- Andrii R. ([@Blaumaus](https://github.com/Blaumaus))
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- Jason M. Hasperhoven ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))
- [@dmytroshch](https://github.com/dmytroshch)


## v0.6.1 (2021-06-09)

#### :bug: Bug Fix
* `core`
  * [#52](https://github.com/bitfinexcom/ufx-ui/pull/52) (fix): TickerList: removed margins from FontAwesome styles in Searchbar ([@dmytroshch](https://github.com/dmytroshch))

#### :art: Refactor
* `bfx-containers`, `core`, `example`
  * [#54](https://github.com/bitfinexcom/ufx-ui/pull/54) (refactor) scss: replace / with math.div to make compatible with dart-sass ([@bhoomij](https://github.com/bhoomij))

#### Committers: 2
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- [@dmytroshch](https://github.com/dmytroshch)


## v0.6.0 (2021-06-08)

#### :rocket: Feature
* `bfx-containers`, `storybook`
  * [#49](https://github.com/bitfinexcom/ufx-ui/pull/49) (feature) tickers: export selectors/actions/reducer ([@dmytroshch](https://github.com/dmytroshch))

#### Committers: 2
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- [@dmytroshch](https://github.com/dmytroshch)


## v0.5.5 (2021-06-07)

#### :dizzy: Improvement
* `bfx-containers`
  * [#48](https://github.com/bitfinexcom/ufx-ui/pull/48) (improvement) book/trades: add new selectors, clean up unsubscribed state ([@bhoomij](https://github.com/bhoomij))

#### Committers: 1
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))


## v0.5.4 (2021-06-06)

#### :dizzy: Improvement
* `core`
  * [#43](https://github.com/bitfinexcom/ufx-ui/pull/43) (improvement) TickerList: added filtering by fullnames of ccy ([@dmytroshch](https://github.com/dmytroshch))
  * [#45](https://github.com/bitfinexcom/ufx-ui/pull/45) (improvement) TickerList: showing X button if input is filled && clear input on click ([@dmytroshch](https://github.com/dmytroshch))

#### :bug: Bug Fix
* `core`
  * [#46](https://github.com/bitfinexcom/ufx-ui/pull/46) (fix) document is undefined error for ssr build in gatsby app ([@bhoomij](https://github.com/bhoomij))
  * [#44](https://github.com/bitfinexcom/ufx-ui/pull/44) (fix) TickerList: prevent showing favorites tickers list if one is empty ([@dmytroshch](https://github.com/dmytroshch))

#### Committers: 2
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- [@dmytroshch](https://github.com/dmytroshch)


## v0.5.3 (2021-05-26)

#### :dizzy: Improvement
* `core`, `storybook`
  * [#41](https://github.com/bitfinexcom/ufx-ui/pull/41) (improvement) Tooltip integration into Checkbox ([@Blaumaus](https://github.com/Blaumaus))

#### :bug: Bug Fix
* `core`
  * [#42](https://github.com/bitfinexcom/ufx-ui/pull/42) (fix) Add !default flag to Dialog scss vars ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### Committers: 2
- Andrii R. ([@Blaumaus](https://github.com/Blaumaus))
- Jason M. Hasperhoven ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))


## v0.5.2 (2021-05-14)

#### :dizzy: Improvement
* `core`, `storybook`
  * [#38](https://github.com/bitfinexcom/ufx-ui/pull/38) (improvement) Dropdown search input ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### :bug: Bug Fix
* `core`
  * [#36](https://github.com/bitfinexcom/ufx-ui/pull/36) (fix) rollup config ([@Blaumaus](https://github.com/Blaumaus))

#### Committers: 2
- Andrii R. ([@Blaumaus](https://github.com/Blaumaus))
- Jason M. Hasperhoven ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))


## v0.5.1 (2021-05-13)

#### :dizzy: Improvement
* `bfx-containers`, `core`, `cypress-tests`, `storybook`, `utils`
  * [#32](https://github.com/bitfinexcom/ufx-ui/pull/32) (improvement) Dropdown ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))

#### :memo: Documentation
* [#33](https://github.com/bitfinexcom/ufx-ui/pull/33) (doc) add changelog for v0.5.0 ([@bhoomij](https://github.com/bhoomij))

#### :house: Internal
* [#34](https://github.com/bitfinexcom/ufx-ui/pull/34) (internal) add new PR label ([@bhoomij](https://github.com/bhoomij))

#### Committers: 2
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
- Jason M. Hasperhoven ([@JasonMHasperhoven](https://github.com/JasonMHasperhoven))


## v0.5.0 (2021-05-12)

#### :rocket: Feature

- `core`, `storybook`
  - [#29](https://github.com/bitfinexcom/ufx-ui/pull/29) (feature) virtualised table ([@Blaumaus](https://github.com/Blaumaus))

#### :house: Internal

- `cypress-tests`
  - [#31](https://github.com/bitfinexcom/ufx-ui/pull/31) (internal) fix cy:open script ([@bhoomij](https://github.com/bhoomij))
- `bfx-containers`, `core`
  - [#30](https://github.com/bitfinexcom/ufx-ui/pull/30) (internal) build css using rollup ([@bhoomij](https://github.com/bhoomij))

#### Committers: 2

- Andrii R. ([@Blaumaus](https://github.com/Blaumaus))
- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))

## v0.4.0 (2021-05-10)

#### :art: Refactor

- `bfx-containers`, `core`, `cypress-tests`, `eslint-config`, `example`, `storybook`, `utils`
  - [#24](https://github.com/bitfinexcom/ufx-ui/pull/24) (refactor) move to lernajs monorepo ([@bhoomij](https://github.com/bhoomij))

#### Committers: 1

- Bhoomi Joshi ([@bhoomij](https://github.com/bhoomij))
