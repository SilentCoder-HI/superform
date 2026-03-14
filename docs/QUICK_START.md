# Quick Start Guide 🚀

Get SuperForm up and running in your React project in under 5 minutes.

## 1. Define Your Schema

Use the `s` builder to define your data structure and validation rules.

```typescript
// schema.ts
import { s } from "@silentcoderhi/superform";

export const loginSchema = s.object({
  email: s.string().email().min(5),
  password: s.string().min(8),
  rememberMe: s.boolean().true(),
});

// Infer the type automatically!
export type LoginData = typeof loginSchema._type;
```

## 2. Connect to React

Use the `useForm` hook to manage form state and submission.

```tsx
// LoginForm.tsx
import { useForm } from "@silentcoderhi/superform/react";
import { loginSchema, type LoginData } from "./schema";

export function LoginForm() {
  const { register, handleSubmit, errors, isSubmitting } = useForm(loginSchema);

  const onSubmit = async (data: LoginData) => {
    console.log("Valid data:", data);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email</label>
        <input {...register("email")} />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register("password")} />
        {errors.password && <span className="error">{errors.password}</span>}
      </div>

      <div>
        <label>
          <input type="checkbox" {...register("rememberMe")} />
          Remember me
        </label>
      </div>

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
```

## 3. Handle Form State Manually (Optional)

If you need more control, you can use `values` and `setValue` directly from `useForm`.

```tsx
const { values, setValue } = useForm(schema);

// Manually update a field
setValue("email", "new@example.com");
```

## Key Concepts

- **Type Safety**: Everything is typed. You get autocompletion for field names in `register` and `errors`.
- **Validation**: Validation runs on change and on submit.
- **Async Validation**: You can add `.async()` rules to any field.

## What's Next?

- Explore the complete [API Reference](API.md).
- See more [Examples](EXAMPLES.md).
