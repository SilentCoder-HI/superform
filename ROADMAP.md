# Roadmap 🗺️

This document outlines the planned features and improvements for SuperForm.

> **Note**: This roadmap is subject to change based on community feedback and priorities. Feel free to [open a discussion](https://github.com/SilentCoder-HI/superform/discussions) to suggest features or vote on existing proposals.

## ✅ v1.0.0 — Foundation (Current)

- [x] Core validation engine
- [x] Schema builder with Zod-like API (`s.string()`, `s.number()`, `s.boolean()`, `s.object()`, `s.array()`)
- [x] Async validation support
- [x] React hooks (`useForm`, `useField`)
- [x] Full TypeScript type inference
- [x] Dual ESM/CJS builds
- [x] Zero runtime dependencies

## 🔜 v1.1.0 — Validation Enhancements

- [ ] Custom error messages per rule (`.min(5, "Too short")`)
- [ ] `.optional()` and `.nullable()` modifiers
- [ ] `.refine()` for custom validation logic
- [ ] `.transform()` for data transformation during validation
- [ ] `.enum()` schema for union string types
- [ ] `.literal()` schema for exact values
- [ ] `s.union()` for combining schemas

## 📅 v1.2.0 — Advanced Features

- [ ] Conditional validation (`.when()`)
- [ ] Cross-field validation (password confirmation, etc.)
- [ ] Nested object validation with path-based errors
- [ ] Form wizard / multi-step form support
- [ ] Field-level async debouncing
- [ ] `s.date()` schema with date-specific rules
- [ ] `s.tuple()` schema for fixed-length arrays

## 🌍 v2.0.0 — Ecosystem

- [ ] Internationalization (i18n) for error messages
- [ ] Adapter for Vue.js
- [ ] Adapter for Svelte
- [ ] Server-side validation (Express/Fastify middleware)
- [ ] Schema serialization / JSON Schema output
- [ ] DevTools browser extension
- [ ] Official documentation website

## 💡 Under Consideration

- [ ] Integration with popular UI libraries (Material UI, Chakra, shadcn/ui)
- [ ] Persistence / autosave support
- [ ] Drag-and-drop form builder
- [ ] AI-powered schema suggestions
- [ ] GraphQL schema integration

---

## How to Contribute

Want to help build a feature? Check the [Contributing Guide](.github/CONTRIBUTING.md) and look for issues labeled [`good first issue`](https://github.com/SilentCoder-HI/superform/labels/good%20first%20issue) or [`help wanted`](https://github.com/SilentCoder-HI/superform/labels/help%20wanted).
