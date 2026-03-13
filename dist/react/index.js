// packages/react/src/useForm.ts
import { useState, useCallback } from "react";
function useForm(schema) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const register = (name) => ({
    name,
    value: values[name] || "",
    onChange: (e) => {
      setValues((prev) => ({ ...prev, [name]: e.target.value }));
    }
  });
  const handleSubmit = useCallback(
    (onSubmit) => async (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});
      const result = await schema.validate(values);
      if (!result.success) {
        const firstError = Array.isArray(result.errors) ? result.errors[0] : result.errors;
        const errorMsg = typeof firstError === "string" ? firstError : JSON.stringify(firstError);
        const [field, message] = errorMsg.includes(":") ? errorMsg.split(":").map((s) => s.trim()) : ["root", errorMsg];
        setErrors({ [field]: message || errorMsg });
        setIsSubmitting(false);
        return;
      }
      try {
        await onSubmit(result.data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values]
  );
  return {
    register,
    handleSubmit,
    values,
    errors,
    isSubmitting
  };
}

// packages/react/src/formContext.ts
import { createContext, useContext } from "react";
var FormContext = createContext(null);
function useFormContext() {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
}

// packages/react/src/useField.ts
function useField(name) {
  const { values, errors, register } = useFormContext();
  return {
    value: values[name],
    error: errors[name],
    ...register(name)
  };
}
export {
  FormContext,
  useField,
  useForm,
  useFormContext
};
//# sourceMappingURL=index.js.map