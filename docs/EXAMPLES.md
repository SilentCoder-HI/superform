# Usage Examples 💡

Collection of common patterns and use cases for SuperForm.

## Basic Login Form

```tsx
import { useForm } from "@silentcoderhi/superform/react";
import { s } from "@silentcoderhi/superform";

const schema = s.object({
  email: s.string().email(),
  password: s.string().min(8),
});

export function LoginForm() {
  const { register, handleSubmit, errors } = useForm(schema);
  
  return (
    <form onSubmit={handleSubmit(console.log)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email}</span>}
      
      <input type="password" {...register("password")} />
      {errors.password && <span>{errors.password}</span>}
      
      <button>Submit</button>
    </form>
  );
}
```

## Nested Objects

```tsx
const schema = s.object({
  user: s.object({
    firstName: s.string().min(2),
    lastName: s.string().min(2),
  }),
  preferences: s.object({
    newsletter: s.boolean(),
  }),
});

// Access fields using dot notation in register
<input {...register("user.firstName")} />
```

## Array Validation

```tsx
const schema = s.object({
  tags: s.array(s.string().min(2)).min(1).max(5),
});
```

## Asynchronous Validation (e.g., Username Check)

```tsx
const schema = s.object({
  username: s.string().min(3).async(async (val) => {
    const isAvailable = await checkAvailability(val);
    return isAvailable ? null : "Username is already taken";
  }),
});
```

## Custom Default Values

```tsx
const { register } = useForm(schema, {
  defaultValues: {
    email: "user@example.com",
    rememberMe: true,
  }
});
```
