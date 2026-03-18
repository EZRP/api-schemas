# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-03-18

### Changed

- Renamed the main `schemas` export to `apiSchemas` for even better encapsulation. `schemas`, in the
context of where it will be used, is too vague. There are schemas for user inputs and for database
types. Those only target the values of the API in its requests/responses.

## [0.3.0] - 2026-03-17

### Added

- The `StandardString` scalar, which introduces minimal rules for generic strings. It enforces that
the length be withing [1, 256] characters.
- The internal `Patch` utility type and related schema factory `patch` function. It is meant as a
reusable block from which every PATCH method bodies should be built. It defines the structure that
the payload should have, and the factory can accomodate many different type safe patch types.
- A partial definition for the `PatchEnvironmentCompany` body, built with the aforementioned utility.
It only supports the `doingBusinessAs` for the moment, but more fields to come as more scalars and
objects are added to the library.

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

[0.4.0]: https://github.com/ezrp/api-schemas/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/ezrp/api-schemas/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/ezrp/api-schemas/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/ezrp/api-schemas/releases/tag/v0.1.0
