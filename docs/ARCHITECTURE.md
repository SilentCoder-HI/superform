# Architecture 🏛️

Technical overview of how SuperForm works under the hood.

## Package Structure

SuperForm is a monorepo-lite, split into two main areas:

- **Core (`/packages/core`)**: The validation engine and schema builder. It has no dependencies and works in any JavaScript environment (Node, Browser, Edge).
- **React (`/packages/react`)**: The React integration layer. It provides hooks and context for managing form state in React applications.

## Validation Engine

The engine uses a chainable schema builder pattern. Each schema type (String, Number, etc.) inherits from a `BaseSchema` and implements a `validate()` method.

### How it works:

1. **Schema Definition**: You define a schema using `s.object({ ... })`.
2. **Registration**: `useForm` maps these schemas to form fields.
3. **Validation Flow**:
   - Initial check runs synchronous rules.
   - If sync rules pass, it executes any registered `.async()` validators.
   - Errors are collected into an object keyed by the field path.

## React Integration Layer

SuperForm uses a "controlled-uncontrolled hybrid" approach:

- We use internal state to track values and errors.
- `register()` provides `onChange` and `onBlur` handlers to sync input values with the form state.
- Ref-based access allows for optimized focus management and direct DOM interaction when needed.

## Type System

SuperForm leverages TypeScript's advanced features (Mapped Types, Conditional Types) to provide:

- **Automatic Inference**: `typeof schema._type` extracts the data type.
- **Autocomplete**: Field paths are string literals generated from the schema keys.
- **Type Safety**: `setValue` and `register` are type-checked against the schema.

## Design Decisions

1. **Zero Dependencies**: To keep the library small and avoid "dependency hell".
2. **Zod Compatibility**: To make it easy for developers familiar with Zod to switch.
3. **Single Source of Truth**: The schema is the source of truth for both validation and TypeScript types.
