import React, { useState, useCallback } from "react";
import type { Schema, Infer } from "../../core/src/types.js";

export function useForm<S extends Schema<any>>(schema: S) {
  type FormData = Infer<S>;
  const [values, setValues] = useState<Partial<FormData>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const register = (name: keyof FormData) => {
    const val = values[name];
    return {
      name: name as string,
      value: typeof val === "boolean" ? "" : ((val || "") as string),
      checked: typeof val === "boolean" ? val : false,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setValues((prev) => ({ ...prev, [name]: value as any }));
      },
    };
  };

  const handleSubmit = useCallback(
    (onSubmit: (data: FormData) => void | Promise<void>) => async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      setErrors({});

      const result = await schema.validate(values);
      console.log(result);

      if (!result.success) {
        if (result.errors && typeof result.errors === "object") {
          // If errors are an object, set all fields
          setErrors(result.errors as Record<string, string>);
        } else {
          // Fallback for unexpected error format
          setErrors({ root: JSON.stringify(result.errors) });
        }
        setIsSubmitting(false);
        return;
      }

      try {
        await onSubmit(result.data);
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values],
  );

  const reset = useCallback(() => {
    setValues({});
    setErrors({});
    setIsSubmitting(false);
  }, []);

  return {
    register,
    handleSubmit,
    values,
    errors,
    isSubmitting,
    reset,
  };
}
