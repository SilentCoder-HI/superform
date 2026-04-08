# SuperForm Tester Guide 🧪

Welcome testers! This document will give you a complete breakdown of **`@silentcoderhi/superform`**, what it does, where to use its native functions, and how to rigorously test its latest capabilities (v1.1.0).

---

## 1. What is SuperForm?
SuperForm is a lightning-fast, zero-dependency, TypeScript-first declarative validation engine and React form-state management library. It acts as both your "strict gatekeeper" for defining data shapes (like Zod or Yup) and your robust state binder for React input elements (like react-hook-form or Formik).

## 2. What Does It Do?
SuperForm handles the heavy lifting of user inputs:
1. **Validates Data Schemas:** Checks your strings, numbers, booleans, and arrays against precise constraints you define (lengths, emails, enums, literals, conditional logic).
2. **Manages React Form State:** The `useForm()` hook tracks whether forms are submitting, records live validation errors safely without triggering excessive re-renders, and wires `onChange` and `value` bindings natively for fields via the simple `.register("fieldName")` abstraction.
3. **Coerces and Formats (v1.1.0+):** It can actively intercept form data, strip characters, convert to numbers, or apply developer-defined `.transform()` modifications instantly as it passes.

## 3. Where and How to use Built-in Functions

SuperForm logic is split into two halves: the **Core Validation Engine** and the **React Hook Integration**.

### The Core Validation (`superform`)
You use the `superform` object to draw a "Schema Map".
```typescript
import { superform } from "@silentcoderhi/superform/core";

const mySchema = superform.object({
  email: superform.string().email(),
  score: superform.number().max(10)
});
```

Here are all the functionalities you can build your schema with:

#### Base Types
* **`superform.string()`**: Base text. Chain `.min(n)`, `.max(n)`, `.email()` to add restrictions.
* **`superform.number()`**: Base numeric. Chain `.min(n)`, `.max(n)` to add restrictions.
* **`superform.boolean()`**: Chain `.true('Required!')` to enforce a strictly `true` value.
* **`superform.array(schema)`**: Array containing other schemas.
* **`superform.object({ ... })`**: Defines an explicitly shaped dictionary mapping string keys to schemas.

#### Strict Declarations (v1.1.0)
* **`superform.enum(["a", "b", "c"])`**: Forces the value to exclusively exist within the array.
* **`superform.literal("MAGIC")`**: Forces the value to strictly equal a known constant.
* **`superform.union(schema1, schema2)`**: Allows the input to match safely against multiple schemas. Perfect for `"string | number"` toggles.

#### Modifiers & Interceptors (v1.1.0)
Modifiers can be wrapped onto the end of any of the schemas described above.
* **`.optional()`**: The value may be explicitly `undefined` or skipped entirely without breaking the form.
* **`.nullable()`**: The value may explicitly be `null`.
* **`.refine(predicateFn, { message })`**: Supply a custom function. If the function returns `false`, validation halts with your custom error message. Example: password complexity logic.
* **`.transform(mappingFn)`**: Coercion. Change an input completely on the fly dynamically (Example: Strip white spaces, or output integers from string characters).

---

### The React Integration (`useForm`)
You inject your `mySchema` into a React function component using the `useForm` hook so it has total control to read, lock, and inject errors onto the screen.

```tsx
import { useForm } from "@silentcoderhi/superform/react";

function Sample() {
   const { register, handleSubmit, errors, isSubmitting, reset } = useForm(mySchema);

   const submitProcess = async (data) => {
       console.log('Sanitized Payload ready for Server:', data);
   }

   return (
       <form onSubmit={handleSubmit(submitProcess)}>
           {/* Hooking the specific input tag up using the registered ID name! */}
           <input {...register("email")} />
           {errors.email && <span>{errors.email}</span>}
       </form>
   )
}
```

* **`register("fieldName")`**: Drops `{ name, onChange, onBlur }` native binders directly into an HTML `<input>` or `<select>`.
* **`handleSubmit(fn)`**: A wrapper for your button trigger. It prevents native page reloads, forces a strict layout Schema Validation check against all fields, blocks the user on errors, and only fires `fn` if successful.
* **`errors`**: An object literal mirroring the exact structure of your schema mapped straight to validation string errors to conditionally draw red text below inputs.

## 4. Testing Focus Points 🎯
As a tester receiving this package today, you should focus highly on stressing the v1.1.0 capabilities inside the `playground` test app:

1. **Transform Mutilations:** Verify if a user types inputs with extra spaces into `.transform(v => v.trim())`, the `onSubmit` ultimately returns the pristine unspaced format. 
2. **Refine Edge Cases:** Stress test specific `.refine` conditions (like regex testing inside passports/IDs). Ensure the custom messages are consistently firing.
3. **Empty Data Behaviors:** See if nested `.optional()` vs `.nullable()` fail properly on partial inputs versus wholly skipped ones. Try toggling an `.optional()` off manually and asserting `useForm` triggers an immediate localized UI `.required` fallback trap.
4. **Union Crossings:** Type numbers manually inside string inputs bounded by `superform.union(string, number)` to confirm it successfully jumps between internal schema trees cleanly without collapsing the compiler. 
