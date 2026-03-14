# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-03-14

### Added

- **Core Validation Engine** with synchronous and asynchronous validation support
- **Schema Builder** (`s`) with Zod-like chainable API
  - `s.string()` — string validation with `.email()`, `.min()`, `.max()`, `.async()`
  - `s.number()` — number validation with `.min()`, `.max()`, `.async()`
  - `s.boolean()` — boolean validation with `.true()`, `.false()`
  - `s.object()` — nested object validation with shape definition
  - `s.array()` — array validation with `.min()`, `.max()` and item schema
- **React Integration** (`@silentcoderhi/superform/react`)
  - `useForm` hook for form state management, validation, and submission
  - `useField` hook for individual field access
  - `FormContext` for nested form components
- **Full TypeScript Support** with automatic type inference from schemas
- **Zero runtime dependencies** — lightweight and optimized

### Infrastructure

- Dual ESM/CJS builds via `tsup`
- CI pipeline with GitHub Actions (Node 18, 20, 22)
- Comprehensive repository documentation

[Unreleased]: https://github.com/SilentCoder-HI/superform/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/SilentCoder-HI/superform/releases/tag/v1.0.0
