# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-03-14

### Added

- Errors response payload. First off, the responses schemas are exported under `schemas.responses`
for categorization. Added the `schemas.response.errors()` schema factory function and the corresponding
`ErrorsResponse` type.

### Fixed

- Exporting `EnvironmentId` type globally. In fact, set up the code to make it easy to automatically
export types globally from modules.

## [0.1.0] - 2026-03-13

### Added

- Environment IDs related types and schemas: `EnvironmentId` and `schemas.environmentId`.

[0.2.0]: https://github.com/ezrp/api-schemas/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/ezrp/api-schemas/releases/tag/v0.1.0
