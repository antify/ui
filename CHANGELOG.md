# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [2.2.0](https://github.com/antify/ui/compare/v2.1.0...v2.2.0) (2025-01-27)


### Features

* **AntCollapsibleTable:** Add smooth transition ([260280e](https://github.com/antify/ui/commit/260280e767741debd2f2644b4d2f5a859cb6b00f))
* **AntNumberInput:** Add number formatting ([e3b28de](https://github.com/antify/ui/commit/e3b28de3d6e424a0bb261d18f6e11a06f3248c6f))
* **AntNumberInput:** Add title attribute ([3e1dd18](https://github.com/antify/ui/commit/3e1dd18d98c18e1a890771f33884f9e6e01cbe01))
* **AntSelect:** Add disabled state to button ([0239c84](https://github.com/antify/ui/commit/0239c8450fe56a19e8c7424b578298d4c33cf9f4))
* **AntTable:** Add collapsible functionality ([9b6fad6](https://github.com/antify/ui/commit/9b6fad6156c0739551c0f03ab3499e3debede73e))
* **AntTable:** Add collapsible rows ([700b76a](https://github.com/antify/ui/commit/700b76a5f5ca1147e2e69d02701da48bb39589fe))
* Remove focus z-index ([31d80b8](https://github.com/antify/ui/commit/31d80b88e2fd06594ea5269e3d3f0dc5f1725484))


### Bug Fixes

* **AntToaster:** Add large z-index ([4e00cac](https://github.com/antify/ui/commit/4e00caca503052f59018aa6dc847d5007146650a))

## [2.1.0](https://github.com/antify/ui/compare/v2.0.0...v2.1.0) (2025-01-15)


### Features

* **AntSelect:** Restrict menu height ([e056478](https://github.com/antify/ui/commit/e056478f7220fc9df2803d598c803da61f210b7b))
* **AntTable:** Add custom empty state text ([6c44cba](https://github.com/antify/ui/commit/6c44cba1d859d6596075215b0659f445b18c0ce8))
* **AntTooltip:** Add disabled flag ([08f3304](https://github.com/antify/ui/commit/08f33048c6ac16e9fadb8fdb3d53fd1d41d7e52c))


### Bug Fixes

* **AntSelect:** Revert change of container size ([ef7d653](https://github.com/antify/ui/commit/ef7d6536b110b250127d33fd83b4ef3e03f04414))
* filter button is visible if showFilter prop == true([#61](https://github.com/antify/ui/issues/61)) ([d15a7c6](https://github.com/antify/ui/commit/d15a7c66db9d282dd2bd01d1dde9f471384b5ace))

## [2.0.0](https://github.com/antify/ui/compare/v1.3.0...v2.0.0) (2024-12-05)


### ⚠ BREAKING CHANGES

* Rename all *-neutral-* classes to *-base-*

### Bug Fixes

* Rename neutral color to base ([b69d930](https://github.com/antify/ui/commit/b69d930779fad9c07de6563de87194ed2b2b6f42))

## [1.3.0](https://github.com/antify/ui/compare/v1.2.0...v1.3.0) (2024-12-03)


### Features

* Add info state ([#41](https://github.com/antify/ui/issues/41)) ([1e51631](https://github.com/antify/ui/commit/1e516316bfee22fa95c6c2f61934d1e0a7bdd20b))
* Implement scrollable tabs ([#42](https://github.com/antify/ui/issues/42)) ([668c86b](https://github.com/antify/ui/commit/668c86b1b29def4c0bb952832f7950c07ff8a5ff))


### Bug Fixes

* add MouseEvent for click and blur event ([#47](https://github.com/antify/ui/issues/47)) ([e25ddff](https://github.com/antify/ui/commit/e25ddff399a9cf0d7b6d37ba8a91110c466927df))
* add ref prop to AntTextarea to ref the textare html element ([#50](https://github.com/antify/ui/issues/50)) ([44e426d](https://github.com/antify/ui/commit/44e426dc2fc5c05d2d6599945d8906a54808a7c1))
* it is possible now to hover over the tooltip([#51](https://github.com/antify/ui/issues/51)) ([153997b](https://github.com/antify/ui/commit/153997bff1afdbd68ddbfaeac73d01ea69e26d12))
* Remove duplicate line ([3f430ec](https://github.com/antify/ui/commit/3f430ecb5c07d70abb368eb2695da578e37b3710))
* some adjustments for AntCrudDetailNav, AntDateInput, AntSelect and AntTextInput story ([#48](https://github.com/antify/ui/issues/48)) ([e7391c1](https://github.com/antify/ui/commit/e7391c1db7dbe18d1c490ff7b3c241b7c6b78444))
* Update color for info state ([#45](https://github.com/antify/ui/issues/45)) ([13c4c61](https://github.com/antify/ui/commit/13c4c61caeab34981e81cedee2ccb2a366eee06e))
* Update scroll implementation ([a04999f](https://github.com/antify/ui/commit/a04999f871e182e3defca9ae7064c3783e9057ae))

## [1.2.0](https://github.com/antify/ui/compare/v1.1.0...v1.2.0) (2024-10-30)


### Features

* add headerColor prop and get rowIndex ([#15](https://github.com/antify/ui/issues/15)) ([6d60b75](https://github.com/antify/ui/commit/6d60b75c06b1f2b0b5d04a1669fa3c9d721a7383))
* add resizeable prop for AntTextField, add title slot for AntPopover and add skeleton/padding prop for AntModal ([#15](https://github.com/antify/ui/issues/15)) ([e060a0b](https://github.com/antify/ui/commit/e060a0be903b320f0ddbd876f34e3d115e3801ef))
* Add shadow property  ([#21](https://github.com/antify/ui/issues/21)) ([0ef1ab6](https://github.com/antify/ui/commit/0ef1ab6c2ecdbfc4d9699efa335bf15b3a79dd39))
* Implement Floating UI ([#25](https://github.com/antify/ui/issues/25)) ([565cf84](https://github.com/antify/ui/commit/565cf84a9dc05d936391b60c38123ac14135864b))


### Bug Fixes

* Add hover effect for rows ([#33](https://github.com/antify/ui/issues/33)) ([f627ec7](https://github.com/antify/ui/commit/f627ec7a19520cde4e5228b11afdf92f92ebb20e))
* Add skeleton and disabled state ([#30](https://github.com/antify/ui/issues/30)) ([8c9254b](https://github.com/antify/ui/commit/8c9254b641cd473d63ef054f191694a4c5da9b28))
* Adjust class for rounded-full props ([#24](https://github.com/antify/ui/issues/24)) ([48f4230](https://github.com/antify/ui/commit/48f4230d3e8c7955470a08385c5386ac970d5716))
* Adjust floating elements ([#25](https://github.com/antify/ui/issues/25)) ([88cdb88](https://github.com/antify/ui/commit/88cdb886ea1f11d147c3a00132a8ae0dbe9f298e))
* **AntSelectMenu:** Fix vue warning ([ea542c7](https://github.com/antify/ui/commit/ea542c789e1666d57291beb5c8c8b71c9840d768))
* **AntTagInput:** Improve tag input and fix not emitting changes in options ([9b904db](https://github.com/antify/ui/commit/9b904db8c2744247e9d54a0a036470866cce32f5))
* Change component name and fix some bugs ([#29](https://github.com/antify/ui/issues/29)) ([7040310](https://github.com/antify/ui/commit/704031092574b45e7f3bbab685ed86d08cbd2e58))
* fix bug for AntBaseInput, AntIcon and AntCheckbox ([#10](https://github.com/antify/ui/issues/10)) ([ccdf3c4](https://github.com/antify/ui/commit/ccdf3c43de5026b9c830badbb67fa1a1efcf8484))
* Fix expandedHeight property ([#9](https://github.com/antify/ui/issues/9)) ([8d1841d](https://github.com/antify/ui/commit/8d1841da0bce4ea72eaaeee1895014c2b6a405c8))
* fix height and add skeleton state ([#36](https://github.com/antify/ui/issues/36)) ([a98f0d5](https://github.com/antify/ui/commit/a98f0d526bd68da22ffffa99499a931ae27a3f43))
* Fix requested changes ([#14](https://github.com/antify/ui/issues/14)) ([3818d45](https://github.com/antify/ui/commit/3818d4553a202225daac59284c4b5c3e5ffa924f))
* Fix requested changes ([#16](https://github.com/antify/ui/issues/16)) ([b408408](https://github.com/antify/ui/commit/b40840868b3d67d04842207d2e575bf29f11567b))
* fix some bugs and some adjustments ([#34](https://github.com/antify/ui/issues/34)) ([6ee4227](https://github.com/antify/ui/commit/6ee42279516c2665b82a09fcbb5904d47bc4ecee))
* Fix some small bugs ([#19](https://github.com/antify/ui/issues/19)) ([65bd8ab](https://github.com/antify/ui/commit/65bd8abe6f83954b14de0d4ecbdb666f616e1808))
* Implement expanded height property ([#9](https://github.com/antify/ui/issues/9)) ([c3226f8](https://github.com/antify/ui/commit/c3226f8b9c3890978bac8cacde255ef80912f459))
* Implement missing skeleton state ([#10](https://github.com/antify/ui/issues/10)) ([1fabbab](https://github.com/antify/ui/commit/1fabbabc13bd5f8b91c4f02dc15542f2c3c475f0))
* Implement missing skeleton state ([#7](https://github.com/antify/ui/issues/7)) ([025e298](https://github.com/antify/ui/commit/025e29823f53904c3938b29b32c2dad5a56fbded))
* Remove @antify/validator from stories ([#6](https://github.com/antify/ui/issues/6)) ([2d5b977](https://github.com/antify/ui/commit/2d5b977e0a19d13a095dba7e8763b4dec5578521))
* Rework floating elements ([#25](https://github.com/antify/ui/issues/25)) ([738714a](https://github.com/antify/ui/commit/738714a7fbeb0c051d49eff8a4261de364a4ce14))

## [1.1.0](https://github.com/antify/ui/compare/v1.0.4...v1.1.0) (2024-09-04)


### Features

* Make AntAccordion more dynamic ([#2](https://github.com/antify/ui/issues/2)) ([263e3ff](https://github.com/antify/ui/commit/263e3ffb01dc58b70716eb399b4f8df5002278ce))


### Bug Fixes

* Change text color and add new size ([#1](https://github.com/antify/ui/issues/1)) ([0c64a68](https://github.com/antify/ui/commit/0c64a6885eb3bbce41899aa0e0ec760c995e3721))

### [1.0.4](https://github.com/antify/ui/compare/v1.0.3...v1.0.4) (2024-08-23)


### Bug Fixes

* export missing AntCard ([53f28c8](https://github.com/antify/ui/commit/53f28c8f70a96b2b012de640e6ca856f3aabef19))

### [1.0.3](https://github.com/antify/ui/compare/v1.0.2...v1.0.3) (2024-08-23)


### Bug Fixes

* **CI:** Add missing prepack script ([e09454d](https://github.com/antify/ui/commit/e09454d7fa8426f28a2202091f30069a7a2975ab))

### [1.0.2](https://github.com/antify/ui/compare/v1.0.1...v1.0.2) (2024-08-22)


### Bug Fixes

* Export missing inputs ([aba46e0](https://github.com/antify/ui/commit/aba46e0ac53a5896e5ef0fdc4a0ad5598116a773))

### [1.0.1](https://github.com/antify/ui/compare/v1.0.0...v1.0.1) (2024-08-22)

## 1.0.0 (2024-08-22)
