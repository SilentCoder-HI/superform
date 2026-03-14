# SuperForm 🚀

[![CI](https://github.com/SilentCoder-HI/superform/actions/workflows/ci.yml/badge.svg)](https://github.com/SilentCoder-HI/superform/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/@silentcoderhi/superform.svg)](https://www.npmjs.com/package/@silentcoderhi/superform)
[![license](https://img.shields.io/github/license/SilentCoder-HI/superform.svg)](LICENSE)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@silentcoderhi/superform)](https://bundlephobia.com/package/@silentcoderhi/superform)

A lightning-fast, TypeScript-first validation and form state management library for React. 

SuperForm provides a Zod-like schema builder with a powerful validation engine, seamlessly integrated with React hooks to manage form state, errors, and submission with ease.

## 📖 Documentation

Check out the full documentation for detailed guides and API reference:

- [**Installation**](docs/INSTALL.md)
- [**Quick Start**](docs/QUICK_START.md)
- [**API Reference**](docs/API.md)
- [**Examples**](docs/EXAMPLES.md)
- [**Migration Guide**](docs/MIGRATION.md)
- [**Architecture**](docs/ARCHITECTURE.md)
- [**FAQ & Troubleshooting**](docs/FAQ.md)

## ✨ Features

- **TypeScript-First**: Full type inference from your schemas. No more manual type definitions.
- **Zod-Like Syntax**: Intuitive and chainable schema builder.
- **Comprehensive Validation**: Supports strings, numbers, booleans, objects, and arrays.
- **Async Validation**: Built-in support for asynchronous rules (e.g., checking if a username is taken).
- **React Integration**: Lightweight hooks (`useForm`, `useField`) for effortless form state management.
- **Zero Dependencies**: Lightweight and optimized for performance.

## 📦 Installation

```bash
# Using npm
npm install superform

# Using yarn
yarn add superform
```

## 🚀 Quick Start

### 1. Define your Schema

```typescript
import { s } from "superform";

const loginSchema = s.object({
  email: s.string().email().min(5),
  password: s.string().min(8),
  rememberMe: s.boolean().true(),
});

// Infer types automatically!
type LoginData = typeof loginSchema._type;
```

### 2. Use in React

```tsx
import { useForm } from "superform/react";
import { loginSchema } from "./schema";

function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useForm(loginSchema);

  const onSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register("email")} placeholder="Email" />
        {errors.email && <span>{errors.email}</span>}
      </div>

      <div>
        <input type="password" {...register("password")} placeholder="Password" />
        {errors.password && <span>{errors.password}</span>}
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## 🛠 API Reference

### Schema Builder (`s`)

#### String Schema
```typescript
s.string()
  .email()           // Must be a valid email
  .min(length)       // Minimum characters
  .max(length)       // Maximum characters
  .async(asyncFn)    // Custom async validation
```

#### Number Schema
```typescript
s.number()
  .min(value)        // Minimum value
  .max(value)        // Maximum value
  .async(asyncFn)    // Custom async validation
```

#### Array Schema
```typescript
s.array(s.string())  // Array of strings
  .min(length)       // Minimum elements
  .max(length)       // Maximum elements
```

#### Object Schema
```typescript
s.object({
  username: s.string(),
  age: s.number(),
})
```

### React Hooks

#### `useForm(schema)`
The primary hook for managing form state.
- `register(name)`: Returns props for input binding.
- `handleSubmit(onSubmit)`: Form submission handler with validation.
- `errors`: Object containing field errors.
- `values`: Current form values.
- `isSubmitting`: Boolean indicating submission status.

#### `useField(name)`
Access specific field state within a `FormContext`.

## 🧪 Testing

We use [Vitest](https://vitest.dev/) for unit testing.

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
