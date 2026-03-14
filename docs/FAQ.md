# Frequently Asked Questions (FAQ) ❓

## General Questions

### How is SuperForm different from Zod or Yup?
SuperForm integrates validation directly with React form state management. While Zod/Yup are pure validation libraries, SuperForm provides a complete solution for forms, including `register` functionality, error tracking, and submission handling, all in a tiny zero-dependency package.

### Is SuperForm production-ready?
Yes! v1.0.0 is stable and used in several internal projects. However, like any library, we recommend thorough testing in your specific environment.

### Does it support React Server Components (RSC)?
The core validation library `@silentcoderhi/superform` is environmentally agnostic and works anywhere. The `@silentcoderhi/superform/react` hooks are client-side components and require the `"use client"` directive in Next.js.

## Technical Questions

### How do I handle custom error messages?
Currently, SuperForm uses default error messages (e.g., "Too short", "Invalid email"). Custom error message support is planned for v1.1.0.

### Can I use SuperForm with Zod?
SuperForm uses its own schema builder optimized for performance and type inference. While you can't use Zod schemas directly inside `useForm`, you can easily replicate Zod schemas using SuperForm's `s` builder.

### What is the bundle size?
SuperForm is extremely lightweight, coming in at under **5kb minzipped** for both core and React integration.

## Troubleshooting

### "Property 'x' does not exist on type 'FormErrors'"
Ensure your schema is correctly defined and passed to `useForm`. If you're using nested objects, ensure you're using dot notation in the `register` function (e.g., `register("user.name")`).

### My async validation isn't running
Async validation runs after synchronous validation passes. Check that there are no synchronous errors blocking the async check.
