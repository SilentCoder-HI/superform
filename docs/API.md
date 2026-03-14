# API Reference 📖

Detailed documentation for all SuperForm APIs.

## Schema Builder (`s`)

The `s` object is the entry point for building schemas.

### `s.string()`
Creates a schema for string values.
- `.email()`: Validates that the value is a valid email address.
- `.min(length)`: Validates minimum string length.
- `.max(length)`: Validates maximum string length.
- `.async(validator)`: Adds an asynchronous validation rule.

### `s.number()`
Creates a schema for number values.
- `.min(value)`: Validates minimum value.
- `.max(value)`: Validates maximum value.
- `.async(validator)`: Adds an asynchronous validation rule.

### `s.boolean()`
Creates a schema for boolean values.
- `.true()`: Validates that the value is `true`.
- `.false()`: Validates that the value is `false`.

### `s.object(shape)`
Creates a schema for objects with a specific shape.
- `shape`: An object where keys are field names and values are other schemas.

### `s.array(itemSchema?)`
Creates a schema for arrays.
- `itemSchema`: (Optional) A schema to validate each item in the array.
- `.min(length)`: Validates minimum array length.
- `.max(length)`: Validates maximum array length.

---

## React Hooks

### `useForm(schema, options?)`

The primary hook for form management.

#### Parameters
- `schema`: A SuperForm object schema.
- `options`: (Optional) Configuration options.
  - `defaultValues`: Initial values for the form.

#### Return Value
- `register(name)`: Function to bind an input to the form. Returns `{ name, value, onChange, onBlur, ref }`.
- `handleSubmit(onSubmit)`: High-order function for form submission.
- `errors`: Object containing current validation errors.
- `values`: Current form values.
- `setValue(name, value)`: Manually set a field value.
- `isSubmitting`: Boolean indicating if `onSubmit` is currently running.
- `isValid`: Boolean indicating if the form is currently valid.

### `useField(name)`

Access specific field state when using `FormContext`.

#### Parameters
- `name`: The name of the field to access.

#### Return Value
- `value`: Current field value.
- `error`: Current field error.
- `onChange(value)`: Function to update the field value.

---

## Types

### `Infer<typeof schema>`
Utility type to extract the TypeScript type from a schema.

```typescript
import { type Schema } from "@silentcoderhi/superform";
type MyData = Schema.Infer<typeof mySchema>;
```
